import React, { useState } from 'react';
import { 
  UserPlus, 
  CreditCard, 
  FileText, 
  CheckCircle2, 
  Send, 
  Printer, 
  Users, 
  Clock, 
  DollarSign,
  Search,
  Check,
  Receipt,
  Sparkles,
  Phone,
  ShieldCheck
} from 'lucide-react';
import { Student } from '../../types';
import { AdmissionFormData } from '../../types/auth';

interface ReceptionistPortalProps {
  students: Student[];
  onAddNewStudent: (newStudent: Student) => void;
  onOpenCardStudio: (studentId: string) => void;
}

export const ReceptionistPortal: React.FC<ReceptionistPortalProps> = ({
  students,
  onAddNewStudent,
  onOpenCardStudio,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'admission' | 'feecounter' | 'roster' | 'visitors'>('admission');

  // Form State
  const [formData, setFormData] = useState<AdmissionFormData>({
    fullName: '',
    dob: '2011-04-12',
    gender: 'Male',
    bloodGroup: 'B+',
    bFormNo: '35202-8491029-3',
    previousSchool: 'Govt High School / Private Model School',
    targetGrade: 'Grade 9',
    targetSection: 'Section A (Pre-Engineering)',
    guardianName: '',
    guardianRelation: 'Father',
    guardianCnic: '35201-1928374-1',
    guardianPhone: '',
    guardianEmail: 'guardian@gmail.com',
    residentialAddress: 'Street 4, Mohalla Gulshan, Near Main Bazaar',
    emergencyContact: '+92 321 4589211',
    admissionFee: 5000,
    monthlyTuition: 4500,
    paymentMode: 'Cash at Counter',
    medicalNotes: 'Fit for all sports.',
  });

  const [enrolledStudent, setEnrolledStudent] = useState<Student | null>(null);

  // Fee Counter State (Small School Front-Desk Cash Collection)
  const [selectedStudentForFee, setSelectedStudentForFee] = useState<Student>(students[0]);
  const [feeAmountPaying, setFeeAmountPaying] = useState(4500);
  const [monthForFee, setMonthForFee] = useState('November 2026');
  const [recentReceipt, setRecentReceipt] = useState<{
    receiptNo: string;
    studentName: string;
    rollNo: string;
    amount: number;
    month: string;
    time: string;
  } | null>(null);

  // Visitors State
  const [visitors, setVisitors] = useState([
    {
      id: 'vis-01',
      name: 'Muhammad Tariq',
      cnic: '35201-4491029-5',
      purpose: 'Meeting Principal for admission inquiry',
      timeIn: '09:15 AM',
      hostPerson: 'Sir Tariq Mehmood',
      status: 'In Campus',
    },
    {
      id: 'vis-02',
      name: 'Babu Shahbaz',
      cnic: '35202-8819203-1',
      purpose: 'Monthly fee submission in cash',
      timeIn: '09:40 AM',
      hostPerson: 'Front Desk Counter',
      status: 'Completed',
    },
  ]);

  const [newVisitorName, setNewVisitorName] = useState('');
  const [newVisitorPurpose, setNewVisitorPurpose] = useState('');

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAdmissionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.guardianName || !formData.guardianPhone) {
      alert('Please fill in Student Name, Guardian Name, and Guardian Phone.');
      return;
    }

    const randomNum = Math.floor(100 + Math.random() * 900);
    const newRoll = `2026-9A-${randomNum}`;
    const newRfid = `RF-9821-X${Math.floor(10 + Math.random() * 90)}`;

    const newStudent: Student = {
      id: `stu-${Date.now()}`,
      rollNo: newRoll,
      rfidUid: newRfid,
      fullName: formData.fullName,
      guardianName: formData.guardianName,
      guardianPhone: formData.guardianPhone,
      grade: formData.targetGrade,
      section: formData.targetSection,
      branchId: 'campus-main',
      photoUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=240',
      bloodGroup: formData.bloodGroup,
      emergencyContact: formData.emergencyContact,
      attendanceStatus: 'present',
      checkInTime: new Date().toLocaleTimeString(),
      gateScanned: 'Front Desk Counter Slip',
      lastWhatsAppStatus: 'delivered',
    };

    onAddNewStudent(newStudent);
    setEnrolledStudent(newStudent);
  };

  const handleCollectCashFee = (e: React.FormEvent) => {
    e.preventDefault();
    const receipt = {
      receiptNo: `REC-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      studentName: selectedStudentForFee.fullName,
      rollNo: selectedStudentForFee.rollNo,
      amount: feeAmountPaying,
      month: monthForFee,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setRecentReceipt(receipt);
  };

  const handleAddVisitor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVisitorName) return;
    const newEntry = {
      id: `vis-${Date.now()}`,
      name: newVisitorName,
      cnic: '35201-9928192-3',
      purpose: newVisitorPurpose || 'Fee / Inquiry',
      timeIn: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      hostPerson: 'Front Desk',
      status: 'In Campus',
    };
    setVisitors([newEntry, ...visitors]);
    setNewVisitorName('');
    setNewVisitorPurpose('');
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2.5">
            <h1 className="text-xl font-black text-slate-900 tracking-tight">
              Front Desk &amp; Admin Office (Receptionist Station)
            </h1>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500 mr-1.5 animate-pulse"></span>
              COUNTER ACTIVE
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1 font-mono">
            New Admissions, Counter Fee Cash Collection, Smart Plastic ID Cards, and Parent Visitor Slips
          </p>
        </div>

        {/* Sub-Tab Navigation Pills */}
        <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs">
          <button
            onClick={() => setActiveSubTab('admission')}
            className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg font-bold transition cursor-pointer ${
              activeSubTab === 'admission'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <UserPlus className="w-3.5 h-3.5 text-blue-600" />
            <span>New Admission</span>
          </button>

          <button
            onClick={() => setActiveSubTab('feecounter')}
            className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg font-bold transition cursor-pointer ${
              activeSubTab === 'feecounter'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
            <span>Counter Cash Fee</span>
          </button>

          <button
            onClick={() => setActiveSubTab('roster')}
            className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg font-bold transition cursor-pointer ${
              activeSubTab === 'roster'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Users className="w-3.5 h-3.5 text-slate-500" />
            <span>Students ({students.length})</span>
          </button>

          <button
            onClick={() => setActiveSubTab('visitors')}
            className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg font-bold transition cursor-pointer ${
              activeSubTab === 'visitors'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Clock className="w-3.5 h-3.5 text-slate-500" />
            <span>Visitor Slips ({visitors.length})</span>
          </button>
        </div>
      </div>

      {/* VIEW 1: NEW ADMISSION FORM */}
      {activeSubTab === 'admission' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-8 bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-7 shadow-xs space-y-6">
            <div className="flex items-start justify-between border-b border-slate-200/80 pb-4">
              <div>
                <h2 className="text-base font-black text-slate-900 tracking-tight">
                  New Student Admission Form
                </h2>
                <p className="text-xs text-slate-500 mt-0.5 font-mono">
                  Session 2025–2026 • Universal Grammar School Main Campus
                </p>
              </div>
              <span className="font-mono text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200">
                ADM-2026-904
              </span>
            </div>

            <form onSubmit={handleAdmissionSubmit} className="space-y-6">
              {/* SECTION A: Candidate Details */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2 text-xs font-black uppercase tracking-wider text-slate-800 border-b border-slate-100 pb-2">
                  <span className="w-5 h-5 rounded-md bg-blue-600 text-white flex items-center justify-center text-[10px] font-mono">1</span>
                  <span>Student Information</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div className="sm:col-span-2">
                    <label className="block font-semibold text-slate-700 mb-1.5">
                      Student Full Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      required
                      placeholder="e.g. Daniyal Haroon"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="w-full bg-slate-50/70 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition font-medium"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1.5">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      name="dob"
                      value={formData.dob}
                      onChange={handleInputChange}
                      className="w-full bg-slate-50/70 border border-slate-300 rounded-xl px-3 py-2.5 text-xs text-slate-900 focus:bg-white focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1.5">Admitting Grade</label>
                    <select
                      name="targetGrade"
                      value={formData.targetGrade}
                      onChange={handleInputChange}
                      className="w-full bg-slate-50/70 border border-slate-300 rounded-xl px-3 py-2.5 text-xs font-semibold text-slate-900 focus:bg-white focus:outline-none focus:border-blue-600"
                    >
                      <option value="Class 5">Class 5 (Primary Wing)</option>
                      <option value="Class 8">Class 8 (Middle Wing)</option>
                      <option value="Grade 9">Grade 9 (Matric / Science)</option>
                      <option value="Grade 10">Grade 10 (Matric / Science)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1.5">Section</label>
                    <select
                      name="targetSection"
                      value={formData.targetSection}
                      onChange={handleInputChange}
                      className="w-full bg-slate-50/70 border border-slate-300 rounded-xl px-3 py-2.5 text-xs font-semibold text-slate-900 focus:bg-white focus:outline-none"
                    >
                      <option value="Section A (Pre-Engineering)">Section A (Science)</option>
                      <option value="Section B (Computer Science)">Section B (Computer)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1.5">Blood Group</label>
                    <select
                      name="bloodGroup"
                      value={formData.bloodGroup}
                      onChange={handleInputChange}
                      className="w-full bg-slate-50/70 border border-slate-300 rounded-xl px-3 py-2.5 text-xs font-mono font-bold text-slate-900 focus:bg-white focus:outline-none"
                    >
                      <option value="A+">A+</option>
                      <option value="B+">B+</option>
                      <option value="O+">O+</option>
                      <option value="AB+">AB+</option>
                      <option value="B-">B-</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* SECTION B: Father & WhatsApp Contact */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2 text-xs font-black uppercase tracking-wider text-slate-800 border-b border-slate-100 pb-2">
                  <span className="w-5 h-5 rounded-md bg-blue-600 text-white flex items-center justify-center text-[10px] font-mono">2</span>
                  <span>Father / Guardian &amp; WhatsApp Mobile</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1.5">
                      Father / Guardian Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="guardianName"
                      required
                      placeholder="e.g. Haroon Rasheed"
                      value={formData.guardianName}
                      onChange={handleInputChange}
                      className="w-full bg-slate-50/70 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-blue-600 font-medium"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1.5">
                      Parent WhatsApp Mobile Number <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="guardianPhone"
                      required
                      placeholder="+92 300 1234567"
                      value={formData.guardianPhone}
                      onChange={handleInputChange}
                      className="w-full bg-slate-50/70 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs font-mono text-slate-900 focus:bg-white focus:outline-none focus:border-blue-600 font-bold"
                    />
                  </div>
                </div>

                <div className="text-xs">
                  <label className="block font-semibold text-slate-700 mb-1.5">
                    Home Address
                  </label>
                  <input
                    type="text"
                    name="residentialAddress"
                    value={formData.residentialAddress}
                    onChange={handleInputChange}
                    className="w-full bg-slate-50/70 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4 border-t border-slate-200/80 flex items-center justify-between">
                <div className="text-xs text-slate-500 font-mono">
                  Generates Roll No, Plastic Smart Card, &amp; Parent WhatsApp
                </div>

                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-bold text-xs transition cursor-pointer shadow-md shadow-blue-600/30 flex items-center space-x-2"
                >
                  <UserPlus className="w-4 h-4 text-white" />
                  <span>Save Admission &amp; Issue ID Card</span>
                </button>
              </div>
            </form>
          </div>

          {/* Right Action Dock */}
          <div className="lg:col-span-4 space-y-4">
            {enrolledStudent ? (
              <div className="bg-white border-2 border-emerald-500 rounded-2xl p-5 space-y-4 shadow-lg shadow-emerald-500/10">
                <div className="flex items-center space-x-2 text-emerald-800 font-black text-xs uppercase tracking-wide">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>Student Enrolled Successfully!</span>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-2 text-xs">
                  <div className="flex items-center space-x-3">
                    <img
                      src={enrolledStudent.photoUrl}
                      alt="Student"
                      className="w-12 h-14 rounded-lg border border-slate-300 object-cover shadow-2xs"
                    />
                    <div>
                      <div className="font-black text-slate-900 text-sm">
                        {enrolledStudent.fullName}
                      </div>
                      <div className="font-mono text-blue-700 font-bold text-xs mt-0.5">
                        Roll: {enrolledStudent.rollNo}
                      </div>
                      <div className="text-[11px] text-slate-500 font-mono">
                        Card UID: {enrolledStudent.rfidUid}
                      </div>
                    </div>
                  </div>
                  <div className="border-t pt-1.5 text-[11px] text-slate-600">
                    Parent WhatsApp: <strong className="font-mono text-slate-900">{enrolledStudent.guardianPhone}</strong>
                  </div>
                </div>

                <div className="space-y-2 pt-1">
                  <button
                    onClick={() => onOpenCardStudio(enrolledStudent.id)}
                    className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3 px-3 rounded-xl text-xs font-bold flex items-center justify-center space-x-2 cursor-pointer shadow-md shadow-blue-600/20 transition"
                  >
                    <CreditCard className="w-4 h-4" />
                    <span>Print Smart Plastic ID Card</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs space-y-3">
                <div className="flex items-center space-x-2 text-slate-800 font-bold text-xs uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4 text-blue-600" />
                  <span>Admissions Counter Checklist</span>
                </div>
                <div className="space-y-2 text-xs text-slate-600">
                  <div className="flex items-center space-x-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Assigns unique Roll Number</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Generates CR-80 PVC plastic ID card</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Dispatches Welcome WhatsApp to guardian</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Updates Principal executive dashboard</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* VIEW 2: COUNTER CASH FEE COLLECTION */}
      {activeSubTab === 'feecounter' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-7 bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-7 shadow-xs space-y-5">
            <div>
              <h2 className="text-base font-black text-slate-900 tracking-tight">
                Counter Cash Fee Collection
              </h2>
              <p className="text-xs text-slate-500 mt-0.5 font-mono">
                Small school reality: No accountant — Front desk receives cash and prints instant slip.
              </p>
            </div>

            <form onSubmit={handleCollectCashFee} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Select Paying Student
                </label>
                <select
                  value={selectedStudentForFee.id}
                  onChange={(e) => {
                    const st = students.find((s) => s.id === e.target.value);
                    if (st) setSelectedStudentForFee(st);
                  }}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-900 focus:outline-none focus:border-blue-600 cursor-pointer"
                >
                  {students.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.fullName} ({s.rollNo}) — {s.grade}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Amount Received (PKR)
                  </label>
                  <input
                    type="number"
                    value={feeAmountPaying}
                    onChange={(e) => setFeeAmountPaying(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-black text-slate-900 focus:outline-none focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Billing Month
                  </label>
                  <select
                    value={monthForFee}
                    onChange={(e) => setMonthForFee(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-900 focus:outline-none focus:border-blue-600 cursor-pointer"
                  >
                    <option value="November 2026">November 2026</option>
                    <option value="December 2026">December 2026</option>
                    <option value="January 2027">January 2027</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-4 rounded-xl text-xs transition cursor-pointer shadow-md shadow-emerald-600/30 flex items-center justify-center space-x-2"
              >
                <Receipt className="w-4 h-4" />
                <span>Receive Cash &amp; Print Thermal Slip</span>
              </button>
            </form>
          </div>

          {/* Receipt Output Panel */}
          <div className="lg:col-span-5 space-y-4">
            {recentReceipt ? (
              <div className="bg-white border-2 border-slate-800 rounded-2xl p-5 shadow-lg space-y-3 font-mono text-xs">
                <div className="text-center border-b border-dashed border-slate-300 pb-3">
                  <div className="font-black text-sm uppercase">Universal Grammar School</div>
                  <div className="text-[10px] text-slate-500">Main Campus Front Desk Receipt</div>
                  <div className="text-[10px] text-slate-500 font-bold mt-1">NO: {recentReceipt.receiptNo}</div>
                </div>

                <div className="space-y-1.5 py-2 text-slate-800">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Student:</span>
                    <span className="font-bold">{recentReceipt.studentName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Roll No:</span>
                    <span>{recentReceipt.rollNo}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Month:</span>
                    <span>{recentReceipt.month}</span>
                  </div>
                  <div className="flex justify-between text-base font-black border-t border-dashed border-slate-300 pt-2 text-emerald-800">
                    <span>PAID CASH:</span>
                    <span>PKR {recentReceipt.amount.toLocaleString()}</span>
                  </div>
                </div>

                <button
                  onClick={() => window.print()}
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white py-2.5 rounded-xl text-xs font-bold font-sans flex items-center justify-center space-x-1.5 cursor-pointer shadow-xs transition"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Receipt Slip</span>
                </button>
              </div>
            ) : (
              <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-6 text-center text-xs text-slate-500 space-y-2">
                <Receipt className="w-8 h-8 text-slate-400 mx-auto" />
                <div className="font-bold text-slate-700">No Counter Payment Processed Yet</div>
                <p className="text-[11px]">Select a student and record cash fee to print an official receipt.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* VIEW 3: STUDENT ROSTER */}
      {activeSubTab === 'roster' && (
        <div className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-xs">
          <div className="px-5 py-3.5 bg-slate-50/80 border-b border-slate-200 flex items-center justify-between">
            <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider">
              Enrolled Student Directory ({students.length} Total)
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-slate-100/70 text-slate-600 border-b border-slate-200 font-semibold uppercase text-[10px] tracking-wider">
                  <th className="py-3 px-4">Student</th>
                  <th className="py-3 px-4">Roll &amp; RFID</th>
                  <th className="py-3 px-4">Grade &amp; Section</th>
                  <th className="py-3 px-4">Guardian Contact</th>
                  <th className="py-3 px-4 text-center">Status</th>
                  <th className="py-3 px-4 text-right">Card</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {students.map((student) => (
                  <tr key={student.id} className="hover:bg-slate-50 transition">
                    <td className="py-3 px-4 font-bold text-slate-900">{student.fullName}</td>
                    <td className="py-3 px-4 font-mono text-blue-700 font-semibold">{student.rollNo}</td>
                    <td className="py-3 px-4 text-slate-600">{student.grade} ({student.section})</td>
                    <td className="py-3 px-4 font-mono text-slate-600">{student.guardianPhone}</td>
                    <td className="py-3 px-4 text-center">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                        ACTIVE
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => onOpenCardStudio(student.id)}
                        className="px-2.5 py-1 text-[11px] font-bold text-blue-700 hover:bg-blue-50 rounded-lg transition cursor-pointer"
                      >
                        View Card
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* VIEW 4: VISITOR SLIPS */}
      {activeSubTab === 'visitors' && (
        <div className="space-y-4">
          <form onSubmit={handleAddVisitor} className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs flex flex-wrap gap-3 items-center">
            <input
              type="text"
              placeholder="Visitor Full Name"
              value={newVisitorName}
              onChange={(e) => setNewVisitorName(e.target.value)}
              className="bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs font-semibold text-slate-900 focus:outline-none focus:border-blue-600 flex-1 min-w-[200px]"
            />
            <input
              type="text"
              placeholder="Purpose (e.g. Admission Inquiry, Fee Payment)"
              value={newVisitorPurpose}
              onChange={(e) => setNewVisitorPurpose(e.target.value)}
              className="bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-600 flex-1 min-w-[240px]"
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-4 py-2 rounded-xl text-xs cursor-pointer shadow-xs transition"
            >
              Issue Gate Slip
            </button>
          </form>

          <div className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-xs">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-slate-100/70 text-slate-600 border-b border-slate-200 font-semibold uppercase text-[10px] tracking-wider">
                  <th className="py-3 px-4">Visitor Name</th>
                  <th className="py-3 px-4">Purpose</th>
                  <th className="py-3 px-4">Time In</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {visitors.map((v) => (
                  <tr key={v.id} className="hover:bg-slate-50 transition">
                    <td className="py-3 px-4 font-bold text-slate-900">{v.name}</td>
                    <td className="py-3 px-4 text-slate-600">{v.purpose}</td>
                    <td className="py-3 px-4 font-mono font-bold text-slate-700">{v.timeIn}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-blue-50 text-blue-800 border border-blue-200">
                        {v.status}
                      </span>
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
