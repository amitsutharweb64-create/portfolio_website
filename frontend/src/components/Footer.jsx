import React from 'react';
import { ArrowUp, Mail, Heart } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';

export default function Footer({ profile }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#060709] border-t border-white/5 py-12 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-white/5">
          {/* Logo & Tagline */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#11141a] border border-[#a3e635]/30 flex items-center justify-center text-[#a3e635] font-black text-sm">
              AS
            </div>
            <div className="text-left">
              <p className="font-heading font-bold text-white text-sm">
                {profile?.name || 'Amit Suthar'}
              </p>
              <p className="text-[11px] font-mono text-zinc-500">
                Full-Stack & 3D Web Developer
              </p>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            <a
              href={profile?.github || 'https://github.com'}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-[#11141b] border border-white/5 text-zinc-400 hover:text-[#a3e635] hover:border-[#a3e635]/30 transition-all"
              aria-label="GitHub Profile"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
            <a
              href={profile?.linkedin || 'https://linkedin.com'}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-[#11141b] border border-white/5 text-zinc-400 hover:text-[#a3e635] hover:border-[#a3e635]/30 transition-all"
              aria-label="LinkedIn Profile"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${profile?.email || 'amit.suthar.dev@example.com'}`}
              className="p-2 rounded-lg bg-[#11141b] border border-white/5 text-zinc-400 hover:text-[#a3e635] hover:border-[#a3e635]/30 transition-all"
              aria-label="Email Contact"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>

          {/* Back to top button */}
          <button
            onClick={scrollToTop}
            className="p-2.5 rounded-xl bg-[#11141b] border border-white/10 text-zinc-300 hover:text-[#a3e635] hover:border-[#a3e635]/40 transition-all flex items-center gap-2 text-xs font-mono group cursor-pointer"
            aria-label="Back to top of page"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform text-[#a3e635]" />
          </button>
        </div>

        {/* Copyright notice */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-zinc-500 gap-3">
          <p>
            &copy; {currentYear} {profile?.name || 'Amit Suthar'}. All rights reserved.
          </p>
          <p className="flex items-center gap-1.5">
            Designed & Engineered with <Heart className="w-3 h-3 text-[#a3e635] fill-[#a3e635]" /> for high performance.
          </p>
        </div>

      </div>
    </footer>
  );
}
