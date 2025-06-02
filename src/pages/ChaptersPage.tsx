import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, Users, GitBranch, Search, Filter, X, Clock } from 'lucide-react';

const ChaptersPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);

  const chapters = [
    {
      id: 'us-independence',
      title: 'US Independence',
      period: '1776',
      description: 'The American Revolution and its alternative outcomes',
      keyEvents: ['Declaration of Independence', 'Revolutionary War', 'Constitutional Convention'],
      alternativeCount: 10,
      color: 'from-red-600 to-red-800',
      image: '/images/independence.jpg'
    },
    {
      id: 'french-revolution',
      title: 'French Revolution',
      period: '1789',
      description: 'The fall of the monarchy and paths not taken',
      keyEvents: ['Storming of Bastille', 'Reign of Terror', 'Rise of Napoleon'],
      alternativeCount: 10,
      color: 'from-blue-600 to-blue-800',
      image: '/images/french-revolution.jpg'
    },
    {
      id: 'lincoln-era',
      title: 'Lincoln Era',
      period: '1860s',
      description: 'Civil War, slavery, and reconstruction alternatives',
      keyEvents: ['Lincoln Election', 'Civil War', 'Emancipation Proclamation'],
      alternativeCount: 10,
      color: 'from-green-600 to-green-800',
      image: '/images/lincoln.jpg'
    },
    {
      id: 'russian-empire',
      title: 'Russian Empire',
      period: '1721-1917',
      description: 'Tsarist Russia and Central Asian expansion',
      keyEvents: ['Peter the Great', 'Catherine II', 'Crimean War'],
      alternativeCount: 10,
      color: 'from-purple-600 to-purple-800',
      image: '/images/russian-empire.jpg'
    },
    {
      id: 'lenin-revolution',
      title: 'Lenin Revolution',
      period: '1917',
      description: 'Bolshevik victory and Soviet state formation',
      keyEvents: ['October Revolution', 'Civil War', 'War Communism'],
      alternativeCount: 10,
      color: 'from-red-700 to-red-900',
      image: '/images/lenin.jpg'
    },
    {
      id: 'hitler-rise',
      title: 'Hitler\'s Rise',
      period: '1920s-1940s',
      description: 'Nazi Germany and alternative paths of WWII',
      keyEvents: ['Beer Hall Putsch', 'Rise to Power', 'World War II'],
      alternativeCount: 10,
      color: 'from-gray-700 to-gray-900',
      image: '/images/hitler.jpg'
    },
    {
      id: 'world-war-1',
      title: 'World War I',
      period: '1914-1918',
      description: 'The Great War and its alternative outcomes',
      keyEvents: ['Assassination of Archduke', 'Trench Warfare', 'Treaty of Versailles'],
      alternativeCount: 10,
      color: 'from-yellow-700 to-yellow-900',
      image: '/images/wwi.jpg'
    },
    {
      id: 'world-war-2',
      title: 'World War II',
      period: '1939-1945',
      description: 'Global conflict with dramatically different outcomes',
      keyEvents: ['Invasion of Poland', 'Pearl Harbor', 'D-Day'],
      alternativeCount: 10,
      color: 'from-orange-600 to-orange-800',
      image: '/images/wwii.jpg'
    },
    {
      id: 'cold-war',
      title: 'Cold War',
      period: '1947-1991',
      description: 'Superpower rivalry and nuclear standoff alternatives',
      keyEvents: ['Iron Curtain', 'Cuban Missile Crisis', 'Berlin Wall'],
      alternativeCount: 10,
      color: 'from-indigo-600 to-indigo-800',
      image: '/images/cold-war.jpg'
    },
    {
      id: 'ussr-collapse',
      title: 'USSR Collapse',
      period: '1991',
      description: 'End of Soviet Union and alternative dissolutions',
      keyEvents: ['Gorbachev Reforms', 'August Coup', 'Independence Declarations'],
      alternativeCount: 10,
      color: 'from-pink-600 to-pink-800',
      image: '/images/ussr-collapse.jpg'
    },
  ];

  // Extract unique periods for filtering
  const periods = useMemo(() => {
    const periodSet = new Set(chapters.map(chapter => {
      const yearMatch = chapter.period.match(/\d{4}/);
      if (yearMatch) {
        const year = parseInt(yearMatch[0]);
        if (year < 1800) return '18th Century';
        if (year < 1900) return '19th Century';
        if (year < 2000) return '20th Century';
        return '21st Century';
      }
      return 'Other';
    }));
    return ['all', ...Array.from(periodSet)];
  }, []);

  // Filter chapters based on search and period
  const filteredChapters = useMemo(() => {
    return chapters.filter(chapter => {
      const matchesSearch = chapter.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           chapter.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           chapter.keyEvents.some(event => event.toLowerCase().includes(searchQuery.toLowerCase()));
      
      if (selectedPeriod === 'all') return matchesSearch;
      
      const yearMatch = chapter.period.match(/\d{4}/);
      if (yearMatch) {
        const year = parseInt(yearMatch[0]);
        const chapterPeriod = year < 1800 ? '18th Century' :
                             year < 1900 ? '19th Century' :
                             year < 2000 ? '20th Century' : '21st Century';
        return matchesSearch && chapterPeriod === selectedPeriod;
      }
      return matchesSearch && selectedPeriod === 'Other';
    });
  }, [searchQuery, selectedPeriod, chapters]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedPeriod('all');
    setShowFilters(false);
  };

  return (
    <div className="min-h-screen bg-slate-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">Historical Chapters</h1>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto px-4 mb-8">
            Explore 10 pivotal moments in history, each with 10 alternative timelines 
            showing how different choices could have shaped our world.
          </p>

          {/* Search and Filter Section */}
          <div className="max-w-2xl mx-auto space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search chapters, events, or descriptions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Filter Toggle and Options */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
              >
                <Filter className="w-4 h-4" />
                <span>Filters</span>
                {(searchQuery || selectedPeriod !== 'all') && (
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                )}
              </button>

              {(searchQuery || selectedPeriod !== 'all') && (
                <button
                  onClick={clearFilters}
                  className="flex items-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors text-sm"
                >
                  <X className="w-4 h-4" />
                  <span>Clear All</span>
                </button>
              )}

              <div className="text-sm text-gray-400">
                Showing {filteredChapters.length} of {chapters.length} chapters
              </div>
            </div>

            {/* Filter Options */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="bg-slate-800 rounded-lg p-4 space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        <Clock className="inline w-4 h-4 mr-2" />
                        Time Period
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {periods.map(period => (
                          <button
                            key={period}
                            onClick={() => setSelectedPeriod(period)}
                            className={`px-3 py-1 rounded-full text-sm transition-colors ${
                              selectedPeriod === period
                                ? 'bg-blue-600 text-white'
                                : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
                            }`}
                          >
                            {period === 'all' ? 'All Periods' : period}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          <AnimatePresence>
            {filteredChapters.map((chapter, index) => (
              <motion.div
                key={chapter.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group"
              >
                <Link to={`/chapter/${chapter.id}`}>
                  <div className="bg-slate-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
                    <div className={`h-40 sm:h-48 bg-gradient-to-br ${chapter.color} relative`}>
                      <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                        <div className="text-center text-white">
                          <Calendar className="w-12 h-12 mx-auto mb-2" />
                          <div className="text-xl sm:text-2xl font-bold">{chapter.period}</div>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 sm:p-6">
                      <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                        {chapter.title}
                      </h3>
                      
                      <p className="text-sm sm:text-base text-gray-300 mb-4 line-clamp-2">
                        {chapter.description}
                      </p>

                      <div className="space-y-3 mb-4">
                        <div className="flex items-center space-x-2 text-sm text-gray-400">
                          <MapPin className="w-4 h-4" />
                          <span>Key Events:</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {chapter.keyEvents.slice(0, 3).map((event, i) => (
                            <span
                              key={i}
                              className="bg-slate-700 text-gray-300 px-2 py-1 rounded-sm text-xs sm:text-sm"
                            >
                              {event}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 text-gray-400">
                          <GitBranch className="w-4 h-4" />
                          <span className="text-xs sm:text-sm">{chapter.alternativeCount} Alternative Timelines</span>
                        </div>
                        
                        <div className="text-blue-400 font-semibold group-hover:text-blue-300 transition-colors text-sm sm:text-base">
                          Explore →
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
              <h3 className="text-xl font-semibold text-white mb-2">No chapters found</h3>
              <p className="text-gray-400 mb-4">
                Try adjusting your search terms or filters to find more chapters.
              </p>
              <button
                onClick={clearFilters}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Clear Filters
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
            <h3 className="text-lg sm:text-xl font-bold text-white mb-2">Interactive Timeline Experience</h3>
            <p className="text-sm sm:text-base text-gray-300">
              Each chapter contains detailed timelines with cause-and-effect visualizations, 
              showing how small changes could have dramatically altered the course of history.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ChaptersPage;