import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { InteractiveScenario, StoryChoice } from '../../types';
import { AlertTriangle, Terminal, Zap } from 'lucide-react';

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

    // Typewriter effect
    useEffect(() => {
        setTypedText('');
        setIsTyping(true);
        let i = 0;
        const text = scenario.text;
        const interval = setInterval(() => {
            if (i < text.length) {
                setTypedText((prev) => prev + text.charAt(i));
                i++;
            } else {
                setIsTyping(false);
                clearInterval(interval);
            }
        }, 30); // Typing speed

        return () => clearInterval(interval);
    }, [scenario]);

    return (
        <div className="w-full max-w-4xl mx-auto p-4 md:p-8">
            {/* Simulation Container */}
            <div className="relative bg-black/80 border border-green-500/30 rounded-lg overflow-hidden shadow-[0_0_50px_rgba(22,163,74,0.1)]">
                {/* CRT Scanline Overlay */}
                <div className="absolute inset-0 pointer-events-none z-20 scanlines opacity-50"></div>

                {/* Header HUD */}
                <div className="bg-green-900/10 border-b border-green-500/30 p-3 flex justify-between items-center relative z-10">
                    <div className="flex items-center space-x-2 text-green-500">
                        <Terminal className="w-4 h-4" />
                        <span className="font-mono text-xs tracking-widest uppercase">Simulation Active // {scenario.id}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-green-400/70 text-xs font-mono">
                        <span className="animate-pulse">REC</span>
                        <span>{scenario.timelineYear} AD</span>
                    </div>
                </div>

                {/* Content Area */}
                <div className="p-6 md:p-8 min-h-[400px] flex flex-col relative z-10">

                    {/* Main Visual/Icon */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex justify-center mb-8"
                    >
                        <div className="w-20 h-20 rounded-full bg-green-900/20 border border-green-500/50 flex items-center justify-center text-4xl shadow-[0_0_30px_rgba(34,197,94,0.3)] animate-pulse-slow">
                            {scenario.emoji}
                        </div>
                    </motion.div>

                    {/* Scenario Text */}
                    <div className="font-mono text-lg md:text-xl text-green-100 leading-relaxed mb-12 min-h-[100px]">
                        {typedText}
                        {isTyping && <span className="inline-block w-2.5 h-5 bg-green-500 ml-1 animate-pulse" />}
                    </div>

                    {/* Choices Grid */}
                    <AnimatePresence>
                        {!isTyping && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-auto"
                            >
                                {scenario.choices?.map((choice, index) => (
                                    <button
                                        key={choice.id}
                                        onClick={() => onChoiceSelected(choice)}
                                        className="group relative p-4 text-left bg-green-900/10 border border-green-500/30 hover:bg-green-500/10 hover:border-green-400 transition-all duration-300 rounded-sm overflow-hidden"
                                    >
                                        <div className="absolute inset-0 bg-green-500/5 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />

                                        <div className="relative z-10 flex items-start space-x-3">
                                            <div className="mt-1 min-w-[20px] text-green-500/50 font-mono text-xs group-hover:text-green-400">{String.fromCharCode(65 + index)}.</div>
                                            <div className="flex-grow">
                                                <div className="font-bold text-green-300 group-hover:text-white transition-colors font-mono mb-1">
                                                    {choice.text}
                                                </div>

                                                {/* Stat Modifiers Preview */}
                                                {choice.modifiers && (
                                                    <div className="flex flex-wrap gap-2 mt-2 opacity-60 group-hover:opacity-100 transition-opacity">
                                                        {choice.modifiers.map((mod, i) => (
                                                            <span key={i} className={`text-[10px] uppercase border px-1 rounded-xs ${mod.value > 0 ? 'border-green-500/50 text-green-400' : 'border-red-500/50 text-red-400'
                                                                }`}>
                                                                {mod.value > 0 ? '+' : ''}{mod.value} {mod.stat}
                                                            </span>
                                                        ))}
                                                    </div>
                                                )}

                                                {choice.linkedTimelineId ? (
                                                    <div className="flex items-center space-x-1 text-xs text-orange-400 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <AlertTriangle className="w-3 h-3" />
                                                        <span>DIVERGENCE DETECTED</span>
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center space-x-1 text-xs text-blue-400 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <Zap className="w-3 h-3" />
                                                        <span>STABLE TIMELINE</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </button>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Footer HUD */}
                <div className="bg-black border-t border-green-900/50 p-2 flex justify-between items-center text-[10px] text-green-900 font-mono uppercase tracking-wider relative z-10">
                    <div>System: Online</div>
                    <div>Mem: 64TB // CPU: 12%</div>
                </div>
            </div>
        </div>
    );
};

export default ScenarioRunner;
