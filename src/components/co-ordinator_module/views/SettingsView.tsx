import { useState } from 'react';
import { UserProfile } from '../types';

interface SettingsViewProps {
  user: UserProfile;
  onUpdateUser: (updated: Partial<UserProfile>) => void;
  onShowToast: (message: string) => void;
  onSignOut: () => void;
}

export default function SettingsView({
  user,
  onUpdateUser,
  onShowToast,
  onSignOut,
}: SettingsViewProps) {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [title, setTitle] = useState('Associate Professor & FYP Coordinator');
  const [department, setDepartment] = useState(user.department);
  const [universityName, setUniversityName] = useState('KIET UNIVERSITY');
  const [academicYear, setAcademicYear] = useState('2024 — 2025');

  // Password state
  const [showPasswords, setShowPasswords] = useState(false);
  const [currentPwd, setCurrentPwd] = useState('');
  const [newPwd, setNewPwd] = useState('');
  const [confirmPwd, setConfirmPwd] = useState('');

  // Notification toggles
  const [notifications, setNotifications] = useState({
    proposalSubmitted: true,
    groupAtRisk: true,
    markingCompleted: true,
    conflictDeclared: true,
  });

  const toggleNotif = (key: keyof typeof notifications) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateUser({ name, email, department });
    onShowToast('Personal profile updated successfully.');
  };

  const handleSaveInstitution = (e: React.FormEvent) => {
    e.preventDefault();
    onShowToast(`Institution settings updated for "${universityName}" (${academicYear}).`);
  };

  const handleSavePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPwd || !newPwd || !confirmPwd) {
      onShowToast('Please fill all password fields.');
      return;
    }
    if (newPwd !== confirmPwd) {
      onShowToast('New passwords do not match.');
      return;
    }
    setCurrentPwd('');
    setNewPwd('');
    setConfirmPwd('');
    onShowToast('Password updated securely.');
  };

  return (
    <div className="flex flex-col w-full max-w-[1040px] mx-auto space-y-6">
      {/* Header Section */}
      <div className="flex flex-col space-y-1">
        <span className="font-eyebrow text-[11px] text-[#FD7A12] uppercase font-bold tracking-widest block">
          SYSTEM CONFIGURATION
        </span>
        <h1 className="font-headline-lg text-[#002D71] font-light tracking-tight">
          Settings
        </h1>
        <p className="font-body-lg text-[#64748B]">
          Portal preferences, institution profile, and notification rules.
        </p>
      </div>

      {/* Card 1: Personal Profile */}
      <form
        onSubmit={handleSaveProfile}
        className="bg-white rounded-[20px] shadow-xs border border-[#E2E8F0] p-6 flex flex-col gap-6"
      >
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-[#002D71] text-white flex items-center justify-center font-bold text-sm shrink-0">
            {user.initials}
          </div>
          <div className="flex flex-col">
            <h2 className="font-headline-sm text-[#002D71] font-semibold leading-snug">
              Personal Profile
            </h2>
            <p className="font-body-md text-[#64748B] text-xs">
              Manage your coordinator identity and contact credentials.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="font-label-md text-[#475569] font-medium text-xs">Full Name *</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full h-11 px-3.5 rounded-xl bg-[#faf9fc] text-[#1E293B] text-sm focus:outline-none focus:bg-white border border-[#E2E8F0]"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-label-md text-[#475569] font-medium text-xs">Institutional Email *</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-11 px-3.5 rounded-xl bg-[#faf9fc] text-[#1E293B] text-sm focus:outline-none focus:bg-white border border-[#E2E8F0]"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-label-md text-[#475569] font-medium text-xs">Academic Title / Role</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full h-11 px-3.5 rounded-xl bg-[#faf9fc] text-[#1E293B] text-sm focus:outline-none focus:bg-white border border-[#E2E8F0]"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-label-md text-[#475569] font-medium text-xs">Department</label>
            <input
              type="text"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="w-full h-11 px-3.5 rounded-xl bg-[#faf9fc] text-[#1E293B] text-sm focus:outline-none focus:bg-white border border-[#E2E8F0]"
            />
          </div>
        </div>

        <div className="flex justify-end pt-2 border-t border-[#E2E8F0]">
          <button
            type="submit"
            className="inline-flex items-center gap-2 h-11 px-5 rounded-xl bg-[#002D71] text-white font-label-lg text-xs font-semibold hover:bg-[#164783] transition-colors shadow-xs cursor-pointer"
          >
            <span>Save Profile</span>
            <span className="material-symbols-outlined text-[18px]">check</span>
          </button>
        </div>
      </form>

      {/* Card 2: Institution Settings */}
      <form
        onSubmit={handleSaveInstitution}
        className="bg-white rounded-[20px] shadow-xs border border-[#E2E8F0] p-6 flex flex-col gap-6"
      >
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-[#FFF1E5] flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[#FD7A12] text-[22px]">account_balance</span>
          </div>
          <div className="flex flex-col">
            <h2 className="font-headline-sm text-[#002D71] font-semibold leading-snug">
              Institution Settings
            </h2>
            <p className="font-body-md text-[#64748B] text-xs">
              Configure university credentials, active academic year, and scope.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* University Name */}
          <div className="flex flex-col gap-1.5">
            <label className="font-label-md text-[#475569] font-medium text-xs">University / Institution Name *</label>
            <div className="relative flex items-center">
              <input
                type="text"
                value={universityName}
                onChange={(e) => setUniversityName(e.target.value)}
                className="w-full h-11 px-3.5 pr-10 rounded-xl bg-[#faf9fc] text-[#1E293B] text-sm focus:outline-none focus:bg-white border border-[#E2E8F0] font-semibold tracking-wide"
              />
              <span className="material-symbols-outlined text-[#64748B] text-[18px] absolute right-3 pointer-events-none">
                domain
              </span>
            </div>
            <span className="font-label-md text-[#64748B] text-[11px] leading-tight">
              FYP360 is configurable for any university.
            </span>
          </div>

          {/* Academic Year */}
          <div className="flex flex-col gap-1.5">
            <label className="font-label-md text-[#475569] font-medium text-xs">Academic Year *</label>
            <div className="relative flex items-center">
              <select
                value={academicYear}
                onChange={(e) => setAcademicYear(e.target.value)}
                className="w-full h-11 px-3.5 pr-10 rounded-xl bg-[#faf9fc] text-[#1E293B] text-xs font-medium focus:outline-none focus:bg-white border border-[#E2E8F0] appearance-none cursor-pointer"
              >
                <option value="2024 — 2025">2024 — 2025</option>
                <option value="2025 — 2026">2025 — 2026 (Upcoming cycle)</option>
                <option value="2023 — 2024">2023 — 2024 (Archived)</option>
              </select>
              <span className="material-symbols-outlined text-[#64748B] text-[20px] absolute right-3 pointer-events-none">
                expand_more
              </span>
            </div>
            <span className="font-label-md text-[#64748B] text-[11px] leading-tight">
              Controls global calendar milestones, proposal cycles, and cohort archives.
            </span>
          </div>
        </div>

        {/* Department Scope Read-Only Badge */}
        <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#f5f3f6] border border-[#E2E8F0]">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-[#64748B] text-[20px]">apartment</span>
            <div className="flex flex-col">
              <span className="font-label-md text-[#475569] font-medium text-xs">
                Active Faculty Department Scope
              </span>
              <span className="font-body-md text-[#002D71] font-semibold text-xs">
                Department of Computer Science
              </span>
            </div>
          </div>
          <span className="px-2.5 py-1 rounded-md bg-white text-[#64748B] font-label-md text-[11px] shadow-xs border border-[#E2E8F0]">
            Institution Default
          </span>
        </div>

        {/* Informational Advisory Banner */}
        <div className="p-4 rounded-xl bg-[#FFF1E5] flex items-start gap-3 border border-[#FD7A12]/20">
          <span className="material-symbols-outlined text-[#FD7A12] text-[20px] shrink-0 mt-0.5">info</span>
          <p className="font-label-md text-[#002D71] text-xs leading-relaxed">
            FYP360 is configurable for any university. Changes apply to portal headers, report exports, and official transcripts across all student and faculty workspaces.
          </p>
        </div>

        <div className="flex justify-end pt-2 border-t border-[#E2E8F0]">
          <button
            type="submit"
            className="inline-flex items-center gap-2 h-11 px-5 rounded-xl bg-[#002D71] text-white font-label-lg text-xs font-semibold hover:bg-[#164783] transition-colors shadow-xs cursor-pointer"
          >
            <span>Save Institution Settings</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        </div>
      </form>

      {/* Card 3: Account Security */}
      <form
        onSubmit={handleSavePassword}
        className="bg-white rounded-[20px] shadow-xs border border-[#E2E8F0] p-6 flex flex-col gap-6"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#FFF1E5] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[#FD7A12] text-[22px]">lock_reset</span>
            </div>
            <div className="flex flex-col">
              <h2 className="font-headline-sm text-[#002D71] font-semibold leading-snug">
                Account Security
              </h2>
              <p className="font-body-md text-[#64748B] text-xs">
                Use a strong password that is unique to your coordinator account.
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowPasswords(!showPasswords)}
            type="button"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#f5f3f6] text-[#475569] hover:text-[#002D71] font-label-md text-xs transition-colors self-start sm:self-auto cursor-pointer border border-[#E2E8F0]"
          >
            <span className="material-symbols-outlined text-[18px]">
              {showPasswords ? 'visibility_off' : 'visibility'}
            </span>
            <span>{showPasswords ? 'Hide passwords' : 'Show passwords'}</span>
          </button>
        </div>

        <div className="flex flex-col gap-4 pt-1">
          <div className="flex flex-col gap-1.5">
            <label className="font-label-md text-[#475569] font-medium text-xs">Current Password *</label>
            <input
              type={showPasswords ? 'text' : 'password'}
              value={currentPwd}
              onChange={(e) => setCurrentPwd(e.target.value)}
              placeholder="Enter current password"
              className="w-full h-11 px-3.5 rounded-xl bg-[#faf9fc] text-[#1E293B] text-sm focus:outline-none focus:bg-white border border-[#E2E8F0]"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-label-md text-[#475569] font-medium text-xs">New Password *</label>
            <input
              type={showPasswords ? 'text' : 'password'}
              value={newPwd}
              onChange={(e) => setNewPwd(e.target.value)}
              placeholder="Create a new password"
              className="w-full h-11 px-3.5 rounded-xl bg-[#faf9fc] text-[#1E293B] text-sm focus:outline-none focus:bg-white border border-[#E2E8F0]"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-label-md text-[#475569] font-medium text-xs">Confirm New Password *</label>
            <input
              type={showPasswords ? 'text' : 'password'}
              value={confirmPwd}
              onChange={(e) => setConfirmPwd(e.target.value)}
              placeholder="Confirm new password"
              className="w-full h-11 px-3.5 rounded-xl bg-[#faf9fc] text-[#1E293B] text-sm focus:outline-none focus:bg-white border border-[#E2E8F0]"
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-[#E2E8F0]">
          <p className="font-label-md text-[#64748B] text-xs max-w-[540px]">
            Password policy: at least 8 characters with uppercase, lowercase, and a number. Passwords are not stored in prototype data.
          </p>
          <button
            type="submit"
            className="shrink-0 inline-flex items-center gap-2 h-11 px-5 rounded-xl bg-[#002D71] text-white font-label-lg text-xs font-semibold hover:bg-[#164783] transition-colors shadow-xs cursor-pointer self-end sm:self-auto"
          >
            <span className="material-symbols-outlined text-[18px]">security</span>
            <span>Save Password</span>
          </button>
        </div>
      </form>

      {/* Card 4: Notification Preferences */}
      <div className="bg-white rounded-[20px] shadow-xs border border-[#E2E8F0] p-6 flex flex-col gap-6">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-[#FFF1E5] flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[#FD7A12] text-[22px]">notifications_active</span>
          </div>
          <div className="flex flex-col">
            <h2 className="font-headline-sm text-[#002D71] font-semibold leading-snug">
              Notification Preferences
            </h2>
            <p className="font-body-md text-[#64748B] text-xs">
              Choose which operational updates you want to receive.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4 pt-2">
          {/* Toggle 1: Proposal submitted */}
          <div className="flex items-center justify-between gap-4 p-3 rounded-xl hover:bg-[#f5f3f6] transition-colors">
            <div className="flex flex-col gap-0.5">
              <span className="font-label-lg text-[#002D71] font-semibold text-xs">Proposal submitted</span>
              <span className="font-body-md text-[#64748B] text-xs leading-relaxed">
                Alerts when student groups submit new capstone project proposals for initial committee review.
              </span>
            </div>
            <button
              onClick={() => toggleNotif('proposalSubmitted')}
              className={`w-12 h-6 rounded-full relative shrink-0 transition-colors focus:outline-none cursor-pointer ${
                notifications.proposalSubmitted ? 'bg-[#FD7A12]' : 'bg-[#CBD5E1]'
              }`}
              role="switch"
              type="button"
            >
              <span
                className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-xs transition-all duration-200 ${
                  notifications.proposalSubmitted ? 'left-6' : 'left-0.5'
                }`}
              />
            </button>
          </div>

          {/* Toggle 2: Group at risk */}
          <div className="flex items-center justify-between gap-4 p-3 rounded-xl hover:bg-[#f5f3f6] transition-colors">
            <div className="flex flex-col gap-0.5">
              <div className="flex items-center gap-2">
                <span className="font-label-lg text-[#002D71] font-semibold text-xs">Group at risk</span>
                <span className="px-2 py-0.5 rounded-full bg-[#FFF4DF] text-[#B26B00] font-eyebrow text-[10px] tracking-wide uppercase font-bold">
                  Academic notice
                </span>
              </div>
              <span className="font-body-md text-[#64748B] text-xs leading-relaxed">
                High-priority alert when automated rule-based health checks flag a project below 50 points or with missed check-ins.
              </span>
            </div>
            <button
              onClick={() => toggleNotif('groupAtRisk')}
              className={`w-12 h-6 rounded-full relative shrink-0 transition-colors focus:outline-none cursor-pointer ${
                notifications.groupAtRisk ? 'bg-[#FD7A12]' : 'bg-[#CBD5E1]'
              }`}
              role="switch"
              type="button"
            >
              <span
                className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-xs transition-all duration-200 ${
                  notifications.groupAtRisk ? 'left-6' : 'left-0.5'
                }`}
              />
            </button>
          </div>

          {/* Toggle 3: Marking completed */}
          <div className="flex items-center justify-between gap-4 p-3 rounded-xl hover:bg-[#f5f3f6] transition-colors">
            <div className="flex flex-col gap-0.5">
              <span className="font-label-lg text-[#002D71] font-semibold text-xs">Marking completed</span>
              <span className="font-body-md text-[#64748B] text-xs leading-relaxed">
                Notifications when supervisor or jury panelists finalize and submit milestone rubric marks.
              </span>
            </div>
            <button
              onClick={() => toggleNotif('markingCompleted')}
              className={`w-12 h-6 rounded-full relative shrink-0 transition-colors focus:outline-none cursor-pointer ${
                notifications.markingCompleted ? 'bg-[#FD7A12]' : 'bg-[#CBD5E1]'
              }`}
              role="switch"
              type="button"
            >
              <span
                className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-xs transition-all duration-200 ${
                  notifications.markingCompleted ? 'left-6' : 'left-0.5'
                }`}
              />
            </button>
          </div>

          {/* Toggle 4: Conflict of interest declared */}
          <div className="flex items-center justify-between gap-4 p-3 rounded-xl hover:bg-[#f5f3f6] transition-colors">
            <div className="flex flex-col gap-0.5">
              <span className="font-label-lg text-[#002D71] font-semibold text-xs">
                Conflict of interest declared
              </span>
              <span className="font-body-md text-[#64748B] text-xs leading-relaxed">
                Instant alert when faculty jury members trigger an automated conflict flag.
              </span>
            </div>
            <button
              onClick={() => toggleNotif('conflictDeclared')}
              className={`w-12 h-6 rounded-full relative shrink-0 transition-colors focus:outline-none cursor-pointer ${
                notifications.conflictDeclared ? 'bg-[#FD7A12]' : 'bg-[#CBD5E1]'
              }`}
              role="switch"
              type="button"
            >
              <span
                className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-xs transition-all duration-200 ${
                  notifications.conflictDeclared ? 'left-6' : 'left-0.5'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Card 5: Account Actions */}
      <div className="bg-white rounded-[20px] shadow-xs border border-[#E2E8F0] p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="font-headline-sm text-[#002D71] font-semibold text-sm">Session Management</h3>
          <p className="text-xs text-[#64748B] mt-0.5">Sign out of your active coordinator session.</p>
        </div>
        <button
          onClick={onSignOut}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#FDE8E6] text-[#C2392F] hover:bg-[#ffdad6] font-label-lg text-xs font-semibold transition-colors cursor-pointer"
          type="button"
        >
          <span className="material-symbols-outlined text-[18px]">logout</span>
          Sign Out of FYP360
        </button>
      </div>
    </div>
  );
}
