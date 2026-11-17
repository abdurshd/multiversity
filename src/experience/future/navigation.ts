import { create } from 'zustand';
/** View-only controls never change assignments, evidence or narrative state. */
export const useFutureNavigation = create<{ revision: number; reducedMotion: boolean; resetView: () => void; setReducedMotion: (value: boolean) => void }>((set) => ({ revision: 0, reducedMotion: false, resetView: () => set(s => ({ revision: s.revision + 1 })), setReducedMotion: (reducedMotion) => set({ reducedMotion }) }));
