import React, { useState } from 'react';
import {
  ArrowRight,
  Eye, EyeOff,
  Lock,
  User as UserIcon,
  AlertCircle,
  CheckCircle2,
  BookOpen,
  UserPlus,
  Users,
  ShieldCheck,
  Building2,
  ScanLine,
  MessageCircle,
  CreditCard,
  BarChart3,
  Smartphone,
} from 'lucide-react';
import { UserRole, UserSession, PRESET_USERS } from '../../types/auth';

interface LoginPageProps {
  onLogin: (session: UserSession) => void;
}

const ROLE_CREDS: Record<UserRole, { username: string; password: string }> = {
  principal:    { username: 'tariq.mehmood',   password: 'owner@2026'     },
  receptionist: { username: 'sana.fatima',     password: 'frontdesk@2026' },
  teacher:      { username: 'khurram.teacher', password: 'class9a@2026'   },
  security:     { username: 'bashir.guard',    password: 'gate@2026'      },
};

type RoleCard = {
  role: UserRole;
  label: string;
  person: string;
  color: string;
  borderActive: string;
  bgActive: string;
  textAccent: string;
  iconBg: string;
  icon: React.ReactNode;
  features: { icon: React.ReactNode; text: string }[];
};

const ROLES: RoleCard[] = [
  {
    role: 'principal',
    label: 'Principal / Owner',
    person: 'Sir Tariq Mehmood',
    color: 'text-blue-400',
    borderActive: 'border-blue-500/70',
    bgActive: 'bg-blue-500/10',
    textAccent: 'text-blue-400',
    iconBg: 'bg-blue-500/10',
    icon: <Building2 className="w-4 h-4" />,
    features: [
      { icon: <BarChart3 className="w-3.5 h-3.5" />, text: 'Morning Attendance Cockpit' },
      { icon: <BookOpen className="w-3.5 h-3.5" />, text: 'Fee Recovery & Radar' },
      { icon: <MessageCircle className="w-3.5 h-3.5" />, text: 'Absentee WhatsApp Broadcast' },
    ],
  },
  {
    role: 'receptionist',
    label: 'Admin / Front Desk',
    person: 'Ms. Sana Fatima',
    color: 'text-emerald-400',
    borderActive: 'border-emerald-500/70',
    bgActive: 'bg-emerald-500/10',
    textAccent: 'text-emerald-400',
    iconBg: 'bg-emerald-500/10',
    icon: <UserPlus className="w-4 h-4" />,
    features: [
      { icon: <UserPlus className="w-3.5 h-3.5" />, text: 'Student Admission Form' },
      { icon: <BookOpen className="w-3.5 h-3.5" />, text: 'Counter Fee Cash Collection' },
      { icon: <CreditCard className="w-3.5 h-3.5" />, text: 'PVC Smart ID Card Printing' },
    ],
  },
  {
    role: 'teacher',
    label: 'Classroom Teacher',
    person: 'Sir Khurram Shehzad',
    color: 'text-amber-400',
    borderActive: 'border-amber-500/70',
    bgActive: 'bg-amber-500/10',
    textAccent: 'text-amber-400',
    iconBg: 'bg-amber-500/10',
    icon: <Users className="w-4 h-4" />,
    features: [
      { icon: <Smartphone className="w-3.5 h-3.5" />, text: '30-Second Mobile Roll-Call' },
      { icon: <BookOpen className="w-3.5 h-3.5" />, text: 'Exam Marks & Grade Entry' },
      { icon: <CheckCircle2 className="w-3.5 h-3.5" />, text: 'Saves 15 min of paperwork' },
    ],
  },
  {
    role: 'security',
    label: 'Gate Guard / Scanner',
    person: 'Chacha Bashir Ahmad',
    color: 'text-rose-400',
    borderActive: 'border-rose-500/70',
    bgActive: 'bg-rose-500/10',
    textAccent: 'text-rose-400',
    iconBg: 'bg-rose-500/10',
    icon: <ScanLine className="w-4 h-4" />,
    features: [
      { icon: <ScanLine className="w-3.5 h-3.5" />, text: 'Card Scan + Audio Beep' },
      { icon: <MessageCircle className="w-3.5 h-3.5" />, text: 'Auto WhatsApp to Parent' },
      { icon: <ShieldCheck className="w-3.5 h-3.5" />, text: 'Photo ID Verification' },
    ],
  },
];

