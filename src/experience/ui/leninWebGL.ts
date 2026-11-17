/** Capability gate: R3F async initialization errors can bypass React boundaries. */
export function canRenderLenin3D(createCanvas?: () => Pick<HTMLCanvasElement, 'getContext'>): boolean {
    if (!createCanvas && typeof document === 'undefined') return false;
    try {
        const canvas = createCanvas ? createCanvas() : document.createElement('canvas');
        const gl = canvas.getContext('webgl2', { antialias: false, powerPreference: 'high-performance' });
        if (!gl) return false;
        gl.getExtension('WEBGL_lose_context')?.loseContext();
        return true;
    } catch {
        return false;
    }
}
