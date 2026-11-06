export type AppView =
  | 'login'
  | 'dashboard'
  | 'proposals'
  | 'proposal-review'
  | 'approval-step-1'
  | 'approval-step-2'
  | 'approval-step-3'
  | 'groups-projects'
  | 'risk-monitor'
  | 'evaluation'
  | 'evaluation-rubrics'
  | 'repository'
  | 'settings';

export interface UserProfile {
  name: string;
  role: string;
  department: string;
  email: string;
  employeeId?: string;
  phone?: string;
  initials: string;
}

export interface ProposalItem {
  id: string;
  leadName: string;
  leadInitials: string;
  avatarBg?: string;
  memberCount: number;
  members: string[];
  ideas: {
    title: string;
    isPrimary?: boolean;
    abstract?: string;
    objectives?: string[];
    outcomes?: { title: string; desc: string; icon: string }[];
    technologies?: string[];
  }[];
  topDomain: string;
  similarity: number;
  submitted: string;
  status: 'pending' | 'revision' | 'approved';
}

export interface ProjectRecord {
  id: string;
  title: string;
  leadName: string;
  supervisor: {
    name: string;
    initials: string;
    avatarBg?: string;
  };
  jury: {
    leadJury: string;
    additionalCount: number;
    assigned: boolean;
  };
  milestone: string;
  phase: string;
  progress: number;
  health: 'On Track' | 'Watch' | 'At Risk';
}

export interface RiskItem {
  id: string;
  title: string;
  leadName: string;
  score: number;
  status: 'Healthy' | 'Watch' | 'At risk' | string;
  riskFactors: string[];
  supervisor: {
    name: string;
    initials: string;
    avatarBg?: string;
  };
  lastActivity: string;
  reasons?: { title: string; desc: string; icon: string; severity: 'danger' | 'warning' }[];
  details?: { label: string; desc: string }[];
}

export interface EvaluationItem {
  id: string;
  title: string;
  leadName: string;
  defenseJury: number | null;
  defenseDetails: string;
  declarationLit: number | null;
  declarationDetails: string;
  internalEval: number | null;
  total: number | null;
  status: 'Ready' | 'Published' | 'Confirmed' | 'Incomplete' | string;
  selected?: boolean;
}

export interface RepositoryProject {
  id: string;
  title: string;
  year: string | number;
  domain: string;
  matchScore: number;
  abstract: string;
  tags: string[];
  technologies?: string[];
}
