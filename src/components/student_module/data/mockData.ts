import {
  UserProfile,
  Milestone,
  ProjectProposal,
  SubmissionReviewItem,
  EvaluationItem,
  OfficialProject
} from '../types';

export const mockStudentUser: UserProfile = {
  id: 'usr-student-01',
  name: 'Ayesha Khan',
  initials: 'AK',
  email: 'ayesha.khan@students.nut.edu',
  role: 'student',
  department: 'Department of Computer Science',
  studentId: 'NUST-CS-2021-042',
  phone: '+92 300 1234567',
  academicYear: '2024 — 2025',
};

export const mockSupervisorUser: UserProfile = {
  id: 'usr-supervisor-01',
  name: 'Dr. Ahmed Rahman',
  initials: 'AR',
  email: 'a.rahman@university.edu',
  role: 'supervisor',
  department: 'Dept. of Computer Science & SE',
  employeeId: 'EMP-CS-781',
  officeLocation: 'Tech Block Room 304',
  academicYear: '2024 — 2025',
};

export const mockJuryUser: UserProfile = {
  id: 'usr-jury-01',
  name: 'Prof. Tariq Mansoor',
  initials: 'TM',
  email: 't.mansoor@university.edu',
  role: 'jury',
  department: 'External Department Review Panel',
  employeeId: 'EMP-JURY-204',
  academicYear: '2024 — 2025',
};

export const mockCoordinatorUser: UserProfile = {
  id: 'usr-coordinator-01',
  name: 'Dr. Fauzia Naveed',
  initials: 'FN',
  email: 'fyp.coordinator@university.edu',
  role: 'coordinator',
  department: 'Faculty of Computing & Information Technology',
  employeeId: 'EMP-COORD-101',
  academicYear: '2024 — 2025',
};

export const mockOfficialProject: OfficialProject = {
  id: 'proj-042',
  code: 'FYP-CS-2025-042',
  title: 'AI-Powered Student Career Guidance System',
  summary:
    'A personalized career guidance platform that uses academic performance, interests, and market trends to recommend suitable career paths and learning plans for university students.',
  objectives:
    'Develop a recommendation model for career matching.\nCreate personalized skill-gap analysis and learning roadmaps.\nEvaluate recommendation quality with student feedback.',
  outcomes:
    'A working web platform, trained recommendation engine, student dashboard, and evaluation report documenting model accuracy and usability.',
  type: 'Product-Based Project',
  specialization: 'Artificial Intelligence / Machine Learning',
  techStack: ['React', 'Python', 'FastAPI', 'PostgreSQL', 'TensorFlow'],
  phase: 'FYP1',
  status: 'Approved & Active',
  supervisor: {
    name: 'Dr. Ahmed Rahman',
    title: 'Associate Professor, Primary Advisor',
    email: 'ahmed.rahman@university.edu',
    department: 'Department of Computer Science',
    office: 'Tech Block Room 304',
  },
  team: [
    {
      id: 'mem-1',
      name: 'Ayesha Khan',
      initials: 'AK',
      studentId: 'NUST-CS-2021-042',
      email: 'ayesha.khan@students.nut.edu',
      roleTitle: 'Team Lead',
      isLead: true,
    },
    {
      id: 'mem-2',
      name: 'Bilal Hussain',
      initials: 'BH',
      studentId: 'NUST-CS-2021-057',
      email: 'bilal.hussain@students.nut.edu',
      roleTitle: 'Member',
    },
    {
      id: 'mem-3',
      name: 'Sara Malik',
      initials: 'SM',
      studentId: 'NUST-CS-2021-064',
      email: 'sara.malik@students.nut.edu',
      roleTitle: 'Member',
    },
    {
      id: 'mem-4',
      name: 'Hamza Ali',
      initials: 'HA',
      studentId: 'NUST-CS-2021-071',
      email: 'hamza.ali@students.nut.edu',
      roleTitle: 'Member',
    },
  ],
};

