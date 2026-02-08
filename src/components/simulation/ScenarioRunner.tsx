import React, { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { InteractiveScenario, StoryChoice, Timeline } from '../../types';
import { AlertTriangle, Zap, Shield, Crown, Sword, Heart, Users } from 'lucide-react';
import AnimatedSvgEmoji from '../../components/common/AnimatedSvgEmoji';
import { SimulationStats } from '../../hooks/useSimulation';
import { campaignSimulationRegistry } from '../../simulation/registry';
import { CampaignSnapshot } from '../../simulation/campaignTypes';

interface ScenarioRunnerProps {
  chapterId: string;
  scenario: InteractiveScenario;
  allScenarios: InteractiveScenario[];
  alternativeTimelines: Timeline[];
  stats: SimulationStats;
  history: string[];
  currentScenarioIndex: number;
  onChoiceSelected: (choice: StoryChoice) => void;
  onComplete: () => void;
}

const hashString = (value: string): number => {
  let hash = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
};

const ScenarioRunner: React.FC<ScenarioRunnerProps> = ({
  chapterId,
  scenario,
  allScenarios,
  alternativeTimelines,
  stats,
  history,
  currentScenarioIndex,
  onChoiceSelected,
}) => {
  const [typedText, setTypedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [showChoices, setShowChoices] = useState(false);

  const simulationRegistration = campaignSimulationRegistry[chapterId];

  const snapshots = useMemo<CampaignSnapshot[]>(() => {
    if (!simulationRegistration || allScenarios.length === 0) {
      return [];
    }

    const liveScenarioIndex = Math.max(0, Math.min(currentScenarioIndex, allScenarios.length - 1));
    const results: CampaignSnapshot[] = [];

    for (let step = 0; step <= history.length; step += 1) {
      const frameScenarioIndex = Math.min(step, liveScenarioIndex);
      const frameScenario = step === history.length ? scenario : allScenarios[frameScenarioIndex] ?? scenario;
      const frameHistory = history.slice(0, step);

      const state = simulationRegistration.buildState({
        scenario: frameScenario,
        stats,
        history: frameHistory,
        currentScenarioIndex: frameScenarioIndex,
        scenarios: allScenarios,
        alternativeTimelines,
      });

      results.push({
        id: `${frameScenario.id}:${step}`,
        label: step === history.length ? 'Live' : `Step ${step + 1}`,
        state,
        step,
      });
    }

    return results;
  }, [
    allScenarios,
    alternativeTimelines,
    currentScenarioIndex,
    history,
    scenario,
    simulationRegistration,
    stats,
  ]);

  const divergenceProbability = useMemo(() => {
    const signature = `${chapterId}:${scenario.id}:${history.join('|')}:${stats.chaos}:${stats.freedom}:${stats.diplomacy}:${stats.strength}`;
    return 10 + (hashString(signature) % 81);
  }, [chapterId, history, scenario.id, stats.chaos, stats.diplomacy, stats.freedom, stats.strength]);

  // Typewriter effect
  useEffect(() => {
    setTypedText('');
    setIsTyping(true);
    setShowChoices(false);
    let i = 0;
    const text = scenario.text;

    const interval = setInterval(() => {
      i += 1;
      setTypedText(text.slice(0, i));

      if (i >= text.length) {
        setIsTyping(false);
        setShowChoices(true);
        clearInterval(interval);
      }
    }, 20);

    return () => clearInterval(interval);
  }, [scenario.id, scenario.text]);

  const getSceneIcon = (sceneType: string) => {
    switch (sceneType) {
      case 'battle':
        return <Sword className="w-6 h-6" />;
      case 'negotiation':
        return <Users className="w-6 h-6" />;
      case 'exploration':
        return <Crown className="w-6 h-6" />;
      case 'decision':
        return <Heart className="w-6 h-6" />;
      case 'revelation':
        return <Zap className="w-6 h-6" />;
      default:
        return <Shield className="w-6 h-6" />;
    }
  };

  const View3D = simulationRegistration?.View3D;
  const has3DScene = Boolean(View3D && snapshots.length > 0);

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-6">
      <div className="relative w-full min-h-[600px] h-auto rounded-2xl overflow-hidden shadow-2xl bg-slate-900 border border-slate-700">
        <motion.div
          className={`absolute inset-0 ${scenario.background || 'bg-slate-900'}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ duration: 1 }}
        />

        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 via-slate-900/80 to-slate-900 z-0" />

        <div className="relative z-10 flex flex-col h-full p-6 md:p-10">
          <div className="flex justify-between items-start mb-8 text-white/80">
            <div className="flex items-center space-x-2">
              <span className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">{getSceneIcon(scenario.sceneType)}</span>
              <span className="font-mono text-sm tracking-widest uppercase">{scenario.timelineEvent || 'EVENT'}</span>
            </div>
            <div className="font-mono text-sm opacity-70">YEAR: {scenario.timelineYear}</div>
          </div>

          <div className="flex-1 flex flex-col items-center max-w-4xl mx-auto w-full">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-8 relative w-full"
            >
              {has3DScene && View3D ? (
                <View3D snapshots={snapshots} />
              ) : (
                <div className="mb-8 relative flex justify-center">
                  <AnimatedSvgEmoji
                    emoji={scenario.emoji}
                    size="8rem"
                    className="drop-shadow-2xl"
                    fallbackToEmoji
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  />
                </div>
              )}
            </motion.div>

            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 text-center tracking-tight">{scenario.title}</h2>

            {scenario.characters && scenario.characters.length > 0 && (
              <div className="flex justify-center space-x-4 mb-8">
                {scenario.characters.map((char, idx) => (
                  <motion.div
                    key={`${char}-${idx}`}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 + idx * 0.1 }}
                    className="w-14 h-14 bg-slate-800/80 rounded-full flex items-center justify-center border border-white/10 shadow-lg backdrop-blur-sm"
                  >
                    <AnimatedSvgEmoji emoji={char} size="2rem" fallbackToEmoji />
                  </motion.div>
                ))}
              </div>
            )}

            <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-xl p-6 md:p-8 w-full mb-8 min-h-[120px]">
              <p className="text-lg md:text-xl text-gray-100 leading-relaxed font-medium">
                {typedText}
                {isTyping && (
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                    className="inline-block w-2 h-6 bg-blue-400 ml-1 align-middle"
                  />
                )}
              </p>
            </div>

            <AnimatePresence>
              {showChoices && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="grid grid-cols-1 gap-4 w-full"
                >
                  {scenario.choices?.map((choice, index) => (
                    <motion.button
                      key={choice.id}
                      onClick={() => onChoiceSelected(choice)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="group relative overflow-hidden bg-gradient-to-r from-slate-800 to-slate-900 hover:from-blue-900 hover:to-slate-800 border border-slate-600 hover:border-blue-400 p-5 rounded-xl text-left transition-all duration-300 shadow-lg"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="font-semibold text-lg text-white block mb-1 group-hover:text-blue-200 transition-colors">
                            {choice.text}
                          </span>
                          {choice.modifiers && (
                            <div className="flex gap-2 mt-2">
                              {choice.modifiers.map((mod, idx) => (
                                <span
                                  key={`${choice.id}-${mod.stat}-${idx}`}
                                  className={`text-xs px-2 py-0.5 rounded-full font-mono ${
                                    mod.value > 0 ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'
                                  }`}
                                >
                                  {mod.stat} {mod.value > 0 ? '+' : ''}
                                  {mod.value}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                        {choice.linkedTimelineId ? (
                          <AlertTriangle className="w-5 h-5 text-amber-500 opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all" />
                        ) : (
                          <div className="w-5 h-5 rounded-full border-2 border-slate-600 group-hover:border-blue-400 transition-colors" />
                        )}
                      </div>
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="mt-8 flex justify-between items-center text-xs font-mono text-slate-500 uppercase tracking-widest">
            <span>Status: Simulation Active</span>
            <span>Divergence Probability: {divergenceProbability}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScenarioRunner;
