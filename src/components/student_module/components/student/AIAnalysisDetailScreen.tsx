import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { mockRelatedRecords, RelatedProjectRecord } from '../../data/mockData';
import {
  ArrowLeft,
  Sparkles,
  CheckCircle2,
  FileText,
  AlertTriangle,
  Download,
  GitCompare,
  X,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Search
} from 'lucide-react';

export const AIAnalysisDetailScreen: React.FC = () => {
  const { proposals, activeProposalId, setCurrentScreen, showToast } = useApp();

  const proposal = proposals.find((p) => p.id === activeProposalId) || proposals[0];

  // State for Page 8 Inspection Modal
  const [selectedRecord, setSelectedRecord] = useState<RelatedProjectRecord | null>(null);

  const handleDownloadReport = () => {
    showToast('Analysis report downloaded: FYP-CS-2025-042_Similarity_Audit.pdf', 'success');
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-24 animate-in fade-in duration-150 relative">
      {/* Top Breadcrumb & Action */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setCurrentScreen('student-ai-analysis')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#002D71] hover:text-[#01B0F1] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to AI Analysis</span>
        </button>

        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#DCFCE7] text-[#15803D]">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>Analysis Complete</span>
        </span>
      </div>

      {/* Main Header */}
      <div className="border-b border-slate-200 pb-4">
        <div className="text-[11px] font-bold text-[#64748B] tracking-wider uppercase">
          AI ANALYSIS RESULTS
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#1E293B] mt-0.5">{proposal.title}</h1>
        <p className="text-sm text-[#64748B]">
          Review potential similarities between your proposal and existing FYP projects.
        </p>
      </div>

      {/* Illustrative Prototype Disclaimer Banner */}
      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
        <Sparkles className="w-5 h-5 text-[#01B0F1] shrink-0 mt-0.5" />
        <div className="text-xs text-slate-600 leading-relaxed">
          <span className="font-bold text-slate-900 block mb-0.5">
            Illustrative prototype analysis.
          </span>
          Results are sample AI-generated insights and must not be used to automatically approve or
          reject a proposal. Human review by supervisor and committee is required.
        </div>
      </div>

      {/* DOMAIN CLASSIFICATION Card */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-xs">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#01B0F1]" />
            <span className="text-xs font-bold text-[#64748B] uppercase tracking-wider">
              Classification
            </span>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold font-mono text-[#002D71]">88%</div>
            <div className="text-[10px] text-[#64748B]">Confidence</div>
          </div>
        </div>

        <h3 className="text-base font-bold text-[#1E293B] mt-2 mb-4">Domain classification</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pb-4">
          <div>
            <span className="text-xs text-[#64748B] block">PRIMARY PROJECT DOMAIN</span>
            <span className="text-sm font-semibold text-[#1E293B] mt-0.5 block">
              {proposal.specialization}
            </span>
          </div>
          <div>
            <span className="text-xs text-[#64748B] block">SUGGESTED SPECIALIZATION</span>
            <span className="text-sm font-semibold text-[#1E293B] mt-0.5 block">
              Recommender Systems
            </span>
          </div>
          <div>
            <span className="text-xs text-[#64748B] block">SECONDARY DOMAIN</span>
            <span className="text-sm font-semibold text-[#1E293B] mt-0.5 block">
              Web Application Development
            </span>
          </div>
          <div>
            <span className="text-xs text-[#64748B] block">CLASSIFICATION CONFIDENCE</span>
            <span className="text-sm font-semibold text-[#002D71] mt-0.5 block">
              88% Illustrative
            </span>
          </div>
        </div>

        <p className="text-xs text-[#475569] leading-relaxed pt-3 border-t border-slate-100">
          The proposal combines profile-based machine learning recommendations with a web-based
          career guidance interface. This classification supports project categorization and helps
          identify conceptually related FYP records.
        </p>
      </div>

      {/* SIMILARITY DETECTION Card */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-xs space-y-5">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4 text-[#FD7A12]" />
            <span className="text-xs font-bold text-[#64748B] uppercase tracking-wider">
              SIMILARITY DETECTION · ILLUSTRATIVE RESULTS
            </span>
          </div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#FFF4DF] text-[#B26B00] text-xs font-bold">
            <span>3 related projects</span>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bold text-[#1E293B]">Potential overlap identified</h3>
          <p className="text-xs text-[#64748B] mt-0.5">
            3 existing FYP records may require closer human examination.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
          <div className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">
            OVERALL FINDING
          </div>
          <h4 className="text-sm font-bold text-slate-900 mt-1">Related projects found</h4>
          <p className="text-xs text-slate-600 mt-1 leading-relaxed">
            The strongest overlap is in student career matching, skill-gap analysis, and
            personalized learning roadmap recommendations.
          </p>
        </div>

        {/* 3 Existing Projects Comparison Rows */}
        <div className="space-y-3">
          {mockRelatedRecords.map((rec, idx) => (
            <div
              key={rec.id}
              onClick={() => setSelectedRecord(rec)}
              className="p-4 rounded-xl border border-slate-200 hover:border-[#002D71]/40 hover:bg-slate-50/50 transition-all cursor-pointer group"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-md bg-[#002D71] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-slate-900 group-hover:text-[#002D71]">
                      {rec.title}
                    </h5>
                    <div className="text-xs text-slate-500 mt-0.5">
                      Completed {rec.year} · {rec.domain}
                    </div>
                    <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                      {rec.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {rec.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 bg-slate-100 rounded text-[11px] text-slate-600 font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div className="text-base font-bold font-mono text-[#FD7A12]">
                    {rec.similarity}%
                  </div>
                  <div className="text-[10px] text-slate-400">Illustrative</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="p-3 bg-amber-50/60 rounded-lg border border-amber-200/60 text-xs text-amber-900 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-[#B26B00] shrink-0" />
          <span>
            Similarity scores identify potentially overlapping concepts and do not establish
            plagiarism. Human review is required.
          </span>
        </div>
      </div>

      {/* DETAILED REFERENCES List */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <FileText className="w-4 h-4 text-[#002D71]" />
          <span className="text-xs font-bold text-[#64748B] uppercase tracking-wider">
            DETAILED REFERENCES
          </span>
        </div>
        <h3 className="text-base font-bold text-[#1E293B]">Related FYP project records</h3>
        <p className="text-xs text-[#64748B]">
          Illustrative sample records for this prototype — not verified research citations or
          confirmed university projects.
        </p>

        <div className="space-y-3 pt-2">
          {mockRelatedRecords.map((rec) => (
            <div
              key={rec.id}
              className="p-4 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="flex items-start gap-3">
                <div className="text-base font-bold font-mono text-[#FD7A12] bg-[#FFF4DF] px-2.5 py-1 rounded-lg shrink-0">
                  {rec.similarity}%
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h5 className="text-sm font-bold text-slate-900">{rec.title}</h5>
                    <span className="text-xs text-slate-400">({rec.year})</span>
                  </div>
                  <div className="text-xs text-slate-500">{rec.domain}</div>
                  <div className="text-xs text-slate-700 mt-1">
                    <span className="font-semibold text-slate-900">Key overlap:</span> {rec.keyOverlap}
                  </div>
                </div>
              </div>

              <button
                onClick={() => setSelectedRecord(rec)}
                className="self-end sm:self-center px-3.5 py-1.5 border border-slate-300 text-slate-700 text-xs font-semibold rounded-lg hover:bg-slate-50 flex items-center gap-1 transition-colors shrink-0"
              >
                <span>View details</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Two Columns: Suggested Next Steps & Overlap Signals */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Suggested Next Steps */}
        <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <span className="text-xs font-bold text-[#64748B] uppercase tracking-wider">
              → Suggested next steps
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200">
              <span className="w-5 h-5 rounded-full bg-[#002D71] text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                1
              </span>
              <span className="text-slate-700 font-medium">
                Review the most similar existing projects in the university archive.
              </span>
            </div>

            <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200">
              <span className="w-5 h-5 rounded-full bg-[#002D71] text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                2
              </span>
              <span className="text-slate-700 font-medium">
                Clarify how the proposed project differs from related work in technical architecture.
              </span>
            </div>

            <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200">
              <span className="w-5 h-5 rounded-full bg-[#002D71] text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                3
              </span>
              <span className="text-slate-700 font-medium">
                Refine the problem statement or objectives if substantial overlap exists.
              </span>
            </div>
          </div>
          <p className="text-[11px] text-slate-400">
            These recommendations support further human review and do not approve or reject the
            proposal.
          </p>
        </div>

        {/* Overlap Signals */}
        <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <Search className="w-4 h-4 text-[#01B0F1]" />
            <span className="text-xs font-bold text-[#64748B] uppercase tracking-wider">
              Overlap signals
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-start gap-3">
              <span className="px-2 py-0.5 bg-[#DCFCE7] text-[#15803D] font-bold rounded font-mono shrink-0">
                3
              </span>
              <div>
                <span className="font-bold text-slate-800 block">Problem and objective matches</span>
                <span className="text-slate-600 text-[11px]">
                  Shared career guidance and personalized recommendation goals.
                </span>
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-start gap-3">
              <span className="px-2 py-0.5 bg-[#FFF4DF] text-[#B26B00] font-bold rounded font-mono shrink-0">
                4
              </span>
              <div>
                <span className="font-bold text-slate-800 block">Keyword clusters</span>
                <span className="text-slate-600 text-[11px]">
                  Career paths, skill gaps, recommendations, student profiles.
                </span>
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-start gap-3">
              <span className="px-2 py-0.5 bg-[#EAF5FC] text-[#01B0F1] font-bold rounded font-mono shrink-0">
                2
              </span>
              <div>
                <span className="font-bold text-slate-800 block">Functionality patterns</span>
                <span className="text-slate-600 text-[11px]">
                  Profile analysis and personalized learning roadmaps.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Human Evaluation Required Alert Bar */}
      <div className="p-4 rounded-xl bg-[#002D71] text-white flex items-center justify-between">
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-5 h-5 text-[#01B0F1]" />
          <div>
            <span className="text-sm font-bold block">Human evaluation required</span>
            <span className="text-xs text-slate-300">
              Similarity indicators do not determine plagiarism, originality, or project approval.
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Sticky Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-slate-200 px-6 py-4 shadow-lg flex items-center justify-between">
        <button
          onClick={() => setCurrentScreen('student-ai-analysis')}
          className="px-4 py-2 border border-slate-300 text-slate-700 text-xs font-semibold rounded-lg hover:bg-slate-50 transition-colors"
        >
          ← Back to AI Analysis
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentScreen('student-proposal-compare')}
            className="px-4 py-2 border border-slate-300 text-slate-700 text-xs font-semibold rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-1.5"
          >
            <GitCompare className="w-3.5 h-3.5 text-[#002D71]" />
            <span>Compare with Other Proposals</span>
          </button>

          <button
            onClick={handleDownloadReport}
            className="px-5 py-2 bg-[#002D71] text-white text-xs font-semibold rounded-lg hover:bg-[#003B85] shadow-xs transition-colors flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Analysis Report</span>
          </button>
        </div>
      </div>

      {/* Page 8: Detailed Sample Record Inspection Modal */}
      {selectedRecord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 space-y-5 animate-in fade-in duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">
                ILLUSTRATIVE SAMPLE RECORD · {selectedRecord.year}
              </div>
              <button
                onClick={() => setSelectedRecord(null)}
                className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div>
              <h3 className="text-xl font-bold text-[#1E293B]">{selectedRecord.title}</h3>
              <span className="inline-block px-2.5 py-0.5 bg-slate-100 text-slate-700 text-xs rounded-md font-medium mt-1.5">
                {selectedRecord.domain}
              </span>
            </div>

            <p className="text-xs text-[#475569] leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-200">
              {selectedRecord.description}
            </p>

            <div>
              <span className="text-xs font-bold text-[#1E293B] block uppercase tracking-wider mb-1">
                WHY THIS RECORD WAS IDENTIFIED
              </span>
              <p className="text-xs text-slate-600">{selectedRecord.keyOverlap}</p>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {selectedRecord.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-[11px] font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-3.5 bg-amber-50 rounded-xl border border-amber-200 flex items-center justify-between">
              <span className="text-xs font-semibold text-amber-900">
                Illustrative similarity indicator
              </span>
              <span className="text-xl font-bold font-mono text-[#FD7A12]">
                {selectedRecord.similarity}%
              </span>
            </div>

            <p className="text-[11px] text-slate-400 leading-tight">
              This sample record is provided only to demonstrate the prototype review workflow.
              Human examination of verified university records is required.
            </p>

            <button
              onClick={() => setSelectedRecord(null)}
              className="w-full py-2.5 bg-[#002D71] text-white text-xs font-semibold rounded-lg hover:bg-[#003B85] transition-colors"
            >
              Close details
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
