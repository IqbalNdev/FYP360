import React from 'react';
import { AppView } from '../types';

interface SidebarProps {
  currentView: AppView;
  onNavigate: (view: AppView) => void;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
  proposalsCount?: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  onNavigate,
  isMobileOpen,
  onCloseMobile,
  proposalsCount = 12,
}) => {
  const isWorkspaceActive = (view: AppView) => {
    if (view === 'dashboard' && currentView === 'dashboard') return true;
    if (
      view === 'proposals' &&
      (currentView === 'proposals' ||
        currentView === 'proposal-review' ||
        currentView === 'approval-step-1' ||
        currentView === 'approval-step-2' ||
        currentView === 'approval-step-3')
    )
      return true;
    if (view === 'groups-projects' && currentView === 'groups-projects') return true;
    if (view === 'risk-monitor' && currentView === 'risk-monitor') return true;
    if (
      view === 'evaluation' &&
      (currentView === 'evaluation' || currentView === 'evaluation-rubrics')
    )
      return true;
    if (view === 'repository' && currentView === 'repository') return true;
    return false;
  };

  const navItemClass = (isActive: boolean) =>
    `h-12 flex items-center px-4 rounded-r-lg transition-colors gap-2 group cursor-pointer ${
      isActive
        ? 'bg-[#164783] text-white border-l-[3px] border-[#FD7A12] font-medium pl-[13px]'
        : 'text-[#CBD5E1] hover:text-white hover:bg-white/10 font-normal'
    }`;

  const handleNav = (view: AppView) => {
    onNavigate(view);
    onCloseMobile();
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-xs"
          onClick={onCloseMobile}
        />
      )}

      <aside
        className={`fixed left-0 top-0 h-screen w-[260px] bg-gradient-to-b from-[#002D71] to-[#003B85] text-white z-50 flex flex-col justify-between select-none transition-transform duration-300 lg:translate-x-0 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col">
          {/* Logo Header */}
          <div className="h-[72px] px-4 flex items-center gap-2 border-b border-white/10">
            <div className="w-9 h-9 rounded-lg bg-[#FD7A12] flex items-center justify-center text-white font-bold text-lg shadow-sm">
              F
            </div>
            <div className="flex flex-col">
              <span className="text-[17px] text-white tracking-tight font-semibold leading-none">
                FYP360
              </span>
              <span className="font-eyebrow text-[10px] tracking-wider text-[#CBD5E1] mt-1 uppercase font-semibold">
                PROJECT MANAGEMENT
              </span>
            </div>
          </div>

          {/* Workspace Nav Section */}
          <div className="px-4 mt-6">
            <span className="font-eyebrow text-[#CBD5E1] uppercase text-[11px] font-bold tracking-widest px-1 block mb-2">
              WORKSPACE
            </span>
            <nav className="space-y-1">
              <button
                type="button"
                onClick={() => handleNav('dashboard')}
                className={`w-full text-left ${navItemClass(isWorkspaceActive('dashboard'))}`}
              >
                <span className="material-symbols-outlined text-[20px] transition-transform">
                  dashboard
                </span>
                <span className="font-body-md text-sm">Dashboard</span>
              </button>

              <button
                type="button"
                onClick={() => handleNav('proposals')}
                className={`w-full text-left justify-between ${navItemClass(
                  isWorkspaceActive('proposals')
                )}`}
              >
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[20px]">assignment</span>
                  <span className="font-body-md text-sm">Proposals</span>
                </div>
                <span className="bg-[#FD7A12] text-white text-[11px] font-bold px-2 py-0.5 rounded-full leading-none shadow-xs">
                  12
                </span>
              </button>

              <button
                type="button"
                onClick={() => handleNav('groups-projects')}
                className={`w-full text-left ${navItemClass(isWorkspaceActive('groups-projects'))}`}
              >
                <span className="material-symbols-outlined text-[20px]">groups</span>
                <span className="font-body-md text-sm">Groups &amp; Projects</span>
              </button>

              <button
                type="button"
                onClick={() => handleNav('risk-monitor')}
                className={`w-full text-left ${navItemClass(isWorkspaceActive('risk-monitor'))}`}
              >
                <span className="material-symbols-outlined text-[20px]">warning</span>
                <span className="font-body-md text-sm">Risk Monitor</span>
              </button>

              <button
                type="button"
                onClick={() => handleNav('evaluation')}
                className={`w-full text-left ${navItemClass(isWorkspaceActive('evaluation'))}`}
              >
                <span className="material-symbols-outlined text-[20px]">fact_check</span>
                <span className="font-body-md text-sm">Evaluation</span>
              </button>

              <button
                type="button"
                onClick={() => handleNav('repository')}
                className={`w-full text-left ${navItemClass(isWorkspaceActive('repository'))}`}
              >
                <span className="material-symbols-outlined text-[20px]">inventory_2</span>
                <span className="font-body-md text-sm">Repository</span>
              </button>
            </nav>
          </div>

          {/* Account Nav Section */}
          <div className="px-4 mt-6">
            <span className="font-eyebrow text-[#CBD5E1] uppercase text-[11px] font-bold tracking-widest px-1 block mb-2">
              ACCOUNT
            </span>
            <nav className="space-y-1">
              <button
                type="button"
                onClick={() => handleNav('settings')}
                className={`w-full text-left ${navItemClass(currentView === 'settings')}`}
              >
                <span className="material-symbols-outlined text-[20px]">settings</span>
                <span className="font-body-md text-sm">Settings</span>
              </button>
            </nav>
          </div>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-white/10">
          <div className="text-xs text-[#CBD5E1] leading-tight font-medium">
            Academic year 2024 — 2025
          </div>
          <div className="font-eyebrow text-white tracking-wider text-[11px] mt-1 font-semibold uppercase">
            KIET UNIVERSITY
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
