import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Sidebar } from './components/layout/Sidebar';
import { TopNavbar } from './components/layout/TopNavbar';
import { HandbookModal } from './components/layout/HandbookModal';
import { ToastContainer } from './components/common/Toast';

// Auth Screens
import { SignInScreen } from './components/auth/SignInScreen';
import { RegisterScreen } from './components/auth/RegisterScreen';
import { RecoveryScreen } from './components/auth/RecoveryScreen';

// Student Screens
import { StudentDashboard } from './components/student/StudentDashboard';
import { MyProjectScreen } from './components/student/MyProjectScreen';
import { ProposalSubmissionOverview } from './components/student/ProposalSubmissionOverview';
import { ProposalFormScreen } from './components/student/ProposalFormScreen';
import { ProposalReviewAllScreen } from './components/student/ProposalReviewAllScreen';
import { AIAnalysisOverviewScreen } from './components/student/AIAnalysisOverviewScreen';
import { AIAnalysisDetailScreen } from './components/student/AIAnalysisDetailScreen';
import { ProposalCompareScreen } from './components/student/ProposalCompareScreen';
import { TasksMilestonesScreen } from './components/student/TasksMilestonesScreen';
import { MilestoneDetailScreen } from './components/student/MilestoneDetailScreen';
import { AssignmentDetailScreen } from './components/student/AssignmentDetailScreen';
import { ProgressTrackingScreen } from './components/student/ProgressTrackingScreen';
import { EvaluationResultsScreen } from './components/student/EvaluationResultsScreen';
import { EvaluationBreakdownScreen } from './components/student/EvaluationBreakdownScreen';
import { SettingsScreen } from './components/student/SettingsScreen';

// Supervisor Screens
import { SupervisorDashboard } from './components/supervisor/SupervisorDashboard';
import { SubmissionReviewScreen } from './components/supervisor/SubmissionReviewScreen';
import { SupervisedProjectsScreen } from './components/supervisor/SupervisedProjectsScreen';
import { SupervisorMilestonesScreen } from './components/supervisor/SupervisorMilestonesScreen';

// Jury & Coordinator Screens
import { JuryEvaluationScreen } from './components/jury/JuryEvaluationScreen';
import { CoordinatorDashboard } from './components/coordinator/CoordinatorDashboard';

const MainLayout: React.FC<{ onSignOut?: () => void }> = ({ onSignOut }) => {
  const { currentScreen, setCurrentScreen } = useApp();
  const [collapsed, setCollapsed] = useState(false);

  React.useEffect(() => {
    if (
      currentScreen === 'auth-signin' ||
      currentScreen === 'auth-register' ||
      currentScreen === 'auth-recovery'
    ) {
      if (onSignOut) {
        onSignOut();
      }
      setCurrentScreen('student-dashboard');
    }
  }, [currentScreen, onSignOut, setCurrentScreen]);

  return (
    <div className="min-h-screen bg-[#F4F6F9] text-[#1E293B] antialiased">
      {/* Toast Notification Container */}
      <ToastContainer />

      {/* FYP Handbook Modal */}
      <HandbookModal />

      {/* Sidebar Navigation */}
      <Sidebar collapsed={collapsed} onToggleCollapse={() => setCollapsed(!collapsed)} />

      {/* Top Header */}
      <TopNavbar collapsed={collapsed} />

      {/* Main Viewport Content */}
      <main
        className={`pt-[88px] px-6 sm:px-8 pb-16 transition-all duration-200 ${
          collapsed ? 'ml-[76px]' : 'ml-[250px]'
        }`}
      >
        {/* Student Screens */}
        {currentScreen === 'student-dashboard' && <StudentDashboard />}
        {currentScreen === 'student-my-project' && <MyProjectScreen />}
        {currentScreen === 'student-proposal-overview' && <ProposalSubmissionOverview />}
        {currentScreen === 'student-proposal-form' && <ProposalFormScreen />}
        {currentScreen === 'student-proposal-review' && <ProposalReviewAllScreen />}
        {currentScreen === 'student-ai-analysis' && <AIAnalysisOverviewScreen />}
        {currentScreen === 'student-ai-results' && <AIAnalysisDetailScreen />}
        {currentScreen === 'student-proposal-compare' && <ProposalCompareScreen />}
        {currentScreen === 'student-milestones' && <TasksMilestonesScreen />}
        {currentScreen === 'student-milestone-detail' && <MilestoneDetailScreen />}
        {currentScreen === 'student-assignment-detail' && <AssignmentDetailScreen />}
        {currentScreen === 'student-progress' && <ProgressTrackingScreen />}
        {currentScreen === 'student-evaluation' && <EvaluationResultsScreen />}
        {currentScreen === 'student-evaluation-breakdown' && <EvaluationBreakdownScreen />}
        {currentScreen === 'student-settings' && <SettingsScreen />}

        {/* Supervisor Screens */}
        {currentScreen === 'supervisor-dashboard' && <SupervisorDashboard />}
        {currentScreen === 'supervisor-submissions' && <SubmissionReviewScreen />}
        {currentScreen === 'supervisor-projects' && <SupervisedProjectsScreen />}
        {currentScreen === 'supervisor-milestones' && <SupervisorMilestonesScreen />}

        {/* Jury & Coordinator Screens */}
        {currentScreen === 'jury-evaluation' && <JuryEvaluationScreen />}
        {currentScreen === 'coordinator-dashboard' && <CoordinatorDashboard />}
      </main>
    </div>
  );
};

export default function StudentApp({ onSignOut }: { onSignOut?: () => void } = {}) {
  return (
    <AppProvider>
      <MainLayout onSignOut={onSignOut} />
    </AppProvider>
  );
}