export const initialMilestones: Milestone[] = [
  {
    id: 1,
    title: 'Milestone 1: Proposal Foundation',
    shortTitle: 'Proposal Foundation',
    subtitle: 'Finalize approved project proposal',
    description:
      'Formulate FYP problem scope, establish project charter, assign deliverable duties, and validate feasibility requirements with the student team.',
    meetingDate: 'Aug 8, 2026, 10:00 AM',
    dueDate: 'Aug 15, 2026, 5:00 PM',
    status: 'completed',
    supervisor: 'Dr. Ahmed Rahman',
    tasksCount: 1,
    completedTasksCount: 1,
    tasks: [
      {
        id: 'M1-T1',
        milestoneId: 1,
        title: 'Finalize approved project proposal',
        description:
          'Incorporate panel comments and prepare the approved proposal baseline.',
        instructions:
          'Use the departmental proposal template and address every annotated comment.',
        requiredDeliverables: ['Final proposal PDF', 'Signed approval page'],
        meetingDate: 'Aug 8, 2026, 10:00 AM',
        deadline: 'Aug 15, 2026, 5:00 PM',
        status: 'completed',
        assignedBy: 'Dr. Ahmed Rahman',
        submission: {
          fileName: 'approved-proposal.pdf',
          submittedAt: 'Aug 13, 2026, 2:00 PM',
          fileSize: '2.4 MB',
          note: 'Updated after panel feedback.',
          isOnTime: true,
          status: 'accepted',
        },
        supervisorFeedback: {
          feedbackText:
            'Accepted. The scope and problem statement are now appropriately focused.',
          providedAt: 'Aug 14, 2026, 11:30 AM',
          supervisorName: 'Dr. Ahmed Rahman',
        },
      },
    ],
  },
  {
    id: 2,
    title: 'Milestone 2: Literature & Requirements',
    shortTitle: 'Literature & Requirements',
    subtitle: 'Submit literature review and requirements',
    description:
      'Submit exhaustive comparative literature review, IEEE/ACM state-of-the-art gap analysis, and Software Requirements Specification (SRS).',
    meetingDate: 'Sep 1, 2026, 10:00 AM',
    dueDate: 'Sep 11, 2026, 5:00 PM',
    status: 'completed',
    supervisor: 'Dr. Ahmed Rahman',
    tasksCount: 1,
    completedTasksCount: 1,
    tasks: [
      {
        id: 'M2-T1',
        milestoneId: 2,
        title: 'Submit literature review and requirements',
        description:
          'Comprehensive state-of-the-art analysis and requirements specifications.',
        instructions: 'Follow IEEE standard structure with citations.',
        requiredDeliverables: ['Literature Matrix PDF', 'SRS Document v1.0'],
        meetingDate: 'Sep 1, 2026, 10:00 AM',
        deadline: 'Sep 11, 2026, 5:00 PM',
        status: 'completed',
        assignedBy: 'Dr. Ahmed Rahman',
        submission: {
          fileName: 'literature-review-and-srs.pdf',
          submittedAt: 'Sep 12, 2026, 1:15 AM',
          fileSize: '3.8 MB',
          note: 'Submitted with additional benchmark citations.',
          isOnTime: false,
          status: 'accepted',
        },
        supervisorFeedback: {
          feedbackText:
            'Accepted with late penalty applied. Strong theoretical foundation.',
          providedAt: 'Sep 13, 2026, 4:00 PM',
          supervisorName: 'Dr. Ahmed Rahman',
        },
      },
    ],
  },
  {
    id: 3,
    title: 'Milestone 3: System Design',
    shortTitle: 'System Design',
    subtitle: 'Complete system architecture package',
    description:
      'Prepare the solution architecture, data flow, microservices topology, ERD database design, and core interaction diagrams.',
    meetingDate: 'Oct 1, 2026, 10:00 AM',
    dueDate: 'Oct 17, 2026, 5:00 PM',
    status: 'overdue',
    supervisor: 'Dr. Ahmed Rahman',
    tasksCount: 1,
    completedTasksCount: 0,
    tasks: [
      {
        id: 'M3-T1',
        milestoneId: 3,
        title: 'Complete system architecture package',
        description:
          'Design architectural block diagrams, microservice breakdown, and database schemas.',
        instructions:
          'Provide architectural block diagrams, database schemas (ERD), API rate-limiting specifications, and failover mechanism.',
        requiredDeliverables: [
          'System_Architecture_Package_v1.2.pdf',
          'Database_Schema_and_ERD_Draft.pdf',
        ],
        meetingDate: 'Oct 1, 2026, 10:00 AM',
        deadline: 'Oct 17, 2026, 5:00 PM',
        status: 'overdue',
        assignedBy: 'Dr. Ahmed Rahman',
        submission: {
          fileName: 'System_Architecture_Package_v1.2.pdf',
          submittedAt: 'Oct 17, 2026, 11:20 AM',
          fileSize: '2.4 MB',
          note: 'Attached system diagrams and database ERD.',
          isOnTime: true,
          status: 'pending_review',
        },
        supervisorFeedback: {
          feedbackText:
            'The architectural block diagrams and microservice breakdown in Section 3 are comprehensive. However, please clarify the failover mechanism for the real-time inference worker and update the API rate-limiting specifications before final milestone sign-off.',
          providedAt: 'Oct 18, 2026, 9:15 AM',
          supervisorName: 'Dr. Ahmed Rahman',
        },
      },
    ],
  },
  {
    id: 4,
    title: 'Milestone 4: Core Prototype',
    shortTitle: 'Core Prototype',
    subtitle: 'Demonstrate core recommendation workflow',
    description:
      'Demonstrate working algorithmic recommendation workflow and synthetic profiling baseline.',
    meetingDate: 'Oct 13, 2026, 10:00 AM',
    dueDate: 'Oct 22, 2026, 5:00 PM',
    status: 'in_progress',
    supervisor: 'Dr. Ahmed Rahman',
    tasksCount: 1,
    completedTasksCount: 0,
    tasks: [
      {
        id: 'M4-T1',
        milestoneId: 4,
        title: 'Demonstrate core recommendation workflow',
        description:
          'Deliver working prototype connecting front-end with mock recommendation algorithm.',
        instructions:
          'Working demo showcasing student profile input, skill-gap analysis, and career suggestion outputs.',
        requiredDeliverables: ['Source Code Repository Link', 'Screencast Walkthrough'],
        meetingDate: 'Oct 13, 2026, 10:00 AM',
        deadline: 'Oct 22, 2026, 5:00 PM',
        status: 'revision_required',
        assignedBy: 'Dr. Ahmed Rahman',
      },
    ],
  },
  {
    id: 5,
    title: 'Milestone 5: Feature Completion',
    shortTitle: 'Feature Completion',
    subtitle: 'Complete planned application features',
    description:
      'All auxiliary modules (appointment calendar, resume parsing, feedback loops) finished.',
    meetingDate: 'Oct 27, 2026, 10:00 AM',
    dueDate: 'Nov 6, 2026, 5:00 PM',
    status: 'upcoming',
    supervisor: 'Dr. Ahmed Rahman',
    tasksCount: 1,
    completedTasksCount: 0,
    tasks: [
      {
        id: 'M5-T1',
        milestoneId: 5,
        title: 'Complete planned application features',
        description: 'Complete UI integrations and supplementary services.',
        instructions: 'Deliver complete application with end-to-end user journeys.',
        requiredDeliverables: ['Full Feature APK / Web App Link', 'Test Case Results'],
        meetingDate: 'Oct 27, 2026, 10:00 AM',
        deadline: 'Nov 6, 2026, 5:00 PM',
        status: 'not_started',
        assignedBy: 'Dr. Ahmed Rahman',
      },
    ],
  },
  {
    id: 6,
    title: 'Milestone 6: Testing & Validation',
    shortTitle: 'Testing & Validation',
    subtitle: 'Execute system testing plan',
    description:
      'System stress tests, model precision benchmarks, and pilot cohort usability feedback.',
    meetingDate: 'Nov 12, 2026, 10:00 AM',
    dueDate: 'Nov 24, 2026, 5:00 PM',
    status: 'upcoming',
    supervisor: 'Dr. Ahmed Rahman',
    tasksCount: 1,
    completedTasksCount: 0,
    tasks: [],
  },
  {
    id: 7,
    title: 'Milestone 7: Final Report',
    shortTitle: 'Final Report',
    subtitle: 'Submit complete final report draft',
    description:
      'Submission of bound report, Turnitin plagiarism similarity verification, and source artifacts.',
    meetingDate: 'Dec 2, 2026, 10:00 AM',
    dueDate: 'Dec 14, 2026, 5:00 PM',
    status: 'upcoming',
    supervisor: 'Dr. Ahmed Rahman',
    tasksCount: 1,
    completedTasksCount: 0,
    tasks: [],
  },
  {
    id: 8,
    title: 'Milestone 8: Defense Readiness',
    shortTitle: 'Defense Readiness',
    subtitle: 'Complete defense preparation package',
    description:
      'External jury evaluation schedule, presentation rehearsals, and department viva.',
    meetingDate: 'Dec 20, 2026, 10:00 AM',
    dueDate: 'Dec 28, 2026, 5:00 PM',
    status: 'upcoming',
    supervisor: 'Dr. Ahmed Rahman',
    tasksCount: 1,
    completedTasksCount: 0,
    tasks: [],
  },
];

