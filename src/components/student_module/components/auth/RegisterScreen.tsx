import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  GraduationCap
} from 'lucide-react';

export const RegisterScreen: React.FC = () => {
  const { setCurrentScreen, showToast, switchRole } = useApp();

  const [studentId, setStudentId] = useState('NUST-CS-2021-099');
  const [step, setStep] = useState<1 | 2>(1);
  const [verificationStatus, setVerificationStatus] = useState<
    'idle' | 'eligible' | 'ineligible'
  >('idle');

  // Step 2 Form fields
  const [fullName, setFullName] = useState('Zeeshan Tariq');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (studentId.includes('2023') || studentId === 'NUST-CS-2023-114') {
      setVerificationStatus('ineligible');
      showToast('Student has only 48 credit hours. 89 required.', 'error');
    } else {
      setVerificationStatus('eligible');
      setStep(2);
      showToast('Student verified! 92 passed credit hours. Eligible for FYP.', 'success');
    }
  };

  const handleCreateAccount = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 8) {
      showToast('Password must be at least 8 characters', 'warning');
      return;
    }
    showToast('Account created! Welcome to FYP360.', 'success');
    switchRole('student');
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
            STUDENT REGISTRATION
          </div>
          <h1 className="text-2xl font-bold text-[#1E293B] mt-0.5">Create your student account</h1>
          <p className="text-xs text-[#64748B] mt-1">
            Verify your university eligibility before creating an account.
          </p>
        </div>

        {/* 2-Step Stepper */}
        <div className="flex items-center justify-center gap-4 py-2">
          <div className="flex items-center gap-2">
            <span
              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                step >= 1 ? 'bg-[#002D71] text-white' : 'bg-slate-200 text-slate-600'
              }`}
            >
              1
            </span>
            <span className="text-xs font-semibold text-slate-900">University Verification</span>
          </div>
          <div className="w-8 h-0.5 bg-slate-200" />
          <div className="flex items-center gap-2">
            <span
              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                step === 2 ? 'bg-[#002D71] text-white' : 'bg-slate-200 text-slate-600'
              }`}
            >
              2
            </span>
            <span
              className={`text-xs font-semibold ${
                step === 2 ? 'text-slate-900' : 'text-slate-400'
              }`}
            >
              Account Creation
            </span>
          </div>
        </div>

        {step === 1 ? (
          <form onSubmit={handleVerify} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                University-assigned Student ID
              </label>
              <input
                type="text"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                placeholder="e.g. NUST-CS-2021-042"
                className="w-full px-3.5 py-2 text-xs font-mono rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#002D71]"
              />
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
              <span className="font-bold text-slate-900 block mb-0.5">Registration eligibility</span>
              <p className="text-slate-600">
                Active enrollment and at least 89 successfully passed credit hours are required.
              </p>
            </div>

            <div className="p-3 bg-amber-50/70 rounded-xl border border-amber-200 text-xs text-amber-900">
              <span className="font-bold block mb-1">Prototype verification samples:</span>
              <div className="flex flex-col sm:flex-row gap-2">
                <button
                  type="button"
                  onClick={() => setStudentId('NUST-CS-2021-099')}
                  className="text-left font-mono text-[11px] bg-white px-2 py-1 rounded border border-amber-300 hover:bg-amber-100"
                >
                  Eligible student: NUST-CS-2021-099 (92 Cr)
                </button>
                <button
                  type="button"
                  onClick={() => setStudentId('NUST-CS-2023-114')}
                  className="text-left font-mono text-[11px] bg-white px-2 py-1 rounded border border-amber-300 hover:bg-amber-100"
                >
                  Ineligible: NUST-CS-2023-114 (48 Cr)
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#002D71] text-white text-xs font-semibold rounded-lg hover:bg-[#003B85] transition-colors shadow-xs"
            >
              Verify Student ID
            </button>
          </form>
        ) : (
          <form onSubmit={handleCreateAccount} className="space-y-4">
            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-900 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <div>
                <span className="font-bold block">Eligibility Confirmed</span>
                <span>Student ID {studentId} verified. 92 credit hours on university record.</span>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Full Name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-3.5 py-2 text-xs rounded-lg border border-slate-300"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Create Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimum 8 characters"
                className="w-full px-3.5 py-2 text-xs rounded-lg border border-slate-300"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm password"
                className="w-full px-3.5 py-2 text-xs rounded-lg border border-slate-300"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#002D71] text-white text-xs font-semibold rounded-lg hover:bg-[#003B85] transition-colors shadow-xs"
            >
              Complete Registration & Enter Workspace
            </button>
          </form>
        )}

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
