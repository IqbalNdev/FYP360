import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowLeft, KeyRound, ShieldAlert } from 'lucide-react';

export const RecoveryScreen: React.FC = () => {
  const { setCurrentScreen, showToast } = useApp();
  const [universityId, setUniversityId] = useState('');

  const handleRecover = (e: React.FormEvent) => {
    e.preventDefault();
    if (!universityId.trim()) {
      showToast('Please enter your university ID', 'warning');
      return;
    }
    showToast(
      `Recovery request logged for ID ${universityId}. Please consult your university department coordinator.`,
      'info'
    );
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-xl w-full p-8 shadow-xl border border-slate-200 space-y-6">
        {/* Brand */}
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-[#01B0F1] text-white font-bold text-lg flex items-center justify-center shadow-xs">
            F
          </div>
          <span className="text-xl font-bold text-[#002D71]">FYP360</span>
        </div>

        {/* Title */}
        <div>
          <div className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider">
            ACCOUNT RECOVERY
          </div>
          <h1 className="text-2xl font-bold text-[#1E293B] mt-0.5">Recover your account</h1>
          <p className="text-xs text-[#64748B] mt-1">
            Use your university's official recovery process for secure access.
          </p>
        </div>

        {/* Prototype notice */}
        <div className="p-3 bg-[#FFF4DF] rounded-xl border border-amber-200 text-xs text-[#B26B00]">
          <span className="font-bold block text-slate-900 mb-0.5">PROTOTYPE AUTHENTICATION</span>
          University checks below use mock records for demonstration. Production deployment must
          connect to official university identity and enrollment systems.
        </div>

        <form onSubmit={handleRecover} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Student ID or Employee ID
            </label>
            <input
              type="text"
              value={universityId}
              onChange={(e) => setUniversityId(e.target.value)}
              placeholder="Enter your university ID"
              className="w-full px-3.5 py-2 text-xs font-mono rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#002D71]"
            />
          </div>

          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600">
            <span className="font-bold text-slate-900 block mb-0.5">University-managed recovery</span>
            Secure password reset requires the official university identity or IT support service.
            The prototype does not send reset emails.
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#002D71] text-white text-xs font-semibold rounded-lg hover:bg-[#003B85] transition-colors shadow-xs"
          >
            Continue Account Recovery
          </button>
        </form>

        <div className="pt-2 text-center">
          <button
            type="button"
            onClick={() => setCurrentScreen('auth-signin')}
            className="text-xs font-semibold text-[#002D71] hover:underline inline-flex items-center gap-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Sign In</span>
          </button>
        </div>
      </div>
    </div>
  );
};
