import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  FolderGit2,
  CheckCircle2,
  Clock,
  Calendar,
  Layers,
  Award,
  Sparkles,
  FileText,
  UserCheck,
  ShieldAlert,
  ArrowRight
} from 'lucide-react';

export const MyProjectScreen: React.FC = () => {
  const {
    officialProject,
    setCurrentScreen,
    setActiveMilestoneId,
    setActiveTaskId,
    setActiveProposalId,
  } = useApp();

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12 animate-in fade-in duration-150">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-4">
        <div>
          <div className="text-[11px] font-bold text-[#64748B] tracking-widest uppercase">
            OFFICIAL PROJECT WORKSPACE
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#1E293B] mt-0.5">My Project</h1>
          <p className="text-sm text-[#64748B]">
            Your approved Final Year Project record and connected academic progress.
          </p>
        </div>
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            Demonstration approval record
          </span>
        </div>
      </div>

      {/* OFFICIALLY APPROVED PROJECT Summary Box */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <div className="text-[11px] font-bold text-[#64748B] tracking-wider uppercase">
              OFFICIALLY APPROVED PROJECT
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#1E293B] mt-1">
              {officialProject.title}
            </h2>
            <p className="text-xs text-[#64748B] mt-0.5">
              This is your officially approved Final Year Project.
            </p>
          </div>
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#DCFCE7] text-[#15803D]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#15803D]" />
              Approved
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-5">
          <div>
            <span className="text-xs text-[#64748B] block">Project ID</span>
            <span className="text-sm font-mono font-bold text-[#1E293B] mt-1 block">
              {officialProject.code}
            </span>
            <span className="text-[10px] text-slate-400">Prototype placeholder</span>
          </div>
          <div>
            <span className="text-xs text-[#64748B] block">Current Academic Phase</span>
            <span className="text-sm font-bold text-[#002D71] mt-1 block">
              {officialProject.phase}
            </span>
            <span className="text-[10px] text-slate-400">FYP2 locked until official FYP1 pass</span>
          </div>
          <div>
            <span className="text-xs text-[#64748B] block">Project Type</span>
            <span className="text-sm font-semibold text-[#1E293B] mt-1 block">
              {officialProject.type}
            </span>
          </div>
          <div>
            <span className="text-xs text-[#64748B] block">Primary Domain</span>
            <span className="text-sm font-semibold text-[#1E293B] mt-1 block">
              {officialProject.specialization}
            </span>
          </div>
        </div>
      </div>

      {/* APPROVED PROPOSAL RECORD */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-bold text-[#64748B] uppercase tracking-wider mb-2">
          <FileText className="w-4 h-4 text-[#01B0F1]" />
          <span>Approved Proposal Record</span>
        </div>
        <h3 className="text-lg font-bold text-[#1E293B] mb-5">Project Description</h3>

        <div className="space-y-5">
          <div>
            <span className="text-xs font-bold text-[#64748B] uppercase tracking-wider block mb-1">
              PROJECT TITLE
            </span>
            <p className="text-base font-semibold text-[#1E293B]">{officialProject.title}</p>
          </div>

          <div>
            <span className="text-xs font-bold text-[#64748B] uppercase tracking-wider block mb-1">
              PROJECT SUMMARY / DESCRIPTION
            </span>
            <p className="text-sm text-[#475569] leading-relaxed bg-slate-50/70 p-4 rounded-xl border border-slate-200">
              {officialProject.summary}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div>
              <span className="text-xs font-bold text-[#64748B] uppercase tracking-wider block mb-2">
                PROJECT OBJECTIVES
              </span>
              <div className="bg-slate-50/70 p-4 rounded-xl border border-slate-200 text-xs text-[#475569] leading-relaxed whitespace-pre-line">
                {officialProject.objectives}
              </div>
            </div>

            <div>
              <span className="text-xs font-bold text-[#64748B] uppercase tracking-wider block mb-2">
                EXPECTED OUTCOMES
              </span>
              <div className="bg-slate-50/70 p-4 rounded-xl border border-slate-200 text-xs text-[#475569] leading-relaxed whitespace-pre-line">
                {officialProject.outcomes}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CLASSIFICATION & TOOLS */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-bold text-[#64748B] uppercase tracking-wider mb-1">
          <Sparkles className="w-4 h-4 text-[#01B0F1]" />
          <span>Classification & Tools</span>
        </div>
        <h3 className="text-lg font-bold text-[#1E293B] mb-4">Technology and Specialization</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-4">
          <div>
            <span className="text-xs font-bold text-[#64748B] uppercase tracking-wider block mb-1">
              PROJECT TYPE
            </span>
            <span className="text-sm font-semibold text-[#1E293B]">{officialProject.type}</span>
          </div>
          <div>
            <span className="text-xs font-bold text-[#64748B] uppercase tracking-wider block mb-1">
              AREA / SPECIALIZATION
            </span>
            <span className="text-sm font-semibold text-[#1E293B]">
              {officialProject.specialization}
            </span>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100">
          <span className="text-xs font-bold text-[#64748B] uppercase tracking-wider block mb-2">
            PROPOSED TECHNOLOGY STACK
          </span>
          <div className="flex flex-wrap gap-2">
            {officialProject.techStack.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 bg-slate-100 text-slate-800 text-xs font-medium rounded-lg border border-slate-200"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Project Team & Assigned Supervisor */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Project Team */}
        <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-[#1E293B] flex items-center gap-2 mb-4">
              <FolderGit2 className="w-4 h-4 text-[#002D71]" /> Project Team
            </h3>

            <div className="space-y-3">
              {officialProject.team.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-200"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#E2E8F0] text-[#002D71] flex items-center justify-center font-bold text-xs shrink-0">
                      {member.initials}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                        <span>{member.name}</span>
                        {member.isLead && (
                          <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-[#DCFCE7] text-[#15803D]">
                            Team Lead
                          </span>
                        )}
                      </div>
                      <div className="text-xs font-mono text-slate-500">{member.studentId}</div>
                      <div className="text-xs text-slate-400">{member.email}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-xs text-[#64748B]">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Team membership and university assigned Student IDs are read only.</span>
          </div>
        </div>

        {/* Assigned Supervisor */}
        <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-[#1E293B] flex items-center gap-2 mb-4">
              <UserCheck className="w-4 h-4 text-[#15803D]" /> Assigned Supervisor
            </h3>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#164783] text-white flex items-center justify-center font-bold text-base shrink-0 shadow-xs">
                  DR
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-base font-bold text-slate-900">
                      {officialProject.supervisor.name}
                    </h4>
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#DCFCE7] text-[#15803D]">
                      Assigned
                    </span>
                  </div>
                  <div className="text-xs text-slate-600 mt-0.5">
                    {officialProject.supervisor.title}
                  </div>
                  <div className="text-xs text-slate-500">
                    {officialProject.supervisor.department}
                  </div>
                  <div className="text-xs font-mono text-[#002D71] mt-2">
                    {officialProject.supervisor.email}
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">
                    Office: {officialProject.supervisor.office}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-[#64748B]">
            Supervisor assignment is managed by the university and cannot be changed by students.
          </div>
        </div>
      </div>

      {/* PROJECT STATUS - Academic Progress */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-xs">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <div className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider">
              PROJECT STATUS
            </div>
            <h3 className="text-lg font-bold text-[#1E293B]">Academic Progress</h3>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#DCFCE7] text-[#15803D]">
            • Active
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-4">
          <div>
            <span className="text-xs text-[#64748B] block">Official Project Status</span>
            <span className="text-sm font-semibold text-[#15803D] mt-1 block">
              Approved & Active
            </span>
          </div>
          <div>
            <span className="text-xs text-[#64748B] block">Current FYP Phase</span>
            <span className="text-sm font-semibold text-[#002D71] mt-1 block">FYP1</span>
          </div>
          <div>
            <span className="text-xs text-[#64748B] block">Milestones Completed</span>
            <span className="text-sm font-semibold text-[#1E293B] mt-1 block">2 of 8</span>
          </div>
          <div>
            <span className="text-xs text-[#64748B] block">Milestone Completion</span>
            <span className="text-xl font-bold font-mono text-[#002D71] mt-0.5 block">25%</span>
          </div>
        </div>

        {/* NEXT TASK OR DEADLINE */}
        <div className="mt-2 p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider block">
              NEXT TASK OR DEADLINE
            </span>
            <h4 className="text-sm font-bold text-[#1E293B] mt-0.5">
              Complete system architecture package
            </h4>
            <div className="text-xs text-[#C2392F] font-semibold mt-0.5 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              <span>Overdue · Oct 17, 2026, 5:00 PM</span>
            </div>
          </div>
          <button
            onClick={() => {
              setActiveMilestoneId(3);
              setActiveTaskId('M3-T1');
              setCurrentScreen('student-assignment-detail');
            }}
            className="px-4 py-2 bg-white border border-[#002D71] text-[#002D71] text-xs font-semibold rounded-lg hover:bg-[#002D71] hover:text-white transition-colors self-start sm:self-auto"
          >
            View Tasks
          </button>
        </div>
      </div>

      {/* RELATED MODULES */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-xs">
        <div className="text-xs font-bold text-[#64748B] uppercase tracking-wider mb-1">
          RELATED MODULES
        </div>
        <h3 className="text-base font-bold text-[#1E293B] mb-4">Continue your project work</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <button
            onClick={() => setCurrentScreen('student-milestones')}
            className="p-4 rounded-xl border border-slate-200 hover:border-[#002D71] hover:bg-slate-50 text-left transition-all group"
          >
            <Layers className="w-5 h-5 text-[#002D71] mb-2 group-hover:scale-110 transition-transform" />
            <div className="text-sm font-semibold text-slate-900">View Tasks & Milestones</div>
            <div className="text-xs text-slate-500 mt-1">Review deadlines and deliverables</div>
          </button>

          <button
            onClick={() => setCurrentScreen('student-proposal-overview')}
            className="p-4 rounded-xl border border-slate-200 hover:border-[#002D71] hover:bg-slate-50 text-left transition-all group"
          >
            <FileText className="w-5 h-5 text-[#002D71] mb-2 group-hover:scale-110 transition-transform" />
            <div className="text-sm font-semibold text-slate-900">View Original Approved Proposal</div>
            <div className="text-xs text-slate-500 mt-1">Inspect proposal idea #1 details</div>
          </button>

          <button
            onClick={() => setCurrentScreen('student-evaluation')}
            className="p-4 rounded-xl border border-slate-200 hover:border-[#002D71] hover:bg-slate-50 text-left transition-all group"
          >
            <Award className="w-5 h-5 text-[#002D71] mb-2 group-hover:scale-110 transition-transform" />
            <div className="text-sm font-semibold text-slate-900">View Evaluation & Results</div>
            <div className="text-xs text-slate-500 mt-1">Check 34/40 FYP1 obtained marks</div>
          </button>

          <button
            onClick={() => {
              setActiveProposalId('prop-1');
              setCurrentScreen('student-ai-results');
            }}
            className="p-4 rounded-xl border border-slate-200 bg-[#002D71] text-white hover:bg-[#003B85] text-left transition-all group"
          >
            <Sparkles className="w-5 h-5 text-[#01B0F1] mb-2 group-hover:scale-110 transition-transform" />
            <div className="text-sm font-semibold text-white">View Approved Proposal AI Analysis</div>
            <div className="text-xs text-slate-300 mt-1">Similarity, overlap & domain model</div>
          </button>
        </div>
      </div>
    </div>
  );
};
