import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Twitter, Mail, Sparkles, ArrowRight } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-slate-950 border-t border-white/10">
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            'radial-gradient(circle at top, rgba(59,130,246,0.35), transparent 45%)',
        }}
      />
      <div className="pointer-events-none absolute inset-0 opacity-[0.15]" style={{ backgroundImage: 'linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 0), linear-gradient(0deg, rgba(255,255,255,0.08) 1px, transparent 0)', backgroundSize: '60px 60px' }} />
      <div className="relative max-w-7xl mx-auto px-6 py-16 space-y-12">
        <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl p-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 shadow-[0_20px_120px_rgba(59,130,246,0.2)]">
          <div>
            <p className="text-sm uppercase tracking-[0.4em] text-blue-200 mb-3">Immersive Alt-History</p>
            <h2 className="text-3xl font-bold text-white leading-tight">Ready to rewrite history?</h2>
            <p className="text-slate-300 mt-3 max-w-2xl">
              Explore living timelines, cinematic timelines and meticulously researched what-ifs. Pick a chapter, choose a divergence,
              and watch the world shift under your cursor.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm">
            <Link
              to="/chapters"
              className="flex-1 inline-flex items-center justify-center space-x-2 rounded-2xl bg-blue-600 hover:bg-blue-700 px-5 py-3 text-white font-semibold shadow-lg shadow-blue-600/30 transition-colors"
            >
              <Sparkles className="w-5 h-5" />
              <span>Explore Chapters</span>
            </Link>
            <Link
              to="/compare"
              className="flex-1 inline-flex items-center justify-center space-x-2 rounded-2xl border border-white/20 px-5 py-3 text-white/90 hover:text-white"
            >
              <span>Compare Timelines</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

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
            <nav className="flex flex-col gap-2 text-slate-300">
              <Link to="/" className="group inline-flex items-center gap-2 hover:text-white">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-500 group-hover:bg-white transition" />
                Home
              </Link>
              <Link to="/chapters" className="group inline-flex items-center gap-2 hover:text-white">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-500 group-hover:bg-white transition" />
                Explore Chapters
              </Link>
              <Link to="/compare" className="group inline-flex items-center gap-2 hover:text-white">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-500 group-hover:bg-white transition" />
                Compare Timelines
              </Link>
            </nav>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Resources</h4>
            <nav className="flex flex-col gap-2 text-slate-300">
              <Link to="/docs" className="hover:text-white transition-colors">Documentation</Link>
              <Link to="/faq" className="hover:text-white transition-colors">FAQ</Link>
              <Link to="/support" className="hover:text-white transition-colors">Support</Link>
            </nav>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-400 text-sm flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
            &copy; {currentYear} Multiversity. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-slate-400">
            <Link to="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link to="/accessibility" className="hover:text-white transition-colors">
              Accessibility
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
