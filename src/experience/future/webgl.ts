/** Probe before mounting R3F: asynchronous renderer init can escape a React boundary.
 * Release the temporary context. Never enable unsafe/software-rendering flags. */
export function canRenderFuture3D(createCanvas?: () => HTMLCanvasElement): boolean {
    if (!createCanvas && typeof document === 'undefined') return false;
    try {
        const canvas = createCanvas ? createCanvas() : document.createElement('canvas');
        const gl = canvas.getContext('webgl2', { antialias: false, powerPreference: 'high-performance' });
        if (!gl) return false;
        gl.getExtension('WEBGL_lose_context')?.loseContext();
        return true;
    } catch { return false; }
}
