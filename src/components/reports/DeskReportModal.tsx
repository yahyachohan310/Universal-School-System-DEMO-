import React from 'react';
import { Printer, X, Download, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { Branch, Student, Teacher } from '../../types';

interface DeskReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  branches: Branch[];
  students: Student[];
  teachers: Teacher[];
}

export const DeskReportModal: React.FC<DeskReportModalProps> = ({
  isOpen,
  onClose,
  branches,
  students,
  teachers,
}) => {
  if (!isOpen) return null;

  const totalStudents = branches.reduce((acc, b) => acc + b.totalStudents, 0);
  const presentStudents = branches.reduce((acc, b) => acc + b.presentStudents, 0);
  const totalFaculty = branches.reduce((acc, b) => acc + b.totalFaculty, 0);
  const presentFaculty = branches.reduce((acc, b) => acc + b.presentFaculty, 0);

  const absentStudents = students.filter((s) => s.attendanceStatus === 'absent');
  const lateStudents = students.filter((s) => s.attendanceStatus === 'late');
  const absentFaculty = teachers.filter((t) => t.attendanceStatus === 'absent');

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[92vh] flex flex-col border border-slate-300">
        {/* Modal Top Bar (Hidden in Print) */}
        <div className="px-5 py-3 border-b border-slate-200 bg-slate-900 text-white flex items-center justify-between no-print rounded-t-lg">
          <div className="flex items-center space-x-2">
            <Printer className="w-4 h-4 text-blue-400" />
            <span className="text-xs font-bold uppercase tracking-wider">
              Official Executive Morning Desk Report (A4 Format)
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => window.print()}
              className="bg-blue-600 hover:bg-blue-500 text-white text-xs px-3 py-1.5 rounded font-medium transition cursor-pointer flex items-center space-x-1.5"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print A4 Document</span>
            </button>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white p-1 rounded cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Official Document Content */}
        <div className="p-8 overflow-y-auto space-y-6 font-sans text-slate-900 printable-document">
          {/* Institutional Letterhead */}
          <div className="border-b-2 border-slate-900 pb-4 flex justify-between items-start">
            <div>
              <h1 className="text-xl font-black uppercase tracking-wider text-slate-900">
                Universal Education Network
              </h1>
              <p className="text-xs font-bold text-slate-700 tracking-wide uppercase mt-0.5">
                Central Directorate of Academic Governance & Campus Operations
              </p>
              <p className="text-[11px] text-slate-500 mt-1">
                Main Campus: 42-B Johar Town, Lahore • UAN: (042) 111-888-999 • registrar@universalschool.edu.pk
              </p>
            </div>
            <div className="text-right font-mono text-xs">
              <div className="font-bold text-slate-900 bg-slate-100 px-2.5 py-1 border border-slate-300 rounded inline-block">
                REPORT REF: DBR-2026-0419
              </div>
              <div className="text-slate-500 text-[11px] mt-1">
                Generated: {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} • 08:30 AM
              </div>
            </div>
          </div>

          <div className="text-center py-1 bg-slate-100 border border-slate-300 font-bold text-xs uppercase tracking-widest text-slate-800">
            Principal's Executive Morning Ingress & Attendance Briefing
          </div>

          {/* Consolidated Executive Numbers Table */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-2 border-l-2 border-slate-800 pl-2">
              1. Network-Wide Enrollment & Ingress Summary
            </h2>
            <table className="w-full text-xs text-left border border-slate-300">
              <thead className="bg-slate-100 border-b border-slate-300 font-bold uppercase text-[10px]">
                <tr>
                  <th className="p-2 border-r border-slate-300">Campus Name</th>
                  <th className="p-2 text-right border-r border-slate-300">Total Enrolled</th>
                  <th className="p-2 text-right border-r border-slate-300">Present (Turnstile)</th>
                  <th className="p-2 text-right border-r border-slate-300">Late Arrivals</th>
                  <th className="p-2 text-right border-r border-slate-300">Unexcused Absent</th>
                  <th className="p-2 text-right">Attendance Rate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 font-mono">
                {branches.map((b) => (
                  <tr key={b.id}>
                    <td className="p-2 font-sans font-medium text-slate-900 border-r border-slate-300">
                      {b.name}
                    </td>
                    <td className="p-2 text-right border-r border-slate-300">{b.totalStudents}</td>
                    <td className="p-2 text-right border-r border-slate-300 text-emerald-800 font-bold">{b.presentStudents}</td>
                    <td className="p-2 text-right border-r border-slate-300 text-amber-700">{b.lateArrivals}</td>
                    <td className="p-2 text-right border-r border-slate-300 text-rose-700">{b.unexcusedAbsences}</td>
                    <td className="p-2 text-right font-bold text-slate-900">
                      {((b.presentStudents / b.totalStudents) * 100).toFixed(1)}%
                    </td>
                  </tr>
                ))}
                <tr className="bg-slate-50 font-bold text-slate-900 border-t-2 border-slate-400">
                  <td className="p-2 font-sans uppercase border-r border-slate-300">Consolidated Network Total</td>
                  <td className="p-2 text-right border-r border-slate-300">{totalStudents}</td>
                  <td className="p-2 text-right border-r border-slate-300 text-emerald-800">{presentStudents}</td>
                  <td className="p-2 text-right border-r border-slate-300">61</td>
                  <td className="p-2 text-right border-r border-slate-300 text-rose-700">108</td>
                  <td className="p-2 text-right">
                    {((presentStudents / totalStudents) * 100).toFixed(1)}%
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Section 2: Flagged Absentees (Action Items for Administration) */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-2 border-l-2 border-slate-800 pl-2">
              2. Flagged Absentees Requiring Guardian Verification
            </h2>
            <table className="w-full text-xs text-left border border-slate-300">
              <thead className="bg-slate-100 border-b border-slate-300 font-bold uppercase text-[10px]">
                <tr>
                  <th className="p-2 border-r border-slate-300">Roll No</th>
                  <th className="p-2 border-r border-slate-300">Student Name</th>
                  <th className="p-2 border-r border-slate-300">Class & Section</th>
                  <th className="p-2 border-r border-slate-300">Guardian Name & Phone</th>
                  <th className="p-2 text-right">WhatsApp Dispatch</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {absentStudents.map((s) => (
                  <tr key={s.id}>
                    <td className="p-2 font-mono text-slate-700 border-r border-slate-300">{s.rollNo}</td>
                    <td className="p-2 font-medium text-slate-900 border-r border-slate-300">{s.fullName}</td>
                    <td className="p-2 text-slate-600 border-r border-slate-300">{s.grade} ({s.section})</td>
                    <td className="p-2 border-r border-slate-300">
                      <span className="font-medium text-slate-800">{s.guardianName}</span>
                      <span className="font-mono text-slate-500 ml-2">({s.guardianPhone})</span>
                    </td>
                    <td className="p-2 text-right font-mono text-[10px] text-emerald-700 font-semibold">
                      DELIVERED (08:30 AM)
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Section 3: Faculty Duty & Substitutions */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-2 border-l-2 border-slate-800 pl-2">
              3. Faculty Presence & Substitution Roster
            </h2>
            <div className="bg-slate-50 border border-slate-300 rounded p-3 text-xs space-y-1.5">
              <div className="flex justify-between">
                <span>Total Teaching Faculty Scheduled: <strong className="font-mono">{totalFaculty}</strong></span>
                <span>Faculty Present on Campus: <strong className="font-mono text-emerald-800">{presentFaculty} (97.4%)</strong></span>
              </div>
              <div className="border-t border-slate-200 pt-1.5 flex justify-between text-slate-700">
                <span>Absent Faculty: <strong className="text-rose-700">Ms. Naila Siddiqui (Biology Dept)</strong></span>
                <span>Substitute Assigned: <strong className="text-slate-900">Dr. Rehan Qureshi (Period 2)</strong></span>
              </div>
            </div>
          </div>

          {/* Official Signatures */}
          <div className="pt-8 border-t border-slate-300 grid grid-cols-3 gap-8 text-center text-xs">
            <div>
              <div className="w-32 border-b border-slate-400 mx-auto mb-1.5" />
              <div className="font-bold text-slate-900">Head of Gate Security</div>
              <div className="text-[10px] text-slate-500">Biometric Audit Log</div>
            </div>

            <div>
              <div className="w-32 border-b border-slate-400 mx-auto mb-1.5" />
              <div className="font-bold text-slate-900">Campus Registrar</div>
              <div className="text-[10px] text-slate-500">Student Affairs Division</div>
            </div>

            <div>
              <div className="w-32 border-b border-slate-900 mx-auto mb-1.5" />
              <div className="font-bold text-slate-900">Principal / Director</div>
              <div className="text-[10px] text-slate-500">Executive Approval</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

