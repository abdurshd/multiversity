import { create } from 'zustand';

/** Chapter-local camera commands: never reload a beat or reset story progress. */
export const useTimurNavigation = create<{
    command: 'overview' | 'in' | 'out' | null;
    revision: number;
    request: (command: 'overview' | 'in' | 'out') => void;
}>((set) => ({
    command: null,
    revision: 0,
    request: (command) => set((state) => ({ command, revision: state.revision + 1 })),
}));
