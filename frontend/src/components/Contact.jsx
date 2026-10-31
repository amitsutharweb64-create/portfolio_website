import React, { useState } from 'react';
import { Mail, MapPin, Send, CheckCircle2, AlertCircle, Loader2, Sparkles, MessageSquare } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { portfolioService } from '../services/api';

export default function Contact({ profile }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    honeypot: '' // Spam prevention honeypot field
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const shouldReduceMotion = useReducedMotion();

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) {
      errs.name = 'Please provide your name.';
    } else if (formData.name.trim().length < 2) {
      errs.name = 'Name must be at least 2 characters.';
    }

    if (!formData.email.trim()) {
      errs.email = 'Please provide your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Please provide a valid email address.';
    }

    if (!formData.message.trim()) {
      errs.message = 'Please provide a message.';
    } else if (formData.message.trim().length < 10) {
      errs.message = 'Message must be at least 10 characters.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Honeypot check: if filled, quietly reject bot
    if (formData.honeypot) {
      setStatus('success');
      setFeedbackMessage('Thank you for reaching out!');
      return;
    }

    if (!validate()) return;

    setStatus('loading');
    setFeedbackMessage('');

    try {
      const response = await portfolioService.submitContact({
        name: formData.name.trim(),
        email: formData.email.trim(),
        message: formData.message.trim(),
      });

      setStatus('success');
      setFeedbackMessage(response.message || 'Thank you! Your message has been sent successfully.');
      setFormData({ name: '', email: '', message: '', honeypot: '' });
    } catch (err) {
      setStatus('error');
      setFeedbackMessage(err.message || 'Failed to deliver message. Please try again or email directly.');
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
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
            <span>06 // Connect</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-heading text-white">
            Get in Touch
          </h2>
          <div className="w-16 h-1 bg-[#a3e635] rounded-full mt-2" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 text-left">
          
          {/* Direct Details Column */}
          <motion.div
            initial={{ opacity: shouldReduceMotion ? 1 : 0, x: shouldReduceMotion ? 0 : -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-8"
          >
            <div className="space-y-4">
              <h3 className="text-2xl font-bold font-heading text-white">
                Let's build something exceptional.
              </h3>
              <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
                Whether you have an upcoming project, are looking for a full-stack developer to join your engineering team, or simply want to connect, feel free to send a message.
              </p>
            </div>

            <div className="space-y-4">
              <a
                href={`mailto:${profile?.email || 'amit.suthar.dev@example.com'}`}
                className="p-5 rounded-2xl glass-panel border border-white/5 hover:border-[#a3e635]/40 flex items-center gap-4 transition-all group hover:-translate-y-0.5"
              >
                <div className="p-3 rounded-xl bg-[#141822] text-[#a3e635] border border-white/5 group-hover:scale-110 transition-transform">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-mono text-zinc-400">Direct Email</p>
                  <p className="text-sm font-semibold text-white group-hover:text-[#bef264] transition-colors">
                    {profile?.email || 'amit.suthar.dev@example.com'}
                  </p>
                </div>
              </a>

              <div className="p-5 rounded-2xl glass-panel border border-white/5 flex items-center gap-4">
                <div className="p-3 rounded-xl bg-[#141822] text-[#a3e635] border border-white/5">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-mono text-zinc-400">Location</p>
                  <p className="text-sm font-semibold text-white">
                    {profile?.location || 'India (Open to Remote Globally)'}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form with Reveal */}
          <motion.div
            initial={{ opacity: shouldReduceMotion ? 1 : 0, x: shouldReduceMotion ? 0 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <div className="p-8 sm:p-10 rounded-3xl glass-panel border border-white/10 shadow-xl relative">
              
              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                {/* Honeypot anti-spam field */}
                <input
                  type="text"
                  name="honeypot"
                  value={formData.honeypot}
                  onChange={handleChange}
                  className="hidden"
                  tabIndex="-1"
                  autoComplete="off"
                />

                {/* Name Field */}
                <div>
                  <label htmlFor="contact-name" className="block text-xs font-mono uppercase tracking-wider text-zinc-300 mb-2">
                    Your Name <span className="text-[#a3e635]">*</span>
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Sarah Connor"
                    className={`w-full px-4 py-3.5 rounded-xl bg-[#10131b] border ${
                      errors.name ? 'border-rose-500' : 'border-white/10 focus:border-[#a3e635]'
                    } text-white placeholder-zinc-500 text-sm focus:outline-none transition-colors`}
                  />
                  {errors.name && (
                    <p className="mt-1.5 text-xs text-rose-400 font-mono flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="contact-email" className="block text-xs font-mono uppercase tracking-wider text-zinc-300 mb-2">
                    Your Email <span className="text-[#a3e635]">*</span>
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="sarah@example.com"
                    className={`w-full px-4 py-3.5 rounded-xl bg-[#10131b] border ${
                      errors.email ? 'border-rose-500' : 'border-white/10 focus:border-[#a3e635]'
                    } text-white placeholder-zinc-500 text-sm focus:outline-none transition-colors`}
                  />
                  {errors.email && (
                    <p className="mt-1.5 text-xs text-rose-400 font-mono flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Message Field */}
                <div>
                  <label htmlFor="contact-message" className="block text-xs font-mono uppercase tracking-wider text-zinc-300 mb-2">
                    Message <span className="text-[#a3e635]">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project, timeline, or inquiry..."
                    className={`w-full px-4 py-3.5 rounded-xl bg-[#10131b] border ${
                      errors.message ? 'border-rose-500' : 'border-white/10 focus:border-[#a3e635]'
                    } text-white placeholder-zinc-500 text-sm focus:outline-none transition-colors resize-none`}
                  />
                  {errors.message && (
                    <p className="mt-1.5 text-xs text-rose-400 font-mono flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Feedback message banner */}
                {feedbackMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 rounded-xl text-xs font-mono flex items-center gap-2.5 ${
                      status === 'success'
                        ? 'bg-[#a3e635]/15 text-[#bef264] border border-[#a3e635]/30'
                        : 'bg-rose-500/15 text-rose-300 border border-rose-500/30'
                    }`}
                  >
                    {status === 'success' ? (
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                    ) : (
                      <AlertCircle className="w-4 h-4 shrink-0" />
                    )}
                    <span>{feedbackMessage}</span>
                  </motion.div>
                )}

                {/* Submit button with hover & tap feedback */}
                <motion.button
                  whileHover={shouldReduceMotion ? {} : { scale: 1.01 }}
                  whileTap={shouldReduceMotion ? {} : { scale: 0.99 }}
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full py-4 rounded-xl bg-[#a3e635] hover:bg-[#bef264] disabled:opacity-50 text-[#08090b] font-bold text-sm transition-colors duration-200 flex items-center justify-center gap-2 shadow-lg shadow-[#a3e635]/20 cursor-pointer"
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Sending Message...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Message
                    </>
                  )}
                </motion.button>
              </form>

            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
