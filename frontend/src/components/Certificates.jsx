import React from 'react';
import { Award, ExternalLink, Sparkles, CheckCircle2 } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';

export default function Certificates({ certificates = [] }) {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: shouldReduceMotion ? 1 : 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  return (
    <section id="certificates" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="text-left mb-16 space-y-2"
        >
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#a3e635]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>05 // Credentials</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-heading text-white">
            Certifications & Honors
          </h2>
          <div className="w-16 h-1 bg-[#a3e635] rounded-full mt-2" />
        </motion.div>

        {/* Certificates Grid with Staggered Entrance */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left"
        >
          {certificates.map((cert) => (
            <motion.div
              key={cert.id || cert._id}
              variants={cardVariants}
              whileHover={shouldReduceMotion ? {} : { y: -6 }}
              transition={{ duration: 0.25 }}
              className="p-7 rounded-3xl glass-panel border border-white/5 hover:border-[#a3e635]/40 transition-colors hover:shadow-xl hover:shadow-[#a3e635]/5 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-[#141822] text-[#a3e635] border border-white/5 flex items-center justify-center">
                    <Award className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-mono px-2.5 py-1 rounded bg-[#161a24] text-zinc-400 border border-white/5">
                    {cert.issueDate}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold font-heading text-white mt-1">
                    {cert.title}
                  </h3>
                  <p className="text-xs font-mono text-[#a3e635] mt-1">
                    {cert.issuer}
                  </p>
                </div>

                {cert.highlight && (
                  <p className="text-xs text-zinc-300 flex items-start gap-2 pt-2">
                    <CheckCircle2 className="w-4 h-4 text-[#a3e635] shrink-0 mt-0.5" />
                    <span>{cert.highlight}</span>
                  </p>
                )}
              </div>

              {cert.verificationUrl && (
                <div className="pt-6 mt-6 border-t border-white/5">
                  <a
                    href={cert.verificationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-300 hover:text-[#bef264] transition-colors"
                  >
                    <span>Verify Credential</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
