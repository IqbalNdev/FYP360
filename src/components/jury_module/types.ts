export type Screen = 
  | 'login'
  | 'dashboard' 
  | 'assigned-projects' 
  | 'project-dossier' 
  | 'evaluation-form' 
  | 'my-evaluations' 
  | 'settings';

export interface TeamMember {
  name: string;
  roll: string;
  role: string;
  initials: string;
  isLead?: boolean;
}

export interface Milestone {
  id: number;
  name: string;
  status: 'completed' | 'overdue' | 'in_progress' | 'pending';
  label: string;
}

export interface ProjectDocument {
  name: string;
  size: string;
  date: string;
  type: 'pdf' | 'repo';
  url?: string;
}

export interface Project {
  id: string;
  number: number;
  title: string;
  stage: string;
  domain: string;
  status: 'submitted' | 'draft' | 'not_started' | 'conflict';
  scheduledDate: string;
  scheduledTime: string;
  timeOnly: string;
  lead: string;
  supervisor: string;
  projectType: string;
  phase: string;
  proposalSummary: string;
  techStack: string[];
  team: TeamMember[];
  progress: {
    cumulative: number;
    scheduleIntegrity: number;
  };
  milestones: Milestone[];
  documents: ProjectDocument[];
  evaluationScores: {
    clarity: number | null;
    problemScope: number | null;
    technical: number | null;
    questions: number | null;
    comments: string;
  };
}

export interface EvaluationRecord {
  id: string;
  projectId: string;
  title: string;
  lead: string;
  stage: string;
  marksGiven: number;
  marksMax: number;
  submittedDate: string;
  status: 'submitted_unpublished' | 'published';
}
