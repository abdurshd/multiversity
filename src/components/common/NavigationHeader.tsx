import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, BookOpen, GitBranch, Menu, X } from 'lucide-react';
import MultiversityIcon from '../icons/MultiversityIcon';

const NavigationHeader: React.FC = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
    <header className="bg-slate-900 border-b border-slate-700 px-4 sm:px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-3">
          <MultiversityIcon className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500" />
          <h1 className="text-xl sm:text-2xl font-bold text-white">Multiversity</h1>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link
            to="/"
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
              isActive('/') 
                ? 'bg-blue-600 text-white' 
                : 'text-gray-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Home className="w-4 h-4" />
            <span>Home</span>
          </Link>

          <Link
            to="/chapters"
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
              isActive('/chapters') 
                ? 'bg-blue-600 text-white' 
                : 'text-gray-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Chapters</span>
          </Link>

          <Link
            to="/compare"
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
              isActive('/compare') 
                ? 'bg-blue-600 text-white' 
                : 'text-gray-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <GitBranch className="w-4 h-4" />
            <span>Compare</span>
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

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-slate-700 bg-slate-900">
          <nav className="px-4 py-2 space-y-1">
            <Link
              to="/"
              onClick={closeMenu}
              className={`flex items-center space-x-2 px-3 py-3 rounded-lg transition-colors ${
                isActive('/') 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Home className="w-5 h-5" />
              <span>Home</span>
            </Link>

            <Link
              to="/chapters"
              onClick={closeMenu}
              className={`flex items-center space-x-2 px-3 py-3 rounded-lg transition-colors ${
                isActive('/chapters') 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <BookOpen className="w-5 h-5" />
              <span>Chapters</span>
            </Link>

            <Link
              to="/compare"
              onClick={closeMenu}
              className={`flex items-center space-x-2 px-3 py-3 rounded-lg transition-colors ${
                isActive('/compare') 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <GitBranch className="w-5 h-5" />
              <span>Compare Timelines</span>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default NavigationHeader;