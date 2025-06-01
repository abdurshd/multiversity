import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Person } from '../../types';

interface AnimatedCharacterProps {
  character: Person;
  onInteract: (character: Person) => void;
  style?: React.CSSProperties;
}

const AnimatedCharacter: React.FC<AnimatedCharacterProps> = ({ 
  character, 
  onInteract, 
  style 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
    onInteract(character);
    setTimeout(() => setIsClicked(false), 300);
  };

  // Generate random personality-based animations
  const getPersonalityAnimation = () => {
    const nameHash = character.name.length + character.role.length;
    const animationType = nameHash % 4;

    switch (animationType) {
      case 0: // Bouncy character
        return {
          y: [0, -10, 0],
          scale: [1, 1.1, 1],
        };
      case 1: // Swaying character
        return {
          rotate: [0, 5, -5, 0],
          x: [0, 3, -3, 0],
        };
      case 2: // Pulsing character
        return {
          scale: [1, 1.05, 1],
          opacity: [0.9, 1, 0.9],
        };
      default: // Floating character
        return {
          y: [0, -8, 0],
          x: [0, 2, 0],
        };
    }
  };

  const personalityAnimation = getPersonalityAnimation();

  return (
    <motion.div
      className="relative cursor-pointer"
      style={style}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Character Container */}
      <motion.div
        className="relative w-24 h-32 mx-auto"
        animate={personalityAnimation}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {/* Character Avatar */}
        <motion.div
          className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center text-2xl font-bold text-white mx-auto mb-2 shadow-lg"
          animate={isClicked ? { rotate: 360, scale: 1.2 } : {}}
          transition={{ duration: 0.5 }}
        >
          {character.name.charAt(0)}
        </motion.div>

        {/* Character Name */}
        <motion.div
          className="text-center text-white text-xs font-semibold px-2 py-1 bg-dark-800 rounded-lg"
          animate={isHovered ? { y: -5 } : {}}
        >
          {character.name.split(' ')[0]}
        </motion.div>

        {/* Floating Emoji based on character */}
        <motion.div
          className="absolute -top-2 -right-2 text-lg"
          animate={{
            rotate: [0, 10, -10, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {character.role.includes('King') || character.role.includes('Tsar') || character.role.includes('Emperor') ? '👑' :
           character.role.includes('General') || character.role.includes('Military') ? '⚔️' :
           character.role.includes('President') ? '🎩' :
           character.role.includes('Queen') ? '💎' :
           character.role.includes('Revolutionary') || character.role.includes('Activist') ? '✊' :
           character.role.includes('Writer') || character.role.includes('Author') ? '✍️' :
           character.role.includes('Scientist') || character.role.includes('Inventor') ? '🔬' :
           character.role.includes('Artist') || character.role.includes('Painter') ? '🎨' :
           character.role.includes('Monk') || character.role.includes('Religious') ? '🙏' :
           '⭐'}
        </motion.div>

        {/* Interactive sparkles when hovered */}
        <AnimatePresence>
          {isHovered && (
            <>
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-yellow-400 rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ 
                    scale: [0, 1, 0], 
                    opacity: [0, 1, 0],
                    x: [0, (Math.random() - 0.5) * 40],
                    y: [0, (Math.random() - 0.5) * 40],
                  }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ 
                    duration: 1,
                    delay: i * 0.1,
                    repeat: Infinity,
                    repeatDelay: 2
                  }}
                />
              ))}
            </>
          )}
        </AnimatePresence>

        {/* Speech bubble on click */}
        <AnimatePresence>
          {isClicked && (
            <motion.div
              className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-white text-dark-900 text-xs p-2 rounded-lg shadow-lg z-10 w-32"
              initial={{ scale: 0, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0, opacity: 0, y: 10 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-center font-semibold">
                {character.role.includes('King') || character.role.includes('Tsar') ? "Royal vibes!" :
                 character.role.includes('Revolutionary') ? "Viva la revolución!" :
                 character.role.includes('General') ? "Ready for battle!" :
                 character.role.includes('President') ? "Democracy rules!" :
                 "Hello there!"}
              </div>
              {/* Speech bubble tail */}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white"></div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Character stats on hover */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-dark-800 text-white text-xs p-3 rounded-lg shadow-lg z-10 w-48"
            initial={{ scale: 0, opacity: 0, y: -10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-center">
              <div className="font-bold text-sm mb-1">{character.name}</div>
              <div className="text-gray-300 mb-2">{character.role}</div>
              <div className="text-xs text-gray-400">
                {character.born} - {character.died || 'Present'}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default AnimatedCharacter;