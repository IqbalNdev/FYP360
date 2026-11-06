import React, { Suspense, lazy } from 'react';
import { AuthProvider, useAuth } from './shell/AuthContext';
import { UnifiedLogin } from './shell/UnifiedLogin';

const StudentApp = lazy(() => import('./components/student_module/StudentApp'));
const SupervisorApp = lazy(() => import('./components/supervisor_module/SupervisorApp'));
const JuryApp = lazy(() => import('./components/jury_module/JuryApp'));
const CoordinatorApp = lazy(() => import('./components/co-ordinator_module/CoordinatorApp'));

const LoadingFallback: React.FC = () => (
  <div className="min-h-screen bg-[#F4F6F9] flex flex-col items-center justify-center gap-3">
    <div className="w-10 h-10 border-4 border-[#002D71] border-t-[#FD7A12] rounded-full animate-spin"></div>
    <span className="font-body-md text-sm text-[#64748B]">Loading portal module...</span>
  </div>
);

const AppContent: React.FC = () => {
  const { role, logout } = useAuth();

  if (!role) {
    return <UnifiedLogin />;
  }

  return (
    <Suspense fallback={<LoadingFallback />}>
      {role === 'student' && <StudentApp onSignOut={logout} />}
      {role === 'supervisor' && <SupervisorApp onSignOut={logout} />}
      {role === 'jury' && <JuryApp onSignOut={logout} />}
      {role === 'coordinator' && <CoordinatorApp onSignOut={logout} />}
    </Suspense>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

