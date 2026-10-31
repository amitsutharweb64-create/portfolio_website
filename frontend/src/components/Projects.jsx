import React, { useState } from 'react';
import { ExternalLink, Sparkles, FolderGit2 } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { GithubIcon } from './SocialIcons';

export default function Projects({ projects = [] }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const shouldReduceMotion = useReducedMotion();

  const categories = ['All', 'Full-Stack', 'Frontend', 'Backend'];

  const filteredProjects = selectedCategory === 'All'
    ? projects
    : projects.filter(p => p.category === selectedCategory);

  const cardVariants = {
    hidden: { opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
  };

  return (
    <section id="projects" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header & Filter Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <motion.div
            initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
            className="text-left space-y-2"
          >
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#a3e635]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>03 // Creations</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-heading text-white">
              Featured Projects
            </h2>
            <div className="w-16 h-1 bg-[#a3e635] rounded-full mt-2" />
          </motion.div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2 mt-6 md:mt-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#a3e635] text-[#08090b] font-bold shadow-md shadow-[#a3e635]/20'
                    : 'bg-[#12151e] text-zinc-400 hover:text-white border border-white/5 hover:border-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid with AnimatePresence & layout transitions */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id || project._id}
                layout
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                whileHover={shouldReduceMotion ? {} : { y: -6 }}
                transition={{ duration: 0.3 }}
                className="group rounded-3xl glass-panel border border-white/10 hover:border-[#a3e635]/50 overflow-hidden flex flex-col hover:shadow-2xl hover:shadow-[#a3e635]/10"
              >
                {/* Image Preview Container */}
                <div className="relative aspect-video w-full overflow-hidden bg-[#12151d] border-b border-white/5">
                  <img
                    src={project.imageUrl || 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80'}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f1218] via-transparent to-transparent opacity-60" />

                  {/* Category & Featured Badge */}
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-black/75 backdrop-blur-md text-[#bef264] border border-[#a3e635]/30">
                      {project.category}
                    </span>
                    {project.featured && (
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-mono font-semibold bg-[#a3e635]/20 backdrop-blur-md text-[#a3e635] border border-[#a3e635]/40 flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        Featured
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-7 flex-1 flex flex-col justify-between space-y-6">
                  <div className="space-y-3">
                    <h3 className="text-xl sm:text-2xl font-bold font-heading text-white group-hover:text-[#bef264] transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-zinc-300 text-sm leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Tech Tags & Actions */}
                  <div className="space-y-5 pt-4 border-t border-white/5">
                    <div className="flex flex-wrap gap-2">
                      {project.technologies?.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 rounded-md text-xs font-mono bg-[#141822] text-zinc-300 border border-white/5"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-3">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 py-2.5 px-4 rounded-xl bg-[#a3e635] text-[#08090b] font-bold text-xs hover:bg-[#bef264] transition-all flex items-center justify-center gap-2 shadow-sm shadow-[#a3e635]/20 hover:scale-[1.02] active:scale-[0.98]"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          Live Demo
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="py-2.5 px-4 rounded-xl bg-[#141822] hover:bg-[#1a202c] text-zinc-200 border border-white/10 hover:border-white/20 text-xs font-semibold transition-all flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98]"
                        >
                          <GithubIcon className="w-3.5 h-3.5" />
                          Source
                        </a>
                      )}
                    </div>
                  </div>

                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}
