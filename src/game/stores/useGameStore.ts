import { create } from 'zustand';

export type GamePhase = 'menu' | 'playing' | 'paused' | 'ended';
export type ObjectiveStatus = 'pending' | 'success' | 'failed';

interface GameState {
    currentLevel: string | null;
    phase: GamePhase;
    objectives: {
        [key: string]: {
            label: string;
            status: ObjectiveStatus;
        };
    };
    timelineResult: string | null;

    // Actions
    loadLevel: (levelId: string) => void;
    setPhase: (phase: GamePhase) => void;
    updateObjective: (id: string, status: ObjectiveStatus) => void;
    completeGame: (result: string) => void;
    resetGame: () => void;
}

export const useGameStore = create<GameState>((set) => ({
    currentLevel: null,
    phase: 'menu',
    objectives: {},
    timelineResult: null,

    loadLevel: (levelId) => set({
        currentLevel: levelId,
        phase: 'playing',
        objectives: {},
        timelineResult: null
    }),

    setPhase: (phase) => set({ phase }),

    updateObjective: (id, status) => set((state) => ({
        objectives: {
            ...state.objectives,
            [id]: {
                ...state.objectives[id],
                status
            }
        }
    })),

    completeGame: (result) => set({
        phase: 'ended',
        timelineResult: result
    }),

    resetGame: () => set({
        currentLevel: null,
        phase: 'menu',
        objectives: {},
        timelineResult: null
    })
}));
