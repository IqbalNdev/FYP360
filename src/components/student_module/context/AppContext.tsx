import React, { createContext, useContext, useState } from 'react';
import {
  UserProfile,
  UserRole,
  Milestone,
  ProjectProposal,
  SubmissionReviewItem,
  EvaluationItem,
  OfficialProject
} from '../types';
import {
  mockStudentUser,
  mockSupervisorUser,
  mockJuryUser,
  mockCoordinatorUser,
  mockOfficialProject,
  initialMilestones,
  initialProposals,
  mockEvaluationItems,
  mockSupervisorSubmissions
} from '../data/mockData';

export type ScreenId =
  // Student screens
  | 'student-dashboard'
  | 'student-my-project'
  | 'student-proposal-overview'
  | 'student-proposal-form'
  | 'student-proposal-review'
  | 'student-ai-analysis'
  | 'student-ai-results'
  | 'student-proposal-compare'
  | 'student-milestones'
  | 'student-milestone-detail'
  | 'student-assignment-detail'
  | 'student-progress'
  | 'student-evaluation'
  | 'student-evaluation-breakdown'
  | 'student-settings'
  // Supervisor screens
  | 'supervisor-dashboard'
  | 'supervisor-submissions'
  | 'supervisor-projects'
  | 'supervisor-milestones'
  // Jury screens
  | 'jury-evaluation'
  // Coordinator screens
  | 'coordinator-dashboard'
  // Auth screens
  | 'auth-signin'
  | 'auth-register'
  | 'auth-recovery';

interface ToastInfo {
  id: string;
  message: string;
  type: 'success' | 'warning' | 'info' | 'error';
}

interface AppContextType {
  currentUser: UserProfile;
  currentRole: UserRole;
  currentScreen: ScreenId;
  setCurrentScreen: (screen: ScreenId) => void;
  switchRole: (role: UserRole) => void;
  officialProject: OfficialProject;
  updateOfficialProject: (proj: Partial<OfficialProject>) => void;
  milestones: Milestone[];
  activeMilestoneId: number;
  setActiveMilestoneId: (id: number) => void;
  activeTaskId: string;
  setActiveTaskId: (id: string) => void;
  proposals: ProjectProposal[];
  activeProposalId: string;
  setActiveProposalId: (id: string) => void;
  saveProposal: (proposal: ProjectProposal) => void;
  submitAllProposals: () => void;
  supervisorSubmissions: SubmissionReviewItem[];
  activeSubmissionId: string;
  setActiveSubmissionId: (id: string) => void;
  reviewSubmission: (
    submissionId: string,
    action: 'accept' | 'revision' | 'pending',
    feedback: string
  ) => void;
  assignSupervisorTask: (
    milestoneId: number,
    taskName: string,
    deadline: string,
    attachment?: string
  ) => void;
  unlockNextMilestone: (milestoneId: number) => void;
  evaluationItems: EvaluationItem[];
  coordinatorConfirmedFYP1: boolean;
  toggleCoordinatorConfirmation: () => void;
  updateEvaluationMarks: (index: number, marks: number, feedback: string) => void;
  // Feedback modal
  isFeedbackModalOpen: boolean;
  setFeedbackModalOpen: (open: boolean) => void;
  // Handbook modal
  isHandbookOpen: boolean;
  setHandbookOpen: (open: boolean) => void;
  // Toast notifications
  toasts: ToastInfo[];
  showToast: (message: string, type?: 'success' | 'warning' | 'info' | 'error') => void;
  removeToast: (id: string) => void;
  // User profile update
  updateStudentProfile: (phone: string) => void;
  // Simulation helpers
  simulateDeadlineExpiry: (taskId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentRole, setCurrentRole] = useState<UserRole>('student');
  const [currentUser, setCurrentUser] = useState<UserProfile>(mockStudentUser);
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('student-dashboard');

  const [officialProject, setOfficialProject] = useState<OfficialProject>(mockOfficialProject);
  const [milestones, setMilestones] = useState<Milestone[]>(initialMilestones);
  const [activeMilestoneId, setActiveMilestoneId] = useState<number>(1);
  const [activeTaskId, setActiveTaskId] = useState<string>('M1-T1');

  const [proposals, setProposals] = useState<ProjectProposal[]>(initialProposals);
  const [activeProposalId, setActiveProposalId] = useState<string>('prop-1');

