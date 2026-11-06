import React, { useState } from 'react';

interface LoginViewProps {
  onLogin: (role: 'coordinator' | 'supervisor') => void;
  onShowToast?: (msg: string) => void;
}

export const LoginView: React.FC<LoginViewProps> = ({ onLogin, onShowToast }) => {
  // Key prompt requirement: "make sure the option is towards co-ordinator instead of supervisor"
  const [selectedRole, setSelectedRole] = useState<'coordinator' | 'supervisor' | 'jury' | 'student'>('coordinator');
  const [identifier, setIdentifier] = useState('nadia.hussain@university.edu');
  const [password, setPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(selectedRole === 'coordinator' ? 'coordinator' : 'supervisor');
  };

  return (
    <div className="min-h-screen bg-[#F4F6F9] flex flex-col justify-between items-center p-4 sm:p-6 lg:p-10 select-none">
      {/* Top University & System Bar */}
      <div className="w-full max-w-[1040px] flex items-center justify-between py-2">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg bg-[#FD7A12] flex items-center justify-center text-white font-bold text-lg shadow-sm">
            F
          </div>
          <div className="flex flex-col">
            <span className="text-[17px] text-[#002D71] tracking-tight font-semibold leading-none">
              FYP360
            </span>
            <span className="font-eyebrow text-[10px] tracking-wider text-[#64748B] mt-1 uppercase font-semibold">
              PROJECT MANAGEMENT
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-white px-3.5 py-1.5 rounded-xl border border-[#E2E8F0] shadow-xs text-xs font-medium text-[#64748B]">
          <span className="material-symbols-outlined text-[16px] text-[#FD7A12]">school</span>
          <span className="text-[#002D71] font-semibold">KIET UNIVERSITY</span>
          <span className="text-[#CBD5E1]">·</span>
          <span>AY 2024–2025</span>
        </div>
      </div>

      {/* Main Login Card */}
      <div className="w-full max-w-[480px] my-auto">
        <div className="bg-white rounded-[24px] border border-[#E2E8F0] shadow-[0_4px_24px_rgba(0,0,0,0.04)] p-8 sm:p-10 flex flex-col gap-6">
          {/* Card Header */}
          <div className="text-center flex flex-col items-center">
            <span className="font-eyebrow text-[#FD7A12] uppercase tracking-widest text-[11px] font-bold mb-1">
              ACADEMIC PORTAL ACCESS
            </span>
            <h1 className="font-headline-lg text-[#002D71] text-[32px] sm:text-[36px] font-light tracking-tight leading-tight">
              Sign in to FYP360
            </h1>
            <p className="font-body-md text-[#64748B] text-sm mt-1">
              Enter your verified institutional credentials
            </p>
          </div>

          {/* Role Selection Segmented Control */}
          <div className="flex flex-col gap-1.5">
            <label className="font-eyebrow text-[#64748B] uppercase text-[11px] font-bold tracking-wider">
              SELECT PORTAL ROLE
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 p-1.5 bg-[#F1F5F9] rounded-xl border border-[#E2E8F0]">
              {/* Coordinator Button (default selected per instruction) */}
              <button
                type="button"
                onClick={() => {
                  setSelectedRole('coordinator');
                  setIdentifier('nadia.hussain@university.edu');
                }}
                className={`py-2 px-2.5 rounded-lg text-xs font-semibold transition-all flex flex-col items-center justify-center gap-0.5 cursor-pointer ${
                  selectedRole === 'coordinator'
                    ? 'bg-[#002D71] text-white shadow-sm ring-2 ring-[#FD7A12]/40'
                    : 'text-[#64748B] hover:text-[#002D71] hover:bg-white/60'
                }`}
              >
                <span>Coordinator</span>
                <span className="text-[9px] font-normal opacity-80 uppercase tracking-tighter">
                  (Recommended)
                </span>
              </button>

              {/* Supervisor Button */}
              <button
                type="button"
                onClick={() => {
                  setSelectedRole('supervisor');
                  setIdentifier('ahmed.rahman@university.edu');
                }}
                className={`py-2 px-2.5 rounded-lg text-xs font-medium transition-all flex flex-col items-center justify-center gap-0.5 cursor-pointer ${
                  selectedRole === 'supervisor'
                    ? 'bg-[#002D71] text-white shadow-sm'
                    : 'text-[#64748B] hover:text-[#002D71] hover:bg-white/60'
                }`}
              >
                <span>Supervisor</span>
                <span className="text-[9px] opacity-70">Faculty</span>
              </button>

              {/* Jury Button */}
              <button
                type="button"
                onClick={() => {
                  setSelectedRole('jury');
                  setIdentifier('sana.farooq@university.edu');
                }}
                className={`py-2 px-2.5 rounded-lg text-xs font-medium transition-all flex flex-col items-center justify-center gap-0.5 cursor-pointer ${
                  selectedRole === 'jury'
                    ? 'bg-[#002D71] text-white shadow-sm'
                    : 'text-[#64748B] hover:text-[#002D71] hover:bg-white/60'
                }`}
              >
                <span>Jury Panel</span>
                <span className="text-[9px] opacity-70">Evaluator</span>
              </button>

              {/* Student Button */}
              <button
                type="button"
                onClick={() => {
                  setSelectedRole('student');
                  setIdentifier('ayesha.khan@student.university.edu');
                }}
                className={`py-2 px-2.5 rounded-lg text-xs font-medium transition-all flex flex-col items-center justify-center gap-0.5 cursor-pointer ${
                  selectedRole === 'student'
                    ? 'bg-[#002D71] text-white shadow-sm'
                    : 'text-[#64748B] hover:text-[#002D71] hover:bg-white/60'
                }`}
              >
                <span>Student</span>
                <span className="text-[9px] opacity-70">Lead / Member</span>
              </button>
            </div>
            {selectedRole === 'coordinator' && (
              <span className="text-[11px] text-[#FD7A12] font-semibold flex items-center gap-1 mt-0.5">
                <span className="material-symbols-outlined text-[14px]">check_circle</span>
                Coordinator portal routing active: Dr. Nadia Hussain (FYP Committee)
              </span>
            )}
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* University Email / Employee ID */}
            <div className="flex flex-col gap-1.5">
              <label className="font-label-md text-[#475569] font-medium text-xs">
                Institutional Email or Employee ID *
              </label>
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-3.5 text-[#64748B] text-[20px] pointer-events-none">
                  badge
                </span>
                <input
                  type="text"
                  required
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  className="w-full h-[50px] pl-11 pr-4 rounded-xl bg-[#F4F6F9] text-[#1E293B] text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#FD7A12]/30 border border-transparent focus:border-[#FD7A12] transition-all"
                  placeholder="e.g. nadia.hussain@university.edu"
                />
              </div>
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label className="font-label-md text-[#475569] font-medium text-xs">
                  Password *
                </label>
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="text-xs text-[#01B0F1] hover:text-[#002D71] hover:underline font-medium"
                >
                  Forgot password?
                </a>
              </div>
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-3.5 text-[#64748B] text-[20px] pointer-events-none">
                  lock
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-[50px] pl-11 pr-11 rounded-xl bg-[#F4F6F9] text-[#1E293B] text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#FD7A12]/30 border border-transparent focus:border-[#FD7A12] transition-all font-mono"
                  placeholder="••••••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 text-[#64748B] hover:text-[#002D71] transition-colors p-1 cursor-pointer"
                  aria-label="Toggle password visibility"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded text-[#FD7A12] accent-[#FD7A12] cursor-pointer"
                />
                <span className="text-xs text-[#64748B]">Remember this device</span>
              </label>
              <span className="text-[11px] text-[#64748B] flex items-center gap-1">
                <span className="material-symbols-outlined text-[13px] text-[#FD7A12]">verified_user</span>
                Encrypted Session
              </span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full h-[52px] rounded-xl bg-[#002D71] hover:bg-[#164783] text-white font-medium text-sm transition-all shadow-sm flex items-center justify-center gap-2 mt-2 cursor-pointer"
            >
              <span>Sign in to Coordinator Portal</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>

            {/* University SSO Divider */}
            <div className="flex items-center gap-3 my-1">
              <div className="h-px bg-[#E2E8F0] flex-1"></div>
              <span className="text-[11px] uppercase tracking-wider text-[#64748B] font-semibold">
                or
              </span>
              <div className="h-px bg-[#E2E8F0] flex-1"></div>
            </div>

            {/* University SSO Action */}
            <button
              type="button"
              onClick={() => onLogin(selectedRole === 'coordinator' ? 'coordinator' : 'supervisor')}
              className="w-full h-[48px] rounded-xl bg-white border border-[#E2E8F0] hover:bg-[#F4F6F9] text-[#002D71] font-medium text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
            >
              <span className="material-symbols-outlined text-[18px] text-[#01B0F1]">
                account_balance
              </span>
              <span>Sign in with University SSO</span>
            </button>
          </form>

          {/* Quick Demo Assist */}
          <div className="bg-[#DFF5FD] border border-[#01B0F1]/20 rounded-xl p-3 flex items-center justify-between gap-3 text-xs text-[#002D71]">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-[#01B0F1] shrink-0">
                auto_awesome
              </span>
              <span>Pre-authorized test session ready for review</span>
            </div>
            <button
              type="button"
              onClick={() => onLogin(selectedRole === 'coordinator' ? 'coordinator' : 'supervisor')}
              className="font-semibold text-[#FD7A12] hover:underline whitespace-nowrap cursor-pointer"
            >
              Quick Sign In →
            </button>
          </div>
        </div>
      </div>

      {/* Footer Policy Notice */}
      <div className="w-full max-w-[600px] text-center text-xs text-[#64748B] leading-relaxed py-2">
        Human evaluation required. AI features provide advisory decision-support only.
        <br />
        KIET Academic Governance Framework · College of Computing &amp; Information Sciences
      </div>
    </div>
  );
};

export default LoginView;
