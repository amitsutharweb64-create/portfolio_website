import React, { useState, useEffect } from 'react';
import { Shield, Lock, Mail, ArrowLeft, Loader2, AlertCircle, KeyRound, CheckCircle2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../services/api';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // If already logged in, redirect directly to dashboard
    if (authService.isAuthenticated()) {
      navigate('/admin');
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please provide both email and password.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await authService.login(email, password);
      setSuccess(true);
      setTimeout(() => {
        navigate('/admin');
      }, 500);
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleFillDemoCredentials = () => {
    setEmail('admin@example.com');
    setPassword('ChangeThisPassword123!');
    setError('');
  };

  return (
    <div className="min-h-screen bg-[#08090b] flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#a3e635]/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Return to website link */}
      <div className="w-full max-w-md mb-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-[#a3e635] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Return to Public Website
        </Link>
      </div>

      <div className="w-full max-w-md p-8 sm:p-10 rounded-3xl glass-panel-glow border border-white/10 shadow-2xl relative text-left">
        <div className="text-center space-y-2 mb-8">
          <div className="w-12 h-12 rounded-2xl bg-[#11141c] border border-[#a3e635]/40 flex items-center justify-center text-[#a3e635] mx-auto shadow-md shadow-[#a3e635]/20">
            <Shield className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold font-heading text-white">Admin Portal</h1>
          <p className="text-xs font-mono text-zinc-400">
            Authenticate to manage portfolio content & inquiries
          </p>
        </div>

        {error && (
          <div className="p-3 mb-6 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs font-mono flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="p-3 mb-6 rounded-xl bg-[#a3e635]/10 border border-[#a3e635]/30 text-[#a3e635] text-xs font-mono flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>Authentication successful! Entering console...</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-zinc-300 mb-2">
              Admin Email
            </label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#10131b] border border-white/10 focus:border-[#a3e635] text-white text-sm focus:outline-none transition-colors"
                required
              />
              <Mail className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-zinc-300 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#10131b] border border-white/10 focus:border-[#a3e635] text-white text-sm focus:outline-none transition-colors"
                required
              />
              <Lock className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || success}
            className="w-full py-3.5 rounded-xl bg-[#a3e635] hover:bg-[#bef264] disabled:opacity-50 text-[#08090b] font-bold text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-[#a3e635]/20 hover:scale-[1.01] active:scale-[0.99] cursor-pointer mt-4"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Authenticating...</span>
              </>
            ) : (
              <span>Unlock Admin Console</span>
            )}
          </button>
        </form>

        {/* Demo Credentials Quick Fill Button */}
        <div className="mt-6 pt-6 border-t border-white/10 text-center">
          <button
            type="button"
            onClick={handleFillDemoCredentials}
            className="text-[11px] font-mono text-zinc-400 hover:text-[#a3e635] transition-colors inline-flex items-center gap-1.5 cursor-pointer"
          >
            <KeyRound className="w-3.5 h-3.5" />
            Fill Default Seed Credentials (admin@example.com)
          </button>
        </div>
      </div>
    </div>
  );
}
