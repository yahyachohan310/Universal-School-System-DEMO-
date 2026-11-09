import React, { useState } from 'react';
import { 
  CreditCard, 
  Printer, 
  Download, 
  QrCode, 
  ShieldCheck, 
  Check, 
  Users, 
  Award,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { Student, Teacher } from '../../types';

interface IdCardStudioProps {
  students: Student[];
  teachers: Teacher[];
}

export const IdCardStudio: React.FC<IdCardStudioProps> = ({ students, teachers }) => {
  const [selectedStudentId, setSelectedStudentId] = useState(students[0].id);
  const [cardType, setCardType] = useState<'student' | 'faculty'>('student');
  const [side, setSide] = useState<'front' | 'back'>('front');

  const selectedStudent = students.find((s) => s.id === selectedStudentId) || students[0];
  const selectedTeacher = teachers[0];

  const handlePrintCard = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-5 flex flex-wrap items-center justify-between gap-4 shadow-xs no-print">
        <div>
          <div className="flex items-center space-x-2.5">
            <h1 className="text-xl font-black text-slate-900 tracking-tight">
              Smart PVC Plastic ID Card Studio
            </h1>
            <span className="bg-blue-50 text-blue-800 border border-blue-200 text-[11px] px-2.5 py-0.5 rounded-full font-mono font-bold">
              CR-80 ISO 7810 Standard (85.6mm × 54mm)
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1 font-mono">
            Direct PVC badge issuance system with embedded Code-128 barcode, 2D QR Code, and 13.56MHz RFID chip pairing
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={handlePrintCard}
            className="flex items-center space-x-2 bg-slate-900 hover:bg-slate-800 text-white px-4 py-2.5 rounded-xl text-xs font-bold cursor-pointer transition shadow-md shadow-slate-900/20"
          >
            <Printer className="w-4 h-4 text-slate-300" />
            <span>Print PVC Badge / Export PDF</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Student Roster Selector (4 Cols) */}
        <div className="lg:col-span-4 space-y-4 no-print">
          <div className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-xs">
            <div className="px-4 py-3 bg-slate-50/80 border-b border-slate-200 flex items-center justify-between">
              <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider">
                Select Cardholder
              </h3>
              <div className="flex space-x-1 text-[10px] bg-slate-200/80 p-0.5 rounded-lg font-bold">
                <button
                  onClick={() => setCardType('student')}
                  className={`px-2.5 py-0.5 rounded-md cursor-pointer transition ${
                    cardType === 'student' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Students
                </button>
                <button
                  onClick={() => setCardType('faculty')}
                  className={`px-2.5 py-0.5 rounded-md cursor-pointer transition ${
                    cardType === 'faculty' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Faculty
                </button>
              </div>
            </div>

            <div className="divide-y divide-slate-100 max-h-[480px] overflow-y-auto">
              {cardType === 'student'
                ? students.map((student) => (
                    <div
                      key={student.id}
                      onClick={() => setSelectedStudentId(student.id)}
                      className={`p-3 text-xs flex items-center justify-between cursor-pointer transition ${
                        selectedStudentId === student.id
                          ? 'bg-blue-50/80 border-l-4 border-l-blue-600 font-semibold'
                          : 'hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center space-x-2.5">
                        <img
                          src={student.photoUrl}
                          alt={student.fullName}
                          className="w-9 h-10 rounded-lg object-cover border border-slate-200 shadow-2xs"
                        />
                        <div>
                          <div className="font-bold text-slate-900">{student.fullName}</div>
                          <div className="text-[10px] font-mono text-blue-700 font-semibold mt-0.5">
                            {student.rollNo} • {student.grade}
                          </div>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    </div>
                  ))
                : teachers.map((teacher) => (
                    <div
                      key={teacher.id}
                      className="p-3 text-xs flex items-center justify-between cursor-pointer bg-blue-50/70 border-l-4 border-l-blue-600"
                    >
                      <div>
                        <div className="font-bold text-slate-900">{teacher.fullName}</div>
                        <div className="text-[10px] font-mono text-slate-500 mt-0.5">
                          {teacher.employeeCode} • {teacher.department}
                        </div>
                      </div>
                    </div>
                  ))}
            </div>
          </div>
        </div>

        {/* Right Column: High-Fidelity PVC Card Mockup (8 Cols) */}
        <div className="lg:col-span-8 space-y-4">
          {/* Side Toggle */}
          <div className="flex items-center justify-between no-print">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider font-mono">
              High-Precision CR-80 PVC Rendering
            </span>
            <div className="flex bg-slate-200/90 p-1 rounded-xl border border-slate-300 space-x-1 text-xs font-bold">
              <button
                onClick={() => setSide('front')}
                className={`px-3.5 py-1 rounded-lg cursor-pointer transition ${
                  side === 'front' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Front View
              </button>
              <button
                onClick={() => setSide('back')}
                className={`px-3.5 py-1 rounded-lg cursor-pointer transition ${
                  side === 'back' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Back View
              </button>
            </div>
          </div>

          {/* THE OFFICIAL PVC ID CARD CONTAINER */}
          <div className="flex justify-center p-8 bg-slate-200/60 rounded-2xl border border-slate-300/80">
            {side === 'front' ? (
              /* CARD FRONT */
              <div className="w-[330px] h-[510px] bg-white rounded-2xl shadow-2xl border border-slate-300 flex flex-col justify-between overflow-hidden relative ring-4 ring-slate-900/5">
                {/* Institutional Header Banner */}
                <div className="bg-[#090d16] text-white p-4 text-center relative border-b-2 border-blue-600">
                  <div className="text-[9px] font-mono uppercase tracking-widest text-slate-400 font-bold">
                    ACADEMIC SESSION 2025–2026
                  </div>
                  <div className="text-sm font-black uppercase tracking-wider text-white mt-0.5">
                    Universal Grammar School
                  </div>
                  <div className="text-[10px] text-blue-400 font-mono mt-0.5">
                    Main Campus • Johar Town
                  </div>
                </div>

                {/* Photo & Identity Section */}
                <div className="p-4 flex flex-col items-center flex-1">
                  <div className="relative mt-2">
                    <img
                      src={cardType === 'student' ? selectedStudent.photoUrl : 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=240'}
                      alt="Cardholder"
                      className="w-28 h-36 rounded-xl object-cover border-2 border-slate-900 shadow-md"
                    />
                    <div className="absolute -bottom-2 -right-2 bg-blue-600 text-white text-[9px] font-mono font-bold px-2 py-0.5 rounded-full border border-white shadow-2xs">
                      CR-80
                    </div>
                  </div>

                  <div className="text-center mt-3">
                    <h2 className="text-base font-black text-slate-900 tracking-tight">
                      {cardType === 'student' ? selectedStudent.fullName : selectedTeacher.fullName}
                    </h2>
                    <p className="text-xs font-mono font-bold text-blue-700 mt-0.5">
                      {cardType === 'student' ? selectedStudent.rollNo : selectedTeacher.employeeCode}
                    </p>
                  </div>

                  {/* Metadata Matrix */}
                  <div className="w-full mt-3 bg-slate-50 border border-slate-200 rounded-xl p-3 text-[11px] space-y-1.5 font-sans">
                    <div className="flex justify-between">
                      <span className="text-slate-500 font-medium">Category:</span>
                      <span className="font-bold text-slate-800 uppercase">
                        {cardType === 'student' ? 'Regular Student' : 'Senior Faculty'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500 font-medium">Class / Dept:</span>
                      <span className="font-bold text-slate-800">
                        {cardType === 'student' ? `${selectedStudent.grade} (${selectedStudent.section})` : selectedTeacher.department}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500 font-medium">Blood Group:</span>
                      <span className="font-mono font-black text-rose-700">
                        {cardType === 'student' ? selectedStudent.bloodGroup : 'O+'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500 font-medium">Expiry Date:</span>
                      <span className="font-mono font-bold text-slate-700">30 JUNE 2026</span>
                    </div>
                  </div>
                </div>

                {/* Card Bottom Security Strip with QR */}
                <div className="bg-slate-100 border-t border-slate-200 px-4 py-3 flex items-center justify-between">
                  <div className="text-[9px] text-slate-500 leading-tight">
                    <div className="font-mono text-slate-800 font-bold">
                      RFID: {cardType === 'student' ? selectedStudent.rfidUid : 'RF-FAC-991'}
                    </div>
                    <div className="text-emerald-700 font-semibold mt-0.5">● Turnstile Ingress Verified</div>
                  </div>

                  {/* Clean Vector-style QR Code Simulation */}
                  <div className="w-10 h-10 bg-white p-1 border border-slate-300 rounded-lg flex flex-col justify-between items-center shadow-2xs">
                    <div className="flex justify-between w-full">
                      <div className="w-2 h-2 bg-slate-900 rounded-xs" />
                      <div className="w-2 h-2 bg-slate-900 rounded-xs" />
                    </div>
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                    <div className="flex justify-between w-full">
                      <div className="w-2 h-2 bg-slate-900 rounded-xs" />
                      <div className="w-1 h-1 bg-slate-900" />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* CARD BACK */
              <div className="w-[330px] h-[510px] bg-white rounded-2xl shadow-2xl border border-slate-300 flex flex-col justify-between overflow-hidden relative ring-4 ring-slate-900/5">
                {/* Magnetic Stripe */}
                <div className="w-full h-11 bg-slate-900 mt-5 border-y border-slate-800" />

                <div className="p-5 space-y-4 text-[10px] text-slate-600 font-sans leading-relaxed">
                  <div className="border border-slate-200 p-2.5 rounded-lg bg-slate-50 space-y-1">
                    <div className="font-bold text-slate-800">GUARDIAN EMERGENCY CONTACT:</div>
                    <div className="font-mono font-bold text-slate-900 text-xs">{selectedStudent.guardianPhone}</div>
                    <div className="text-slate-500">{selectedStudent.guardianName} (Father)</div>
                  </div>

                  <div className="space-y-1 text-slate-500">
                    <div className="font-bold text-slate-700">TERMS OF SMART CARD:</div>
                    <div>1. This badge is property of Universal Grammar School.</div>
                    <div>2. Must be presented at gate scanner turnstiles upon every entry.</div>
                    <div>3. If found, please return to Front Desk Main Campus.</div>
                  </div>

                  <div className="border-t border-slate-200 pt-3 text-center">
                    <div className="font-mono text-slate-400 text-[9px]">BARCODE ENCODED UID</div>
                    <div className="font-mono font-bold text-xs tracking-widest text-slate-800 mt-1">
                      ||| | |||| | ||| |||| | ||
                    </div>
                  </div>
                </div>

                <div className="bg-slate-100 p-3 text-center border-t border-slate-200 text-[9px] font-mono text-slate-500">
                  AUTHORIZED INSTITUTIONAL CREDENTIAL
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
