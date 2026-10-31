import React, { Suspense, lazy } from 'react';
import { ArrowDown, Mail, Sparkles, Terminal } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { GithubIcon, LinkedinIcon } from './SocialIcons';

const Hero3DScene = lazy(() => import('./Hero3DScene'));

function FallbackVisual() {
  return (
    <div className="w-full h-[360px] md:h-[480px] flex items-center justify-center relative">
      <div className="w-64 h-64 rounded-full border border-[#a3e635]/20 animate-pulse flex items-center justify-center bg-[#101319]/80 backdrop-blur-md">
        <div className="w-48 h-48 rounded-full border border-[#a3e635]/40 flex items-center justify-center">
          <div className="w-32 h-32 rounded-2xl bg-[#a3e635]/10 border border-[#a3e635]/60 flex items-center justify-center rotate-45">
            <span className="font-heading font-black text-3xl text-[#a3e635] -rotate-45">AS</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Hero({ profile }) {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: shouldReduceMotion ? 1 : 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.12,
        delayChildren: shouldReduceMotion ? 0 : 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section id="hero" className="relative min-h-[95vh] pt-32 pb-16 flex items-center justify-center overflow-hidden">
      {/* Background Grid Pattern & Radial Glow */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[350px] bg-[#a3e635]/6 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Column with Framer Motion Orchestration */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 text-left space-y-6"
          >
            {/* Status Badge */}
            <motion.div variants={itemVariants}>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#141820] border border-white/10 text-xs font-mono text-zinc-300">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#a3e635] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#a3e635]"></span>
                </span>
                <span>{profile?.status || 'Available for opportunities'}</span>
              </div>
            </motion.div>

            {/* Main Headline */}
            <motion.div variants={itemVariants} className="space-y-2">
              <p className="text-zinc-400 font-mono text-sm sm:text-base flex items-center gap-2">
                <Terminal className="w-4 h-4 text-[#a3e635]" />
                <span>Hello world, I am</span>
              </p>
              <h1 className="text-4xl sm:text-6xl xl:text-7xl font-extrabold font-heading text-white tracking-tight leading-[1.08]">
                {profile?.name || 'Amit Suthar'}
              </h1>
              <h2 className="text-2xl sm:text-3xl font-semibold text-gradient-lime">
                {profile?.title || 'Full-Stack Developer & 3D Web Enthusiast'}
              </h2>
            </motion.div>

            {/* Bio Description */}
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg text-zinc-300 max-w-2xl leading-relaxed"
            >
              {profile?.bio ||
                'Building production-ready, interactive web applications with modern reactive architectures, Three.js 3D animations, and secure cloud microservices.'}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4 pt-2">
              <motion.a
                whileHover={shouldReduceMotion ? {} : { scale: 1.03 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
                href="#projects"
                className="px-6 py-3 rounded-xl bg-[#a3e635] text-[#08090b] font-bold text-sm hover:bg-[#bef264] transition-colors shadow-lg shadow-[#a3e635]/20 flex items-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                View Featured Projects
              </motion.a>
              <motion.a
                whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
                href="#contact"
                className="px-6 py-3 rounded-xl bg-[#141722] hover:bg-[#1c212e] text-zinc-100 font-semibold text-sm border border-white/10 hover:border-[#a3e635]/40 transition-colors cursor-pointer"
              >
                Get in Touch
              </motion.a>
            </motion.div>

            {/* Social Links & Meta */}
            <motion.div variants={itemVariants} className="pt-6 flex items-center gap-5 border-t border-white/10">
              <span className="text-xs font-mono uppercase tracking-wider text-zinc-500">Connect:</span>
              <div className="flex items-center gap-3">
                <a
                  href={profile?.github || 'https://github.com'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-lg bg-[#11141b] border border-white/10 text-zinc-300 hover:text-[#a3e635] hover:border-[#a3e635]/40 transition-all hover:-translate-y-0.5"
                  aria-label="GitHub Profile"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
                <a
                  href={profile?.linkedin || 'https://linkedin.com'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-lg bg-[#11141b] border border-white/10 text-zinc-300 hover:text-[#a3e635] hover:border-[#a3e635]/40 transition-all hover:-translate-y-0.5"
                  aria-label="LinkedIn Profile"
                >
                  <LinkedinIcon className="w-4 h-4" />
                </a>
                <a
                  href={`mailto:${profile?.email || 'amit.suthar.dev@example.com'}`}
                  className="p-2.5 rounded-lg bg-[#11141b] border border-white/10 text-zinc-300 hover:text-[#a3e635] hover:border-[#a3e635]/40 transition-all hover:-translate-y-0.5"
                  aria-label="Email Contact"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </motion.div>

          </motion.div>

          {/* Right 3D Visual Column */}
          <motion.div
            initial={{ opacity: shouldReduceMotion ? 1 : 0, scale: shouldReduceMotion ? 1 : 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative glass-panel rounded-3xl p-2 border border-white/10 shadow-2xl overflow-hidden">
              <Suspense fallback={<FallbackVisual />}>
                <Hero3DScene />
              </Suspense>

              {/* Interactive Scene Note */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[11px] font-mono text-zinc-400 pointer-events-none">
                Interactive 3D • Drag to rotate
              </div>
            </div>
          </motion.div>

        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="mt-16 flex justify-center"
        >
          <a
            href="#about"
            className="flex flex-col items-center gap-2 text-zinc-500 hover:text-[#a3e635] transition-colors group"
            aria-label="Scroll to About Section"
          >
            <span className="text-xs font-mono uppercase tracking-widest group-hover:text-zinc-300">Explore</span>
            <ArrowDown className="w-4 h-4 animate-bounce text-[#a3e635]" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
