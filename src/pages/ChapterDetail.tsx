import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Users, MapPin, GitBranch, Clock, ArrowRight, Percent, PlayCircle, Sparkles } from 'lucide-react';
import { Chapter, Person } from '../types';
import { getChapterById } from '../data';
import AnimatedCharacter from '../components/common/AnimatedCharacter';
import InteractiveStory from '../components/common/InteractiveStory';
import ParticleSystem from '../components/common/ParticleSystem';

const ChapterDetail: React.FC = () => {
  const { chapterId } = useParams<{ chapterId: string }>();
  const [chapter, setChapter] = useState<Chapter | null>(null);
  const [selectedTimeline, setSelectedTimeline] = useState<string | null>(null);
  const [selectedCharacter, setSelectedCharacter] = useState<Person | null>(null);
  const [showStory, setShowStory] = useState(false);

  useEffect(() => {
    if (chapterId) {
      const foundChapter = getChapterById(chapterId);
      setChapter(foundChapter || null);
    }
  }, [chapterId]);

  const getStoryScenes = (chapter: Chapter) => {
    // Use chapter's interactive scenarios if available, otherwise fall back to generated ones
    if (chapter.interactiveScenarios && chapter.interactiveScenarios.length > 0) {
      return chapter.interactiveScenarios;
    }

    // Fallback to generated scenarios for chapters without custom ones
    const scenes = [
      {
        id: 'opening',
        title: 'The Setting',
        text: `Welcome to ${chapter.period}. The world is about to change forever...`,
        emoji: chapter.icon,
        background: 'bg-gradient-to-br from-purple-600 to-blue-800',
        characters: ['🏛️', '⚡', '🌍'],
        sceneType: 'exploration' as const,
        timelineYear: chapter.startYear,
        timelineEvent: `Beginning of ${chapter.period}`
      },
      {
        id: 'characters',
        title: 'Meet the Key Players',
        text: `You encounter the most influential figures of this era. ${chapter.keyFigures[0]?.name} approaches you with an urgent matter...`,
        emoji: '👥',
        background: 'bg-gradient-to-br from-green-600 to-teal-800',
        characters: chapter.keyFigures.slice(0, 3).map(f => f.name.charAt(0)),
        sceneType: 'negotiation' as const,
        timelineYear: chapter.startYear + 1,
        timelineEvent: 'Key alliances being formed',
        choices: [
          {
            id: 'trust',
            text: 'Trust their judgment and support their cause',
            consequence: 'Your alliance strengthens their position significantly'
          },
          {
            id: 'question',
            text: 'Question their motives and demand more information',
            consequence: 'They respect your caution and reveal crucial intelligence'
          },
          {
            id: 'oppose',
            text: 'Oppose their plans and propose an alternative',
            consequence: 'Your bold stance creates a new faction with different goals'
          }
        ]
      },
      {
        id: 'divergence',
        title: 'The Pivotal Moment',
        text: `This is it - the moment that will define history. The ${chapter.divergencePoint} in ${chapter.divergenceYear}. Your next decision will echo through the ages!`,
        emoji: '⚡',
        background: 'bg-gradient-to-br from-yellow-600 to-red-800',
        characters: ['👑', '⚖️', '🌟'],
        sceneType: 'decision' as const,
        timelineYear: chapter.divergenceYear,
        timelineEvent: chapter.divergencePoint,
        choices: chapter.alternativeTimelines.slice(0, 3).map((timeline) => ({
          id: timeline.id,
          text: `Choose the path: ${timeline.title}`,
          consequence: `This choice leads to: ${timeline.description.slice(0, 100)}...`
        }))
      },
      {
        id: 'revelation',
        title: 'The New World',
        text: `The consequences of your choices ripple through time. History has been rewritten, and the world will never be the same!`,
        emoji: '🌟',
        background: 'bg-gradient-to-br from-pink-600 to-purple-800',
        characters: ['🔮', '🎭', '🌈'],
        sceneType: 'revelation' as const,
        timelineYear: chapter.endYear,
        timelineEvent: `End of ${chapter.period} - New era begins`
      }
    ];

    return scenes;
  };

  const handleCharacterInteraction = (character: Person) => {
    setSelectedCharacter(character);
  };

  const getParticleTheme = (chapterId: string) => {
    const themeMap: Record<string, { colors: string[], particleCount: number, speed: number }> = {
      'us-independence': {
        colors: ['#64748B', '#94A3B8'],
        particleCount: 20,
        speed: 0.3
      },
      'french-revolution': {
        colors: ['#64748B', '#94A3B8'],
        particleCount: 25,
        speed: 0.3
      },
      'lincoln-era': {
        colors: ['#64748B', '#94A3B8'],
        particleCount: 15,
        speed: 0.2
      },
      'russian-empire': {
        colors: ['#64748B', '#94A3B8'],
        particleCount: 20,
        speed: 0.3
      },
      'lenin-revolution': {
        colors: ['#64748B', '#94A3B8'],
        particleCount: 30,
        speed: 0.4
      },
      'world-war-1': {
        colors: ['#64748B', '#94A3B8'],
        particleCount: 25,
        speed: 0.3
      },
      'hitler-rise': {
        colors: ['#64748B', '#94A3B8'],
        particleCount: 20,
        speed: 0.3
      },
      'world-war-2': {
        colors: ['#64748B', '#94A3B8'],
        particleCount: 35,
        speed: 0.4
      },
      'cold-war': {
        colors: ['#64748B', '#94A3B8'],
        particleCount: 15,
        speed: 0.2
      },
      'ussr-collapse': {
        colors: ['#64748B', '#94A3B8'],
        particleCount: 30,
        speed: 0.4
      }
    };

    return themeMap[chapterId] || {
      colors: ['#64748B', '#94A3B8'],
      particleCount: 20,
      speed: 0.3
    };
  };

  if (!chapter) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Chapter Not Found</h2>
          <p className="text-gray-300 mb-6">This chapter is not yet available.</p>
          <Link
            to="/chapters"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
          >
            Back to Chapters
          </Link>
        </div>
      </div>
    );
  }

  const particleTheme = getParticleTheme(chapter.id);

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Hero Section */}
      <section className={`relative py-12 sm:py-16 lg:py-20 bg-gradient-to-br ${chapter.backgroundColor} overflow-hidden`}>
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <ParticleSystem 
          particleCount={particleTheme.particleCount}
          colors={particleTheme.colors}
          speed={particleTheme.speed}
          size={2}
          interactive={false}
          className="opacity-20"
        />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center text-white"
          >
            <div className="text-4xl sm:text-5xl lg:text-6xl mb-4">{chapter.icon}</div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6">{chapter.title}</h1>
            <p className="text-lg sm:text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90 px-4">
              {chapter.description}
            </p>
            
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-sm sm:text-base lg:text-lg">
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5" />
                <span>{chapter.period}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5" />
                <span>{chapter.startYear} - {chapter.endYear}</span>
              </div>
              <div className="flex items-center space-x-2">
                <GitBranch className="w-5 h-5" />
                <span>{chapter.alternativeTimelines.length} Alternative Timelines</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Historical Context */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 bg-slate-800">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 text-center">Historical Context</h2>
            <div className="bg-slate-700 rounded-lg p-6 sm:p-8">
              <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
                {chapter.historicalContext}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Interactive Story Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 bg-slate-800">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 flex items-center justify-center space-x-2">
              <PlayCircle className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500" />
              <span>Interactive Story Mode</span>
            </h2>
            <p className="text-sm sm:text-base text-gray-300 mb-6 px-4">
              Experience the chapter through an animated story that brings history to life!
            </p>
            <motion.button
              onClick={() => setShowStory(!showStory)}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full transition-all duration-300 flex items-center space-x-2 mx-auto text-sm sm:text-base"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Sparkles className="w-5 h-5" />
              <span>{showStory ? 'Hide Story' : 'Start Interactive Story'}</span>
            </motion.button>
          </motion.div>

          <AnimatePresence>
            {showStory && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.5 }}
                className="overflow-hidden"
              >
                <InteractiveStory
                  title={chapter.title}
                  scenes={getStoryScenes(chapter)}
                  onComplete={() => setShowStory(false)}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Animated Key Figures */}
      <section className="py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-2xl sm:text-3xl font-bold text-white mb-4 text-center flex items-center justify-center space-x-2"
          >
            <Users className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500" />
            <span>Meet the Historical Characters</span>
          </motion.h2>
          <p className="text-sm sm:text-base text-gray-300 text-center mb-8 sm:mb-12 px-4">
            Click on the characters to interact with them and learn their stories!
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6 lg:gap-8 justify-items-center">
            {chapter.keyFigures.map((figure, index) => (
              <motion.div
                key={figure.id}
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <AnimatedCharacter
                  character={figure}
                  onInteract={handleCharacterInteraction}
                />
              </motion.div>
            ))}
          </div>

          {/* Character Detail Modal */}
          <AnimatePresence>
            {selectedCharacter && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
                onClick={() => setSelectedCharacter(null)}
              >
                <motion.div
                  initial={{ scale: 0.8, opacity: 0, rotateY: -90 }}
                  animate={{ scale: 1, opacity: 1, rotateY: 0 }}
                  exit={{ scale: 0.8, opacity: 0, rotateY: 90 }}
                  transition={{ duration: 0.5 }}
                  className="bg-slate-800 rounded-2xl max-w-lg w-full p-6 sm:p-8 border-2 border-blue-500 mx-4"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="text-center">
                    <motion.div
                      className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center text-3xl sm:text-4xl font-bold text-white mx-auto mb-6"
                      animate={{
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, -5, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      {selectedCharacter.name.charAt(0)}
                    </motion.div>
                    
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">{selectedCharacter.name}</h3>
                    <p className="text-blue-400 mb-4">{selectedCharacter.role}</p>
                    
                    <div className="bg-slate-700 rounded-lg p-4 mb-6">
                      <p className="text-sm text-gray-400 mb-2">
                        {selectedCharacter.born} - {selectedCharacter.died || 'Present'}
                      </p>
                      <p className="text-gray-300 leading-relaxed">
                        {selectedCharacter.description}
                      </p>
                    </div>
                    
                    <motion.button
                      onClick={() => setSelectedCharacter(null)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Got it!
                    </motion.button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Divergence Point */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 bg-slate-800">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">The Divergence Point</h2>
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 sm:p-8">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-4">{chapter.divergencePoint}</h3>
              <p className="text-base sm:text-lg text-white opacity-90">
                This pivotal moment in {chapter.divergenceYear} created multiple possible paths for history. 
                Explore how different decisions and circumstances could have led to entirely different worlds.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Alternative Timelines */}
      <section className="py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-2xl sm:text-3xl font-bold text-white mb-8 sm:mb-12 text-center"
          >
            Alternative Timelines
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {chapter.alternativeTimelines.map((timeline, index) => (
              <motion.div
                key={timeline.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group cursor-pointer"
                onClick={() => setSelectedTimeline(timeline.id)}
              >
                <div className="bg-slate-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
                  <div className="h-4" style={{ backgroundColor: timeline.color }}></div>
                  
                  <div className="p-4 sm:p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-3xl">{timeline.icon}</div>
                      <div className="flex items-center space-x-1 text-sm text-gray-400">
                        <Percent className="w-4 h-4" />
                        <span>{timeline.probability}%</span>
                      </div>
                    </div>
                    
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                      {timeline.title}
                    </h3>
                    
                    <p className="text-gray-300 mb-4 line-clamp-3">
                      {timeline.description}
                    </p>

                    <div className="bg-slate-700 rounded-lg p-3 mb-4">
                      <p className="text-sm text-gray-400 mb-1">Divergence Point:</p>
                      <p className="text-sm text-white">{timeline.divergenceDescription}</p>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 text-gray-400">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm">{timeline.keyEvents.length} Key Events</span>
                      </div>
                      
                      <Link
                        to={`/timeline/${chapter.id}/${timeline.id}`}
                        className="flex items-center space-x-1 text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        <span className="text-sm font-semibold">Explore</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Timeline Preview Modal */}
          {selectedTimeline && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
              onClick={() => setSelectedTimeline(null)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="bg-slate-800 rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto mx-4"
                onClick={(e) => e.stopPropagation()}
              >
                {(() => {
                  const timeline = chapter.alternativeTimelines.find(t => t.id === selectedTimeline);
                  if (!timeline) return null;
                  
                  return (
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center space-x-3">
                          <div className="text-3xl">{timeline.icon}</div>
                          <h3 className="text-2xl font-bold text-white">{timeline.title}</h3>
                        </div>
                        <button
                          onClick={() => setSelectedTimeline(null)}
                          className="text-gray-400 hover:text-white"
                        >
                          ✕
                        </button>
                      </div>
                      
                      <p className="text-gray-300 mb-6">{timeline.description}</p>
                      
                      <div className="bg-slate-700 rounded-lg p-4 mb-6">
                        <h4 className="text-lg font-semibold text-white mb-2">Present Day Status</h4>
                        <p className="text-gray-300 text-sm">{timeline.presentDayStatus}</p>
                      </div>
                      
                      <div className="flex justify-between">
                        <button
                          onClick={() => setSelectedTimeline(null)}
                          className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
                        >
                          Close
                        </button>
                        <Link
                          to={`/timeline/${chapter.id}/${timeline.id}`}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors flex items-center space-x-2"
                        >
                          <span>Explore Timeline</span>
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  );
                })()}
              </motion.div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Navigation */}
      <section className="py-16 px-6 bg-slate-800">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold text-white mb-8">Continue Your Journey</h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/chapters"
                className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg transition-colors"
              >
                Back to All Chapters
              </Link>
              <Link
                to="/compare"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors flex items-center justify-center space-x-2"
              >
                <GitBranch className="w-4 h-4" />
                <span>Compare Timelines</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ChapterDetail;