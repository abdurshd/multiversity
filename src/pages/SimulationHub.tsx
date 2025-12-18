import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { getChapterById } from '../data';
import { Chapter, StoryChoice } from '../types';
import ScenarioRunner from '../components/simulation/ScenarioRunner';
import { Play, SkipBack, AlertOctagon, Activity, Shield, Zap, Globe, Sparkles, ChevronLeft, Calendar } from 'lucide-react';
import { useSimulation } from '../hooks/useSimulation';
import { useTranslation } from 'react-i18next';

const StatCard: React.FC<{ label: string; value: number; color: string; icon: React.ReactNode }> = ({ label, value, color, icon }) => (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 p-4 rounded-xl flex flex-col justify-between h-full relative overflow-hidden group hover:border-blue-500/30 transition-colors">
        <div className={`absolute top-0 right-0 p-2 opacity-20 group-hover:opacity-40 transition-opacity`}>
            {icon}
        </div>

        <div className="flex justify-between items-start mb-2 z-10">
            <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider">{label}</span>
        </div>

        <div className="z-10">
            <div className="flex items-end space-x-2 mb-2">
                <span className="text-2xl font-bold text-white">{value}</span>
                <span className="text-xs text-slate-500 mb-1">/ 100</span>
            </div>

            <div className="h-1.5 bg-slate-700/50 rounded-full overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${value}%` }}
                    transition={{ type: "spring", stiffness: 50 }}
                    className={`h-full ${color.replace('text-', 'bg-')} shadow-[0_0_10px_rgba(0,0,0,0.3)]`}
                />
            </div>
        </div>
    </div>
);

