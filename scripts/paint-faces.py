#!/usr/bin/env python3
"""Paint stand-in cartoon faces for historical figures that have no chapter portrait yet.

Writes public/images/chapters/<chapter>/faces/<person>.webp in the same 512x512
soft-oval format as scripts/extract-faces.py, and adds the skin tone to
face-skin-tones.json. Drop a real portrait into people/ and re-run
extract-faces.py to replace a painted face.

Usage: pip install pillow && python3 scripts/paint-faces.py
"""
import json
import pathlib
import random

from PIL import Image, ImageDraw, ImageFilter

ROOT = pathlib.Path(__file__).resolve().parent.parent / 'public' / 'images' / 'chapters'
S = 2048  # paint at 4x, then downsample for clean edges
OUT = 512

# beard: none | moustache | full | chin | goatee | sideburns
PEOPLE = {
    'lincoln-era/robert-e-lee': dict(skin='#e2b596', hair='#e9e6df', brow='#cfcac2', beard='full', beard_color='#ecebe6', age=0.8, eye='#3b4a5a'),
    'lincoln-era/ulysses-s-grant': dict(skin='#d9a27f', hair='#5a3a22', brow='#4a2e1a', beard='full', beard_color='#6b4528', age=0.3, eye='#4a3b2a'),
    'lincoln-era/frederick-douglass': dict(skin='#7b4b33', hair='#d8d4cc', brow='#3a2a22', beard='chin', beard_color='#d6d2ca', age=0.6, eye='#24180f'),
    # moustache styles: 'kaiser' (waxed points turned up), 'walrus' (broad, drooping)
    'world-war-1/kaiser-wilhelm-ii': dict(skin='#e6b99a', hair='#6b5a48', brow='#5a4a3a', beard='moustache', moustache='kaiser', beard_color='#6e5a44', age=0.5, eye='#3a5070'),
    'world-war-1/archduke-franz-ferdinand': dict(skin='#e2b08e', hair='#3a2c22', brow='#2e221a', beard='moustache', moustache='walrus', beard_color='#3a2c22', age=0.4, eye='#3e4a5a'),
    'world-war-1/woodrow-wilson': dict(skin='#e8bfa2', hair='#9a9690', brow='#6e6a64', beard='none', glasses=True, age=0.7, eye='#4a5a6a', long_face=True),
    # bald: no hair cap painted (the hat/hair mesh covers the crown); smile: broad grin
    'world-war-2/winston-churchill': dict(skin='#efc3a6', hair='#d8b090', brow='#b89a80', beard='none', bald=True, age=0.8, eye='#5a7090'),
    'world-war-2/franklin-d-roosevelt': dict(skin='#e9c0a2', hair='#a8a49e', brow='#7a746c', beard='none', glasses=True, age=0.65, eye='#4a5a72', long_face=True, smile=True),
    'world-war-2/dwight-d-eisenhower': dict(skin='#ecbf9e', hair='#d6b48e', brow='#a88a6a', beard='none', bald=True, age=0.6, eye='#4a6a8a', smile=True),
    'world-war-2/bernard-montgomery': dict(skin='#e6b898', hair='#8a7a68', brow='#6a5a48', beard='moustache', moustache='clipped', beard_color='#8a7a68', age=0.7, eye='#5a6a7a', long_face=True),
    'world-war-2/erwin-rommel': dict(skin='#e4b494', hair='#6a5240', brow='#4e3c2e', beard='none', age=0.5, eye='#4a6a80'),
}


def hexrgb(h, a=255):
    h = h.lstrip('#')
    return tuple(int(h[i:i + 2], 16) for i in (0, 2, 4)) + (a,)


def shade(h, f, a=255):
    r, g, b, _ = hexrgb(h)
    return (int(min(255, r * f)), int(min(255, g * f)), int(min(255, b * f)), a)


