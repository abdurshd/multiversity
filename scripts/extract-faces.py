#!/usr/bin/env python3
"""Crop a face texture from every chapter portrait for the 3D characters.

Reads  public/images/chapters/<chapter>/people/<person>.png
Writes public/images/chapters/<chapter>/faces/<person>.webp  (512x512, soft oval alpha)
   and public/images/chapters/face-skin-tones.json (median cheek colour per face)

The 3D experience maps these crops onto stylized character heads, so the
characters keep the likeness of the real historical people from the portraits.

Usage: pip install "opencv-python-headless<5" pillow && python3 scripts/extract-faces.py
"""
import json
import pathlib
import sys

import cv2
import numpy as np
from PIL import Image, ImageDraw, ImageFilter

ROOT = pathlib.Path(__file__).resolve().parent.parent / 'public' / 'images' / 'chapters'
SIZE = 512
CASCADE = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')


def find_face(gray: np.ndarray):
    h, w = gray.shape
    faces = CASCADE.detectMultiScale(gray, scaleFactor=1.08, minNeighbors=6, minSize=(w // 10, h // 10))
    if len(faces) == 0:
        return None
    # largest face nearest the upper-centre of the portrait
    def score(f):
        x, y, fw, fh = f
        cx, cy = x + fw / 2, y + fh / 2
        return fw * fh - 0.5 * (abs(cx - w / 2) + abs(cy - h * 0.4)) * fw
    return max(faces, key=score)


def main() -> int:
    misses = []
    skins: dict[str, str] = {}
    for portrait in sorted(ROOT.glob('*/people/*.png')):
        img = Image.open(portrait).convert('RGB')
        gray = cv2.cvtColor(np.array(img), cv2.COLOR_RGB2GRAY)
        face = find_face(gray)
        w, h = img.size
        if face is None:
            misses.append(str(portrait.relative_to(ROOT)))
            # fall back to the usual portrait framing: face in the upper middle
            x, y, fw, fh = int(w * 0.33), int(h * 0.2), int(w * 0.34), int(h * 0.34)
        else:
            x, y, fw, fh = (int(v) for v in face)
        # square crop around the face with room for hair, hat and beard
        side = int(max(fw, fh) * 1.25)
        cx = x + fw / 2
        cy = y + fh * 0.55
        left = int(max(0, min(w - side, cx - side / 2)))
        upper = int(max(0, min(h - side, cy - side / 2)))
        crop = img.crop((left, upper, left + side, upper + side)).resize((SIZE, SIZE), Image.LANCZOS)

        mask = Image.new('L', (SIZE, SIZE), 0)
        ImageDraw.Draw(mask).ellipse((SIZE * 0.14, SIZE * 0.06, SIZE * 0.86, SIZE * 0.96), fill=255)
        mask = mask.filter(ImageFilter.GaussianBlur(SIZE * 0.06))
        # average skin tone from the cheeks, so the 3D head can match the face
        cheeks = np.array(crop)[int(SIZE * 0.45):int(SIZE * 0.6), int(SIZE * 0.28):int(SIZE * 0.72)].reshape(-1, 3)
        skin = '#%02x%02x%02x' % tuple(int(v) for v in np.median(cheeks, axis=0))
        skins[f'{portrait.parent.parent.name}/{portrait.stem}'] = skin
        crop.putalpha(mask)

        out = portrait.parent.parent / 'faces' / (portrait.stem + '.webp')
        out.parent.mkdir(exist_ok=True)
        crop.save(out, 'WEBP', quality=86, method=4)
        print(f'{"ok  " if face is not None else "MISS"} {out.relative_to(ROOT)}')
    (ROOT / 'face-skin-tones.json').write_text(json.dumps(skins, indent=2, sort_keys=True) + '\n')
    if misses:
        print(f'\n{len(misses)} portrait(s) used the fallback framing; check them by eye:', *misses, sep='\n  ')
    return 0


if __name__ == '__main__':
    sys.exit(main())
