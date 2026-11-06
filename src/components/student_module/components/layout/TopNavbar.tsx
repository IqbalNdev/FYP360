import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Bell,
  Search,
  ChevronDown,
  BookOpen,
  LogOut,
  User,
  Shield,
  CheckCircle,
  AlertTriangle,
  Clock,
  Sparkles
} from 'lucide-react';

interface TopNavbarProps {
  collapsed: boolean;
}

export const TopNavbar: React.FC<TopNavbarProps> = ({ collapsed }) => {
  const {
    currentUser,
    currentRole,
    currentScreen,
    setCurrentScreen,
    switchRole,
    setHandbookOpen,
    showToast,
  } = useApp();

  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  // Generate Breadcrumb text based on currentScreen
  const getBreadcrumbs = () => {
    switch (currentScreen) {
      case 'student-dashboard':
        return ['Student Portal', 'Dashboard'];
      case 'student-my-project':
        return ['Student Portal', 'My Project'];
      case 'student-proposal-overview':
        return ['Student Portal', 'Proposal Submission'];
      case 'student-proposal-form':
        return ['Student Portal', 'Proposal Submission', 'Edit Proposal'];
      case 'student-proposal-review':
        return ['Student Portal', 'Proposal Submission', 'Review All'];
      case 'student-ai-analysis':
        return ['Student Portal', 'AI Analysis'];
      case 'student-ai-results':
        return ['Student Portal', 'AI Analysis', 'Proposal 1'];
      case 'student-proposal-compare':
        return ['Dashboard', 'AI Analysis', 'Compare Proposals'];
      case 'student-milestones':
        return ['Student Portal', 'Tasks & Milestones'];
      case 'student-milestone-detail':
        return ['Student Portal', 'Tasks & Milestones', 'Milestone 1'];
      case 'student-assignment-detail':
        return ['Student Portal', 'Tasks & Milestones', 'Assignment'];
      case 'student-progress':
        return ['Student Portal', 'Progress Tracking'];
      case 'student-evaluation':
        return ['Student Portal', 'Evaluation'];
      case 'student-evaluation-breakdown':
        return ['Student Portal', 'Evaluation', 'FYP1 Breakdown'];
      case 'student-settings':
        return ['Student Portal', 'Settings'];
      case 'supervisor-dashboard':
        return ['Supervisor Portal', 'Dashboard'];
      case 'supervisor-submissions':
        return ['Supervisor Portal', 'Submission Reviews'];
      case 'supervisor-projects':
        return ['Supervisor Portal', 'My Supervised Projects'];
      case 'supervisor-milestones':
        return ['Supervisor Portal', 'Progress & Milestones'];
      case 'jury-evaluation':
        return ['Jury Portal', 'Defense Evaluations'];
      case 'coordinator-dashboard':
        return ['Coordinator Portal', 'Program Administration'];
      default:
        return ['Portal', 'Workspace'];
    }
  };

  const breadcrumbs = getBreadcrumbs();

  const notifications = [
    {
      id: 'notif-1',
      title: 'Milestone 3 is Overdue',
      description: 'Complete system architecture package was due Oct 17, 2026.',
      time: '2 hours ago',
      type: 'warning',
    },
    {
      id: 'notif-2',
      title: 'Supervisor Feedback Posted',
      description: 'Dr. Ahmed Rahman reviewed your architecture draft.',
      time: 'Yesterday',
      type: 'info',
    },
    {
      id: 'notif-3',
      title: 'Proposal Approved by Department',
      description: 'AI-Powered Student Career Guidance System officially approved.',
      time: 'Aug 8',
      type: 'success',
    },
  ];

  return (
    <header
      className={`fixed top-0 right-0 z-30 h-[68px] bg-white border-b border-[#E2E8F0] flex items-center justify-between px-6 transition-all duration-200 ${
        collapsed ? 'left-[76px]' : 'left-[250px]'
      }`}
    >
      {/* Left: Institutional Breadcrumbs */}
      <div className="flex items-center gap-2 text-sm">
        {breadcrumbs.map((crumb, idx) => (
          <React.Fragment key={idx}>
            {idx > 0 && <span className="text-[#94A3B8]">/</span>}
            <span
              className={
                idx === breadcrumbs.length - 1
                  ? 'font-semibold text-[#1E293B]'
                  : 'text-[#64748B]'
              }
            >
              {crumb}
            </span>
          </React.Fragment>
        ))}
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-4">
        {/* Handbook Button */}
        <button
          onClick={() => setHandbookOpen(true)}
          className="hidden md:flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-[#002D71] bg-slate-50 border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors"
          title="Open FYP Handbook"
        >
          <BookOpen className="w-3.5 h-3.5 text-[#01B0F1]" />
          <span>FYP Handbook</span>
        </button>

        {/* Notification Bell */}
        <div className="relative">
          <button
            onClick={() => {
              setNotificationsOpen(!notificationsOpen);
              setProfileMenuOpen(false);
            }}
            className="relative p-2 text-[#64748B] hover:text-[#1E293B] rounded-lg hover:bg-slate-100 transition-colors"
            title="Notifications"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#FD7A12] ring-2 ring-white animate-pulse" />
          </button>

          {/* Notifications Dropdown */}
          {notificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in duration-100">
              <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold text-[#1E293B] uppercase tracking-wider">
                  Notifications
                </span>
                <span className="text-[10px] font-semibold text-[#FD7A12] bg-[#FD7A12]/10 px-2 py-0.5 rounded-full">
                  1 Overdue
                </span>
              </div>
              <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto">
                {notifications.map((n) => (
                  <div key={n.id} className="p-3 hover:bg-slate-50 transition-colors text-xs">
                    <div className="flex items-start gap-2.5">
                      {n.type === 'warning' ? (
                        <AlertTriangle className="w-4 h-4 text-[#FD7A12] shrink-0 mt-0.5" />
                      ) : n.type === 'info' ? (
                        <Clock className="w-4 h-4 text-[#01B0F1] shrink-0 mt-0.5" />
                      ) : (
                        <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      )}
                      <div className="flex-1">
                        <div className="font-semibold text-slate-800">{n.title}</div>
                        <div className="text-slate-500 mt-0.5 leading-snug">{n.description}</div>
                        <div className="text-[10px] text-slate-400 mt-1">{n.time}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="px-4 py-2 border-t border-slate-100 text-center">
                <button
                  onClick={() => {
                    setNotificationsOpen(false);
                    setCurrentScreen('student-milestones');
                  }}
                  className="text-xs font-semibold text-[#002D71] hover:underline"
                >
                  View all upcoming deliverables
                </button>
              </div>
            </div>
          )}
        </div>

        {/* User Profile Badge */}
        <div className="relative">
          <button
            onClick={() => {
              setProfileMenuOpen(!profileMenuOpen);
              setNotificationsOpen(false);
            }}
            className="flex items-center gap-3 p-1.5 rounded-xl hover:bg-slate-100 transition-colors text-left"
          >
            <div className="w-9 h-9 rounded-full bg-[#E2E8F0] text-[#002D71] flex items-center justify-center font-bold text-sm shrink-0 border border-slate-300">
              {currentUser.initials}
            </div>
            <div className="hidden sm:block text-left pr-1">
              <div className="text-sm font-semibold text-[#1E293B] leading-tight">
                {currentUser.name}
              </div>
              <div className="text-[11px] text-[#64748B] leading-tight">
                {currentUser.department}
              </div>
            </div>
            <ChevronDown className="w-4 h-4 text-[#64748B]" />
          </button>

          {/* Profile Dropdown Menu */}
          {profileMenuOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in duration-100 text-xs">
              <div className="px-4 py-2.5 border-b border-slate-100">
                <div className="font-bold text-slate-900">{currentUser.name}</div>
                <div className="text-slate-500 font-mono text-[11px]">{currentUser.email}</div>
                <div className="mt-1.5 inline-block px-2 py-0.5 bg-slate-100 rounded text-[10px] font-medium text-slate-700 capitalize">
                  Role: {currentUser.role}
                </div>
              </div>

              <div className="py-1">
                <button
                  onClick={() => {
                    setProfileMenuOpen(false);
                    setCurrentScreen('student-settings');
                  }}
                  className="w-full px-4 py-2 text-left hover:bg-slate-50 flex items-center gap-2 text-slate-700"
                >
                  <User className="w-4 h-4 text-slate-400" />
                  <span>Account & Profile Settings</span>
                </button>
                <button
                  onClick={() => {
                    setProfileMenuOpen(false);
                    setHandbookOpen(true);
                  }}
                  className="w-full px-4 py-2 text-left hover:bg-slate-50 flex items-center gap-2 text-slate-700"
                >
                  <BookOpen className="w-4 h-4 text-slate-400" />
                  <span>FYP Handbook & Guidelines</span>
                </button>
              </div>

              <div className="border-t border-slate-100 pt-1">
                <div className="px-4 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Switch Active Role
                </div>
                <button
                  onClick={() => {
                    switchRole('student');
                    setProfileMenuOpen(false);
                  }}
                  className={`w-full px-4 py-1.5 text-left hover:bg-slate-50 flex items-center justify-between ${
                    currentRole === 'student' ? 'font-bold text-[#002D71]' : 'text-slate-600'
                  }`}
                >
                  <span>Student (Ayesha Khan)</span>
                  {currentRole === 'student' && <CheckCircle className="w-3.5 h-3.5 text-[#01B0F1]" />}
                </button>
                <button
                  onClick={() => {
                    switchRole('supervisor');
                    setProfileMenuOpen(false);
                  }}
                  className={`w-full px-4 py-1.5 text-left hover:bg-slate-50 flex items-center justify-between ${
                    currentRole === 'supervisor' ? 'font-bold text-[#002D71]' : 'text-slate-600'
                  }`}
                >
                  <span>Supervisor (Dr. Ahmed Rahman)</span>
                  {currentRole === 'supervisor' && <CheckCircle className="w-3.5 h-3.5 text-[#01B0F1]" />}
                </button>
                <button
                  onClick={() => {
                    switchRole('jury');
                    setProfileMenuOpen(false);
                  }}
                  className={`w-full px-4 py-1.5 text-left hover:bg-slate-50 flex items-center justify-between ${
                    currentRole === 'jury' ? 'font-bold text-[#002D71]' : 'text-slate-600'
                  }`}
                >
                  <span>Jury Member (Prof. Tariq Mansoor)</span>
                  {currentRole === 'jury' && <CheckCircle className="w-3.5 h-3.5 text-[#01B0F1]" />}
                </button>
                <button
                  onClick={() => {
                    switchRole('coordinator');
                    setProfileMenuOpen(false);
                  }}
                  className={`w-full px-4 py-1.5 text-left hover:bg-slate-50 flex items-center justify-between ${
                    currentRole === 'coordinator' ? 'font-bold text-[#002D71]' : 'text-slate-600'
                  }`}
                >
                  <span>FYP Coordinator (Dr. Fauzia Naveed)</span>
                  {currentRole === 'coordinator' && <CheckCircle className="w-3.5 h-3.5 text-[#01B0F1]" />}
                </button>
              </div>

              <div className="border-t border-slate-100 pt-1">
                <button
                  onClick={() => {
                    setProfileMenuOpen(false);
                    setCurrentScreen('auth-signin');
                    showToast('Signed out of FYP360 session', 'info');
                  }}
                  className="w-full px-4 py-2 text-left hover:bg-rose-50 text-[#C2392F] flex items-center gap-2 font-medium"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
