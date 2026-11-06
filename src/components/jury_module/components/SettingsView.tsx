import React, { useState } from 'react';
import { userProfileData } from '../data/mockData';

interface SettingsViewProps {
  showToast: (msg: string) => void;
  onSignOut: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({ showToast, onSignOut }) => {
  const [phone, setPhone] = useState(userProfileData.phone);
  const [expertise, setExpertise] = useState<string[]>(userProfileData.expertise);
  const [newTagInput, setNewTagInput] = useState('');
  const [isAddingTag, setIsAddingTag] = useState(false);

  // Slots availability state (Mon-Fri)
  const [slots, setSlots] = useState<{
    [day: string]: { morning: boolean; afternoon: boolean };
  }>({ ...userProfileData.slotAvailability });

  const [availableForJury, setAvailableForJury] = useState(userProfileData.availableForJury);
  const [maxProjects, setMaxProjects] = useState(userProfileData.maxProjectsPerSession);

  // Security
  const [showPasswords, setShowPasswords] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Notifications
  const [notifNewProject, setNotifNewProject] = useState(true);
  const [notifReminder, setNotifReminder] = useState(true);
  const [notifResults, setNotifResults] = useState(true);

  // Support / Signout Modals
  const [supportModalOpen, setSupportModalOpen] = useState(false);
  const [signOutModalOpen, setSignOutModalOpen] = useState(false);

  const toggleSlot = (day: string, time: 'morning' | 'afternoon') => {
    setSlots((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [time]: !prev[day][time],
      },
    }));
  };

  const handleAddExpertise = () => {
    if (newTagInput.trim() && !expertise.includes(newTagInput.trim())) {
      setExpertise([...expertise, newTagInput.trim()]);
      setNewTagInput('');
      setIsAddingTag(false);
      showToast('Subject expertise updated');
    }
  };

  const handleRemoveExpertise = (tag: string) => {
    setExpertise(expertise.filter((t) => t !== tag));
  };

  const handleSaveProfile = () => {
    showToast('Personal profile contact details saved');
  };

  const handleSavePassword = () => {
    if (!currentPassword) {
      showToast('Please enter your current password');
      return;
    }
    if (newPassword.length < 8) {
      showToast('New password must be at least 8 characters');
      return;
    }
    if (newPassword !== confirmPassword) {
      showToast('New passwords do not match');
      return;
    }
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    showToast('Faculty password updated successfully');
  };

  const handleSaveNotifications = () => {
    showToast('Notification preferences saved');
  };

  return (
    <div className="w-full max-w-[940px] mx-auto px-6 lg:px-10 py-10 flex flex-col gap-6 pb-28">
      {/* PAGE HEADER */}
      <div className="flex flex-col gap-1">
        <span className="font-eyebrow text-[12px] text-kiet-orange font-bold tracking-widest uppercase">
          JURY ACCOUNT · KIET
        </span>
        <h1 className="font-headline-xl text-[40px] text-primary font-light tracking-tight">
          Settings
        </h1>
        <p className="font-body-md text-[14px] text-muted-text mt-1">
          Manage your faculty profile, expertise parameters, defense availability, and notification preferences.
        </p>
      </div>

      {/* 1. PERSONAL PROFILE CARD */}
      <div className="bg-card-surface rounded-[20px] shadow-sm p-6 lg:p-7 flex flex-col gap-6 border border-card-border">
        <div className="flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl bg-secondary-container flex items-center justify-center text-secondary shrink-0">
            <span className="material-symbols-outlined text-[24px]">person</span>
          </div>
          <div className="flex flex-col">
            <h2 className="font-headline-sm text-[18px] text-primary font-medium">
              Personal Profile
            </h2>
            <p className="font-body-md text-[13px] text-muted-text">
              Review your institutional identity and update permitted contact details.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-1">
          {/* Left: Avatar Column */}
          <div className="md:col-span-4 flex flex-col items-center justify-start gap-2 pt-2">
            <div className="w-28 h-28 rounded-[24px] bg-surface-container flex items-center justify-center text-primary font-headline-md font-semibold text-[24px] shadow-inner border border-card-border">
              SF
            </div>
            <button
              type="button"
              onClick={() => showToast('Profile photo update modal opened')}
              className="mt-2 px-4 py-2 bg-surface-container hover:bg-surface-container-high text-primary font-label-lg text-[13px] rounded-lg transition-colors cursor-pointer border border-card-border"
            >
              Update picture
            </button>
            <span className="font-label-md text-[12px] text-muted-text">
              Optional · JPG or PNG
            </span>
          </div>

          {/* Right: Inputs Column */}
          <div className="md:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="font-label-md text-[12px] text-muted-text">Full Name</label>
              <div className="h-[52px] px-4 bg-surface-container rounded-xl flex items-center justify-between text-on-surface border border-card-border">
                <span className="font-body-md text-[14px] font-medium">Dr. Sana Farooq</span>
                <span className="material-symbols-outlined text-[18px] text-muted-text">lock</span>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-label-md text-[12px] text-muted-text">Employee ID</label>
              <div className="h-[52px] px-4 bg-surface-container rounded-xl flex items-center justify-between text-on-surface border border-card-border">
                <span className="font-body-md text-[14px] font-medium">FAC-SE-2018-019</span>
                <span className="material-symbols-outlined text-[18px] text-muted-text">lock</span>
              </div>
              <span className="font-label-md text-[11px] text-muted-text leading-tight">
                Assigned by KIET administration and cannot be changed.
              </span>
            </div>

            <div className="flex flex-col gap-1.5 md:col-span-2">
              <label className="font-label-md text-[12px] text-muted-text">University Email</label>
              <div className="h-[52px] px-4 bg-surface-container rounded-xl flex items-center justify-between text-on-surface border border-card-border">
                <span className="font-body-md text-[14px] font-medium">
                  sana.farooq@kiet.edu.pk
                </span>
                <span className="material-symbols-outlined text-[18px] text-muted-text">lock</span>
              </div>
            </div>

            <div className="flex flex-col gap-1.5 md:col-span-2">
              <label
                className="font-label-md text-[12px] text-on-surface font-medium"
                htmlFor="contact-input"
              >
                Contact Number (Editable)
              </label>
              <div className="relative">
                <input
                  id="contact-input"
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full h-[52px] px-4 bg-card-surface rounded-xl text-on-surface font-body-md text-[14px] focus:outline-none focus:ring-2 focus:ring-kiet-orange/40 focus:border-kiet-orange border border-card-border shadow-xs transition-all"
                />
                <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-[18px] text-muted-text">
                  edit
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-card-border/60">
          <p className="font-label-md text-[12px] text-muted-text max-w-[560px]">
            Name, Employee ID, and university email are institutionally managed. Contact KIET faculty administration for identity corrections.
          </p>
          <button
            type="button"
            onClick={handleSaveProfile}
            className="w-full sm:w-auto h-11 px-6 bg-kiet-navy hover:bg-sidebar-navy-gradient text-white font-label-lg text-[13px] rounded-xl flex items-center justify-center gap-2 shadow-xs transition-all shrink-0 cursor-pointer"
          >
            <span>Save Profile</span>
            <span className="material-symbols-outlined text-[18px] text-kiet-cyan">arrow_forward</span>
          </button>
        </div>
      </div>

      {/* 2. EXPERTISE & AVAILABILITY CARD */}
      <div className="bg-card-surface rounded-[20px] shadow-sm p-6 lg:p-7 flex flex-col gap-6 border border-card-border">
        <div className="flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl bg-secondary-container flex items-center justify-center text-secondary shrink-0">
            <span className="material-symbols-outlined text-[24px]">auto_awesome</span>
          </div>
          <div className="flex flex-col">
            <h2 className="font-headline-sm text-[18px] text-primary font-medium">
              Expertise &amp; availability
            </h2>
            <p className="font-body-md text-[13px] text-muted-text">
              Define your subject-matter domains and defense slot availability.
            </p>
          </div>
        </div>

        {/* Section 1: Subject-matter expertise tags */}
        <div className="flex flex-col gap-2 pt-1">
          <span className="font-label-lg text-[13px] text-primary font-semibold">
            Declared Research &amp; Subject Expertise
          </span>
          <div className="flex flex-wrap gap-2.5 items-center">
            {expertise.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-secondary-container text-primary font-label-md text-[12px] font-semibold shadow-2xs border border-secondary/30 group"
              >
                <span className="material-symbols-outlined text-[16px] text-secondary">check_circle</span>
                <span>{tag}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveExpertise(tag)}
                  className="opacity-60 hover:opacity-100 transition-opacity ml-0.5 cursor-pointer text-muted-text hover:text-danger-text"
                  title="Remove domain"
                >
                  <span className="material-symbols-outlined text-[14px]">close</span>
                </button>
              </span>
            ))}

            {isAddingTag ? (
              <div className="inline-flex items-center gap-1 bg-surface-container px-2 py-1 rounded-full border border-card-border">
                <input
                  type="text"
                  value={newTagInput}
                  onChange={(e) => setNewTagInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddExpertise()}
                  placeholder="New domain name..."
                  autoFocus
                  className="bg-transparent text-[12px] text-on-surface outline-none w-36 px-1"
                />
                <button
                  type="button"
                  onClick={handleAddExpertise}
                  className="text-kiet-orange font-semibold text-[12px] px-1 hover:underline cursor-pointer"
                >
                  Add
                </button>
                <button
                  type="button"
                  onClick={() => setIsAddingTag(false)}
                  className="text-muted-text text-[12px] px-1 cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setIsAddingTag(true)}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-surface-container hover:bg-surface-container-high text-muted-text hover:text-primary font-label-md text-[12px] transition-colors cursor-pointer border border-card-border"
              >
                <span className="material-symbols-outlined text-[16px]">add</span>
                <span>Add expertise domain</span>
              </button>
            )}
          </div>
        </div>

        {/* Section 2: Availability grid (Monday to Friday) */}
        <div className="flex flex-col gap-2 pt-2">
          <div className="flex items-center justify-between">
            <span className="font-label-lg text-[13px] text-primary font-semibold">
              Defense Session Slot Availability (Spring 2025)
            </span>
            <span className="font-label-md text-[12px] text-muted-text">
              Click slot to toggle state
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
            {(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'] as const).map((day) => {
              const daySlots = slots[day] || { morning: false, afternoon: false };

              return (
                <div
                  key={day}
                  className="bg-surface-container rounded-xl p-3 flex flex-col gap-2 border border-card-border"
                >
                  <span className="font-eyebrow text-[11px] text-primary uppercase text-center block font-semibold">
                    {day}
                  </span>

                  {/* Morning */}
                  <button
                    type="button"
                    onClick={() => toggleSlot(day, 'morning')}
                    className={`w-full py-2 px-2 rounded-lg text-center font-label-md text-[12px] flex flex-col items-center gap-0.5 transition-all cursor-pointer ${
                      daySlots.morning
                        ? 'bg-secondary-container text-kiet-navy border border-secondary/40 shadow-2xs font-semibold'
                        : 'bg-surface-container-high text-muted-text hover:bg-surface-container-highest'
                    }`}
                  >
                    <span>09:00 - 12:00</span>
                    {daySlots.morning ? (
                      <span className="text-[11px] font-medium flex items-center gap-1 text-secondary">
                        <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                        Available
                      </span>
                    ) : (
                      <span className="text-[11px] font-medium">Unavailable</span>
                    )}
                  </button>

                  {/* Afternoon */}
                  <button
                    type="button"
                    onClick={() => toggleSlot(day, 'afternoon')}
                    className={`w-full py-2 px-2 rounded-lg text-center font-label-md text-[12px] flex flex-col items-center gap-0.5 transition-all cursor-pointer ${
                      daySlots.afternoon
                        ? 'bg-secondary-container text-kiet-navy border border-secondary/40 shadow-2xs font-semibold'
                        : 'bg-surface-container-high text-muted-text hover:bg-surface-container-highest'
                    }`}
                  >
                    <span>01:00 - 05:00</span>
                    {daySlots.afternoon ? (
                      <span className="text-[11px] font-medium flex items-center gap-1 text-secondary">
                        <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                        Available
                      </span>
                    ) : (
                      <span className="text-[11px] font-medium">Unavailable</span>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section 3: Jury duty toggle & project limit */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 bg-surface-container rounded-xl p-4 border border-card-border">
          {/* Duty Toggle */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-col">
              <span className="font-label-lg text-[13px] text-primary font-semibold">
                Available for jury duty
              </span>
              <span className="font-body-md text-[13px] text-muted-text mt-0.5">
                When disabled, you will not be assigned to new defense panels.
              </span>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={availableForJury}
              onClick={() => {
                setAvailableForJury(!availableForJury);
                showToast(`Jury duty availability ${!availableForJury ? 'enabled' : 'disabled'}`);
              }}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full p-0.5 transition-colors ${
                availableForJury ? 'bg-kiet-orange' : 'bg-outline-variant'
              }`}
            >
              <span
                className={`inline-block h-5 w-5 rounded-full bg-white shadow-xs transition-transform ${
                  availableForJury ? 'translate-x-5' : 'translate-x-0'
                }`}
              ></span>
            </button>
          </div>

          {/* Project limit stepper */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-col">
              <span className="font-label-lg text-[13px] text-primary font-semibold">
                Maximum projects per session
              </span>
              <span className="font-body-md text-[13px] text-muted-text mt-0.5">
                Cap on evaluation dossier assignments per 3-hour defense session.
              </span>
            </div>
            <div className="flex items-center gap-2 bg-card-surface px-2 py-1 rounded-xl shadow-xs shrink-0 border border-card-border">
              <button
                type="button"
                onClick={() => setMaxProjects((prev) => Math.max(1, prev - 1))}
                className="w-8 h-8 rounded-lg bg-surface-container hover:bg-surface-container-high text-primary flex items-center justify-center font-bold text-[18px] transition-colors cursor-pointer"
              >
                −
              </button>
              <span className="w-8 text-center font-headline-sm text-[18px] text-primary font-semibold select-none">
                {maxProjects}
              </span>
              <button
                type="button"
                onClick={() => setMaxProjects((prev) => Math.min(10, prev + 1))}
                className="w-8 h-8 rounded-lg bg-surface-container hover:bg-surface-container-high text-primary flex items-center justify-center font-bold text-[18px] transition-colors cursor-pointer"
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Advisory Notice */}
        <div className="rounded-xl bg-secondary-container/50 p-4 flex items-center justify-between gap-4 border border-secondary/30">
          <div className="flex items-center gap-2 text-primary">
            <span className="material-symbols-outlined text-[20px] text-secondary">
              verified_user
            </span>
            <span className="font-body-md text-[13px] text-primary font-medium">
              Used by the KIET Coordinator for advisory jury matching only.
            </span>
          </div>
          <span className="font-eyebrow text-[11px] text-kiet-orange uppercase bg-card-surface px-2.5 py-1 rounded-md shadow-2xs border border-card-border font-bold">
            ADVISORY MATCHING
          </span>
        </div>
      </div>

      {/* 3. ACCOUNT SECURITY CARD */}
      <div className="bg-card-surface rounded-[20px] shadow-sm p-6 lg:p-7 flex flex-col gap-6 border border-card-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-secondary-container flex items-center justify-center text-secondary shrink-0">
              <span className="material-symbols-outlined text-[24px]">lock</span>
            </div>
            <div className="flex flex-col">
              <h2 className="font-headline-sm text-[18px] text-primary font-medium">
                Account Security
              </h2>
              <p className="font-body-md text-[13px] text-muted-text">
                Use a strong password that is unique to your faculty account.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowPasswords(!showPasswords)}
            className="inline-flex items-center gap-1.5 font-label-lg text-[13px] text-kiet-orange hover:underline cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">
              {showPasswords ? 'visibility_off' : 'visibility'}
            </span>
            <span>{showPasswords ? 'Hide passwords' : 'Show passwords'}</span>
          </button>
        </div>

        <div className="flex flex-col gap-4 pt-1">
          <div className="flex flex-col gap-1.5">
            <label className="font-label-md text-[12px] text-on-surface font-medium" htmlFor="curr-pass">
              Current Password *
            </label>
            <input
              id="curr-pass"
              type={showPasswords ? 'text' : 'password'}
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Enter current password"
              className="w-full h-[52px] px-4 bg-surface-container focus:bg-white rounded-xl text-on-surface font-body-md text-[14px] outline-none border border-card-border transition-all shadow-xs focus:ring-2 focus:ring-kiet-orange/40 focus:border-kiet-orange"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-label-md text-[12px] text-on-surface font-medium" htmlFor="new-pass">
              New Password *
            </label>
            <input
              id="new-pass"
              type={showPasswords ? 'text' : 'password'}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Create a new password"
              className="w-full h-[52px] px-4 bg-surface-container focus:bg-white rounded-xl text-on-surface font-body-md text-[14px] outline-none border border-card-border transition-all shadow-xs focus:ring-2 focus:ring-kiet-orange/40 focus:border-kiet-orange"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-label-md text-[12px] text-on-surface font-medium" htmlFor="confirm-pass">
              Confirm New Password *
            </label>
            <input
              id="confirm-pass"
              type={showPasswords ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              className="w-full h-[52px] px-4 bg-surface-container focus:bg-white rounded-xl text-on-surface font-body-md text-[14px] outline-none border border-card-border transition-all shadow-xs focus:ring-2 focus:ring-kiet-orange/40 focus:border-kiet-orange"
            />
          </div>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-card-border/60">
          <p className="font-label-md text-[12px] text-muted-text max-w-[560px]">
            Password policy: at least 8 characters with uppercase, lowercase, and a number. Passwords are saved per security policies.
          </p>
          <button
            type="button"
            onClick={handleSavePassword}
            className="w-full sm:w-auto h-11 px-6 bg-kiet-navy hover:bg-sidebar-navy-gradient text-white font-label-lg text-[13px] rounded-xl flex items-center justify-center gap-2 shadow-xs transition-all shrink-0 cursor-pointer"
          >
            <span>Save Password</span>
            <span className="material-symbols-outlined text-[18px] text-kiet-cyan">lock_reset</span>
          </button>
        </div>
      </div>

      {/* 4. NOTIFICATION PREFERENCES CARD */}
      <div className="bg-card-surface rounded-[20px] shadow-sm p-6 lg:p-7 flex flex-col gap-6 border border-card-border">
        <div className="flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl bg-secondary-container flex items-center justify-center text-secondary shrink-0">
            <span className="material-symbols-outlined text-[24px]">notifications</span>
          </div>
          <div className="flex flex-col">
            <h2 className="font-headline-sm text-[18px] text-primary font-medium">
              Notification Preferences
            </h2>
            <p className="font-body-md text-[13px] text-muted-text">
              Choose which optional reminders you want to receive.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3 pt-1">
          {/* Item 1 */}
          <div className="flex items-center justify-between gap-4 p-3 rounded-xl hover:bg-surface-container transition-colors border border-card-border/60">
            <div className="flex flex-col">
              <span className="font-label-lg text-[13px] text-primary font-semibold">
                New project assigned
              </span>
              <span className="font-body-md text-[13px] text-muted-text">
                Alerts when the KIET Coordinator allocates a new project to your jury panel.
              </span>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={notifNewProject}
              onClick={() => setNotifNewProject(!notifNewProject)}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full p-0.5 transition-colors ${
                notifNewProject ? 'bg-kiet-orange' : 'bg-outline-variant'
              }`}
            >
              <span
                className={`inline-block h-5 w-5 rounded-full bg-white shadow-xs transition-transform ${
                  notifNewProject ? 'translate-x-5' : 'translate-x-0'
                }`}
              ></span>
            </button>
          </div>

          {/* Item 2 */}
          <div className="flex items-center justify-between gap-4 p-3 rounded-xl hover:bg-surface-container transition-colors border border-card-border/60">
            <div className="flex flex-col">
              <span className="font-label-lg text-[13px] text-primary font-semibold">
                Evaluation reminder
              </span>
              <span className="font-body-md text-[13px] text-muted-text">
                Reminders 24 hours and 2 hours before a scheduled defense session.
              </span>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={notifReminder}
              onClick={() => setNotifReminder(!notifReminder)}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full p-0.5 transition-colors ${
                notifReminder ? 'bg-kiet-orange' : 'bg-outline-variant'
              }`}
            >
              <span
                className={`inline-block h-5 w-5 rounded-full bg-white shadow-xs transition-transform ${
                  notifReminder ? 'translate-x-5' : 'translate-x-0'
                }`}
              ></span>
            </button>
          </div>

          {/* Item 3 */}
          <div className="flex items-center justify-between gap-4 p-3 rounded-xl hover:bg-surface-container transition-colors border border-card-border/60">
            <div className="flex flex-col">
              <span className="font-label-lg text-[13px] text-primary font-semibold">
                Results published
              </span>
              <span className="font-body-md text-[13px] text-muted-text">
                Notifications when official defense marks are consolidated and released.
              </span>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={notifResults}
              onClick={() => setNotifResults(!notifResults)}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full p-0.5 transition-colors ${
                notifResults ? 'bg-kiet-orange' : 'bg-outline-variant'
              }`}
            >
              <span
                className={`inline-block h-5 w-5 rounded-full bg-white shadow-xs transition-transform ${
                  notifResults ? 'translate-x-5' : 'translate-x-0'
                }`}
              ></span>
            </button>
          </div>
        </div>

        {/* Institutional Disclaimer Banner */}
        <div className="rounded-xl bg-warning-bg/70 p-4 flex items-start gap-3 border border-warning-bg">
          <span className="material-symbols-outlined text-[20px] text-warning-text mt-0.5 shrink-0">
            info
          </span>
          <p className="font-body-md text-[13px] text-warning-text">
            Disabling a notification does not remove official academic notices. Critical defense schedules remain subject to university regulations.
          </p>
        </div>

        <div className="pt-1 flex justify-end">
          <button
            type="button"
            onClick={handleSaveNotifications}
            className="w-full sm:w-auto h-11 px-6 bg-kiet-navy hover:bg-sidebar-navy-gradient text-white font-label-lg text-[13px] rounded-xl flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer"
          >
            <span>Save Notification Preferences</span>
            <span className="material-symbols-outlined text-[18px] text-kiet-cyan">check</span>
          </button>
        </div>
      </div>

      {/* 5. ACCOUNT ACTIONS CARD */}
      <div className="bg-card-surface rounded-[20px] shadow-sm p-6 lg:p-7 flex flex-col gap-6 border border-card-border">
        <div className="flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl bg-surface-container flex items-center justify-center text-muted-text shrink-0">
            <span className="material-symbols-outlined text-[24px]">settings</span>
          </div>
          <div className="flex flex-col">
            <h2 className="font-headline-sm text-[18px] text-primary font-medium">
              Account Actions
            </h2>
            <p className="font-body-md text-[13px] text-muted-text">
              Get assistance or securely end your current session.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3 pt-1">
          {/* Row 1: University Support */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-surface-container rounded-xl border border-card-border">
            <div className="flex flex-col">
              <span className="font-label-lg text-[13px] text-primary font-semibold">
                KIET Faculty Support
              </span>
              <span className="font-body-md text-[13px] text-muted-text">
                Find the official service desk for faculty account, rubric, or defense assistance.
              </span>
            </div>
            <button
              type="button"
              onClick={() => setSupportModalOpen(true)}
              className="h-10 px-4 bg-card-surface hover:bg-surface-container-high text-on-surface font-label-lg text-[13px] rounded-lg shadow-xs transition-colors shrink-0 border border-card-border cursor-pointer"
            >
              Contact Faculty Support
            </button>
          </div>

          {/* Row 2: Sign Out */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-surface-container rounded-xl border border-card-border">
            <div className="flex flex-col">
              <span className="font-label-lg text-[13px] text-primary font-semibold">
                Sign Out
              </span>
              <span className="font-body-md text-[13px] text-muted-text">
                End your current KIET FYP360 faculty session.
              </span>
            </div>
            <button
              type="button"
              onClick={() => setSignOutModalOpen(true)}
              className="h-10 px-4 bg-danger-bg hover:bg-danger-bg/80 text-danger-text font-label-lg text-[13px] font-semibold rounded-lg shadow-xs transition-colors shrink-0 border border-danger-text/20 cursor-pointer"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* Support Modal */}
      {supportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-card-surface rounded-2xl max-w-md w-full p-6 shadow-2xl border border-card-border">
            <h3 className="font-headline-sm text-[18px] font-semibold text-primary mb-2">
              KIET Faculty Support Desk
            </h3>
            <p className="text-[13px] text-muted-text mb-4">
              For grading rubric questions, committee scheduling, or institutional credentials:
            </p>
            <div className="bg-surface-container p-3 rounded-xl text-[13px] text-on-surface flex flex-col gap-1.5 mb-4 border border-card-border">
              <div><strong>Email:</strong> fyp-committee@kiet.edu.pk</div>
              <div><strong>Phone:</strong> +92 21 35091114-7 (Ext: 244)</div>
              <div><strong>Location:</strong> College of Computing & Information Sciences, Room 104</div>
            </div>
            <button
              type="button"
              onClick={() => setSupportModalOpen(false)}
              className="w-full h-10 rounded-xl bg-kiet-navy text-white text-[13px] font-medium hover:bg-sidebar-navy-gradient cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Sign Out Modal */}
      {signOutModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-card-surface rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-card-border text-center">
            <span className="material-symbols-outlined text-[36px] text-danger-text mb-2">
              logout
            </span>
            <h3 className="font-headline-sm text-[18px] font-semibold text-primary mb-1">
              Sign out from FYP360?
            </h3>
            <p className="text-[13px] text-muted-text mb-5">
              Your evaluation drafts have been saved to the institutional database.
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setSignOutModalOpen(false)}
                className="flex-1 h-10 rounded-xl border border-card-border text-on-surface-variant text-[13px] font-medium hover:bg-surface-container cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  setSignOutModalOpen(false);
                  showToast('Signed out of faculty session');
                  onSignOut();
                }}
                className="flex-1 h-10 rounded-xl bg-danger-text text-white text-[13px] font-semibold cursor-pointer hover:bg-danger-text/90 shadow-xs"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
