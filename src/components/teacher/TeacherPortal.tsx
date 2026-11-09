import React, { useState } from 'react';
import { 
  Users, 
  Smartphone, 
  Monitor, 
  CheckCircle, 
  XCircle, 
  Clock, 
  HelpCircle, 
  Check, 
  Filter, 
  Save, 
  Calendar,
  AlertCircle,
  Sparkles,
  Wifi
} from 'lucide-react';
import { Student, AttendanceStatus } from '../../types';

interface TeacherPortalProps {
  students: Student[];
  onUpdateAttendance: (studentId: string, status: AttendanceStatus) => void;
  onBatchUpdate: (status: AttendanceStatus) => void;
}

export const TeacherPortal: React.FC<TeacherPortalProps> = ({
  students,
  onUpdateAttendance,
  onBatchUpdate,
}) => {
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('mobile');
  const [selectedClass, setSelectedClass] = useState('Grade 9');
  const [selectedSection, setSelectedSection] = useState('Section A (Pre-Engineering)');
  const [selectedPeriod, setSelectedPeriod] = useState('Period 1 (08:15 - 09:00 AM) • Mathematics');
  const [isSaved, setIsSaved] = useState(false);

  // Filter students for the current active class
  const classStudents = students.filter(
    (s) => s.grade === selectedClass && s.section === selectedSection
  );

  const presentCount = classStudents.filter((s) => s.attendanceStatus === 'present').length;
  const absentCount = classStudents.filter((s) => s.attendanceStatus === 'absent').length;
  const lateCount = classStudents.filter((s) => s.attendanceStatus === 'late').length;

  const handleSaveAndSync = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const getStatusBadge = (status: AttendanceStatus) => {
    switch (status) {
      case 'present':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <Check className="w-3 h-3 mr-1" />
            PRESENT
          </span>
        );
      case 'absent':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-rose-50 text-rose-700 border border-rose-200">
            <XCircle className="w-3 h-3 mr-1" />
            ABSENT
          </span>
        );
      case 'late':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-50 text-amber-700 border border-amber-200">
            <Clock className="w-3 h-3 mr-1" />
            LATE
          </span>
        );
      case 'excused':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-slate-100 text-slate-700 border border-slate-300">
            <HelpCircle className="w-3 h-3 mr-1" />
            EXCUSED
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Controls & Pitch Demonstration Toggle */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-5 flex flex-wrap items-center justify-between gap-4 shadow-xs">
        <div>
          <div className="flex items-center space-x-2.5">
            <h1 className="text-xl font-black text-slate-900 tracking-tight">
              Teacher Classroom Roll-Call Module
            </h1>
            <span className="bg-blue-50 text-blue-800 border border-blue-200 text-[11px] px-2.5 py-0.5 rounded-full font-mono font-bold">
              ⚡ 30-Second Roll-Call
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Designed for teachers to take attendance on their phone within 30 seconds with automatic instant sync to Principal's desk.
          </p>
        </div>

        {/* View Switcher: Desktop vs Mobile Simulation */}
        <div className="flex items-center space-x-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs">
          <button
            onClick={() => setViewMode('mobile')}
            className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
              viewMode === 'mobile'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Smartphone className="w-4 h-4 text-emerald-400" />
            <span>Teacher Mobile View (Phone Demo)</span>
          </button>

          <button
            onClick={() => setViewMode('desktop')}
            className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
              viewMode === 'desktop'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Monitor className="w-4 h-4" />
            <span>Classroom Desktop Register</span>
          </button>
        </div>
      </div>

      {/* Class & Subject Selector Bar */}
      <div className="bg-[#0b101d] text-white rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4 shadow-md border border-slate-800">
        <div className="flex flex-wrap items-center gap-4 text-xs">
          <div>
            <label className="block text-[10px] text-slate-400 uppercase font-mono mb-1 font-semibold">Assigned Class</label>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="bg-slate-900 text-white rounded-xl border border-slate-700 px-3 py-1.5 text-xs font-semibold cursor-pointer focus:outline-none focus:border-blue-500"
            >
              <option value="Grade 9">Grade 9 (Pre-Eng / CS)</option>
              <option value="Grade 10">Grade 10 (Matric / O-Levels)</option>
              <option value="Grade 8">Grade 8 (Middle Wing)</option>
            </select>
          </div>

          <div>
            <label className="block text-[10px] text-slate-400 uppercase font-mono mb-1 font-semibold">Section</label>
            <select
              value={selectedSection}
              onChange={(e) => setSelectedSection(e.target.value)}
              className="bg-slate-900 text-white rounded-xl border border-slate-700 px-3 py-1.5 text-xs font-semibold cursor-pointer focus:outline-none focus:border-blue-500"
            >
              <option value="Section A (Pre-Engineering)">Section A (Pre-Engineering)</option>
              <option value="Section B (Computer Science)">Section B (Computer Science)</option>
              <option value="Section C">Section C</option>
            </select>
          </div>

          <div>
            <label className="block text-[10px] text-slate-400 uppercase font-mono mb-1 font-semibold">Subject &amp; Period</label>
            <div className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs font-mono text-slate-200">
              {selectedPeriod}
            </div>
          </div>
        </div>

        {/* Quick Batch Actions */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onBatchUpdate('present')}
            className="flex items-center space-x-1.5 bg-emerald-600 hover:bg-emerald-500 text-white px-3.5 py-1.5 rounded-xl text-xs font-bold cursor-pointer transition shadow-xs shadow-emerald-600/30"
          >
            <CheckCircle className="w-3.5 h-3.5" />
            <span>Mark All Present</span>
          </button>

          <button
            onClick={handleSaveAndSync}
            className="flex items-center space-x-1.5 bg-blue-600 hover:bg-blue-500 text-white px-4 py-1.5 rounded-xl text-xs font-bold cursor-pointer transition shadow-xs shadow-blue-600/30"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Sync to Principal Desk</span>
          </button>
        </div>
      </div>

      {isSaved && (
        <div className="bg-emerald-50 border border-emerald-300 text-emerald-800 px-4 py-2.5 rounded-xl text-xs flex items-center justify-between shadow-2xs">
          <div className="flex items-center space-x-2">
            <Check className="w-4 h-4 text-emerald-600" />
            <span className="font-bold">
              Attendance Synchronized: Principal and Gate controllers updated in real-time.
            </span>
          </div>
          <span className="font-mono text-[11px] text-emerald-700 font-semibold">Audit Timestamp: {new Date().toLocaleTimeString()}</span>
        </div>
      )}

      {/* VIEWPORT 1: SMARTPHONE DEMO FRAME (PITCH KILLER FEATURE) */}
      {viewMode === 'mobile' ? (
        <div className="flex justify-center py-6 bg-slate-200/60 rounded-2xl border border-slate-300/80">
          <div className="w-[390px] bg-slate-950 rounded-[44px] shadow-2xl border-[6px] border-slate-800 overflow-hidden flex flex-col font-sans ring-8 ring-slate-900/10">
            {/* Phone Dynamic Island & Status Bar */}
            <div className="bg-slate-950 text-white px-6 pt-3 pb-2 flex items-center justify-between text-[11px] font-mono">
              <span className="font-bold">08:16</span>
              <div className="w-24 h-5 bg-black rounded-full mx-auto border border-slate-800/80 flex items-center justify-center">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              </div>
              <div className="flex items-center gap-1">
                <Wifi className="w-3 h-3 text-slate-300" />
                <span className="text-[10px]">100%</span>
              </div>
            </div>

            {/* Mobile App Header */}
            <div className="bg-slate-900 text-white p-4 border-b border-slate-800">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xs font-bold tracking-tight">Sir Khurram Shehzad</h3>
                  <p className="text-[10px] text-slate-400 font-mono mt-0.5">Class 9-A • Mathematics</p>
                </div>
                <span className="bg-emerald-950 text-emerald-300 border border-emerald-800 text-[10px] px-2 py-0.5 rounded-full font-mono font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  <span>Synced</span>
                </span>
              </div>

              {/* Mobile Quick Counters */}
              <div className="mt-3.5 grid grid-cols-3 gap-2 text-center text-[10px] font-mono">
                <div className="bg-slate-800/90 p-2 rounded-xl border border-slate-700">
                  <div className="text-slate-400 font-semibold uppercase text-[9px]">Present</div>
                  <div className="text-base font-black text-emerald-400">{presentCount}</div>
                </div>
                <div className="bg-slate-800/90 p-2 rounded-xl border border-slate-700">
                  <div className="text-slate-400 font-semibold uppercase text-[9px]">Absent</div>
                  <div className="text-base font-black text-rose-400">{absentCount}</div>
                </div>
                <div className="bg-slate-800/90 p-2 rounded-xl border border-slate-700">
                  <div className="text-slate-400 font-semibold uppercase text-[9px]">Late</div>
                  <div className="text-base font-black text-amber-400">{lateCount}</div>
                </div>
              </div>
            </div>

            {/* Mobile Student List (Fast Tap to Cycle Status) */}
            <div className="p-3 bg-slate-100 flex-1 overflow-y-auto max-h-[460px] space-y-2">
              <div className="flex items-center justify-between text-[11px] text-slate-600 px-1 font-semibold">
                <span>Roster ({classStudents.length} Students)</span>
                <button 
                  type="button"
                  onClick={() => onBatchUpdate('present')}
                  className="text-[10px] text-blue-700 font-bold hover:underline cursor-pointer"
                >
                  ⚡ Mark All Present
                </button>
              </div>

              {classStudents.map((student) => (
                <div
                  key={student.id}
                  className="bg-white p-2.5 rounded-xl border border-slate-200/90 shadow-2xs flex items-center justify-between gap-2"
                >
                  <div className="flex items-center space-x-2.5 min-w-0">
                    <img
                      src={student.photoUrl}
                      alt={student.fullName}
                      className="w-10 h-11 rounded-lg object-cover border border-slate-200 shrink-0 shadow-2xs"
                    />
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-slate-900 truncate">
                        {student.fullName}
                      </div>
                      <div className="text-[10px] font-mono font-semibold text-slate-500">
                        Roll: {student.rollNo}
                      </div>
                    </div>
                  </div>

                  {/* 3 Clean Tappable Buttons */}
                  <div className="flex space-x-1 shrink-0">
                    <button
                      onClick={() => onUpdateAttendance(student.id, 'present')}
                      className={`w-7 h-7 rounded-lg text-[10px] font-bold font-mono transition cursor-pointer flex items-center justify-center ${
                        student.attendanceStatus === 'present'
                          ? 'bg-emerald-600 text-white shadow-xs ring-2 ring-emerald-400'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                      title="Present"
                    >
                      P
                    </button>

                    <button
                      onClick={() => onUpdateAttendance(student.id, 'absent')}
                      className={`w-7 h-7 rounded-lg text-[10px] font-bold font-mono transition cursor-pointer flex items-center justify-center ${
                        student.attendanceStatus === 'absent'
                          ? 'bg-rose-600 text-white shadow-xs ring-2 ring-rose-400'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                      title="Absent"
                    >
                      A
                    </button>

                    <button
                      onClick={() => onUpdateAttendance(student.id, 'late')}
                      className={`w-7 h-7 rounded-lg text-[10px] font-bold font-mono transition cursor-pointer flex items-center justify-center ${
                        student.attendanceStatus === 'late'
                          ? 'bg-amber-600 text-white shadow-xs ring-2 ring-amber-400'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                      title="Late"
                    >
                      L
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile Footer Action */}
            <div className="p-3 bg-white border-t border-slate-200">
              <button
                onClick={handleSaveAndSync}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white py-2.5 rounded-xl text-xs font-bold cursor-pointer transition text-center shadow-md shadow-slate-900/20"
              >
                Submit Period Attendance
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* VIEWPORT 2: DESKTOP REGISTER VIEW */
        <div className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-xs">
          <div className="px-5 py-3.5 bg-slate-50/80 border-b border-slate-200 flex items-center justify-between">
            <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider">
              Official Class Attendance Register — Grade 9-A
            </h3>
            <div className="flex items-center space-x-3 text-xs font-mono font-bold">
              <span className="text-emerald-700">Present: {presentCount}</span>
              <span className="text-rose-700">Absent: {absentCount}</span>
              <span className="text-amber-700">Late: {lateCount}</span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-slate-100/70 text-slate-600 border-b border-slate-200 font-semibold uppercase text-[10px] tracking-wider">
                  <th className="py-3 px-4">Student Name</th>
                  <th className="py-3 px-4">Roll &amp; RFID</th>
                  <th className="py-3 px-4">Guardian Name &amp; Contact</th>
                  <th className="py-3 px-4">Gate Ingress Time</th>
                  <th className="py-3 px-4">Current Status</th>
                  <th className="py-3 px-4 text-right">Quick Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {classStudents.map((student) => (
                  <tr key={student.id} className="hover:bg-slate-50 transition">
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-3">
                        <img
                          src={student.photoUrl}
                          alt={student.fullName}
                          className="w-9 h-10 rounded-lg object-cover border border-slate-200 shrink-0 shadow-2xs"
                        />
                        <div>
                          <div className="font-bold text-slate-900">{student.fullName}</div>
                          <div className="text-[11px] text-slate-500 font-mono">Blood: {student.bloodGroup}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-mono">
                      <div className="text-blue-700 font-bold">{student.rollNo}</div>
                      <div className="text-[10px] text-slate-400">{student.rfidUid}</div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-slate-800 font-medium">{student.guardianName}</div>
                      <div className="text-[11px] font-mono text-slate-500">{student.guardianPhone}</div>
                    </td>
                    <td className="py-3 px-4 font-mono text-slate-600">
                      {student.checkInTime || (
                        <span className="text-slate-400 italic">No Gate Scan</span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      {getStatusBadge(student.attendanceStatus)}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="inline-flex space-x-1">
                        <button
                          onClick={() => onUpdateAttendance(student.id, 'present')}
                          className={`px-2.5 py-1 text-[10px] font-mono font-bold rounded-lg cursor-pointer transition ${
                            student.attendanceStatus === 'present'
                              ? 'bg-emerald-600 text-white shadow-xs'
                              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                          }`}
                        >
                          P
                        </button>
                        <button
                          onClick={() => onUpdateAttendance(student.id, 'absent')}
                          className={`px-2.5 py-1 text-[10px] font-mono font-bold rounded-lg cursor-pointer transition ${
                            student.attendanceStatus === 'absent'
                              ? 'bg-rose-600 text-white shadow-xs'
                              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                          }`}
                        >
                          A
                        </button>
                        <button
                          onClick={() => onUpdateAttendance(student.id, 'late')}
                          className={`px-2.5 py-1 text-[10px] font-mono font-bold rounded-lg cursor-pointer transition ${
                            student.attendanceStatus === 'late'
                              ? 'bg-amber-600 text-white shadow-xs'
                              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                          }`}
                        >
                          L
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
