import React, { useState } from 'react';
import { Sparkles, Code2, Box, Palette, Server, Database, ShieldCheck, Terminal, Layers, Cpu, Network, Lock, Cloud, GitBranch, Workflow, Compass } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';

const iconMap = {
  Code2,
  Box,
  Palette,
  Sparkles,
  Cpu,
  Layers,
  Server,
  Network,
  Database,
  ShieldCheck,
  Cloud,
  Lock,
  GitBranch,
  Terminal,
  Workflow,
  Compass
};

export default function Skills({ skills = [] }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const shouldReduceMotion = useReducedMotion();

  const categories = ['All', ...skills.map(s => s.category)];

  const filteredCategories = activeCategory === 'All' 
    ? skills 
    : skills.filter(s => s.category === activeCategory);

  const containerVariants = {
    hidden: { opacity: shouldReduceMotion ? 1 : 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.08,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  return (
    <section id="skills" className="py-24 bg-[#0a0c10] relative">
      {/* Background accents */}
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-[#a3e635]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
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
              <span>02 // Capabilities</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-heading text-white">
              Technical Arsenal
            </h2>
            <div className="w-16 h-1 bg-[#a3e635] rounded-full mt-2" />
          </motion.div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2 mt-6 md:mt-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-[#a3e635] text-[#08090b] shadow-md shadow-[#a3e635]/20 font-bold'
                    : 'bg-[#12151e] text-zinc-400 hover:text-white border border-white/5 hover:border-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grouped Skills Grid with Staggered Entrance */}
        <div className="space-y-12">
          {filteredCategories.map((group) => (
            <div key={group.category} className="space-y-5 text-left">
              <h3 className="text-xl font-heading font-semibold text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#a3e635]" />
                {group.category}
              </h3>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
              >
                {group.skills.map((skill) => {
                  const IconComponent = iconMap[skill.icon] || Code2;
                  return (
                    <motion.div
                      key={skill.name}
                      variants={cardVariants}
                      whileHover={shouldReduceMotion ? {} : { y: -5, scale: 1.01 }}
                      transition={{ duration: 0.2 }}
                      className="group p-5 rounded-2xl glass-panel border border-white/5 hover:border-[#a3e635]/40 transition-colors shadow-lg hover:shadow-xl hover:shadow-[#a3e635]/5"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="p-2.5 rounded-xl bg-[#141822] text-[#a3e635] border border-white/5 group-hover:border-[#a3e635]/30 group-hover:scale-110 transition-all">
                            <IconComponent className="w-5 h-5" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-sm text-zinc-100 group-hover:text-white transition-colors">
                              {skill.name}
                            </h4>
                            <span className="text-[11px] font-mono text-zinc-400">Proficiency</span>
                          </div>
                        </div>
                        <span className="text-xs font-mono font-bold text-[#bef264]">
                          {skill.level}%
                        </span>
                      </div>

                      {/* Animated Progress Bar */}
                      <div className="w-full bg-[#161a24] rounded-full h-1.5 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: shouldReduceMotion ? 0 : 0.9, ease: 'easeOut' }}
                          className="bg-gradient-to-r from-[#a3e635] to-emerald-400 h-1.5 rounded-full opacity-90 group-hover:opacity-100"
                        />
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
