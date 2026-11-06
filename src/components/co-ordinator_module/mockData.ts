import { ProposalItem, ProjectRecord, RiskItem, EvaluationItem, RepositoryProject, UserProfile } from './types';

export const currentUser: UserProfile = {
  name: 'Dr. Nadia Hussain',
  role: 'Coordinator',
  department: 'FYP Committee, Department of Computer Science',
  email: 'nadia.hussain@university.edu',
  employeeId: 'FAC-CS-2016-004',
  phone: '+92 300 9876543',
  initials: 'NH'
};

export const mockProposals: ProposalItem[] = [
  {
    id: 'FYP-CS-2025-042',
    leadName: 'Ayesha Khan',
    leadInitials: 'AK',
    avatarBg: 'bg-[#164783]',
    memberCount: 3,
    members: ['Ayesha Khan (Lead)', 'Bilal Ahmed', 'Fatima Tariq', 'Hamza Raza'],
    ideas: [
      {
        title: 'AI-Powered Student Career Guidance System',
        isPrimary: true,
        abstract: 'The proposed system addresses persistent career guidance deficits in higher education by developing a personalized career recommendation inference engine. Utilizing fine-tuned Natural Language Processing (NLP) transformers and a dynamic skill ontology matching engine, the platform ingests student academic histories, transcript data, project portfolios, and real-time labor market trends. It computes personalized skill-gap matrices and generates adaptive progression milestones to bridge the transition from academia to professional industries.',
        objectives: [
          'Construct and validate a domain-specific skill ontology connecting university computing curricula with international job classification frameworks (O*NET and ESCO).',
          'Design and train a semantic embedding recommendation engine to predict optimal career trajectories with an inferential precision baseline exceeding 85%.',
          'Synthesize real-time labor market demand through automated job requisition scrapers to produce actionable skill-gap mitigation pathways for enrolled students.'
        ],
        outcomes: [
          { title: 'Web Application', desc: 'Interactive dashboard for student profile evaluation and advisor oversight.', icon: 'web' },
          { title: 'Model Benchmark', desc: 'Validated embedding framework with cross-validation benchmark dataset.', icon: 'model_training' },
          { title: 'Skill Matrix Engine', desc: 'Automated real-time gap analysis and course recommendation taxonomy.', icon: 'analytics' }
        ],
        technologies: ['Python', 'FastAPI', 'React', 'PyTorch', 'Sentence-Transformers', 'PostgreSQL', 'Docker']
      },
      {
        title: 'Adaptive Skill Gap Analyzer for Engineering Students',
        isPrimary: false
      },
      {
        title: 'Multimodal Resume Evaluation Engine',
        isPrimary: false
      }
    ],
    topDomain: 'AI / Machine Learning',
    similarity: 76,
    submitted: 'Oct 24',
    status: 'pending'
  },
  {
    id: 'FYP-CS-2025-018',
    leadName: 'Hamza Tariq',
    leadInitials: 'HT',
    avatarBg: 'bg-[#e3e2e5]',
    memberCount: 4,
    members: ['Hamza Tariq (Lead)', 'Usama Mir', 'Danish Ali', 'Saad Qazi'],
    ideas: [
      {
        title: 'Autonomous Quadcopter for Crop Disease Detection',
        isPrimary: true
      },
      {
        title: 'Precision Irrigation Drone Controller',
        isPrimary: false
      },
      {
        title: 'Edge AI Soil Moisture Telemetry',
        isPrimary: false
      }
    ],
    topDomain: 'IoT / Embedded Systems',
    similarity: 42,
    submitted: 'Oct 25',
    status: 'pending'
  },
  {
    id: 'FYP-CS-2025-031',
    leadName: 'Zainab Noor',
    leadInitials: 'ZN',
    avatarBg: 'bg-[#FDE8E6]',
    memberCount: 3,
    members: ['Zainab Noor (Lead)', 'Hira Siddiqui', 'Mariam Shah'],
    ideas: [
      {
        title: 'Clinical Decision Support System for Mammography',
        isPrimary: true
      },
      {
        title: 'Federated Learning for Hospital PACS Records',
        isPrimary: false
      },
      {
        title: 'Automated DICOM Anonymization Pipeline',
        isPrimary: false
      }
    ],
    topDomain: 'Healthcare / AI',
    similarity: 88,
    submitted: 'Oct 22',
    status: 'revision'
  },
  {
    id: 'FYP-CS-2025-009',
    leadName: 'Bilal Chaudhry',
    leadInitials: 'BC',
    avatarBg: 'bg-[#e3e2e5]',
    memberCount: 4,
    members: ['Bilal Chaudhry (Lead)', 'Ahsan Iqbal', 'Zubair Khan', 'Moiz Hassan'],
    ideas: [
      {
        title: 'Smart Campus Energy Monitor & Forecast Engine',
        isPrimary: true
      },
      {
        title: 'Solar Inverter Grid Load Balancer',
        isPrimary: false
      },
      {
        title: 'HVAC Optimization Using Reinforcement Learning',
        isPrimary: false
      }
    ],
    topDomain: 'IoT & Data Science',
    similarity: 31,
    submitted: 'Oct 20',
    status: 'approved'
  },
  {
    id: 'FYP-CS-2025-055',
    leadName: 'Sara Farhan',
    leadInitials: 'SF',
    avatarBg: 'bg-[#e3e2e5]',
    memberCount: 3,
    members: ['Sara Farhan (Lead)', 'Nimra Sheikh', 'Komal Javed'],
    ideas: [
      {
        title: 'Zero-Knowledge Proof Authentication for FinTech',
        isPrimary: true
      },
      {
        title: 'Decentralized Credential Verification Protocol',
        isPrimary: false
      },
      {
        title: 'Biometric Passkey Enclave for Web3 Wallets',
        isPrimary: false
      }
    ],
    topDomain: 'Cybersecurity',
    similarity: 64,
    submitted: 'Oct 26',
    status: 'pending'
  },
  {
    id: 'FYP-CS-2025-014',
    leadName: 'Usman Ali',
    leadInitials: 'UA',
    avatarBg: 'bg-[#e3e2e5]',
    memberCount: 4,
    members: ['Usman Ali (Lead)', 'Fahad Mustafa', 'Waleed Raza', 'Talha Khalid'],
    ideas: [
      {
        title: 'Cross-Platform AR Campus Tour Navigation',
        isPrimary: true
      },
      {
        title: 'LiDAR-Assisted Indoor Positioning Beacon',
        isPrimary: false
      },
      {
        title: 'Interactive Classroom Digital Twin',
        isPrimary: false
      }
    ],
    topDomain: 'Web & Mobile / AR',
    similarity: 19,
    submitted: 'Oct 19',
    status: 'approved'
  }
];

