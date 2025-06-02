import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, Globe, BookOpen, GitBranch, Sparkles } from 'lucide-react';
import ParticleSystem from '../components/common/ParticleSystem';
import SoundEffects from '../components/common/SoundEffects';

const LandingPage: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [windowSize, setWindowSize] = useState({ width: 1200, height: 800 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };

    // Set initial window size
    handleResize();
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const chapters = [
    { id: 'us-independence', title: 'US Independence (1776)', description: 'Revolutionary War alternatives', color: 'bg-red-600', icon: '🇺🇸', emoji: '⚔️' },
    { id: 'french-revolution', title: 'French Revolution (1789)', description: 'Paths not taken in France', color: 'bg-blue-600', icon: '🇫🇷', emoji: '🗿' },
    { id: 'lincoln-era', title: 'Lincoln Era (1860s)', description: 'Civil War alternate outcomes', color: 'bg-green-600', icon: '⚖️', emoji: '🎩' },
    { id: 'russian-empire', title: 'Russian Empire (1721-1917)', description: 'Tsarist Russia alternatives', color: 'bg-purple-600', icon: '👑', emoji: '🐻' },
    { id: 'lenin-revolution', title: 'Lenin Revolution (1917)', description: 'Bolshevik victory alternatives', color: 'bg-red-700', icon: '⚡', emoji: '🚩' },
    { id: 'hitler-rise', title: 'Hitler\'s Rise (1920s-1940s)', description: 'Preventing or changing WWII', color: 'bg-gray-700', icon: '⚠️', emoji: '🔨' },
    { id: 'world-war-1', title: 'World War I (1914-1918)', description: 'The Great War reimagined', color: 'bg-yellow-700', icon: '⚔️', emoji: '🎖️' },
    { id: 'world-war-2', title: 'World War II (1939-1945)', description: 'WWII alternative outcomes', color: 'bg-orange-600', icon: '🌍', emoji: '✈️' },
    { id: 'cold-war', title: 'Cold War (1947-1991)', description: 'Superpower rivalry alternatives', color: 'bg-indigo-600', icon: '❄️', emoji: '🚀' },
    { id: 'ussr-collapse', title: 'USSR Collapse (1991)', description: 'Soviet Union\'s different endings', color: 'bg-pink-600', icon: '🔨', emoji: '🧱' },
  ];


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 relative overflow-x-hidden w-full">
      {/* Sound Effects System */}
      <SoundEffects enabled={true} />
      
      {/* Subtle Particle System Background */}
      <ParticleSystem 
        particleCount={30}
        colors={['#64748B', '#94A3B8', '#CBD5E1']}
        speed={0.2}
        size={2}
        interactive={false}
        className="opacity-30"
      />

      {/* Dynamic background elements - Simplified */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-20"
            style={{
              left: `${20 + i * 10}%`,
              top: `${20 + (i % 3) * 20}%`,
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Mouse trail effect */}
      <motion.div
        className="fixed w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 pointer-events-none z-50 mix-blend-difference"
        style={{
          left: Math.min(Math.max(mousePosition.x - 12, 0), windowSize.width - 24),
          top: Math.min(Math.max(mousePosition.y - 12, 0), windowSize.height - 24),
        }}
        animate={{
          scale: [1, 1.5, 1],
        }}
        transition={{
          duration: 0.3,
          ease: "easeOut",
        }}
      />

      {/* Hero Section */}
      <section className="relative py-16 sm:py-24 lg:py-32 px-4 sm:px-6 z-10">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black mb-8 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">
              Multiversity
            </h1>
            
            <motion.p 
              className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-200 mb-12 max-w-4xl mx-auto leading-relaxed font-light px-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 1 }}
            >
              Explore 10 major historical events with{" "}
              <span className="font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                10 alternative timelines each
              </span>
              . Journey through the infinite paths history could have taken.
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mb-16 px-4"
          >
            {[
              { icon: Clock, text: "1776 - 2025", color: "text-blue-400" },
              { icon: Globe, text: "Global Impact", color: "text-green-400" },
              { icon: BookOpen, text: "100 Timelines", color: "text-purple-400" },
            ].map((item, index) => (
              <motion.div
                key={index}
                className={`flex items-center space-x-2 sm:space-x-3 ${item.color} text-sm sm:text-lg font-medium`}
                whileHover={{ scale: 1.1, y: -5 }}
                animate={{
                  y: [0, -5, 0],
                }}
                transition={{
                  y: {
                    duration: 2 + index * 0.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                  hover: { duration: 0.3 },
                }}
              >
                <motion.div
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 4 + index,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <item.icon className="w-6 h-6" />
                </motion.div>
                <span className="font-semibold">{item.text}</span>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="w-full sm:w-auto flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center"
          >
            <motion.div
              whileHover={{ 
                scale: 1.1,
                boxShadow: "0 0 50px rgba(59, 130, 246, 0.5)",
              }}
              whileTap={{ scale: 0.95 }}
              className="relative group"
            >
              <Link
                to="/chapters"
                className="relative inline-flex items-center space-x-3 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 hover:from-blue-700 hover:via-purple-700 hover:to-blue-700 text-white px-6 sm:px-10 py-4 sm:py-5 rounded-full text-lg sm:text-xl font-bold transition-all duration-300 shadow-2xl overflow-hidden"
                style={{
                  backgroundSize: '200% 200%',
                  animation: 'gradientShift 3s ease infinite',
                }}
              >
                <motion.div
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  <Sparkles className="w-6 h-6" />
                </motion.div>
                <span>Begin Exploration</span>
                <motion.div
                  animate={{
                    x: [0, 5, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <ArrowRight className="w-6 h-6" />
                </motion.div>
                
                {/* Animated background overlay */}
                <motion.div
                  className="absolute inset-0 bg-linear-to-r from-transparent via-white to-transparent opacity-20"
                  animate={{
                    x: ['-100%', '200%'],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  style={{
                    width: '50%',
                    height: '100%',
                    transform: 'skewX(-20deg)',
                  }}
                />
              </Link>
            </motion.div>

            <motion.div
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 0 30px rgba(139, 92, 246, 0.3)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/compare"
                className="inline-flex items-center space-x-2 bg-gray-800 hover:bg-gray-700 text-white border-2 border-purple-500 hover:border-purple-400 px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold transition-all duration-300 backdrop-blur-sm"
              >
                <GitBranch className="w-5 h-5" />
                <span>Compare Timelines</span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Project Description */}
      <section className="py-16 px-6 bg-slate-800/50">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl font-bold text-white mb-8"
          >
            What is Multiversity?
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6 text-gray-200 text-lg leading-relaxed"
          >
            <p>
              Multiversity is an <strong className="text-blue-400">interactive alternate history explorer</strong> that lets you journey through the infinite paths history could have taken. Discover how single moments in time could have changed everything.
            </p>
            <p>
              From the American Revolution to the collapse of the USSR, explore <strong className="text-purple-400">10 major historical chapters</strong> with <strong className="text-green-400">10 alternative timelines each</strong>. See how different decisions, outcomes, or events could have shaped our world differently.
            </p>
            <p>
              Experience <strong className="text-yellow-400">immersive storytelling</strong>, <strong className="text-pink-400">interactive timelines</strong>, and <strong className="text-cyan-400">cause-and-effect visualizations</strong> that bring alternative histories to life.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Chapters Preview */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl font-bold text-white text-center mb-12"
          >
            Historical Chapters
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
            {chapters.map((chapter, index) => (
              <motion.div
                key={chapter.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group"
              >
                <Link to={`/chapter/${chapter.id}`}>
                  <div className={`${chapter.color} p-4 sm:p-6 rounded-lg h-40 sm:h-48 flex flex-col justify-between text-white transition-transform group-hover:scale-105 shadow-lg`}>
                    <div>
                      <h3 className="text-sm sm:text-lg font-semibold mb-2 line-clamp-2">
                        {chapter.title}
                      </h3>
                      <p className="text-xs sm:text-sm opacity-90 line-clamp-3">
                        {chapter.description}
                      </p>
                    </div>
                    <div className="text-xs sm:text-sm opacity-75">
                      10 timelines
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 bg-slate-900">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl font-bold text-white text-center mb-12"
          >
            Interactive Experience
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">Timeline Navigation</h3>
              <p className="text-gray-300 text-sm sm:text-base">
                Navigate through centuries with smooth animations and detailed event exploration.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <GitBranch className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">Cause & Effect</h3>
              <p className="text-gray-300 text-sm sm:text-base">
                Visualize how small changes create massive butterfly effects across history.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">Global Impact</h3>
              <p className="text-gray-300 text-sm sm:text-base">
                See how alternative histories shape the world we know today.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;