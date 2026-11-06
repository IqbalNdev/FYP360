import React, { useState } from 'react';
import { Screen } from '../types';

interface HeaderProps {
  currentScreen: Screen;
  activeProjectTitle?: string;
  onNavigate: (screen: Screen) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentScreen,
  activeProjectTitle,
  onNavigate,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadNotifications, setUnreadNotifications] = useState(2);

  const notificationsList = [
    {
      id: 1,
      title: 'New evaluation panel confirmed',
      desc: 'Hall CS-204 session begins at 10:00 AM on Oct 28.',
      time: '15m ago',
      read: false,
    },
    {
      id: 2,
      title: 'Rubric weighting notice',
      desc: 'Institutional rubric criteria weights locked by FYP Coordinator.',
      time: '2h ago',
      read: false,
    },
    {
      id: 3,
      title: 'Conflict declaration acknowledged',
      desc: 'Your excuse from Group FYP-CS-2025-068 was approved.',
      time: 'Yesterday',
      read: true,
    },
  ];

  return (
    <header className="fixed top-0 left-[260px] right-0 h-[72px] bg-card-surface border-b border-card-border z-40 px-6 lg:px-10 flex items-center justify-between shadow-xs">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 font-body-md text-[14px]">
        <button
          type="button"
          onClick={() => onNavigate('dashboard')}
          className="text-muted-text hover:text-primary transition-colors cursor-pointer"
        >
          Jury Portal
        </button>
        <span className="text-muted-text">/</span>

        {currentScreen === 'dashboard' && (
          <span className="font-headline-sm text-[15px] font-semibold text-primary">
            Dashboard
          </span>
        )}

        {currentScreen === 'assigned-projects' && (
          <span className="font-headline-sm text-[15px] font-semibold text-primary">
            Assigned Projects
          </span>
        )}

        {currentScreen === 'project-dossier' && (
          <>
            <button
              type="button"
              onClick={() => onNavigate('assigned-projects')}
              className="text-muted-text hover:text-primary transition-colors cursor-pointer"
            >
              Assigned Projects
            </button>
            <span className="text-muted-text">/</span>
            <span className="font-headline-sm text-[15px] font-semibold text-primary truncate max-w-[280px]">
              {activeProjectTitle || 'Project Dossier'}
            </span>
          </>
        )}

        {currentScreen === 'evaluation-form' && (
          <>
            <button
              type="button"
              onClick={() => onNavigate('assigned-projects')}
              className="text-muted-text hover:text-primary transition-colors cursor-pointer"
            >
              Assigned Projects
            </button>
            <span className="text-muted-text">/</span>
            <span className="font-headline-sm text-[15px] font-semibold text-primary">
              Evaluation Form
            </span>
          </>
        )}

        {currentScreen === 'my-evaluations' && (
          <span className="font-headline-sm text-[15px] font-semibold text-primary">
            My Evaluations
          </span>
        )}

        {currentScreen === 'settings' && (
          <span className="font-headline-sm text-[15px] font-semibold text-primary">
            Settings
          </span>
        )}
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-4 relative">
        {/* Notifications Icon Button */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 text-muted-text hover:text-primary transition-colors rounded-full hover:bg-surface-container cursor-pointer"
            aria-label="Notifications"
          >
            <span className="material-symbols-outlined text-[22px]">notifications</span>
            {unreadNotifications > 0 && (
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-badge-coral ring-2 ring-white"></span>
            )}
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 top-12 w-80 bg-white rounded-2xl shadow-xl border border-card-border p-4 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between pb-3 border-b border-card-border mb-2">
                <span className="font-headline-sm text-[14px] font-semibold text-primary">
                  Portal Alerts
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setUnreadNotifications(0);
                    setShowNotifications(false);
                  }}
                  className="text-[11px] font-medium text-kiet-orange hover:underline cursor-pointer"
                >
                  Mark all as read
                </button>
              </div>

              <div className="flex flex-col gap-2 max-h-72 overflow-y-auto custom-scroll">
                {notificationsList.map((item) => (
                  <div
                    key={item.id}
                    className="p-2.5 rounded-xl hover:bg-surface-container-low transition-colors cursor-pointer text-left"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-label-lg text-[13px] font-medium text-primary">
                        {item.title}
                      </span>
                      <span className="text-[10px] text-muted-text">{item.time}</span>
                    </div>
                    <p className="text-[12px] text-muted-text mt-0.5 leading-snug">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="h-6 w-[1px] bg-card-border"></div>

        {/* User Chip */}
        <button
          type="button"
          onClick={() => onNavigate('settings')}
          className="flex items-center gap-3 p-1.5 rounded-xl hover:bg-surface-container transition-colors cursor-pointer text-left"
        >
          <div className="w-9 h-9 rounded-full bg-kiet-navy flex items-center justify-center text-white font-label-lg font-medium text-[13px] shadow-sm">
            SF
          </div>
          <div className="hidden sm:flex flex-col leading-tight">
            <span className="font-headline-sm text-[14px] font-medium text-primary">
              Dr. Sana Farooq
            </span>
            <span className="font-label-md text-[11px] text-muted-text">
              Department of Software Engineering · KIET
            </span>
          </div>
        </button>
      </div>
    </header>
  );
};
