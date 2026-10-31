import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Timeline from '../components/Timeline';
import Certificates from '../components/Certificates';
import Resume from '../components/Resume';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import ScrollProgress from '../components/ScrollProgress';
import { portfolioService } from '../services/api';

export default function Home() {
  const [profile, setProfile] = useState(null);
  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);
  const [timeline, setTimeline] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPortfolioData() {
      try {
        const [profileData, skillsData, projectsData, timelineData, certsData] = await Promise.all([
          portfolioService.getProfile(),
          portfolioService.getSkills(),
          portfolioService.getProjects(),
          portfolioService.getTimeline(),
          portfolioService.getCertificates(),
        ]);

        setProfile(profileData);
        setSkills(skillsData);
        setProjects(projectsData);
        setTimeline(timelineData);
        setCertificates(certsData);
      } catch (err) {
        console.error('Failed to load portfolio content:', err);
      } finally {
        setLoading(false);
      }
    }

    loadPortfolioData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#08090b] flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-[#11141a] border border-[#a3e635]/40 flex items-center justify-center animate-pulse">
          <span className="font-heading font-black text-xl text-[#a3e635]">AS</span>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
          <span className="w-1.5 h-1.5 rounded-full bg-[#a3e635] animate-ping" />
          <span>Initializing Portfolio Interface...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#08090b] text-zinc-100 flex flex-col selection:bg-[#a3e635] selection:text-[#08090b]">
      {/* Scroll Progress Bar */}
      <ScrollProgress />

      {/* 1. Navbar */}
      <Navbar profile={profile} />

      <main className="flex-1">
        {/* 2. Hero */}
        <Hero profile={profile} />

        {/* 3. About Me */}
        <About profile={profile} />

        {/* 4. Skills */}
        <Skills skills={skills} />

        {/* 5. Projects */}
        <Projects projects={projects} />

        {/* 6. Education & Experience Timeline */}
        <Timeline timeline={timeline} />

        {/* 7. Certificates & Achievements */}
        <Certificates certificates={certificates} />

        {/* 8. Resume Download */}
        <Resume profile={profile} />

        {/* 9. Contact Form */}
        <Contact profile={profile} />
      </main>

      {/* 10. Footer */}
      <Footer profile={profile} />
    </div>
  );
}
