import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import { Role } from './types';

interface RoleOption {
  id: Role;
  label: string;
  sublabel: string;
  icon: string;
  defaultEmail: string;
  userName: string;
  deptOrBatch: string;
}

const ROLES: RoleOption[] = [
  {
    id: 'student',
    label: 'Student',
    sublabel: 'Lead / Member',
    icon: 'school',
    defaultEmail: 'ayesha.khan@student.university.edu',
    userName: 'Ayesha Khan',
    deptOrBatch: 'BSCS · Batch 2021-2025',
  },
  {
    id: 'supervisor',
    label: 'Supervisor',
    sublabel: 'Faculty Guide',
    icon: 'supervisor_account',
    defaultEmail: 'ahmed.rahman@university.edu',
    userName: 'Dr. Ahmed Rahman',
    deptOrBatch: 'Associate Professor, Dept. of CS',
  },
  {
    id: 'jury',
    label: 'Jury Panel',
    sublabel: 'Evaluator',
    icon: 'gavel',
    defaultEmail: 'tariq.mansoor@university.edu',
    userName: 'Prof. Tariq Mansoor',
    deptOrBatch: 'External Jury & Defense Committee',
  },
  {
    id: 'coordinator',
    label: 'Coordinator',
    sublabel: 'FYP Committee',
    icon: 'manage_accounts',
    defaultEmail: 'nadia.hussain@university.edu',
    userName: 'Dr. Nadia Hussain',
    deptOrBatch: 'FYP Committee Chair, CS & SE',
  },
];

