export type ActiveView = 
  | 'sign-in'
  | 'dashboard'
  | 'my-groups'
  | 'group-details'
  | 'meetings-tasks'
  | 'assign-task'
  | 'submission-review'
  | 'progress-risk'
  | 'evaluation'
  | 'settings';

export interface NotificationItem {
  id: string;
  title: string;
  subtitle: string;
  timestamp: string;
  type: 'assignment' | 'submission' | 'risk' | 'deadline' | 'announcement';
  read: boolean;
  targetView?: ActiveView;
  targetGroupId?: string;
  targetSubmissionId?: string;
}

export interface StudentMember {
  name: string;
  id: string;
  role: string;
  subrole: string;
  isLead?: boolean;
}

export interface MilestoneItem {
  id: number;
  title: string;
  shortTitle: string;
  description: string;
  status: 'completed' | 'in-progress' | 'overdue' | 'upcoming';
  meetingDate?: string;
  dueDate: string;
  hasSubmission?: boolean;
  submissionName?: string;
  submissionDate?: string;
}

export interface SupervisedProject {
  id: string;
  name: string;
  shortName: string;
  code: string;
  type: string;
  domain: string;
  phase: string;
  leadName: string;
  leadId: string;
  status: 'Approved' | 'New Assigned' | 'At Risk';
  healthScore: number;
  healthStatus: 'Healthy' | 'Watch' | 'At risk';
  milestoneProgress: number;
  onTimeRate: number;
  overdueTasks: number;
  missedCheckIns: number;
  currentMilestone: string;
  description: string;
  technologies: string[];
  team: StudentMember[];
  documents: {
    title: string;
    type: string;
    size?: string;
    status: string;
    verified?: boolean;
    url?: string;
  }[];
}

export interface EvaluationCriterion {
  id: string;
  title: string;
  description: string;
  maxMarks: number;
  awardedMarks: number;
}
