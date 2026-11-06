import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  FileCheck2,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  FileEdit,
  PlusCircle
} from 'lucide-react';

export const ProposalSubmissionOverview: React.FC = () => {
  const { proposals, setCurrentScreen, setActiveProposalId, submitAllProposals } = useApp();

  const completedCount = proposals.filter((p) => p.status === 'Approved').length;
  const progressPercent = Math.round((completedCount / 3) * 100);

  const handleOpenProposal = (propId: string) => {
    setActiveProposalId(propId);
    setCurrentScreen('student-proposal-form');
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-24 animate-in fade-in duration-150">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="text-[11px] font-bold text-[#64748B] tracking-widest uppercase">
            FYP PROPOSALS · 2025
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#1E293B] mt-0.5">
            Proposal Submission
          </h1>
          <p className="text-sm text-[#64748B]">
            Submit three proposed FYP ideas for review and approval.
          </p>
        </div>

        {/* Progress Tracker */}
        <div className="flex items-center gap-4 bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs">
          <div>
            <div className="text-xs text-[#64748B]">Overall progress</div>
            <div className="text-sm font-bold text-[#1E293B]">{completedCount} of 3 completed</div>
          </div>
          <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#01B0F1] transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="text-lg font-bold font-mono text-[#002D71]">{progressPercent}%</div>
        </div>
      </div>

      {/* Team Lead Workspace Banner */}
      <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
        <div>
          <h4 className="text-sm font-bold text-emerald-900">Team Lead workspace</h4>
          <p className="text-xs text-emerald-800 mt-0.5">
            Only you can edit and submit proposals. Your group members have view-only access.
          </p>
        </div>
      </div>

      {/* 3 Proposals List */}
      <div className="space-y-4">
        {proposals.map((proposal) => {
          const isApproved = proposal.status === 'Approved';
          const isDraft = proposal.status === 'Draft';
          const isNotStarted = proposal.status === 'Not Started';

          return (
            <div
              key={proposal.id}
              className="bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-xs hover:border-[#002D71]/40 transition-all group"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs ${
                      isApproved
                        ? 'bg-emerald-600 text-white'
                        : isDraft
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {isApproved ? <CheckCircle2 className="w-4 h-4" /> : proposal.number}
                  </div>
                  <span className="text-xs font-bold text-[#64748B] uppercase tracking-wider">
                    PROPOSAL {proposal.number} · IDEA {proposal.number === 1 ? 'ONE' : proposal.number === 2 ? 'TWO' : 'THREE'}
                  </span>
                </div>

                <div>
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-semibold ${
                      isApproved
                        ? 'bg-[#DCFCE7] text-[#15803D]'
                        : isDraft
                        ? 'bg-[#FFF4DF] text-[#B26B00]'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {proposal.status}
                  </span>
                </div>
              </div>

              <div className="py-4">
                <h3 className="text-lg font-bold text-[#1E293B] group-hover:text-[#002D71] transition-colors">
                  {proposal.title}
                </h3>
                <p className="text-xs text-[#64748B] line-clamp-2 mt-1.5 leading-relaxed">
                  {proposal.summary}
                </p>

                {proposal.specialization && (
                  <div className="mt-3">
                    <span className="text-xs font-medium text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200">
                      {proposal.specialization}
                    </span>
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end">
                {isApproved ? (
                  <button
                    onClick={() => handleOpenProposal(proposal.id)}
                    className="w-full sm:w-auto px-5 py-2.5 bg-slate-50 border border-slate-300 text-[#002D71] text-xs font-semibold rounded-lg hover:bg-slate-100 flex items-center justify-center gap-2 transition-colors"
                  >
                    <span>View approved proposal</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : isDraft ? (
                  <button
                    onClick={() => handleOpenProposal(proposal.id)}
                    className="w-full sm:w-auto px-6 py-2.5 bg-[#002D71] text-white text-xs font-semibold rounded-lg hover:bg-[#003B85] flex items-center justify-center gap-2 transition-colors"
                  >
                    <FileEdit className="w-3.5 h-3.5" />
                    <span>Continue proposal</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    onClick={() => handleOpenProposal(proposal.id)}
                    className="w-full sm:w-auto px-6 py-2.5 bg-[#002D71] text-white text-xs font-semibold rounded-lg hover:bg-[#003B85] flex items-center justify-center gap-2 transition-colors"
                  >
                    <PlusCircle className="w-3.5 h-3.5" />
                    <span>Start proposal</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Sticky Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-slate-200 px-6 py-4 shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-5 h-5 rounded-full bg-emerald-600 text-white text-[10px] font-bold flex items-center justify-center">
              ✓
            </span>
            <span className="w-5 h-5 rounded-full bg-amber-200 text-amber-900 text-[10px] font-bold flex items-center justify-center">
              2
            </span>
            <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 text-[10px] font-bold flex items-center justify-center">
              3
            </span>
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900">2 proposals remaining</div>
            <div className="text-[11px] text-slate-500">
              Complete and validate all three ideas before final submission.
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentScreen('student-proposal-review')}
            className="px-4 py-2 border border-slate-300 text-slate-700 text-xs font-semibold rounded-lg hover:bg-slate-50 transition-colors"
          >
            Review all proposals
          </button>
          <button
            onClick={submitAllProposals}
            className="px-5 py-2 bg-[#002D71] text-white text-xs font-semibold rounded-lg hover:bg-[#003B85] shadow-xs transition-colors flex items-center gap-1.5"
          >
            <span>Submit all three proposals</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