  const [supervisorSubmissions, setSupervisorSubmissions] =
    useState<SubmissionReviewItem[]>(mockSupervisorSubmissions);
  const [activeSubmissionId, setActiveSubmissionId] = useState<string>('sub-042');

  const [evaluationItems, setEvaluationItems] = useState<EvaluationItem[]>(mockEvaluationItems);
  const [coordinatorConfirmedFYP1, setCoordinatorConfirmedFYP1] = useState<boolean>(false);

  const [isFeedbackModalOpen, setFeedbackModalOpen] = useState<boolean>(false);
  const [isHandbookOpen, setHandbookOpen] = useState<boolean>(false);
  const [toasts, setToasts] = useState<ToastInfo[]>([]);

  const showToast = (message: string, type: 'success' | 'warning' | 'info' | 'error' = 'success') => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const switchRole = (role: UserRole) => {
    setCurrentRole(role);
    if (role === 'student') {
      setCurrentUser(mockStudentUser);
      setCurrentScreen('student-dashboard');
      showToast('Switched to Student Portal (Ayesha Khan)', 'info');
    } else if (role === 'supervisor') {
      setCurrentUser(mockSupervisorUser);
      setCurrentScreen('supervisor-dashboard');
      showToast('Switched to Supervisor Portal (Dr. Ahmed Rahman)', 'info');
    } else if (role === 'jury') {
      setCurrentUser(mockJuryUser);
      setCurrentScreen('jury-evaluation');
      showToast('Switched to Jury Member Portal (Prof. Tariq Mansoor)', 'info');
    } else if (role === 'coordinator') {
      setCurrentUser(mockCoordinatorUser);
      setCurrentScreen('coordinator-dashboard');
      showToast('Switched to FYP Coordinator Portal (Dr. Fauzia Naveed)', 'info');
    }
  };

  const updateOfficialProject = (proj: Partial<OfficialProject>) => {
    setOfficialProject((prev) => ({ ...prev, ...proj }));
  };

  const saveProposal = (updatedProposal: ProjectProposal) => {
    setProposals((prev) =>
      prev.map((p) => (p.id === updatedProposal.id ? updatedProposal : p))
    );
    showToast(`Proposal ${updatedProposal.number} saved successfully`, 'success');
  };

  const submitAllProposals = () => {
    setProposals((prev) =>
      prev.map((p) => ({ ...p, status: 'Approved' }))
    );
    showToast('All three proposals submitted for departmental review', 'success');
    setCurrentScreen('student-proposal-overview');
  };

  const reviewSubmission = (
    submissionId: string,
    action: 'accept' | 'revision' | 'pending',
    feedback: string
  ) => {
    setSupervisorSubmissions((prev) =>
      prev.map((item) => {
        if (item.id === submissionId) {
          const status =
            action === 'accept'
              ? 'accepted'
              : action === 'revision'
              ? 'revision_requested'
              : 'pending_review';
          return {
            ...item,
            status,
            supervisorFeedback: feedback,
          };
        }
        return item;
      })
    );

    // If active project submission, sync with student milestone state
    const matchedSub = supervisorSubmissions.find((s) => s.id === submissionId);
    if (matchedSub && matchedSub.projectId === 'proj-042') {
      setMilestones((prev) =>
        prev.map((m) => {
          if (m.id === matchedSub.milestoneId) {
            const updatedTasks = m.tasks.map((t) => {
              return {
                ...t,
                status:
                  action === 'accept'
                    ? ('completed' as const)
                    : action === 'revision'
                    ? ('revision_required' as const)
                    : ('in_progress' as const),
                supervisorFeedback: {
                  feedbackText: feedback,
                  providedAt: 'Just now',
                  supervisorName: 'Dr. Ahmed Rahman',
                },
                submission: t.submission
                  ? {
                      ...t.submission,
                      status:
                        action === 'accept'
                          ? ('accepted' as const)
                          : action === 'revision'
                          ? ('revision_requested' as const)
                          : ('pending_review' as const),
                    }
                  : undefined,
              };
            });
            const allCompleted = updatedTasks.every((t) => t.status === 'completed');
            return {
              ...m,
              status: allCompleted ? ('completed' as const) : m.status,
              completedTasksCount: updatedTasks.filter((t) => t.status === 'completed').length,
              tasks: updatedTasks,
            };
          }
          return m;
        })
      );
    }

    if (action === 'accept') {
      showToast('Submission accepted. Student cohort notified.', 'success');
    } else if (action === 'revision') {
      showToast('Revision requested. Student lead notified via email & portal.', 'warning');
    } else {
      showToast('Submission kept as pending review.', 'info');
    }
  };

