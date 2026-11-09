import React, { useState } from 'react';
import {
  Users,
  UserCheck,
  UserX,
  Clock,
  AlertTriangle,
  Send,
  CheckCircle2,
  Printer,
  ArrowUpRight,
  Building2,
  Zap,
} from 'lucide-react';
import { Branch, BranchId, Student, Teacher, IngressLog } from '../../types';

interface ExecutiveDashboardProps {
  branches: Branch[];
  students: Student[];
  teachers: Teacher[];
  ingressLogs: IngressLog[];
  selectedBranch: BranchId | 'all';
  onTriggerAbsenteeAlerts: () => void;
  onOpenDeskReport: () => void;
}

export const ExecutiveDashboard: React.FC<ExecutiveDashboardProps> = ({
  branches,
  ingressLogs,
  selectedBranch,
  onTriggerAbsenteeAlerts,
  onOpenDeskReport,
}) => {
  const [alertSent, setAlertSent] = useState(false);
  const [filterType, setFilterType] = useState<'all' | 'students' | 'faculty'>('all');

  const filteredBranches = selectedBranch === 'all'
    ? branches
    : branches.filter(b => b.id === selectedBranch);

  const totalStudents        = filteredBranches.reduce((a, b) => a + b.totalStudents, 0);
  const presentStudents      = filteredBranches.reduce((a, b) => a + b.presentStudents, 0);
  const studentRate          = ((presentStudents / totalStudents) * 100).toFixed(1);
  const totalFaculty         = filteredBranches.reduce((a, b) => a + b.totalFaculty, 0);
  const presentFaculty       = filteredBranches.reduce((a, b) => a + b.presentFaculty, 0);
  const facultyRate          = ((presentFaculty / totalFaculty) * 100).toFixed(1);
  const totalLate            = filteredBranches.reduce((a, b) => a + b.lateArrivals, 0);
  const totalUnexcused       = filteredBranches.reduce((a, b) => a + b.unexcusedAbsences, 0);

  const handleBroadcast = () => {
    onTriggerAbsenteeAlerts();
    setAlertSent(true);
    setTimeout(() => setAlertSent(false), 4000);
  };

  const displayedLogs = ingressLogs.filter(log => {
    if (filterType === 'students') return log.personType === 'student';
    if (filterType === 'faculty')  return log.personType === 'teacher';
    return true;
  });

  const now = new Date();
  const dateStr = now.toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <div className="space-y-5">

      {/* ── Page Header ── */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-black text-slate-900 tracking-tight">Executive Morning Briefing</h1>
          <p className="text-sm text-slate-500 mt-0.5 font-mono">{dateStr} • Session 2025–26</p>
        </div>
        <div className="flex items-center gap-2.5">
          <button
            onClick={onOpenDeskReport}
            className="flex items-center space-x-2 px-3.5 py-2 rounded-lg border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 text-xs font-semibold transition cursor-pointer shadow-xs"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Desk Report</span>
          </button>
          <button
            onClick={handleBroadcast}
            disabled={alertSent}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-xs font-bold tracking-wide transition cursor-pointer shadow-xs ${
              alertSent
                ? 'bg-emerald-600 text-white'
                : 'bg-slate-900 hover:bg-slate-800 text-white'
            }`}
          >
            {alertSent ? (
              <><CheckCircle2 className="w-3.5 h-3.5" /><span>Alerts Dispatched</span></>
            ) : (
              <><Send className="w-3.5 h-3.5" /><span>Broadcast Absences to WhatsApp</span></>
            )}
          </button>
        </div>
      </div>

      {/* ── KPI Strip ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1 */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Student Presence</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
              <Users className="w-4 h-4 text-blue-600" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black tabular-nums text-slate-900">{studentRate}%</span>
          </div>
          <div className="text-xs text-slate-500 mt-1 font-mono">{presentStudents.toLocaleString()} / {totalStudents.toLocaleString()} present</div>
          <div className="mt-3 h-1.5 rounded-full bg-slate-100 overflow-hidden">
            <div className="h-1.5 rounded-full bg-blue-500 transition-all duration-700" style={{ width: `${studentRate}%` }} />
          </div>
        </div>

        {/* KPI 2 */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Faculty On Duty</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center">
              <UserCheck className="w-4 h-4 text-emerald-600" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black tabular-nums text-slate-900">{facultyRate}%</span>
          </div>
          <div className="text-xs text-slate-500 mt-1 font-mono">{presentFaculty} / {totalFaculty} staff</div>
          <div className="mt-3 h-1.5 rounded-full bg-slate-100 overflow-hidden">
            <div className="h-1.5 rounded-full bg-emerald-500 transition-all duration-700" style={{ width: `${facultyRate}%` }} />
          </div>
        </div>

        {/* KPI 3 */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Unexcused Absent</span>
            <div className="w-8 h-8 rounded-lg bg-rose-50 flex items-center justify-center">
              <UserX className="w-4 h-4 text-rose-600" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black tabular-nums text-rose-600">{totalUnexcused}</span>
            <span className="text-xs text-slate-500 font-mono">students</span>
          </div>
          <div className="text-xs text-slate-500 mt-1">Requires guardian notification</div>
          <div className="mt-3 h-1.5 rounded-full bg-slate-100 overflow-hidden">
            <div className="h-1.5 rounded-full bg-rose-400" style={{ width: `${Math.min((totalUnexcused / totalStudents) * 100 * 5, 100)}%` }} />
          </div>
        </div>

        {/* KPI 4 */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Late Arrivals</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center">
              <Clock className="w-4 h-4 text-amber-600" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black tabular-nums text-amber-600">{totalLate}</span>
            <span className="text-xs text-slate-500 font-mono">past 08:00</span>
          </div>
          <div className="text-xs text-slate-500 mt-1">Missed morning assembly</div>
          <div className="mt-3 h-1.5 rounded-full bg-slate-100 overflow-hidden">
            <div className="h-1.5 rounded-full bg-amber-400" style={{ width: `${Math.min((totalLate / totalStudents) * 100 * 4, 100)}%` }} />
          </div>
        </div>
      </div>

      {/* ── Main 2-Col Grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* Left: Campus Table + Alerts */}
        <div className="lg:col-span-2 space-y-5">

          {/* Campus Matrix */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="px-5 py-3.5 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Building2 className="w-4 h-4 text-slate-500" />
                <h2 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Campus Operational Matrix</h2>
              </div>
              <span className="text-[11px] font-mono text-slate-400">{branches.length} campuses live</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-500 uppercase text-[10px] tracking-widest font-semibold">
                    <th className="py-3 px-5 font-semibold">Campus</th>
                    <th className="py-3 px-4 font-semibold">Branch Head</th>
                    <th className="py-3 px-4 text-right font-semibold">Students</th>
                    <th className="py-3 px-4 text-right font-semibold">Staff</th>
                    <th className="py-3 px-4 text-right font-semibold">Late</th>
                    <th className="py-3 px-4 text-center font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {branches.map((branch) => {
                    const sPct = ((branch.presentStudents / branch.totalStudents) * 100).toFixed(0);
                    const fPct = ((branch.presentFaculty / branch.totalFaculty) * 100).toFixed(0);
                    const isGood = parseInt(sPct) >= 90;
                    return (
                      <tr key={branch.id} className="hover:bg-slate-50/60 transition">
                        <td className="py-3.5 px-5">
                          <div className="font-semibold text-slate-900">{branch.name}</div>
                          <div className="text-[11px] text-slate-400 font-mono mt-0.5">{branch.code} · {branch.city}</div>
                        </td>
                        <td className="py-3.5 px-4 text-slate-600">{branch.principal}</td>
                        <td className="py-3.5 px-4 text-right">
                          <div className="font-bold text-slate-900 font-mono">{sPct}%</div>
                          <div className="text-[10px] text-slate-400 font-mono">{branch.presentStudents}/{branch.totalStudents}</div>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <div className="font-bold text-slate-900 font-mono">{fPct}%</div>
                          <div className="text-[10px] text-slate-400 font-mono">{branch.presentFaculty}/{branch.totalFaculty}</div>
                        </td>
                        <td className="py-3.5 px-4 text-right font-mono font-bold text-amber-600">{branch.lateArrivals}</td>
                        <td className="py-3.5 px-4 text-center">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold ${
                            isGood
                              ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200'
                              : 'bg-amber-50 text-amber-700 ring-1 ring-amber-200'
                          }`}>
                            <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${isGood ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
                            {isGood ? 'Normal' : 'Review'}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Operational Alerts */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="px-5 py-3.5 border-b border-slate-100 flex items-center space-x-2">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Morning Action Items</h3>
            </div>
            <div className="divide-y divide-slate-50">
              <div className="p-4 flex items-start justify-between gap-4 hover:bg-slate-50/50 transition">
                <div className="flex items-start space-x-3">
                  <div className="w-7 h-7 rounded-lg bg-rose-50 flex items-center justify-center shrink-0 mt-0.5">
                    <Zap className="w-3.5 h-3.5 text-rose-500" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-slate-900">Biology Lecture Unattended — North Heights</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">Ms. Naila Siddiqui (FAC-BIO-007) is absent. Period 2 (09:00 AM) requires substitute.</div>
                  </div>
                </div>
                <button className="shrink-0 px-3 py-1.5 text-[11px] font-bold bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition cursor-pointer">
                  Assign Sub
                </button>
              </div>
              <div className="p-4 flex items-start justify-between gap-4 hover:bg-slate-50/50 transition">
                <div className="flex items-start space-x-3">
                  <div className="w-7 h-7 rounded-lg bg-amber-50 flex items-center justify-center shrink-0 mt-0.5">
                    <Clock className="w-3.5 h-3.5 text-amber-500" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-slate-900">Late Faculty — Main Campus</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">Sir Waqas Hashmi (FAC-ENG-019) scanned at 08:08 AM — 8 min late. Memo auto-logged in HR.</div>
                  </div>
                </div>
                <span className="shrink-0 px-2.5 py-1 text-[10px] font-mono font-bold bg-amber-50 text-amber-700 rounded-lg border border-amber-200">HR Logged</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Live Gate Feed */}
        <div className="space-y-5">
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden h-full">
            <div className="px-5 py-3.5 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
                </span>
                <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Live Gate Feed</h3>
              </div>
              <div className="flex items-center space-x-1 bg-slate-100 p-0.5 rounded-lg">
                {(['all', 'students', 'faculty'] as const).map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilterType(f)}
                    className={`px-2.5 py-1 rounded-md text-[10px] font-semibold transition cursor-pointer capitalize ${
                      filterType === f ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-700'
                    }`}
                  >
                    {f === 'faculty' ? 'Staff' : f === 'all' ? 'All' : 'Students'}
                  </button>
                ))}
              </div>
            </div>

            <div className="divide-y divide-slate-50 max-h-[480px] overflow-y-auto">
              {displayedLogs.map((log) => (
                <div key={log.id} className="px-5 py-3 hover:bg-slate-50/60 transition">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-900 truncate max-w-[160px]">{log.personName}</span>
                    <span className="text-[11px] tabular-nums font-mono text-slate-500">{log.timestamp}</span>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-[11px] text-slate-400">{log.gradeOrDept}</span>
                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                      log.status === 'present'
                        ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200'
                        : 'bg-amber-50 text-amber-700 ring-1 ring-amber-200'
                    }`}>
                      {log.status.toUpperCase()}
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-300 font-mono mt-0.5">{log.method} · {log.gate.split('(')[0].trim()}</div>
                </div>
              ))}
            </div>

            <div className="px-5 py-3 border-t border-slate-100 text-[11px] text-slate-400 font-mono flex items-center justify-between">
              <span>{displayedLogs.length} entries</span>
              <span className="flex items-center space-x-1 text-emerald-600">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                <span>WebSocket Live</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
