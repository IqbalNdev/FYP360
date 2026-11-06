import React from 'react';
import { ActiveView } from '../../types';

interface SidebarProps {
  activeView: ActiveView;
  setActiveView: (view: ActiveView) => void;
  unreadCount?: number;
  onSignOut?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeView,
  setActiveView,
  onSignOut,
}) => {
  const isNavActive = (view: ActiveView) => {
    if (view === 'meetings-tasks' && activeView === 'assign-task') return true;
    if (view === 'my-groups' && activeView === 'group-details') return true;
    return activeView === view;
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-[260px] bg-gradient-to-b from-[#002D71] to-[#001F52] text-white z-50 flex flex-col justify-between select-none shadow-[0_1px_12px_rgba(0,45,113,0.15)] border-r border-[#003B8F]/40">
      <div className="flex flex-col flex-1 min-h-0">
        {/* Brand Header (72px) */}
        <div className="h-[72px] px-6 flex items-center gap-3 border-b border-white/10 shrink-0">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#FD7A12] to-[#EA6800] flex items-center justify-center font-bold text-white text-base shadow-sm">
            K
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-base font-bold text-white tracking-tight leading-none">
              FYP360
            </span>
            <span className="text-[10px] text-[#01B0F1] tracking-wider font-semibold uppercase mt-1 leading-none truncate">
              KIET PORTAL
            </span>
          </div>
        </div>

        {/* Navigation Sections */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6 custom-scroll">
          {/* Workspace Section */}
          <div>
            <div className="px-3 pb-2 text-[11px] font-bold text-slate-300 uppercase tracking-wider">
              Workspace
            </div>
            <nav className="flex flex-col gap-1">
              {/* Dashboard */}
              <button
                type="button"
                onClick={() => setActiveView('dashboard')}
                className={`flex items-center gap-3 px-3 h-12 rounded-lg text-sm transition-all text-left w-full border-l-[3px] cursor-pointer ${
                  isNavActive('dashboard')
                    ? 'bg-[#001F52] text-white border-[#FD7A12] font-medium shadow-sm'
                    : 'text-white/80 hover:bg-white/10 hover:text-white border-transparent'
                }`}
              >
                <span className="material-symbols-outlined text-[20px] shrink-0">
                  dashboard
                </span>
                <span className="truncate">Dashboard</span>
              </button>

              {/* My Groups */}
              <button
                type="button"
                onClick={() => setActiveView('my-groups')}
                className={`flex items-center gap-3 px-3 h-12 rounded-lg text-sm transition-all text-left w-full border-l-[3px] cursor-pointer ${
                  isNavActive('my-groups')
                    ? 'bg-[#001F52] text-white border-[#FD7A12] font-medium shadow-sm'
                    : 'text-white/80 hover:bg-white/10 hover:text-white border-transparent'
                }`}
              >
                <span className="material-symbols-outlined text-[20px] shrink-0">
                  groups
                </span>
                <span className="truncate">My Groups</span>
              </button>

              {/* Meetings & Tasks */}
              <button
                type="button"
                onClick={() => setActiveView('meetings-tasks')}
                className={`flex items-center justify-between px-3 h-12 rounded-lg text-sm transition-all text-left w-full border-l-[3px] cursor-pointer ${
                  isNavActive('meetings-tasks')
                    ? 'bg-[#001F52] text-white border-[#FD7A12] font-medium shadow-sm'
                    : 'text-white/80 hover:bg-white/10 hover:text-white border-transparent'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="material-symbols-outlined text-[20px] shrink-0">
                    event_note
                  </span>
                  <span className="truncate">Meetings & Tasks</span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-[#FD7A12] text-white text-[11px] font-bold leading-tight shrink-0 shadow-xs">
                  3
                </span>
              </button>

              {/* Progress & Risk */}
              <button
                type="button"
                onClick={() => setActiveView('progress-risk')}
                className={`flex items-center gap-3 px-3 h-12 rounded-lg text-sm transition-all text-left w-full border-l-[3px] cursor-pointer ${
                  isNavActive('progress-risk')
                    ? 'bg-[#001F52] text-white border-[#FD7A12] font-medium shadow-sm'
                    : 'text-white/80 hover:bg-white/10 hover:text-white border-transparent'
                }`}
              >
                <span className="material-symbols-outlined text-[20px] shrink-0">
                  trending_up
                </span>
                <span className="truncate">Progress & Risk</span>
              </button>

              {/* Evaluation */}
              <button
                type="button"
                onClick={() => setActiveView('evaluation')}
                className={`flex items-center gap-3 px-3 h-12 rounded-lg text-sm transition-all text-left w-full border-l-[3px] cursor-pointer ${
                  isNavActive('evaluation')
                    ? 'bg-[#001F52] text-white border-[#FD7A12] font-medium shadow-sm'
                    : 'text-white/80 hover:bg-white/10 hover:text-white border-transparent'
                }`}
              >
                <span className="material-symbols-outlined text-[20px] shrink-0">
                  fact_check
                </span>
                <span className="truncate">Evaluation</span>
              </button>
            </nav>
          </div>

          {/* Account Section */}
          <div>
            <div className="px-3 pb-2 text-[11px] font-bold text-slate-300 uppercase tracking-wider">
              Account
            </div>
            <nav className="flex flex-col gap-1">
              <button
                type="button"
                onClick={() => setActiveView('settings')}
                className={`flex items-center gap-3 px-3 h-12 rounded-lg text-sm transition-all text-left w-full border-l-[3px] cursor-pointer ${
                  isNavActive('settings')
                    ? 'bg-[#001F52] text-white border-[#FD7A12] font-medium shadow-sm'
                    : 'text-white/80 hover:bg-white/10 hover:text-white border-transparent'
                }`}
              >
                <span className="material-symbols-outlined text-[20px] shrink-0">
                  settings
                </span>
                <span className="truncate">Settings</span>
              </button>

              <button
                type="button"
                onClick={() => (onSignOut ? onSignOut() : setActiveView('sign-in'))}
                className="flex items-center gap-3 px-3 h-12 rounded-lg text-sm transition-all text-left w-full border-l-[3px] text-white/80 hover:bg-white/10 hover:text-white border-transparent cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px] shrink-0">
                  logout
                </span>
                <span className="truncate">Sign In Screen</span>
              </button>
            </nav>
          </div>
        </div>
      </div>

      {/* Institutional Footer */}
      <div className="p-4 border-t border-white/10 bg-[#001F52]/60 shrink-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="w-2 h-2 rounded-full bg-[#01B0F1] shrink-0 animate-pulse shadow-sm shadow-[#01B0F1]/50" />
          <span className="text-[11px] text-white/90 truncate font-medium">
            Academic Year 2024 — 2025
          </span>
        </div>
        <p className="text-[10px] tracking-wider text-[#01B0F1] uppercase pl-4 font-semibold">
          KIET GROUP OF INSTITUTIONS
        </p>
      </div>
    </aside>
  );
};