export const initialProposals: ProjectProposal[] = [
  {
    id: 'prop-1',
    number: 1,
    title: 'AI-Powered Student Career Guidance System',
    summary:
      'A personalized career guidance platform that uses academic performance, interests, and market trends to recommend suitable career paths and learning plans for university students.',
    objectives:
      'Develop a recommendation model for career matching.\nCreate personalized skill-gap analysis and learning roadmaps.\nEvaluate recommendation quality with student feedback.',
    outcomes:
      'A working web platform, trained recommendation engine, student dashboard, and evaluation report documenting model accuracy and usability.',
    type: 'Product-Based Project',
    specialization: 'Artificial Intelligence / Machine Learning',
    techStack: ['React', 'Python', 'FastAPI', 'PostgreSQL', 'TensorFlow'],
    status: 'Approved',
    similarityScore: 76,
    similarityDescription:
      'The strongest overlap is in student career matching, skill-gap analysis, and personalized learning roadmap recommendations.',
    relatedCount: 3,
    topMatchingProject: 'Student Career Recommendation Portal',
    keyOverlaps: [
      'Problem statement',
      'Career guidance',
      'Recommendation model',
      'Student profiles',
    ],
    analysisCompletedDate: 'May 22, 2025',
  },
  {
    id: 'prop-2',
    number: 2,
    title: 'Smart Campus Energy Monitoring Platform',
    summary:
      'An IoT-enabled dashboard that monitors energy usage across campus buildings and highlights opportunities to reduce consumption.',
    objectives: 'No project objectives added.',
    outcomes: 'No expected outcomes added.',
    type: 'Product-Based Project',
    specialization: 'Internet of Things (IoT)',
    techStack: ['React', 'Node.js'],
    status: 'Draft',
    similarityScore: 72,
    similarityDescription:
      'Building level smart meter collection and real-time energy visualization.',
    relatedCount: 3,
    topMatchingProject: 'IoT Building Energy Tracker',
    keyOverlaps: ['Problem statement', 'IoT sensors', 'Energy dashboard'],
    analysisCompletedDate: 'May 22, 2025',
  },
  {
    id: 'prop-3',
    number: 3,
    title: 'Secure Student Credential Wallet',
    summary:
      'A secure mobile wallet for storing, presenting, and validating university issued academic credentials using verifiable decentralized cryptographic proofs.',
    objectives:
      'Build mobile wallet interface with biometric access.\nImplement credential issuer verification protocols.\nPrevent credential counterfeiting and simplify employer verification.',
    outcomes:
      'React Native client, cryptographic verification microservice, and issuer administration dashboard.',
    type: 'Research-Based Project',
    specialization: 'Cybersecurity',
    techStack: ['React Native', 'TypeScript', 'Solidity', 'Express', 'IPFS'],
    status: 'Draft',
    similarityScore: 69,
    similarityDescription:
      'Academic credential authenticity, issuer verification, and tamper detection.',
    relatedCount: 3,
    topMatchingProject: 'Blockchain Academic Certificate Verification',
    keyOverlaps: ['Credential verification', 'Academic records', 'Cryptographic proof'],
    analysisCompletedDate: 'May 22, 2025',
  },
];

