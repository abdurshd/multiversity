import { Component, type ReactNode } from 'react';
import { RussianRenderFallback } from './RussianRenderFallback';

// R3F initializes its renderer asynchronously; a React boundary alone cannot
// catch every context-creation rejection. Check support before mounting Canvas.
function supportsWebGL2() {
    if (typeof document === 'undefined') return false;
    try {
        const context = document.createElement('canvas').getContext('webgl2');
        if (!context) return false;
        context.getExtension('WEBGL_lose_context')?.loseContext();
        return true;
    } catch { return false; }
}

/** Contain renderer failures only. Narrative state and DOM controls stay mounted. */
export class RussianSceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
    state = { failed: !supportsWebGL2() };
    static getDerivedStateFromError() { return { failed: true }; }
    render() { return this.state.failed ? <RussianRenderFallback /> : this.props.children; }
}
