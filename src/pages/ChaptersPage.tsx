import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, Users, GitBranch, Search, X, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface ChapterSummary {
  id: string;
  translationKey: string;
  alternativeCount: number;
  cardClass: string;
  image: string;
}

const CHAPTERS: ChapterSummary[] = [
  { id: 'timur-legacy', translationKey: 'timur_legacy', alternativeCount: 3, cardClass: 'bg-red-900', image: '/images/chapters/timur-legacy/main.png' },
  { id: 'us-independence', translationKey: 'us_independence', alternativeCount: 3, cardClass: 'bg-red-700', image: '/images/chapters/us-independence/main.png' },
  { id: 'french-revolution', translationKey: 'french_revolution', alternativeCount: 3, cardClass: 'bg-blue-700', image: '/images/chapters/french-revolution/main.png' },
  { id: 'lincoln-era', translationKey: 'lincoln_era', alternativeCount: 3, cardClass: 'bg-green-700', image: '/images/chapters/lincoln-era/main.png' },
  { id: 'russian-empire', translationKey: 'russian_empire', alternativeCount: 3, cardClass: 'bg-purple-700', image: '/images/chapters/russian-empire/main.png' },
  { id: 'lenin-revolution', translationKey: 'lenin_revolution', alternativeCount: 3, cardClass: 'bg-red-800', image: '/images/chapters/lenin-revolution/main.png' },
  { id: 'hitler-rise', translationKey: 'hitler_rise', alternativeCount: 3, cardClass: 'bg-gray-700', image: '/images/chapters/hitler-rise/main.png' },
  { id: 'world-war-1', translationKey: 'world_war_1', alternativeCount: 3, cardClass: 'bg-yellow-700', image: '/images/chapters/world-war-1/main.png' },
  { id: 'world-war-2', translationKey: 'world_war_2', alternativeCount: 3, cardClass: 'bg-orange-700', image: '/images/chapters/world-war-2/main.png' },
  { id: 'cold-war', translationKey: 'cold_war', alternativeCount: 3, cardClass: 'bg-indigo-700', image: '/images/chapters/cold-war/main.png' },
  { id: 'ussr-collapse', translationKey: 'ussr_collapse', alternativeCount: 3, cardClass: 'bg-pink-700', image: '/images/chapters/ussr-collapse/main.png' },
  { id: 'covid-pandemic', translationKey: 'covid_pandemic', alternativeCount: 3, cardClass: 'bg-teal-700', image: '/images/chapters/covid-pandemic/main.png' },
  { id: 'ai-revolution', translationKey: 'ai_revolution', alternativeCount: 3, cardClass: 'bg-blue-900', image: '/images/chapters/ai-revolution/main.png' },
  { id: 'future-earth', translationKey: 'future_earth', alternativeCount: 3, cardClass: 'bg-slate-800', image: '/images/chapters/future-earth/main.png' },
];

