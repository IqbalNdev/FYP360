export type UserRole = 'student' | 'supervisor' | 'jury' | 'coordinator';

export interface UserProfile {
  id: string;
  name: string;
  initials: string;
  email: string;
  role: UserRole;
  department: string;
  studentId?: string;
  employeeId?: string;
  phone?: string;
  academicYear: string;
  officeLocation?: string;
}

export type MilestoneStatus = 'completed' | 'in_progress' | 'overdue' | 'upcoming' | 'locked';

export interface TaskAssignment {
  id: string;
  milestoneId: number;
  title: string;
  description: string;
  instructions: string;
  requiredDeliverables: string[];
  meetingDate: string;
  deadline: string;
  status: 'completed' | 'in_progress' | 'overdue' | 'revision_required' | 'not_started';
  assignedBy: string;
  submission?: {
    fileName: string;
    submittedAt: string;
    fileSize: string;
    note?: string;
    isOnTime: boolean;
    status: 'accepted' | 'pending_review' | 'revision_requested';
  };
  supervisorFeedback?: {
    feedbackText: string;
    providedAt: string;
    supervisorName: string;
  };
}

export interface Milestone {
  id: number;
  title: string;
  shortTitle: string;
  subtitle: string;
  description: string;
  meetingDate: string;
  dueDate: string;
  status: MilestoneStatus;
  supervisor: string;
  tasksCount: number;
  completedTasksCount: number;
  tasks: TaskAssignment[];
}

export interface TeamMember {
  id: string;
  name: string;
  initials: string;
  studentId: string;
  email: string;
  roleTitle: string;
  isLead?: boolean;
}

export interface ProjectProposal {
  id: string;
  number: number;
  title: string;
  summary: string;
  objectives: string;
  outcomes: string;
  type: 'Product-Based Project' | 'Research-Based Project';
  specialization: string;
  techStack: string[];
  status: 'Approved' | 'Draft' | 'Not Started';
  similarityScore?: number;
  similarityDescription?: string;
  relatedCount?: number;
  topMatchingProject?: string;
  keyOverlaps?: string[];
  analysisCompletedDate?: string;
}

export interface SubmissionReviewItem {
  id: string;
  projectId: string;
  projectCode: string;
  projectTitle: string;
  leadName: string;
  teamMembers: string[];
  department: string;
  milestoneId: number;
  milestoneTitle: string;
  submittedAt: string;
  isOnTime: boolean;
  status: 'pending_review' | 'accepted' | 'revision_requested';
  files: {
    name: string;
    size: string;
    type: string;
  }[];
  studentNote?: string;
  supervisorFeedback: string;
}

export interface EvaluationItem {
  title: string;
  maxMarks: number;
  obtainedMarks: number;
  evaluatorRole: string;
  status: 'Published' | 'Pending' | 'Draft';
  feedback: string;
}

export interface OfficialProject {
  id: string;
  code: string;
  title: string;
  summary: string;
  objectives: string;
  outcomes: string;
  type: string;
  specialization: string;
  techStack: string[];
  phase: string;
  status: string;
  supervisor: {
    name: string;
    title: string;
    email: string;
    department: string;
    office: string;
  };
  team: TeamMember[];
}
