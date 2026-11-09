import React from 'react';
import { 
  Building2, 
  Users, 
  ScanLine, 
  CreditCard, 
  MessageSquare, 
  Printer, 
  UserPlus, 
  LogOut,
  GraduationCap,
  DollarSign,
  ChevronDown,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { BranchId } from '../../types';
import { UserSession } from '../../types/auth';

export type ActiveTab = 
  | 'executive' 
  | 'reception' 
  | 'teacher' 
  | 'scanner' 
  | 'idcards' 
  | 'finance'
  | 'academics'
  | 'notifications';

interface SidebarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  selectedBranch: BranchId | 'all';
  setSelectedBranch: (branch: BranchId | 'all') => void;
  onOpenDeskReport: () => void;
  currentUser: UserSession;
  onLogout: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  selectedBranch,
  setSelectedBranch,
  onOpenDeskReport,
  currentUser,
  onLogout,
}) => {
  return (
    <aside className="w-64 bg-[#090d16] border-r border-slate-800/80 text-slate-300 flex flex-col shrink-0 min-h-screen select-none no-print">
      {/* Brand Header */}
      <div className="p-4 border-b border-slate-800/70 flex items-center space-x-3">
        <div className="h-10 w-10 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white rounded-xl flex items-center justify-center font-black tracking-wider text-sm border border-blue-400/25 shadow-lg shadow-blue-900/30">
          UGS
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-sm font-extrabold text-white tracking-tight truncate flex items-center gap-1.5">
            <span>Universal School</span>
          </div>
          <div className="text-[10px] font-mono text-blue-400 font-semibold tracking-wider uppercase flex items-center gap-1 mt-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
            <span>{currentUser.designation.split('(')[0].trim()}</span>
          </div>
        </div>
      </div>

      {/* Role Clearance Pill */}
      <div className="px-3.5 py-3 border-b border-slate-800/60 bg-slate-900/40">
        <div className="flex items-center justify-between text-[10px] font-mono uppercase text-slate-400 mb-1">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-emerald-400" />
            <span>Station Clearance:</span>
          </span>
          <span className="text-emerald-400 font-bold bg-emerald-950/60 px-1.5 py-0.2 rounded border border-emerald-800/50">ACTIVE</span>
        </div>
        <div className="font-bold text-slate-100 text-xs truncate">
          {currentUser.name}
        </div>
        <div className="text-[10px] text-slate-400 font-mono mt-0.5 truncate">
          {currentUser.department}
        </div>
      </div>

      {/* Campus Selector (Only for Principal / Owner) */}
      {currentUser.role === 'principal' ? (
        <div className="p-3 border-b border-slate-800/60 bg-slate-900/30">
          <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-1">
            Supervised Campuses:
          </label>
          <div className="relative">
            <select
              value={selectedBranch}
              onChange={(e) => setSelectedBranch(e.target.value as BranchId | 'all')}
              className="w-full appearance-none bg-slate-900/90 text-slate-200 text-xs rounded-lg border border-slate-750/90 pl-2.5 pr-7 py-2 focus:outline-none focus:border-blue-500 font-medium cursor-pointer shadow-inner"
            >
              <option value="all">All Campuses (Consolidated)</option>
              <option value="campus-main">Main Executive Campus</option>
              <option value="campus-gulberg">Gulberg Model Campus</option>
              <option value="campus-north">North Heights Campus</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-2.5 pointer-events-none" />
          </div>
        </div>
      ) : (
        <div className="px-3.5 py-2.5 border-b border-slate-800/60 bg-slate-900/20 text-xs font-mono text-slate-400">
          <span className="text-[10px] uppercase block text-slate-500 font-medium">Station Location:</span>
          <span className="text-slate-200 font-semibold">{currentUser.branchName}</span>
        </div>
      )}

      {/* Navigation Modules (Strictly Role-Specific) */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-5 text-xs">
        {/* =========================================
            ROLE 1: PRINCIPAL / OWNER (NO SCANNER!)
            ========================================= */}
        {currentUser.role === 'principal' && (
          <>
            <div className="space-y-1">
              <div className="px-2.5 text-[10px] font-bold uppercase tracking-widest text-slate-400 font-mono mb-1.5">
                Executive Desk
              </div>
              <button
                onClick={() => setActiveTab('executive')}
                className={`w-full flex items-center space-x-2.5 px-3 py-2 rounded-xl font-medium transition cursor-pointer ${
                  activeTab === 'executive'
                    ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-900/40 border border-blue-400/30'
                    : 'text-slate-400 hover:text-white hover:bg-slate-850/60'
                }`}
              >
                <div className={`p-1 rounded-md ${activeTab === 'executive' ? 'text-white' : 'text-blue-400 bg-blue-950/40 border border-blue-800/40'}`}>
                  <Building2 className="w-3.5 h-3.5" />
                </div>
                <span className="truncate">Morning Executive Cockpit</span>
              </button>

              <button
                onClick={onOpenDeskReport}
                className="w-full flex items-center space-x-2.5 px-3 py-2 rounded-xl font-medium text-slate-400 hover:text-white hover:bg-slate-850/60 transition cursor-pointer"
              >
                <div className="p-1 rounded-md text-amber-400 bg-amber-950/40 border border-amber-800/40">
                  <Printer className="w-3.5 h-3.5" />
                </div>
                <span className="truncate">Daily Desk Report (A4)</span>
              </button>
            </div>

            <div className="space-y-1">
              <div className="px-2.5 text-[10px] font-bold uppercase tracking-widest text-slate-400 font-mono mb-1.5">
                Financials &amp; Comms
              </div>
              <button
                onClick={() => setActiveTab('finance')}
                className={`w-full flex items-center space-x-2.5 px-3 py-2 rounded-xl font-medium transition cursor-pointer ${
                  activeTab === 'finance'
                    ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-900/40 border border-blue-400/30'
                    : 'text-slate-400 hover:text-white hover:bg-slate-850/60'
                }`}
              >
                <div className={`p-1 rounded-md ${activeTab === 'finance' ? 'text-white' : 'text-emerald-400 bg-emerald-950/40 border border-emerald-800/40'}`}>
                  <DollarSign className="w-3.5 h-3.5" />
                </div>
                <span className="truncate">Fee Recovery Radar</span>
              </button>

              <button
                onClick={() => setActiveTab('notifications')}
                className={`w-full flex items-center space-x-2.5 px-3 py-2 rounded-xl font-medium transition cursor-pointer ${
                  activeTab === 'notifications'
                    ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-900/40 border border-blue-400/30'
                    : 'text-slate-400 hover:text-white hover:bg-slate-850/60'
                }`}
              >
                <div className={`p-1 rounded-md ${activeTab === 'notifications' ? 'text-white' : 'text-teal-400 bg-teal-950/40 border border-teal-800/40'}`}>
                  <MessageSquare className="w-3.5 h-3.5" />
                </div>
                <span className="truncate">Parent WhatsApp Logs</span>
              </button>
            </div>
          </>
        )}

        {/* =========================================
            ROLE 2: RECEPTIONIST / CLERK
            ========================================= */}
        {currentUser.role === 'receptionist' && (
          <div className="space-y-1">
            <div className="px-2.5 text-[10px] font-bold uppercase tracking-widest text-slate-400 font-mono mb-1.5">
              Front Desk Station
            </div>

            <button
              onClick={() => setActiveTab('reception')}
              className={`w-full flex items-center space-x-2.5 px-3 py-2 rounded-xl font-medium transition cursor-pointer ${
                activeTab === 'reception'
                  ? 'bg-emerald-600 text-white font-bold shadow-md shadow-emerald-900/40 border border-emerald-400/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-850/60'
              }`}
            >
              <div className={`p-1 rounded-md ${activeTab === 'reception' ? 'text-white' : 'text-emerald-400 bg-emerald-950/40 border border-emerald-800/40'}`}>
                <UserPlus className="w-3.5 h-3.5" />
              </div>
              <span className="truncate">Admissions &amp; Counter Fees</span>
            </button>

            <button
              onClick={() => setActiveTab('idcards')}
              className={`w-full flex items-center space-x-2.5 px-3 py-2 rounded-xl font-medium transition cursor-pointer ${
                activeTab === 'idcards'
                  ? 'bg-emerald-600 text-white font-bold shadow-md shadow-emerald-900/40 border border-emerald-400/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-850/60'
              }`}
            >
              <div className={`p-1 rounded-md ${activeTab === 'idcards' ? 'text-white' : 'text-cyan-400 bg-cyan-950/40 border border-cyan-800/40'}`}>
                <CreditCard className="w-3.5 h-3.5" />
              </div>
              <span className="truncate">Smart PVC ID Card Studio</span>
            </button>
          </div>
        )}

        {/* =========================================
            ROLE 3: CLASSROOM TEACHER
            ========================================= */}
        {currentUser.role === 'teacher' && (
          <div className="space-y-1">
            <div className="px-2.5 text-[10px] font-bold uppercase tracking-widest text-slate-400 font-mono mb-1.5">
              Classroom Academic Desk
            </div>

            <button
              onClick={() => setActiveTab('teacher')}
              className={`w-full flex items-center space-x-2.5 px-3 py-2 rounded-xl font-medium transition cursor-pointer ${
                activeTab === 'teacher'
                  ? 'bg-amber-600 text-white font-bold shadow-md shadow-amber-900/40 border border-amber-400/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-850/60'
              }`}
            >
              <div className={`p-1 rounded-md ${activeTab === 'teacher' ? 'text-white' : 'text-amber-400 bg-amber-950/40 border border-amber-800/40'}`}>
                <Users className="w-3.5 h-3.5" />
              </div>
              <span className="truncate">Class Roll-Call (Mobile/PC)</span>
            </button>

            <button
              onClick={() => setActiveTab('academics')}
              className={`w-full flex items-center space-x-2.5 px-3 py-2 rounded-xl font-medium transition cursor-pointer ${
                activeTab === 'academics'
                  ? 'bg-amber-600 text-white font-bold shadow-md shadow-amber-900/40 border border-amber-400/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-850/60'
              }`}
            >
              <div className={`p-1 rounded-md ${activeTab === 'academics' ? 'text-white' : 'text-purple-400 bg-purple-950/40 border border-purple-800/40'}`}>
                <GraduationCap className="w-3.5 h-3.5" />
              </div>
              <span className="truncate">Exam Marks &amp; Progress</span>
            </button>
          </div>
        )}

        {/* =========================================
            ROLE 4: GATE GUARD (SCANNER ONLY!)
            ========================================= */}
        {currentUser.role === 'security' && (
          <div className="space-y-1">
            <div className="px-2.5 text-[10px] font-bold uppercase tracking-widest text-slate-400 font-mono mb-1.5">
              School Main Gate Post
            </div>

            <button
              onClick={() => setActiveTab('scanner')}
              className={`w-full flex items-center space-x-2.5 px-3 py-2 rounded-xl font-medium transition cursor-pointer ${
                activeTab === 'scanner'
                  ? 'bg-rose-600 text-white font-bold shadow-md shadow-rose-900/40 border border-rose-400/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-850/60'
              }`}
            >
              <div className={`p-1 rounded-md ${activeTab === 'scanner' ? 'text-white' : 'text-rose-400 bg-rose-950/40 border border-rose-800/40'}`}>
                <ScanLine className="w-3.5 h-3.5" />
              </div>
              <span className="truncate">Gate Card Scanner Kiosk</span>
            </button>
          </div>
        )}

        {/* Role Security Clearance Card */}
        <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 text-[11px] text-slate-400 space-y-1.5 font-sans">
          <div className="flex items-center space-x-1.5 text-slate-300 font-semibold font-mono text-[10px] uppercase">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
            <span>Strict Role Boundary</span>
          </div>
          <p className="text-[10px] leading-relaxed text-slate-400">
            {currentUser.name} is isolated to {currentUser.department}. Non-assigned modules are securely locked.
          </p>
        </div>
      </div>

      {/* User Session Footer Card */}
      <div className="p-3 border-t border-slate-800/80 bg-[#070a12]">
        <div className="flex items-center justify-between p-2 rounded-xl bg-slate-900/70 border border-slate-800/80">
          <div className="flex items-center space-x-2.5 min-w-0">
            <img
              src={currentUser.avatarUrl}
              alt={currentUser.name}
              className="w-8 h-8 rounded-full object-cover border border-slate-700 shrink-0"
            />
            <div className="min-w-0">
              <div className="text-xs font-bold text-white truncate">
                {currentUser.name}
              </div>
              <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                {currentUser.role}
              </div>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="p-1.5 hover:bg-slate-800 text-slate-400 hover:text-rose-400 rounded-lg transition cursor-pointer shrink-0"
            title="Switch User Role / Sign Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};
