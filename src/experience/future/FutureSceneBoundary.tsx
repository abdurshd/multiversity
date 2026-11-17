import { Component, useState, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { canRenderFuture3D } from './webgl';
export function FutureRendererFallback() {
    const { t } = useTranslation('experience-future-earth');
    return <div className="future-render-fallback"><p role="status">{t('ui.fallback')}</p></div>;
}
/** Renderer errors must not remove the independent DOM planning experience. */
class FutureRenderErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
    state = { failed: false };
    static getDerivedStateFromError() { return { failed: true }; }
    render() { return this.state.failed ? <FutureRendererFallback /> : this.props.children; }
}

export function FutureSceneBoundary({ children }: { children: ReactNode }) {
    const [available] = useState(() => canRenderFuture3D());
    return available ? <FutureRenderErrorBoundary>{children}</FutureRenderErrorBoundary> : <FutureRendererFallback />;
}