const LEFT_FEATURES = [
  { icon: <ScanLine className="w-4 h-4" />, title: 'Smart Gate Scanner', desc: 'RFID/barcode card tap triggers instant parent WhatsApp' },
  { icon: <Smartphone className="w-4 h-4" />, title: '30-Second Roll-Call', desc: 'Teachers mark attendance from their phone in class' },
  { icon: <CreditCard className="w-4 h-4" />, title: 'PVC ID Card Studio', desc: 'Print CR-80 plastic cards with QR & barcode on-site' },
  { icon: <BarChart3 className="w-4 h-4" />, title: 'Fee Recovery Radar', desc: 'Live defaulter list with one-click WhatsApp reminder' },
];

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [selectedRole, setSelectedRole] = useState<UserRole>('principal');
  const [username, setUsername]         = useState(ROLE_CREDS['principal'].username);
  const [password, setPassword]         = useState('');
  const [showPw, setShowPw]             = useState(false);
  const [error, setError]               = useState('');
  const [loading, setLoading]           = useState(false);

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    setUsername(ROLE_CREDS[role].username);
    setPassword('');
    setError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const creds = ROLE_CREDS[selectedRole];
    if (!username.trim() || !password) {
      setError('Enter both username and password.');
      return;
    }
    if (username.trim() !== creds.username || password !== creds.password) {
      setError('Wrong credentials — use the fill hints below each field.');
      return;
    }
    setLoading(true);
    setTimeout(() => { setLoading(false); onLogin(PRESET_USERS[selectedRole]); }, 700);
  };

  const active = ROLES.find(r => r.role === selectedRole)!;
  const user   = PRESET_USERS[selectedRole];

  return (
    <div className="min-h-screen flex font-sans" style={{ background: '#080c18' }}>

      {/* ═══════════════════════════════════════
          LEFT PANEL — Brand & Feature Showcase
          ═══════════════════════════════════════ */}
      <div
        className="hidden lg:flex flex-col justify-between w-[420px] shrink-0 p-10 border-r border-white/[0.06]"
        style={{ background: 'linear-gradient(160deg, #0d1526 0%, #080c18 100%)' }}
      >
        {/* Logo + School Name */}
        <div>
          <div className="flex items-center space-x-3 mb-10">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm text-white shrink-0"
              style={{ background: 'linear-gradient(135deg, #2563eb, #1d4ed8)' }}
            >
              UGS
            </div>
            <div>
              <div className="text-white font-bold text-sm leading-tight">Universal Grammar School</div>
              <div className="text-slate-500 text-[11px] font-mono mt-0.5">Management System v2.0</div>
            </div>
          </div>

          <h2 className="text-2xl font-black text-white leading-tight tracking-tight mb-2">
            Run your school<br />
            <span className="text-blue-400">like it's 2026.</span>
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed mb-10">
            Digital attendance, fee management, smart ID cards, and WhatsApp alerts — built for small private schools.
          </p>

          {/* Feature List */}
          <div className="space-y-5">
            {LEFT_FEATURES.map(({ icon, title, desc }) => (
              <div key={title} className="flex items-start space-x-3.5">
                <div className="w-8 h-8 rounded-lg bg-blue-600/10 border border-blue-500/20 text-blue-400 flex items-center justify-center shrink-0 mt-0.5">
                  {icon}
                </div>
                <div>
                  <div className="text-white text-xs font-semibold">{title}</div>
                  <div className="text-slate-500 text-[11px] mt-0.5 leading-relaxed">{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom quote */}
        <div className="border-t border-white/[0.06] pt-6">
          <p className="text-slate-500 text-[11px] leading-relaxed italic">
            "Designed for 200–800 student schools. No IT department needed. Set up in one afternoon."
          </p>
          <div className="flex items-center space-x-2 mt-3">
            <div className="flex -space-x-2">
              {[user.avatarUrl, PRESET_USERS.receptionist.avatarUrl, PRESET_USERS.teacher.avatarUrl].map((url, i) => (
                <img key={i} src={url} className="w-6 h-6 rounded-full border-2 border-[#080c18] object-cover" alt="" />
              ))}
            </div>
            <span className="text-slate-500 text-[11px]">4 staff roles, fully isolated</span>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════
          RIGHT PANEL — Login Form
          ═══════════════════════════════════════ */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-[460px] space-y-6">

          {/* Mobile header (shown only on small screens) */}
          <div className="lg:hidden text-center mb-6">
            <div className="mx-auto w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm text-white mb-3"
              style={{ background: 'linear-gradient(135deg, #2563eb, #1d4ed8)' }}>
              UGS
            </div>
            <h1 className="text-white font-black text-xl">Universal Grammar School</h1>
            <p className="text-slate-500 text-xs mt-1 font-mono">Staff Portal Login</p>
          </div>

          {/* Heading */}
          <div>
            <h2 className="text-white font-black text-2xl tracking-tight">Sign in</h2>
            <p className="text-slate-500 text-sm mt-1">Select your role, then enter credentials.</p>
          </div>

          {/* ── Role selector ── */}
          <div className="grid grid-cols-2 gap-2.5">
            {ROLES.map((r) => {
              const isActive = selectedRole === r.role;
              return (
                <button
                  key={r.role}
                  type="button"
                  onClick={() => handleRoleSelect(r.role)}
                  className={`text-left p-3.5 rounded-xl border transition cursor-pointer group ${
                    isActive
                      ? `${r.bgActive} ${r.borderActive}`
                      : 'bg-white/[0.03] border-white/[0.08] hover:bg-white/[0.06] hover:border-white/[0.14]'
                  }`}
                >
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center mb-2.5 ${
                    isActive ? r.iconBg + ' border border-white/10' : 'bg-white/[0.06]'
                  }`}>
                    <span className={isActive ? r.color : 'text-slate-500'}>{r.icon}</span>
                  </div>
                  <div className={`text-xs font-bold leading-snug ${isActive ? 'text-white' : 'text-slate-400'}`}>
                    {r.label}
                  </div>
                  <div className={`text-[11px] mt-0.5 font-mono ${isActive ? r.textAccent : 'text-slate-600'}`}>
                    {r.person}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Role Features (animated key) */}
          <div
            key={selectedRole}
            className="rounded-xl border p-3.5 space-y-2 animate-fade-in"
            style={{ background: 'rgba(255,255,255,0.025)', borderColor: 'rgba(255,255,255,0.08)' }}
          >
            <div className="flex items-center space-x-2.5 pb-2 border-b border-white/[0.06]">
              <img src={user.avatarUrl} className="w-8 h-8 rounded-full object-cover border border-white/10" alt="" />
              <div>
                <div className="text-white text-xs font-bold">{user.name}</div>
                <div className={`text-[11px] font-mono ${active.textAccent}`}>{user.designation}</div>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-1.5 pt-1">
              {active.features.map(({ icon, text }, i) => (
                <div key={i} className="flex items-center space-x-2 text-[11px] text-slate-400">
                  <span className={active.textAccent}>{icon}</span>
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Credentials form ── */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider font-mono">
                Username
              </label>
              <div className="relative">
                <UserIcon className="w-3.5 h-3.5 text-slate-600 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => { setUsername(e.target.value); setError(''); }}
                  autoComplete="username"
                  placeholder="staff.username"
                  className="w-full rounded-xl pl-9 pr-4 py-2.5 text-sm font-mono text-white placeholder-slate-700 transition focus:outline-none focus:ring-2 focus:ring-blue-500/40"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
                />
              </div>
              <button
                type="button"
                onClick={() => setUsername(ROLE_CREDS[selectedRole].username)}
                className="text-[11px] text-blue-500 hover:text-blue-400 font-mono cursor-pointer transition"
              >
                ↗ Fill demo: {ROLE_CREDS[selectedRole].username}
              </button>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider font-mono">
                Password
              </label>
              <div className="relative">
                <Lock className="w-3.5 h-3.5 text-slate-600 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type={showPw ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(''); }}
                  autoComplete="current-password"
                  placeholder="••••••••••"
                  className="w-full rounded-xl pl-9 pr-10 py-2.5 text-sm font-mono text-white placeholder-slate-700 transition focus:outline-none focus:ring-2 focus:ring-blue-500/40"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
                />
                <button
                  type="button"
                  tabIndex={-1}
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-600 hover:text-slate-300 transition cursor-pointer"
                >
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <button
                type="button"
                onClick={() => setPassword(ROLE_CREDS[selectedRole].password)}
                className="text-[11px] text-blue-500 hover:text-blue-400 font-mono cursor-pointer transition"
              >
                ↗ Fill demo password
              </button>
            </div>

            {/* Error */}
            {error && (
              <div className="flex items-center space-x-2 text-rose-400 text-xs py-2.5 px-3.5 rounded-xl border border-rose-500/30 bg-rose-500/10">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-xl text-sm font-bold transition flex items-center justify-center space-x-2 shadow-lg ${
                loading
                  ? 'bg-blue-700/60 text-white/50 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-500 text-white cursor-pointer'
              }`}
              style={{ boxShadow: '0 0 24px rgba(37,99,235,0.35)' }}
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Signing in…</span>
                </>
              ) : (
                <>
                  <span>Sign in as {active.label}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <p className="text-center text-slate-700 text-[11px] font-mono">
            Each role is strictly isolated — staff only see their own modules.
          </p>
        </div>
      </div>
    </div>
  );
};
