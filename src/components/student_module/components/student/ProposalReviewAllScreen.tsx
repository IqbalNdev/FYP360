import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  FileEdit,
  ArrowRight,
  Users
} from 'lucide-react';

export const ProposalReviewAllScreen: React.FC = () => {
  const {
    proposals,
    officialProject,
    setCurrentScreen,
    setActiveProposalId,
    submitAllProposals
  } = useApp();

  const handleEditProposal = (propId: string) => {
    setActiveProposalId(propId);
    setCurrentScreen('student-proposal-form');
  };

  const hasIncomplete = proposals.some(
    (p) => !p.objectives || p.objectives.includes('No project objectives')
  );

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-24 animate-in fade-in duration-150">
      {/* Top Breadcrumb */}
      <div>
        <button
          onClick={() => setCurrentScreen('student-proposal-overview')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#002D71] hover:text-[#01B0F1] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to overview</span>
        </button>
      </div>

      {/* Header */}
      <div className="border-b border-slate-200 pb-4">
        <div className="text-[11px] font-bold text-[#64748B] tracking-widest uppercase">
          FINAL REVIEW
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#1E293B] mt-0.5">
          Review all proposals
        </h1>
        <p className="text-sm text-[#64748B]">
          Confirm your group details and project ideas before final submission.
        </p>
      </div>

      {/* Status Warning if incomplete */}
      {hasIncomplete && (
        <div className="p-4 rounded-xl bg-[#FFF4DF] border border-amber-200 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-[#B26B00] shrink-0 mt-0.5" />
          <div className="text-xs text-[#B26B00] font-medium">
            <span className="font-bold block text-slate-900 mb-0.5">
              Complete all required proposal fields before submitting.
            </span>
            Proposal 2 is currently missing detailed objectives and expected outcomes.
          </div>
        </div>
      )}

      {/* GROUP INFORMATION */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-xs">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
          <div>
            <div className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider">
              GROUP INFORMATION
            </div>
            <h3 className="text-base font-bold text-[#1E293B]">Team members</h3>
          </div>
          <button
            onClick={() => setCurrentScreen('student-settings')}
            className="px-3 py-1.5 border border-slate-300 text-slate-700 text-xs font-medium rounded-lg hover:bg-slate-50 transition-colors"
          >
            Edit group
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {officialProject.team.map((member, idx) => (
            <div
              key={member.id}
              className="p-3 rounded-lg bg-slate-50 border border-slate-200 flex items-center gap-3"
            >
              <div className="w-7 h-7 rounded-full bg-[#002D71] text-white flex items-center justify-center font-bold text-xs shrink-0">
                {idx + 1}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900">{member.name}</span>
                  {member.isLead && (
                    <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">
                      Team Lead
                    </span>
                  )}
                </div>
                <div className="text-[11px] text-slate-500 font-mono">
                  {member.studentId} · {member.email}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3 Proposals Review Cards */}
      <div className="space-y-4">
        {proposals.map((proposal) => {
          const isApproved = proposal.status === 'Approved';
          const isIncomplete =
            !proposal.objectives || proposal.objectives.includes('No project objectives');

          return (
            <div
              key={proposal.id}
              className="bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-xs space-y-4"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs ${
                      isApproved
                        ? 'bg-emerald-600 text-white'
                        : isIncomplete
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-[#002D71] text-white'
                    }`}
                  >
                    {isApproved ? '✓' : proposal.number}
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider">
                      PROPOSAL {proposal.number}
                    </span>
                    <h3 className="text-base font-bold text-[#1E293B]">{proposal.title}</h3>
                  </div>
                </div>

                <button
                  onClick={() => handleEditProposal(proposal.id)}
                  className="px-3 py-1.5 text-xs font-semibold text-[#002D71] border border-[#002D71] rounded-lg hover:bg-[#002D71]/5 transition-colors flex items-center gap-1"
                >
                  <FileEdit className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </button>
              </div>

              <div>
                <p className="text-xs text-[#475569] leading-relaxed">{proposal.summary}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-[#64748B] block">Project type</span>
                  <span className="font-semibold text-slate-900 mt-0.5 block">{proposal.type}</span>
                </div>
                <div>
                  <span className="text-[#64748B] block">Specialization</span>
                  <span className="font-semibold text-slate-900 mt-0.5 block">
                    {proposal.specialization}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-1">
                <div>
                  <span className="text-[#64748B] font-semibold block uppercase tracking-wider mb-1">
                    PROJECT OBJECTIVES
                  </span>
                  <div className="text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-200 whitespace-pre-line leading-relaxed">
                    {proposal.objectives}
                  </div>
                </div>
                <div>
                  <span className="text-[#64748B] font-semibold block uppercase tracking-wider mb-1">
                    EXPECTED OUTCOMES
                  </span>
                  <div className="text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-200 whitespace-pre-line leading-relaxed">
                    {proposal.outcomes}
                  </div>
                </div>
              </div>

              {/* Technologies */}
              <div className="pt-2">
                <div className="flex flex-wrap gap-2">
                  {proposal.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-0.5 bg-slate-100 text-slate-700 rounded-md text-xs font-medium border border-slate-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Incomplete warning row */}
              {isIncomplete && (
                <div className="p-3 bg-amber-50 rounded-lg border border-amber-200 text-xs text-amber-800 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>This proposal is missing required information.</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Action Footer */}
      <div className="fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-slate-200 px-6 py-4 shadow-lg flex items-center justify-between">
        <button
          onClick={() => setCurrentScreen('student-proposal-overview')}
          className="px-4 py-2 border border-slate-300 text-slate-700 text-xs font-semibold rounded-lg hover:bg-slate-50 transition-colors"
        >
          Back to overview
        </button>

        <button
          onClick={submitAllProposals}
          className="px-6 py-2.5 bg-[#002D71] text-white text-xs font-semibold rounded-lg hover:bg-[#003B85] shadow-xs transition-colors flex items-center gap-1.5"
        >
          <span>Submit all three proposals</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
