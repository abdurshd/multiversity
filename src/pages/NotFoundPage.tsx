import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export const NotFoundPage: React.FC = () => {
  const { t } = useTranslation('pages-not-found');

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-6">
      <div className="max-w-2xl w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* 404 Animation */}
          <motion.div
            className="text-8xl md:text-9xl font-bold text-slate-700 mb-8"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            404
          </motion.div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t('title')}
          </h1>

          {/* Description */}
          <p className="text-lg text-slate-400 mb-8">
            {t('description')}
          </p>

          {/* Decorative Elements */}
          <div className="flex justify-center gap-4 mb-8">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={`particle-${i}`}
                className="w-2 h-2 bg-blue-500 rounded-full"
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
              />
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              <Home className="w-5 h-5" />
              {t('buttons.go_home')}
            </Link>
            <Link
              to="/chapters"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
            >
              <Search className="w-5 h-5" />
              {t('buttons.explore_chapters')}
            </Link>
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white border border-slate-600 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              {t('buttons.go_back')}
            </button>
          </div>

          {/* Additional Help */}
          <div className="mt-12 text-sm text-slate-500">
            <p>{t('help_text')}</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
