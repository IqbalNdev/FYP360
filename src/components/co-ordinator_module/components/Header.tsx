import React, { useState } from 'react';
import { AppView, UserProfile } from '../types';

interface HeaderProps {
  currentView: AppView;
  user: UserProfile;
  onNavigate: (view: AppView) => void;
  onToggleMobile?: () => void;
  onOpenMobileSidebar?: () => void;
  onSignOut: () => void;
  onShowToast?: (message: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  user,
  onNavigate,
  onToggleMobile,
  onOpenMobileSidebar,
  onSignOut,
  onShowToast,
}) => {
  const handleToggleMobile = onOpenMobileSidebar || onToggleMobile || (() => {});
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const getBreadcrumbs = () => {
    switch (currentView) {
      case 'dashboard':
        return [
          { label: 'Coordinator Portal', view: 'dashboard' },
          { label: 'Dashboard', active: true },
        ];
      case 'proposals':
        return [
          { label: 'Coordinator Portal', view: 'dashboard' },
          { label: 'Proposals', active: true },
        ];
      case 'proposal-review':
        return [
          { label: 'Coordinator Portal', view: 'dashboard' },
          { label: 'Proposals', view: 'proposals' },
          { label: 'FYP-CS-2025-042', active: true },
        ];
      case 'approval-step-1':
        return [
          { label: 'Coordinator Portal', view: 'dashboard' },
          { label: 'Proposals', view: 'proposals' },
          { label: 'Approve', active: false },
          { label: 'Supervisor', active: true },
        ];
      case 'approval-step-2':
        return [
          { label: 'Coordinator Portal', view: 'dashboard' },
          { label: 'Proposals', view: 'proposals' },
          { label: 'Approve', active: false },
          { label: 'Jury', active: true },
        ];
      case 'approval-step-3':
        return [
          { label: 'Coordinator Portal', view: 'dashboard' },
          { label: 'Proposals', view: 'proposals' },
          { label: 'Approve', active: false },
          { label: 'Timeline & Confirm', active: true },
        ];
      case 'groups-projects':
        return [
          { label: 'Coordinator Portal', view: 'dashboard' },
          { label: 'Groups & Projects', active: true },
        ];
      case 'risk-monitor':
        return [
          { label: 'Coordinator Portal', view: 'dashboard' },
          { label: 'Risk Monitor', active: true },
        ];
      case 'evaluation':
      case 'evaluation-rubrics':
        return [
          { label: 'Coordinator Portal', view: 'dashboard' },
          { label: 'Evaluation', active: true },
        ];
      case 'repository':
        return [
          { label: 'Coordinator Portal', view: 'dashboard' },
          { label: 'Repository', active: true },
        ];
      case 'settings':
        return [
          { label: 'Coordinator Portal', view: 'dashboard' },
          { label: 'Settings', active: true },
        ];
      default:
        return [{ label: 'Coordinator Portal', active: true }];
    }
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <header className="fixed top-0 left-0 lg:left-[260px] right-0 h-[72px] bg-white border-b border-[#E2E8F0] z-40 flex items-center justify-between px-4 sm:px-6 shadow-[0_1px_8px_rgba(0,0,0,0.03)]">
      {/* Left: Mobile Toggle + Breadcrumb */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={handleToggleMobile}
          className="p-2 rounded-lg text-[#64748B] hover:text-[#002D71] hover:bg-[#F1F5F9] lg:hidden transition-colors cursor-pointer"
          aria-label="Open menu"
        >
          <span className="material-symbols-outlined text-[24px]">menu</span>
        </button>

        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-[#64748B]">
          {breadcrumbs.map((crumb, idx) => (
            <React.Fragment key={idx}>
              {idx > 0 && <span className="text-[#CBD5E1]">/</span>}
              {crumb.active ? (
                <span className="text-[#1E293B] font-medium truncate max-w-[180px] sm:max-w-none">
                  {crumb.label}
                </span>
              ) : (
                <button
                  type="button"
                  onClick={() => crumb.view && onNavigate(crumb.view as AppView)}
                  className="text-[#64748B] hover:text-[#002D71] transition-colors truncate max-w-[140px] sm:max-w-none"
                >
                  {crumb.label}
                </button>
              )}
            </React.Fragment>
          ))}
        </nav>
      </div>

      {/* Right: Notifications, Divider, User Chip */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Notifications */}
        <div className="relative">
          <button
            type="button"
            aria-label="Notifications"
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowUserMenu(false);
            }}
            className="relative p-2 rounded-lg text-[#64748B] hover:text-[#1E293B] hover:bg-[#F1F5F9] transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[22px]">notifications</span>
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#C2392F]"></span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-[#E2E8F0] p-4 z-50 animate-in fade-in slide-in-from-top-2">
              <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#FD7A12] text-[20px]">
                    notifications_active
                  </span>
                  <span className="font-semibold text-sm text-[#002D71]">Notifications</span>
                </div>
                <span className="text-xs bg-[#FFF4DF] text-[#B26B00] px-2 py-0.5 rounded-full font-medium">
                  3 unread
                </span>
              </div>
              <div className="divide-y divide-[#E2E8F0] max-h-72 overflow-y-auto">
                <div className="py-2.5 flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#C2392F] mt-1.5 shrink-0"></span>
                  <div>
                    <p className="text-xs font-semibold text-[#1E293B]">
                      Group 14: Overdue milestone (18 days)
                    </p>
                    <p className="text-[11px] text-[#64748B] mt-0.5">
                      Autonomous Drone Navigation in GPS-Denied Environments
                    </p>
                  </div>
                </div>
                <div className="py-2.5 flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#B26B00] mt-1.5 shrink-0"></span>
                  <div>
                    <p className="text-xs font-semibold text-[#1E293B]">
                      New Proposal: Ayesha Khan
                    </p>
                    <p className="text-[11px] text-[#64748B] mt-0.5">
                      AI-Powered Student Career Guidance System (Primary)
                    </p>
                  </div>
                </div>
                <div className="py-2.5 flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#01B0F1] mt-1.5 shrink-0"></span>
                  <div>
                    <p className="text-xs font-semibold text-[#1E293B]">
                      FYP1 results ready to publish
                    </p>
                    <p className="text-[11px] text-[#64748B] mt-0.5">
                      48 / 52 Projects Scored in current cohort
                    </p>
                  </div>
                </div>
              </div>
              <div className="pt-2 text-center border-t border-[#E2E8F0]">
                <button
                  type="button"
                  onClick={() => {
                    setShowNotifications(false);
                    onNavigate('risk-monitor');
                  }}
                  className="text-xs text-[#002D71] hover:text-[#FD7A12] font-semibold hover:underline"
                >
                  View all in Risk Monitor →
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="h-8 w-px bg-[#E2E8F0] hidden sm:block"></div>

        {/* User Chip */}
        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setShowUserMenu(!showUserMenu);
              setShowNotifications(false);
            }}
            className="flex items-center gap-2 pl-1 group text-left cursor-pointer focus:outline-none"
          >
            <div className="w-9 h-9 rounded-full bg-[#002D71] flex items-center justify-center text-white text-xs font-semibold tracking-wide shrink-0 shadow-sm">
              {user.initials}
            </div>
            <div className="hidden md:flex flex-col text-left">
              <span className="text-sm text-[#1E293B] font-medium leading-snug group-hover:text-[#FD7A12] transition-colors">
                {user.name}
              </span>
              <span className="text-[11px] text-[#64748B] leading-tight truncate max-w-[200px]">
                {user.department}
              </span>
            </div>
            <span className="material-symbols-outlined text-[16px] text-[#64748B] group-hover:text-[#1E293B] transition-colors hidden sm:inline">
              expand_more
            </span>
          </button>

          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-[#E2E8F0] p-2 z-50 animate-in fade-in slide-in-from-top-2">
              <div className="p-3 border-b border-[#E2E8F0]">
                <div className="font-semibold text-sm text-[#002D71]">{user.name}</div>
                <div className="text-xs text-[#64748B] mt-0.5">{user.email}</div>
                <div className="inline-block mt-2 bg-[#FFF1E5] text-[#FD7A12] text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">
                  COORDINATOR ACCESS
                </div>
              </div>
              <div className="py-1">
                <button
                  type="button"
                  onClick={() => {
                    setShowUserMenu(false);
                    onNavigate('settings');
                  }}
                  className="w-full text-left px-3 py-2 text-xs font-medium text-[#1E293B] hover:bg-[#F4F6F9] rounded-lg flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-[18px] text-[#64748B]">
                    settings
                  </span>
                  Coordinator Settings
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowUserMenu(false);
                    onNavigate('repository');
                  }}
                  className="w-full text-left px-3 py-2 text-xs font-medium text-[#1E293B] hover:bg-[#F4F6F9] rounded-lg flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-[18px] text-[#64748B]">
                    inventory_2
                  </span>
                  FYP Repository
                </button>
              </div>
              <div className="pt-1 border-t border-[#E2E8F0]">
                <button
                  type="button"
                  onClick={() => {
                    setShowUserMenu(false);
                    onSignOut();
                  }}
                  className="w-full text-left px-3 py-2 text-xs font-semibold text-[#C2392F] hover:bg-[#FDE8E6] rounded-lg flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-[18px]">logout</span>
                  Sign Out of Session
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
