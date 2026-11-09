import React, { useEffect, useState } from 'react';
import { 
  Building2, 
  Users, 
  ScanLine, 
  CreditCard, 
  MessageSquare, 
  Printer, 
  Clock, 
  ChevronDown, 
  UserPlus, 
  LogOut,
  ShieldCheck
} from 'lucide-react';
import { BranchId } from '../../types';
import { UserSession } from '../../types/auth';

export type ActiveTab = 'executive' | 'reception' | 'teacher' | 'scanner' | 'idcards' | 'notifications';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  selectedBranch: BranchId | 'all';
  setSelectedBranch: (branch: BranchId | 'all') => void;
  onOpenDeskReport: () => void;
  currentUser: UserSession;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  selectedBranch,
  setSelectedBranch,
  onOpenDeskReport,
  currentUser,
  onLogout,
}) => {
  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        })
      );
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="bg-[#0b1120] border-b border-slate-800/80 text-slate-100 no-print sticky top-0 z-50 shadow-sm">
      {/* Top Corporate Strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex flex-wrap items-center justify-between border-b border-slate-800/60 gap-4">
        {/* Brand & System Code */}
        <div className="flex items-center space-x-3.5">
          <div className="h-9 w-9 bg-linear-to-b from-blue-600 to-blue-800 text-white rounded-lg flex items-center justify-center font-bold tracking-wider text-sm border border-blue-400/30 shadow-xs">
            UE
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-semibold tracking-tight text-white">
                Universal Education Network
              </span>
              <span className="px-1.5 py-0.5 text-[10px] font-mono tracking-wider font-semibold bg-blue-950/80 text-blue-300 border border-blue-800/80 rounded">
                ENTERPRISE ERP 4.2
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Academic Operations, Smart Attendance & Campus Administration Suite
            </p>
          </div>
        </div>

        {/* Global Controls & User Pill */}
        <div className="flex items-center space-x-3">
          {/* Live Telemetry Ping */}
          <div className="hidden lg:flex items-center space-x-2 bg-slate-900/90 px-3 py-1.5 rounded-md border border-slate-800 text-[11px] font-mono text-slate-300">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-emerald-400 font-medium">Turnstiles Live</span>
            <span className="text-slate-600">•</span>
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span className="tabular-nums text-slate-200">{currentTime || '08:30:00 AM'}</span>
          </div>

          {/* Quick Desk Report Trigger */}
          <button
            onClick={onOpenDeskReport}
            className="flex items-center space-x-1.5 bg-slate-800 hover:bg-slate-700/90 text-slate-200 px-3 py-1.5 rounded-md border border-slate-700 text-xs font-medium transition cursor-pointer shadow-2xs"
            title="Generate Principal Morning Desk Report"
          >
            <Printer className="w-3.5 h-3.5 text-slate-400" />
            <span>Desk Report</span>
          </button>

          {/* User Session Pill with Switch Role */}
          <div className="flex items-center bg-slate-900/90 pl-2 pr-1.5 py-1 rounded-md border border-slate-800 space-x-2.5">
            <img
              src={currentUser.avatarUrl}
              alt={currentUser.name}
              className="w-6 h-6 rounded-full object-cover border border-slate-600"
            />
            <div className="text-left hidden sm:block">
              <div className="text-xs font-semibold text-slate-200 leading-tight">
                {currentUser.name}
              </div>
              <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                {currentUser.role}
              </div>
            </div>
            <button
              onClick={onLogout}
              className="p-1 hover:bg-slate-800 text-slate-400 hover:text-rose-300 rounded transition cursor-pointer"
              title="Switch Active Staff Role / Sign Out"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Primary Role Navigation Strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-wrap items-center justify-between gap-3 bg-[#0b1120]/90">
        <nav className="flex flex-wrap items-center gap-1.5">
          {/* Executive Cockpit: Principal */}
          {currentUser.role === 'principal' && (
            <button
              onClick={() => setActiveTab('executive')}
              className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-md text-xs transition cursor-pointer ${
                activeTab === 'executive'
                  ? 'bg-blue-600 text-white font-semibold shadow-xs'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/70 font-medium'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>Executive Cockpit</span>
            </button>
          )}

          {/* Admissions Reception: Receptionist & Principal */}
          {(currentUser.role === 'receptionist' || currentUser.role === 'principal') && (
            <button
              onClick={() => setActiveTab('reception')}
              className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-md text-xs transition cursor-pointer ${
                activeTab === 'reception'
                  ? 'bg-blue-600 text-white font-semibold shadow-xs'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/70 font-medium'
              }`}
            >
              <UserPlus className="w-4 h-4 text-emerald-400" />
              <span>Admissions Reception</span>
            </button>
          )}

          {/* Teacher Roll Call: Teacher & Principal */}
          {(currentUser.role === 'teacher' || currentUser.role === 'principal') && (
            <button
              onClick={() => setActiveTab('teacher')}
              className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-md text-xs transition cursor-pointer ${
                activeTab === 'teacher'
                  ? 'bg-blue-600 text-white font-semibold shadow-xs'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/70 font-medium'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Teacher Roll-Call</span>
            </button>
          )}

          {/* Gate Scanner: Security & Principal */}
          {(currentUser.role === 'security' || currentUser.role === 'principal') && (
            <button
              onClick={() => setActiveTab('scanner')}
              className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-md text-xs transition cursor-pointer ${
                activeTab === 'scanner'
                  ? 'bg-blue-600 text-white font-semibold shadow-xs'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/70 font-medium'
              }`}
            >
              <ScanLine className="w-4 h-4 text-rose-400" />
              <span>Gate Turnstile Scanner</span>
            </button>
          )}

          {/* Smart ID Cards: Receptionist & Principal */}
          {(currentUser.role === 'receptionist' || currentUser.role === 'principal') && (
            <button
              onClick={() => setActiveTab('idcards')}
              className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-md text-xs transition cursor-pointer ${
                activeTab === 'idcards'
                  ? 'bg-blue-600 text-white font-semibold shadow-xs'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/70 font-medium'
              }`}
            >
              <CreditCard className="w-4 h-4" />
              <span>Smart PVC ID Studio</span>
            </button>
          )}

          {/* WhatsApp Logs: Principal & Receptionist */}
          {(currentUser.role === 'principal' || currentUser.role === 'receptionist') && (
            <button
              onClick={() => setActiveTab('notifications')}
              className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-md text-xs transition cursor-pointer ${
                activeTab === 'notifications'
                  ? 'bg-blue-600 text-white font-semibold shadow-xs'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/70 font-medium'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>Parent WhatsApp Dispatch</span>
            </button>
          )}
        </nav>

        {/* Global Campus Selector Dropdown */}
        <div className="flex items-center space-x-2 text-xs">
          <span className="text-slate-400 font-medium text-[11px]">Campus:</span>
          <div className="relative">
            <select
              value={selectedBranch}
              onChange={(e) => setSelectedBranch(e.target.value as BranchId | 'all')}
              className="appearance-none bg-slate-900 text-slate-200 text-xs rounded-md border border-slate-700/80 pl-2.5 pr-7 py-1.5 focus:outline-none focus:border-blue-500 font-medium cursor-pointer shadow-2xs"
            >
              <option value="all">All Campuses (Consolidated)</option>
              <option value="campus-main">Main Executive Campus (Johar Town)</option>
              <option value="campus-gulberg">Gulberg Model Campus</option>
              <option value="campus-north">North Heights Campus</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2 top-2.5 pointer-events-none" />
          </div>
        </div>
      </div>
    </header>
  );
};
