import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';
import {
  GraduationCap,
  Users,
  Award,
  ShieldCheck,
  Eye,
  EyeOff,
  ArrowRight,
  Info
} from 'lucide-react';

export const SignInScreen: React.FC = () => {
  const { switchRole, setCurrentScreen, showToast } = useApp();

  const [selectedRole, setSelectedRole] = useState<UserRole>('student');
  const [userId, setUserId] = useState('NUST-CS-DEMO-001');
  const [password, setPassword] = useState('Fyp360Demo1');
  const [showPassword, setShowPassword] = useState(false);

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    if (role === 'student') {
      setUserId('NUST-CS-DEMO-001');
      setPassword('Fyp360Demo1');
    } else if (role === 'supervisor') {
      setUserId('EMP-CS-781');
      setPassword('SupervisorPass1');
    } else if (role === 'jury') {
      setUserId('EMP-JURY-204');
      setPassword('JuryReviewer1');
    } else {
      setUserId('EMP-COORD-101');
      setPassword('Coordinator1');
    }
  };

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId.trim()) {
      showToast('Please enter your university ID', 'warning');
      return;
    }
    switchRole(selectedRole);
  };

  const roles = [
    {
      id: 'student' as UserRole,
      title: 'Student',
      desc: 'FYP group workspace',
      iconChar: 'S',
      activeColor: 'border-[#01B0F1] bg-[#EAF5FC]',
      badgeColor: 'bg-emerald-600 text-white',
    },
    {
      id: 'supervisor' as UserRole,
      title: 'Supervisor',
      desc: 'Project supervision',
      iconChar: 'S',
      activeColor: 'border-[#01B0F1] bg-[#EAF5FC]',
      badgeColor: 'bg-[#002D71] text-white',
    },
    {
      id: 'jury' as UserRole,
      title: 'Jury Member',
      desc: 'Proposal evaluation',
      iconChar: 'J',
      activeColor: 'border-[#01B0F1] bg-[#EAF5FC]',
      badgeColor: 'bg-indigo-600 text-white',
    },
    {
      id: 'coordinator' as UserRole,
      title: 'FYP Coordinator',
      desc: 'Program administration',
      iconChar: 'F',
      activeColor: 'border-[#01B0F1] bg-[#EAF5FC]',
      badgeColor: 'bg-amber-600 text-white',
    },
  ];

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
            WELCOME BACK
          </div>
          <h1 className="text-2xl font-bold text-[#1E293B] mt-0.5">Sign in to FYP360</h1>
          <p className="text-xs text-[#64748B] mt-1">
            Choose your university role and enter your credentials.
          </p>
        </div>

        {/* 4 Role Selector Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {roles.map((r) => {
            const isSelected = selectedRole === r.id;
            return (
              <button
                key={r.id}
                type="button"
                onClick={() => handleRoleSelect(r.id)}
                className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-1.5 ${
                  isSelected
                    ? 'border-[#002D71] bg-slate-50 ring-2 ring-[#002D71]/20'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs ${r.badgeColor}`}
                >
                  {r.iconChar}
                </div>
                <div className="text-xs font-bold text-slate-900 leading-tight">{r.title}</div>
                <div className="text-[10px] text-slate-500 leading-tight">{r.desc}</div>
              </button>
            );
          })}
        </div>

        {/* Prototype Authentication Notice */}
        <div className="p-3 bg-[#FFF4DF] rounded-xl border border-amber-200 text-xs text-[#B26B00]">
          <span className="font-bold block text-slate-900 mb-0.5">PROTOTYPE AUTHENTICATION</span>
          University checks below use mock records for demonstration. Production deployment connects
          to official university identity and enrollment systems.
        </div>

        {/* Form */}
        <form onSubmit={handleSignIn} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              {selectedRole === 'student' ? 'Student ID' : 'Employee ID'}
            </label>
            <input
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              placeholder={selectedRole === 'student' ? 'e.g. NUST-CS-2021-042' : 'e.g. EMP-CS-781'}
              className="w-full px-3.5 py-2 text-xs rounded-lg border border-slate-300 font-mono focus:outline-none focus:ring-2 focus:ring-[#002D71]"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-bold text-slate-700">Password</label>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-xs text-slate-500 hover:text-slate-800"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-3.5 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#002D71]"
            />
            <div className="text-right mt-1">
              <button
                type="button"
                onClick={() => setCurrentScreen('auth-recovery')}
                className="text-xs font-semibold text-[#002D71] hover:underline"
              >
                Forgot password?
              </button>
            </div>
          </div>

          {/* Quick Demo Pre-fill Banner */}
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
            <div>
              <span className="font-bold text-slate-900 block capitalize">
                DEMO {selectedRole} LOGIN
              </span>
              <span className="text-[11px] font-mono text-slate-600">
                ID: {userId} · Pass: {password}
              </span>
            </div>
            <span className="text-[10px] text-emerald-700 bg-emerald-100 font-semibold px-2 py-0.5 rounded">
              Ready
            </span>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#002D71] text-white text-xs font-semibold rounded-lg hover:bg-[#003B85] transition-colors shadow-xs capitalize"
          >
            Sign in as {selectedRole}
          </button>
        </form>

        <div className="text-center pt-2 border-t border-slate-100 text-xs text-slate-500">
          Eligible student without an account?{' '}
          <button
            type="button"
            onClick={() => setCurrentScreen('auth-register')}
            className="font-bold text-[#002D71] hover:underline"
          >
            Register with Student ID
          </button>
        </div>

        <div className="text-[11px] text-slate-400 text-center">
          Access is restricted to verified university students and authorized staff.
        </div>
      </div>
    </div>
  );
};
