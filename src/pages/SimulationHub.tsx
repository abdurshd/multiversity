import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getChapterById } from '../data';
import { Chapter, StoryChoice } from '../types';
import ScenarioRunner from '../components/simulation/ScenarioRunner';
import { Play, SkipBack, AlertOctagon, Activity, Shield, Zap, Globe } from 'lucide-react';
import { useSimulation } from '../hooks/useSimulation';

const StatBar: React.FC<{ label: string; value: number; color: string; icon: React.ReactNode }> = ({ label, value, color, icon }) => (
    <div className="flex items-center space-x-2 w-full">
        <div className={`p-1 rounded-sm ${color} bg-opacity-20`}>
            {icon}
        </div>
        <div className="flex-grow">
            <div className="flex justify-between text-[10px] font-mono uppercase text-gray-500 mb-1">
                <span>{label}</span>
                <span>{value}%</span>
            </div>
            <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${value}%` }}
                    transition={{ type: "spring", stiffness: 50 }}
                    className={`h-full ${color.replace('text-', 'bg-')}`}
                />
            </div>
        </div>
    </div>
);

const SimulationHub: React.FC = () => {
    const { chapterId } = useParams<{ chapterId: string }>();
    const navigate = useNavigate();
    const [chapter, setChapter] = useState<Chapter | null>(null);
    const [mode, setMode] = useState<'briefing' | 'simulation' | 'analyzing' | 'result'>('briefing');

    // Use the simulation hook
    const { simulationState, makeChoice, advanceScenario, resetSimulation } = useSimulation();
    const { stats, currentScenarioIndex } = simulationState;

    useEffect(() => {
        if (chapterId) {
            const data = getChapterById(chapterId);
            setChapter(data || null);
        }
    }, [chapterId]);

    const startSimulation = () => {
        resetSimulation();
        setMode('simulation');
    };

    const handleChoice = (choice: StoryChoice) => {
        // Update global state
        makeChoice(choice);

        if (choice.linkedTimelineId) {
            // Divergence detected!
            setMode('analyzing');
            setTimeout(() => {
                navigate(`/timeline/${chapterId}/${choice.linkedTimelineId}`);
            }, 2000);
        } else {
            // Standard timeline preserved
            // In a real app we'd have a nice transition.
            // For MVP, we just advance or show a "Stability Preserved" message then advance.

            // If there are more scenarios, advance
            if (chapter?.interactiveScenarios && currentScenarioIndex < chapter.interactiveScenarios.length - 1) {
                setTimeout(() => {
                    advanceScenario();
                }, 1000);
            } else {
                setMode('result');
            }
        }
    };

    const getOutcome = () => {
        const { chaos, freedom, strength, diplomacy } = stats;
        if (chaos > 80) return { title: 'Timeline Destabilized', desc: 'Entropy levels critical. Reality fragmentation imminent.', color: 'text-red-500' };
        if (freedom > 80) return { title: 'Anarcho-Utopian State', desc: 'Maximum individual liberty achieved at the cost of social cohesion.', color: 'text-blue-400' };
        if (strength > 80) return { title: 'Totalitarian Hegemony', desc: 'Order maintained through absolute power. Dissent eliminated.', color: 'text-yellow-600' };
        if (diplomacy > 80) return { title: 'Global Federation', desc: 'World peace achieved through bureaucracy. Slightly boring.', color: 'text-purple-400' };
        return { title: 'Historical Equilibrium', desc: 'Standard deviation within acceptable limits. Timeline stable.', color: 'text-green-500' };
    };

    if (!chapter) return <div className="min-h-screen bg-black text-green-500 font-mono p-10">LOADING DATA...</div>;

    const outcome = getOutcome();

    return (
        <div className="min-h-screen bg-black text-white pt-20 px-4">
            {mode === 'briefing' && (
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="border border-green-900/50 bg-black/50 p-8 rounded-lg relative overflow-hidden"
                    >
                        <div className="absolute top-0 left-0 w-full h-1 bg-green-500/50"></div>

                        <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-600 uppercase">
                            {chapter.title}
                        </h1>

                        <div className="flex items-center space-x-4 mb-8 text-green-500/80 font-mono text-sm">
                            <span className="border border-green-500/30 px-2 py-1 rounded-sm">YEAR: {chapter.period}</span>
                            <span className="border border-green-500/30 px-2 py-1 rounded-sm">DIV_POINT: {chapter.divergencePoint}</span>
                        </div>

                        <div className="prose prose-invert prose-lg max-w-none text-gray-300 mb-12 font-mono">
                            <p>{chapter.description}</p>
                            <p className="text-sm opacity-70 border-l-2 border-green-500 pl-4 italic">
                                "{chapter.historicalContext}"
                            </p>
                        </div>

                        <div className="flex gap-4">
                            {chapter.interactiveScenarios && chapter.interactiveScenarios.length > 0 ? (
                                <button
                                    onClick={startSimulation}
                                    className="group flex items-center space-x-3 bg-green-600 hover:bg-green-500 text-black px-8 py-4 font-bold tracking-widest uppercase transition-all hover:shadow-[0_0_20px_rgba(34,197,94,0.5)] clip-path-slant"
                                >
                                    <Play className="w-5 h-5 fill-current" />
                                    <span>Initialize Simulation</span>
                                </button>
                            ) : (
                                <div className="bg-red-900/20 text-red-500 border border-red-500/30 px-6 py-4 flex items-center space-x-3">
                                    <AlertOctagon className="w-5 h-5" />
                                    <span>SIMULATION DATA CORRUPTED (No scenarios found)</span>
                                </div>
                            )}

                            <button
                                onClick={() => navigate('/chapters')}
                                className="flex items-center space-x-3 text-gray-500 hover:text-white px-6 py-4 font-mono uppercase tracking-wider transition-colors"
                            >
                                <SkipBack className="w-4 h-4" />
                                <span>Abort</span>
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}

            {mode === 'simulation' && chapter.interactiveScenarios && (
                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Left: Stats Dashboard */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="lg:col-span-1 space-y-4"
                    >
                        <div className="bg-black border border-green-900/50 p-4 rounded-lg">
                            <h3 className="text-green-500 font-mono text-xs uppercase tracking-widest mb-4 border-b border-green-900/50 pb-2">
                                Global State
                            </h3>
                            <div className="space-y-4">
                                <StatBar label="Freedom" value={stats.freedom} color="text-blue-500" icon={<Globe className="w-3 h-3 text-blue-500" />} />
                                <StatBar label="Chaos" value={stats.chaos} color="text-red-500" icon={<Activity className="w-3 h-3 text-red-500" />} />
                                <StatBar label="Diplomacy" value={stats.diplomacy} color="text-purple-500" icon={<Shield className="w-3 h-3 text-purple-500" />} />
                                <StatBar label="Strength" value={stats.strength} color="text-yellow-500" icon={<Zap className="w-3 h-3 text-yellow-500" />} />
                            </div>
                        </div>
                    </motion.div>

                    {/* Center: Scenario Runner */}
                    <div className="lg:col-span-3">
                        <ScenarioRunner
                            scenario={chapter.interactiveScenarios[currentScenarioIndex]}
                            onChoiceSelected={handleChoice}
                            onComplete={() => { }}
                        />
                    </div>
                </div>
            )}

            {mode === 'result' && (
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-black border border-green-500/50 p-10 rounded-lg text-center shadow-[0_0_50px_rgba(34,197,94,0.1)]"
                    >
                        <div className="inline-block px-4 py-1 border border-green-500/50 text-green-500 text-xs font-mono mb-6 tracking-[0.3em]">
                            SIMULATION REPORT
                        </div>

                        <h2 className={`text-4xl md:text-5xl font-black mb-4 uppercase ${outcome.color}`}>
                            {outcome.title}
                        </h2>

                        <p className="text-gray-400 font-mono text-lg mb-10 max-w-2xl mx-auto">
                            {outcome.desc}
                        </p>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                            <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                                <div className="text-xs text-gray-500 mb-1">FREEDOM</div>
                                <div className="text-2xl font-mono text-blue-500">{stats.freedom}</div>
                            </div>
                            <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                                <div className="text-xs text-gray-500 mb-1">CHAOS</div>
                                <div className="text-2xl font-mono text-red-500">{stats.chaos}</div>
                            </div>
                            <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                                <div className="text-xs text-gray-500 mb-1">DIPLOMACY</div>
                                <div className="text-2xl font-mono text-purple-500">{stats.diplomacy}</div>
                            </div>
                            <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                                <div className="text-xs text-gray-500 mb-1">STRENGTH</div>
                                <div className="text-2xl font-mono text-yellow-500">{stats.strength}</div>
                            </div>
                        </div>

                        <div className="flex justify-center gap-4">
                            <button
                                onClick={startSimulation}
                                className="flex items-center space-x-2 bg-green-600 hover:bg-green-500 text-black px-6 py-3 font-bold uppercase tracking-wider transition-colors rounded-sm"
                            >
                                <Play className="w-4 h-4" />
                                <span>Re-Run</span>
                            </button>
                            <button
                                onClick={() => navigate('/chapters')}
                                className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 font-bold uppercase tracking-wider transition-colors rounded-sm"
                            >
                                <Globe className="w-4 h-4" />
                                <span>Exit</span>
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}

            {mode === 'analyzing' && (
                <div className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center">
                    <div className="text-green-500 font-mono text-xl animate-pulse mb-4">CALCULATING TEMPORAL SHIFT...</div>
                    <div className="w-64 h-2 bg-green-900 rounded-full overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 2, ease: "linear" }}
                            className="h-full bg-green-500 shadow-[0_0_10px_#22c55e]"
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default SimulationHub;
