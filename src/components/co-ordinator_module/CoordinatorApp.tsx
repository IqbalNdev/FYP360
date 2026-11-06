import { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import { currentUser as initialUser, initialProposals } from './mockData';
import { AppView, ProposalItem, UserProfile } from './types';
import ApprovalStep1View from './views/ApprovalStep1View';
import ApprovalStep2View from './views/ApprovalStep2View';
import ApprovalStep3View from './views/ApprovalStep3View';
import DashboardView from './views/DashboardView';
import EvaluationView from './views/EvaluationView';
import GroupsProjectsView from './views/GroupsProjectsView';
import LoginView from './views/LoginView';
import ProposalReviewView from './views/ProposalReviewView';
import ProposalsView from './views/ProposalsView';
import RepositoryView from './views/RepositoryView';
import RiskMonitorView from './views/RiskMonitorView';
import SettingsView from './views/SettingsView';

export default function CoordinatorApp({ onSignOut }: { onSignOut?: () => void } = {}) {
  const [currentView, setCurrentView] = useState<AppView>('dashboard');
  const [user, setUser] = useState<UserProfile>(initialUser);
  const [selectedProposal, setSelectedProposal] = useState<ProposalItem>(initialProposals[0]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Helper to show transient floating toasts
  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage((prev) => (prev === message ? null : prev));
    }, 3500);
  };

  const handleSelectProposal = (proposal: ProposalItem) => {
    setSelectedProposal(proposal);
    setCurrentView('proposal-review');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigate = (view: AppView) => {
    if (view === 'login') {
      handleSignOut();
      return;
    }
    setCurrentView(view);
    setIsMobileSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogin = (role: 'coordinator' | 'supervisor') => {
    if (role === 'coordinator') {
      setUser({
        name: 'Dr. Nadia Hussain',
        email: 'n.hussain@university.edu',
        role: 'coordinator',
        initials: 'NH',
        department: 'FYP Committee, Department of Computer Science',
      });
    } else {
      setUser({
        name: 'Dr. Ahmed Rahman',
        email: 'a.rahman@university.edu',
        role: 'supervisor',
        initials: 'AR',
        department: 'Department of Computer Science',
      });
    }
    setCurrentView('dashboard');
    showToast(`Signed in successfully as ${role === 'coordinator' ? 'Coordinator' : 'Supervisor'}.`);
  };

  const handleSignOut = () => {
    if (onSignOut) {
      onSignOut();
    } else {
      setCurrentView('dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F6F9] text-[#1E293B] antialiased">
      {/* Fixed Sidebar for desktop + drawer for mobile */}
      <Sidebar
        currentView={currentView}
        onNavigate={handleNavigate}
        proposalsCount={12}
        isMobileOpen={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      {/* Main Content Area pushed by sidebar width (260px) on desktop */}
      <div className="lg:pl-[260px] flex flex-col min-h-screen">
        {/* Fixed Header */}
        <Header
          currentView={currentView}
          user={user}
          onNavigate={handleNavigate}
          onSignOut={handleSignOut}
          onOpenMobileSidebar={() => setIsMobileSidebarOpen(true)}
          onShowToast={showToast}
        />

        {/* View Router Main Container */}
        <main className="pt-[72px] flex-1 px-4 sm:px-8 lg:px-10 py-8 max-w-[1440px] w-full mx-auto">
          {currentView === 'dashboard' && (
            <DashboardView
              onNavigate={handleNavigate}
              onSelectProposal={handleSelectProposal}
            />
          )}

          {currentView === 'proposals' && (
            <ProposalsView
              onSelectProposal={handleSelectProposal}
              onNavigate={handleNavigate}
            />
          )}

          {currentView === 'proposal-review' && (
            <ProposalReviewView
              proposal={selectedProposal}
              onNavigate={handleNavigate}
              onShowToast={showToast}
            />
          )}

          {currentView === 'approval-step-1' && (
            <ApprovalStep1View
              proposal={selectedProposal}
              onNavigate={handleNavigate}
              onShowToast={showToast}
            />
          )}

          {currentView === 'approval-step-2' && (
            <ApprovalStep2View
              proposal={selectedProposal}
              onNavigate={handleNavigate}
              onShowToast={showToast}
            />
          )}

          {currentView === 'approval-step-3' && (
            <ApprovalStep3View
              proposal={selectedProposal}
              onNavigate={handleNavigate}
              onShowToast={showToast}
            />
          )}

          {currentView === 'groups-projects' && (
            <GroupsProjectsView
              onShowToast={showToast}
              onNavigate={handleNavigate}
            />
          )}

          {currentView === 'risk-monitor' && (
            <RiskMonitorView
              onShowToast={showToast}
              onNavigate={handleNavigate}
            />
          )}

          {currentView === 'evaluation' && (
            <EvaluationView
              onShowToast={showToast}
            />
          )}

          {currentView === 'repository' && (
            <RepositoryView
              onShowToast={showToast}
            />
          )}

          {currentView === 'settings' && (
            <SettingsView
              user={user}
              onUpdateUser={(updated) => setUser((prev) => ({ ...prev, ...updated }))}
              onShowToast={showToast}
              onSignOut={handleSignOut}
            />
          )}
        </main>
      </div>

      {/* Floating Action Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#002D71] text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2.5 border border-white/10 animate-slideUp">
          <span className="material-symbols-outlined text-[#FD7A12] text-[20px]">
            notifications_active
          </span>
          <span className="font-label-lg text-xs leading-none">{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