export const mockProjects: ProjectRecord[] = [
  {
    id: 'FYP-CS-2025-042',
    title: 'AI-Powered Student Career Guidance System',
    leadName: 'Ayesha Khan',
    supervisor: { name: 'Dr. Ahmed Rahman', initials: 'AR', avatarBg: 'bg-[#EAF5FC]' },
    jury: { leadJury: 'Dr. Sana Farooq', additionalCount: 2, assigned: true },
    milestone: 'M3',
    phase: 'Phase 2',
    progress: 25,
    health: 'Watch'
  },
  {
    id: 'FYP-CS-2025-009',
    title: 'Smart Campus Energy Monitor & Forecast Engine',
    leadName: 'Bilal Chaudhry',
    supervisor: { name: 'Dr. Farah Siddiqui', initials: 'FS', avatarBg: 'bg-[#FFF1E5]' },
    jury: { leadJury: 'Dr. Imran Qureshi', additionalCount: 2, assigned: true },
    milestone: 'M4',
    phase: 'Phase 2',
    progress: 48,
    health: 'On Track'
  },
  {
    id: 'FYP-CS-2025-018',
    title: 'Autonomous Quadcopter for Crop Disease Detection',
    leadName: 'Hamza Tariq',
    supervisor: { name: 'Dr. Omar Khalid', initials: 'OK', avatarBg: 'bg-[#EAF5FC]' },
    jury: { leadJury: '', additionalCount: 0, assigned: false },
    milestone: 'M2',
    phase: 'Phase 1',
    progress: 18,
    health: 'Watch'
  },
  {
    id: 'FYP-CS-2025-031',
    title: 'Clinical Decision Support System for Mammography',
    leadName: 'Zainab Noor',
    supervisor: { name: 'Dr. Ahmed Rahman', initials: 'AR', avatarBg: 'bg-[#EAF5FC]' },
    jury: { leadJury: 'Dr. Hira Anwar', additionalCount: 2, assigned: true },
    milestone: 'M1',
    phase: 'Overdue',
    progress: 12,
    health: 'At Risk'
  },
  {
    id: 'FYP-CS-2025-055',
    title: 'Zero-Knowledge Proof Authentication for FinTech',
    leadName: 'Sara Farhan',
    supervisor: { name: 'Dr. Bilal Chaudhry', initials: 'BC', avatarBg: 'bg-[#FFF1E5]' },
    jury: { leadJury: '', additionalCount: 0, assigned: false },
    milestone: 'M2',
    phase: 'Phase 1',
    progress: 20,
    health: 'On Track'
  },
  {
    id: 'FYP-CS-2025-014',
    title: 'Cross-Platform AR Campus Tour Navigation',
    leadName: 'Usman Ali',
    supervisor: { name: 'Dr. Tariq Mansoor', initials: 'TM', avatarBg: 'bg-[#EAF5FC]' },
    jury: { leadJury: 'Dr. Sana Farooq', additionalCount: 2, assigned: true },
    milestone: 'M5',
    phase: 'Phase 3',
    progress: 62,
    health: 'On Track'
  }
];

