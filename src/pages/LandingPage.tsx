import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Clock,
  Globe,
  BookOpen,
  GitBranch,
  Shield,
  Layers,
  Compass,
  FlaskConical,
  Flame
} from 'lucide-react';

const LandingPage: React.FC = () => {
  const { t } = useTranslation(['pages-landing', 'common-ui']);

  const chapters = useMemo(() => [
    { id: 'timur-legacy', translationKey: 'timur_legacy', color: 'bg-red-900', icon: '🗡️', emoji: '🏰', image: '/images/chapters/timur-legacy/main.png' },
    { id: 'us-independence', translationKey: 'us_independence', color: 'bg-red-600', icon: '🇺🇸', emoji: '⚔️', image: '/images/chapters/us-independence/main.png' },
    { id: 'french-revolution', translationKey: 'french_revolution', color: 'bg-blue-600', icon: '🇫🇷', emoji: '🗿', image: '/images/chapters/french-revolution/main.png' },
    { id: 'lincoln-era', translationKey: 'lincoln_era', color: 'bg-green-600', icon: '⚖️', emoji: '🎩', image: '/images/chapters/lincoln-era/main.png' },
    { id: 'russian-empire', translationKey: 'russian_empire', color: 'bg-purple-600', icon: '👑', emoji: '🐻', image: '/images/chapters/russian-empire/main.png' },
    { id: 'lenin-revolution', translationKey: 'lenin_revolution', color: 'bg-red-700', icon: '⚡', emoji: '🚩', image: '/images/chapters/lenin-revolution/main.png' },
    { id: 'hitler-rise', translationKey: 'hitler_rise', color: 'bg-gray-700', icon: '⚠️', emoji: '🔨', image: '/images/chapters/hitler-rise/main.png' },
    { id: 'world-war-1', translationKey: 'world_war_1', color: 'bg-yellow-700', icon: '⚔️', emoji: '🎖️', image: '/images/chapters/world-war-1/main.png' },
    { id: 'world-war-2', translationKey: 'world_war_2', color: 'bg-orange-600', icon: '🌍', emoji: '✈️', image: '/images/chapters/world-war-2/main.png' },
    { id: 'cold-war', translationKey: 'cold_war', color: 'bg-indigo-600', icon: '❄️', emoji: '🚀', image: '/images/chapters/cold-war/main.png' },
    { id: 'ussr-collapse', translationKey: 'ussr_collapse', color: 'bg-pink-600', icon: '🔨', emoji: '🧱', image: '/images/chapters/ussr-collapse/main.png' },
    { id: 'covid-pandemic', translationKey: 'covid_pandemic', color: 'bg-teal-600', icon: '🦠', emoji: '😷', image: '/images/chapters/covid-pandemic/main.png' },
    { id: 'ai-revolution', translationKey: 'ai_revolution', color: 'bg-blue-900', icon: '🤖', emoji: '🧠', image: '/images/chapters/ai-revolution/main.png' },
    { id: 'future-earth', translationKey: 'future_earth', color: 'bg-slate-800', icon: '🚀', emoji: '🌌', image: '/images/chapters/future-earth/main.png' },
  ], []);

  const heroStats = useMemo(() => [
    { label: t('pages-landing:stats.divergence.label'), value: t('pages-landing:stats.divergence.value'), detail: t('pages-landing:stats.divergence.detail') },
    { label: t('pages-landing:stats.events.label'), value: t('pages-landing:stats.events.value'), detail: t('pages-landing:stats.events.detail') },
    { label: t('pages-landing:stats.coverage.label'), value: t('pages-landing:stats.coverage.value'), detail: t('pages-landing:stats.coverage.detail') }
  ], [t]);

  const timelineThreads = useMemo(() => [
    {
      tag: t('pages-landing:timeline_threads.us_independence.tag'),
      title: t('pages-landing:timeline_threads.us_independence.title'),
      effect: t('pages-landing:timeline_threads.us_independence.effect')
    },
    {
      tag: t('pages-landing:timeline_threads.cold_war.tag'),
      title: t('pages-landing:timeline_threads.cold_war.title'),
      effect: t('pages-landing:timeline_threads.cold_war.effect')
    },
    {
      tag: t('pages-landing:timeline_threads.french_revolution.tag'),
      title: t('pages-landing:timeline_threads.french_revolution.title'),
      effect: t('pages-landing:timeline_threads.french_revolution.effect')
    },
  ], [t]);

  const immersionModes = useMemo(() => [
    {
      title: t('pages-landing:immersion_modes.story_navigator.title'),
      description: t('pages-landing:immersion_modes.story_navigator.description'),
      backgroundClass: 'bg-blue-600/10',
      icon: <BookOpen className="w-5 h-5 text-blue-200" />
    },
    {
      title: t('pages-landing:immersion_modes.data_atlas.title'),
      description: t('pages-landing:immersion_modes.data_atlas.description'),
      backgroundClass: 'bg-emerald-600/10',
      icon: <Layers className="w-5 h-5 text-emerald-200" />
    },
    {
      title: t('pages-landing:immersion_modes.comparison_lab.title'),
      description: t('pages-landing:immersion_modes.comparison_lab.description'),
      backgroundClass: 'bg-purple-600/10',
      icon: <GitBranch className="w-5 h-5 text-purple-200" />
    }
  ], [t]);

  const researchPillars = useMemo(() => [
    { title: t('pages-landing:research_pillars.primary_sources.title'), detail: t('pages-landing:research_pillars.primary_sources.detail'), icon: Shield },
    { title: t('pages-landing:research_pillars.scholarly_review.title'), detail: t('pages-landing:research_pillars.scholarly_review.detail'), icon: FlaskConical },
    { title: t('pages-landing:research_pillars.geopolitical_modeling.title'), detail: t('pages-landing:research_pillars.geopolitical_modeling.detail'), icon: Compass },
    { title: t('pages-landing:research_pillars.narrative_craft.title'), detail: t('pages-landing:research_pillars.narrative_craft.detail'), icon: Flame }
  ], [t]);

  return (
    <div className="min-h-screen bg-slate-950 relative overflow-x-hidden w-full">

      {/* Hero Section */}
      <section className="relative py-16 sm:py-24 lg:py-32 px-4 sm:px-6 z-10 overflow-hidden">
        {/* Video Background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
        >
          <source src="/Hero.mp4" type="video/mp4" />
        </video>

        {/* Overlay for better text readability */}
        <div className="absolute top-0 left-0 w-full h-full bg-black/70 z-0"></div>

        <div className="max-w-6xl mx-auto text-center relative z-10 space-y-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 text-white">
              {t('pages-landing:hero.title')}
            </h1>

            <p className="text-xl md:text-2xl text-slate-300 mb-10 max-w-3xl mx-auto px-4">
              {t('pages-landing:hero.subtitle')}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8 px-4"
          >
            {heroStats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl bg-white/5 backdrop-blur-xl p-4 sm:p-6 border border-white/10 shadow-[0_15px_45px_rgba(15,23,42,0.3)]"
              >
                <p className="text-xs uppercase tracking-[0.4em] text-blue-200">{stat.label}</p>
                <p className="text-2xl sm:text-3xl font-extrabold text-white mt-2">{stat.value}</p>
                <p className="text-sm text-slate-200 mt-1">{stat.detail}</p>
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
              <span>{t('pages-landing:hero.cta.primary')}</span>
              <ArrowRight className="w-5 h-5" />
            </Link>

            <Link
              to="/compare"
              className="inline-flex items-center space-x-2 bg-slate-700 hover:bg-slate-600 text-white border border-slate-600 px-8 py-3 rounded-lg text-lg font-semibold transition-colors"
            >
              <GitBranch className="w-5 h-5" />
              <span>{t('pages-landing:hero.cta.secondary')}</span>
            </Link>
          </motion.div>
        </div>

        <div className="mt-14 max-w-5xl mx-auto relative z-10 text-left text-white">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {timelineThreads.map((thread) => (
              <div key={thread.title} className="rounded-2xl border border-white/10 bg-white/10 backdrop-blur-xl p-5 shadow-lg">
                <p className="text-xs uppercase tracking-[0.3em] text-blue-200 mb-2">{thread.tag}</p>
                <h3 className="text-lg font-semibold text-white mb-2">{thread.title}</h3>
                <p className="text-sm text-slate-200">{thread.effect}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Description */}
      <section className="py-16 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-slate-950" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.4),_transparent_55%)]" />
        <div className="relative max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-sm uppercase tracking-[0.4em] text-blue-300">{t('pages-landing:about.badge')}</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mt-3 mb-6">
                {t('pages-landing:about.heading')}
              </h2>
              <p className="text-gray-200 text-lg leading-relaxed mb-4">
                {t('pages-landing:about.description_1')}
              </p>
              <p className="text-gray-300">
                {t('pages-landing:about.description_2')}
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              {researchPillars.map(({ title, detail, icon: Icon }) => (
                <div key={title} className="rounded-2xl border border-white/15 bg-white/5 backdrop-blur-2xl p-5">
                  <Icon className="w-6 h-6 text-blue-200" />
                  <h3 className="text-white font-semibold mt-4 mb-1">{title}</h3>
                  <p className="text-sm text-slate-200">{detail}</p>
                </div>
              ))}
            </motion.div>
          </div>
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
            {t('pages-landing:chapters.heading')}
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
                <Link to={`/chapters/${chapter.id}`}>
                  <div className="relative p-4 sm:p-6 rounded-lg h-40 sm:h-48 flex flex-col justify-between text-white transition-transform group-hover:scale-105 shadow-lg overflow-hidden">
                    {/* Background Image */}
                    <div
                      className="absolute inset-0 bg-cover bg-center z-0 transition-transform duration-700 group-hover:scale-110"
                      style={{ backgroundImage: `url(${chapter.image})` }}
                    />
                    {/* Gradient Overlay */}
                    <div className={`absolute inset-0 ${chapter.color} opacity-80 mix-blend-multiply z-10 transition-opacity group-hover:opacity-0`} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />

                    <div className="relative z-20">
                      <h3 className="text-sm sm:text-lg font-semibold mb-2 line-clamp-2 text-shadow-sm">
                        {t(`pages-landing:chapters.list.${chapter.translationKey}.title`)}
                      </h3>
                      <p className="text-xs sm:text-sm opacity-90 line-clamp-3 text-shadow-sm">
                        {t(`pages-landing:chapters.list.${chapter.translationKey}.description`)}
                      </p>
                    </div>
                    <div className="relative z-20 text-xs sm:text-sm opacity-75 font-medium">
                      {t('pages-landing:chapters.timelines_count')}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Immersion Modes */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl font-bold text-white text-center mb-12"
          >
            {t('pages-landing:immersion_modes.heading')}
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {immersionModes.map((mode, index) => (
              <motion.div
                key={mode.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`rounded-2xl border border-white/10 ${mode.backgroundClass} p-6 backdrop-blur-xl shadow-lg`}
              >
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mb-4">
                  {mode.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{mode.title}</h3>
                <p className="text-sm text-white/80">{mode.description}</p>
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
            {t('pages-landing:features.heading')}
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
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">{t('pages-landing:features.timeline_navigation.title')}</h3>
              <p className="text-gray-300 text-sm sm:text-base">
                {t('pages-landing:features.timeline_navigation.description')}
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
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">{t('pages-landing:features.cause_effect.title')}</h3>
              <p className="text-gray-300 text-sm sm:text-base">
                {t('pages-landing:features.cause_effect.description')}
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
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">{t('pages-landing:features.global_impact.title')}</h3>
              <p className="text-gray-300 text-sm sm:text-base">
                {t('pages-landing:features.global_impact.description')}
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
