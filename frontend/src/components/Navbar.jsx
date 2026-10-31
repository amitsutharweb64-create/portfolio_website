import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Journey', href: '#timeline' },
  { name: 'Certificates', href: '#certificates' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar({ profile }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#08090b]/85 backdrop-blur-md border-b border-white/10 py-3 shadow-lg shadow-black/40'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#hero"
            className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#a3e635] rounded-lg p-1"
            aria-label="Amit Suthar Portfolio Homepage"
          >
            <div className="w-10 h-10 rounded-xl bg-[#11141a] border border-[#a3e635]/30 flex items-center justify-center text-[#a3e635] font-black text-lg group-hover:scale-105 group-hover:border-[#a3e635] transition-all shadow-sm shadow-[#a3e635]/10">
              AS
            </div>
            <div className="flex flex-col text-left">
              <span className="font-heading font-bold text-base text-white tracking-wide group-hover:text-[#bef264] transition-colors">
                {profile?.name || 'Amit Suthar'}
              </span>
              <span className="text-[11px] font-mono text-zinc-400">Full-Stack Dev</span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2 bg-[#101318]/70 border border-white/5 rounded-full px-4 py-1.5 backdrop-blur-md">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-3 py-1.5 text-sm font-medium text-zinc-300 hover:text-[#bef264] transition-colors rounded-full hover:bg-white/5"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href="#resume"
              className="px-4 py-2 text-xs font-semibold rounded-lg bg-[#141720] border border-white/10 text-zinc-200 hover:border-[#a3e635]/50 hover:text-white transition-all flex items-center gap-1.5"
            >
              Resume
              <ArrowUpRight className="w-3.5 h-3.5 text-[#a3e635]" />
            </a>

            <Link
              to="/admin/login"
              className="p-2 rounded-lg bg-[#141720]/60 border border-white/10 text-zinc-400 hover:text-[#a3e635] hover:border-[#a3e635]/40 transition-all"
              title="Admin Portal"
              aria-label="Admin Login Portal"
            >
              <Shield className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <Link
              to="/admin/login"
              className="p-2 text-zinc-400 hover:text-[#a3e635]"
              aria-label="Admin Login"
            >
              <Shield className="w-4 h-4" />
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-[#12151d] text-zinc-300 hover:text-white border border-white/10 focus:outline-none focus:ring-2 focus:ring-[#a3e635]"
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-panel border-t border-white/10 px-6 py-6 mt-3 space-y-3 animate-fadeIn">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-base font-medium text-zinc-200 hover:text-[#a3e635] hover:bg-white/5 transition-all"
            >
              {link.name}
            </a>
          ))}
          <div className="pt-4 border-t border-white/10 flex flex-col gap-2">
            <a
              href="#resume"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 rounded-lg bg-[#a3e635] text-[#08090b] font-semibold text-sm hover:bg-[#bef264] transition-all flex items-center justify-center gap-2"
            >
              Download Resume
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