export const mockRiskProjects: RiskItem[] = [
  {
    id: 'FYP-CS-2025-031',
    title: 'Clinical Decision Support System for Mammography',
    leadName: 'Zainab Noor',
    score: 38,
    status: 'At risk',
    riskFactors: ['Overdue task', 'Missed check-in', 'Late submissions'],
    supervisor: { name: 'Dr. Ahmed Rahman', initials: 'AR', avatarBg: 'bg-[#164783]' },
    lastActivity: '3 days ago · Oct 14, 2026',
    reasons: [
      { title: 'Sprint 4 Milestones Overdue', desc: '2 critical tasks are 8+ days behind milestone schedule.', icon: 'flag', severity: 'danger' },
      { title: 'Missed Supervisor Bi-Weekly', desc: 'No supervisory log submitted for the period ending Oct 14.', icon: 'history_toggle_off', severity: 'warning' }
    ]
  },
  {
    id: 'FYP-CS-2025-042',
    title: 'AI-Powered Student Career Guidance System',
    leadName: 'Ayesha Khan',
    score: 64,
    status: 'Watch',
    riskFactors: ['Overdue task', 'Late submissions'],
    supervisor: { name: 'Dr. Ahmed Rahman', initials: 'AR', avatarBg: 'bg-[#164783]' },
    lastActivity: 'Yesterday · Oct 16, 2026',
    reasons: [
      { title: 'Minor Deliverable Delay', desc: 'Literature survey draft pending supervisor sign-off.', icon: 'schedule', severity: 'warning' }
    ]
  },
  {
    id: 'FYP-CS-2018-018',
    title: 'Autonomous Quadcopter for Crop Disease Detection',
    leadName: 'Hamza Tariq',
    score: 58,
    status: 'Watch',
    riskFactors: ['Missed check-in'],
    supervisor: { name: 'Dr. Omar Khalid', initials: 'OK', avatarBg: 'bg-[#e3e2e5]' },
    lastActivity: '5 days ago · Oct 12, 2026',
    reasons: [
      { title: 'Bi-Weekly Attendance Gap', desc: 'Hardware testing meeting rescheduled twice.', icon: 'event_busy', severity: 'warning' }
    ]
  },
  {
    id: 'FYP-CS-2025-009',
    title: 'Smart Campus Energy Monitor & Forecast Engine',
    leadName: 'Bilal Chaudhry',
    score: 88,
    status: 'Healthy',
    riskFactors: ['None · All criteria satisfied'],
    supervisor: { name: 'Dr. Farah Siddiqui', initials: 'FS', avatarBg: 'bg-[#FD7A12]' },
    lastActivity: 'Today, 10:15 AM'
  },
  {
    id: 'FYP-CS-2025-027',
    title: 'Decentralized Micro-Grid Power Trading Network',
    leadName: 'Danyal Zafar',
    score: 42,
    status: 'At risk',
    riskFactors: ['Overdue task', 'Missed check-in'],
    supervisor: { name: 'Dr. Bilal Chaudhry', initials: 'BC', avatarBg: 'bg-[#efedf0]' },
    lastActivity: '6 days ago · Oct 11, 2026',
    reasons: [
      { title: 'Smart Contract Prototype Stalled', desc: 'Testnet gas configuration pending mentor review.', icon: 'error', severity: 'danger' }
    ]
  }
];

