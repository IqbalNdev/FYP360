import React from 'react';
import { Screen } from '../types';

interface SidebarProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
  pendingCount?: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentScreen,
  onNavigate,
  pendingCount = 2,
}) => {
  const isWorkspaceActive = (screen: Screen) => {
    if (screen === 'assigned-projects') {
      return currentScreen === 'assigned-projects' || currentScreen === 'project-dossier' || currentScreen === 'evaluation-form';
    }
    return currentScreen === screen;
  };

  return (
    <aside className="fixed left-0 top-0 h-full w-[260px] bg-gradient-to-b from-sidebar-navy to-sidebar-navy-gradient z-50 flex flex-col justify-between select-none shadow-xl">
      <div className="flex flex-col">
        {/* Brand Header */}
        <div 
          onClick={() => onNavigate('dashboard')}
          className="h-[72px] px-6 flex items-center gap-3 border-b border-white/10 cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-lg bg-kiet-orange flex items-center justify-center text-white font-headline-sm font-bold shadow-sm transition-transform group-hover:scale-105">
            K
          </div>
          <div className="flex flex-col justify-center leading-tight">
            <div className="flex items-center gap-1.5">
              <span className="font-headline-sm text-[18px] font-semibold tracking-tight text-white">
                KIET FYP
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-kiet-cyan"></span>
            </div>
            <span className="font-eyebrow text-[10px] tracking-wider text-white/70 uppercase">
              PROJECT PORTAL
            </span>
          </div>
        </div>

        {/* Workspace Nav */}
        <div className="px-4 pt-6">
          <span className="px-2 font-eyebrow text-[11px] font-bold text-white/50 uppercase tracking-wider block mb-2">
            WORKSPACE
          </span>
          <nav className="flex flex-col gap-1">
            <button
              type="button"
              onClick={() => onNavigate('dashboard')}
              className={`h-12 px-4 flex items-center gap-3 rounded-r-lg transition-all text-left w-full cursor-pointer ${
                currentScreen === 'dashboard'
                  ? 'bg-white/15 border-l-[3px] border-kiet-orange text-white font-medium pl-[13px] shadow-sm'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              <span className="material-symbols-outlined text-[20px] text-kiet-cyan">space_dashboard</span>
              <span className="font-body-md text-[14px] flex-1">Dashboard</span>
            </button>

            <button
              type="button"
              onClick={() => onNavigate('assigned-projects')}
              className={`h-12 px-4 flex items-center justify-between rounded-r-lg transition-all text-left w-full cursor-pointer ${
                isWorkspaceActive('assigned-projects')
                  ? 'bg-white/15 border-l-[3px] border-kiet-orange text-white font-medium pl-[13px] shadow-sm'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[20px] text-kiet-cyan">folder_shared</span>
                <span className="font-body-md text-[14px]">Assigned Projects</span>
              </div>
              {pendingCount > 0 && (
                <span className="bg-badge-coral text-white text-[11px] font-semibold px-2 py-0.5 rounded-full">
                  {pendingCount}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => onNavigate('my-evaluations')}
              className={`h-12 px-4 flex items-center gap-3 rounded-r-lg transition-all text-left w-full cursor-pointer ${
                currentScreen === 'my-evaluations'
                  ? 'bg-white/15 border-l-[3px] border-kiet-orange text-white font-medium pl-[13px] shadow-sm'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              <span className="material-symbols-outlined text-[20px] text-kiet-cyan">fact_check</span>
              <span className="font-body-md text-[14px] flex-1">My Evaluations</span>
            </button>
          </nav>
        </div>

        {/* Account Nav */}
        <div className="px-4 pt-6">
          <span className="px-2 font-eyebrow text-[11px] font-bold text-white/50 uppercase tracking-wider block mb-2">
            ACCOUNT
          </span>
          <nav className="flex flex-col gap-1">
            <button
              type="button"
              onClick={() => onNavigate('settings')}
              className={`h-12 px-4 flex items-center gap-3 rounded-r-lg transition-all text-left w-full cursor-pointer ${
                currentScreen === 'settings'
                  ? 'bg-white/15 border-l-[3px] border-kiet-orange text-white font-medium pl-[13px] shadow-sm'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              <span className="material-symbols-outlined text-[20px] text-kiet-cyan">settings</span>
              <span className="font-body-md text-[14px] flex-1">Settings</span>
            </button>

            <button
              type="button"
              onClick={() => onNavigate('login')}
              className={`h-12 px-4 flex items-center gap-3 rounded-r-lg transition-all text-left w-full cursor-pointer ${
                currentScreen === 'login'
                  ? 'bg-white/15 border-l-[3px] border-kiet-orange text-white font-medium pl-[13px] shadow-sm'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              <span className="material-symbols-outlined text-[20px] text-kiet-cyan">lock</span>
              <span className="font-body-md text-[14px] flex-1">Sign in Screen</span>
            </button>
          </nav>
        </div>
      </div>

      {/* University Footer */}
      <div className="p-6 border-t border-white/10 bg-black/15">
        <div className="flex items-center gap-2 mb-1">
          <span className="w-2 h-2 rounded-full bg-kiet-cyan inline-block animate-pulse"></span>
          <span className="font-label-md text-[12px] text-white/80">Academic Year 2024 — 2025</span>
        </div>
        <span className="font-eyebrow text-[10px] text-white/60 tracking-widest uppercase block">
          KIET UNIVERSITY
        </span>
      </div>
    </aside>
  );
};
