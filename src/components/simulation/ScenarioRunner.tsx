import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { InteractiveScenario, StoryChoice } from '../../types';
import { AlertTriangle, Zap, Shield, Crown, Sword, Heart, Users } from 'lucide-react';
import AnimatedSvgEmoji from '../../components/common/AnimatedSvgEmoji';

interface ScenarioRunnerProps {
    scenario: InteractiveScenario;
    onChoiceSelected: (choice: StoryChoice) => void;
    onComplete: () => void;
}

const ScenarioRunner: React.FC<ScenarioRunnerProps> = ({
    scenario,
    onChoiceSelected,
}) => {
    const [typedText, setTypedText] = useState('');
    const [isTyping, setIsTyping] = useState(true);
    const [showChoices, setShowChoices] = useState(false);

    // Typewriter effect
    useEffect(() => {
        setTypedText('');
        setIsTyping(true);
        setShowChoices(false);
        let i = 0;
        const text = scenario.text;
        const interval = setInterval(() => {
            if (i < text.length) {
                setTypedText((prev) => prev + text.charAt(i));
                i++;
            } else {
                setIsTyping(false);
                setShowChoices(true);
                clearInterval(interval);
            }
        }, 20); // Slightly faster typing

        return () => clearInterval(interval);
    }, [scenario]);

    const getSceneIcon = (sceneType: string) => {
        switch (sceneType) {
            case 'battle': return <Sword className="w-6 h-6" />;
            case 'negotiation': return <Users className="w-6 h-6" />;
            case 'exploration': return <Crown className="w-6 h-6" />;
            case 'decision': return <Heart className="w-6 h-6" />;
            case 'revelation': return <Zap className="w-6 h-6" />;
            default: return <Shield className="w-6 h-6" />;
        }
    };

    return (
        <div className="w-full max-w-5xl mx-auto p-4 md:p-6">
            <div className="relative w-full min-h-[600px] h-auto rounded-2xl overflow-hidden shadow-2xl bg-slate-900 border border-slate-700">

                {/* Dynamic Background from Scenario Data */}
                <motion.div
                    className={`absolute inset-0 ${scenario.background || 'bg-slate-900'}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.8 }}
                    transition={{ duration: 1 }}
                />

                {/* Overlay Gradient for Readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 via-slate-900/80 to-slate-900 z-0"></div>

                <div className="relative z-10 flex flex-col h-full p-6 md:p-10">
                    {/* Header */}
                    <div className="flex justify-between items-start mb-8 text-white/80">
                        <div className="flex items-center space-x-2">
                            <span className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
                                {getSceneIcon(scenario.sceneType)}
                            </span>
                            <span className="font-mono text-sm tracking-widest uppercase">{scenario.timelineEvent || 'EVENT'}</span>
                        </div>
                        <div className="font-mono text-sm opacity-70">
                            YEAR: {scenario.timelineYear}
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <div className="flex-1 flex flex-col items-center max-w-3xl mx-auto w-full">

                        {/* Main Interaction Visual */}
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            className="mb-8 relative"
                        >
                            <AnimatedSvgEmoji
                                emoji={scenario.emoji}
                                size="8rem"
                                className="drop-shadow-2xl"
                                fallbackToEmoji={true}
                                animate={{
                                    y: [0, -10, 0],
                                }}
                                transition={{
                                    duration: 4,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            />
                        </motion.div>

                        {/* Title */}
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 text-center tracking-tight">
                            {scenario.title}
                        </h2>

                        {/* Character Avatars */}
                        {scenario.characters && scenario.characters.length > 0 && (
                            <div className="flex justify-center space-x-4 mb-8">
                                {scenario.characters.map((char, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, scale: 0 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.2 + idx * 0.1 }}
                                        className="w-14 h-14 bg-slate-800/80 rounded-full flex items-center justify-center border border-white/10 shadow-lg backdrop-blur-sm"
                                    >
                                        <AnimatedSvgEmoji emoji={char} size="2rem" fallbackToEmoji={true} />
                                    </motion.div>
                                ))}
                            </div>
                        )}

                        {/* Story Text Box with Typewriter */}
                        <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-xl p-6 md:p-8 w-full mb-8 min-h-[120px]">
                            <p className="text-lg md:text-xl text-gray-100 leading-relaxed font-medium">
                                {typedText}
                                {isTyping && <motion.span
                                    animate={{ opacity: [1, 0] }}
                                    transition={{ duration: 0.5, repeat: Infinity }}
                                    className="inline-block w-2 h-6 bg-blue-400 ml-1 align-middle"
                                />}
                            </p>
                        </div>

                        {/* Choices */}
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
                                                            {choice.modifiers.map((mod, i) => (
                                                                <span key={i} className={`text-xs px-2 py-0.5 rounded-full font-mono ${mod.value > 0 ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'
                                                                    }`}>
                                                                    {mod.stat} {mod.value > 0 ? '+' : ''}{mod.value}
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

                    {/* Footer Status */}
                    <div className="mt-8 flex justify-between items-center text-xs font-mono text-slate-500 uppercase tracking-widest">
                        <span>Status: Simulation Active</span>
                        <span>Divergence Probability: {Math.floor(Math.random() * 20)}%</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ScenarioRunner;
