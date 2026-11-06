import React, { useState } from 'react';
import { ActiveView } from '../../types';

interface HeaderProps {
  activeView: ActiveView;
  unreadCount: number;
  onOpenNotifications: () => void;
  onProfileClick?: () => void;
  onSignOut?: () => void;
  selectedGroupName?: string;
}

export const Header: React.FC<HeaderProps> = ({
  activeView,
  unreadCount,
  onOpenNotifications,
  onProfileClick,
  onSignOut,
  selectedGroupName,
}) => {
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const getBreadcrumbs = () => {
    switch (activeView) {
      case 'dashboard':
        return { parent: 'Supervisor Portal', current: 'Dashboard' };
      case 'my-groups':
        return { parent: 'Supervisor Portal', current: 'My Groups' };
      case 'group-details':
        return {
          parent: 'Supervisor Portal',
          sub: 'My Groups',
          current: selectedGroupName || 'Group Workspace',
        };
      case 'meetings-tasks':
        return { parent: 'Supervisor Portal', current: 'Meetings & Tasks' };
      case 'assign-task':
        return {
          parent: 'Supervisor Portal',
          sub: 'Meetings & Tasks',
          current: 'Assign task',
        };
      case 'submission-review':
        return {
          parent: 'Supervisor Portal',
          sub: 'Meetings & Tasks',
          current: 'Submission Review',
        };
      case 'progress-risk':
        return { parent: 'Supervisor Portal', current: 'Progress & Risk' };
      case 'evaluation':
        return { parent: 'Supervisor Portal', current: 'Evaluation' };
      case 'settings':
        return { parent: 'Supervisor Portal', current: 'Settings' };
      default:
        return { parent: 'Supervisor Portal', current: 'Dashboard' };
    }
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <header className="fixed top-0 left-[260px] right-0 h-[72px] bg-white border-b border-[#E2E8F0] z-40 flex items-center justify-between px-8 shadow-[0_1px_8px_rgba(0,45,113,0.03)]">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm min-w-0">
        <span className="text-[#475569] font-normal truncate">
          {breadcrumbs.parent}
        </span>
        <span className="text-[#CBD5E1] font-normal">/</span>
        {breadcrumbs.sub && (
          <>
            <span className="text-[#475569] font-normal truncate">
              {breadcrumbs.sub}
            </span>
            <span className="text-[#CBD5E1] font-normal">/</span>
          </>
        )}
        <span className="text-[#002D71] font-semibold truncate">
          {breadcrumbs.current}
        </span>
      </div>

      {/* User Actions & Profile Area */}
      <div className="flex items-center gap-5 shrink-0">
        {/* Notification Bell Icon */}
        <button
          aria-label="Notifications"
          onClick={onOpenNotifications}
          className="relative p-2 rounded-xl text-[#002D71] bg-slate-100 hover:bg-slate-200/80 transition-colors focus:outline-none focus:ring-2 focus:ring-[#01B0F1]/40 cursor-pointer"
          type="button"
        >
          <span className="material-symbols-outlined text-[22px] block">
            notifications
          </span>
          {unreadCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-[#FD7A12] rounded-full ring-2 ring-white" />
          )}
        </button>

        <div className="h-7 w-px bg-[#E2E8F0]" />

        {/* Supervisor Profile Chip & Dropdown */}
        <div className="relative">
          <div
            onClick={() => setProfileMenuOpen(!profileMenuOpen)}
            className="flex items-center gap-3 cursor-pointer select-none group"
            title="Dr. Ahmed Rahman"
          >
            <div className="w-9 h-9 rounded-full bg-[#E0F2FE] text-[#002D71] flex items-center justify-center font-bold text-xs shadow-sm border border-[#01B0F1]/30">
              AR
            </div>
            <div className="text-left hidden sm:block">
              <div className="text-sm font-semibold text-[#002D71] leading-tight group-hover:text-[#FD7A12] transition-colors">
                Dr. Ahmed Rahman
              </div>
              <div className="text-[11px] text-[#475569] leading-tight mt-0.5">
                Department of Computer Science
              </div>
            </div>
            <div className="w-8 h-8 rounded-full bg-[#002D71] flex items-center justify-center shrink-0 ml-1 text-white shadow-xs">
              <span className="material-symbols-outlined text-[18px]">person</span>
            </div>
          </div>

          {/* Profile Menu Dropdown */}
          {profileMenuOpen && (
            <div className="absolute right-0 mt-3 w-56 bg-white border border-[#E2E8F0] rounded-2xl shadow-xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="px-3 py-2 border-b border-[#F1F5F9]">
                <p className="text-xs font-semibold text-[#002D71]">Dr. Ahmed Rahman</p>
                <p className="text-[11px] text-[#475569]">FAC-014 · Supervisor</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setProfileMenuOpen(false);
                  if (onProfileClick) onProfileClick();
                }}
                className="w-full text-left px-3 py-2 mt-1 rounded-xl text-xs font-medium text-[#1E293B] hover:bg-[#F1F5F9] flex items-center gap-2.5 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px] text-[#475569]">
                  settings
                </span>
                <span>Account Settings</span>
              </button>
              {onSignOut && (
                <button
                  type="button"
                  onClick={() => {
                    setProfileMenuOpen(false);
                    onSignOut();
                  }}
                  className="w-full text-left px-3 py-2 mt-0.5 rounded-xl text-xs font-medium text-[#DC2626] hover:bg-[#FEE2E2] flex items-center gap-2.5 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    logout
                  </span>
                  <span>Sign Out</span>
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
