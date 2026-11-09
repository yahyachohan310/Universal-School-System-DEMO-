import React, { useState } from 'react';
import { 
  CreditCard, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  Download, 
  Printer, 
  Search, 
  Filter, 
  DollarSign, 
  Clock, 
  FileText,
  Building2,
  TrendingUp,
  MessageCircle,
  Sparkles
} from 'lucide-react';

interface FeeRecord {
  id: string;
  studentName: string;
  rollNo: string;
  grade: string;
  section: string;
  guardianName: string;
  guardianPhone: string;
  monthlyFee: number;
  monthsDue: number;
  totalOutstanding: number;
  status: 'paid' | 'overdue_1' | 'overdue_critical';
  lastReminderSent?: string;
}

const INITIAL_FEE_RECORDS: FeeRecord[] = [
  {
    id: 'fee-01',
    studentName: 'Farhan Ali Qureshi',
    rollNo: '2026-9A-041',
    grade: 'Grade 9',
    section: 'Section A',
    guardianName: 'Javed Iqbal Qureshi',
    guardianPhone: '+92 301 7729481',
    monthlyFee: 8500,
    monthsDue: 2,
    totalOutstanding: 17000,
    status: 'overdue_critical',
    lastReminderSent: 'Yesterday 04:30 PM',
  },
  {
    id: 'fee-02',
    studentName: 'Ayesha Siddiqua',
    rollNo: '2026-9A-033',
    grade: 'Grade 9',
    section: 'Section A',
    guardianName: 'Dr. Munir Siddiqui',
    guardianPhone: '+92 333 4910284',
    monthlyFee: 8500,
    monthsDue: 1,
    totalOutstanding: 8500,
    status: 'overdue_1',
    lastReminderSent: '03-Nov-2026',
  },
  {
    id: 'fee-03',
    studentName: 'Muhammad Hamza Bilal',
    rollNo: '2026-9A-014',
    grade: 'Grade 9',
    section: 'Section A',
    guardianName: 'Bilal Ahmad Sheikh',
    guardianPhone: '+92 300 8472910',
    monthlyFee: 8500,
    monthsDue: 0,
    totalOutstanding: 0,
    status: 'paid',
  },
  {
    id: 'fee-04',
    studentName: 'Zaid Bin Tariq',
    rollNo: '2026-9A-028',
    grade: 'Grade 9',
    section: 'Section A',
    guardianName: 'Tariq Mehmood',
    guardianPhone: '+92 321 4589211',
    monthlyFee: 8500,
    monthsDue: 0,
    totalOutstanding: 0,
    status: 'paid',
  },
  {
    id: 'fee-05',
    studentName: 'Syed Daniyal Raza',
    rollNo: '2026-8C-003',
    grade: 'Grade 8',
    section: 'Section C',
    guardianName: 'Syed Raza Hussain',
    guardianPhone: '+92 322 8192039',
    monthlyFee: 7800,
    monthsDue: 3,
    totalOutstanding: 23400,
    status: 'overdue_critical',
    lastReminderSent: '01-Nov-2026',
  },
];

