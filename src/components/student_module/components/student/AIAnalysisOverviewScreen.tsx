import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  GitCompare,
  FileText
} from 'lucide-react';

export const AIAnalysisOverviewScreen: React.FC = () => {
  const { proposals, setCurrentScreen, setActiveProposalId } = useApp();

  const handleViewResults = (propId: string) => {
    setActiveProposalId(propId);
    setCurrentScreen('student-ai-results');
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12 animate-in fade-in duration-150">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="text-[11px] font-bold text-[#64748B] tracking-widest uppercase">
            AI-ASSISTED REVIEW
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#1E293B] mt-0.5">AI Analysis</h1>
          <p className="text-sm text-[#64748B]">
            Review advisory insights generated for each submitted project idea.
          </p>
        </div>

        <button
          onClick={() => setCurrentScreen('student-proposal-compare')}
          className="inline-flex items-center gap-2 px-4 py-2 border border-slate-300 bg-white text-slate-800 text-xs font-semibold rounded-lg hover:bg-slate-50 transition-colors shadow-xs"
        >
          <GitCompare className="w-4 h-4 text-[#002D71]" />
          <span>Compare proposals</span>
        </button>
      </div>

      {/* Advisory Banner */}
      <div className="p-4 rounded-xl bg-[#EAF5FC] border border-[#01B0F1]/30 flex items-start gap-3">
        <Sparkles className="w-5 h-5 text-[#01B0F1] shrink-0 mt-0.5" />
        <div className="text-xs text-[#002D71] leading-relaxed">
          <span className="font-bold">AI insights are advisory.</span> They support — but do not
          replace — supervisor and departmental review.
        </div>
      </div>

      {/* Proposal Cards */}
      <div className="space-y-4">
        {proposals.map((proposal) => (
          <div
            key={proposal.id}
            className="bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-xs hover:border-[#002D71]/40 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-slate-100 text-[#002D71] flex items-center justify-center font-bold text-sm font-mono shrink-0">
                0{proposal.number}
              </div>
              <div>
                <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider block">
                  PROPOSAL {proposal.number}
                </span>
                <h3 className="text-base sm:text-lg font-bold text-[#1E293B] mt-0.5">
                  {proposal.title}
                </h3>
                <div className="text-xs text-[#64748B] mt-1">
                  {proposal.specialization} · Analysis completed {proposal.analysisCompletedDate || 'May 22, 2025'}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 self-end md:self-center">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#DCFCE7] text-[#15803D]">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Analysis Complete</span>
              </span>

              <button
                onClick={() => handleViewResults(proposal.id)}
                className="px-5 py-2.5 bg-[#002D71] text-white text-xs font-semibold rounded-lg hover:bg-[#003B85] transition-colors flex items-center gap-1.5 shadow-xs"
              >
                <span>View results</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
