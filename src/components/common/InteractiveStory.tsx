import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, SkipForward, RotateCcw } from 'lucide-react';

interface StoryScene {
  id: string;
  title: string;
  text: string;
  emoji: string;
  background: string;
  characters: string[];
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
        }
      }, 50);

      return () => clearInterval(typeWriter);
    }
  }, [currentScene, isPlaying, showText, scenes]);

  const startScene = () => {
    setIsPlaying(true);
    setShowText(true);
    setDisplayedText('');
  };

  const nextScene = () => {
    if (currentScene < scenes.length - 1) {
      setCurrentScene(currentScene + 1);
      setShowText(false);
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
  };

  const currentSceneData = scenes[currentScene];

  return (
    <div className="relative w-full h-96 rounded-2xl overflow-hidden shadow-2xl">
      {/* Animated Background */}
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

      {/* Floating Elements */}
      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              x: [0, Math.random() * 20 - 10, 0],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Scene Content */}
      <div className="relative z-10 h-full flex flex-col">
        {/* Header */}
        <div className="p-6 text-center">
          <motion.h3
            className="text-2xl font-bold text-white mb-2"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {title}
          </motion.h3>
          <div className="text-sm text-white opacity-75">
            Scene {currentScene + 1} of {scenes.length}
          </div>
        </div>

        {/* Main Scene Area */}
        <div className="flex-1 flex items-center justify-center px-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentScene}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {/* Scene Emoji */}
              <motion.div
                className="text-8xl mb-6"
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                {currentSceneData.emoji}
              </motion.div>

              {/* Scene Title */}
              <motion.h4
                className="text-xl font-bold text-white mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {currentSceneData.title}
              </motion.h4>

              {/* Character Icons */}
              <div className="flex justify-center space-x-2 mb-4">
                {currentSceneData.characters.map((character, index) => (
                  <motion.div
                    key={character}
                    className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-sm"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    whileHover={{ scale: 1.2 }}
                  >
                    {character}
                  </motion.div>
                ))}
              </div>

              {/* Story Text */}
              <AnimatePresence>
                {showText && (
                  <motion.div
                    className="bg-black bg-opacity-40 backdrop-blur-sm rounded-lg p-4 max-w-md mx-auto"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                  >
                    <p className="text-white text-sm leading-relaxed">
                      {displayedText}
                      <motion.span
                        className="inline-block w-1 h-4 bg-white ml-1"
                        animate={{ opacity: [1, 0] }}
                        transition={{ duration: 0.5, repeat: Infinity }}
                      />
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="p-6 flex justify-center space-x-4">
          {!isPlaying ? (
            <motion.button
              onClick={startScene}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full flex items-center space-x-2 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Play className="w-4 h-4" />
              <span>Start Story</span>
            </motion.button>
          ) : (
            <>
              <motion.button
                onClick={() => setIsPlaying(!isPlaying)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-full transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </motion.button>

              <motion.button
                onClick={nextScene}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-3 rounded-full transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <SkipForward className="w-4 h-4" />
              </motion.button>

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

        {/* Progress Bar */}
        <div className="px-6 pb-4">
          <div className="w-full bg-gray-700 rounded-full h-2">
            <motion.div
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${((currentScene + 1) / scenes.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveStory;