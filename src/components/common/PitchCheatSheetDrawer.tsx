import React from 'react';
import { X, CheckCircle, HelpCircle, PhoneCall, Sparkles } from 'lucide-react';

interface PitchCheatSheetDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PitchCheatSheetDrawer: React.FC<PitchCheatSheetDrawerProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="bg-amber-50/95 border-b-2 border-amber-300 text-slate-900 p-4 shadow-md no-print transition">
      <div className="max-w-7xl mx-auto space-y-4">
        <div className="flex items-center justify-between border-b border-amber-200 pb-2">
          <div className="flex items-center space-x-2">
            <span className="bg-amber-600 text-white font-mono text-[10px] font-bold px-2 py-0.5 rounded">
              PITCH CHEAT SHEET
            </span>
            <h2 className="text-xs font-bold uppercase tracking-wider text-amber-950">
              Tuesday Pitch Script: Word-for-Word Guide (Kahan kya bolna hai)
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-amber-800 hover:text-amber-950 text-xs font-bold flex items-center space-x-1 cursor-pointer"
          >
            <span>Close Guide</span>
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          {/* Step 1 Script */}
          <div className="bg-white p-3 rounded border border-amber-200 shadow-2xs space-y-1.5">
            <div className="font-bold text-slate-900 flex items-center space-x-1.5 text-blue-900">
              <span className="w-5 h-5 rounded-full bg-blue-700 text-white flex items-center justify-center text-[10px]">1</span>
              <span>Gate Par Smart Card Scan</span>
            </div>
            <p className="text-slate-700 italic bg-slate-50 p-2 rounded border border-slate-200">
              "Sir, bacha gate par card lagayega, beep bajegi, aur foran parent ke WhatsApp par automated alert chala jayega ke bacha school pohanch gaya."
            </p>
            <div className="text-[11px] text-slate-600 space-y-0.5">
              <div><strong>Action:</strong> Kisi bhi student card par click karo.</div>
              <div><strong>Faida:</strong> Parents ki roz roz ki shikayat khatam.</div>
            </div>
          </div>

          {/* Step 2 Script */}
          <div className="bg-white p-3 rounded border border-amber-200 shadow-2xs space-y-1.5">
            <div className="font-bold text-slate-900 flex items-center space-x-1.5 text-blue-900">
              <span className="w-5 h-5 rounded-full bg-blue-700 text-white flex items-center justify-center text-[10px]">2</span>
              <span>Teacher Ka Mobile Phone</span>
            </div>
            <p className="text-slate-700 italic bg-slate-50 p-2 rounded border border-slate-200">
              "Sir, teachers ka 15 minute ka paper roll-call khatam. Teacher mobile nikaal kar 'Mark All Present' dabaye ga—30 seconds mein poori class attend!"
            </p>
            <div className="text-[11px] text-slate-600 space-y-0.5">
              <div><strong>Action:</strong> "Mark All Present" button dabao.</div>
              <div><strong>Faida:</strong> 15 minutes class teaching time saved.</div>
            </div>
          </div>

          {/* Step 3 Script */}
          <div className="bg-white p-3 rounded border border-amber-200 shadow-2xs space-y-1.5">
            <div className="font-bold text-slate-900 flex items-center space-x-1.5 text-blue-900">
              <span className="w-5 h-5 rounded-full bg-blue-700 text-white flex items-center justify-center text-[10px]">3</span>
              <span>Principal Ki Desk Report</span>
            </div>
            <p className="text-slate-700 italic bg-slate-50 p-2 rounded border border-slate-200">
              "Sir, subha 8:30 aapki desk par 1-page report hogi. Kaun aya, kaun absent hai, aur konse teacher ki chutti pe substitute lagana hai."
            </p>
            <div className="text-[11px] text-slate-600 space-y-0.5">
              <div><strong>Action:</strong> "Daily Desk Report" button dabao.</div>
              <div><strong>Faida:</strong> Principal ko phone calls nahi karni paren gi.</div>
            </div>
          </div>
        </div>

        {/* Common Tough Questions by School Owners */}
        <div className="bg-white p-3 rounded border border-amber-200 text-xs">
          <div className="font-bold text-amber-900 mb-1">
            Agar Principal Ye Sawaal Poochay Toh Ye Jawab Dena:
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-slate-700">
            <div>
              <span className="font-semibold text-slate-900">Q: "Agar internet chala jaye toh?"</span>
              <p className="text-[11px] text-slate-600">
                A: "Sir, system offline bhi chalega. Attendance local memory mein save hoti hai aur internet aatay hi khud sync ho jati hai."
              </p>
            </div>
            <div>
              <span className="font-semibold text-slate-900">Q: "ID Cards kaun banaye ga?"</span>
              <p className="text-[11px] text-slate-600">
                A: "Sir, hum aapko complete Smart Plastic ID Cards design aur print kar ke denge jisme Barcode aur QR code pehle se laga hoga."
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

