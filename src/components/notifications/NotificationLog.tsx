import React, { useState } from 'react';
import { 
  MessageSquare, 
  Send, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Search, 
  Filter, 
  RefreshCw,
  PhoneCall
} from 'lucide-react';
import { WhatsAppNotification } from '../../types';

interface NotificationLogProps {
  notifications: WhatsAppNotification[];
  onResendNotification: (id: string) => void;
}

export const NotificationLog: React.FC<NotificationLogProps> = ({
  notifications,
  onResendNotification,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | 'gate_checkin' | 'absentee_alert' | 'late_warning'>('all');

  const filtered = notifications.filter((item) => {
    const matchesSearch =
      item.recipientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.recipientPhone.includes(searchTerm);
    const matchesType = typeFilter === 'all' || item.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const getStatusBadge = (status: WhatsAppNotification['status']) => {
    switch (status) {
      case 'read':
        return (
          <span className="inline-flex items-center text-[10px] font-mono font-medium text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
            <CheckCircle2 className="w-3 h-3 text-blue-600 mr-1" />
            READ & ACKNOWLEDGED
          </span>
        );
      case 'delivered':
        return (
          <span className="inline-flex items-center text-[10px] font-mono font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
            <CheckCircle2 className="w-3 h-3 text-emerald-600 mr-1" />
            DELIVERED (WHATSAPP)
          </span>
        );
      case 'queued':
        return (
          <span className="inline-flex items-center text-[10px] font-mono font-medium text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
            <Clock className="w-3 h-3 text-amber-600 mr-1" />
            QUEUED IN GATEWAY
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white border border-slate-200 rounded p-4 flex flex-wrap items-center justify-between gap-4 shadow-xs">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-lg font-bold text-slate-900 tracking-tight">
              Guardian WhatsApp & SMS Automated Dispatch Audit
            </h1>
            <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] px-2 py-0.5 rounded font-mono font-medium">
              Meta WhatsApp Business Cloud API Connected
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Audit trail of gate ingress alerts, absentee warnings, and punctuality notices dispatched to registered parents.
          </p>
        </div>

        <div className="flex items-center space-x-2 text-xs font-mono text-slate-500">
          <span>Gateway Latency: <strong className="text-slate-800">120ms</strong></span>
          <span>•</span>
          <span>Success Rate: <strong className="text-emerald-700">99.8%</strong></span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-slate-200 rounded p-3 flex flex-wrap items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center space-x-2 flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by student name, guardian, or phone number..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full text-xs text-slate-800 placeholder-slate-400 focus:outline-none"
          />
        </div>

        <div className="flex items-center space-x-2 text-xs">
          <Filter className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-500 font-medium">Notice Type:</span>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value as any)}
            className="bg-slate-100 text-slate-800 text-xs rounded border border-slate-300 px-2.5 py-1 focus:outline-none font-medium cursor-pointer"
          >
            <option value="all">All Dispatches</option>
            <option value="gate_checkin">Gate Ingress Confirmation</option>
            <option value="absentee_alert">Absentee Alerts</option>
            <option value="late_warning">Late Ingress Warnings</option>
          </select>
        </div>
      </div>

      {/* Notifications Table */}
      <div className="bg-white border border-slate-200 rounded overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-100 text-slate-600 border-b border-slate-200 font-semibold uppercase text-[10px] tracking-wider">
                <th className="py-2.5 px-3">Timestamp</th>
                <th className="py-2.5 px-3">Student & Class</th>
                <th className="py-2.5 px-3">Recipient Guardian</th>
                <th className="py-2.5 px-3">Message Body</th>
                <th className="py-2.5 px-3">Delivery Status</th>
                <th className="py-2.5 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/80 transition">
                  <td className="py-3 px-3 font-mono text-slate-600 whitespace-nowrap">
                    {item.timestamp}
                  </td>
                  <td className="py-3 px-3">
                    <div className="font-semibold text-slate-900">{item.studentName}</div>
                  </td>
                  <td className="py-3 px-3">
                    <div className="text-slate-800 font-medium">{item.recipientName}</div>
                    <div className="text-[11px] font-mono text-slate-500">{item.recipientPhone}</div>
                  </td>
                  <td className="py-3 px-3 max-w-sm text-slate-600">
                    <div className="bg-slate-50 p-2 rounded border border-slate-200 text-[11px] font-sans leading-relaxed">
                      {item.message}
                    </div>
                  </td>
                  <td className="py-3 px-3 whitespace-nowrap">
                    {getStatusBadge(item.status)}
                  </td>
                  <td className="py-3 px-3 text-right whitespace-nowrap">
                    <button
                      onClick={() => onResendNotification(item.id)}
                      className="px-2 py-1 text-[10px] font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 rounded border border-slate-300 transition cursor-pointer"
                    >
                      Resend
                    </button>
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