const SimulationHub: React.FC = () => {
    const { chapterId } = useParams<{ chapterId: string }>();
    const navigate = useNavigate();
    const location = useLocation();
    const { t } = useTranslation(['pages-simulation-hub']);
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

    // Handle Autoplay from query params
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        if (params.get('autoplay') === 'true' && mode === 'briefing') {
            startSimulation();
        }
    }, [location.search, mode]);

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
            if (chapter?.interactiveScenarios && currentScenarioIndex < chapter.interactiveScenarios.length - 1) {
                setTimeout(() => {
                    advanceScenario();
                }, 800);
            } else {
                setMode('result');
            }
        }
    };

    const getOutcome = () => {
        const { chaos, freedom, strength, diplomacy } = stats;

        if (chaos > 80) return {
            title: t('outcomes.destabilized.title'),
            desc: t('outcomes.destabilized.desc'),
            color: 'text-red-500',
            bg: 'from-red-900/20 to-slate-900'
        };
        if (freedom > 80) return {
            title: t('outcomes.libertarian.title'),
            desc: t('outcomes.libertarian.desc'),
            color: 'text-blue-400',
            bg: 'from-blue-900/20 to-slate-900'
        };
        if (strength > 80) return {
            title: t('outcomes.imperial.title'),
            desc: t('outcomes.imperial.desc'),
            color: 'text-amber-500',
            bg: 'from-amber-900/20 to-slate-900'
        };
        if (diplomacy > 80) return {
            title: t('outcomes.federation.title'),
            desc: t('outcomes.federation.desc'),
            color: 'text-purple-400',
            bg: 'from-purple-900/20 to-slate-900'
        };

        return {
            title: t('outcomes.equilibrium.title'),
            desc: t('outcomes.equilibrium.desc'),
            color: 'text-emerald-500',
            bg: 'from-emerald-900/20 to-slate-900'
        };
    };

    if (!chapter) return (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center text-slate-400">
            <div className="flex flex-col items-center">
                <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mb-4" />
                <span>{t('common.loading')}</span>
            </div>
        </div>
    );

    const outcome = getOutcome();

    return (
        <div className="min-h-screen bg-slate-900 text-slate-100 font-sans pb-20">
            {/* Navigation Header */}
            <div className="fixed top-0 left-0 right-0 z-40 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 h-16 flex items-center px-6 justify-between">
                <div className="flex items-center space-x-4">
                    <button
                        onClick={() => navigate('/chapters')}
                        className="text-slate-400 hover:text-white transition-colors flex items-center space-x-2"
                    >
                        <ChevronLeft className="w-5 h-5" />
                        <span className="hidden sm:inline">{t('common.return_to_modules')}</span>
                    </button>
                    <div className="h-6 w-px bg-slate-700 mx-2"></div>
                    <h1 className="text-lg font-bold text-slate-200 truncate max-w-[200px] sm:max-w-md">
                        {chapter.title}
                    </h1>
                </div>

                <div className="flex items-center space-x-3 text-xs md:text-sm font-mono text-blue-400 bg-blue-500/10 px-3 py-1.5 rounded-full border border-blue-500/20">
                    <Activity className="w-4 h-4 animate-pulse" />
                    <span>{mode === 'simulation' ? t('common.active') : t('common.ready')}</span>
                </div>
            </div>

            <div className="pt-24 px-4 sm:px-6 max-w-7xl mx-auto">
                <AnimatePresence mode="wait">
                    {mode === 'briefing' && (
                        <motion.div
                            key="briefing"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="max-w-4xl mx-auto"
                        >
                            <div className="bg-slate-800 rounded-2xl border border-slate-700 shadow-2xl overflow-hidden">
                                {/* Hero Image Banner */}
                                <div className="h-48 sm:h-64 relative bg-slate-900 overflow-hidden">
                                    <div className="absolute inset-0 bg-cover bg-center opacity-60" style={{ backgroundImage: `url(${chapter.mainImage})` }} />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-800 to-transparent" />
                                    <div className="absolute bottom-0 left-0 p-8">
                                        <div className="text-blue-400 text-sm font-bold uppercase tracking-wider mb-2 flex items-center gap-2">
                                            <Sparkles className="w-4 h-4" />
                                            {t('briefing.start_simulation')}
                                        </div>
                                        <h2 className="text-3xl sm:text-5xl font-bold text-white shadow-black drop-shadow-lg">
                                            {chapter.title}
                                        </h2>
                                    </div>
                                </div>

                                <div className="p-8 sm:p-10">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
                                        <div className="col-span-2 prose prose-invert prose-lg text-slate-300">
                                            <p className="lead">{chapter.description}</p>
                                            <p className="text-sm border-l-4 border-blue-500/50 pl-4 italic text-slate-400">
                                                {t('briefing.based_on_history')}: "{chapter.historicalContext}"
                                            </p>
                                        </div>
                                        <div className="space-y-4">
                                            <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700/50">
                                                <div className="text-xs text-slate-500 uppercase tracking-widest mb-1">{t('briefing.time_period')}</div>
                                                <div className="font-semibold text-white">{chapter.period}</div>
                                            </div>
                                            <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700/50">
                                                <div className="text-xs text-slate-500 uppercase tracking-widest mb-1">{t('briefing.divergence_point')}</div>
                                                <div className="font-semibold text-white">{chapter.divergencePoint}</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-col sm:flex-row gap-4 justify-center sm:justify-start">
                                        {chapter.interactiveScenarios && chapter.interactiveScenarios.length > 0 ? (
                                            <button
                                                onClick={startSimulation}
                                                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl shadow-lg shadow-blue-600/25 transition-all text-lg font-semibold flex items-center justify-center space-x-3 active:scale-95"
                                            >
                                                <Play className="w-5 h-5 fill-current" />
                                                <span>{t('common.initialize_simulation')}</span>
                                            </button>
                                        ) : (
                                            <div className="bg-red-500/10 text-red-400 px-6 py-4 rounded-xl flex items-center space-x-3 border border-red-500/20">
                                                <AlertOctagon className="w-5 h-5" />
                                                <span>{t('briefing.no_scenarios')}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {mode === 'simulation' && chapter.interactiveScenarios && (
                        <motion.div
                            key="simulation"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8"
                        >
                            {/* Desktop Sidebar (Stats) */}
                            <div className="lg:col-span-3 order-2 lg:order-1 space-y-4">
                                <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
                                    <StatCard label={t('stats.freedom')} value={stats.freedom} color="text-blue-500" icon={<Globe className="w-6 h-6 text-blue-500" />} />
                                    <StatCard label={t('stats.chaos')} value={stats.chaos} color="text-red-500" icon={<Activity className="w-6 h-6 text-red-500" />} />
                                    <StatCard label={t('stats.diplomacy')} value={stats.diplomacy} color="text-purple-500" icon={<Shield className="w-6 h-6 text-purple-500" />} />
                                    <StatCard label={t('stats.strength')} value={stats.strength} color="text-amber-500" icon={<Zap className="w-6 h-6 text-amber-500" />} />
                                </div>
                            </div>

                            {/* Main Scenario Runner */}
                            <div className="lg:col-span-9 order-1 lg:order-2">
                                <ScenarioRunner
                                    scenario={chapter.interactiveScenarios[currentScenarioIndex]}
                                    onChoiceSelected={handleChoice}
                                    onComplete={() => { }}
                                />
                            </div>
                        </motion.div>
                    )}

                    {mode === 'result' && (
                        <motion.div
                            key="result"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="max-w-4xl mx-auto"
                        >
                            <div className={`bg-gradient-to-br ${outcome.bg} border border-slate-700/50 p-1 rounded-2xl shadow-2xl`}>
                                <div className="bg-slate-900/90 backdrop-blur-xl rounded-xl p-8 sm:p-12 h-full">
                                    <div className="flex flex-col items-center text-center mb-10">
                                        <div className="inline-flex items-center justify-center p-3 bg-slate-800 rounded-full mb-6 relative">
                                            <div className="absolute inset-0 bg-blue-500/20 blur-lg rounded-full animate-pulse"></div>
                                            <Sparkles className={`w-8 h-8 ${outcome.color} relative z-10`} />
                                        </div>

                                        <h2 className={`text-4xl sm:text-5xl font-bold mb-4 ${outcome.color}`}>
                                            {outcome.title}
                                        </h2>

                                        <p className="text-xl text-slate-300 max-w-xl mx-auto leading-relaxed">
                                            {outcome.desc}
                                        </p>
                                    </div>

                                    {/* Present Day Status Section */}
                                    <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50 mb-10">
                                        <div className="flex items-center space-x-2 mb-4 text-blue-400">
                                            <Calendar className="w-5 h-5" />
                                            <h3 className="font-bold text-sm uppercase tracking-widest">{t('world_status.title')}</h3>
                                        </div>
                                        <p className="text-lg text-slate-200 leading-relaxed italic">
                                            "{t('world_status.default')}"
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
                                        <div className="p-4 bg-slate-800 rounded-lg text-center">
                                            <div className="text-xs text-slate-500 uppercase font-bold mb-1">{t('stats.freedom')}</div>
                                            <div className="text-2xl font-bold text-white">{stats.freedom}</div>
                                        </div>
                                        <div className="p-4 bg-slate-800 rounded-lg text-center">
                                            <div className="text-xs text-slate-500 uppercase font-bold mb-1">{t('stats.chaos')}</div>
                                            <div className="text-2xl font-bold text-white">{stats.chaos}</div>
                                        </div>
                                        <div className="p-4 bg-slate-800 rounded-lg text-center">
                                            <div className="text-xs text-slate-500 uppercase font-bold mb-1">{t('stats.diplomacy')}</div>
                                            <div className="text-2xl font-bold text-white">{stats.diplomacy}</div>
                                        </div>
                                        <div className="p-4 bg-slate-800 rounded-lg text-center">
                                            <div className="text-xs text-slate-500 uppercase font-bold mb-1">{t('stats.strength')}</div>
                                            <div className="text-2xl font-bold text-white">{stats.strength}</div>
                                        </div>
                                    </div>

                                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                                        <button
                                            onClick={startSimulation}
                                            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg shadow-blue-600/20 transition-all flex items-center justify-center space-x-2"
                                        >
                                            <Play className="w-5 h-5" />
                                            <span>{t('common.re_run_simulation')}</span>
                                        </button>
                                        <button
                                            onClick={() => navigate('/chapters')}
                                            className="bg-slate-700 hover:bg-slate-600 text-white px-8 py-3 rounded-xl font-semibold transition-all flex items-center justify-center space-x-2"
                                        >
                                            <SkipBack className="w-5 h-5" />
                                            <span>{t('common.return_to_modules')}</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {mode === 'analyzing' && (
                        <motion.div
                            key="analyzing"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-50 bg-slate-900 flex flex-col items-center justify-center"
                        >
                            <div className="relative">
                                <div className="w-24 h-24 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <Zap className="w-8 h-8 text-blue-500 animate-pulse" />
                                </div>
                            </div>
                            <h2 className="mt-8 text-2xl font-bold text-white">{t('analyzing.detecting_divergence')}</h2>
                            <p className="text-slate-400 mt-2">{t('analyzing.analyzing_causality')}</p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default SimulationHub;