export interface RelatedProjectRecord {
  id: string;
  title: string;
  year: number;
  domain: string;
  similarity: number;
  description: string;
  keyOverlap: string;
  tags: string[];
}

export const mockRelatedRecords: RelatedProjectRecord[] = [
  {
    id: 'rel-1',
    title: 'Student Career Recommendation Portal',
    year: 2024,
    domain: 'Artificial Intelligence',
    similarity: 76,
    description:
      'A recommendation portal that maps student interests and academic records to suggested career pathways.',
    keyOverlap:
      'Personalized career matching using student profiles, interests, and academic performance.',
    tags: [
      'Problem statement',
      'Career guidance',
      'Recommendation model',
      'Student profiles',
    ],
  },
  {
    id: 'rel-2',
    title: 'Graduate Skill Gap Analyzer',
    year: 2023,
    domain: 'Data Science',
    similarity: 64,
    description:
      'A data-driven platform that compares graduate skills with role requirements and recommends learning priorities.',
    keyOverlap:
      'Skill-gap identification, personalized learning recommendations, and career-readiness reporting.',
    tags: [
      'Project objectives',
      'Skill gap analysis',
      'Learning roadmap',
      'Career readiness',
    ],
  },
  {
    id: 'rel-3',
    title: 'Machine Learning Academic Path Advisor',
    year: 2022,
    domain: 'Machine Learning',
    similarity: 51,
    description:
      'A predictive advising prototype that recommends academic electives based on performance and intended professions.',
    keyOverlap:
      'Profile-based recommendations connecting academic choices with future career goals.',
    tags: [
      'Proposed functionality',
      'Personalization',
      'Academic performance',
      'Career goals',
    ],
  },
];

