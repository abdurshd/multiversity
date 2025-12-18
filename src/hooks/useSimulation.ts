import { useState, useCallback } from 'react';
import { StoryChoice, StatModifier } from '../types';

export interface SimulationStats {
    chaos: number;
    freedom: number;
    diplomacy: number;
    strength: number;
}

export interface SimulationState {
    stats: SimulationStats;
    history: string[]; // IDs of choices made
    currentScenarioIndex: number;
    isGameOver: boolean;
}

const INITIAL_STATS: SimulationStats = {
    chaos: 20,
    freedom: 50,
    diplomacy: 50,
    strength: 50
};

export const useSimulation = () => {
    const [state, setState] = useState<SimulationState>({
        stats: { ...INITIAL_STATS },
        history: [],
        currentScenarioIndex: 0,
        isGameOver: false
    });

    const updateStats = (modifiers: StatModifier[]) => {
        setState(prev => {
            const newStats = { ...prev.stats };

            modifiers.forEach(mod => {
                newStats[mod.stat] = Math.max(0, Math.min(100, newStats[mod.stat] + mod.value));
            });

            return {
                ...prev,
                stats: newStats
            };
        });
    };

    const advanceScenario = useCallback(() => {
        setState(prev => ({
            ...prev,
            currentScenarioIndex: prev.currentScenarioIndex + 1
        }));
    }, []);

    const makeChoice = useCallback((choice: StoryChoice) => {
        // 1. Update Stats
        if (choice.modifiers) {
            updateStats(choice.modifiers);
        }

        // 2. Add to history
        setState(prev => ({
            ...prev,
            history: [...prev.history, choice.id]
        }));

        // 3. Logic for next state (handled by consumer usually, but we can track minimal state here)
        // For now we just return the new state or allow the consumer to react
    }, []);

    const resetSimulation = useCallback(() => {
        setState({
            stats: { ...INITIAL_STATS },
            history: [],
            currentScenarioIndex: 0,
            isGameOver: false
        });
    }, []);

    return {
        simulationState: state,
        makeChoice,
        advanceScenario,
        resetSimulation
    };
};