const ChaptersPage: React.FC = () => {
  const { t } = useTranslation(['pages-chapters-list', 'common-ui']);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState<string>('all');

  // Extract unique periods for filtering
  const periods = useMemo(() => {
    const periodSet = new Set(CHAPTERS.map(chapter => {
      const period = t(`pages-chapters-list:chapters.${chapter.translationKey}.period`);
      const yearMatch = period.match(/\d{4}/);
      if (yearMatch) {
        const year = parseInt(yearMatch[0]);
        if (year < 1800) return '18th_century';
        if (year < 1900) return '19th_century';
        if (year < 2000) return '20th_century';
        return '21st_century';
      }
      return 'other';
    }));
    return ['all', ...Array.from(periodSet)];
  }, [t]);

  // Filter chapters based on search and period
  const filteredChapters = useMemo(() => {
    return CHAPTERS.filter(chapter => {
      const title = t(`pages-chapters-list:chapters.${chapter.translationKey}.title`);
      const description = t(`pages-chapters-list:chapters.${chapter.translationKey}.description`);
      const keyEvents = t(`pages-chapters-list:chapters.${chapter.translationKey}.key_events`, { returnObjects: true }) as string[];

      const matchesSearch = title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        keyEvents.some(event => event.toLowerCase().includes(searchQuery.toLowerCase()));

      if (selectedPeriod === 'all') return matchesSearch;

      const period = t(`pages-chapters-list:chapters.${chapter.translationKey}.period`);
      const yearMatch = period.match(/\d{4}/);
      if (yearMatch) {
        const year = parseInt(yearMatch[0]);
        const chapterPeriod = year < 1800 ? '18th_century' :
          year < 1900 ? '19th_century' :
            year < 2000 ? '20th_century' : '21st_century';
        return matchesSearch && chapterPeriod === selectedPeriod;
      }
      return matchesSearch && selectedPeriod === 'other';
    });
  }, [searchQuery, selectedPeriod, t]);

  const chapterStats = useMemo(() => {
    const alternativeTotal = CHAPTERS.reduce((total, chapter) => total + chapter.alternativeCount, 0);
    const keyEventTotal = CHAPTERS.reduce((total, chapter) => {
      const events = t(`pages-chapters-list:chapters.${chapter.translationKey}.key_events`, { returnObjects: true }) as string[];
      return total + events.length;
    }, 0);
    return [
      { label: t('pages-chapters-list:stats.chapters'), value: CHAPTERS.length },
      { label: t('pages-chapters-list:stats.alt_timelines'), value: alternativeTotal },
      { label: t('pages-chapters-list:stats.key_events'), value: keyEventTotal }
    ];
  }, [t]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedPeriod('all');
  };

  return (
    <div className="min-h-screen bg-slate-950 py-10 relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.2),_transparent_60%)]" />
      <div className="absolute inset-y-0 right-0 w-1/3 bg-blue-950/30 pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">{t('pages-chapters-list:page.title')}</h1>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto px-4 mb-8">
            {t('pages-chapters-list:page.description')}
          </p>

          <div className="max-w-4xl mx-auto space-y-5 bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-[0_20px_80px_rgba(15,23,42,0.5)]">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder={t('pages-chapters-list:search.placeholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-900/60 border border-white/10 rounded-2xl pl-12 pr-12 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                  aria-label={t('pages-chapters-list:search.clear')}
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            <div className="flex flex-wrap gap-2 justify-center">
              {periods.map(period => (
                <button
                  key={period}
                  onClick={() => setSelectedPeriod(period)}
                  className={`px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-colors ${selectedPeriod === period
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-slate-900/60 text-slate-200 hover:bg-slate-800'
                    }`}
                >
                  {t(`pages-chapters-list:filters.${period}`)}
                </button>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-sm text-slate-300">
              <span>{t('pages-chapters-list:filters.showing', { count: filteredChapters.length, total: CHAPTERS.length })}</span>
              {(searchQuery || selectedPeriod !== 'all') && (
                <button
                  onClick={clearFilters}
                  className="inline-flex items-center gap-2 text-blue-300 hover:text-white transition"
                >
                  <X className="w-4 h-4" />
                  {t('pages-chapters-list:filters.clear_filters')}
                </button>
              )}
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {chapterStats.map(stat => (
            <div key={stat.label} className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5 text-center shadow-inner shadow-black/30">
              <p className="text-xs uppercase tracking-[0.4em] text-blue-300">{stat.label}</p>
              <p className="text-2xl font-bold text-white mt-3">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          <AnimatePresence>
            {filteredChapters.map((chapter, index) => (
              <motion.div
                key={chapter.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <Link to={`/chapters/${chapter.id}`}>
                  <div className="relative h-[480px] rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/10 transition-all duration-500 group-hover:shadow-blue-900/20 group-hover:ring-blue-500/50">
                    {/* Full Background Image */}
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                      style={{ backgroundImage: `url(${chapter.image})` }}
                    />

                    {/* Gradient Overlay for Text Readability */}
                    <div className="absolute inset-0 bg-blue-500/10 opacity-90" />

                    {/* Top Badge */}
                    <div className="absolute top-6 left-0 w-full flex justify-center z-10">
                      <div className="bg-black/30 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-blue-400" />
                        <span className="text-white font-semibold tracking-wide text-sm">{t(`pages-chapters-list:chapters.${chapter.translationKey}.period`)}</span>
                      </div>
                    </div>

                    {/* Bottom Content with Backdrop Blur */}
                    <div className="absolute bottom-0 inset-x-0 p-6 sm:p-8 bg-black/40 backdrop-blur-xl border-t border-white/10 transition-all duration-300 group-hover:bg-black/60">
                      <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-tight group-hover:text-blue-400 transition-colors">
                        {t(`pages-chapters-list:chapters.${chapter.translationKey}.title`)}
                      </h3>

                      <p className="text-base text-gray-200 mb-6 line-clamp-2 leading-relaxed opacity-90">
                        {t(`pages-chapters-list:chapters.${chapter.translationKey}.description`)}
                      </p>

                      <div className="space-y-4">
                        <div className="flex items-center gap-2 text-sm text-blue-200/80 font-medium">
                          <MapPin className="w-4 h-4" />
                          <span>{t('pages-chapters-list:card.key_events')}</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {(t(`pages-chapters-list:chapters.${chapter.translationKey}.key_events`, { returnObjects: true }) as string[]).slice(0, 3).map((event, i) => (
                            <span
                              key={`${chapter.id}-event-${i}`}
                              className="bg-white/10 hover:bg-white/20 border border-white/5 text-white px-3 py-1.5 rounded-lg text-xs transition-colors"
                            >
                              {event}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="mt-6 flex items-center justify-between pt-4 border-t border-white/10">
                        <div className="flex items-center space-x-2 text-gray-400">
                          <GitBranch className="w-4 h-4" />
                          <span className="text-sm font-medium">{t('pages-chapters-list:card.timelines', { count: chapter.alternativeCount })}</span>
                        </div>

                        <div className="flex items-center gap-2 text-blue-400 font-semibold group-hover:translate-x-1 transition-transform">
                          <span>{t('pages-chapters-list:card.explore')}</span>
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* No Results Message */}
        {filteredChapters.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="bg-slate-800 rounded-lg p-8 max-w-md mx-auto">
              <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">{t('pages-chapters-list:search.no_results')}</h3>
              <p className="text-gray-400 mb-4">
                {t('pages-chapters-list:search.no_results_description')}
              </p>
              <button
                onClick={clearFilters}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                {t('pages-chapters-list:filters.clear_filters')}
              </button>
            </div>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <div className="bg-slate-800 rounded-lg p-6 sm:p-8 max-w-2xl mx-auto">
            <Users className="w-10 h-10 sm:w-12 sm:h-12 text-blue-500 mx-auto mb-4" />
            <h3 className="text-lg sm:text-xl font-bold text-white mb-2">{t('pages-chapters-list:bottom_section.title')}</h3>
            <p className="text-sm sm:text-base text-gray-300">
              {t('pages-chapters-list:bottom_section.description')}
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ChaptersPage;
