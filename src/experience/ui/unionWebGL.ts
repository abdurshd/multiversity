/** Probe before mounting R3F: async WebGL initialization errors can bypass React boundaries. */
export function canRenderUnion3D(createCanvas?: () => Pick<HTMLCanvasElement, 'getContext'>): boolean {
    if (!createCanvas && typeof document === 'undefined') return false;
    try {
        const canvas = createCanvas ? createCanvas() : document.createElement('canvas');
        const gl = canvas.getContext('webgl2', { antialias: false, powerPreference: 'high-performance' });
        if (!gl) return false;
        // Do not retain an extra graphics context while the real renderer is mounted.
        gl.getExtension('WEBGL_lose_context')?.loseContext();
        return true;
    } catch {
        return false;
    }
}
