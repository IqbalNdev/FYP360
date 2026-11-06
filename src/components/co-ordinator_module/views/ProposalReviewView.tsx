import React, { useState } from 'react';
import { AppView, ProposalItem } from '../types';
import { mockProposals } from '../mockData';

interface ProposalReviewViewProps {
  onNavigate: (view: AppView) => void;
  proposal?: ProposalItem;
  onShowToast?: (message: string) => void;
}

export const ProposalReviewView: React.FC<ProposalReviewViewProps> = ({
  onNavigate,
  proposal = mockProposals[0],
  onShowToast,
}) => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [selectedDecision, setSelectedDecision] = useState<string>('idea1');
  const [remarks, setRemarks] = useState('');
  const [feedbackToast, setFeedbackToast] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setFeedbackToast(msg);
    setTimeout(() => setFeedbackToast(null), 3000);
  };

  const handleApprove = () => {
    // Navigate to Approval Step 1
    onNavigate('approval-step-1');
  };

  return (
    <div className="flex flex-col w-full pb-16 max-w-[940px] mx-auto">
      {/* Toast Alert */}
      {feedbackToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#002D71] text-white px-5 py-3 rounded-xl shadow-xl flex items-center gap-2 border border-[#FD7A12]">
          <span className="material-symbols-outlined text-[#FD7A12]">check_circle</span>
          <span className="text-sm font-medium">{feedbackToast}</span>
        </div>
      )}

      {/* Top Navigation & Title Header */}
      <div className="flex flex-col gap-2 mb-6">
        <button
          type="button"
          onClick={() => onNavigate('proposals')}
          className="inline-flex items-center gap-1.5 text-[#FD7A12] hover:text-[#002D71] font-label-lg font-medium transition-colors w-fit group cursor-pointer text-sm"
        >
          <span className="material-symbols-outlined text-[18px] transition-transform group-hover:-translate-x-0.5">
            arrow_back
          </span>
          <span>Proposals</span>
        </button>

        <div className="flex flex-wrap items-center justify-between gap-4 mt-1">
          <div className="flex flex-col gap-1">
            <span className="font-eyebrow text-[#FD7A12] uppercase tracking-wider font-bold text-xs">
              PROPOSAL REVIEW · GROUP {proposal.id}
            </span>
            <div className="flex items-center gap-3">
              <h1 className="font-headline-lg text-[#164783] text-[32px] sm:text-[36px] font-light tracking-tight leading-tight">
                Review proposals
              </h1>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF4DF] text-[#B26B00] text-xs font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B26B00]"></span>
                Pending
              </span>
            </div>
          </div>

          {/* Academic Metadata Snippet */}
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl shadow-xs border border-[#E2E8F0] text-[#64748B] text-xs font-medium">
            <span className="material-symbols-outlined text-[18px] text-[#FD7A12]">school</span>
            <span>Dept. of Computer Science</span>
            <span className="text-[#CBD5E1]">·</span>
            <span>Session 2024–2025</span>
          </div>
        </div>
      </div>

      {/* Institutional Advisory Alert Banner */}
      <div className="bg-[#164783] text-white rounded-xl px-5 py-3.5 mb-8 flex items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0 text-[#DFF5FD]">
            <span className="material-symbols-outlined text-[20px]">verified_user</span>
          </div>
          <p className="font-body-md text-white font-medium text-sm tracking-normal">
            Human evaluation required. AI insights do not approve or reject proposals.
          </p>
        </div>
        <span className="font-eyebrow text-[11px] uppercase tracking-widest text-[#b2c7f0] bg-white/10 px-2.5 py-1 rounded font-semibold shrink-0">
          FYP Policy 4.2
        </span>
      </div>

      {/* Main Content Layout */}
      <div className="flex flex-col gap-6 w-full">
        {/* Group Information Card */}
        <div className="bg-white rounded-[20px] p-6 shadow-sm border border-[#E2E8F0]">
          <div className="flex items-center justify-between pb-4 mb-5 border-b border-[#E2E8F0]/60">
            <div className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-[#64748B] text-[22px]">group</span>
              <h2 className="font-headline-sm text-lg text-[#1E293B] font-semibold">
                Group information
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 bg-[#efedf0] text-[#475569] text-xs font-medium rounded-lg">
                Section BSCS-8A
              </span>
              <span className="px-2.5 py-1 bg-[#efedf0] text-[#475569] text-xs font-medium rounded-lg">
                Batch 2021-2025
              </span>
            </div>
          </div>

          {/* Group Members Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Lead Member */}
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#FFF1E5]/40 border border-[#FD7A12]/20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#FD7A12] text-white font-semibold flex items-center justify-center shrink-0 text-sm">
                  AK
                </div>
                <div className="flex flex-col">
                  <span className="font-body-md font-medium text-[#1E293B] text-sm leading-snug">
                    Ayesha Khan
                  </span>
                  <span className="text-xs text-[#64748B] font-mono">FYP-CS-2025-042</span>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-[#FD7A12] text-white text-[11px] font-semibold tracking-wide uppercase">
                Team Lead
              </span>
            </div>

            {/* Member 2 */}
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#f5f3f6]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#e3e2e5] text-[#475569] font-semibold flex items-center justify-center shrink-0 text-sm">
                  BA
                </div>
                <div className="flex flex-col">
                  <span className="font-body-md font-medium text-[#1E293B] text-sm leading-snug">
                    Bilal Ahmed
                  </span>
                  <span className="text-xs text-[#64748B] font-mono">FYP-CS-2025-043</span>
                </div>
              </div>
              <span className="text-xs text-[#64748B] font-medium">Member</span>
            </div>

            {/* Member 3 */}
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#f5f3f6]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#e3e2e5] text-[#475569] font-semibold flex items-center justify-center shrink-0 text-sm">
                  FT
                </div>
                <div className="flex flex-col">
                  <span className="font-body-md font-medium text-[#1E293B] text-sm leading-snug">
                    Fatima Tariq
                  </span>
                  <span className="text-xs text-[#64748B] font-mono">FYP-CS-2025-044</span>
                </div>
              </div>
              <span className="text-xs text-[#64748B] font-medium">Member</span>
            </div>

            {/* Member 4 */}
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#f5f3f6]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#e3e2e5] text-[#475569] font-semibold flex items-center justify-center shrink-0 text-sm">
                  HR
                </div>
                <div className="flex flex-col">
                  <span className="font-body-md font-medium text-[#1E293B] text-sm leading-snug">
                    Hamza Raza
                  </span>
                  <span className="text-xs text-[#64748B] font-mono">FYP-CS-2025-045</span>
                </div>
              </div>
              <span className="text-xs text-[#64748B] font-medium">Member</span>
            </div>
          </div>
        </div>

        {/* Segmented Navigation (Proposal Idea Tabs) */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between px-1">
            <span className="font-eyebrow text-xs uppercase text-[#64748B] tracking-wider font-bold">
              Submitted Ideas (3)
            </span>
            <span className="text-xs text-[#64748B]">Select tab to view details</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-1.5 bg-[#e9e7eb]/60 rounded-2xl">
            {/* Tab 1 */}
            <button
              type="button"
              onClick={() => setActiveTab(0)}
              className={`relative flex items-center gap-2.5 px-4 py-3 rounded-xl text-left transition-all cursor-pointer ${
                activeTab === 0
                  ? 'bg-white text-[#002D71] shadow-sm'
                  : 'text-[#64748B] hover:text-[#1E293B] hover:bg-white/60'
              }`}
            >
              <div className={`w-2 h-2 rounded-full shrink-0 ${activeTab === 0 ? 'bg-[#FD7A12]' : 'bg-[#CBD5E1]'}`}></div>
              <div className="flex flex-col min-w-0">
                <span className={`font-eyebrow text-[10px] uppercase tracking-wider font-bold ${activeTab === 0 ? 'text-[#FD7A12]' : 'text-[#64748B]'}`}>
                  Primary Option
                </span>
                <span className="font-label-lg font-semibold truncate text-[#1E293B] text-xs">
                  Idea 1: AI-Powered Career Guidance
                </span>
              </div>
              {activeTab === 0 && (
                <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-[#FD7A12] rounded-full"></span>
              )}
            </button>

            {/* Tab 2 */}
            <button
              type="button"
              onClick={() => setActiveTab(1)}
              className={`relative flex items-center gap-2.5 px-4 py-3 rounded-xl text-left transition-all cursor-pointer ${
                activeTab === 1
                  ? 'bg-white text-[#002D71] shadow-sm'
                  : 'text-[#64748B] hover:text-[#1E293B] hover:bg-white/60'
              }`}
            >
              <div className={`w-2 h-2 rounded-full shrink-0 ${activeTab === 1 ? 'bg-[#FD7A12]' : 'bg-[#CBD5E1]'}`}></div>
              <div className="flex flex-col min-w-0">
                <span className={`font-eyebrow text-[10px] uppercase tracking-wider font-bold ${activeTab === 1 ? 'text-[#FD7A12]' : 'text-[#64748B]'}`}>
                  Alternative A
                </span>
                <span className="font-label-lg font-medium truncate text-xs">
                  Idea 2: Smart Campus Energy Platform
                </span>
              </div>
              {activeTab === 1 && (
                <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-[#FD7A12] rounded-full"></span>
              )}
            </button>

            {/* Tab 3 */}
            <button
              type="button"
              onClick={() => setActiveTab(2)}
              className={`relative flex items-center gap-2.5 px-4 py-3 rounded-xl text-left transition-all cursor-pointer ${
                activeTab === 2
                  ? 'bg-white text-[#002D71] shadow-sm'
                  : 'text-[#64748B] hover:text-[#1E293B] hover:bg-white/60'
              }`}
            >
              <div className={`w-2 h-2 rounded-full shrink-0 ${activeTab === 2 ? 'bg-[#FD7A12]' : 'bg-[#CBD5E1]'}`}></div>
              <div className="flex flex-col min-w-0">
                <span className={`font-eyebrow text-[10px] uppercase tracking-wider font-bold ${activeTab === 2 ? 'text-[#FD7A12]' : 'text-[#64748B]'}`}>
                  Alternative B
                </span>
                <span className="font-label-lg font-medium truncate text-xs">
                  Idea 3: Secure Credential Wallet
                </span>
              </div>
              {activeTab === 2 && (
                <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-[#FD7A12] rounded-full"></span>
              )}
            </button>
          </div>
        </div>

        {/* Details for Idea */}
        <div className="bg-white rounded-[20px] p-6 shadow-sm border border-[#E2E8F0] flex flex-col gap-6">
          <div className="flex flex-col gap-1 border-b border-[#E2E8F0]/60 pb-4">
            <span className="font-eyebrow text-[#FD7A12] uppercase font-bold tracking-wider text-xs">
              PROPOSED PROJECT DETAILS
            </span>
            <h3 className="font-headline-sm text-lg text-[#1E293B] font-semibold">
              {activeTab === 0 && 'Idea 1: AI-Powered Student Career Guidance System'}
              {activeTab === 1 && 'Idea 2: Smart Campus Energy Platform & Telemetry'}
              {activeTab === 2 && 'Idea 3: Secure Student Credential Wallet & Ledger'}
            </h3>
          </div>

          {/* Section: Summary */}
          <div className="flex flex-col gap-2">
            <h4 className="font-eyebrow text-[11px] uppercase tracking-wider text-[#64748B] font-bold">
              Project Abstract &amp; Summary
            </h4>
            <p className="font-body-md text-[#475569] text-sm leading-relaxed">
              {activeTab === 0 &&
                'The proposed system addresses persistent career guidance deficits in higher education by developing a personalized career recommendation inference engine. Utilizing fine-tuned Natural Language Processing (NLP) transformers and a dynamic skill ontology matching engine, the platform ingests student academic histories, transcript data, project portfolios, and real-time labor market trends. It computes personalized skill-gap matrices and generates adaptive progression milestones to bridge the transition from academia to professional industries.'}
              {activeTab === 1 &&
                'An interconnected Internet-of-Things telemetric network instrumented across university laboratory buildings and study halls. Employing distributed energy monitoring edge sensors with local telemetry aggregation to forecast peak load and dynamically reschedule heavy electrical compute apparatus.'}
              {activeTab === 2 &&
                'A decentralized cryptographic credential wallet application built using W3C Verifiable Credentials and zero-knowledge proof verification. Enables students to hold, present, and instantly verify academic degrees and course transcripts across international verification registries without administrative delays.'}
            </p>
          </div>

          {/* Section: Objectives */}
          <div className="flex flex-col gap-3">
            <h4 className="font-eyebrow text-[11px] uppercase tracking-wider text-[#64748B] font-bold">
              Core Objectives
            </h4>
            <ul className="space-y-2.5">
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-[#FD7A12] text-[20px] shrink-0 mt-0.5">
                  check_circle
                </span>
                <span className="font-body-md text-[#475569] text-sm">
                  Construct and validate a domain-specific skill ontology connecting university computing curricula with international job classification frameworks (O*NET and ESCO).
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-[#FD7A12] text-[20px] shrink-0 mt-0.5">
                  check_circle
                </span>
                <span className="font-body-md text-[#475569] text-sm">
                  Design and train a semantic embedding recommendation engine to predict optimal career trajectories with an inferential precision baseline exceeding 85%.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-[#FD7A12] text-[20px] shrink-0 mt-0.5">
                  check_circle
                </span>
                <span className="font-body-md text-[#475569] text-sm">
                  Synthesize real-time labor market demand through automated job requisition scrapers to produce actionable skill-gap mitigation pathways for enrolled students.
                </span>
              </li>
            </ul>
          </div>

          {/* Section: Expected Outcomes */}
          <div className="flex flex-col gap-3">
            <h4 className="font-eyebrow text-[11px] uppercase tracking-wider text-[#64748B] font-bold">
              Expected Outcomes &amp; Deliverables
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-xl bg-[#f5f3f6] flex flex-col gap-1 border border-[#E2E8F0]/60">
                <div className="flex items-center gap-2 text-[#FD7A12] font-semibold text-xs">
                  <span className="material-symbols-outlined text-[18px]">web</span>
                  <span>Web Application</span>
                </div>
                <p className="text-xs text-[#64748B]">
                  Interactive dashboard for student profile evaluation and advisor oversight.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#f5f3f6] flex flex-col gap-1 border border-[#E2E8F0]/60">
                <div className="flex items-center gap-2 text-[#FD7A12] font-semibold text-xs">
                  <span className="material-symbols-outlined text-[18px]">model_training</span>
                  <span>Model Benchmark</span>
                </div>
                <p className="text-xs text-[#64748B]">
                  Validated embedding framework with cross-validation benchmark dataset.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#f5f3f6] flex flex-col gap-1 border border-[#E2E8F0]/60">
                <div className="flex items-center gap-2 text-[#FD7A12] font-semibold text-xs">
                  <span className="material-symbols-outlined text-[18px]">analytics</span>
                  <span>Skill Matrix Engine</span>
                </div>
                <p className="text-xs text-[#64748B]">
                  Automated real-time gap analysis and course recommendation taxonomy.
                </p>
              </div>
            </div>
          </div>

          {/* Technology Stack Chips */}
          <div className="flex flex-col gap-2 pt-2">
            <h4 className="font-eyebrow text-[11px] uppercase tracking-wider text-[#64748B] font-bold">
              Proposed Technology Stack
            </h4>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 rounded-full bg-[#efedf0] text-xs text-[#1E293B] font-medium">Python</span>
              <span className="px-3 py-1 rounded-full bg-[#efedf0] text-xs text-[#1E293B] font-medium">FastAPI</span>
              <span className="px-3 py-1 rounded-full bg-[#efedf0] text-xs text-[#1E293B] font-medium">React</span>
              <span className="px-3 py-1 rounded-full bg-[#efedf0] text-xs text-[#1E293B] font-medium">PyTorch</span>
              <span className="px-3 py-1 rounded-full bg-[#efedf0] text-xs text-[#1E293B] font-medium">Sentence-Transformers</span>
              <span className="px-3 py-1 rounded-full bg-[#efedf0] text-xs text-[#1E293B] font-medium">PostgreSQL</span>
              <span className="px-3 py-1 rounded-full bg-[#efedf0] text-xs text-[#1E293B] font-medium">Docker</span>
            </div>
          </div>
        </div>

        {/* Card 2: AI Analysis (Advisory) in teal-tint */}
        <div className="bg-[#FFF1E5] rounded-[20px] p-6 shadow-sm border border-[#FD7A12]/20 flex flex-col gap-5">
          <div className="flex items-center justify-between pb-3 border-b border-[#FD7A12]/20">
            <div className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-[#FD7A12] text-[22px]">auto_awesome</span>
              <h3 className="font-headline-sm text-lg text-[#002D71] font-semibold">
                AI analysis (advisory)
              </h3>
              <span className="px-2 py-0.5 rounded-full bg-white/70 text-[#002D71] text-[11px] uppercase tracking-wider font-bold">
                Advisory
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-body-md text-[#002D71] text-sm font-medium">Domain: AI / Machine Learning</span>
              <span className="px-2.5 py-0.5 rounded-full bg-[#002D71] text-white text-[11px] font-semibold">
                88% confidence
              </span>
            </div>
          </div>

          {/* Keywords */}
          <div className="flex flex-col gap-2">
            <span className="font-eyebrow text-[11px] uppercase tracking-wider text-[#002D71] font-bold">
              Extracted Conceptual Keywords
            </span>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 rounded-full bg-white/80 text-[#002D71] text-xs font-medium shadow-xs">
                Natural Language Processing
              </span>
              <span className="px-3 py-1 rounded-full bg-white/80 text-[#002D71] text-xs font-medium shadow-xs">
                Transformer Models
              </span>
              <span className="px-3 py-1 rounded-full bg-white/80 text-[#002D71] text-xs font-medium shadow-xs">
                Skill Ontology
              </span>
              <span className="px-3 py-1 rounded-full bg-white/80 text-[#002D71] text-xs font-medium shadow-xs">
                Career Trajectory
              </span>
              <span className="px-3 py-1 rounded-full bg-white/80 text-[#002D71] text-xs font-medium shadow-xs">
                Semantic Embedding
              </span>
              <span className="px-3 py-1 rounded-full bg-white/80 text-[#002D71] text-xs font-medium shadow-xs">
                Labor Market Analytics
              </span>
            </div>
          </div>

          {/* Similar Past Projects */}
          <div className="flex flex-col gap-3 pt-2">
            <div className="flex items-center justify-between">
              <span className="font-eyebrow text-[11px] uppercase tracking-wider text-[#002D71] font-bold">
                Repository Overlap &amp; Prior Work
              </span>
              <span className="text-xs text-[#002D71]/80">FYP Repository Database (2018–2024)</span>
            </div>

            <div className="space-y-2.5">
              {/* Similar 1 */}
              <div className="p-3.5 rounded-xl bg-white shadow-xs border border-[#E2E8F0] flex items-center justify-between gap-4">
                <div className="flex flex-col min-w-0">
                  <span className="font-body-md text-sm font-semibold text-[#1E293B] truncate">
                    Automated Skill Profiling &amp; Career Path Recommendation Engine
                  </span>
                  <span className="text-xs text-[#64748B]">
                    Project ID: FYP-CS-2023-019 · Supervisor: Dr. Usman Tahir
                  </span>
                </div>
                <span className="px-3 py-1 rounded-full bg-[#FDE8E6] text-[#C2392F] text-xs font-bold shrink-0">
                  76% similarity
                </span>
              </div>

              {/* Similar 2 */}
              <div className="p-3.5 rounded-xl bg-white shadow-xs border border-[#E2E8F0] flex items-center justify-between gap-4">
                <div className="flex flex-col min-w-0">
                  <span className="font-body-md text-sm font-semibold text-[#1E293B] truncate">
                    Resume Parser and Industry Job Alignment System
                  </span>
                  <span className="text-xs text-[#64748B]">
                    Project ID: FYP-CS-2022-044 · Supervisor: Prof. Samina Javed
                  </span>
                </div>
                <span className="px-3 py-1 rounded-full bg-[#FFF4DF] text-[#B26B00] text-xs font-bold shrink-0">
                  64% similarity
                </span>
              </div>

              {/* Similar 3 */}
              <div className="p-3.5 rounded-xl bg-white shadow-xs border border-[#E2E8F0] flex items-center justify-between gap-4">
                <div className="flex flex-col min-w-0">
                  <span className="font-body-md text-sm font-semibold text-[#1E293B] truncate">
                    Student Competency Mapping and Placement Predictor
                  </span>
                  <span className="text-xs text-[#64748B]">
                    Project ID: FYP-CS-2021-082 · Supervisor: Dr. Tariq Mansoor
                  </span>
                </div>
                <span className="px-3 py-1 rounded-full bg-[#FFF1E5] text-[#002D71] text-xs font-bold shrink-0">
                  51% similarity
                </span>
              </div>
            </div>
          </div>

          {/* Policy Note */}
          <div className="flex items-start gap-2.5 pt-2 text-[#002D71]/90 text-xs">
            <span className="material-symbols-outlined text-[18px] text-[#FD7A12] shrink-0 mt-0.5">
              info
            </span>
            <p>
              Similarity scores identify overlapping concepts and do not establish plagiarism. Human review is required.
            </p>
          </div>
        </div>

        {/* Card 3: Decision */}
        <div className="bg-white rounded-[20px] p-6 shadow-sm border border-[#E2E8F0] flex flex-col gap-6">
          <div className="flex items-center justify-between border-b border-[#E2E8F0]/60 pb-4">
            <div className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-[#002D71] text-[22px]">gavel</span>
              <h3 className="font-headline-sm text-lg text-[#1E293B] font-semibold">Decision</h3>
            </div>
            <span className="text-xs text-[#64748B]">Coordinator Endorsement &amp; Allocation</span>
          </div>

          {/* Radio List Selection */}
          <div className="flex flex-col gap-3">
            <span className="font-eyebrow text-[11px] uppercase tracking-wider text-[#64748B] font-bold">
              Select Endorsed Proposal Idea
            </span>

            {/* Option 1 */}
            <label
              onClick={() => setSelectedDecision('idea1')}
              className={`flex items-center justify-between p-4 rounded-xl cursor-pointer transition-all border ${
                selectedDecision === 'idea1'
                  ? 'bg-[#FFF1E5]/40 border-[#FD7A12]'
                  : 'bg-[#f5f3f6] border-transparent hover:bg-[#efedf0]'
              }`}
            >
              <div className="flex items-center gap-3.5">
                <input
                  type="radio"
                  name="proposal_decision"
                  checked={selectedDecision === 'idea1'}
                  onChange={() => setSelectedDecision('idea1')}
                  className="w-4 h-4 text-[#FD7A12] accent-[#FD7A12] cursor-pointer"
                />
                <div className="flex flex-col">
                  <span className="font-body-md font-semibold text-[#1E293B] text-sm">
                    Idea 1: AI-Powered Student Career Guidance System
                  </span>
                  <span className="text-xs text-[#64748B]">
                    Primary proposed path · Highest architectural readiness
                  </span>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-md bg-white text-xs font-semibold text-[#FD7A12] shadow-xs border border-[#E2E8F0]">
                Recommended
              </span>
            </label>

            {/* Option 2 */}
            <label
              onClick={() => setSelectedDecision('idea2')}
              className={`flex items-center justify-between p-4 rounded-xl cursor-pointer transition-all border ${
                selectedDecision === 'idea2'
                  ? 'bg-[#FFF1E5]/40 border-[#FD7A12]'
                  : 'bg-[#f5f3f6] border-transparent hover:bg-[#efedf0]'
              }`}
            >
              <div className="flex items-center gap-3.5">
                <input
                  type="radio"
                  name="proposal_decision"
                  checked={selectedDecision === 'idea2'}
                  onChange={() => setSelectedDecision('idea2')}
                  className="w-4 h-4 text-[#FD7A12] accent-[#FD7A12] cursor-pointer"
                />
                <div className="flex flex-col">
                  <span className="font-body-md font-medium text-[#1E293B] text-sm">
                    Idea 2: Smart Campus Energy Monitoring Platform
                  </span>
                  <span className="text-xs text-[#64748B]">
                    Requires dedicated IoT hardware procurement
                  </span>
                </div>
              </div>
            </label>

            {/* Option 3 */}
            <label
              onClick={() => setSelectedDecision('idea3')}
              className={`flex items-center justify-between p-4 rounded-xl cursor-pointer transition-all border ${
                selectedDecision === 'idea3'
                  ? 'bg-[#FFF1E5]/40 border-[#FD7A12]'
                  : 'bg-[#f5f3f6] border-transparent hover:bg-[#efedf0]'
              }`}
            >
              <div className="flex items-center gap-3.5">
                <input
                  type="radio"
                  name="proposal_decision"
                  checked={selectedDecision === 'idea3'}
                  onChange={() => setSelectedDecision('idea3')}
                  className="w-4 h-4 text-[#FD7A12] accent-[#FD7A12] cursor-pointer"
                />
                <div className="flex flex-col">
                  <span className="font-body-md font-medium text-[#1E293B] text-sm">
                    Idea 3: Secure Student Credential Wallet
                  </span>
                  <span className="text-xs text-[#64748B]">
                    Distributed ledger framework · High administrative friction
                  </span>
                </div>
              </div>
            </label>
          </div>

          {/* Optional Comments Field */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="coordinator-remarks"
              className="font-eyebrow text-[11px] uppercase tracking-wider text-[#64748B] font-bold"
            >
              Committee Comments &amp; Directives (Optional)
            </label>
            <textarea
              id="coordinator-remarks"
              rows={3}
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              className="w-full rounded-xl bg-[#f5f3f6] px-4 py-3 text-sm text-[#1E293B] placeholder:text-[#64748B] focus:outline-none focus:bg-white border border-transparent focus:border-[#FD7A12] transition-all"
              placeholder="Provide notes regarding supervisor alignment, scope adjustments, or technical prerequisites..."
            ></textarea>
          </div>

          {/* Action Button Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#E2E8F0]">
            <button
              type="button"
              onClick={() => triggerToast('Proposal batch flagged for rejection under committee quorum.')}
              className="text-[#C2392F] hover:text-[#ba1a1a] text-sm font-semibold px-4 py-2.5 rounded-lg hover:bg-[#FDE8E6]/50 transition-colors cursor-pointer"
            >
              Reject all
            </button>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => triggerToast('Revision request sent to group lead Ayesha Khan.')}
                className="inline-flex items-center gap-2 bg-[#FFF4DF] text-[#B26B00] hover:bg-[#FFF4DF]/80 text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors shadow-xs cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">edit_note</span>
                <span>Request revision</span>
              </button>

              <button
                type="button"
                onClick={handleApprove}
                className="inline-flex items-center gap-2 bg-[#002D71] hover:bg-[#164783] text-white text-sm font-semibold px-6 py-2.5 rounded-xl transition-colors shadow-sm cursor-pointer"
              >
                <span>Approve selected idea</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProposalReviewView;
