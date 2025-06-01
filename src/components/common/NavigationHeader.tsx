import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, BookOpen, GitBranch } from 'lucide-react';
import MultiversityIcon from '../icons/MultiversityIcon';

const NavigationHeader: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-dark-900 border-b border-dark-700 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-3">
          <MultiversityIcon className="w-8 h-8 text-primary-500" />
          <h1 className="text-2xl font-bold text-white">Multiversity</h1>
        </Link>

        <nav className="flex items-center space-x-6">
          <Link
            to="/"
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
              isActive('/') 
                ? 'bg-primary-600 text-white' 
                : 'text-gray-300 hover:text-white hover:bg-dark-800'
            }`}
          >
            <Home className="w-4 h-4" />
            <span>Home</span>
          </Link>

          <Link
            to="/chapters"
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
              isActive('/chapters') 
                ? 'bg-primary-600 text-white' 
                : 'text-gray-300 hover:text-white hover:bg-dark-800'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Chapters</span>
          </Link>

          <Link
            to="/compare"
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
              isActive('/compare') 
                ? 'bg-primary-600 text-white' 
                : 'text-gray-300 hover:text-white hover:bg-dark-800'
            }`}
          >
            <GitBranch className="w-4 h-4" />
            <span>Compare</span>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default NavigationHeader;