export const mockEvaluationItems: EvaluationItem[] = [
  {
    title: 'FYP1 Defense',
    maxMarks: 10,
    obtainedMarks: 8,
    evaluatorRole: 'Jury',
    status: 'Published',
    feedback: 'Clear presentation and a well-defined project scope.',
  },
  {
    title: 'Declaration & Literature Review',
    maxMarks: 10,
    obtainedMarks: 9,
    evaluatorRole: 'Supervisor',
    status: 'Published',
    feedback: 'Strong literature coverage with relevant and recent sources.',
  },
  {
    title: 'FYP1 Internal Evaluation',
    maxMarks: 20,
    obtainedMarks: 17,
    evaluatorRole: 'Authorized Internal Evaluator',
    status: 'Published',
    feedback: 'Good technical foundation. Refine the validation methodology for FYP2.',
  },
];

export const mockSupervisorSubmissions: SubmissionReviewItem[] = [
  {
    id: 'sub-042',
    projectId: 'proj-042',
    projectCode: 'FYP-CS-2025-042',
    projectTitle: 'AI-Powered Student Career Guidance System',
    leadName: 'Ayesha Khan',
    teamMembers: ['Bilal Tariq', 'Zainab Fatima'],
    department: 'Dept. of Computer Science & Software Engineering',
    milestoneId: 3,
    milestoneTitle: 'Milestone 3 — System Architecture & Design',
    submittedAt: 'Today, 11:20 AM',
    isOnTime: true,
    status: 'pending_review',
    files: [
      {
        name: 'System_Architecture_Package_v1.2.pdf',
        size: '2.4 MB',
        type: 'PDF Document',
      },
      {
        name: 'Database_Schema_and_ERD_Draft.pdf',
        size: '1.1 MB',
        type: 'PDF Document',
      },
    ],
    studentNote:
      'Here are our completed architectural block diagrams and PostgreSQL relational schemas for Milestone 3.',
    supervisorFeedback:
      'The architectural block diagrams and microservice breakdown in Section 3 are comprehensive. However, please clarify the failover mechanism for the real-time inference worker and update the API rate-limiting specifications before final milestone sign-off.',
  },
  {
    id: 'sub-019',
    projectId: 'proj-019',
    projectCode: 'FYP-EE-2025-019',
    projectTitle: 'Smart IoT Traffic Flow Optimization Engine',
    leadName: 'Maryam Hassan',
    teamMembers: ['Farhan Ali'],
    department: 'Dept. of Electrical & Computer Engineering',
    milestoneId: 2,
    milestoneTitle: 'Milestone 2 — Hardware & Telemetry Specs',
    submittedAt: 'Oct 16, 2025',
    isOnTime: true,
    status: 'pending_review',
    files: [
      {
        name: 'Sensor_Telemetry_Specs_v2.0.pdf',
        size: '1.8 MB',
        type: 'PDF Document',
      },
    ],
    supervisorFeedback: 'Review in progress. Checking sensor calibration parameters.',
  },
  {
    id: 'sub-088',
    projectId: 'proj-088',
    projectCode: 'FYP-SE-2025-088',
    projectTitle: 'Automated Code Vulnerability Assessment in CI/CD',
    leadName: 'Bilal Ahmed',
    teamMembers: ['Danial Qureshi', 'Hira Naveed'],
    department: 'Dept. of Software Engineering',
    milestoneId: 3,
    milestoneTitle: 'Milestone 3 — Static Analysis Benchmark',
    submittedAt: 'Oct 14, 2025',
    isOnTime: true,
    status: 'accepted',
    files: [
      {
        name: 'Static_Analysis_Benchmark_Report.pdf',
        size: '3.1 MB',
        type: 'PDF Document',
      },
    ],
    supervisorFeedback: 'Accepted. Benchmark methodology follows IEEE standards.',
  },
  {
    id: 'sub-104',
    projectId: 'proj-104',
    projectCode: 'FYP-CS-2025-104',
    projectTitle: 'Healthcare Predictive Triage Assistant',
    leadName: 'Taimoor Ali',
    teamMembers: ['Ahmed Raza', 'Hassan Tariq', 'Usman Butt'],
    department: 'Dept. of Computer Science',
    milestoneId: 1,
    milestoneTitle: 'Milestone 1 — Clinical Dataset Preprocessing',
    submittedAt: 'Oct 12, 2025',
    isOnTime: false,
    status: 'revision_requested',
    files: [
      {
        name: 'Clinical_Dataset_Preprocessing_Protocol.docx',
        size: '950 KB',
        type: 'DOCX Document',
      },
    ],
    supervisorFeedback:
      'HIPAA compliance and patient de-identification safeguards need explicit documentation.',
  },
];

