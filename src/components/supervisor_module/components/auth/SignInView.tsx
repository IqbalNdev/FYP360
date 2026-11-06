import React, { useState } from 'react';

type Role = 'Student' | 'Supervisor' | 'Jury Member' | 'FYP Coordinator';

interface SignInViewProps {
  onSignIn: (role: Role) => void;
}

export const SignInView: React.FC<SignInViewProps> = ({ onSignIn }) => {
  const [selectedRole, setSelectedRole] = useState<Role>('Supervisor');
  const [employeeId, setEmployeeId] = useState('FAC-014');
  const [password, setPassword] = useState('Fyp360Demo1');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const roles: { role: Role; letter: string; subtitle: string }[] = [
    { role: 'Student', letter: 'S', subtitle: 'FYP group' },
    { role: 'Supervisor', letter: 'S', subtitle: 'Project supervision' },
    { role: 'Jury Member', letter: 'J', subtitle: 'Proposal evaluation' },
    { role: 'FYP Coordinator', letter: 'F', subtitle: 'Program admin' },
  ];

  const handleRoleSelect = (role: Role) => {
    setSelectedRole(role);
    if (role === 'Supervisor') {
      setEmployeeId('FAC-014');
      setPassword('Fyp360Demo1');
    } else if (role === 'Student') {
      setEmployeeId('2021-CS-042');
      setPassword('StudentDemo1');
    } else if (role === 'Jury Member') {
      setEmployeeId('JUR-008');
      setPassword('JuryDemo1');
    } else {
      setEmployeeId('COORD-001');
      setPassword('CoordDemo1');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onSignIn(selectedRole);
    }, 450);
  };

  const idLabel = selectedRole === 'Student' ? 'Student Registration ID' : 'Employee ID';

  return (
    <div className="min-h-screen w-full bg-[#F4F6F9] flex flex-col items-center justify-center p-4 sm:p-6 select-none">
      {/* Centered Sign In Card */}
      <div className="w-full max-w-[540px] bg-white rounded-[28px] border border-[#E2E8F0] shadow-[0_8px_30px_rgba(0,45,113,0.06)] p-8 sm:p-12 flex flex-col gap-6 animate-in fade-in zoom-in-95 duration-200">
        {/* Brand Logo Row */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FD7A12] to-[#EA6800] flex items-center justify-center font-bold text-white text-lg shadow-sm">
            K
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight text-[#002D71]">
              FYP360
            </span>
            <span className="text-[10px] text-[#01B0F1] font-semibold tracking-wider uppercase -mt-0.5">
              KIET Group of Institutions
            </span>
          </div>
        </div>

        {/* Title & Welcome Section */}
        <div className="flex flex-col gap-1">
          <span className="text-xs font-bold text-[#FD7A12] uppercase tracking-widest">
            PORTAL AUTHENTICATION
          </span>
          <h1 className="text-3xl sm:text-[34px] font-normal text-[#002D71] tracking-tight mt-1">
            Sign in to FYP360
          </h1>
          <p className="text-sm text-[#475569] mt-0.5">
            Select your academic role and verify portal credentials.
          </p>
        </div>

        {/* Role Selector Grid */}
        <div className="grid grid-cols-4 gap-2.5">
          {roles.map((item) => {
            const isSelected = selectedRole === item.role;
            return (
              <button
                key={item.role}
                type="button"
                onClick={() => handleRoleSelect(item.role)}
                className={`flex flex-col items-center text-center p-2.5 sm:p-3 rounded-2xl transition-all cursor-pointer ${
                  isSelected
                    ? 'border-2 border-[#002D71] bg-white shadow-xs'
                    : 'border border-[#E2E8F0] bg-white hover:bg-slate-50'
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold mb-2 ${
                    isSelected
                      ? 'bg-[#002D71] text-white shadow-xs'
                      : 'bg-[#F1F5F9] text-[#475569]'
                  }`}
                >
                  {item.letter}
                </div>
                <span
                  className={`text-xs font-semibold leading-tight truncate w-full ${
                    isSelected ? 'text-[#002D71]' : 'text-[#1E293B]'
                  }`}
                >
                  {item.role}
                </span>
                <span className="text-[10px] text-[#475569] truncate w-full mt-0.5">
                  {item.subtitle}
                </span>
              </button>
            );
          })}
        </div>

        {/* Prototype Authentication Banner */}
        <div className="bg-[#E0F2FE]/60 border border-[#01B0F1]/30 rounded-xl p-3.5 flex items-center gap-3">
          <span className="material-symbols-outlined text-[#01B0F1] text-[20px] shrink-0">
            info
          </span>
          <div className="flex flex-col min-w-0">
            <span className="text-[10px] font-bold text-[#002D71] uppercase tracking-wider">
              KIET ACADEMIC PORTAL DEMO
            </span>
            <p className="text-xs text-[#475569]">
              Pre-configured university credentials enabled for instant access.
            </p>
          </div>
        </div>

        {/* Sign In Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Employee ID */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-[#1E293B]">
              {idLabel}
            </label>
            <input
              type="text"
              required
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
              className="w-full h-[52px] px-4 rounded-xl bg-slate-50 border border-[#E2E8F0] text-[#1E293B] text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#01B0F1]/50 focus:border-[#01B0F1] transition-all"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-[#1E293B]">
              Password
            </label>
            <div className="relative w-full">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-[52px] pl-4 pr-16 rounded-xl bg-slate-50 border border-[#E2E8F0] text-[#1E293B] text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#01B0F1]/50 focus:border-[#01B0F1] transition-all tracking-normal"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-medium text-[#475569] hover:text-[#002D71] transition-colors cursor-pointer"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
            <div className="flex justify-end pt-1">
              <a
                href="#forgot"
                onClick={(e) => {
                  e.preventDefault();
                  alert('In this prototype, use the demo credentials provided below.');
                }}
                className="text-xs text-[#475569] hover:text-[#FD7A12] transition-colors"
              >
                Forgot password?
              </a>
            </div>
          </div>

          {/* Demo Credentials Box */}
          <div
            onClick={() => {
              if (selectedRole === 'Supervisor') {
                setEmployeeId('FAC-014');
                setPassword('Fyp360Demo1');
              }
            }}
            className="bg-slate-50 border border-[#E2E8F0] rounded-xl p-3.5 flex flex-col gap-1 cursor-pointer hover:bg-slate-100/80 transition-colors"
            title="Click to auto-fill"
          >
            <span className="text-[10px] font-bold text-[#475569] uppercase tracking-wider">
              DEMO {selectedRole.toUpperCase()} LOGIN
            </span>
            <div className="flex items-center gap-2 text-xs text-[#1E293B]">
              <span>ID: <strong className="text-[#002D71]">{employeeId || 'FAC-014'}</strong></span>
              <span className="text-[#475569]">•</span>
              <span>Password: <strong className="text-[#002D71]">{password || 'Fyp360Demo1'}</strong></span>
            </div>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="h-12 w-full mt-2 rounded-xl bg-[#002D71] hover:bg-[#003B8F] active:bg-[#001F52] text-white text-sm font-semibold flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
          >
            {isLoading ? (
              <span className="inline-flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Signing in...
              </span>
            ) : (
              <span>Sign in as {selectedRole}</span>
            )}
          </button>
        </form>
      </div>

      {/* Footer text below card */}
      <footer className="mt-6 text-center">
        <p className="text-xs text-[#475569]">
          KIET Group of Institutions · Final Year Project Examination & Supervision Portal
        </p>
      </footer>
    </div>
  );
};
