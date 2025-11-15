import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, Globe, BookOpen, GitBranch, Sparkles } from 'lucide-react';

const LandingPage: React.FC = () => {
  const chapters = useMemo(() => [
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
  ], []);


  return (
    <div className="min-h-screen bg-slate-900 relative overflow-x-hidden w-full">

      {/* Hero Section */}
      <section className="relative py-16 sm:py-24 lg:py-32 px-4 sm:px-6 z-10">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 text-white">
              Multiversity
            </h1>

            <p className="text-xl md:text-2xl text-slate-300 mb-10 max-w-3xl mx-auto px-4">
              Explore 10 major historical events with{" "}
              <span className="font-semibold text-blue-400">
                10 alternative timelines each
              </span>
              . Journey through the infinite paths history could have taken.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 mb-12 px-4"
          >
            {[
              { icon: Clock, text: "1776 - 2025", color: "text-blue-400" },
              { icon: Globe, text: "Global Impact", color: "text-green-400" },
              { icon: BookOpen, text: "100 Timelines", color: "text-purple-400" },
            ].map((item, index) => (
              <div
                key={`stat-${index}`}
                className={`flex items-center space-x-2 ${item.color} text-lg font-medium`}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.text}</span>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link
              to="/chapters"
              className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors"
            >
              <Sparkles className="w-5 h-5" />
              <span>Begin Exploration</span>
              <ArrowRight className="w-5 h-5" />
            </Link>

            <Link
              to="/compare"
              className="inline-flex items-center space-x-2 bg-slate-700 hover:bg-slate-600 text-white border border-slate-600 px-8 py-3 rounded-lg text-lg font-semibold transition-colors"
            >
              <GitBranch className="w-5 h-5" />
              <span>Compare Timelines</span>
            </Link>
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