export const mockSupervisedProjectsList = [
  {
    id: 'FYP-CS-2025-042',
    title: 'AI-Powered Student Career Guidance System',
    lead: 'Ayesha Khan',
    membersCount: 3,
    members: ['Ayesha Khan', 'Bilal Hussain', 'Sara Malik', 'Hamza Ali'],
    department: 'Computer Science',
    status: 'Needs Action',
    lastUpdated: 'Today, 11:20 AM',
    milestone: 'Milestone 3',
    description:
      'A personalized career guidance platform that uses academic performance, interests, and market trends to recommend suitable career paths and learning plans.',
  },
  {
    id: 'FYP-CS-2025-019',
    title: 'Decentralized Academic Credential Verification',
    lead: 'Zainab Fatima',
    membersCount: 4,
    members: ['Zainab Fatima', 'Bilal Tariq', 'Hamza Riaz', 'Sadia Mir'],
    department: 'Computer Science',
    status: 'In Review',
    lastUpdated: 'Yesterday, 3:45 PM',
    milestone: 'Milestone 2',
    description:
      'A secure mobile wallet for storing, presenting, and validating university issued academic credentials with tamper detection.',
  },
  {
    id: 'FYP-SE-2025-078',
    title: 'Automated Code Vulnerability Assessment in CI/CD',
    lead: 'Bilal Ahmed',
    membersCount: 3,
    members: ['Bilal Ahmed', 'Danial Qureshi', 'Hira Naveed'],
    department: 'Software Engineering',
    status: 'Approved',
    lastUpdated: 'Oct 08, 2025',
    milestone: 'Milestone 3',
    description:
      'Real-time automated security scanner integrated into Git pipelines to catch OWASP vulnerabilities before production merge.',
  },
  {
    id: 'FYP-CS-2025-110',
    title: 'Smart IoT Traffic Flow Optimization Engine',
    lead: 'Maryam Hassan',
    membersCount: 4,
    members: ['Maryam Hassan', 'Farhan Ali', 'Usman Sheikh', 'Kashif Mehmood'],
    department: 'Computer Science',
    status: 'In Progress',
    lastUpdated: 'Oct 12, 2025',
    milestone: 'Milestone 2',
    description:
      'IoT sensor array and deep reinforcement learning controller to optimize city junction signal timings in real-time.',
  },
  {
    id: 'FYP-CS-2025-004',
    title: 'Autonomous Drone Path Navigation for Precision Agriculture',
    lead: 'Khadija Rehman',
    membersCount: 3,
    members: ['Khadija Rehman', 'Daniyal Sheikh', 'Omer Farooq'],
    department: 'Computer Science',
    status: 'Completed',
    lastUpdated: 'Sep 28, 2025',
    milestone: 'Milestone 8',
    description:
      'A high-precision multispectral drone path planner that computes normalized difference vegetation index (NDVI) heatmaps to autonomously identify crop hydration anomalies.',
  },
  {
    id: 'FYP-SE-2025-063',
    title: 'Healthcare Predictive Triage Assistant',
    lead: 'Taimoor Ali',
    membersCount: 4,
    members: ['Taimoor Ali', 'Ahmed Raza', 'Hassan Tariq', 'Usman Butt'],
    department: 'Software Engineering',
    status: 'Needs Revision',
    lastUpdated: 'Oct 12, 2025',
    milestone: 'Milestone 1 Revision',
    description:
      'Predictive clinical triage scoring system to prioritize emergency department patient queues based on vital telemetry.',
  },
];
