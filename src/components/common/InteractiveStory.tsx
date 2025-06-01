import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, SkipForward, RotateCcw, Sword, Shield, Crown, Heart, Zap, Users } from 'lucide-react';

interface StoryChoice {
  id: string;
  text: string;
  consequence: string;
  nextSceneId?: string;
}

interface StoryScene {
  id: string;
  title: string;
  text: string;
  emoji: string;
  background: string;
  characters: string[];
  sceneType: 'battle' | 'negotiation' | 'exploration' | 'decision' | 'revelation';
  visualEffects?: string[];
  choices?: StoryChoice[];
  timelineYear?: number;
  timelineEvent?: string;
  soundEffect?: string;
}

interface InteractiveStoryProps {
  title: string;
  scenes: StoryScene[];
  onComplete?: () => void;
}

const InteractiveStory: React.FC<InteractiveStoryProps> = ({
  title,
  scenes,
  onComplete
}) => {
  const [currentScene, setCurrentScene] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showText, setShowText] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const [showChoices, setShowChoices] = useState(false);
  const [selectedChoice, setSelectedChoice] = useState<StoryChoice | null>(null);
  const [storyPath, setStoryPath] = useState<number[]>([0]);
  const [showVisualEffects, setShowVisualEffects] = useState(false);

  useEffect(() => {
    if (isPlaying && showText) {
      const text = scenes[currentScene].text;
      let index = 0;
      
      const typeWriter = setInterval(() => {
        if (index < text.length) {
          setDisplayedText(text.slice(0, index + 1));
          index++;
        } else {
          clearInterval(typeWriter);
          // Show choices after text is complete
          if (scenes[currentScene].choices && scenes[currentScene].choices!.length > 0) {
            setTimeout(() => setShowChoices(true), 1000);
          }
        }
      }, 30);

      return () => clearInterval(typeWriter);
    }
  }, [currentScene, isPlaying, showText, scenes]);

  const startScene = () => {
    setIsPlaying(true);
    setShowText(true);
    setDisplayedText('');
    setShowVisualEffects(true);
  };

  const handleChoiceSelect = (choice: StoryChoice) => {
    setSelectedChoice(choice);
    setShowChoices(false);
    
    // Show consequence animation
    setTimeout(() => {
      nextScene();
    }, 2000);
  };

  const nextScene = () => {
    if (currentScene < scenes.length - 1) {
      const nextIndex = currentScene + 1;
      setCurrentScene(nextIndex);
      setStoryPath([...storyPath, nextIndex]);
      setShowText(false);
      setShowChoices(false);
      setSelectedChoice(null);
      setTimeout(() => {
        setShowText(true);
        setDisplayedText('');
      }, 500);
    } else {
      onComplete?.();
    }
  };

  const resetStory = () => {
    setCurrentScene(0);
    setIsPlaying(false);
    setShowText(false);
    setDisplayedText('');
    setShowChoices(false);
    setSelectedChoice(null);
    setStoryPath([0]);
    setShowVisualEffects(false);
  };

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

  const getVisualEffectsForScene = (sceneType: string) => {
    switch (sceneType) {
      case 'battle':
        return (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-3 h-3"
                style={{
                  left: `${10 + Math.random() * 80}%`,
                  top: `${10 + Math.random() * 80}%`,
                }}
                animate={{
                  scale: [0, 1.5, 0],
                  rotate: [0, 180, 360],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
              >
                ⚔️
              </motion.div>
            ))}
          </div>
        );
      case 'negotiation':
        return (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-4 h-4"
                style={{
                  left: `${20 + Math.random() * 60}%`,
                  top: `${20 + Math.random() * 60}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.5,
                }}
              >
                💬
              </motion.div>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  const currentSceneData = scenes[currentScene];

  return (
    <div className="relative w-full min-h-[700px] h-auto rounded-2xl overflow-hidden shadow-2xl bg-gray-900 border border-gray-700">
      {/* Dynamic Animated Background */}
      <motion.div
        className={`absolute inset-0 ${currentSceneData.background}`}
        animate={{
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Scene-specific Visual Effects */}
      {showVisualEffects && getVisualEffectsForScene(currentSceneData.sceneType)}

      {/* Scene Content */}
      <div className="relative z-10 h-full flex flex-col">
        {/* Header with Scene Type */}
        <div className="p-6 text-center">
          <motion.div
            className="flex items-center justify-center space-x-3 mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-primary-400">
              {getSceneIcon(currentSceneData.sceneType)}
            </div>
            <h3 className="text-2xl font-bold text-white">
              {title}
            </h3>
          </motion.div>
          <div className="text-sm text-white opacity-75 mb-2">
            Scene {currentScene + 1} of {scenes.length} • {currentSceneData.sceneType.toUpperCase()}
          </div>
          {currentSceneData.timelineYear && (
            <div className="text-primary-400 font-semibold">
              📅 {currentSceneData.timelineYear}
            </div>
          )}
        </div>

        {/* Main Interactive Scene Area */}
        <div className="flex-1 flex flex-col items-center justify-center px-6 space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentScene}
              className="text-center w-full max-w-3xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {/* Large Scene Emoji with Dynamic Animation */}
              <motion.div
                className="text-9xl mb-6"
                animate={{
                  scale: currentSceneData.sceneType === 'battle' ? [1, 1.3, 1] : [1, 1.1, 1],
                  rotate: currentSceneData.sceneType === 'battle' ? [0, 10, -10, 0] : [0, 3, -3, 0],
                }}
                transition={{
                  duration: currentSceneData.sceneType === 'battle' ? 1.5 : 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                {currentSceneData.emoji}
              </motion.div>

              {/* Scene Title with Icon */}
              <motion.h4
                className="text-2xl font-bold text-white mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {currentSceneData.title}
              </motion.h4>

              {/* Interactive Character Display */}
              <div className="flex justify-center space-x-4 mb-6">
                {currentSceneData.characters.map((character, index) => (
                  <motion.div
                    key={character}
                    className="w-12 h-12 bg-linear-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-xl font-bold text-white shadow-lg"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.5 + index * 0.2, type: "spring", stiffness: 200 }}
                    whileHover={{ scale: 1.3, rotate: 10 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {character}
                  </motion.div>
                ))}
              </div>

              {/* Story Text with Better Styling */}
              <AnimatePresence>
                {showText && (
                  <motion.div
                    className="bg-black bg-opacity-60 backdrop-blur-md rounded-xl p-6 max-w-2xl mx-auto mb-6 border border-white border-opacity-20"
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: -20 }}
                    transition={{ duration: 0.4 }}
                  >
                    <p className="text-white text-lg leading-relaxed">
                      {displayedText}
                      <motion.span
                        className="inline-block w-1 h-5 bg-primary-400 ml-1"
                        animate={{ opacity: [1, 0] }}
                        transition={{ duration: 0.5, repeat: Infinity }}
                      />
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Selected Choice Consequence */}
              <AnimatePresence>
                {selectedChoice && (
                  <motion.div
                    className="bg-linear-to-r from-green-600 to-blue-600 rounded-xl p-4 max-w-xl mx-auto mb-6"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                  >
                    <p className="text-white font-semibold">
                      ✨ {selectedChoice.consequence}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Interactive Choices */}
              <AnimatePresence>
                {showChoices && currentSceneData.choices && (
                  <motion.div
                    className="space-y-3 max-w-xl mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <p className="text-primary-300 font-semibold mb-4">Choose your action:</p>
                    {currentSceneData.choices.map((choice, index) => (
                      <motion.button
                        key={choice.id}
                        onClick={() => handleChoiceSelect(choice)}
                        className="w-full bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white p-4 rounded-lg transition-all duration-300 transform"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.2 }}
                        whileHover={{ scale: 1.02, x: 5 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span className="font-semibold">{choice.text}</span>
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Enhanced Controls */}
        <div className="p-6 flex justify-center space-x-4">
          {!isPlaying ? (
            <motion.button
              onClick={startScene}
              className="bg-linear-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-4 rounded-full flex items-center space-x-3 transition-all duration-300 text-lg font-semibold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Play className="w-5 h-5" />
              <span>Begin Interactive Story</span>
            </motion.button>
          ) : (
            <>
              {!showChoices && (
                <motion.button
                  onClick={nextScene}
                  className="bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-full transition-all duration-300 flex items-center space-x-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={displayedText !== currentSceneData.text}
                >
                  <span>Continue</span>
                  <SkipForward className="w-4 h-4" />
                </motion.button>
              )}

              <motion.button
                onClick={resetStory}
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-3 rounded-full transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <RotateCcw className="w-4 h-4" />
              </motion.button>
            </>
          )}
        </div>

        {/* Interactive Timeline Progress */}
        <div className="px-6 pb-6">
          <div className="w-full bg-gray-700 rounded-full h-3 mb-3">
            <motion.div
              className="bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 h-3 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${((currentScene + 1) / scenes.length) * 100}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </div>
          
          {/* Timeline Events */}
          {currentSceneData.timelineEvent && (
            <motion.div
              className="text-center text-sm text-gray-300 bg-dark-800 rounded-lg p-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              🏛️ {currentSceneData.timelineEvent}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InteractiveStory;