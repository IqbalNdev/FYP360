import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  User,
  Shield,
  Bell,
  HelpCircle,
  LogOut,
  Lock,
  Eye,
  EyeOff,
  CheckCircle2,
  Mail,
  Phone,
  Building
} from 'lucide-react';

export const SettingsScreen: React.FC = () => {
  const { currentUser, updateStudentProfile, showToast, setCurrentScreen } = useApp();

  const [phone, setPhone] = useState(currentUser.phone || '+92 300 1234567');
  const [showPasswords, setShowPasswords] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // 6 Notification toggles
  const [notifications, setNotifications] = useState({
    tasks: true,
    deadlines: true,
    overdue: true,
    feedback: true,
    results: true,
    announcements: false,
  });

  const handleToggleNotification = (key: keyof typeof notifications) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateStudentProfile(phone);
  };

  const handleSavePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword) {
      showToast('Please enter current password', 'warning');
      return;
    }
    if (newPassword !== confirmPassword) {
      showToast('Passwords do not match', 'error');
      return;
    }
    showToast('Password updated successfully', 'success');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleSaveNotifications = () => {
    showToast('Notification preferences saved', 'success');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-20 animate-in fade-in duration-150">
      {/* Header */}
      <div className="border-b border-slate-200 pb-4">
        <div className="text-[11px] font-bold text-[#64748B] tracking-widest uppercase">
          STUDENT ACCOUNT
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#1E293B] mt-0.5">Settings</h1>
        <p className="text-sm text-[#64748B]">
          Manage your profile, account security, and notification preferences.
        </p>
      </div>

      {/* 1. Personal Profile Card */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-xs space-y-6">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <User className="w-4 h-4 text-[#002D71]" />
          <h3 className="text-base font-bold text-[#1E293B]">Personal Profile</h3>
        </div>

        <form onSubmit={handleSaveProfile} className="space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-[#E2E8F0] text-[#002D71] flex items-center justify-center font-bold text-xl shrink-0 border border-slate-300">
              {currentUser.initials}
            </div>
            <div>
              <button
                type="button"
                onClick={() => showToast('Avatar picture picker opened', 'info')}
                className="px-3 py-1.5 border border-slate-300 text-slate-700 text-xs font-semibold rounded-lg hover:bg-slate-50 transition-colors"
              >
                Update picture
              </button>
              <p className="text-[11px] text-slate-400 mt-1">Optional · JPG or PNG</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Full Name</label>
              <input
                type="text"
                disabled
                value={currentUser.name}
                className="w-full px-3.5 py-2 text-xs rounded-lg border border-slate-300 bg-slate-50 text-slate-600 cursor-not-allowed"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-bold text-slate-700">Student ID</label>
                <Lock className="w-3.5 h-3.5 text-slate-400" />
              </div>
              <input
                type="text"
                disabled
                value={currentUser.studentId || 'NUST-CS-DEMO-001'}
                className="w-full px-3.5 py-2 text-xs font-mono rounded-lg border border-slate-300 bg-slate-50 text-slate-600 cursor-not-allowed"
              />
              <span className="text-[10px] text-slate-400 mt-0.5 block">
                Student ID is assigned by the university and cannot be changed.
              </span>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-bold text-slate-700">University Email</label>
                <Lock className="w-3.5 h-3.5 text-slate-400" />
              </div>
              <input
                type="email"
                disabled
                value={currentUser.email}
                className="w-full px-3.5 py-2 text-xs rounded-lg border border-slate-300 bg-slate-50 text-slate-600 cursor-not-allowed"
              />
              <span className="text-[10px] text-slate-400 mt-0.5 block">
                Contact university IT support if this institutional email requires correction.
              </span>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Contact Number (Optional)
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+92 300 1234567"
                className="w-full px-3.5 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#002D71]"
              />
            </div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-slate-100">
            <span className="text-[11px] text-slate-500">
              Name, Student ID, and university email are institutionally managed. Contact university
              administration for identity corrections.
            </span>
            <button
              type="submit"
              className="px-5 py-2 bg-[#002D71] text-white text-xs font-semibold rounded-lg hover:bg-[#003B85] transition-colors shrink-0 shadow-xs"
            >
              Save Profile
            </button>
          </div>
        </form>
      </div>

      {/* 2. Account Security Card */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-xs space-y-5">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-[#002D71]" />
            <h3 className="text-base font-bold text-[#1E293B]">Account Security</h3>
          </div>
          <button
            type="button"
            onClick={() => setShowPasswords(!showPasswords)}
            className="flex items-center gap-1.5 text-xs text-slate-600 hover:text-slate-900"
          >
            {showPasswords ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            <span>{showPasswords ? 'Hide passwords' : 'Show passwords'}</span>
          </button>
        </div>

        <form onSubmit={handleSavePassword} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Current Password *
            </label>
            <input
              type={showPasswords ? 'text' : 'password'}
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Enter current password"
              className="w-full px-3.5 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#002D71]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">New Password *</label>
              <input
                type={showPasswords ? 'text' : 'password'}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Create a new password"
                className="w-full px-3.5 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#002D71]"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Confirm New Password *
              </label>
              <input
                type={showPasswords ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                className="w-full px-3.5 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#002D71]"
              />
            </div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-slate-100">
            <span className="text-[11px] text-slate-500">
              Password policy: at least 8 characters with uppercase, lowercase, and a number.
              Passwords are not stored in prototype data.
            </span>
            <button
              type="submit"
              className="px-5 py-2 bg-[#002D71] text-white text-xs font-semibold rounded-lg hover:bg-[#003B85] transition-colors shrink-0 shadow-xs"
            >
              Save Password
            </button>
          </div>
        </form>
      </div>

      {/* 3. Notification Preferences Card */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-xs space-y-5">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <Bell className="w-4 h-4 text-[#002D71]" />
          <h3 className="text-base font-bold text-[#1E293B]">Notification Preferences</h3>
        </div>

        <p className="text-xs text-[#64748B]">
          Choose which optional reminders and alerts you want to receive.
        </p>

        <div className="space-y-4 pt-1">
          {/* Toggle 1 */}
          <div className="flex items-center justify-between py-2 border-b border-slate-100">
            <div>
              <h4 className="text-xs font-bold text-slate-900">Task Assignment Notifications</h4>
              <p className="text-[11px] text-slate-500">New assignments added by your supervisor.</p>
            </div>
            <button
              type="button"
              onClick={() => handleToggleNotification('tasks')}
              className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                notifications.tasks ? 'bg-[#002D71]' : 'bg-slate-300'
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                  notifications.tasks ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Toggle 2 */}
          <div className="flex items-center justify-between py-2 border-b border-slate-100">
            <div>
              <h4 className="text-xs font-bold text-slate-900">Upcoming Deadline Reminders</h4>
              <p className="text-[11px] text-slate-500">Reminders before milestone and task deadlines.</p>
            </div>
            <button
              type="button"
              onClick={() => handleToggleNotification('deadlines')}
              className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                notifications.deadlines ? 'bg-[#002D71]' : 'bg-slate-300'
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                  notifications.deadlines ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Toggle 3 */}
          <div className="flex items-center justify-between py-2 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-xs font-bold text-slate-900">Overdue Task Alerts</h4>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-[#FFF4DF] text-[#B26B00]">
                  Academic notice
                </span>
              </div>
              <p className="text-[11px] text-slate-500">Alerts when required work passes its deadline.</p>
            </div>
            <button
              type="button"
              onClick={() => handleToggleNotification('overdue')}
              className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                notifications.overdue ? 'bg-[#002D71]' : 'bg-slate-300'
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                  notifications.overdue ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Toggle 4 */}
          <div className="flex items-center justify-between py-2 border-b border-slate-100">
            <div>
              <h4 className="text-xs font-bold text-slate-900">Supervisor Feedback Notifications</h4>
              <p className="text-[11px] text-slate-500">Comments, acceptance decisions, and revision requests.</p>
            </div>
            <button
              type="button"
              onClick={() => handleToggleNotification('feedback')}
              className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                notifications.feedback ? 'bg-[#002D71]' : 'bg-slate-300'
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                  notifications.feedback ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Toggle 5 */}
          <div className="flex items-center justify-between py-2 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-xs font-bold text-slate-900">Evaluation Result Notifications</h4>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-[#FFF4DF] text-[#B26B00]">
                  Academic notice
                </span>
              </div>
              <p className="text-[11px] text-slate-500">Officially published FYP1 and FYP2 results.</p>
            </div>
            <button
              type="button"
              onClick={() => handleToggleNotification('results')}
              className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                notifications.results ? 'bg-[#002D71]' : 'bg-slate-300'
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                  notifications.results ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Toggle 6 */}
          <div className="flex items-center justify-between py-2">
            <div>
              <h4 className="text-xs font-bold text-slate-900">General University Announcements</h4>
              <p className="text-[11px] text-slate-500">Optional FYP related news and informational updates.</p>
            </div>
            <button
              type="button"
              onClick={() => handleToggleNotification('announcements')}
              className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                notifications.announcements ? 'bg-[#002D71]' : 'bg-slate-300'
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                  notifications.announcements ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-slate-100">
          <span className="text-[11px] text-slate-500">
            Disabling a notification does not remove official academic or administrative information
            from the portal. Critical notices remain subject to university policy.
          </span>
          <button
            type="button"
            onClick={handleSaveNotifications}
            className="px-5 py-2 bg-[#002D71] text-white text-xs font-semibold rounded-lg hover:bg-[#003B85] transition-colors shrink-0 shadow-xs"
          >
            Save Notification Preferences
          </button>
        </div>
      </div>

      {/* 4. Account Actions Card */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <Building className="w-4 h-4 text-[#002D71]" />
          <h3 className="text-base font-bold text-[#1E293B]">Account Actions</h3>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-2 border-b border-slate-100">
          <div>
            <h4 className="text-xs font-bold text-slate-900">University Support</h4>
            <p className="text-[11px] text-slate-500">
              Find the correct official service for account, identity, or academic assistance.
            </p>
          </div>
          <button
            type="button"
            onClick={() => showToast('Opening University IT Help Desk support portal', 'info')}
            className="px-4 py-2 border border-slate-300 text-slate-700 text-xs font-semibold rounded-lg hover:bg-slate-50 transition-colors self-start sm:self-auto"
          >
            Contact University Support
          </button>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-2">
          <div>
            <h4 className="text-xs font-bold text-[#C2392F]">Sign Out</h4>
            <p className="text-[11px] text-slate-500">End your current FYP360 student session.</p>
          </div>
          <button
            type="button"
            onClick={() => {
              setCurrentScreen('auth-signin');
              showToast('Signed out of session', 'info');
            }}
            className="px-4 py-2 bg-rose-50 border border-rose-200 text-[#C2392F] text-xs font-semibold rounded-lg hover:bg-rose-100 transition-colors self-start sm:self-auto"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};
