import React, { useState } from 'react';
import { Briefcase, GraduationCap, Calendar, Sparkles } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';

export default function Timeline({ timeline = [] }) {
  const [filter, setFilter] = useState('all');
  const shouldReduceMotion = useReducedMotion();

  const filteredTimeline = filter === 'all'
    ? timeline
    : timeline.filter(item => item.type === filter);

  return (
    <section id="timeline" className="py-24 bg-[#090b0f] relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <motion.div
            initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
            className="text-left space-y-2"
          >
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#a3e635]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>04 // Milestones</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-heading text-white">
              Experience & Education
            </h2>
            <div className="w-16 h-1 bg-[#a3e635] rounded-full mt-2" />
          </motion.div>

          {/* Filter Pills */}
          <div className="flex gap-2 mt-6 md:mt-0">
            {['all', 'experience', 'education'].map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-4 py-1.5 rounded-xl text-xs font-semibold capitalize transition-all cursor-pointer ${
                  filter === tab
                    ? 'bg-[#a3e635] text-[#08090b] font-bold shadow-md shadow-[#a3e635]/20'
                    : 'bg-[#12151e] text-zinc-400 hover:text-white border border-white/5'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Timeline Stream with animated entries */}
        <div className="relative pl-6 sm:pl-8 border-l border-zinc-800 space-y-10 text-left">
          {filteredTimeline.map((item, index) => {
            const isEdu = item.type === 'education';
            return (
              <motion.div
                key={item.id || item._id}
                initial={{ opacity: shouldReduceMotion ? 1 : 0, x: shouldReduceMotion ? 0 : -25 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: shouldReduceMotion ? 0 : index * 0.1 }}
                className="relative group"
              >
                {/* Timeline Node Icon */}
                <div className="absolute -left-[35px] sm:-left-[43px] top-1.5 w-8 h-8 rounded-full bg-[#11141c] border-2 border-[#a3e635] flex items-center justify-center text-[#a3e635] shadow-md shadow-[#a3e635]/20 group-hover:scale-110 transition-transform">
                  {isEdu ? (
                    <GraduationCap className="w-4 h-4" />
                  ) : (
                    <Briefcase className="w-4 h-4" />
                  )}
                </div>

                {/* Card Container */}
                <motion.div
                  whileHover={shouldReduceMotion ? {} : { x: 4 }}
                  transition={{ duration: 0.2 }}
                  className="p-6 rounded-2xl glass-panel border border-white/5 hover:border-[#a3e635]/30 transition-colors"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-mono px-3 py-1 rounded-md bg-[#161a24] text-[#bef264] border border-[#a3e635]/20 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#a3e635]" />
                      {item.period}
                    </span>
                    {item.badge && (
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/5 text-zinc-300 border border-white/10">
                        {item.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold font-heading text-white mt-2">
                    {item.title}
                  </h3>
                  <p className="text-sm font-semibold text-zinc-400 mt-0.5">
                    {item.organization}
                  </p>

                  <p className="text-sm text-zinc-300 leading-relaxed mt-4">
                    {item.description}
                  </p>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