export const UnifiedLogin: React.FC = () => {
  const { login } = useAuth();
  const [selectedRole, setSelectedRole] = useState<Role>('student');
  const [email, setEmail] = useState<string>(ROLES[0].defaultEmail);
  const [password, setPassword] = useState<string>('••••••••••••');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [rememberMe, setRememberMe] = useState<boolean>(true);

  const currentRoleConfig = ROLES.find((r) => r.id === selectedRole) || ROLES[0];

  const handleRoleChange = (roleId: Role) => {
    setSelectedRole(roleId);
    const target = ROLES.find((r) => r.id === roleId);
    if (target) {
      setEmail(target.defaultEmail);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(selectedRole);
  };

  return (
    <div className="min-h-screen bg-[#F4F6F9] flex flex-col justify-between items-center p-4 sm:p-6 lg:p-10 select-none">
      {/* Top University & System Bar */}
      <div className="w-full max-w-[1040px] flex items-center justify-between py-2">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-[#002D71] flex items-center justify-center text-white font-bold text-lg shadow-sm border border-white/10">
            <span className="text-[#FD7A12]">K</span>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 leading-none">
              <span className="text-[18px] text-[#002D71] tracking-tight font-bold">
                KIET FYP360
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#01B0F1]"></span>
            </div>
            <span className="font-eyebrow text-[10px] tracking-wider text-[#64748B] mt-1 uppercase font-semibold">
              ACADEMIC MANAGEMENT PORTAL
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-white px-3.5 py-1.5 rounded-xl border border-[#E2E8F0] shadow-xs text-xs font-medium text-[#64748B]">
          <span className="material-symbols-outlined text-[16px] text-[#FD7A12]">verified</span>
          <span className="text-[#002D71] font-semibold">KIET UNIVERSITY</span>
          <span className="text-[#CBD5E1]">·</span>
          <span>AY 2024–2025</span>
        </div>
      </div>

      {/* Main Login Card */}
      <div className="w-full max-w-[500px] my-auto">
        <div className="bg-white rounded-[24px] border border-[#E2E8F0] shadow-[0_8px_30px_rgba(0,0,0,0.04)] p-8 sm:p-10 flex flex-col gap-6">
          {/* Card Header */}
          <div className="text-center flex flex-col items-center">
            <span className="font-eyebrow text-[#FD7A12] uppercase tracking-widest text-[11px] font-bold mb-1">
              UNIFIED PORTAL ACCESS
            </span>
            <h1 className="font-headline-lg text-[#002D71] text-[30px] sm:text-[34px] font-semibold tracking-tight leading-tight">
              Sign in to FYP360
            </h1>
            <p className="font-body-md text-[#64748B] text-xs sm:text-sm mt-1">
              Select your academic role to enter your dedicated portal
            </p>
          </div>

          {/* Role Selection Segmented Control */}
          <div className="flex flex-col gap-2">
            <label className="font-eyebrow text-[#64748B] uppercase text-[11px] font-bold tracking-wider">
              SELECT PORTAL ROLE
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 p-1.5 bg-[#F1F5F9] rounded-xl border border-[#E2E8F0]">
              {ROLES.map((r) => {
                const isSelected = selectedRole === r.id;
                return (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => handleRoleChange(r.id)}
                    className={`py-2 px-2 rounded-lg text-xs font-medium transition-all flex flex-col items-center justify-center gap-0.5 cursor-pointer ${
                      isSelected
                        ? 'bg-[#002D71] text-white shadow-sm ring-2 ring-[#FD7A12]/40'
                        : 'text-[#64748B] hover:text-[#002D71] hover:bg-white/60'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      {r.icon}
                    </span>
                    <span className="font-semibold text-[12px]">{r.label}</span>
                    <span className="text-[9px] opacity-75">{r.sublabel}</span>
                  </button>
                );
              })}
            </div>

            {/* Active Role Indicator Card */}
            <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#DFF5FD] text-[#01B0F1] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[18px]">
                    {currentRoleConfig.icon}
                  </span>
                </div>
                <div className="flex flex-col text-left leading-tight">
                  <span className="text-xs font-semibold text-[#002D71]">
                    {currentRoleConfig.userName}
                  </span>
                  <span className="text-[11px] text-[#64748B]">
                    {currentRoleConfig.deptOrBatch}
                  </span>
                </div>
              </div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#FD7A12] bg-[#FFF1E5] px-2 py-0.5 rounded-full">
                Active Role
              </span>
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* University Email / Employee ID */}
            <div className="flex flex-col gap-1.5">
              <label className="font-label-md text-[#475569] font-medium text-xs">
                Institutional Email or ID *
              </label>
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-3.5 text-[#64748B] text-[20px] pointer-events-none">
                  badge
                </span>
                <input
                  type="text"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl text-xs sm:text-sm text-[#1E293B] focus:outline-none focus:border-[#002D71] focus:ring-2 focus:ring-[#002D71]/20 transition-all font-mono"
                  placeholder="name@university.edu"
                />
              </div>
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between items-center">
                <label className="font-label-md text-[#475569] font-medium text-xs">
                  Institutional Password *
                </label>
                <button
                  type="button"
                  className="text-[11px] text-[#01B0F1] hover:underline font-medium cursor-pointer"
                >
                  Forgot password?
                </button>
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
                  className="w-full pl-10 pr-10 py-2.5 bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl text-xs sm:text-sm text-[#1E293B] focus:outline-none focus:border-[#002D71] focus:ring-2 focus:ring-[#002D71]/20 transition-all font-mono tracking-wider"
                  placeholder="Password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 text-[#64748B] hover:text-[#002D71] cursor-pointer flex items-center justify-center"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 text-[#475569] cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded text-[#002D71] border-[#CBD5E1] focus:ring-[#002D71]"
                />
                <span>Remember session on this device</span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full mt-2 py-3 bg-[#002D71] hover:bg-[#002255] text-white font-semibold rounded-xl text-sm transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer group"
            >
              <span>Enter {currentRoleConfig.label} Portal</span>
              <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform text-[#FD7A12]">
                arrow_forward
              </span>
            </button>
          </form>

          {/* Quick Demo Access Bar */}
          <div className="border-t border-[#E2E8F0] pt-4 flex flex-col gap-2">
            <span className="text-[11px] font-semibold text-[#64748B] uppercase tracking-wider text-center">
              Quick Demo Access
            </span>
            <div className="grid grid-cols-2 gap-2">
              {ROLES.map((r) => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => login(r.id)}
                  className="px-2.5 py-1.5 rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] hover:bg-white text-left flex items-center gap-2 cursor-pointer transition-colors group"
                >
                  <span className="material-symbols-outlined text-[16px] text-[#002D71] group-hover:text-[#FD7A12]">
                    {r.icon}
                  </span>
                  <div className="flex flex-col leading-tight">
                    <span className="text-[11px] font-semibold text-[#002D71]">
                      {r.label} Demo
                    </span>
                    <span className="text-[9px] text-[#64748B]">Instant login</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* University Footer */}
      <div className="w-full max-w-[1040px] flex flex-col sm:flex-row items-center justify-between text-xs text-[#64748B] py-2 border-t border-[#E2E8F0] gap-2">
        <div className="flex items-center gap-2">
          <span>Karachi Institute of Economics and Technology</span>
          <span className="hidden sm:inline">·</span>
          <span>Department of Computer Science & Software Engineering</span>
        </div>
        <div>
          <span>FYP360 v2.4 (Integrated Academic Defense Portal)</span>
        </div>
      </div>
    </div>
  );
};

