import React from 'react';
import { Compass, GraduationCap, MapPin, Target, Sparkles } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';

export default function About({ profile }) {
  const shouldReduceMotion = useReducedMotion();

  const sectionVariants = {
    hidden: { opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const cardVariants = {
    hidden: { opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 20 },
    visible: (custom) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: shouldReduceMotion ? 0 : custom * 0.15 }
    })
  };

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Reveal */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="text-left mb-16 space-y-2"
        >
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#a3e635]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>01 // Discover</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-heading text-white">
            About Me
          </h2>
          <div className="w-16 h-1 bg-[#a3e635] rounded-full mt-2" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Profile Card & Avatar with Interactive Hover */}
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="lg:col-span-5 flex flex-col items-center"
          >
            <motion.div
              whileHover={shouldReduceMotion ? {} : { y: -5 }}
              transition={{ duration: 0.3 }}
              className="relative group w-full max-w-sm"
            >
              {/* Outer decorative gradient border */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-[#a3e635]/50 to-emerald-500/20 opacity-70 blur-md group-hover:opacity-100 transition duration-500" />
              
              <div className="relative rounded-2xl bg-[#0f1218] border border-white/10 p-6 space-y-6">
                <div className="aspect-square w-full rounded-xl overflow-hidden relative border border-white/5 bg-[#171b24]">
                  <img
                    src={profile?.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80"}
                    alt={profile?.name || "Amit Suthar"}
                    className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f1218] via-transparent to-transparent opacity-80" />
                  
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-black/75 backdrop-blur-md text-xs font-mono text-[#bef264] border border-[#a3e635]/30">
                      <MapPin className="w-3.5 h-3.5" />
                      {profile?.location || "India"}
                    </span>
                    <span className="text-xs font-mono text-zinc-400 bg-black/60 px-2 py-1 rounded">
                      Developer
                    </span>
                  </div>
                </div>

                {/* Quick Info Grid */}
                <div className="grid grid-cols-2 gap-3 pt-2 text-left">
                  <div className="p-3 rounded-lg bg-[#141822] border border-white/5">
                    <p className="text-[11px] font-mono text-zinc-400 uppercase">Focus</p>
                    <p className="text-sm font-semibold text-white mt-1">Full-Stack & 3D</p>
                  </div>
                  <div className="p-3 rounded-lg bg-[#141822] border border-white/5">
                    <p className="text-[11px] font-mono text-zinc-400 uppercase">Experience</p>
                    <p className="text-sm font-semibold text-[#a3e635] mt-1">Intern & Builder</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Detailed Narrative & Goals */}
          <div className="lg:col-span-7 space-y-8 text-left">
            
            {/* Introduction paragraph */}
            <motion.div
              custom={1}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="space-y-4"
            >
              <h3 className="text-xl sm:text-2xl font-bold text-white font-heading">
                Transforming ideas into interactive, scalable web reality.
              </h3>
              <p className="text-zinc-300 text-base sm:text-lg leading-relaxed">
                {profile?.about ||
                  "I am Amit Suthar, a creative full-stack developer committed to writing clean, maintainable code and engineering memorable digital experiences. From building robust Express/MongoDB backend APIs to rendering silky smooth 3D scenes in the browser, I treat software craft with care and curiosity."}
              </p>
            </motion.div>

            {/* Learning Journey Card */}
            <motion.div
              custom={2}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              whileHover={shouldReduceMotion ? {} : { scale: 1.01, borderColor: "rgba(163, 230, 53, 0.35)" }}
              className="p-6 rounded-2xl glass-panel border border-white/10 space-y-3 relative overflow-hidden transition-colors"
            >
              <div className="flex items-center gap-3 text-[#a3e635]">
                <div className="p-2 rounded-lg bg-[#a3e635]/10 border border-[#a3e635]/20">
                  <Compass className="w-5 h-5" />
                </div>
                <h4 className="font-heading font-semibold text-lg text-white">Continuous Learning Journey</h4>
              </div>
              <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
                {profile?.learningJourney ||
                  "Constantly expanding knowledge across modern reactive architectures, real-time distributed systems, Three.js shader pipelines, and cloud-native deployment patterns."}
              </p>
            </motion.div>

            {/* Career Goals Card */}
            <motion.div
              custom={3}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              whileHover={shouldReduceMotion ? {} : { scale: 1.01, borderColor: "rgba(52, 211, 153, 0.35)" }}
              className="p-6 rounded-2xl glass-panel border border-white/10 space-y-3 relative overflow-hidden transition-colors"
            >
              <div className="flex items-center gap-3 text-emerald-400">
                <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                  <Target className="w-5 h-5 text-emerald-400" />
                </div>
                <h4 className="font-heading font-semibold text-lg text-white">Career Vision & Objectives</h4>
              </div>
              <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
                {profile?.careerGoals ||
                  "Aspiring to build scalable products, collaborate with world-class engineering teams, and deliver intuitive web experiences that seamlessly blend design and technology."}
              </p>
            </motion.div>

          </div>

        </div>

      </div>
    </section>
  );
}