  const assignSupervisorTask = (
    milestoneId: number,
    taskName: string,
    deadline: string,
    attachment?: string
  ) => {
    const newTask = {
      id: `M${milestoneId}-T${Date.now().toString().slice(-3)}`,
      milestoneId,
      title: taskName,
      description: 'Assigned deliverable by supervisor for milestone completion.',
      instructions: `Please review attached instructions: ${attachment || 'Deliverable specs'}`,
      requiredDeliverables: [attachment || 'Project documentation artifact PDF'],
      meetingDate: 'Scheduled this week',
      deadline,
      status: 'not_started' as const,
      assignedBy: 'Dr. Ahmed Rahman (Lead Advisor)',
    };

    setMilestones((prev) =>
      prev.map((m) => {
        if (m.id === milestoneId) {
          return {
            ...m,
            tasksCount: m.tasksCount + 1,
            tasks: [...m.tasks, newTask],
          };
        }
        return m;
      })
    );

    showToast(`Assigned new task "${taskName}" to Milestone ${milestoneId}`, 'success');
  };

  const unlockNextMilestone = (milestoneId: number) => {
    setMilestones((prev) =>
      prev.map((m) => {
        if (m.id === milestoneId) {
          return {
            ...m,
            status: 'completed' as const,
            completedTasksCount: m.tasksCount,
            tasks: m.tasks.map((t) => ({ ...t, status: 'completed' as const })),
          };
        }
        if (m.id === milestoneId + 1) {
          return {
            ...m,
            status: 'in_progress' as const,
          };
        }
        return m;
      })
    );
    showToast(`Milestone ${milestoneId} marked completed! Milestone ${milestoneId + 1} unlocked.`, 'success');
  };

  const toggleCoordinatorConfirmation = () => {
    setCoordinatorConfirmedFYP1((prev) => !prev);
    showToast(
      !coordinatorConfirmedFYP1
        ? 'FYP1 Official Result Confirmed! FYP2 unlocked.'
        : 'FYP1 Result returned to Awaiting Confirmation.',
      'info'
    );
  };

  const updateEvaluationMarks = (index: number, marks: number, feedback: string) => {
    setEvaluationItems((prev) =>
      prev.map((item, idx) =>
        idx === index
          ? { ...item, obtainedMarks: marks, feedback, status: 'Published' }
          : item
      )
    );
    showToast('Evaluation marks and comments recorded', 'success');
  };

  const updateStudentProfile = (phone: string) => {
    setCurrentUser((prev) => ({ ...prev, phone }));
    showToast('Personal profile contact updated successfully', 'success');
  };

  const simulateDeadlineExpiry = (taskId: string) => {
    setMilestones((prev) =>
      prev.map((m) => ({
        ...m,
        tasks: m.tasks.map((t) => (t.id === taskId ? { ...t, status: 'overdue' as const } : t)),
      }))
    );
    showToast('Simulated deadline expiry: Task marked Overdue', 'warning');
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        currentRole,
        currentScreen,
        setCurrentScreen,
        switchRole,
        officialProject,
        updateOfficialProject,
        milestones,
        activeMilestoneId,
        setActiveMilestoneId,
        activeTaskId,
        setActiveTaskId,
        proposals,
        activeProposalId,
        setActiveProposalId,
        saveProposal,
        submitAllProposals,
        supervisorSubmissions,
        activeSubmissionId,
        setActiveSubmissionId,
        reviewSubmission,
        assignSupervisorTask,
        unlockNextMilestone,
        evaluationItems,
        coordinatorConfirmedFYP1,
        toggleCoordinatorConfirmation,
        updateEvaluationMarks,
        isFeedbackModalOpen,
        setFeedbackModalOpen,
        isHandbookOpen,
        setHandbookOpen,
        toasts,
        showToast,
        removeToast,
        updateStudentProfile,
        simulateDeadlineExpiry,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