export const mockEvaluations: EvaluationItem[] = [
  {
    id: 'FYP-CS-2025-042',
    title: 'AI-Powered Student Career Guidance System',
    leadName: 'Ayesha Khan',
    defenseJury: 8.5,
    defenseDetails: 'Juror A: 8, Juror B: 9, Juror C: 8.5',
    declarationLit: 9.0,
    declarationDetails: 'Supervisor marked',
    internalEval: 17.0,
    total: 34.5,
    status: 'Ready',
    selected: true
  },
  {
    id: 'FYP-CS-2025-009',
    title: 'Smart Campus Energy Monitor & Forecast Engine',
    leadName: 'Bilal Chaudhry',
    defenseJury: 9.0,
    defenseDetails: 'Juror A: 9, Juror B: 9, Juror C: 9',
    declarationLit: 9.5,
    declarationDetails: 'Supervisor marked',
    internalEval: 18.5,
    total: 37.0,
    status: 'Published',
    selected: false
  },
  {
    id: 'FYP-CS-2025-031',
    title: 'Clinical Decision Support System for Mammography',
    leadName: 'Zainab Noor',
    defenseJury: 7.0,
    defenseDetails: 'Juror A: 7, Juror B: 7, Juror C: 7',
    declarationLit: 8.0,
    declarationDetails: 'Supervisor marked',
    internalEval: 15.0,
    total: 30.0,
    status: 'Confirmed',
    selected: false
  },
  {
    id: 'FYP-CS-2018-018',
    title: 'Autonomous Quadcopter for Crop Disease Detection',
    leadName: 'Hamza Tariq',
    defenseJury: null,
    defenseDetails: 'Juror B pending',
    declarationLit: 8.5,
    declarationDetails: 'Supervisor marked',
    internalEval: null,
    total: null,
    status: 'Incomplete',
    selected: false
  }
];

export const mockRepository: RepositoryProject[] = [
  {
    id: 'REP-2024-01',
    title: 'Student Career Recommendation Portal',
    year: '2024',
    domain: 'AI',
    matchScore: 94,
    abstract: 'An intelligent web application leveraging natural language processing and neural collaborative filtering to align undergraduate skill profiles with emerging industrial job roles and curriculum pathways.',
    tags: ['Python', 'PyTorch', 'FastAPI', 'React', 'PostgreSQL']
  },
  {
    id: 'REP-2023-02',
    title: 'Graduate Skill Gap Analyzer',
    year: '2023',
    domain: 'Data Science',
    matchScore: 88,
    abstract: 'A machine learning analytics engine analyzing regional employment datasets against higher education syllabi to identify emerging technical competencies and pedagogical divergence.',
    tags: ['R', 'Scikit-Learn', 'Pandas', 'Apache Spark', 'PowerBI']
  },
  {
    id: 'REP-2024-03',
    title: 'IoT Building Energy Tracker',
    year: '2024',
    domain: 'IoT',
    matchScore: 79,
    abstract: 'An interconnected network of ESP32 edge sensors capturing ambient power consumption, room occupancy, and HVAC metrics to optimize institutional campus energy footprints.',
    tags: ['C++', 'MQTT', 'Node-RED', 'InfluxDB', 'Grafana']
  },
  {
    id: 'REP-2023-04',
    title: 'Blockchain Academic Certificate Verification',
    year: '2023',
    domain: 'Blockchain',
    matchScore: 72,
    abstract: 'A decentralized ledger framework utilizing smart contracts on an Ethereum testbed to ensure tamper-proof issuance, cryptographic validation, and instant verification of university degrees.',
    tags: ['Solidity', 'Web3.js', 'Ethereum', 'IPFS', 'Next.js']
  }
];

export const initialProposals = mockProposals;
export const initialRiskCohort = mockRiskProjects;
export const initialEvaluations = mockEvaluations;
export const initialRepositoryProjects = mockRepository;