def paint(spec):
    img = Image.new('RGBA', (S, S), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    skin = spec['skin']
    u = S / 512

    def box(cx, cy, w, h):
        return [(cx - w / 2) * u, (cy - h / 2) * u, (cx + w / 2) * u, (cy + h / 2) * u]

    # skin base with soft cheek shading
    d.rectangle([0, 0, S, S], fill=hexrgb(skin))
    shadow = Image.new('RGBA', (S, S), (0, 0, 0, 0))
    sd = ImageDraw.Draw(shadow)
    for s in (-1, 1):
        sd.ellipse(box(256 + s * 215, 300, 160, 360), fill=shade(skin, 0.78, 150))
    sd.ellipse(box(256 - 120, 330, 90, 60), fill=shade(skin, 1.0, 0))
    for s in (-1, 1):
        sd.ellipse(box(256 + s * 112, 335, 95, 55), fill=(214, 120, 110, 55))  # cheeks
    shadow = shadow.filter(ImageFilter.GaussianBlur(40 * u))
    img.alpha_composite(shadow)
    d = ImageDraw.Draw(img)

    # hair line at the top
    if not spec.get('bald'):
        d.ellipse(box(256, 10, 560, 150), fill=hexrgb(spec['hair']))

    # brows
    bw = 7 + 4 * (1 - spec['age'])
    for s in (-1, 1):
        x0, x1 = 256 + s * 50, 256 + s * 150
        d.line([(x0 * u, 196 * u), ((x0 + x1) / 2 * u, 182 * u), (x1 * u, 194 * u)], fill=hexrgb(spec['brow']), width=int(bw * 2.4 * u), joint='curve')

    # eyes: white, iris, pupil, highlight, upper lid line
    for s in (-1, 1):
        cx = 256 + s * 98
        d.ellipse(box(cx, 236, 74, 40), fill=(250, 248, 242, 255))
        d.ellipse(box(cx + s * 2, 238, 34, 34), fill=hexrgb(spec['eye']))
        d.ellipse(box(cx + s * 2, 238, 15, 15), fill=(14, 10, 8, 255))
        d.ellipse(box(cx - 6, 230, 9, 9), fill=(255, 255, 255, 235))
        d.arc(box(cx, 238, 80, 46), 190, 350, fill=shade(skin, 0.42), width=int(6 * u))
        if spec['age'] > 0.5:  # crow's feet / under-eye lines
            d.arc(box(cx, 262, 64, 22), 20, 160, fill=shade(skin, 0.72), width=int(3 * u))

    # nose: soft side shadow, rounded tip, nostrils
    nose = Image.new('RGBA', (S, S), (0, 0, 0, 0))
    nd = ImageDraw.Draw(nose)
    nd.polygon([(262 * u, 246 * u), (284 * u, 312 * u), (262 * u, 320 * u)], fill=shade(skin, 0.7, 170))
    nd.ellipse(box(254, 318, 64, 34), fill=shade(skin, 0.72, 150))
    nd.ellipse(box(250, 312, 40, 22), fill=shade(skin, 1.12, 160))
    nose = nose.filter(ImageFilter.GaussianBlur(7 * u))
    img.alpha_composite(nose)
    d = ImageDraw.Draw(img)
    for sx in (-1, 1):
        d.ellipse(box(256 + sx * 18, 328, 15, 8), fill=shade(skin, 0.45))

    rnd = random.Random(sum(map(ord, spec['skin'])))
    beard = spec['beard']
    bc = spec.get('beard_color', spec['hair'])
    if beard in ('full', 'chin'):
        layer = Image.new('RGBA', (S, S), (0, 0, 0, 0))
        ld = ImageDraw.Draw(layer)
        if beard == 'full':
            ld.ellipse(box(256, 440, 470, 330), fill=hexrgb(bc))
            for sx in (-1, 1):  # sideburns down the jaw
                ld.ellipse(box(256 + sx * 205, 330, 100, 300), fill=hexrgb(bc))
            ld.ellipse(box(256, 292, 330, 190), fill=(0, 0, 0, 0))  # bare cheeks
        else:  # chin beard
            ld.ellipse(box(256, 460, 270, 230), fill=hexrgb(bc))
        ld.ellipse(box(256, 386, 120, 44), fill=(0, 0, 0, 0))  # lips stay visible
        layer = layer.filter(ImageFilter.GaussianBlur(10 * u))
        # darker toward the edges and bottom for volume
        grad = Image.new('L', (S, S), 0)
        gd = ImageDraw.Draw(grad)
        for i in range(40):
            gd.ellipse(box(256, 400, 520 - i * 9, 360 - i * 6), fill=int(i * 3))
        dark = Image.new('RGBA', (S, S), shade(bc, 0.7))
        dark.putalpha(Image.eval(grad, lambda v: 120 - v))
        shaded = layer.copy()
        shaded.alpha_composite(Image.composite(dark, Image.new('RGBA', (S, S), (0, 0, 0, 0)), layer.getchannel('A')))
        img.alpha_composite(shaded)
        d = ImageDraw.Draw(img)
        # curly strands, only where the beard is
        a = layer.getchannel('A')
        for _ in range(900):
            x, y = rnd.uniform(40, 472), rnd.uniform(240, 505)
            if a.getpixel((int(x * u), int(y * u))) < 200:
                continue
            c = shade(bc, rnd.choice([0.78, 0.88, 1.08]), 150)
            dx = (x - 256) * 0.05
            d.line([(x * u, y * u), ((x + dx + rnd.uniform(-3, 3)) * u, (y + rnd.uniform(8, 18)) * u)], fill=c, width=int(2.5 * u))
    # moustache: two tapered wings
    style = spec.get('moustache', 'droop')
    if beard != 'none':
        for sx in (-1, 1):
            if style == 'kaiser':
                # thin waxed moustache, ends turned sharply upward
                pts = [(256, 342), (256 + sx * 30, 336), (256 + sx * 68, 342), (256 + sx * 98, 324),
                       (256 + sx * 110, 286), (256 + sx * 122, 296), (256 + sx * 116, 336),
                       (256 + sx * 84, 368), (256 + sx * 36, 372), (256, 364)]
            elif style == 'clipped':
                # short clipped moustache over the middle of the lip
                pts = [(256, 344), (256 + sx * 26, 342), (256 + sx * 46, 350), (256 + sx * 44, 364), (256, 362)]
            elif style == 'walrus':
                pts = [(256, 342), (256 + sx * 46, 336), (256 + sx * 96, 350), (256 + sx * 126, 372),
                       (256 + sx * 96, 380), (256 + sx * 44, 374), (256, 366)]
            else:
                pts = [(256, 344), (256 + sx * 38, 340), (256 + sx * 78, 352), (256 + sx * 100, 380),
                       (256 + sx * 72, 370), (256 + sx * 34, 368), (256, 362)]
            d.polygon([(x * u, y * u) for x, y in pts], fill=hexrgb(bc))
            for k in range(4 if style == 'clipped' else 8):
                x = 256 + sx * (12 + k * 10)
                d.line([(x * u, 346 * u), ((x + sx * 6) * u, 366 * u)], fill=shade(bc, 0.8), width=int(2 * u))
    if spec.get('glasses'):
        # rimless pince-nez: thin gold ovals and a bridge
        for sx in (-1, 1):
            d.ellipse(box(256 + sx * 98, 238, 96, 66), outline=(176, 146, 80, 255), width=int(5 * u))
        d.arc(box(256, 236, 40, 22), 200, 340, fill=(176, 146, 80, 255), width=int(5 * u))
    # lips
    if spec.get('smile'):
        d.chord(box(256, 380, 120, 50), 0, 180, fill=(250, 246, 238, 255))
        d.arc(box(256, 380, 124, 54), 0, 180, fill=(110, 40, 36, 255), width=int(6 * u))
        d.line([(196 * u, 380 * u), (316 * u, 380 * u)], fill=(150, 70, 60, 255), width=int(4 * u))
    else:
        d.chord(box(256, 388, 70, 22), 0, 180, fill=shade(skin, 0.62))
        d.arc(box(256, 384, 84, 22), 15, 165, fill=(70, 30, 28, 255), width=int(5 * u))

    img = img.resize((OUT, OUT), Image.LANCZOS)
    mask = Image.new('L', (OUT, OUT), 0)
    inset = 46 if spec.get('long_face') else 20
    ImageDraw.Draw(mask).ellipse([inset, 8, OUT - inset, OUT - 6], fill=255)
    mask = mask.filter(ImageFilter.GaussianBlur(14))
    img.putalpha(Image.composite(img.getchannel('A'), Image.new('L', (OUT, OUT), 0), mask))
    return img


def main():
    tones_path = ROOT / 'face-skin-tones.json'
    tones = json.loads(tones_path.read_text())
    for key, spec in PEOPLE.items():
        chapter, person = key.split('/')
        if (ROOT / chapter / 'people' / f'{person}.png').exists():
            continue  # a real portrait wins
        out = ROOT / chapter / 'faces' / f'{person}.webp'
        out.parent.mkdir(parents=True, exist_ok=True)
        paint(spec).save(out, 'WEBP', quality=88)
        tones[key] = spec['skin']
        print('painted', out.relative_to(ROOT))
    tones_path.write_text(json.dumps(dict(sorted(tones.items())), indent=2) + '\n')


if __name__ == '__main__':
    main()
