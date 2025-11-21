import React, { useEffect } from 'react';
import { GameCanvas } from './GameCanvas';
import { useGameStore } from './stores/useGameStore';
import { ArrowLeft, Play, RotateCcw } from 'lucide-react';

interface GameContainerProps {
    levelId: string;
    onExit: () => void;
    onTimelineRequest: (timelineId: string) => void;
}

export const GameContainer: React.FC<GameContainerProps> = ({ levelId, onExit, onTimelineRequest }) => {
    const { phase, timelineResult, loadLevel, resetGame } = useGameStore();

    useEffect(() => {
        loadLevel(levelId);
        return () => resetGame();
    }, [levelId, loadLevel, resetGame]);

    const handleExploreTimeline = () => {
        if (timelineResult) {
            // Map the game result to the actual timeline ID
            // In a real app, this mapping would be more robust and likely come from the level config
            let targetTimelineId = 'immortal-emir'; // Default to the main alternative timeline
            if (timelineResult === 'timeline_3_secret_alliance') targetTimelineId = 'western-campaign';

            onTimelineRequest(targetTimelineId);
        }
    };

    return (
        <div className="w-full h-full bg-black relative font-sans">
            <GameCanvas />

            {/* UI Overlay Layer */}
            <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-6">

                {/* Top Bar */}
                <div className="flex justify-between items-start pointer-events-auto">
                    <button
                        onClick={onExit}
                        className="bg-black/50 hover:bg-black/70 text-white px-4 py-2 rounded-lg backdrop-blur-md flex items-center gap-2 transition"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Exit Simulation
                    </button>

                    <div className="bg-black/50 text-white px-4 py-2 rounded-lg backdrop-blur-md">
                        <p className="text-xs uppercase tracking-widest text-blue-400">Objective</p>
                        <p className="font-bold">Capture Sultan Bayezid</p>
                    </div>
                </div>

                {/* Game Over Screen */}
                {phase === 'ended' && (
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center pointer-events-auto z-50">
                        <div className="max-w-md w-full bg-slate-900 border border-white/10 rounded-2xl p-8 text-center shadow-2xl">
                            <h2 className="text-3xl font-bold text-white mb-2">Divergence Reached</h2>
                            <p className="text-blue-400 text-lg mb-6">
                                {timelineResult === 'timeline_1_historical' ? 'Historical Timeline Preserved' : 'New Timeline Created'}
                            </p>

                            <div className="bg-white/5 rounded-xl p-6 mb-8">
                                <p className="text-slate-300 italic">
                                    {timelineResult === 'timeline_1_historical'
                                        ? "The Sultan is captured. The Ottoman Interregnum begins, and the Timurid Empire secures its western flank."
                                        : "A secret alliance is formed. Europe trembles as East and West unite against the rising powers of Christendom."}
                                </p>
                            </div>

                            <div className="flex gap-4 justify-center">
                                <button
                                    onClick={() => { resetGame(); loadLevel(levelId); }}
                                    className="px-6 py-3 rounded-xl bg-slate-700 hover:bg-slate-600 text-white font-semibold flex items-center gap-2 transition"
                                >
                                    <RotateCcw className="w-4 h-4" />
                                    Replay
                                </button>
                                <button
                                    onClick={handleExploreTimeline}
                                    className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold flex items-center gap-2 shadow-lg shadow-blue-600/20 transition"
                                >
                                    <Play className="w-4 h-4" />
                                    Explore Timeline
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
