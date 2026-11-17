import { Component, useState, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { canRenderUnion3D } from './unionWebGL';

class SceneBoundary extends Component<{ children: ReactNode; fallback: ReactNode }, { failed: boolean }> {
    state = { failed: false };
    static getDerivedStateFromError() { return { failed: true }; }
    render() { return this.state.failed ? this.props.fallback : this.props.children; }
}

function SupportedScene({ children, fallback }: { children: ReactNode; fallback: ReactNode }) {
    const [available] = useState(() => canRenderUnion3D());
    if (!available) return <>{fallback}</>;
    return <SceneBoundary fallback={fallback}>{children}</SceneBoundary>;
}

/** Opt in only this chapter. A renderer failure must not unmount the decision UI. */
export function UnionSceneBoundary({ enabled, children }: { enabled: boolean; children: ReactNode }) {
    const { t } = useTranslation('experience-ussr-collapse');
    if (!enabled) return <>{children}</>;
    return <SupportedScene fallback={<p className="union-webgl-notice" role="status">{t('ui.fallback')}</p>}>
        {children}
    </SupportedScene>;
}