export const FeeLedgerPortal: React.FC = () => {
  const [records, setRecords] = useState<FeeRecord[]>(INITIAL_FEE_RECORDS);
  const [filter, setFilter] = useState<'all' | 'critical' | 'paid'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [broadcastSent, setBroadcastSent] = useState(false);

  const totalReceivable = 24820000; // PKR 24.8M
  const totalCollected = 21395000;  // PKR 21.39M
  const totalOutstanding = totalReceivable - totalCollected;
  const collectionRate = ((totalCollected / totalReceivable) * 100).toFixed(1);

  const filtered = records.filter((r) => {
    const matchesSearch =
      r.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.rollNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.guardianName.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filter === 'critical') return matchesSearch && r.status === 'overdue_critical';
    if (filter === 'paid') return matchesSearch && r.status === 'paid';
    return matchesSearch;
  });

  const handleBroadcastReminders = () => {
    setBroadcastSent(true);
    setTimeout(() => setBroadcastSent(false), 4000);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2.5">
            <h1 className="text-xl font-black text-slate-900 tracking-tight">
              Fee Collection, Billing &amp; Recovery Radar
            </h1>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-blue-50 text-blue-800 border border-blue-200">
              Session 2025–2026 • Term 2
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1 font-mono">
            Tuition fee tracking, automated bank challan reconciliation, and 1-click WhatsApp recovery broadcasts
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={handleBroadcastReminders}
            disabled={broadcastSent}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold tracking-wide transition cursor-pointer shadow-md ${
              broadcastSent
                ? 'bg-emerald-600 text-white shadow-emerald-600/20'
                : 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-600/30'
            }`}
          >
            {broadcastSent ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-200" />
                <span>WhatsApp Reminders Dispatched!</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4 text-white" />
                <span>Broadcast Due Reminders to Defaulters</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* KPI Numerical Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Total Receivable */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 font-bold uppercase tracking-wider font-mono">
            <span>Monthly Invoicing</span>
            <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center font-bold text-xs border border-blue-200">
              PKR
            </div>
          </div>
          <div className="mt-3">
            <span className="text-3xl font-black tracking-tight text-slate-900 font-mono">
              24.82 M
            </span>
            <p className="text-[11px] text-slate-500 mt-0.5 font-mono">2,920 Enrolled Students</p>
          </div>
        </div>

        {/* Metric 2: Realized / Collected */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 font-bold uppercase tracking-wider font-mono">
            <span>Collected This Month</span>
            <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-200">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-3xl font-black tracking-tight text-emerald-700 font-mono">
              21.39 M
            </span>
            <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              {collectionRate}%
            </span>
          </div>
          <div className="mt-3.5 w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
            <div className="bg-emerald-600 h-1.5 rounded-full" style={{ width: `${collectionRate}%` }} />
          </div>
        </div>

        {/* Metric 3: Total Outstanding */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 font-bold uppercase tracking-wider font-mono">
            <span>Recovery Target</span>
            <div className="w-7 h-7 rounded-lg bg-rose-50 text-rose-700 flex items-center justify-center border border-rose-200">
              <AlertCircle className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-3xl font-black tracking-tight text-rose-600 font-mono">
              3.42 M
            </span>
            <span className="text-xs font-mono font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
              13.8% Due
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1 font-mono">124 Students with unpaid dues</p>
        </div>

        {/* Metric 4: Bank Ingress */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 font-bold uppercase tracking-wider font-mono">
            <span>Bank Reconciliation</span>
            <Building2 className="w-4 h-4 text-slate-400" />
          </div>
          <div className="mt-3">
            <span className="text-base font-black text-slate-900 block">HBL &amp; Meezan API</span>
            <p className="text-[11px] text-slate-500 mt-0.5">1-Link 24/7 Real-Time Pull</p>
          </div>
          <span className="inline-block mt-2 text-[10px] font-mono text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 font-bold">
            1-LINK ACTIVE
          </span>
        </div>
      </div>

      {/* Main Table: Defaulters & Ledger */}
      <div className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-xs space-y-3 p-5">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-2 border-b border-slate-100">
          <div>
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wide">
              Outstanding Dues &amp; Recovery Roster
            </h3>
            <p className="text-xs text-slate-500 font-mono">
              Track student balances, overdue tenures, and automated WhatsApp delivery timestamps
            </p>
          </div>

          <div className="flex items-center space-x-2 text-xs">
            <div className="relative">
              <input
                type="text"
                placeholder="Search student or roll no..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-slate-50 border border-slate-300 rounded-xl pl-8 pr-3 py-1.5 text-xs focus:outline-none focus:border-blue-600 font-medium"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
            </div>

            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as any)}
              className="bg-slate-50 border border-slate-300 rounded-xl px-3 py-1.5 text-xs font-bold cursor-pointer"
            >
              <option value="all">All Records</option>
              <option value="critical">Critical (&gt;2 Months Overdue)</option>
              <option value="paid">Paid Cleared</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-100/70 text-slate-600 border-b border-slate-200 font-semibold uppercase text-[10px] tracking-wider">
                <th className="py-3 px-4">Student Name &amp; Roll</th>
                <th className="py-3 px-4">Grade &amp; Section</th>
                <th className="py-3 px-4">Father / Guardian</th>
                <th className="py-3 px-4 text-right">Monthly Fee</th>
                <th className="py-3 px-4 text-right">Overdue</th>
                <th className="py-3 px-4 text-right">Total Outstanding</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50 transition">
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-slate-900">{item.studentName}</div>
                    <div className="text-[11px] font-mono text-blue-700 font-semibold">{item.rollNo}</div>
                  </td>
                  <td className="py-3.5 px-4 text-slate-700 font-medium">
                    {item.grade} ({item.section})
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-slate-900">{item.guardianName}</div>
                    <div className="text-[11px] font-mono text-slate-500">{item.guardianPhone}</div>
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono font-bold text-slate-800">
                    PKR {item.monthlyFee.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono">
                    {item.monthsDue === 0 ? (
                      <span className="text-emerald-700 font-semibold">0</span>
                    ) : (
                      <span className="text-rose-700 font-bold">{item.monthsDue} Mos</span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono font-black text-slate-900">
                    PKR {item.totalOutstanding.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    {item.status === 'paid' && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                        PAID CLEARED
                      </span>
                    )}
                    {item.status === 'overdue_1' && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-50 text-amber-800 border border-amber-200">
                        1 MONTH DUE
                      </span>
                    )}
                    {item.status === 'overdue_critical' && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-rose-50 text-rose-800 border border-rose-200">
                        CRITICAL DEFAULTER
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    {item.status !== 'paid' ? (
                      <button
                        onClick={() => alert(`WhatsApp Reminder dispatched to ${item.guardianPhone}`)}
                        className="px-3 py-1 text-[11px] font-bold bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition cursor-pointer shadow-2xs"
                      >
                        Send WhatsApp
                      </button>
                    ) : (
                      <span className="text-slate-400 text-[11px] font-mono">Cleared</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
