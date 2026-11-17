/** Avoid mounting R3F where asynchronous WebGL initialization cannot succeed. */
export function canRenderCivic3D(createCanvas?: () => HTMLCanvasElement): boolean {
    if (!createCanvas && typeof document === 'undefined') return false;
    try {
        const canvas = createCanvas ? createCanvas() : document.createElement('canvas');
        const context = canvas.getContext('webgl2', { antialias: true, powerPreference: 'low-power' });
        if (!context) return false;
        context.getExtension('WEBGL_lose_context')?.loseContext();
        return true;
    } catch { return false; }
}
