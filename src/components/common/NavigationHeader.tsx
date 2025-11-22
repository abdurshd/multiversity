import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { Home, BookOpen, GitBranch, Menu, X, Sparkles } from 'lucide-react';
import MultiversityIcon from '../icons/MultiversityIcon';
import LanguageSwitcher from './LanguageSwitcher';

const NavigationHeader: React.FC = () => {
  const location = useLocation();
  const { t } = useTranslation(['common-nav', 'common-ui']);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navItems = useMemo(
    () => [
      { path: '/', label: t('common-nav:nav.home'), icon: Home },
      { path: '/chapters', label: t('common-nav:nav.chapters'), icon: BookOpen },
      { path: '/compare', label: t('common-nav:nav.compare'), icon: GitBranch },
    ],
    [t],
  );

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-slate-900 border-b border-slate-700 px-4 sm:px-6 py-4 relative z-50">
      <div className="relative max-w-7xl mx-auto">
        {/* Background Container with Clipping */}
        <div className="absolute inset-0 rounded-2xl border border-white/10 bg-slate-900/80 backdrop-blur-xl shadow-[0_20px_50px_rgba(8,112,184,0.15)] overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/15 via-blue-500/10 to-blue-400/10" />
        </div>

        {/* Content Container - No Overflow Hidden */}
        <div className="relative flex items-center justify-between px-4 sm:px-6 py-3">
          <Link to="/" className="flex items-center space-x-3">
            <div className="relative">
              <div className="absolute inset-0 blur-lg bg-blue-500/30" />
              <MultiversityIcon className="relative w-6 h-6 sm:w-8 sm:h-8 text-blue-400 drop-shadow-[0_0_15px_rgba(59,130,246,0.6)]" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-white tracking-wide">Multiversity</h1>
              <p className="hidden sm:block text-xs uppercase tracking-[0.3em] text-blue-200/80">Alternate History Lab</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4 lg:space-x-6">
            {navItems.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center space-x-2 rounded-full px-4 py-2 text-sm font-semibold transition-all ${isActive(path)
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                  : 'text-slate-200 hover:text-white hover:bg-white/5'
                  }`}
              >
                <Icon className="w-4 h-4" />
                <span>{label}</span>
              </Link>
            ))}
            <LanguageSwitcher />
            <Link
              to="/chapters"
              className="inline-flex items-center space-x-2 rounded-full bg-white/10 px-5 py-2 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>{t('common-ui:buttons.explore')}</span>
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-gray-300 hover:text-white p-2"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 right-0 md:hidden border-t border-white/10 bg-slate-900/95 backdrop-blur-xl rounded-b-2xl shadow-xl z-50 px-4 pb-4">
          <nav className="space-y-2">
            {navItems.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                onClick={closeMenu}
                className={`flex items-center space-x-3 px-3 py-3 rounded-xl transition ${isActive(path)
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
              >
                <Icon className="w-5 h-5" />
                <span>{label}</span>
              </Link>
            ))}
            <Link
              to="/chapters"
              onClick={closeMenu}
              className="flex items-center justify-center space-x-2 rounded-xl border border-white/10 px-3 py-3 text-sm font-semibold text-white"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>{t('common-ui:buttons.explore')}</span>
            </Link>
            <div className="pt-2 flex justify-center">
              <LanguageSwitcher />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default NavigationHeader;
