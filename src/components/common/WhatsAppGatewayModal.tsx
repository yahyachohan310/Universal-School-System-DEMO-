import React, { useEffect, useState } from 'react';
import { 
  X, 
  CheckCircle2, 
  AlertCircle, 
  QrCode, 
  RefreshCw, 
  Smartphone, 
  Send, 
  ShieldCheck,
  Power
} from 'lucide-react';
import { whatsappService, WhatsAppServerStatus } from '../../services/whatsappService';

interface WhatsAppGatewayModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WhatsAppGatewayModal: React.FC<WhatsAppGatewayModalProps> = ({ isOpen, onClose }) => {
  const [status, setStatus] = useState<WhatsAppServerStatus>({ status: 'simulated' });
  const [loading, setLoading] = useState(false);
  const [testPhone, setTestPhone] = useState('+92 300 1234567');
  const [testSent, setTestSent] = useState(false);

  const fetchStatus = async () => {
    setLoading(true);
    const result = await whatsappService.getStatus();
    setStatus(result);
    setLoading(false);
  };

  useEffect(() => {
    if (isOpen) {
      fetchStatus();
      const interval = setInterval(fetchStatus, 5000);
      return () => clearInterval(interval);
    }
  }, [isOpen]);

  const handleStart = async () => {
    setLoading(true);
    await whatsappService.startWhatsApp();
    await fetchStatus();
  };

  const handleRestart = async () => {
    setLoading(true);
    await whatsappService.restartWhatsApp();
    await fetchStatus();
  };

  const handleSendTest = async () => {
    if (!testPhone) return;
    const res = await whatsappService.sendSingleMessage(
      testPhone,
      'Parent',
      'Test Alert from Universal Grammar School WhatsApp Gateway: System online & verified.'
    );
    if (res.success) {
      setTestSent(true);
      setTimeout(() => setTestSent(false), 4000);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/75 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full border border-slate-300 overflow-hidden font-sans">
        {/* Header */}
        <div className="bg-[#0b1120] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-bold">
              WA
            </div>
            <div>
              <h2 className="text-sm font-bold tracking-tight">
                WhatsApp Device Gateway Station
              </h2>
              <p className="text-[11px] text-slate-400 font-mono">
                Port 3005 Local Service • Unofficial Web Session Link
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-md transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Status Body */}
        <div className="p-6 space-y-6">
          {/* Status Badge */}
          <div className="p-4 rounded-xl border flex items-center justify-between bg-slate-50 border-slate-200">
            <div>
              <div className="text-xs text-slate-500 font-medium uppercase font-mono">
                Current Gateway Connection
              </div>
              <div className="text-base font-extrabold text-slate-900 capitalize mt-0.5 flex items-center space-x-2">
                {status.status === 'connected' && (
                  <>
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span className="text-emerald-700">Connected to WhatsApp</span>
                  </>
                )}
                {status.status === 'qr_ready' && (
                  <>
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                    <span className="text-amber-700">QR Code Ready to Scan</span>
                  </>
                )}
                {status.status === 'simulated' && (
                  <>
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
                    <span className="text-blue-700">Pitch Standby (Instant Simulation)</span>
                  </>
                )}
                {status.status === 'disconnected' && (
                  <>
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                    <span className="text-rose-700">Session Disconnected</span>
                  </>
                )}
              </div>
            </div>

            <button
              onClick={fetchStatus}
              disabled={loading}
              className="p-2 rounded-lg bg-white border border-slate-300 text-slate-600 hover:text-slate-900 transition cursor-pointer"
              title="Refresh status"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-blue-600' : ''}`} />
            </button>
          </div>

          {/* QR Code Display if QR is Ready */}
          {status.status === 'qr_ready' && status.qr ? (
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 text-center space-y-3">
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                Scan With School Phone (WhatsApp Linked Devices)
              </span>
              <img
                src={status.qr}
                alt="WhatsApp QR Code"
                className="w-56 h-56 mx-auto rounded-lg border-2 border-slate-800 shadow-md"
              />
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Open WhatsApp on phone &gt; Settings &gt; Linked Devices &gt; Link a Device &gt; Scan this QR code.
              </p>
            </div>
          ) : null}

          {/* Instructions for Pitch */}
          <div className="bg-blue-50/70 border border-blue-200 rounded-xl p-4 text-xs space-y-2 text-slate-700">
            <div className="flex items-center space-x-1.5 font-bold text-blue-900 uppercase font-mono text-[11px]">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              <span>How this Works for the School:</span>
            </div>
            <p className="text-[11px] leading-relaxed">
              The school links their official WhatsApp SIM <strong>once</strong> by scanning the QR code. After that, every student gate check-in, fee overdue reminder, and new admission welcome alert fires as a real WhatsApp message automatically — no manual typing needed.
            </p>
            <div className="border-t border-blue-200 pt-2 grid grid-cols-3 gap-2 text-center">
              {[
                { label: 'Gate Check-In', desc: 'Auto parent alert on entry' },
                { label: 'Fee Reminders', desc: '1-click bulk to defaulters' },
                { label: 'Admissions', desc: 'Welcome message on enroll' },
              ].map(({ label, desc }) => (
                <div key={label} className="bg-white border border-blue-200 rounded-lg p-2">
                  <div className="font-semibold text-blue-900 text-[11px]">{label}</div>
                  <div className="text-slate-500 text-[10px] mt-0.5">{desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Test Message Box */}
          <div className="border border-slate-200 rounded-xl p-4 space-y-3 bg-slate-50/50">
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
              Send Live Test Message to Any Number
            </span>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="+92 300 XXXXXXX"
                value={testPhone}
                onChange={(e) => setTestPhone(e.target.value)}
                className="bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs font-mono w-full focus:outline-none focus:border-blue-600"
              />
              <button
                onClick={handleSendTest}
                className="bg-emerald-700 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg text-xs font-semibold cursor-pointer transition shrink-0 flex items-center space-x-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send Test</span>
              </button>
            </div>
            {testSent && (
              <span className="text-[11px] font-mono text-emerald-700 font-semibold block">
                Message dispatched to {testPhone}! Check your phone.
              </span>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-100 px-6 py-3 border-t border-slate-200 flex justify-between items-center text-xs">
          <div className="space-x-2">
            <button
              onClick={handleStart}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-md font-medium cursor-pointer transition"
            >
              Start Session
            </button>
            <button
              onClick={handleRestart}
              className="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-md font-medium cursor-pointer transition"
            >
              Restart Session
            </button>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-900 text-white rounded-md font-semibold cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

