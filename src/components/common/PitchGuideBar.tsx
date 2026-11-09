import React from 'react';
import { ScanLine, Smartphone, Printer, Building2, HelpCircle } from 'lucide-react';
import { ActiveTab } from './Header';

interface PitchGuideBarProps {
  activeTab: ActiveTab;
  onSelectStep: (tab: ActiveTab) => void;
  onOpenReport: () => void;
  onToggleScript: () => void;
  showScript: boolean;
}

export const PitchGuideBar: React.FC<PitchGuideBarProps> = ({
  activeTab,
  onSelectStep,
  onOpenReport,
  onToggleScript,
  showScript,
}) => {
  const steps = [
    {
      id: 'scanner' as ActiveTab,
      stepNumber: '1',
      title: 'Gate Smart ID Scan',
      tagline: 'Student Gate Entry -> Parent WhatsApp Alert',
      icon: ScanLine,
    },
    {
      id: 'teacher' as ActiveTab,
      stepNumber: '2',
      title: 'Teacher Mobile App',
      tagline: '30-Second Roll Call on Smartphone',
      icon: Smartphone,
    },
    {
      id: 'report' as any,
      stepNumber: '3',
      title: 'Daily Desk Report',
      tagline: '1-Page Morning Briefing for Principal',
      icon: Printer,
      action: onOpenReport,
    },
    {
      id: 'executive' as ActiveTab,
      stepNumber: '4',
      title: 'Multi-Branch Cockpit',
      tagline: 'High-Level View of All Campuses',
      icon: Building2,
    },
  ];

  return (
    <div className="bg-slate-900 border-b border-slate-800 text-white px-4 py-3 shadow-md no-print">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Left Label */}
        <div className="flex items-center space-x-2.5">
          <span className="bg-blue-600 text-white text-[11px] font-bold font-mono px-2 py-0.5 rounded uppercase tracking-wider">
            Pitch Flow
          </span>
          <span className="text-xs text-slate-300 font-medium hidden sm:inline">
            Click in sequence during your Tuesday meeting:
          </span>
        </div>

        {/* 4 Clean Step Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 w-full md:w-auto">
          {steps.map((s) => {
            const Icon = s.icon;
            const isActive = activeTab === s.id;
            return (
              <button
                key={s.title}
                onClick={() => {
                  if (s.action) {
                    s.action();
                  } else {
                    onSelectStep(s.id);
                  }
                }}
                className={`flex items-center space-x-2 px-3 py-2 rounded text-left transition cursor-pointer border ${
                  isActive
                    ? 'bg-blue-600 border-blue-400 text-white shadow-xs'
                    : 'bg-slate-800 hover:bg-slate-700/80 border-slate-700 text-slate-300'
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold font-mono shrink-0 ${
                    isActive ? 'bg-white text-blue-900' : 'bg-slate-700 text-slate-300'
                  }`}
                >
                  {s.stepNumber}
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-semibold leading-tight truncate">
                    {s.title}
                  </div>
                  <div className="text-[10px] text-slate-400 truncate hidden lg:block">
                    {s.tagline}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Cheat-Sheet Helper Toggle */}
        <button
          onClick={onToggleScript}
          className={`flex items-center space-x-1.5 px-3 py-1.5 rounded text-xs font-medium border transition cursor-pointer shrink-0 ${
            showScript
              ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold'
              : 'bg-slate-800 hover:bg-slate-700 text-amber-300 border-slate-700'
          }`}
        >
          <HelpCircle className="w-3.5 h-3.5" />
          <span>{showScript ? 'Hide Pitch Script' : 'Pitch Cheat Sheet'}</span>
        </button>
      </div>
    </div>
  );
};

