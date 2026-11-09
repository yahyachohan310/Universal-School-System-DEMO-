import React, { useEffect, useState } from 'react';
import { Clock, Printer, Key, ShieldCheck, ChevronRight } from 'lucide-react';
import { ActiveTab } from './Sidebar';
import { UserSession } from '../../types/auth';
import { whatsappService, WhatsAppServerStatus } from '../../services/whatsappService';

interface TopBarProps {
  activeTab: ActiveTab;
  currentUser: UserSession;
  onOpenDeskReport: () => void;
  onOpenWhatsAppGateway: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ 
  activeTab, 
  currentUser, 
  onOpenDeskReport,
  onOpenWhatsAppGateway
}) => {
  const [currentTime, setCurrentTime] = useState<string>('');
  const [waStatus, setWaStatus] = useState<WhatsAppServerStatus['status']>('disconnected');

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

  // Poll WhatsApp status every 8s
  useEffect(() => {
    let mounted = true;
    const poll = async () => {
      const result = await whatsappService.getStatus();
      if (mounted) setWaStatus(result.status);
    };
    poll();
    const id = setInterval(poll, 8000);
    return () => { mounted = false; clearInterval(id); };
  }, []);

  const getBreadcrumbTitle = () => {
    switch (activeTab) {
      case 'executive': return 'Executive Cockpit & School Morning Briefing';
      case 'reception': return 'Front Desk: Admissions, Counter Fees & ID Cards';
      case 'teacher': return 'Teacher Classroom Attendance Register & Mobile App';
      case 'academics': return 'Academic Examinations & Term Progress Transcripts';
      case 'scanner': return 'Gate Turnstile Ingress Scanner & Hardware Terminal';
      case 'idcards': return 'Smart PVC Plastic ID Card Production Studio';
      case 'finance': return 'School Fee Collection, Invoicing & Recovery Radar';
      case 'notifications': return 'Automated Parent WhatsApp & SMS Dispatch Audit';
    }
  };

  const getRoleBadgeColor = () => {
    switch (currentUser.role) {
      case 'principal': return 'bg-blue-50/80 text-blue-800 border-blue-200/80';
      case 'receptionist': return 'bg-emerald-50/80 text-emerald-800 border-emerald-200/80';
      case 'teacher': return 'bg-amber-50/80 text-amber-800 border-amber-200/80';
      case 'security': return 'bg-rose-50/80 text-rose-800 border-rose-200/80';
    }
  };

  return (
    <header className="bg-white/90 backdrop-blur-md border-b border-slate-200/80 h-16 px-6 flex items-center justify-between no-print sticky top-0 z-40 shadow-xs">
      {/* Breadcrumb Title & Active Persona Role */}
      <div className="flex items-center space-x-4">
        <div>
          <div className="flex items-center space-x-1.5 text-[11px] font-mono text-slate-400">
            <span className="font-semibold text-slate-500">Universal School</span>
            <ChevronRight className="w-3 h-3 text-slate-300" />
            <span className="text-blue-700 font-semibold uppercase">{activeTab}</span>
          </div>
          <h1 className="text-sm font-extrabold text-slate-900 tracking-tight mt-0.5">
            {getBreadcrumbTitle()}
          </h1>
        </div>

        {/* Clear Persona Badge */}
        <div className={`hidden md:flex items-center space-x-1.5 px-2.5 py-1 rounded-lg border text-xs font-mono font-semibold shadow-2xs ${getRoleBadgeColor()}`}>
          <Key className="w-3 h-3" />
          <span>Role: {currentUser.designation.split('(')[0].trim()}</span>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center space-x-3">
        {/* WhatsApp Gateway Modal Trigger with glowing state */}
        <button
          onClick={onOpenWhatsAppGateway}
          className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg border text-xs font-mono font-semibold transition cursor-pointer shadow-2xs ${
            waStatus === 'connected'
              ? 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border-emerald-300 shadow-emerald-500/10'
              : waStatus === 'qr_ready'
              ? 'bg-amber-50 hover:bg-amber-100 text-amber-800 border-amber-300 shadow-amber-500/10'
              : waStatus === 'simulated'
              ? 'bg-blue-50 hover:bg-blue-100 text-blue-800 border-blue-300 shadow-blue-500/10'
              : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-300'
          }`}
          title="Open WhatsApp Server Connection & QR Code"
        >
          <span className={`w-2 h-2 rounded-full ${
            waStatus === 'connected' ? 'bg-emerald-500 animate-pulse ring-4 ring-emerald-500/20' :
            waStatus === 'qr_ready' ? 'bg-amber-500 animate-pulse ring-4 ring-amber-500/20' :
            waStatus === 'simulated' ? 'bg-blue-500' : 'bg-slate-400'
          }`}></span>
          <span>WhatsApp {waStatus === 'connected' ? 'Connected' : waStatus === 'qr_ready' ? 'Scan QR' : waStatus === 'simulated' ? 'Simulated' : 'Offline'}</span>
        </button>

        <div className="hidden sm:flex items-center space-x-2 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-mono text-slate-600 shadow-2xs">
          <Clock className="w-3.5 h-3.5 text-slate-400" />
          <span className="tabular-nums text-slate-800 font-bold">{currentTime || '08:30:00 AM'}</span>
        </div>

        {currentUser.role === 'principal' && (
          <button
            onClick={onOpenDeskReport}
            className="flex items-center space-x-1.5 bg-blue-600 hover:bg-blue-500 text-white px-3.5 py-1.5 rounded-lg text-xs font-bold tracking-wide transition cursor-pointer shadow-xs shadow-blue-500/20"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Daily Desk Report</span>
          </button>
        )}
      </div>
    </header>
  );
};
