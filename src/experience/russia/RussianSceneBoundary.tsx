import { Component, type ReactNode } from 'react';
import { RussianRenderFallback } from './RussianRenderFallback';

/** Contain renderer failures only. Narrative state and DOM controls stay mounted. */
export class RussianSceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
    state = { failed: false };
    static getDerivedStateFromError() { return { failed: true }; }
    render() { return this.state.failed ? <RussianRenderFallback /> : this.props.children; }
}
