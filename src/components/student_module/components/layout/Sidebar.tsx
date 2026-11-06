import React from 'react';
import { useApp, ScreenId } from '../../context/AppContext';
import {
  LayoutDashboard,
  FolderGit2,
  FileCheck2,
  Sparkles,
  CheckSquare,
  BarChart3,
  Award,
  Settings,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  Users,
  ShieldCheck,
  Building2,
  Calendar,
  Layers,
  ArrowRightLeft
} from 'lucide-react';

interface SidebarProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ collapsed, onToggleCollapse }) => {
  const { currentRole, currentScreen, setCurrentScreen, switchRole } = useApp();

  interface NavItem {
    id: ScreenId;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: string | number;
    badgeColor?: string;
  }

  // Student Navigation Links (Pages 1 - 17)
  const studentNavItems: NavItem[] = [
    { id: 'student-dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'student-my-project', label: 'My Project', icon: FolderGit2 },
    { id: 'student-proposal-overview', label: 'Proposal Submission', icon: FileCheck2 },
    { id: 'student-ai-analysis', label: 'AI Analysis', icon: Sparkles },
    {
      id: 'student-milestones',
      label: 'Tasks & Milestones',
      icon: CheckSquare,
      badge: 3,
      badgeColor: 'bg-[#FD7A12] text-white',
    },
    { id: 'student-progress', label: 'Progress Tracking', icon: BarChart3 },
    { id: 'student-evaluation', label: 'Evaluation', icon: Award },
  ];

  // Supervisor Navigation Links (Pages 21 - 24)
  const supervisorNavItems: NavItem[] = [
    { id: 'supervisor-dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'supervisor-projects', label: 'My Supervised Projects', icon: FolderGit2 },
    {
      id: 'supervisor-submissions',
      label: 'Submission Reviews',
      icon: FileCheck2,
      badge: 4,
      badgeColor: 'bg-[#C2392F] text-white',
    },
    { id: 'supervisor-milestones', label: 'Progress & Milestones', icon: Layers },
    { id: 'jury-evaluation', label: 'Evaluations & Grading', icon: Award },
  ];

  // Jury Navigation Links
  const juryNavItems: NavItem[] = [
    { id: 'jury-evaluation', label: 'Defense Evaluations', icon: Award },
    { id: 'student-dashboard', label: 'Student View Preview', icon: LayoutDashboard },
  ];

  // Coordinator Navigation Links
  const coordinatorNavItems: NavItem[] = [
    { id: 'coordinator-dashboard', label: 'Program Overview', icon: LayoutDashboard },
    { id: 'supervisor-projects', label: 'All Project Cohorts', icon: FolderGit2 },
    { id: 'student-evaluation', label: 'Official Grades Release', icon: Award },
  ];

  const getNavItems = () => {
    switch (currentRole) {
      case 'supervisor':
        return supervisorNavItems;
      case 'jury':
        return juryNavItems;
      case 'coordinator':
        return coordinatorNavItems;
      default:
        return studentNavItems;
    }
  };

  const navItems = getNavItems();

  const isCurrentActive = (itemScreenId: ScreenId) => {
    if (currentScreen === itemScreenId) return true;
    // Sub-screens mapping
    if (itemScreenId === 'student-proposal-overview' &&
        (currentScreen === 'student-proposal-form' || currentScreen === 'student-proposal-review')) {
      return true;
    }
    if (itemScreenId === 'student-ai-analysis' &&
        (currentScreen === 'student-ai-results' || currentScreen === 'student-proposal-compare')) {
      return true;
    }
    if (itemScreenId === 'student-milestones' &&
        (currentScreen === 'student-milestone-detail' || currentScreen === 'student-assignment-detail')) {
      return true;
    }
    if (itemScreenId === 'student-evaluation' && currentScreen === 'student-evaluation-breakdown') {
      return true;
    }
    return false;
  };

  return (
    <aside
      className={`fixed top-0 left-0 bottom-0 z-40 bg-[#002D71] flex flex-col transition-all duration-200 select-none ${
        collapsed ? 'w-[76px]' : 'w-[250px]'
      }`}
    >
      {/* Brand Header */}
      <div className="h-[68px] px-5 flex items-center justify-between border-b border-white/10 shrink-0">
        <div
          onClick={() => {
            if (currentRole === 'student') setCurrentScreen('student-dashboard');
            else if (currentRole === 'supervisor') setCurrentScreen('supervisor-dashboard');
            else if (currentRole === 'coordinator') setCurrentScreen('coordinator-dashboard');
            else setCurrentScreen('jury-evaluation');
          }}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-lg bg-[#01B0F1] flex items-center justify-center text-white font-bold text-lg shadow-sm group-hover:scale-105 transition-transform shrink-0">
            F
          </div>
          {!collapsed && (
            <div className="overflow-hidden">
              <div className="text-white font-bold tracking-tight text-base leading-none flex items-center gap-1.5">
                FYP360
              </div>
              <div className="text-[10px] font-semibold text-[#01B0F1] tracking-widest mt-1">
                PROJECT MANAGEMENT
              </div>
            </div>
          )}
        </div>

        <button
          onClick={onToggleCollapse}
          className="text-white/60 hover:text-white p-1 rounded hover:bg-white/10 transition-colors"
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Role Pill Banner */}
      {!collapsed && (
        <div className="px-5 pt-4 pb-1">
          <div className="px-2.5 py-1 rounded bg-[#164783]/70 border border-[#01B0F1]/20 flex items-center justify-between">
            <span className="text-[11px] font-medium text-[#94A3B8] uppercase tracking-wider">
              {currentRole === 'student' && 'Student Portal'}
              {currentRole === 'supervisor' && 'Supervisor Portal'}
              {currentRole === 'jury' && 'Jury Member Panel'}
              {currentRole === 'coordinator' && 'FYP Coordinator'}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#01B0F1] animate-pulse" />
          </div>
        </div>
      )}

      {/* Navigation Groups */}
      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-6">
        <div>
          {!collapsed && (
            <div className="px-3 pb-2 text-[10px] font-bold text-[#94A3B8] tracking-widest uppercase">
              WORKSPACE
            </div>
          )}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const active = isCurrentActive(item.id);
              const Icon = item.icon;

              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentScreen(item.id)}
                  className={`w-full h-[42px] relative flex items-center rounded-lg text-sm font-medium transition-all ${
                    collapsed ? 'justify-center px-0' : 'px-3 gap-3'
                  } ${
                    active
                      ? 'bg-[#164783] text-white shadow-xs'
                      : 'text-[#94A3B8] hover:text-white hover:bg-white/5'
                  }`}
                  title={collapsed ? item.label : undefined}
                >
                  {/* Left Active Cyan Indicator Bar */}
                  {active && (
                    <span className="absolute left-0 top-1.5 bottom-1.5 w-1 bg-[#01B0F1] rounded-r-full" />
                  )}

                  <Icon
                    className={`w-[18px] h-[18px] shrink-0 ${
                      active ? 'text-[#01B0F1]' : 'text-[#94A3B8] group-hover:text-white'
                    }`}
                  />

                  {!collapsed && (
                    <span className="truncate flex-1 text-left">{item.label}</span>
                  )}

                  {!collapsed && item.badge && (
                    <span
                      className={`text-[11px] font-semibold px-2 py-0.5 rounded-full shrink-0 ${
                        item.badgeColor || 'bg-[#FD7A12] text-white'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* ACCOUNT Group */}
        <div>
          {!collapsed && (
            <div className="px-3 pb-2 text-[10px] font-bold text-[#94A3B8] tracking-widest uppercase">
              ACCOUNT
            </div>
          )}
          <nav className="space-y-1">
            <button
              onClick={() => setCurrentScreen('student-settings')}
              className={`w-full h-[42px] relative flex items-center rounded-lg text-sm font-medium transition-all ${
                collapsed ? 'justify-center px-0' : 'px-3 gap-3'
              } ${
                currentScreen === 'student-settings'
                  ? 'bg-[#164783] text-white shadow-xs'
                  : 'text-[#94A3B8] hover:text-white hover:bg-white/5'
              }`}
              title={collapsed ? 'Settings' : undefined}
            >
              {currentScreen === 'student-settings' && (
                <span className="absolute left-0 top-1.5 bottom-1.5 w-1 bg-[#01B0F1] rounded-r-full" />
              )}
              <Settings
                className={`w-[18px] h-[18px] shrink-0 ${
                  currentScreen === 'student-settings'
                    ? 'text-[#01B0F1]'
                    : 'text-[#94A3B8]'
                }`}
              />
              {!collapsed && (
                <span className="truncate flex-1 text-left">
                  {currentRole === 'supervisor' ? 'Supervisor Profile' : 'Settings'}
                </span>
              )}
            </button>
          </nav>
        </div>

        {/* Role Quick Switcher in Sidebar */}
        <div className="pt-2">
          {!collapsed && (
            <div className="px-3 pb-2 text-[10px] font-bold text-[#94A3B8] tracking-widest uppercase flex items-center justify-between">
              <span>SWITCH PORTAL ROLE</span>
              <ArrowRightLeft className="w-3 h-3 text-[#01B0F1]" />
            </div>
          )}
          <div className="space-y-1">
            <button
              onClick={() => switchRole('student')}
              className={`w-full px-3 py-1.5 rounded-lg text-xs font-medium text-left flex items-center gap-2 transition-colors ${
                currentRole === 'student'
                  ? 'bg-[#01B0F1]/20 text-[#01B0F1] font-semibold'
                  : 'text-[#94A3B8] hover:text-white hover:bg-white/5'
              }`}
            >
              <GraduationCap className="w-4 h-4 shrink-0" />
              {!collapsed && <span>Student (Ayesha)</span>}
            </button>
            <button
              onClick={() => switchRole('supervisor')}
              className={`w-full px-3 py-1.5 rounded-lg text-xs font-medium text-left flex items-center gap-2 transition-colors ${
                currentRole === 'supervisor'
                  ? 'bg-[#01B0F1]/20 text-[#01B0F1] font-semibold'
                  : 'text-[#94A3B8] hover:text-white hover:bg-white/5'
              }`}
            >
              <Users className="w-4 h-4 shrink-0" />
              {!collapsed && <span>Supervisor (Dr. Rahman)</span>}
            </button>
            <button
              onClick={() => switchRole('jury')}
              className={`w-full px-3 py-1.5 rounded-lg text-xs font-medium text-left flex items-center gap-2 transition-colors ${
                currentRole === 'jury'
                  ? 'bg-[#01B0F1]/20 text-[#01B0F1] font-semibold'
                  : 'text-[#94A3B8] hover:text-white hover:bg-white/5'
              }`}
            >
              <Award className="w-4 h-4 shrink-0" />
              {!collapsed && <span>Jury (Prof. Mansoor)</span>}
            </button>
            <button
              onClick={() => switchRole('coordinator')}
              className={`w-full px-3 py-1.5 rounded-lg text-xs font-medium text-left flex items-center gap-2 transition-colors ${
                currentRole === 'coordinator'
                  ? 'bg-[#01B0F1]/20 text-[#01B0F1] font-semibold'
                  : 'text-[#94A3B8] hover:text-white hover:bg-white/5'
              }`}
            >
              <ShieldCheck className="w-4 h-4 shrink-0" />
              {!collapsed && <span>Coordinator (Admin)</span>}
            </button>
          </div>
        </div>
      </div>

      {/* Footer Branding */}
      <div className="p-4 border-t border-white/10 shrink-0 text-xs">
        <div className="flex items-center gap-2 mb-1">
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          {!collapsed && (
            <span className="text-[#94A3B8] font-mono text-[11px]">Academic year</span>
          )}
        </div>
        {!collapsed ? (
          <div>
            <div className="text-white font-medium text-xs font-mono">2024 — 2025</div>
            <div className="text-[#94A3B8] text-[10px] mt-1 uppercase font-semibold leading-tight">
              KIET University / NUTECH
            </div>
          </div>
        ) : (
          <div className="text-[10px] text-white font-mono text-center">24-25</div>
        )}
      </div>
    </aside>
  );
};
