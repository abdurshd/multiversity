/* Procedural canvas textures — no external assets, cached by key. */
import * as THREE from 'three';

const cache = new Map<string, THREE.Texture>();

function canvasTexture(
    key: string,
    size: number,
    draw: (ctx: CanvasRenderingContext2D, size: number) => void,
    opts?: { repeat?: [number, number] }
): THREE.Texture {
    const cacheKey = `${key}|${opts?.repeat?.join(',') ?? ''}`;
    const hit = cache.get(cacheKey);
    if (hit) return hit;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d')!;
    draw(ctx, size);
    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    if (opts?.repeat) {
        tex.wrapS = THREE.RepeatWrapping;
        tex.wrapT = THREE.RepeatWrapping;
        tex.repeat.set(opts.repeat[0], opts.repeat[1]);
    }
    tex.anisotropy = 4;
    cache.set(cacheKey, tex);
    return tex;
}

/** Deterministic PRNG so textures are stable across reloads. */
function rng(seed: number) {
    let a = seed >>> 0;
    return () => {
        a |= 0;
        a = (a + 0x6d2b79f5) | 0;
        let t = Math.imul(a ^ (a >>> 15), 1 | a);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

// ─── Soft round sprite for particles (snow/dust/smoke) ─────────────────────
export function softSprite(): THREE.Texture {
    return canvasTexture('soft', 64, (ctx, s) => {
        const g = ctx.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
        g.addColorStop(0, 'rgba(255,255,255,1)');
        g.addColorStop(0.4, 'rgba(255,255,255,0.7)');
        g.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, s, s);
    });
}

// ─── Sun-baked brick ───────────────────────────────────────────────────────
export function brickTexture(base: string, mortar: string, repeat: [number, number], seed = 3): THREE.Texture {
    return canvasTexture(`brick-${base}-${mortar}-${seed}`, 256, (ctx, s) => {
        const rand = rng(seed);
        ctx.fillStyle = mortar;
        ctx.fillRect(0, 0, s, s);
        const rows = 10;
        const bh = s / rows;
        const baseColor = new THREE.Color(base);
        for (let r = 0; r < rows; r++) {
            const offset = (r % 2) * (s / 8);
            for (let cx = -1; cx < 5; cx++) {
                const bw = s / 4;
                const x = cx * bw + offset;
                const c = baseColor.clone();
                c.offsetHSL((rand() - 0.5) * 0.02, (rand() - 0.5) * 0.06, (rand() - 0.5) * 0.07);
                ctx.fillStyle = `#${c.getHexString()}`;
                ctx.fillRect(x + 1.5, r * bh + 1.5, bw - 3, bh - 3);
                // subtle highlight
                ctx.fillStyle = 'rgba(255,255,255,0.06)';
                ctx.fillRect(x + 1.5, r * bh + 1.5, bw - 3, 2);
            }
        }
    }, { repeat });
}

// ─── Timurid tile mosaic (lapis / turquoise / gold geometric) ──────────────
export function mosaicTexture(repeat: [number, number], seed = 7): THREE.Texture {
    return canvasTexture(`mosaic-${seed}`, 256, (ctx, s) => {
        const rand = rng(seed);
        ctx.fillStyle = '#15396b';
        ctx.fillRect(0, 0, s, s);
        const n = 16;
        const cell = s / n;
        const colors = ['#1d4f91', '#2563ab', '#2ab3a6', '#48cfc2', '#e0c25f', '#f1e4c8', '#15396b'];
        const weights = [0.25, 0.18, 0.18, 0.1, 0.07, 0.07, 0.15];
        for (let y = 0; y < n; y++) {
            for (let x = 0; x < n; x++) {
                let v = rand();
                let idx = 0;
                for (let k = 0; k < weights.length; k++) { v -= weights[k]; if (v <= 0) { idx = k; break; } }
                // symmetric star pattern: mirror across both axes for orderly geometry
                const mx = Math.min(x, n - 1 - x);
                const my = Math.min(y, n - 1 - y);
                if ((mx + my) % 4 === 0) idx = 4; // gold diagonal accents
                if (mx % 8 === 0 && my % 8 === 0) idx = 5; // ivory studs
                ctx.fillStyle = colors[idx];
                ctx.fillRect(x * cell + 0.5, y * cell + 0.5, cell - 1, cell - 1);
            }
        }
    }, { repeat });
}

// ─── Dome glaze: turquoise with subtle tile seams ──────────────────────────
export function domeTexture(base: string, repeat: [number, number]): THREE.Texture {
    return canvasTexture(`dome-${base}`, 256, (ctx, s) => {
        const rand = rng(11);
        const baseColor = new THREE.Color(base);
        const n = 12;
        const cell = s / n;
        for (let y = 0; y < n; y++) {
            for (let x = 0; x < n; x++) {
                const c = baseColor.clone();
                c.offsetHSL((rand() - 0.5) * 0.015, (rand() - 0.5) * 0.08, (rand() - 0.5) * 0.07);
                ctx.fillStyle = `#${c.getHexString()}`;
                ctx.fillRect(x * cell, y * cell, cell, cell);
                ctx.strokeStyle = 'rgba(10,25,40,0.25)';
                ctx.strokeRect(x * cell + 0.5, y * cell + 0.5, cell - 1, cell - 1);
            }
        }
    }, { repeat });
}

// ─── Plaza paving ──────────────────────────────────────────────────────────
export function pavingTexture(repeat: [number, number]): THREE.Texture {
    return canvasTexture('paving', 256, (ctx, s) => {
        const rand = rng(17);
        ctx.fillStyle = '#b9a682';
        ctx.fillRect(0, 0, s, s);
        const n = 8;
        const cell = s / n;
        for (let y = 0; y < n; y++) {
            for (let x = 0; x < n; x++) {
                const c = new THREE.Color('#cdbb95');
                c.offsetHSL(0, (rand() - 0.5) * 0.04, (rand() - 0.5) * 0.06);
                ctx.fillStyle = `#${c.getHexString()}`;
                ctx.fillRect(x * cell + 1.5, y * cell + 1.5, cell - 3, cell - 3);
            }
        }
        // big diagonal star inlay hint
        ctx.strokeStyle = 'rgba(42,90,120,0.35)';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(0, s / 2); ctx.lineTo(s / 2, 0); ctx.lineTo(s, s / 2); ctx.lineTo(s / 2, s); ctx.closePath();
        ctx.stroke();
    }, { repeat });
}

// ─── Ground noise (subtle mottling for terrain) ────────────────────────────
export function groundNoise(tint: string, repeat: [number, number], seed = 23): THREE.Texture {
    return canvasTexture(`ground-${tint}-${seed}`, 256, (ctx, s) => {
        const rand = rng(seed);
        const baseColor = new THREE.Color(tint);
        ctx.fillStyle = tint;
        ctx.fillRect(0, 0, s, s);
        for (let i = 0; i < 900; i++) {
            const c = baseColor.clone();
            c.offsetHSL((rand() - 0.5) * 0.02, (rand() - 0.5) * 0.05, (rand() - 0.5) * 0.08);
            ctx.fillStyle = `#${c.getHexString()}`;
            const r = 2 + rand() * 14;
            ctx.beginPath();
            ctx.arc(rand() * s, rand() * s, r, 0, Math.PI * 2);
            ctx.fill();
        }
    }, { repeat });
}

// ─── Felt / fabric for yurts ───────────────────────────────────────────────
export function feltTexture(base: string, repeat: [number, number]): THREE.Texture {
    return canvasTexture(`felt-${base}`, 128, (ctx, s) => {
        const rand = rng(29);
        const baseColor = new THREE.Color(base);
        ctx.fillStyle = base;
        ctx.fillRect(0, 0, s, s);
        for (let i = 0; i < 500; i++) {
            const c = baseColor.clone();
            c.offsetHSL(0, 0, (rand() - 0.5) * 0.06);
            ctx.fillStyle = `#${c.getHexString()}`;
            ctx.fillRect(rand() * s, rand() * s, 2 + rand() * 4, 1 + rand() * 2);
        }
    }, { repeat });
}
