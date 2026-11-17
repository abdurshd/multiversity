import { Component, useState, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { canRenderLenin3D } from './leninWebGL';

export function LeninRendererFallback() {
    const { t } = useTranslation('experience-lenin-revolution');
    return <div className="lenin-render-fallback"><p role="status">{t('ui.fallback')}</p></div>;
}

/** Only the renderer is inside this boundary. Keep all narrative state, exit,
 * keyboard/touch navigation and replay controls usable after renderer failure. */
class LeninRenderBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
    state = { failed: false };
    static getDerivedStateFromError() { return { failed: true }; }
    render() { return this.state.failed ? <LeninRendererFallback /> : this.props.children; }
}

/** Mount Canvas only after the synchronous capability gate succeeds. */
export function LeninSceneBoundary({ children }: { children: ReactNode }) {
    const [available] = useState(() => canRenderLenin3D());
    if (!available) return <LeninRendererFallback />;
    return <LeninRenderBoundary>{children}</LeninRenderBoundary>;
}
