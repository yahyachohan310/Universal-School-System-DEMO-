import React, { useState } from 'react';
import { 
  GraduationCap, 
  Printer, 
  Send, 
  Award, 
  CheckCircle2, 
  Search, 
  FileText,
  UserCheck
} from 'lucide-react';
import { Student } from '../../types';

interface SubjectMark {
  subject: string;
  totalMarks: number;
  obtainedMarks: number;
  grade: string;
}

interface ExamResultPortalProps {
  students: Student[];
}

export const ExamResultPortal: React.FC<ExamResultPortalProps> = ({ students }) => {
  const [selectedStudentId, setSelectedStudentId] = useState(students[0].id);
  const [showReportCardModal, setShowReportCardModal] = useState(false);

  const selectedStudent = students.find((s) => s.id === selectedStudentId) || students[0];

  const marksList: SubjectMark[] = [
    { subject: 'Mathematics (Advanced)', totalMarks: 100, obtainedMarks: 94, grade: 'A+' },
    { subject: 'Physics (Theory & Practical)', totalMarks: 100, obtainedMarks: 88, grade: 'A' },
    { subject: 'Chemistry', totalMarks: 100, obtainedMarks: 91, grade: 'A+' },
    { subject: 'English Language & Lit', totalMarks: 100, obtainedMarks: 82, grade: 'B+' },
    { subject: 'Computer Science & Coding', totalMarks: 100, obtainedMarks: 98, grade: 'A+' },
    { subject: 'Pakistan Studies & History', totalMarks: 50, obtainedMarks: 44, grade: 'A' },
  ];

  const totalPossible = marksList.reduce((acc, m) => acc + m.totalMarks, 0);
  const totalObtained = marksList.reduce((acc, m) => acc + m.obtainedMarks, 0);
  const percentage = ((totalObtained / totalPossible) * 100).toFixed(1);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white border border-slate-200/90 rounded-xl p-5 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2.5">
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">
              Academic Examinations &amp; Digital Report Card Portal
            </h1>
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono font-semibold bg-blue-50 text-blue-700 ring-1 ring-blue-600/20">
              Mid-Term Examinations 2026
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Exam performance tabulation, grading matrix, automated parent report card dispatch, and printable A4 result cards.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowReportCardModal(true)}
            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-xs font-semibold tracking-wide transition cursor-pointer shadow-xs"
          >
            <Printer className="w-4 h-4 text-white" />
            <span>Generate Official A4 Report Card</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Student Selector (4 Cols) */}
        <div className="lg:col-span-4 bg-white border border-slate-200/90 rounded-xl overflow-hidden shadow-xs">
          <div className="px-5 py-3.5 bg-slate-50/80 border-b border-slate-200 flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Select Candidate (Grade 9-A)
            </h3>
            <span className="text-xs font-mono text-slate-500">{students.length} Students</span>
          </div>

          <div className="divide-y divide-slate-100 max-h-[460px] overflow-y-auto">
            {students.map((student) => (
              <div
                key={student.id}
                onClick={() => setSelectedStudentId(student.id)}
                className={`p-3.5 text-xs flex items-center justify-between cursor-pointer transition ${
                  selectedStudentId === student.id
                    ? 'bg-blue-50/60 border-l-4 border-l-blue-600'
                    : 'hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <img
                    src={student.photoUrl}
                    alt={student.fullName}
                    className="w-10 h-10 rounded-full object-cover border border-slate-300"
                  />
                  <div>
                    <div className="font-bold text-slate-900">{student.fullName}</div>
                    <div className="text-[11px] font-mono text-slate-500">Roll: {student.rollNo}</div>
                  </div>
                </div>
                <span className="font-mono text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  90.4%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Candidate Marksheet Breakdown (8 Cols) */}
        <div className="lg:col-span-8 bg-white border border-slate-200/90 rounded-xl p-6 shadow-xs space-y-6">
          <div className="flex items-start justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center space-x-3.5">
              <img
                src={selectedStudent.photoUrl}
                alt={selectedStudent.fullName}
                className="w-14 h-16 rounded-lg object-cover border border-slate-300 shadow-2xs"
              />
              <div>
                <h2 className="text-lg font-bold text-slate-900">{selectedStudent.fullName}</h2>
                <div className="text-xs text-slate-500 font-mono mt-0.5">
                  Roll: <strong className="text-slate-800">{selectedStudent.rollNo}</strong> • {selectedStudent.grade} ({selectedStudent.section})
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">
                  Guardian: {selectedStudent.guardianName} ({selectedStudent.guardianPhone})
                </div>
              </div>
            </div>

            <div className="text-right">
              <div className="text-3xl font-extrabold text-blue-700 font-mono">{percentage}%</div>
              <span className="inline-block mt-0.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
                Grade: A+ (Rank: 2nd / 42)
              </span>
            </div>
          </div>

          {/* Subjects Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-slate-100/70 text-slate-600 border-b border-slate-200 font-semibold uppercase text-[10px] tracking-wider">
                  <th className="py-2.5 px-3">Subject Title</th>
                  <th className="py-2.5 px-3 text-right">Total Marks</th>
                  <th className="py-2.5 px-3 text-right">Marks Obtained</th>
                  <th className="py-2.5 px-3 text-right">Percentage</th>
                  <th className="py-2.5 px-3 text-center">Grade</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono">
                {marksList.map((m) => {
                  const pct = ((m.obtainedMarks / m.totalMarks) * 100).toFixed(0);
                  return (
                    <tr key={m.subject} className="hover:bg-slate-50/60 transition">
                      <td className="py-2.5 px-3 font-sans font-medium text-slate-900">
                        {m.subject}
                      </td>
                      <td className="py-2.5 px-3 text-right text-slate-600">{m.totalMarks}</td>
                      <td className="py-2.5 px-3 text-right font-bold text-slate-900">{m.obtainedMarks}</td>
                      <td className="py-2.5 px-3 text-right text-slate-700">{pct}%</td>
                      <td className="py-2.5 px-3 text-center">
                        <span className="font-bold px-2 py-0.5 rounded text-[10px] bg-blue-50 text-blue-800 border border-blue-200">
                          {m.grade}
                        </span>
                      </td>
                    </tr>
                  );
                })}
                <tr className="bg-slate-50 font-bold text-slate-900 border-t-2 border-slate-300">
                  <td className="py-2.5 px-3 font-sans uppercase">Total Aggregate</td>
                  <td className="py-2.5 px-3 text-right">{totalPossible}</td>
                  <td className="py-2.5 px-3 text-right text-blue-700">{totalObtained}</td>
                  <td className="py-2.5 px-3 text-right">{percentage}%</td>
                  <td className="py-2.5 px-3 text-center text-emerald-700">A+</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-xs flex items-center justify-between">
            <span className="text-slate-600">
              Class Teacher Remarks: <strong>"Exceptional analytical capability in Sciences. Keep up the high standard."</strong>
            </span>
            <button
              onClick={() => alert(`Official WhatsApp Result Card dispatched to ${selectedStudent.guardianPhone}`)}
              className="bg-emerald-700 hover:bg-emerald-600 text-white px-3 py-1.5 rounded-md font-semibold text-xs transition cursor-pointer flex items-center space-x-1.5 shrink-0"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send WhatsApp Card</span>
            </button>
          </div>
        </div>
      </div>

      {/* Official A4 Result Card Modal */}
      {showReportCardModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full p-8 space-y-6 border border-slate-300 text-slate-900 font-sans">
            <div className="flex justify-between items-center border-b pb-4 no-print">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Official Student Academic Transcript (A4 Layout)
              </span>
              <div className="flex space-x-2">
                <button
                  onClick={() => window.print()}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-md text-xs font-semibold cursor-pointer"
                >
                  Print Report Card
                </button>
                <button
                  onClick={() => setShowReportCardModal(false)}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-md text-xs font-medium cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>

            {/* A4 Printable Layout */}
            <div className="border-4 border-slate-900 p-6 space-y-6">
              <div className="text-center border-b-2 border-slate-900 pb-3">
                <h1 className="text-xl font-black uppercase tracking-wider">
                  Universal Education Network
                </h1>
                <p className="text-xs font-bold uppercase tracking-widest text-slate-700 mt-0.5">
                  Academic Evaluation &amp; Term Progress Report
                </p>
                <p className="text-[10px] text-slate-500">Main Executive Campus, Johar Town, Lahore</p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs font-mono border-b pb-3">
                <div>
                  <div>Candidate: <strong className="text-slate-900">{selectedStudent.fullName}</strong></div>
                  <div>Roll No: <strong>{selectedStudent.rollNo}</strong></div>
                  <div>Class: <strong>{selectedStudent.grade} ({selectedStudent.section})</strong></div>
                </div>
                <div className="text-right">
                  <div>Father: <strong>{selectedStudent.guardianName}</strong></div>
                  <div>Term: <strong>Mid-Term Session 2025–26</strong></div>
                  <div>Date: <strong>08 November 2026</strong></div>
                </div>
              </div>

              <table className="w-full text-xs text-left border border-slate-300">
                <thead className="bg-slate-100 font-bold uppercase text-[10px]">
                  <tr>
                    <th className="p-2 border-r">Subject</th>
                    <th className="p-2 text-right border-r">Max</th>
                    <th className="p-2 text-right border-r">Obt</th>
                    <th className="p-2 text-center">Grade</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 font-mono">
                  {marksList.map((m) => (
                    <tr key={m.subject}>
                      <td className="p-2 font-sans border-r">{m.subject}</td>
                      <td className="p-2 text-right border-r">{m.totalMarks}</td>
                      <td className="p-2 text-right border-r font-bold">{m.obtainedMarks}</td>
                      <td className="p-2 text-center font-bold">{m.grade}</td>
                    </tr>
                  ))}
                  <tr className="font-bold bg-slate-50 border-t-2 border-slate-400">
                    <td className="p-2 uppercase font-sans">Total Aggregate</td>
                    <td className="p-2 text-right">{totalPossible}</td>
                    <td className="p-2 text-right text-blue-900">{totalObtained}</td>
                    <td className="p-2 text-center text-emerald-800">A+ ({percentage}%)</td>
                  </tr>
                </tbody>
              </table>

              <div className="pt-8 grid grid-cols-2 gap-8 text-center text-xs">
                <div>
                  <div className="w-36 border-b border-slate-500 mx-auto mb-1" />
                  <span className="font-bold">Class Teacher Signature</span>
                </div>
                <div>
                  <div className="w-36 border-b border-slate-900 mx-auto mb-1" />
                  <span className="font-bold">Head Principal / Controller of Exams</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

