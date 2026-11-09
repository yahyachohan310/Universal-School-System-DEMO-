import React, { useState } from 'react';
import { 
  ScanLine, 
  Volume2, 
  VolumeX, 
  Send, 
  ShieldCheck, 
  CheckCircle2,
  CheckCheck,
  CreditCard,
  Radio,
  Sparkles,
  Smartphone
} from 'lucide-react';
import { Student, Teacher, IngressLog } from '../../types';

interface GateScannerPortalProps {
  students: Student[];
  teachers: Teacher[];
  ingressLogs: IngressLog[];
  onScanRegistered: (personId: string, type: 'student' | 'teacher') => void;
}

export const GateScannerPortal: React.FC<GateScannerPortalProps> = ({
  students,
  ingressLogs,
  onScanRegistered,
}) => {
  const [manualCode, setManualCode] = useState('');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [lastScannedStudent, setLastScannedStudent] = useState<Student | null>(students[0]);
  const [scanPulse, setScanPulse] = useState(false);

  // Synthesize realistic scanner beep
  const playBeep = (freq = 880, duration = 0.12) => {
    if (!soundEnabled) return;
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.18, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {
      // Audio fallback
    }
  };

  const triggerScanEffect = (student: Student) => {
    playBeep(940, 0.14);
    setLastScannedStudent(student);
    setScanPulse(true);
    setTimeout(() => setScanPulse(false), 800);
    onScanRegistered(student.id, 'student');
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualCode.trim()) return;
    
    const found = students.find(
      (s) =>
        s.rollNo.toLowerCase().includes(manualCode.toLowerCase()) ||
        s.rfidUid.toLowerCase().includes(manualCode.toLowerCase()) ||
        s.fullName.toLowerCase().includes(manualCode.toLowerCase())
    );

    if (found) {
      triggerScanEffect(found);
      setManualCode('');
    } else {
      playBeep(320, 0.25);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner - Hardware Station Strip */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2.5">
            <h1 className="text-xl font-black text-slate-900 tracking-tight">
              Gate Ingress &amp; Turnstile Station
            </h1>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500 mr-1.5 animate-pulse"></span>
              KIOSK: GT-MAIN-01
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1 font-mono">
            Optical Barcode, 2D QR Code &amp; 13.56MHz RFID Badge Receiver with instant Parent WhatsApp Dispatch
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold border transition cursor-pointer shadow-2xs ${
              soundEnabled
                ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                : 'bg-slate-100 border-slate-300 text-slate-600'
            }`}
          >
            {soundEnabled ? (
              <>
                <Volume2 className="w-4 h-4 text-emerald-600" />
                <span>Audio Beep: ACTIVE</span>
              </>
            ) : (
              <>
                <VolumeX className="w-4 h-4 text-slate-400" />
                <span>Audio Beep: MUTED</span>
              </>
            )}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Interactive Tap-Cards & Keypad (7 Cols) */}
        <div className="lg:col-span-7 space-y-5">
          {/* Card Tap Showcase */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs">
            <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
              <div>
                <h2 className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                  <CreditCard className="w-3.5 h-3.5 text-blue-600" />
                  <span>Cardholder Badge Tap (Pitch Simulator)</span>
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Click any card to simulate a student scanning their physical ID badge at the school gate:
                </p>
              </div>
              <span className="text-[10px] font-mono font-bold bg-blue-50 text-blue-700 px-2 py-0.5 rounded border border-blue-200">
                1-TAP SCAN
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {students.slice(0, 4).map((student) => {
                const isSelected = lastScannedStudent?.id === student.id;
                return (
                  <div
                    key={student.id}
                    onClick={() => triggerScanEffect(student)}
                    className={`p-3.5 rounded-xl border transition cursor-pointer flex items-center space-x-3 group relative overflow-hidden ${
                      isSelected
                        ? 'border-blue-500 bg-blue-50/50 shadow-md ring-2 ring-blue-500/20'
                        : 'border-slate-200/90 hover:border-blue-400 hover:bg-slate-50/80 bg-white shadow-2xs'
                    }`}
                  >
                    <img
                      src={student.photoUrl}
                      alt={student.fullName}
                      className="w-12 h-14 rounded-lg object-cover border border-slate-300 shrink-0 shadow-2xs"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-black text-slate-900 group-hover:text-blue-700 truncate">
                        {student.fullName}
                      </div>
                      <div className="text-xs font-mono font-bold text-blue-700 mt-0.5">
                        {student.rollNo}
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        {student.grade} • Blood: <span className="font-semibold text-rose-700">{student.bloodGroup}</span>
                      </div>
                    </div>
                    <div className="shrink-0 text-slate-400 group-hover:text-white group-hover:bg-blue-600 font-black text-[10px] font-mono bg-slate-100 px-2.5 py-1.5 rounded-lg border border-slate-200 transition">
                      SCAN
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Manual Barcode / Keypad Input */}
          <div className="bg-[#0b101d] text-white rounded-2xl p-4 border border-slate-800 shadow-md">
            <div className="flex items-center justify-between mb-2 text-xs font-bold uppercase tracking-wider text-slate-300">
              <div className="flex items-center space-x-2">
                <ScanLine className="w-4 h-4 text-blue-400" />
                <span>Hardware Keypad / Optical Barcode Port</span>
              </div>
              <span className="font-mono text-[10px] text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                <span>ONLINE 115200 BAUD</span>
              </span>
            </div>
            <form onSubmit={handleManualSubmit} className="flex gap-2">
              <input
                type="text"
                placeholder="Scan barcode, RFID tag, or type Roll Number..."
                value={manualCode}
                onChange={(e) => setManualCode(e.target.value)}
                className="w-full bg-slate-900/90 text-white placeholder-slate-500 text-xs rounded-xl border border-slate-700 px-3.5 py-2.5 font-mono focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-xl text-xs font-bold cursor-pointer shrink-0 transition shadow-md shadow-blue-600/30"
              >
                Pass Entry
              </button>
            </form>
          </div>

          {/* Recent Ingress Feed */}
          <div className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-xs">
            <div className="px-5 py-3.5 bg-slate-50/80 border-b border-slate-200 flex items-center justify-between">
              <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider">
                Recent Ingress Stream (Gate 01 Main Gate)
              </h3>
              <span className="text-xs text-slate-500 font-mono">
                {ingressLogs.length} Verified Entries
              </span>
            </div>

            <div className="divide-y divide-slate-100 max-h-[220px] overflow-y-auto">
              {ingressLogs.slice(0, 5).map((log) => (
                <div key={log.id} className="p-3 text-xs flex items-center justify-between hover:bg-slate-50 transition">
                  <div>
                    <span className="font-bold text-slate-900">{log.personName}</span>
                    <span className="text-blue-700 font-mono font-semibold text-[11px] ml-2">({log.rollOrCode})</span>
                    <div className="text-[10px] text-slate-400 mt-0.5">{log.gate} • {log.method}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono text-xs text-slate-700 font-semibold">{log.timestamp}</div>
                    <span className="inline-block mt-0.5 text-[10px] font-mono font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                      PRESENT
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Visual Verification Card & Simulated WhatsApp Alert (5 Cols) */}
        <div className="lg:col-span-5 space-y-5">
          {/* Turnstile Access Verification Card */}
          <div className={`bg-white rounded-2xl overflow-hidden shadow-lg border-2 transition duration-300 ${
            scanPulse ? 'border-emerald-500 shadow-emerald-500/20' : 'border-slate-800/90'
          }`}>
            <div className="bg-[#0b101d] text-white px-5 py-3.5 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-black tracking-wider uppercase">
                  Turnstile Biometric Pass Card
                </span>
              </div>
              <span className="text-[10px] font-mono bg-emerald-500 text-slate-950 font-black px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-950"></span>
                <span>ACCESS GRANTED</span>
              </span>
            </div>

            {lastScannedStudent && (
              <div className="p-5 space-y-4">
                <div className="flex items-start space-x-4">
                  <img
                    src={lastScannedStudent.photoUrl}
                    alt={lastScannedStudent.fullName}
                    className="w-20 h-24 rounded-xl border border-slate-300 object-cover shrink-0 shadow-md"
                  />
                  <div className="space-y-1">
                    <div className="text-base font-black text-slate-900 tracking-tight">
                      {lastScannedStudent.fullName}
                    </div>
                    <div className="text-xs font-mono font-bold text-blue-700">
                      Roll: {lastScannedStudent.rollNo}
                    </div>
                    <div className="text-xs text-slate-600 font-medium">
                      Class: <span className="font-bold text-slate-800">{lastScannedStudent.grade}</span> ({lastScannedStudent.section})
                    </div>
                    <div className="flex items-center space-x-2 pt-1">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-rose-50 text-rose-700 border border-rose-200">
                        Blood: {lastScannedStudent.bloodGroup}
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-100 text-slate-700 border border-slate-200">
                        UID: {lastScannedStudent.rfidUid}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="border-t border-slate-200 pt-3 space-y-1.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Guardian Name:</span>
                    <span className="font-bold text-slate-800">{lastScannedStudent.guardianName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Guardian Contact:</span>
                    <span className="font-mono font-semibold text-slate-800">{lastScannedStudent.guardianPhone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Gate Check-in Time:</span>
                    <span className="font-mono font-bold text-emerald-700">
                      {new Date().toLocaleTimeString()}
                    </span>
                  </div>
                </div>

                {/* Instant Parent WhatsApp Dispatch Simulation - Styled like WhatsApp */}
                <div className="mt-4 rounded-xl p-3.5 border border-emerald-300/80 bg-emerald-50/50 space-y-2">
                  <div className="flex items-center justify-between text-xs font-black text-emerald-950">
                    <div className="flex items-center space-x-1.5">
                      <Smartphone className="w-3.5 h-3.5 text-emerald-700" />
                      <span>Instant Guardian WhatsApp Dispatch</span>
                    </div>
                    <span className="font-mono text-[10px] text-emerald-800 font-bold bg-emerald-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <CheckCheck className="w-3 h-3 text-emerald-600" />
                      <span>DELIVERED</span>
                    </span>
                  </div>

                  {/* Speech Bubble */}
                  <div className="bg-[#e7f8ec] border border-emerald-200 rounded-xl p-3 text-xs text-slate-900 shadow-xs relative">
                    <div className="font-bold text-emerald-900 text-[11px] mb-1 flex items-center justify-between">
                      <span>Universal Grammar School Gateway</span>
                      <span className="text-[10px] font-mono text-emerald-700">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                    <p className="leading-relaxed text-slate-800">
                      "Dear Guardian, your ward <strong className="font-bold text-slate-900">{lastScannedStudent.fullName}</strong> has safely entered Main Campus Gate 01 at {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}. Have a great academic day!"
                    </p>
                    <div className="flex items-center justify-end gap-1 text-[10px] text-emerald-800 font-mono mt-1.5">
                      <span>Delivered via SIM Gateway</span>
                      <CheckCheck className="w-3.5 h-3.5 text-blue-600" />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
