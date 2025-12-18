import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Users, MapPin, GitBranch, Clock, ArrowRight, Percent, PlayCircle, Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Chapter, Person } from '../types';
import { getChapterById } from '../data';
import AnimatedCharacter from '../components/common/AnimatedCharacter';
import InteractiveStory from '../components/common/InteractiveStory';
import ParticleSystem from '../components/common/ParticleSystem';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { loadChapterTranslations } from '../i18n';

const ChapterDetail: React.FC = () => {
  const { id: chapterId } = useParams<{ id: string }>();
  const { t, i18n } = useTranslation(['common-ui', 'common-nav']);
  const [chapter, setChapter] = useState<Chapter | null>(null);
  const [selectedTimeline, setSelectedTimeline] = useState<string | null>(null);
  const [selectedCharacter, setSelectedCharacter] = useState<Person | null>(null);
  const [showStory, setShowStory] = useState(false);
  const [chapterNamespace, setChapterNamespace] = useState<string | null>(null);
  const [translationsLoaded, setTranslationsLoaded] = useState(false);

  useEffect(() => {
    if (chapterId) {
      const foundChapter = getChapterById(chapterId);
      setChapter(foundChapter || null);

      // Load chapter translations
      loadChapterTranslations(chapterId, i18n.language).then((namespace) => {
        if (namespace) {
          setChapterNamespace(namespace);
          setTranslationsLoaded(true);
        }
      });
    }
  }, [chapterId, i18n.language]);

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

  // Helper function to get translated text
  const getTranslation = (key: string, options?: any): string => {
    if (!chapterNamespace || !translationsLoaded) return '';
    const result = t(`${chapterNamespace}:${key}`, options);
    return typeof result === 'string' ? result : '';
  };

  // Helper function to get timeline translation object
  const getTimelineTranslation = (timelineId: string): any => {
    if (!chapterNamespace || !translationsLoaded) return null;
    const timelineKey = getTimelineKey(timelineId);
    const result = t(`${chapterNamespace}:timelines.${timelineKey}`, { returnObjects: true });
    return result;
  };

  // Convert timeline ID to translation key (use ID directly)
  const getTimelineKey = (timelineId: string) => {
    return timelineId;
  };

  // Helper to get translated figures
  const getTranslatedFigures = () => {
    if (!chapter || !chapterNamespace || !translationsLoaded) return chapter?.keyFigures || [];

    return chapter.keyFigures.map(figure => {
      const figureKey = `figures.${figure.id}`;
      return {
        ...figure,
        name: t(`${chapterNamespace}:${figureKey}.name`, { defaultValue: figure.name }),
        role: t(`${chapterNamespace}:${figureKey}.role`, { defaultValue: figure.role }),
        description: t(`${chapterNamespace}:${figureKey}.description`, { defaultValue: figure.description }),
      };
    });
  };

  // Helper to get translated scenarios
  const getTranslatedScenarios = () => {
    if (!chapter?.interactiveScenarios || !chapterNamespace || !translationsLoaded) return chapter?.interactiveScenarios || [];

    return chapter.interactiveScenarios.map((scenario, index) => {
      const scenarioKey = `interactive_scenarios.${index}`;
      return {
        ...scenario,
        title: t(`${chapterNamespace}:${scenarioKey}.title`, { defaultValue: scenario.title }),
        text: t(`${chapterNamespace}:${scenarioKey}.text`, { defaultValue: scenario.text }),
        choices: scenario.choices?.map((choice, choiceIndex) => ({
          ...choice,
          text: t(`${chapterNamespace}:${scenarioKey}.choices.${choiceIndex}.text`, { defaultValue: choice.text }),
          consequence: t(`${chapterNamespace}:${scenarioKey}.choices.${choiceIndex}.consequence`, { defaultValue: choice.consequence }),
        }))
      };
    });
  };

  if (!chapter) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-4">{t('common-ui:states.not_found')}</h2>
          <p className="text-gray-300 mb-6">{t('common-ui:messages.chapter_not_available')}</p>
          <Link
            to="/chapters"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
          >
            {t('common-ui:buttons.back_to_chapters')}
          </Link>
        </div>
      </div>
    );
  }

  if (!translationsLoaded) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-300">{t('common-ui:states.loading')}</p>
        </div>
      </div>
    );
  }

  const particleTheme = getParticleTheme(chapter.id);

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Hero Section */}
      <section className={`relative py-12 sm:py-16 lg:py-20 bg-slate-900 overflow-hidden`}>
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ backgroundImage: `url(${chapter.mainImage})` }}
        />

        {/* Overlays */}
        <div className="absolute inset-0 bg-blue-500/10 z-10" />
        <div className="absolute inset-0 bg-black/40 z-10" />

        <ParticleSystem
          particleCount={particleTheme.particleCount}
          colors={particleTheme.colors}
          speed={particleTheme.speed}
          size={2}
          interactive={false}
          className="opacity-20 z-10"
        />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 z-20">
          <Breadcrumb
            items={[
              { label: t('common-nav:nav.chapters'), path: '/chapters' },
              { label: getTranslation('meta.title') }
            ]}
          />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center text-white"
          >
            <div className="text-4xl sm:text-5xl lg:text-6xl mb-4">{chapter.icon}</div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6">
              {getTranslation('meta.title')}
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90 px-4">
              {getTranslation('meta.description')}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-sm sm:text-base lg:text-lg">
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5" />
                <span>{getTranslation('meta.period')}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5" />
                <span>{chapter.startYear} - {chapter.endYear}</span>
              </div>
              <div className="flex items-center space-x-2">
                <GitBranch className="w-5 h-5" />
                <span>{chapter.alternativeTimelines.length} {t('common-ui:labels.alternative_timelines')}</span>
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
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 text-center">
              {t('common-ui:labels.historical_context')}
            </h2>
            <div className="bg-slate-700 rounded-lg p-6 sm:p-8">
              <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
                {getTranslation('meta.historical_context')}
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
              <span>{t('common-ui:labels.interactive_experience')}</span>
            </h2>
            <p className="text-sm sm:text-base text-gray-300 mb-6 px-4">
              {t('common-ui:messages.dive_into_history')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                onClick={() => setShowStory(!showStory)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full transition-all duration-300 flex items-center justify-center space-x-2 text-sm sm:text-base shadow-lg shadow-blue-600/30"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Sparkles className="w-5 h-5" />
                <span>{showStory ? t('common-ui:buttons.hide_story') : t('common-ui:buttons.start_interactive_story')}</span>
              </motion.button>

              <Link to={`/simulation/${chapter.id}`}>
                <motion.div
                  className="bg-slate-800 hover:bg-slate-700 border border-green-500/30 text-green-400 hover:text-green-300 px-6 sm:px-8 py-3 sm:py-4 rounded-full transition-all duration-300 flex items-center justify-center space-x-2 text-sm sm:text-base cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <PlayCircle className="w-5 h-5" />
                  <span>Enter Simulation Hub</span>
                </motion.div>
              </Link>
            </div>
          </motion.div>

          <AnimatePresence>
            {showStory && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.5 }}
                className="overflow-hidden rounded-xl border border-slate-700 shadow-2xl"
              >
                <div className="w-full relative">
                  <InteractiveStory
                    title={getTranslation('meta.title')}
                    scenes={getTranslatedScenarios()}
                    onComplete={() => setShowStory(false)}
                  />
                </div>
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
            <span>{t('common-ui:labels.meet_historical_characters')}</span>
          </motion.h2>
          <p className="text-sm sm:text-base text-gray-300 text-center mb-8 sm:mb-12 px-4">
            {t('common-ui:messages.click_characters_interact')}
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6 lg:gap-8 justify-items-center">
            {getTranslatedFigures().map((figure, index) => (
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
                      className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-blue-500 flex items-center justify-center text-3xl sm:text-4xl font-bold text-white mx-auto mb-6"
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
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
              {t('common-ui:labels.divergence_point')}
            </h2>
            <div className="bg-blue-500 rounded-lg p-6 sm:p-8">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-4">
                {getTranslation('meta.divergence_point')}
              </h3>
              <p className="text-base sm:text-lg text-white opacity-90">
                {t('common-ui:messages.pivotal_moment', { year: chapter.divergenceYear })}
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
            {t('common-ui:labels.alternative_timelines')}
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
                  <div className="h-32 sm:h-40 relative overflow-hidden">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                      style={{ backgroundImage: `url(${timeline.image || '/images/placeholder.jpg'})` }}
                    />
                    <div className="absolute inset-0 bg-blue-500/10 opacity-90" />
                    <div className="absolute bottom-0 left-0 p-4 w-full">
                      <div className="h-1 w-12 rounded-full mb-2" style={{ backgroundColor: timeline.color }}></div>
                    </div>
                  </div>

                  <div className="p-4 sm:p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-3xl">{timeline.icon}</div>
                      <div className="flex items-center space-x-1 text-sm text-gray-400">
                        <Percent className="w-4 h-4" />
                        <span>{timeline.probability}%</span>
                      </div>
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                      {getTimelineTranslation(timeline.id)?.title || timeline.title}
                    </h3>

                    <p className="text-gray-300 mb-4 line-clamp-3">
                      {getTimelineTranslation(timeline.id)?.description || timeline.description}
                    </p>

                    <div className="bg-slate-700 rounded-lg p-3 mb-4">
                      <p className="text-sm text-gray-400 mb-1">{t('common-ui:labels.divergence_point')}:</p>
                      <p className="text-sm text-white">{getTimelineTranslation(timeline.id)?.divergence_description || timeline.divergenceDescription}</p>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 text-gray-400">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm">{timeline.keyEvents.length} {t('common-ui:labels.key_events')}</span>
                      </div>

                      <Link
                        to={`/timeline/${chapter.id}/${timeline.id}`}
                        className="flex items-center space-x-1 text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        <span className="text-sm font-semibold">{t('common-ui:buttons.explore')}</span>
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

                  const timelineTrans = getTimelineTranslation(timeline.id);
                  return (
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center space-x-3">
                          <div className="text-3xl">{timeline.icon}</div>
                          <h3 className="text-2xl font-bold text-white">
                            {timelineTrans?.title || timeline.title}
                          </h3>
                        </div>
                        <button
                          onClick={() => setSelectedTimeline(null)}
                          className="text-gray-400 hover:text-white"
                        >
                          ✕
                        </button>
                      </div>

                      <p className="text-gray-300 mb-6">
                        {timelineTrans?.description || timeline.description}
                      </p>

                      <div className="bg-slate-700 rounded-lg p-4 mb-6">
                        <h4 className="text-lg font-semibold text-white mb-2">
                          {t('common-ui:labels.present_day_status')}
                        </h4>
                        <p className="text-gray-300 text-sm">
                          {timelineTrans?.present_day_status || timeline.presentDayStatus}
                        </p>
                      </div>

                      <div className="flex justify-between">
                        <button
                          onClick={() => setSelectedTimeline(null)}
                          className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
                        >
                          {t('common-ui:buttons.close')}
                        </button>
                        <Link
                          to={`/timeline/${chapter.id}/${timeline.id}`}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors flex items-center space-x-2"
                        >
                          <span>{t('common-ui:buttons.explore_timeline')}</span>
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
            <h2 className="text-2xl font-bold text-white mb-8">
              {t('common-ui:labels.continue_journey')}
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/chapters"
                className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg transition-colors"
              >
                {t('common-ui:buttons.back_to_all_chapters')}
              </Link>
              <Link
                to="/compare"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors flex items-center justify-center space-x-2"
              >
                <GitBranch className="w-4 h-4" />
                <span>{t('common-ui:buttons.compare_timelines')}</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ChapterDetail;