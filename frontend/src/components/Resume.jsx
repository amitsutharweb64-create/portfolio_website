import React from 'react';
import { Download, FileText, Sparkles, CheckCircle2 } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { resolveAssetUrl } from '../services/api';

export default function Resume({ profile }) {
  const resumeUrl = resolveAssetUrl(profile?.resumeUrl) || '#';
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="resume" className="py-24 bg-[#0a0c10] relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner Container with viewport entrance */}
        <motion.div
          initial={{ opacity: shouldReduceMotion ? 1 : 0, scale: shouldReduceMotion ? 1 : 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-3xl p-8 sm:p-12 glass-panel-glow border border-[#a3e635]/25 overflow-hidden text-left"
        >
          {/* Background subtle glowing radial */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#a3e635]/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div className="space-y-4 max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#141822] text-[#a3e635] text-xs font-mono border border-[#a3e635]/30">
                <FileText className="w-3.5 h-3.5" />
                <span>Curriculum Vitae</span>
              </div>
              
              <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white">
                Interested in Working Together?
              </h2>

              <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
                Download my comprehensive resume covering my full technical capabilities, academic background, real-world project deliverables, and software engineering philosophy.
              </p>

              <div className="flex flex-wrap gap-4 text-xs font-mono text-zinc-400 pt-2">
                <span className="flex items-center gap-1.5 text-zinc-300">
                  <CheckCircle2 className="w-4 h-4 text-[#a3e635]" />
                  MERN & 3D Web Stack
                </span>
                <span className="flex items-center gap-1.5 text-zinc-300">
                  <CheckCircle2 className="w-4 h-4 text-[#a3e635]" />
                  Verified Credentials
                </span>
                <span className="flex items-center gap-1.5 text-zinc-300">
                  <CheckCircle2 className="w-4 h-4 text-[#a3e635]" />
                  Updated for 2025/2026
                </span>
              </div>
            </div>

            {/* Download CTA Button */}
            <div className="shrink-0 flex flex-col gap-3 w-full sm:w-auto">
              <motion.a
                whileHover={shouldReduceMotion ? {} : { scale: 1.03 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
                href={resumeUrl}
                download="Amit_Suthar_Resume.pdf"
                target={resumeUrl.startsWith('http') ? '_blank' : '_self'}
                rel="noopener noreferrer"
                className="px-8 py-4 rounded-xl bg-[#a3e635] hover:bg-[#bef264] text-[#08090b] font-bold text-sm transition-colors duration-200 flex items-center justify-center gap-2.5 shadow-lg shadow-[#a3e635]/25 cursor-pointer"
              >
                <Download className="w-5 h-5" />
                Download Resume (PDF)
              </motion.a>
              <span className="text-[11px] font-mono text-zinc-500 text-center">
                PDF Format • Verified Virus-Free
              </span>
            </div>
          </div>

        </motion.div>

      </div>
    </section>
  );
}
