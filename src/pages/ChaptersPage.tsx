import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Users, GitBranch } from 'lucide-react';

const ChaptersPage: React.FC = () => {
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

  return (
    <div className="min-h-screen bg-dark-900 py-8">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-white mb-4">Historical Chapters</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Explore 10 pivotal moments in history, each with 10 alternative timelines 
            showing how different choices could have shaped our world.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {chapters.map((chapter, index) => (
            <motion.div
              key={chapter.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <Link to={`/chapter/${chapter.id}`}>
                <div className="bg-dark-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
                  <div className={`h-48 bg-gradient-to-br ${chapter.color} relative`}>
                    <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                      <div className="text-center text-white">
                        <Calendar className="w-12 h-12 mx-auto mb-2" />
                        <div className="text-2xl font-bold">{chapter.period}</div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-primary-400 transition-colors">
                      {chapter.title}
                    </h3>
                    
                    <p className="text-gray-300 mb-4 line-clamp-2">
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
                            className="bg-dark-700 text-gray-300 px-2 py-1 rounded text-sm"
                          >
                            {event}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 text-gray-400">
                        <GitBranch className="w-4 h-4" />
                        <span className="text-sm">{chapter.alternativeCount} Alternative Timelines</span>
                      </div>
                      
                      <div className="text-primary-400 font-semibold group-hover:text-primary-300 transition-colors">
                        Explore →
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <div className="bg-dark-800 rounded-lg p-8 max-w-2xl mx-auto">
            <Users className="w-12 h-12 text-primary-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Interactive Timeline Experience</h3>
            <p className="text-gray-300">
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