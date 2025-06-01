import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Clock, Globe, BookOpen, GitBranch, Sparkles } from 'lucide-react';
import ParticleSystem from '../components/common/ParticleSystem';
import SoundEffects from '../components/common/SoundEffects';

const LandingPage: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '200%']);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
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
    <div className="min-h-screen bg-linear-to-br from-slate-900 to-slate-800 relative">
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

      {/* Dynamic background elements */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        style={{ y: backgroundY }}
      >
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [1, 2, 1],
              opacity: [0.3, 0.8, 0.3],
              x: [0, Math.random() * 100 - 50, 0],
              y: [0, Math.random() * 100 - 50, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
          />
        ))}
      </motion.div>

      {/* Mouse trail effect */}
      <motion.div
        className="fixed w-6 h-6 rounded-full bg-linear-to-r from-blue-500 to-purple-500 pointer-events-none z-50 mix-blend-difference"
        style={{
          left: mousePosition.x - 12,
          top: mousePosition.y - 12,
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
      <section className="relative py-32 px-6 z-10">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            style={{ y: textY }}
          >
            {/* Floating elements around title */}
            <div className="relative">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute text-4xl opacity-20"
                  style={{
                    left: `${30 + i * 20}%`,
                    top: `${-10 + (i % 2) * 20}%`,
                  }}
                  animate={{
                    y: [0, -20, 0],
                    rotate: [0, 360],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 4 + i,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  {['⚡', '🌟', '⭐', '✨', '💫', '🔮'][i]}
                </motion.div>
              ))}
              
              <motion.h1 
                className="text-7xl md:text-9xl font-black mb-8 relative"
                style={{
                  background: 'linear-gradient(45deg, #3B82F6, #8B5CF6, #06B6D4, #10B981, #F59E0B, #EF4444)',
                  backgroundSize: '300% 300%',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  filter: 'drop-shadow(0 0 30px rgba(59, 130, 246, 0.5))',
                }}
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <motion.span
                  animate={{
                    textShadow: [
                      '0 0 20px rgba(59, 130, 246, 0.5)',
                      '0 0 40px rgba(139, 92, 246, 0.5)',
                      '0 0 20px rgba(59, 130, 246, 0.5)',
                    ],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  Multi
                </motion.span>
                <motion.span
                  className="relative"
                  animate={{
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  style={{
                    background: 'linear-gradient(45deg, #3B82F6, #8B5CF6, #06B6D4, #10B981, #F59E0B, #EF4444)',
                    backgroundSize: '300% 300%',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  verse
                  <motion.div
                    className="absolute -top-4 -right-4 text-2xl"
                    animate={{
                      rotate: [0, 360],
                      scale: [1, 1.3, 1],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    ✨
                  </motion.div>
                </motion.span>
              </motion.h1>
            </div>
            
            <motion.p 
              className="text-2xl md:text-3xl text-gray-200 mb-12 max-w-4xl mx-auto leading-relaxed font-light"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 1 }}
            >
              <motion.span
                animate={{
                  color: ['#E5E7EB', '#3B82F6', '#8B5CF6', '#E5E7EB'],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                Explore 10 major historical events
              </motion.span>
              {" "}with{" "}
              <motion.span
                className="font-bold bg-linear-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent"
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                10 alternative timelines each
              </motion.span>
              .{" "}
              <motion.span
                animate={{
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                Journey through the infinite paths history could have taken.
              </motion.span>
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-8 mb-16"
          >
            {[
              { icon: Clock, text: "1776 - 2025", color: "text-blue-400" },
              { icon: Globe, text: "Global Impact", color: "text-green-400" },
              { icon: BookOpen, text: "100 Timelines", color: "text-purple-400" },
            ].map((item, index) => (
              <motion.div
                key={index}
                className={`flex items-center space-x-3 ${item.color} text-lg font-medium`}
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
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
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
                className="relative inline-flex items-center space-x-3 bg-linear-to-r from-blue-600 via-purple-600 to-blue-600 hover:from-blue-700 hover:via-purple-700 hover:to-blue-700 text-white px-10 py-5 rounded-full text-xl font-bold transition-all duration-300 shadow-2xl overflow-hidden"
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
                className="inline-flex items-center space-x-2 bg-gray-800 hover:bg-gray-700 text-white border-2 border-purple-500 hover:border-purple-400 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 backdrop-blur-xs"
              >
                <GitBranch className="w-5 h-5" />
                <span>Compare Timelines</span>
              </Link>
            </motion.div>
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
            className="text-4xl font-bold text-white text-center mb-12"
          >
            Historical Chapters
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
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
                  <div className={`${chapter.color} p-6 rounded-lg h-48 flex flex-col justify-between text-white transition-transform group-hover:scale-105`}>
                    <div>
                      <h3 className="text-lg font-semibold mb-2 line-clamp-2">
                        {chapter.title}
                      </h3>
                      <p className="text-sm opacity-90 line-clamp-3">
                        {chapter.description}
                      </p>
                    </div>
                    <div className="text-sm opacity-75">
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
      <section className="py-16 px-6 bg-dark-800">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-white text-center mb-12"
          >
            Interactive Experience
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Timeline Navigation</h3>
              <p className="text-gray-300">
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
              <h3 className="text-xl font-semibold text-white mb-2">Cause & Effect</h3>
              <p className="text-gray-300">
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
              <h3 className="text-xl font-semibold text-white mb-2">Global Impact</h3>
              <p className="text-gray-300">
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