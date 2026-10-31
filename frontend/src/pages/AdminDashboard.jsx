import React, { useState, useEffect } from 'react';
import {
  Shield, Home, FolderKanban, Award, GraduationCap, Mail, FileText, User,
  LogOut, Plus, Trash2, Edit3, Check, X, Upload, ExternalLink, RefreshCw,
  AlertCircle, CheckCircle2, Loader2, Sparkles, Star, Eye
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { authService, adminService, portfolioService } from '../services/api';

export default function AdminDashboard() {
  const navigate = useNavigate();

  // Active section tab
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [toast, setToast] = useState(null);

  // Data states
  const [adminUser, setAdminUser] = useState(null);
  const [profile, setProfile] = useState({
    name: '',
    title: '',
    bio: '',
    about: '',
    learningJourney: '',
    careerGoals: '',
    email: '',
    location: '',
    status: '',
    github: '',
    linkedin: '',
    twitter: '',
    resumeUrl: '',
    avatarUrl: ''
  });
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [timeline, setTimeline] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [messages, setMessages] = useState([]);

  // Modal / Form states
  const [editingProject, setEditingProject] = useState(null); // null = closed, {} = new or edit
  const [editingSkillGroup, setEditingSkillGroup] = useState(null);
  const [editingTimeline, setEditingTimeline] = useState(null);
  const [editingCert, setEditingCert] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  // Auth Guard & Initial Load
  useEffect(() => {
    if (!authService.isAuthenticated()) {
      navigate('/admin/login');
      return;
    }

    const currentAdmin = authService.getCurrentAdmin();
    setAdminUser(currentAdmin);

    loadAllData();
  }, [navigate]);

  const loadAllData = async () => {
    setLoading(true);
    try {
      const [profData, projData, skillData, timeData, certData, msgData] = await Promise.all([
        portfolioService.getProfile(),
        adminService.getProjects(),
        adminService.getSkills(),
        adminService.getTimeline(),
        adminService.getCertificates(),
        adminService.getContactMessages()
      ]);

      if (profData) setProfile(profData);
      if (Array.isArray(projData)) setProjects(projData);
      if (Array.isArray(skillData)) setSkills(skillData);
      if (Array.isArray(timeData)) setTimeline(timeData);
      if (Array.isArray(certData)) setCertificates(certData);
      if (Array.isArray(msgData)) setMessages(msgData);
    } catch (err) {
      console.error('Error loading dashboard data:', err);
      showToast('Failed to load some dashboard data: ' + err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await authService.logout();
    navigate('/admin/login');
  };

  // 1. Profile Handlers
  const handleProfileChange = (field, value) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const updated = await adminService.updateProfile(profile);
      setProfile(updated);
      showToast('Profile information updated successfully!');
    } catch (err) {
      showToast('Failed to save profile: ' + err.message, 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleFileUpload = async (file, targetField) => {
    if (!file) return;
    setUploading(true);
    try {
      const res = await adminService.uploadFile(file);
      if (res.url) {
        setProfile(prev => ({ ...prev, [targetField]: res.url }));
        showToast(`File uploaded! URL set to ${targetField}. Remember to click "Save Profile".`);
      }
    } catch (err) {
      showToast('File upload failed: ' + err.message, 'error');
    } finally {
      setUploading(false);
    }
  };

  // 2. Project Handlers
  const handleSaveProject = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        ...editingProject,
        technologies: typeof editingProject.technologies === 'string'
          ? editingProject.technologies.split(',').map(t => t.trim()).filter(Boolean)
          : editingProject.technologies
      };

      if (editingProject._id) {
        const updated = await adminService.updateProject(editingProject._id, payload);
        setProjects(prev => prev.map(p => p._id === updated._id ? updated : p));
        showToast('Project updated successfully!');
      } else {
        const created = await adminService.createProject(payload);
        setProjects(prev => [created, ...prev]);
        showToast('New project created successfully!');
      }
      setEditingProject(null);
    } catch (err) {
      showToast('Failed to save project: ' + err.message, 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteProject = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    try {
      await adminService.deleteProject(id);
      setProjects(prev => prev.filter(p => p._id !== id));
      showToast('Project deleted successfully.');
    } catch (err) {
      showToast('Failed to delete project: ' + err.message, 'error');
    }
  };

  // 3. Skill Handlers
  const handleSaveSkillGroup = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editingSkillGroup._id) {
        const updated = await adminService.updateSkillCategory(editingSkillGroup._id, editingSkillGroup);
        setSkills(prev => prev.map(s => s._id === updated._id ? updated : s));
        showToast('Skill group updated successfully!');
      } else {
        const created = await adminService.createSkillCategory(editingSkillGroup);
        setSkills(prev => [...prev, created]);
        showToast('New skill category added successfully!');
      }
      setEditingSkillGroup(null);
    } catch (err) {
      showToast('Failed to save skills: ' + err.message, 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteSkillGroup = async (id) => {
    if (!window.confirm('Delete this entire skill group?')) return;
    try {
      await adminService.deleteSkillCategory(id);
      setSkills(prev => prev.filter(s => s._id !== id));
      showToast('Skill group deleted.');
    } catch (err) {
      showToast('Failed to delete skill group: ' + err.message, 'error');
    }
  };

  // 4. Timeline Handlers
  const handleSaveTimeline = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editingTimeline._id) {
        const updated = await adminService.updateTimeline(editingTimeline._id, editingTimeline);
        setTimeline(prev => prev.map(t => t._id === updated._id ? updated : t));
        showToast('Milestone updated successfully!');
      } else {
        const created = await adminService.createTimeline(editingTimeline);
        setTimeline(prev => [created, ...prev]);
        showToast('New milestone added successfully!');
      }
      setEditingTimeline(null);
    } catch (err) {
      showToast('Failed to save timeline entry: ' + err.message, 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteTimeline = async (id) => {
    if (!window.confirm('Delete this timeline milestone?')) return;
    try {
      await adminService.deleteTimeline(id);
      setTimeline(prev => prev.filter(t => t._id !== id));
      showToast('Timeline entry deleted.');
    } catch (err) {
      showToast('Failed to delete timeline entry: ' + err.message, 'error');
    }
  };

  // 5. Certificate Handlers
  const handleSaveCert = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editingCert._id) {
        const updated = await adminService.updateCertificate(editingCert._id, editingCert);
        setCertificates(prev => prev.map(c => c._id === updated._id ? updated : c));
        showToast('Certificate updated successfully!');
      } else {
        const created = await adminService.createCertificate(editingCert);
        setCertificates(prev => [created, ...prev]);
        showToast('New certificate credential added!');
      }
      setEditingCert(null);
    } catch (err) {
      showToast('Failed to save certificate: ' + err.message, 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteCert = async (id) => {
    if (!window.confirm('Delete this certificate?')) return;
    try {
      await adminService.deleteCertificate(id);
      setCertificates(prev => prev.filter(c => c._id !== id));
      showToast('Certificate deleted.');
    } catch (err) {
      showToast('Failed to delete certificate: ' + err.message, 'error');
    }
  };

  // 6. Messages Handlers
  const handleMarkMessageRead = async (id) => {
    try {
      const updated = await adminService.markMessageRead(id);
      setMessages(prev => prev.map(m => m._id === id ? { ...m, read: true } : m));
      showToast('Message marked as read.');
    } catch (err) {
      showToast('Failed to update message: ' + err.message, 'error');
    }
  };

  const handleDeleteMessage = async (id) => {
    if (!window.confirm('Permanently delete this inquiry?')) return;
    try {
      await adminService.deleteContactMessage(id);
      setMessages(prev => prev.filter(m => m._id !== id));
      showToast('Inquiry message removed.');
    } catch (err) {
      showToast('Failed to delete message: ' + err.message, 'error');
    }
  };

  const unreadCount = messages.filter(m => !m.read).length;

  if (loading) {
    return (
      <div className="min-h-screen bg-[#08090b] flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-[#11141a] border border-[#a3e635]/40 flex items-center justify-center animate-pulse">
          <Shield className="w-6 h-6 text-[#a3e635]" />
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
          <Loader2 className="w-4 h-4 animate-spin text-[#a3e635]" />
          <span>Synchronizing Admin Data & Database...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#08090b] text-white flex flex-col selection:bg-[#a3e635] selection:text-[#08090b]">
      {/* Toast Alert */}
      {toast && (
        <div
          className={`fixed top-5 right-5 z-50 px-4 py-3 rounded-2xl border text-xs font-mono shadow-2xl flex items-center gap-2.5 transition-all duration-300 animate-in fade-in slide-in-from-top-4 ${
            toast.type === 'error'
              ? 'bg-rose-950/90 border-rose-500/50 text-rose-200'
              : 'bg-[#10190c]/90 border-[#a3e635]/50 text-[#a3e635]'
          }`}
        >
          {toast.type === 'error' ? <AlertCircle className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}
          <span>{toast.message}</span>
        </div>
      )}

      {/* Admin Top Navigation Bar */}
      <header className="sticky top-0 z-40 bg-[#0d1017]/95 backdrop-blur-md border-b border-white/10 px-6 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#161a24] border border-[#a3e635]/40 flex items-center justify-center text-[#a3e635] shadow-inner">
            <Shield className="w-5 h-5" />
          </div>
          <div className="text-left">
            <h1 className="font-heading font-extrabold text-sm sm:text-base text-white flex items-center gap-2">
              <span>{adminUser?.name || 'Amit Suthar'}</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#a3e635]/15 border border-[#a3e635]/30 text-[#a3e635]">
                ADMIN
              </span>
            </h1>
            <p className="text-[11px] font-mono text-zinc-400">
              {adminUser?.email || 'admin@example.com'} • MongoDB Connected
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={loadAllData}
            title="Refresh database records"
            className="p-2 rounded-xl bg-[#141822] border border-white/10 text-zinc-400 hover:text-[#a3e635] hover:border-[#a3e635]/30 transition-colors cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
          </button>

          <Link
            to="/"
            target="_blank"
            className="px-3.5 py-1.5 rounded-xl bg-[#141822] border border-white/10 text-xs font-mono text-zinc-300 hover:text-white hover:border-[#a3e635]/30 flex items-center gap-1.5 transition-colors"
          >
            <Eye className="w-3.5 h-3.5 text-[#a3e635]" />
            <span className="hidden sm:inline">Preview</span> Site
          </Link>

          <button
            onClick={handleLogout}
            className="px-3.5 py-1.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-xs font-mono text-rose-300 hover:bg-rose-500/20 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex-1 w-full space-y-8 text-left">
        {/* KPI Summary Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <div className="p-4 rounded-2xl glass-panel border border-white/10">
            <span className="text-[11px] font-mono text-zinc-400 block mb-1">Projects</span>
            <p className="text-xl font-black font-heading text-white">{projects.length}</p>
          </div>
          <div className="p-4 rounded-2xl glass-panel border border-white/10">
            <span className="text-[11px] font-mono text-zinc-400 block mb-1">Skill Groups</span>
            <p className="text-xl font-black font-heading text-[#a3e635]">{skills.length}</p>
          </div>
          <div className="p-4 rounded-2xl glass-panel border border-white/10">
            <span className="text-[11px] font-mono text-zinc-400 block mb-1">Milestones</span>
            <p className="text-xl font-black font-heading text-white">{timeline.length}</p>
          </div>
          <div className="p-4 rounded-2xl glass-panel border border-white/10">
            <span className="text-[11px] font-mono text-zinc-400 block mb-1">Certificates</span>
            <p className="text-xl font-black font-heading text-white">{certificates.length}</p>
          </div>
          <div className="p-4 rounded-2xl glass-panel border border-white/10">
            <span className="text-[11px] font-mono text-zinc-400 block mb-1">Total Inquiries</span>
            <p className="text-xl font-black font-heading text-white">{messages.length}</p>
          </div>
          <div className="p-4 rounded-2xl glass-panel border border-white/10 relative overflow-hidden">
            <span className="text-[11px] font-mono text-zinc-400 block mb-1">Unread Inquiries</span>
            <p className="text-xl font-black font-heading text-amber-400">{unreadCount}</p>
            {unreadCount > 0 && (
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            )}
          </div>
        </div>

        {/* Tab Switcher Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-white/10">
          {[
            { id: 'profile', label: 'Profile & Bio', icon: User },
            { id: 'projects', label: 'Projects Showcase', icon: FolderKanban, count: projects.length },
            { id: 'skills', label: 'Skills & Arsenal', icon: Award, count: skills.length },
            { id: 'timeline', label: 'Experience & Education', icon: GraduationCap, count: timeline.length },
            { id: 'certificates', label: 'Certifications', icon: FileText, count: certificates.length },
            { id: 'messages', label: 'Contact Inquiries', icon: Mail, badge: unreadCount },
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2.5 rounded-xl font-mono text-xs font-medium flex items-center gap-2 whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-[#a3e635] text-[#08090b] font-bold shadow-lg shadow-[#a3e635]/20'
                    : 'bg-[#12151e] border border-white/10 text-zinc-400 hover:text-white hover:border-white/20'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#08090b]' : 'text-[#a3e635]'}`} />
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isActive ? 'bg-[#08090b]/20 text-[#08090b]' : 'bg-white/10 text-zinc-300'}`}>
                    {tab.count}
                  </span>
                )}
                {tab.badge ? (
                  <span className="px-1.5 py-0.2 rounded-full bg-rose-500 text-white text-[10px] font-bold">
                    {tab.badge}
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>

        {/* -------------------- TAB 1: PROFILE -------------------- */}
        {activeTab === 'profile' && (
          <form onSubmit={handleSaveProfile} className="space-y-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold font-heading text-white">Personal Profile & Narrative</h2>
                <p className="text-xs font-mono text-zinc-400">
                  Manage headline, about story, career aspirations, and avatar/resume assets.
                </p>
              </div>
              <button
                type="submit"
                disabled={saving}
                className="px-6 py-2.5 rounded-xl bg-[#a3e635] hover:bg-[#bef264] disabled:opacity-50 text-[#08090b] font-bold text-xs font-mono transition-all flex items-center gap-2 shadow-lg shadow-[#a3e635]/20 cursor-pointer"
              >
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                <span>Save Profile Changes</span>
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column: Avatar & File Uploads */}
              <div className="space-y-6">
                <div className="p-6 rounded-2xl glass-panel border border-white/10 space-y-4 text-center">
                  <div className="relative w-32 h-32 mx-auto rounded-full overflow-hidden border-2 border-[#a3e635]/60 shadow-xl bg-[#141822]">
                    {profile.avatarUrl ? (
                      <img src={profile.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-3xl font-bold text-[#a3e635]">
                        {profile.name?.charAt(0) || 'A'}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-zinc-400 mb-2">Avatar Image File</label>
                    <label className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-[#161a24] border border-white/10 text-xs font-mono text-zinc-300 hover:text-white hover:border-[#a3e635]/40 transition-colors cursor-pointer w-full">
                      <Upload className="w-3.5 h-3.5 text-[#a3e635]" />
                      <span>{uploading ? 'Uploading...' : 'Upload New Photo'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleFileUpload(e.target.files[0], 'avatarUrl')}
                      />
                    </label>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-zinc-500 mb-1">Direct Avatar URL</label>
                    <input
                      type="url"
                      value={profile.avatarUrl || ''}
                      onChange={(e) => handleProfileChange('avatarUrl', e.target.value)}
                      placeholder="https://..."
                      className="w-full px-3 py-2 rounded-lg bg-[#0e1118] border border-white/10 text-xs text-white focus:outline-none focus:border-[#a3e635]"
                    />
                  </div>
                </div>

                {/* Resume PDF Manager */}
                <div className="p-6 rounded-2xl glass-panel border border-white/10 space-y-4">
                  <div className="flex items-center gap-2 text-white font-mono text-xs font-bold">
                    <FileText className="w-4 h-4 text-[#a3e635]" />
                    <span>Resume Document (CV)</span>
                  </div>

                  <label className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#161a24] border border-white/10 text-xs font-mono text-zinc-300 hover:text-white hover:border-[#a3e635]/40 transition-colors cursor-pointer w-full">
                    <Upload className="w-3.5 h-3.5 text-[#a3e635]" />
                    <span>{uploading ? 'Uploading...' : 'Upload Resume PDF'}</span>
                    <input
                      type="file"
                      accept=".pdf,application/pdf"
                      className="hidden"
                      onChange={(e) => handleFileUpload(e.target.files[0], 'resumeUrl')}
                    />
                  </label>

                  <div>
                    <label className="block text-[11px] font-mono text-zinc-500 mb-1">Resume File URL</label>
                    <input
                      type="text"
                      value={profile.resumeUrl || ''}
                      onChange={(e) => handleProfileChange('resumeUrl', e.target.value)}
                      placeholder="https://... or /uploads/resume.pdf"
                      className="w-full px-3 py-2 rounded-lg bg-[#0e1118] border border-white/10 text-xs text-white focus:outline-none focus:border-[#a3e635]"
                    />
                  </div>
                  {profile.resumeUrl && (
                    <a
                      href={profile.resumeUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-mono text-[#a3e635] hover:underline"
                    >
                      <ExternalLink className="w-3 h-3" />
                      Test Download / View Current PDF
                    </a>
                  )}
                </div>
              </div>

              {/* Center & Right Column: Details & Narrative */}
              <div className="lg:col-span-2 space-y-6">
                <div className="p-6 rounded-2xl glass-panel border border-white/10 space-y-4">
                  <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-bold">
                    Primary Identity & Status
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-zinc-400 mb-1">Full Name</label>
                      <input
                        type="text"
                        value={profile.name || ''}
                        onChange={(e) => handleProfileChange('name', e.target.value)}
                        required
                        className="w-full px-3 py-2 rounded-lg bg-[#0e1118] border border-white/10 text-xs text-white focus:outline-none focus:border-[#a3e635]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-zinc-400 mb-1">Headline Title</label>
                      <input
                        type="text"
                        value={profile.title || ''}
                        onChange={(e) => handleProfileChange('title', e.target.value)}
                        required
                        className="w-full px-3 py-2 rounded-lg bg-[#0e1118] border border-white/10 text-xs text-white focus:outline-none focus:border-[#a3e635]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-zinc-400 mb-1">Public Email</label>
                      <input
                        type="email"
                        value={profile.email || ''}
                        onChange={(e) => handleProfileChange('email', e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-[#0e1118] border border-white/10 text-xs text-white focus:outline-none focus:border-[#a3e635]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-zinc-400 mb-1">Location</label>
                      <input
                        type="text"
                        value={profile.location || ''}
                        onChange={(e) => handleProfileChange('location', e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-[#0e1118] border border-white/10 text-xs text-white focus:outline-none focus:border-[#a3e635]"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-mono text-zinc-400 mb-1">Availability Status</label>
                      <input
                        type="text"
                        value={profile.status || ''}
                        onChange={(e) => handleProfileChange('status', e.target.value)}
                        placeholder="Available for full-time roles & projects"
                        className="w-full px-3 py-2 rounded-lg bg-[#0e1118] border border-white/10 text-xs text-white focus:outline-none focus:border-[#a3e635]"
                      />
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-2xl glass-panel border border-white/10 space-y-4">
                  <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-bold">
                    Narrative & Story
                  </h3>

                  <div>
                    <label className="block text-xs font-mono text-zinc-400 mb-1">Short Hero Bio</label>
                    <textarea
                      rows={2}
                      value={profile.bio || ''}
                      onChange={(e) => handleProfileChange('bio', e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-[#0e1118] border border-white/10 text-xs text-white focus:outline-none focus:border-[#a3e635]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-zinc-400 mb-1">Detailed About Me</label>
                    <textarea
                      rows={3}
                      value={profile.about || ''}
                      onChange={(e) => handleProfileChange('about', e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-[#0e1118] border border-white/10 text-xs text-white focus:outline-none focus:border-[#a3e635]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-zinc-400 mb-1">Learning Journey</label>
                      <textarea
                        rows={3}
                        value={profile.learningJourney || ''}
                        onChange={(e) => handleProfileChange('learningJourney', e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-[#0e1118] border border-white/10 text-xs text-white focus:outline-none focus:border-[#a3e635]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-zinc-400 mb-1">Career Goals</label>
                      <textarea
                        rows={3}
                        value={profile.careerGoals || ''}
                        onChange={(e) => handleProfileChange('careerGoals', e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-[#0e1118] border border-white/10 text-xs text-white focus:outline-none focus:border-[#a3e635]"
                      />
                    </div>
                  </div>
                </div>

                {/* Social Links */}
                <div className="p-6 rounded-2xl glass-panel border border-white/10 space-y-4">
                  <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-bold">
                    Social & Professional Links
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-zinc-400 mb-1">GitHub Profile</label>
                      <input
                        type="url"
                        value={profile.github || ''}
                        onChange={(e) => handleProfileChange('github', e.target.value)}
                        placeholder="https://github.com/..."
                        className="w-full px-3 py-2 rounded-lg bg-[#0e1118] border border-white/10 text-xs text-white focus:outline-none focus:border-[#a3e635]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-zinc-400 mb-1">LinkedIn Profile</label>
                      <input
                        type="url"
                        value={profile.linkedin || ''}
                        onChange={(e) => handleProfileChange('linkedin', e.target.value)}
                        placeholder="https://linkedin.com/in/..."
                        className="w-full px-3 py-2 rounded-lg bg-[#0e1118] border border-white/10 text-xs text-white focus:outline-none focus:border-[#a3e635]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-zinc-400 mb-1">Twitter / X Profile</label>
                      <input
                        type="url"
                        value={profile.twitter || ''}
                        onChange={(e) => handleProfileChange('twitter', e.target.value)}
                        placeholder="https://x.com/..."
                        className="w-full px-3 py-2 rounded-lg bg-[#0e1118] border border-white/10 text-xs text-white focus:outline-none focus:border-[#a3e635]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        )}

        {/* -------------------- TAB 2: PROJECTS -------------------- */}
        {activeTab === 'projects' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold font-heading text-white">Projects Showcase ({projects.length})</h2>
                <p className="text-xs font-mono text-zinc-400">
                  Publish, modify, or feature real-world full-stack applications.
                </p>
              </div>
              <button
                onClick={() => setEditingProject({
                  title: '',
                  description: '',
                  category: 'Full-Stack',
                  technologies: 'React, Node.js, Express, MongoDB',
                  imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
                  liveUrl: '',
                  githubUrl: '',
                  featured: true
                })}
                className="px-4 py-2 rounded-xl bg-[#a3e635] text-[#08090b] font-bold text-xs font-mono flex items-center gap-1.5 shadow-lg shadow-[#a3e635]/20 hover:bg-[#bef264] transition-colors cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Project</span>
              </button>
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((proj) => (
                <div
                  key={proj._id || proj.title}
                  className="rounded-2xl glass-panel border border-white/10 overflow-hidden flex flex-col group hover:border-[#a3e635]/40 transition-all"
                >
                  <div className="relative h-44 bg-[#141824] overflow-hidden">
                    <img
                      src={proj.imageUrl || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80'}
                      alt={proj.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-[#08090b]/80 backdrop-blur-md border border-white/10 text-[#a3e635]">
                        {proj.category}
                      </span>
                      {proj.featured && (
                        <span className="p-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300">
                          <Star className="w-3 h-3 fill-amber-300" />
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <h3 className="font-heading font-bold text-base text-white">{proj.title}</h3>
                      <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">{proj.description}</p>
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {(Array.isArray(proj.technologies) ? proj.technologies : []).map(t => (
                          <span key={t} className="px-2 py-0.5 rounded-md bg-[#10131b] border border-white/5 text-[10px] font-mono text-zinc-300">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                      <div className="flex items-center gap-3 text-xs font-mono">
                        {proj.liveUrl && (
                          <a href={proj.liveUrl} target="_blank" rel="noreferrer" className="text-[#a3e635] hover:underline flex items-center gap-1">
                            <ExternalLink className="w-3 h-3" /> Live
                          </a>
                        )}
                        {proj.githubUrl && (
                          <a href={proj.githubUrl} target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-white flex items-center gap-1">
                            GitHub
                          </a>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setEditingProject({
                            ...proj,
                            technologies: Array.isArray(proj.technologies) ? proj.technologies.join(', ') : proj.technologies
                          })}
                          className="p-1.5 rounded-lg bg-[#141822] text-zinc-300 hover:text-[#a3e635] border border-white/10 transition-colors cursor-pointer"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteProject(proj._id)}
                          className="p-1.5 rounded-lg bg-rose-500/10 text-rose-300 hover:bg-rose-500/20 border border-rose-500/20 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Modal: Add / Edit Project */}
            {editingProject && (
              <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
                <div className="w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl glass-panel-glow border border-white/20 p-6 sm:p-8 space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="font-heading font-bold text-lg text-white">
                      {editingProject._id ? 'Edit Project' : 'Create New Project'}
                    </h3>
                    <button
                      onClick={() => setEditingProject(null)}
                      className="p-1.5 rounded-lg text-zinc-400 hover:text-white cursor-pointer"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <form onSubmit={handleSaveProject} className="space-y-4 text-left">
                    <div>
                      <label className="block text-xs font-mono text-zinc-400 mb-1">Project Title</label>
                      <input
                        type="text"
                        value={editingProject.title || ''}
                        onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                        required
                        className="w-full px-3 py-2 rounded-xl bg-[#0e1118] border border-white/10 text-xs text-white focus:outline-none focus:border-[#a3e635]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono text-zinc-400 mb-1">Category</label>
                        <select
                          value={editingProject.category || 'Full-Stack'}
                          onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-[#0e1118] border border-white/10 text-xs text-white focus:outline-none focus:border-[#a3e635]"
                        >
                          <option value="Full-Stack">Full-Stack</option>
                          <option value="Frontend">Frontend</option>
                          <option value="Backend">Backend</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>

                      <div className="flex items-center gap-2 pt-6">
                        <input
                          type="checkbox"
                          id="featuredProj"
                          checked={!!editingProject.featured}
                          onChange={(e) => setEditingProject({ ...editingProject, featured: e.target.checked })}
                          className="w-4 h-4 accent-[#a3e635] rounded"
                        />
                        <label htmlFor="featuredProj" className="text-xs font-mono text-zinc-300 cursor-pointer">
                          Featured on Hero/Home
                        </label>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-zinc-400 mb-1">Description</label>
                      <textarea
                        rows={3}
                        value={editingProject.description || ''}
                        onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                        required
                        className="w-full px-3 py-2 rounded-xl bg-[#0e1118] border border-white/10 text-xs text-white focus:outline-none focus:border-[#a3e635]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-zinc-400 mb-1">Technologies (Comma separated)</label>
                      <input
                        type="text"
                        value={editingProject.technologies || ''}
                        onChange={(e) => setEditingProject({ ...editingProject, technologies: e.target.value })}
                        placeholder="React, Three.js, Express, Tailwind CSS"
                        className="w-full px-3 py-2 rounded-xl bg-[#0e1118] border border-white/10 text-xs text-white focus:outline-none focus:border-[#a3e635]"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono text-zinc-400 mb-1">Live Demo URL</label>
                        <input
                          type="url"
                          value={editingProject.liveUrl || ''}
                          onChange={(e) => setEditingProject({ ...editingProject, liveUrl: e.target.value })}
                          placeholder="https://..."
                          className="w-full px-3 py-2 rounded-xl bg-[#0e1118] border border-white/10 text-xs text-white focus:outline-none focus:border-[#a3e635]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono text-zinc-400 mb-1">GitHub Repo URL</label>
                        <input
                          type="url"
                          value={editingProject.githubUrl || ''}
                          onChange={(e) => setEditingProject({ ...editingProject, githubUrl: e.target.value })}
                          placeholder="https://github.com/..."
                          className="w-full px-3 py-2 rounded-xl bg-[#0e1118] border border-white/10 text-xs text-white focus:outline-none focus:border-[#a3e635]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-zinc-400 mb-1">Cover Image URL</label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={editingProject.imageUrl || ''}
                          onChange={(e) => setEditingProject({ ...editingProject, imageUrl: e.target.value })}
                          placeholder="https://images.unsplash.com/... or uploaded URL"
                          className="flex-1 px-3 py-2 rounded-xl bg-[#0e1118] border border-white/10 text-xs text-white focus:outline-none focus:border-[#a3e635]"
                        />
                        <label className="px-3 py-2 rounded-xl bg-[#141822] border border-white/10 text-xs font-mono text-zinc-300 hover:text-white cursor-pointer flex items-center gap-1.5 shrink-0">
                          <Upload className="w-3.5 h-3.5 text-[#a3e635]" />
                          <span>Upload</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={async (e) => {
                              const file = e.target.files[0];
                              if (!file) return;
                              setUploading(true);
                              try {
                                const res = await adminService.uploadFile(file);
                                if (res.url) {
                                  setEditingProject(prev => ({ ...prev, imageUrl: res.url }));
                                  showToast('Project image uploaded!');
                                }
                              } catch (err) {
                                showToast('Upload failed: ' + err.message, 'error');
                              } finally {
                                setUploading(false);
                              }
                            }}
                          />
                        </label>
                      </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                      <button
                        type="button"
                        onClick={() => setEditingProject(null)}
                        className="px-4 py-2 rounded-xl bg-[#141822] text-zinc-400 hover:text-white text-xs font-mono cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={saving}
                        className="px-5 py-2 rounded-xl bg-[#a3e635] text-[#08090b] font-bold text-xs font-mono flex items-center gap-1.5 cursor-pointer shadow-lg shadow-[#a3e635]/20"
                      >
                        {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                        <span>Save Project</span>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* -------------------- TAB 3: SKILLS -------------------- */}
        {activeTab === 'skills' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold font-heading text-white">Technical Arsenal ({skills.length} Categories)</h2>
                <p className="text-xs font-mono text-zinc-400">
                  Organize technologies into categories and configure proficiency meters.
                </p>
              </div>
              <button
                onClick={() => setEditingSkillGroup({
                  category: 'New Category',
                  skills: [{ name: 'Technology', level: 85, icon: 'Code2' }]
                })}
                className="px-4 py-2 rounded-xl bg-[#a3e635] text-[#08090b] font-bold text-xs font-mono flex items-center gap-1.5 shadow-lg shadow-[#a3e635]/20 hover:bg-[#bef264] transition-colors cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Skill Category</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {skills.map((group) => (
                <div key={group._id || group.category} className="p-6 rounded-2xl glass-panel border border-white/10 space-y-4">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <h3 className="font-heading font-bold text-white text-base">{group.category}</h3>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setEditingSkillGroup(JSON.parse(JSON.stringify(group)))}
                        className="p-1.5 rounded-lg bg-[#141822] text-zinc-300 hover:text-[#a3e635] border border-white/10 transition-colors cursor-pointer"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteSkillGroup(group._id)}
                        className="p-1.5 rounded-lg bg-rose-500/10 text-rose-300 hover:bg-rose-500/20 border border-rose-500/20 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {group.skills?.map((item, idx) => (
                      <div key={idx} className="space-y-1">
                        <div className="flex justify-between text-xs font-mono">
                          <span className="text-zinc-300">{item.name}</span>
                          <span className="text-[#a3e635]">{item.level}%</span>
                        </div>
                        <div className="w-full h-1.5 rounded-full bg-[#141822] overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-[#a3e635]/80 to-[#a3e635] rounded-full"
                            style={{ width: `${item.level}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Modal: Add / Edit Skill Group */}
            {editingSkillGroup && (
              <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
                <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-3xl glass-panel-glow border border-white/20 p-6 sm:p-8 space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="font-heading font-bold text-lg text-white">
                      {editingSkillGroup._id ? 'Edit Skill Category' : 'Create Skill Category'}
                    </h3>
                    <button
                      onClick={() => setEditingSkillGroup(null)}
                      className="p-1.5 rounded-lg text-zinc-400 hover:text-white cursor-pointer"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <form onSubmit={handleSaveSkillGroup} className="space-y-5 text-left">
                    <div>
                      <label className="block text-xs font-mono text-zinc-400 mb-1">Category Title</label>
                      <input
                        type="text"
                        value={editingSkillGroup.category || ''}
                        onChange={(e) => setEditingSkillGroup({ ...editingSkillGroup, category: e.target.value })}
                        required
                        className="w-full px-3 py-2 rounded-xl bg-[#0e1118] border border-white/10 text-xs text-white focus:outline-none focus:border-[#a3e635]"
                      />
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-mono text-zinc-300 font-bold">Skills List</label>
                        <button
                          type="button"
                          onClick={() => {
                            setEditingSkillGroup({
                              ...editingSkillGroup,
                              skills: [...(editingSkillGroup.skills || []), { name: '', level: 80, icon: 'Code2' }]
                            });
                          }}
                          className="text-[11px] font-mono text-[#a3e635] hover:underline flex items-center gap-1 cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" /> Add Technology
                        </button>
                      </div>

                      {editingSkillGroup.skills?.map((item, idx) => (
                        <div key={idx} className="p-3 rounded-xl bg-[#0e1118] border border-white/10 space-y-2">
                          <div className="flex items-center gap-2">
                            <input
                              type="text"
                              value={item.name}
                              onChange={(e) => {
                                const newSkills = [...editingSkillGroup.skills];
                                newSkills[idx].name = e.target.value;
                                setEditingSkillGroup({ ...editingSkillGroup, skills: newSkills });
                              }}
                              placeholder="e.g. React / Node.js"
                              required
                              className="flex-1 px-2.5 py-1.5 rounded-lg bg-[#141824] border border-white/10 text-xs text-white focus:outline-none focus:border-[#a3e635]"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                const newSkills = editingSkillGroup.skills.filter((_, i) => i !== idx);
                                setEditingSkillGroup({ ...editingSkillGroup, skills: newSkills });
                              }}
                              className="p-1.5 text-rose-400 hover:text-rose-300 cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-[10px] font-mono text-zinc-400 w-16">Level: {item.level}%</span>
                            <input
                              type="range"
                              min="10"
                              max="100"
                              value={item.level}
                              onChange={(e) => {
                                const newSkills = [...editingSkillGroup.skills];
                                newSkills[idx].level = Number(e.target.value);
                                setEditingSkillGroup({ ...editingSkillGroup, skills: newSkills });
                              }}
                              className="flex-1 accent-[#a3e635]"
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                      <button
                        type="button"
                        onClick={() => setEditingSkillGroup(null)}
                        className="px-4 py-2 rounded-xl bg-[#141822] text-zinc-400 hover:text-white text-xs font-mono cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={saving}
                        className="px-5 py-2 rounded-xl bg-[#a3e635] text-[#08090b] font-bold text-xs font-mono flex items-center gap-1.5 cursor-pointer shadow-lg shadow-[#a3e635]/20"
                      >
                        {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                        <span>Save Category</span>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* -------------------- TAB 4: TIMELINE -------------------- */}
        {activeTab === 'timeline' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold font-heading text-white">Experience & Education Milestones</h2>
                <p className="text-xs font-mono text-zinc-400">
                  Track educational degrees, certifications, internships, and work history.
                </p>
              </div>
              <button
                onClick={() => setEditingTimeline({
                  title: '',
                  organization: '',
                  period: '2024 — Present',
                  description: '',
                  type: 'experience',
                  badge: 'Current'
                })}
                className="px-4 py-2 rounded-xl bg-[#a3e635] text-[#08090b] font-bold text-xs font-mono flex items-center gap-1.5 shadow-lg shadow-[#a3e635]/20 hover:bg-[#bef264] transition-colors cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Milestone</span>
              </button>
            </div>

            <div className="space-y-4">
              {timeline.map((entry) => (
                <div
                  key={entry._id || entry.title}
                  className="p-5 rounded-2xl glass-panel border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase font-bold ${
                        entry.type === 'education'
                          ? 'bg-sky-500/15 border border-sky-500/30 text-sky-300'
                          : 'bg-[#a3e635]/15 border border-[#a3e635]/30 text-[#a3e635]'
                      }`}>
                        {entry.type}
                      </span>
                      <span className="text-xs font-mono text-zinc-400">{entry.period}</span>
                      {entry.badge && (
                        <span className="px-2 py-0.5 rounded bg-white/10 text-[10px] font-mono text-zinc-200">
                          {entry.badge}
                        </span>
                      )}
                    </div>
                    <h3 className="font-heading font-bold text-base text-white">{entry.title}</h3>
                    <p className="text-xs font-mono text-zinc-300">{entry.organization}</p>
                    <p className="text-xs text-zinc-400 max-w-2xl pt-1">{entry.description}</p>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <button
                      onClick={() => setEditingTimeline(entry)}
                      className="p-2 rounded-lg bg-[#141822] text-zinc-300 hover:text-[#a3e635] border border-white/10 transition-colors cursor-pointer"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteTimeline(entry._id)}
                      className="p-2 rounded-lg bg-rose-500/10 text-rose-300 hover:bg-rose-500/20 border border-rose-500/20 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Modal: Timeline */}
            {editingTimeline && (
              <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
                <div className="w-full max-w-lg rounded-3xl glass-panel-glow border border-white/20 p-6 sm:p-8 space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="font-heading font-bold text-lg text-white">
                      {editingTimeline._id ? 'Edit Milestone' : 'Add Milestone'}
                    </h3>
                    <button
                      onClick={() => setEditingTimeline(null)}
                      className="p-1.5 rounded-lg text-zinc-400 hover:text-white cursor-pointer"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <form onSubmit={handleSaveTimeline} className="space-y-4 text-left">
                    <div>
                      <label className="block text-xs font-mono text-zinc-400 mb-1">Role / Degree Title</label>
                      <input
                        type="text"
                        value={editingTimeline.title || ''}
                        onChange={(e) => setEditingTimeline({ ...editingTimeline, title: e.target.value })}
                        required
                        className="w-full px-3 py-2 rounded-xl bg-[#0e1118] border border-white/10 text-xs text-white focus:outline-none focus:border-[#a3e635]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono text-zinc-400 mb-1">Company / Institution</label>
                        <input
                          type="text"
                          value={editingTimeline.organization || ''}
                          onChange={(e) => setEditingTimeline({ ...editingTimeline, organization: e.target.value })}
                          required
                          className="w-full px-3 py-2 rounded-xl bg-[#0e1118] border border-white/10 text-xs text-white focus:outline-none focus:border-[#a3e635]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono text-zinc-400 mb-1">Time Period</label>
                        <input
                          type="text"
                          value={editingTimeline.period || ''}
                          onChange={(e) => setEditingTimeline({ ...editingTimeline, period: e.target.value })}
                          placeholder="2023 — Present"
                          required
                          className="w-full px-3 py-2 rounded-xl bg-[#0e1118] border border-white/10 text-xs text-white focus:outline-none focus:border-[#a3e635]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono text-zinc-400 mb-1">Category Type</label>
                        <select
                          value={editingTimeline.type || 'experience'}
                          onChange={(e) => setEditingTimeline({ ...editingTimeline, type: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-[#0e1118] border border-white/10 text-xs text-white focus:outline-none focus:border-[#a3e635]"
                        >
                          <option value="experience">Experience / Work</option>
                          <option value="education">Education / Degree</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-mono text-zinc-400 mb-1">Highlight Badge (Optional)</label>
                        <input
                          type="text"
                          value={editingTimeline.badge || ''}
                          onChange={(e) => setEditingTimeline({ ...editingTimeline, badge: e.target.value })}
                          placeholder="Current / Top 5%"
                          className="w-full px-3 py-2 rounded-xl bg-[#0e1118] border border-white/10 text-xs text-white focus:outline-none focus:border-[#a3e635]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-zinc-400 mb-1">Description</label>
                      <textarea
                        rows={3}
                        value={editingTimeline.description || ''}
                        onChange={(e) => setEditingTimeline({ ...editingTimeline, description: e.target.value })}
                        required
                        className="w-full px-3 py-2 rounded-xl bg-[#0e1118] border border-white/10 text-xs text-white focus:outline-none focus:border-[#a3e635]"
                      />
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                      <button
                        type="button"
                        onClick={() => setEditingTimeline(null)}
                        className="px-4 py-2 rounded-xl bg-[#141822] text-zinc-400 hover:text-white text-xs font-mono cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={saving}
                        className="px-5 py-2 rounded-xl bg-[#a3e635] text-[#08090b] font-bold text-xs font-mono flex items-center gap-1.5 cursor-pointer shadow-lg shadow-[#a3e635]/20"
                      >
                        {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                        <span>Save Milestone</span>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* -------------------- TAB 5: CERTIFICATES -------------------- */}
        {activeTab === 'certificates' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold font-heading text-white">Certifications & Achievements</h2>
                <p className="text-xs font-mono text-zinc-400">
                  Highlight recognized credentials, professional certifications, and awards.
                </p>
              </div>
              <button
                onClick={() => setEditingCert({
                  title: '',
                  issuer: '',
                  issueDate: '2025',
                  verificationUrl: '',
                  highlight: 'Verified Credential'
                })}
                className="px-4 py-2 rounded-xl bg-[#a3e635] text-[#08090b] font-bold text-xs font-mono flex items-center gap-1.5 shadow-lg shadow-[#a3e635]/20 hover:bg-[#bef264] transition-colors cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Certificate</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {certificates.map((cert) => (
                <div key={cert._id || cert.title} className="p-6 rounded-2xl glass-panel border border-white/10 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono text-[#a3e635] px-2 py-0.5 rounded-full bg-[#a3e635]/15 border border-[#a3e635]/30">
                        {cert.highlight || 'Certified'}
                      </span>
                      <span className="text-xs font-mono text-zinc-400">{cert.issueDate}</span>
                    </div>
                    <h3 className="font-heading font-bold text-base text-white">{cert.title}</h3>
                    <p className="text-xs font-mono text-zinc-400">Issuer: {cert.issuer}</p>
                  </div>

                  <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                    {cert.verificationUrl ? (
                      <a href={cert.verificationUrl} target="_blank" rel="noreferrer" className="text-xs font-mono text-[#a3e635] hover:underline flex items-center gap-1">
                        <ExternalLink className="w-3 h-3" /> Verify
                      </a>
                    ) : (
                      <span className="text-[11px] font-mono text-zinc-500">No URL</span>
                    )}

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setEditingCert(cert)}
                        className="p-1.5 rounded-lg bg-[#141822] text-zinc-300 hover:text-[#a3e635] border border-white/10 transition-colors cursor-pointer"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteCert(cert._id)}
                        className="p-1.5 rounded-lg bg-rose-500/10 text-rose-300 hover:bg-rose-500/20 border border-rose-500/20 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Modal: Certificate */}
            {editingCert && (
              <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
                <div className="w-full max-w-lg rounded-3xl glass-panel-glow border border-white/20 p-6 sm:p-8 space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="font-heading font-bold text-lg text-white">
                      {editingCert._id ? 'Edit Certificate' : 'Add Certificate'}
                    </h3>
                    <button
                      onClick={() => setEditingCert(null)}
                      className="p-1.5 rounded-lg text-zinc-400 hover:text-white cursor-pointer"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <form onSubmit={handleSaveCert} className="space-y-4 text-left">
                    <div>
                      <label className="block text-xs font-mono text-zinc-400 mb-1">Certificate Title</label>
                      <input
                        type="text"
                        value={editingCert.title || ''}
                        onChange={(e) => setEditingCert({ ...editingCert, title: e.target.value })}
                        required
                        className="w-full px-3 py-2 rounded-xl bg-[#0e1118] border border-white/10 text-xs text-white focus:outline-none focus:border-[#a3e635]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono text-zinc-400 mb-1">Issuer Organization</label>
                        <input
                          type="text"
                          value={editingCert.issuer || ''}
                          onChange={(e) => setEditingCert({ ...editingCert, issuer: e.target.value })}
                          required
                          className="w-full px-3 py-2 rounded-xl bg-[#0e1118] border border-white/10 text-xs text-white focus:outline-none focus:border-[#a3e635]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono text-zinc-400 mb-1">Issue Date / Year</label>
                        <input
                          type="text"
                          value={editingCert.issueDate || ''}
                          onChange={(e) => setEditingCert({ ...editingCert, issueDate: e.target.value })}
                          placeholder="2025"
                          required
                          className="w-full px-3 py-2 rounded-xl bg-[#0e1118] border border-white/10 text-xs text-white focus:outline-none focus:border-[#a3e635]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-zinc-400 mb-1">Verification Credential URL</label>
                      <input
                        type="url"
                        value={editingCert.verificationUrl || ''}
                        onChange={(e) => setEditingCert({ ...editingCert, verificationUrl: e.target.value })}
                        placeholder="https://..."
                        className="w-full px-3 py-2 rounded-xl bg-[#0e1118] border border-white/10 text-xs text-white focus:outline-none focus:border-[#a3e635]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-zinc-400 mb-1">Highlight Badge</label>
                      <input
                        type="text"
                        value={editingCert.highlight || ''}
                        onChange={(e) => setEditingCert({ ...editingCert, highlight: e.target.value })}
                        placeholder="Honor Roll / High Distinction"
                        className="w-full px-3 py-2 rounded-xl bg-[#0e1118] border border-white/10 text-xs text-white focus:outline-none focus:border-[#a3e635]"
                      />
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                      <button
                        type="button"
                        onClick={() => setEditingCert(null)}
                        className="px-4 py-2 rounded-xl bg-[#141822] text-zinc-400 hover:text-white text-xs font-mono cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={saving}
                        className="px-5 py-2 rounded-xl bg-[#a3e635] text-[#08090b] font-bold text-xs font-mono flex items-center gap-1.5 cursor-pointer shadow-lg shadow-[#a3e635]/20"
                      >
                        {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                        <span>Save Certificate</span>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* -------------------- TAB 6: CONTACT INQUIRIES -------------------- */}
        {activeTab === 'messages' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold font-heading text-white">Contact Messages & Leads ({messages.length})</h2>
                <p className="text-xs font-mono text-zinc-400">
                  Submissions received from the public website contact form.
                </p>
              </div>
            </div>

            {messages.length === 0 ? (
              <div className="p-12 rounded-3xl glass-panel border border-white/10 text-center space-y-3">
                <Mail className="w-10 h-10 text-zinc-600 mx-auto" />
                <h3 className="font-heading font-bold text-white text-base">Inbox is completely clear</h3>
                <p className="text-xs font-mono text-zinc-400 max-w-sm mx-auto">
                  When visitors or recruiters submit the contact form on your portfolio, their messages will arrive here instantly.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg._id}
                    className={`p-6 rounded-2xl glass-panel border transition-all ${
                      msg.read ? 'border-white/10 opacity-75' : 'border-[#a3e635]/40 bg-[#0d131a]'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3 mb-3">
                      <div className="flex items-center gap-3">
                        <span className="font-heading font-bold text-white text-base">{msg.name}</span>
                        <a
                          href={`mailto:${msg.email}`}
                          className="text-xs font-mono text-[#a3e635] hover:underline"
                        >
                          {msg.email}
                        </a>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-[11px] font-mono text-zinc-400">
                          {new Date(msg.createdAt).toLocaleString()}
                        </span>
                        {!msg.read && (
                          <span className="px-2 py-0.5 rounded-full bg-[#a3e635]/20 text-[#a3e635] text-[10px] font-mono font-bold">
                            NEW
                          </span>
                        )}
                      </div>
                    </div>

                    <p className="text-sm text-zinc-200 leading-relaxed whitespace-pre-wrap py-2">
                      {msg.message}
                    </p>

                    <div className="pt-3 border-t border-white/5 flex items-center justify-end gap-3">
                      {!msg.read && (
                        <button
                          onClick={() => handleMarkMessageRead(msg._id)}
                          className="px-3 py-1.5 rounded-xl bg-[#141822] text-[#a3e635] border border-[#a3e635]/30 hover:bg-[#a3e635]/20 text-xs font-mono flex items-center gap-1.5 cursor-pointer"
                        >
                          <Check className="w-3.5 h-3.5" />
                          Mark as Read
                        </button>
                      )}
                      <button
                        onClick={() => handleDeleteMessage(msg._id)}
                        className="px-3 py-1.5 rounded-xl bg-rose-500/10 text-rose-300 border border-rose-500/20 hover:bg-rose-500/20 text-xs font-mono flex items-center gap-1.5 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
