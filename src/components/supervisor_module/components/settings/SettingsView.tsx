import React, { useState } from 'react';

interface SettingsViewProps {
  onSignOut?: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({ onSignOut }) => {
  // Personal profile
  const [phone, setPhone] = useState('+92 300 9876543');
  const [profileSaved, setProfileSaved] = useState(false);

  // Expertise & availability
  const [expertiseTags, setExpertiseTags] = useState<string[]>([
    'Machine Learning',
    'Recommender Systems',
    'NLP',
  ]);
  const [newTagInput, setNewTagInput] = useState('');
  const [isAddingTag, setIsAddingTag] = useState(false);
  const [maxGroups, setMaxGroups] = useState(5);
  const [availableForNewGroups, setAvailableForNewGroups] = useState(true);

  // Weekly availability slots
  const [activeSlots, setActiveSlots] = useState<Record<string, boolean>>({
    'Mon-09:00 - 11:00': true,
    'Mon-11:00 - 13:00': true,
    'Mon-14:00 - 16:00': false,
    'Mon-16:00 - 18:00': false,
    'Tue-09:00 - 11:00': false,
    'Tue-11:00 - 13:00': true,
    'Tue-14:00 - 16:00': true,
    'Tue-16:00 - 18:00': false,
    'Wed-09:00 - 11:00': true,
    'Wed-11:00 - 13:00': false,
    'Wed-14:00 - 16:00': false,
    'Wed-16:00 - 18:00': true,
    'Thu-09:00 - 11:00': false,
    'Thu-11:00 - 13:00': true,
    'Thu-14:00 - 16:00': true,
    'Thu-16:00 - 18:00': false,
    'Fri-09:00 - 11:00': true,
    'Fri-11:00 - 13:00': false,
    'Fri-14:00 - 16:00': false,
    'Fri-16:00 - 18:00': false,
  });

  const toggleSlot = (key: string) => {
    setActiveSlots((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Password fields
  const [showPasswords, setShowPasswords] = useState(false);
  const [currentPwd, setCurrentPwd] = useState('');
  const [newPwd, setNewPwd] = useState('');
  const [confirmPwd, setConfirmPwd] = useState('');
  const [pwdMessage, setPwdMessage] = useState<string | null>(null);

  // Notification preferences
  const [notifPreferences, setNotifPreferences] = useState({
    newGroup: true,
    submission: true,
    deadlines: true,
    groupRisk: true,
  });
  const [notifSaved, setNotifSaved] = useState(false);

  const handleAddTag = () => {
    if (newTagInput.trim()) {
      setExpertiseTags([...expertiseTags, newTagInput.trim()]);
      setNewTagInput('');
      setIsAddingTag(false);
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setExpertiseTags(expertiseTags.filter((t) => t !== tagToRemove));
  };

  const handleSaveProfile = () => {
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 2500);
  };

  const handleSavePassword = () => {
    if (!currentPwd || !newPwd || !confirmPwd) {
      setPwdMessage('Please complete all password fields.');
      return;
    }
    if (newPwd !== confirmPwd) {
      setPwdMessage('New passwords do not match.');
      return;
    }
    setPwdMessage('Password successfully updated.');
    setCurrentPwd('');
    setNewPwd('');
    setConfirmPwd('');
    setTimeout(() => setPwdMessage(null), 3000);
  };

  const handleSaveNotifs = () => {
    setNotifSaved(true);
    setTimeout(() => setNotifSaved(false), 2500);
  };

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const dayPrefix = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
  const slots = [
    '09:00 - 11:00',
    '11:00 - 13:00',
    '14:00 - 16:00',
    '16:00 - 18:00',
  ];

  return (
    <div className="max-w-[940px] mx-auto p-10 pb-16 flex flex-col gap-6">
      {/* Page Header */}
      <div className="mb-2">
        <span className="text-xs font-bold text-[#FD7A12] uppercase tracking-wider block mb-1">
          SUPERVISOR ACCOUNT · KIET
        </span>
        <h1 className="text-4xl text-[#002D71] font-light tracking-tight leading-tight">
          Settings
        </h1>
        <p className="text-sm text-[#475569] mt-1">
          Manage your faculty profile, academic availability, account security, and notification preferences.
        </p>
      </div>

      <div className="flex flex-col gap-6 w-full">
        {/* Card 1: Personal Profile */}
        <section className="bg-white rounded-[20px] shadow-sm border border-[#E2E8F0] p-6 transition-all duration-200">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-10 h-10 rounded-xl bg-[#E0F2FE] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[#01B0F1] text-[22px]">
                badge
              </span>
            </div>
            <div>
              <h2 className="text-lg font-medium text-[#002D71]">
                Personal Profile
              </h2>
              <p className="text-sm text-[#475569]">
                Review your institutional faculty identity and update contact details.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            {/* Avatar Column */}
            <div className="md:col-span-3 flex flex-col items-center justify-center pt-2">
              <div className="w-24 h-24 rounded-2xl bg-[#E0F2FE] border border-[#01B0F1]/30 flex items-center justify-center text-[#002D71] text-2xl font-bold tracking-tight shadow-sm">
                AR
              </div>
              <button
                type="button"
                onClick={() => alert('Profile photo upload placeholder')}
                className="mt-3 text-xs text-[#01B0F1] font-semibold hover:underline cursor-pointer"
              >
                Update picture
              </button>
              <span className="text-[11px] text-[#475569] mt-1 text-center">
                Optional · JPG or PNG
              </span>
            </div>

            {/* Form Column */}
            <div className="md:col-span-9 grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-semibold text-[#1E293B] mb-2">
                  Full Name
                </label>
                <div className="relative flex items-center">
                  <input
                    disabled
                    type="text"
                    value="Dr. Ahmed Rahman"
                    className="w-full h-[52px] bg-[#F1F5F9] border border-[#E2E8F0] text-[#475569] rounded-xl px-4 pr-10 text-sm cursor-not-allowed"
                  />
                  <span className="material-symbols-outlined text-[#CBD5E1] absolute right-3 text-[18px]">
                    lock
                  </span>
                </div>
              </div>

              {/* Employee ID */}
              <div>
                <label className="block text-xs font-semibold text-[#1E293B] mb-2">
                  Employee ID
                </label>
                <div className="relative flex items-center">
                  <input
                    disabled
                    type="text"
                    value="FAC-014"
                    className="w-full h-[52px] bg-[#F1F5F9] border border-[#E2E8F0] text-[#475569] rounded-xl px-4 pr-10 text-sm cursor-not-allowed"
                  />
                  <span className="material-symbols-outlined text-[#CBD5E1] absolute right-3 text-[18px]">
                    lock
                  </span>
                </div>
                <p className="text-[11px] text-[#475569] mt-1.5 leading-snug">
                  Employee ID is assigned by the university registrar and cannot be changed.
                </p>
              </div>

              {/* University Email */}
              <div>
                <label className="block text-xs font-semibold text-[#1E293B] mb-2">
                  University Email
                </label>
                <div className="relative flex items-center">
                  <input
                    disabled
                    type="email"
                    value="ahmed.rahman@kiet.edu.pk"
                    className="w-full h-[52px] bg-[#F1F5F9] border border-[#E2E8F0] text-[#475569] rounded-xl px-4 pr-10 text-sm cursor-not-allowed"
                  />
                  <span className="material-symbols-outlined text-[#CBD5E1] absolute right-3 text-[18px]">
                    lock
                  </span>
                </div>
                <p className="text-[11px] text-[#475569] mt-1.5 leading-snug">
                  Contact KIET IT support if this institutional email requires correction.
                </p>
              </div>

              {/* Contact Number */}
              <div>
                <label className="block text-xs font-semibold text-[#1E293B] mb-2">
                  Contact Number (Optional)
                </label>
                <div className="relative flex items-center">
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full h-[52px] bg-white border border-[#E2E8F0] text-[#1E293B] rounded-xl px-4 text-sm shadow-xs focus:outline-none focus:ring-2 focus:ring-[#01B0F1]/40 focus:border-[#01B0F1] transition-all"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Footer Action Row */}
          <div className="mt-6 pt-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-[#F4F6F9] -mx-6 -mb-6 px-6 py-4 rounded-b-[20px] border-t border-[#E2E8F0]">
            <p className="text-xs text-[#475569] max-w-lg leading-relaxed">
              Name, Employee ID, and university email are institutionally managed. Contact faculty administration for identity corrections.
            </p>
            <button
              type="button"
              onClick={handleSaveProfile}
              className="inline-flex items-center gap-2 bg-[#002D71] hover:bg-[#003B8F] text-white h-11 px-6 rounded-xl text-xs font-semibold shadow-sm transition-all shrink-0 cursor-pointer"
            >
              <span>{profileSaved ? 'Profile Saved' : 'Save Profile'}</span>
              <span className="material-symbols-outlined text-[18px]">
                arrow_forward
              </span>
            </button>
          </div>
        </section>

        {/* Card 2: Expertise & Availability */}
        <section className="bg-white rounded-[20px] shadow-sm border border-[#E2E8F0] p-6 transition-all duration-200">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-10 h-10 rounded-xl bg-[#FFF4EB] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[#FD7A12] text-[22px]">
                psychology
              </span>
            </div>
            <div>
              <h2 className="text-lg font-medium text-[#002D71]">
                Expertise & availability
              </h2>
              <p className="text-sm text-[#475569]">
                Configure research focus areas and supervision quotas for capstone project matching.
              </p>
            </div>
          </div>

          {/* Section 1: Research Expertise */}
          <div className="mb-6">
            <span className="block text-xs font-semibold text-[#1E293B] mb-2.5">
              Research Expertise
            </span>
            <div className="flex flex-wrap items-center gap-2.5">
              {expertiseTags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1.5 bg-[#FFF4EB] text-[#FD7A12] px-3.5 py-1.5 rounded-full text-xs font-semibold border border-[#FD7A12]/30 shadow-xs"
                >
                  <span>{tag}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="hover:text-[#DC2626] text-[16px] leading-none material-symbols-outlined cursor-pointer"
                  >
                    close
                  </button>
                </span>
              ))}

              {isAddingTag ? (
                <div className="inline-flex items-center gap-1.5">
                  <input
                    type="text"
                    autoFocus
                    placeholder="Area name..."
                    value={newTagInput}
                    onChange={(e) => setNewTagInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleAddTag();
                      if (e.key === 'Escape') setIsAddingTag(false);
                    }}
                    className="h-8 px-3 rounded-full text-xs border border-[#FD7A12] focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleAddTag}
                    className="h-8 px-3 bg-[#FD7A12] text-white text-xs font-semibold rounded-full cursor-pointer"
                  >
                    Add
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsAddingTag(false)}
                    className="h-8 px-2 bg-slate-100 text-[#475569] text-xs rounded-full cursor-pointer"
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsAddingTag(true)}
                  className="inline-flex items-center gap-1 bg-[#F1F5F9] hover:bg-[#E2E8F0] text-[#475569] hover:text-[#002D71] px-3 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">
                    add
                  </span>
                  <span>Add field</span>
                </button>
              )}
            </div>
          </div>

          {/* Section 2: Supervision Capacity */}
          <div className="mb-6 bg-white border border-[#E2E8F0] p-4 rounded-xl shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#1E293B]">
                  Maximum groups
                </label>
                <p className="text-xs text-[#01B0F1] font-semibold mt-0.5">
                  Current allocation: 4 active groups
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="inline-flex items-center bg-[#F1F5F9] rounded-xl p-1 shadow-inner border border-[#E2E8F0]">
                  <button
                    type="button"
                    onClick={() => setMaxGroups(Math.max(1, maxGroups - 1))}
                    className="w-8 h-8 rounded-lg bg-white hover:bg-slate-50 text-[#002D71] flex items-center justify-center shadow-xs transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[16px]">
                      remove
                    </span>
                  </button>
                  <span className="w-10 text-center text-lg text-[#002D71] font-semibold">
                    {maxGroups}
                  </span>
                  <button
                    type="button"
                    onClick={() => setMaxGroups(Math.min(15, maxGroups + 1))}
                    className="w-8 h-8 rounded-lg bg-white hover:bg-slate-50 text-[#002D71] flex items-center justify-center shadow-xs transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[16px]">
                      add
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Weekly Availability */}
          <div className="mb-6">
            <span className="block text-xs font-semibold text-[#1E293B] mb-3">
              Weekly Availability
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {days.map((dayName, dIdx) => {
                const prefix = dayPrefix[dIdx];
                return (
                  <div
                    key={dayName}
                    className="bg-[#F4F6F9] border border-[#E2E8F0] rounded-xl p-3 flex flex-col gap-2"
                  >
                    <span className="text-[11px] font-bold uppercase text-[#475569] text-center block">
                      {dayName}
                    </span>
                    {slots.map((slot) => {
                      const key = `${prefix}-${slot}`;
                      const isSelected = !!activeSlots[key];
                      return (
                        <button
                          key={key}
                          type="button"
                          onClick={() => toggleSlot(key)}
                          className={`text-center text-xs py-1.5 px-2 rounded-lg font-medium transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-[#002D71] text-white shadow-xs font-semibold'
                              : 'bg-white border border-[#E2E8F0] text-[#475569] hover:bg-slate-50'
                          }`}
                        >
                          {slot}
                        </button>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section 4: General Toggle */}
          <div className="flex items-center justify-between py-2 mb-4 border-t border-[#E2E8F0] pt-4">
            <div>
              <span className="text-xs font-semibold text-[#1E293B] block">
                Available for new groups
              </span>
              <span className="text-xs text-[#475569] block mt-0.5">
                Allow the FYP Coordinator to allocate groups for the upcoming semester.
              </span>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={availableForNewGroups}
              onClick={() => setAvailableForNewGroups(!availableForNewGroups)}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out focus:outline-none ${
                availableForNewGroups ? 'bg-[#FD7A12]' : 'bg-[#CBD5E1]'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out mt-0.5 ml-0.5 ${
                  availableForNewGroups ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Advisory Banner Notice */}
          <div className="bg-[#E0F2FE]/70 border border-[#01B0F1]/30 rounded-xl px-4 py-3 flex items-center gap-2.5">
            <span className="material-symbols-outlined text-[#01B0F1] text-[20px] shrink-0">
              verified_user
            </span>
            <span className="text-xs text-[#002D71] font-medium">
              Used by the Coordinator for advisory supervisor matching only.
            </span>
          </div>
        </section>

        {/* Card 3: Account Security */}
        <section className="bg-white rounded-[20px] shadow-sm border border-[#E2E8F0] p-6 transition-all duration-200">
          <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#E0F2FE] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[#002D71] text-[22px]">
                  lock_reset
                </span>
              </div>
              <div>
                <h2 className="text-lg font-medium text-[#002D71]">
                  Account Security
                </h2>
                <p className="text-sm text-[#475569]">
                  Use a strong password that is unique to your university account.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setShowPasswords(!showPasswords)}
              className="inline-flex items-center gap-1.5 text-xs text-[#475569] hover:text-[#002D71] transition-colors py-1.5 px-3 rounded-lg hover:bg-slate-100 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">
                {showPasswords ? 'visibility_off' : 'visibility'}
              </span>
              <span>{showPasswords ? 'Hide passwords' : 'Show passwords'}</span>
            </button>
          </div>

          {pwdMessage && (
            <div className="mb-4 p-3 rounded-xl bg-[#DCFCE7] text-[#16A34A] text-xs font-semibold border border-[#16A34A]/30">
              {pwdMessage}
            </div>
          )}

          {/* Password Fields */}
          <div className="flex flex-col gap-4 max-w-2xl">
            <div>
              <label className="block text-xs font-semibold text-[#1E293B] mb-2">
                Current Password *
              </label>
              <input
                type={showPasswords ? 'text' : 'password'}
                placeholder="Enter current password"
                value={currentPwd}
                onChange={(e) => setCurrentPwd(e.target.value)}
                className="w-full h-[52px] bg-white border border-[#E2E8F0] text-[#1E293B] rounded-xl px-4 text-sm shadow-xs focus:outline-none focus:ring-2 focus:ring-[#01B0F1]/40 focus:border-[#01B0F1] transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#1E293B] mb-2">
                New Password *
              </label>
              <input
                type={showPasswords ? 'text' : 'password'}
                placeholder="Create a new password"
                value={newPwd}
                onChange={(e) => setNewPwd(e.target.value)}
                className="w-full h-[52px] bg-white border border-[#E2E8F0] text-[#1E293B] rounded-xl px-4 text-sm shadow-xs focus:outline-none focus:ring-2 focus:ring-[#01B0F1]/40 focus:border-[#01B0F1] transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#1E293B] mb-2">
                Confirm New Password *
              </label>
              <input
                type={showPasswords ? 'text' : 'password'}
                placeholder="Confirm new password"
                value={confirmPwd}
                onChange={(e) => setConfirmPwd(e.target.value)}
                className="w-full h-[52px] bg-white border border-[#E2E8F0] text-[#1E293B] rounded-xl px-4 text-sm shadow-xs focus:outline-none focus:ring-2 focus:ring-[#01B0F1]/40 focus:border-[#01B0F1] transition-all"
              />
            </div>
          </div>

          {/* Footer Action Row */}
          <div className="mt-6 pt-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-[#F4F6F9] -mx-6 -mb-6 px-6 py-4 rounded-b-[20px] border-t border-[#E2E8F0]">
            <p className="text-xs text-[#475569] max-w-lg leading-relaxed">
              Password policy: at least 8 characters with uppercase, lowercase, and a number.
            </p>
            <button
              type="button"
              onClick={handleSavePassword}
              className="inline-flex items-center gap-2 bg-[#002D71] hover:bg-[#003B8F] text-white h-11 px-6 rounded-xl text-xs font-semibold shadow-sm transition-all shrink-0 cursor-pointer"
            >
              <span>Save Password</span>
            </button>
          </div>
        </section>

        {/* Card 4: Notification Preferences */}
        <section className="bg-white rounded-[20px] shadow-sm border border-[#E2E8F0] p-6 transition-all duration-200">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-10 h-10 rounded-xl bg-[#FFF4EB] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[#FD7A12] text-[22px]">
                notifications_active
              </span>
            </div>
            <div>
              <h2 className="text-lg font-medium text-[#002D71]">
                Notification Preferences
              </h2>
              <p className="text-sm text-[#475569]">
                Choose which operational updates you want to receive.
              </p>
            </div>
          </div>

          {/* Toggles List */}
          <div className="flex flex-col space-y-4">
            {/* Row 1 */}
            <div className="flex items-center justify-between py-2">
              <div className="pr-4">
                <span className="text-xs font-semibold text-[#1E293B] block">
                  New group assigned
                </span>
                <span className="text-xs text-[#475569] block mt-0.5">
                  When the Coordinator allocates a new student group to your supervision.
                </span>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={notifPreferences.newGroup}
                onClick={() =>
                  setNotifPreferences((p) => ({ ...p, newGroup: !p.newGroup }))
                }
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out focus:outline-none ${
                  notifPreferences.newGroup ? 'bg-[#FD7A12]' : 'bg-[#CBD5E1]'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out mt-0.5 ml-0.5 ${
                    notifPreferences.newGroup ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Row 2 */}
            <div className="flex items-center justify-between py-2">
              <div className="pr-4">
                <span className="text-xs font-semibold text-[#1E293B] block">
                  Submission received
                </span>
                <span className="text-xs text-[#475569] block mt-0.5">
                  Instant alerts when student groups submit milestone deliverables.
                </span>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={notifPreferences.submission}
                onClick={() =>
                  setNotifPreferences((p) => ({
                    ...p,
                    submission: !p.submission,
                  }))
                }
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out focus:outline-none ${
                  notifPreferences.submission ? 'bg-[#FD7A12]' : 'bg-[#CBD5E1]'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out mt-0.5 ml-0.5 ${
                    notifPreferences.submission ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Row 3 */}
            <div className="flex items-center justify-between py-2">
              <div className="pr-4">
                <span className="text-xs font-semibold text-[#1E293B] block">
                  Deadline reminders
                </span>
                <span className="text-xs text-[#475569] block mt-0.5">
                  Reminders before milestone cutoffs and supervisor review windows.
                </span>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={notifPreferences.deadlines}
                onClick={() =>
                  setNotifPreferences((p) => ({
                    ...p,
                    deadlines: !p.deadlines,
                  }))
                }
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out focus:outline-none ${
                  notifPreferences.deadlines ? 'bg-[#FD7A12]' : 'bg-[#CBD5E1]'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out mt-0.5 ml-0.5 ${
                    notifPreferences.deadlines ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Row 4 */}
            <div className="flex items-center justify-between py-2">
              <div className="pr-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-[#1E293B]">
                    Group at risk alerts
                  </span>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] bg-[#FEF3C7] text-[#B45309] font-medium leading-none">
                    Academic notice
                  </span>
                </div>
                <span className="text-xs text-[#475569] block mt-0.5">
                  Alerts when a group triggers risk thresholds or missed check-ins.
                </span>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={notifPreferences.groupRisk}
                onClick={() =>
                  setNotifPreferences((p) => ({
                    ...p,
                    groupRisk: !p.groupRisk,
                  }))
                }
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out focus:outline-none ${
                  notifPreferences.groupRisk ? 'bg-[#FD7A12]' : 'bg-[#CBD5E1]'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out mt-0.5 ml-0.5 ${
                    notifPreferences.groupRisk ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Policy Note */}
          <div className="mt-6 p-3 bg-[#F4F6F9] border border-[#E2E8F0] rounded-xl flex items-center gap-2.5">
            <span className="material-symbols-outlined text-[#01B0F1] text-[18px] shrink-0">
              info
            </span>
            <span className="text-xs text-[#475569]">
              Disabling a notification does not remove official academic or administrative records from the portal.
            </span>
          </div>

          {/* Footer Action Row */}
          <div className="mt-6 pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-end bg-[#F4F6F9] -mx-6 -mb-6 px-6 py-4 rounded-b-[20px] border-t border-[#E2E8F0]">
            <button
              type="button"
              onClick={handleSaveNotifs}
              className="inline-flex items-center gap-2 bg-[#002D71] hover:bg-[#003B8F] text-white h-11 px-6 rounded-xl text-xs font-semibold shadow-sm transition-all cursor-pointer"
            >
              <span>
                {notifSaved ? 'Preferences Saved' : 'Save Notification Preferences'}
              </span>
            </button>
          </div>
        </section>

        {/* Card 5: Account Actions */}
        <section className="bg-white rounded-[20px] shadow-sm border border-[#E2E8F0] p-6 transition-all duration-200">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-10 h-10 rounded-xl bg-[#E0F2FE] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[#002D71] text-[22px]">
                manage_accounts
              </span>
            </div>
            <div>
              <h2 className="text-lg font-medium text-[#002D71]">
                Account Actions
              </h2>
              <p className="text-sm text-[#475569]">
                Session management and security sign out.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between py-2">
            <div>
              <span className="text-xs font-semibold text-[#1E293B] block">
                Sign Out
              </span>
              <span className="text-xs text-[#475569] block mt-0.5">
                End your current KIET FYP360 supervisor session.
              </span>
            </div>
            <button
              type="button"
              onClick={() => (onSignOut ? onSignOut() : alert('Signed out of supervisor portal.'))}
              className="h-10 px-5 rounded-xl text-xs font-semibold bg-[#FEE2E2] text-[#DC2626] hover:bg-[#FEE2E2]/80 transition-colors shadow-xs cursor-pointer"
            >
              Sign Out
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};
