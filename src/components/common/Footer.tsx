import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Twitter, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-800 border-t border-slate-700 mt-16">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-xl font-bold text-white mb-4">Multiversity</h3>
            <p className="text-slate-400 mb-4">
              Explore alternate histories and divergent timelines. Discover how small changes
              can create vastly different worlds and understand the interconnected nature of
              historical events.
            </p>
            <div className="flex gap-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="mailto:contact@multiversity.com"
                className="text-slate-400 hover:text-white transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
            <nav className="flex flex-col gap-2">
              <Link
                to="/"
                className="text-slate-400 hover:text-white transition-colors"
              >
                Home
              </Link>
              <Link
                to="/chapters"
                className="text-slate-400 hover:text-white transition-colors"
              >
                Explore Chapters
              </Link>
              <Link
                to="/compare"
                className="text-slate-400 hover:text-white transition-colors"
              >
                Compare Timelines
              </Link>
            </nav>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Resources</h4>
            <nav className="flex flex-col gap-2">
              <a
                href="#"
                className="text-slate-400 hover:text-white transition-colors"
              >
                Documentation
              </a>
              <a
                href="#"
                className="text-slate-400 hover:text-white transition-colors"
              >
                FAQ
              </a>
              <a
                href="#"
                className="text-slate-400 hover:text-white transition-colors"
              >
                Support
              </a>
            </nav>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-400 text-sm">
            &copy; {currentYear} Multiversity. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-slate-400 hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-slate-400 hover:text-white transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-slate-400 hover:text-white transition-colors">
              Accessibility
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
