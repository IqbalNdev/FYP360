import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  ArrowLeft,
  Sparkles,
  GitCompare,
  ArrowRight,
  CheckCircle2,
  Table,
  Layers,
  FileText
} from 'lucide-react';

export const ProposalCompareScreen: React.FC = () => {
  const { proposals, setCurrentScreen, setActiveProposalId } = useApp();

  const handleOpenAnalysis = (propId: string) => {
    setActiveProposalId(propId);
    setCurrentScreen('student-ai-results');
  };

  const comparisonData = [
    {
      criterion: 'Project Domain',
      prop1: 'Artificial Intelligence / Machine Learning',
      prop2: 'Internet of Things',
      prop3: 'Cybersecurity',
    },
    {
      criterion: 'Specialization',
      prop1: 'Recommender Systems',
      prop2: 'Smart Infrastructure and Analytics',
      prop3: 'Digital Identity and Access Management',
    },
    {
      criterion: 'Analysis Status',
      prop1: 'Analysis Complete',
      prop2: 'Analysis Complete',
      prop3: 'Analysis Complete',
    },
    {
      criterion: 'Number of Related Existing Projects',
      prop1: '3',
      prop2: '3',
      prop3: '3',
    },
    {
      criterion: 'Highest Similarity Score',
      prop1: '76% · Illustrative',
      prop2: '72% · Illustrative',
      prop3: '69% · Illustrative',
    },
    {
      criterion: 'Most Relevant Matching Project',
      prop1: 'Student Career Recommendation Portal',
      prop2: 'IoT Building Energy Tracker',
      prop3: 'Blockchain Academic Certificate Verification',
    },
    {
      criterion: 'Key Overlapping Concepts',
      prop1: 'Problem statement, Career guidance, Recommendation model',
      prop2: 'Problem statement, IoT sensors, Energy dashboard',
      prop3: 'Problem statement, Credential verification, Academic records',
    },
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-24 animate-in fade-in duration-150">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="text-[11px] font-bold text-[#64748B] tracking-widest uppercase">
            PROPOSAL COMPARISON
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#1E293B] mt-0.5">
            Compare Project Proposals
          </h1>
          <p className="text-sm text-[#64748B]">
            Compare the three submitted FYP ideas and review their potential overlap with existing
            university projects.
          </p>
        </div>

        <button
          onClick={() => setCurrentScreen('student-ai-analysis')}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-slate-300 text-xs font-semibold rounded-lg hover:bg-slate-50 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to AI Analysis</span>
        </button>
      </div>

      {/* Advisory Banner */}
      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
        <Sparkles className="w-5 h-5 text-[#01B0F1] shrink-0 mt-0.5" />
        <div className="text-xs text-slate-600 leading-relaxed">
          <span className="font-bold text-slate-900 block mb-0.5">
            Illustrative comparison data.
          </span>
          Similarity findings support human review and do not determine plagiarism or project
          approval.
        </div>
      </div>

      {/* 3 Proposals Side-by-Side Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {proposals.map((prop) => (
          <div
            key={prop.id}
            className="bg-white rounded-xl border border-[#E2E8F0] p-5 shadow-xs flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between border-b border-slate-100 pb-2.5 mb-3">
                <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">
                  PROPOSAL {prop.number}
                </span>
                <span className="px-2 py-0.5 bg-[#DCFCE7] text-[#15803D] text-[10px] font-semibold rounded-full flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  Complete
                </span>
              </div>

              <h3 className="text-sm font-bold text-[#1E293B] line-clamp-2">{prop.title}</h3>
              <p className="text-xs text-[#64748B] line-clamp-3 mt-1.5 leading-relaxed">
                {prop.summary}
              </p>

              <div className="mt-4 pt-3 border-t border-slate-100 space-y-2 text-xs">
                <div>
                  <span className="text-[11px] text-[#64748B] block">Primary domain</span>
                  <span className="font-semibold text-slate-800">{prop.specialization}</span>
                </div>
                <div>
                  <span className="text-[11px] text-[#64748B] block">Specialization</span>
                  <span className="font-semibold text-slate-800">
                    {prop.number === 1
                      ? 'Recommender Systems'
                      : prop.number === 2
                      ? 'Smart Infrastructure and Analytics'
                      : 'Digital Identity and Access Management'}
                  </span>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <div>
                    <span className="text-[11px] text-[#64748B] block">Related projects</span>
                    <span className="font-mono font-bold text-slate-900">3</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] text-[#64748B] block">Highest similarity</span>
                    <span className="font-mono font-bold text-[#FD7A12]">
                      {prop.similarityScore || 70}%
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100">
              <button
                onClick={() => handleOpenAnalysis(prop.id)}
                className="w-full py-2 bg-slate-50 border border-slate-300 text-[#002D71] text-xs font-semibold rounded-lg hover:bg-slate-100 transition-colors flex items-center justify-center gap-1.5"
              >
                <span>View Full Analysis</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* SIMILARITY TO EXISTING PROJECTS */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-xs space-y-4">
        <div className="border-b border-slate-100 pb-3">
          <div className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider">
            SIMILARITY TO EXISTING PROJECTS
          </div>
          <h3 className="text-base font-bold text-[#1E293B] mt-0.5">
            Most relevant university project matches
          </h3>
        </div>

        <div className="space-y-4">
          {proposals.map((prop) => (
            <div key={prop.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">
                  PROPOSAL {prop.number}
                </span>
                <span className="font-mono font-bold text-xs text-[#FD7A12]">
                  {prop.similarityScore || 70}% Illustrative similarity
                </span>
              </div>
              <h4 className="text-sm font-bold text-slate-900">{prop.topMatchingProject}</h4>
              <p className="text-xs text-slate-600 mt-1">{prop.similarityDescription}</p>

              <div className="flex flex-wrap gap-1.5 mt-2.5">
                {prop.keyOverlaps?.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 bg-white text-slate-700 rounded text-[11px] font-medium border border-slate-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="p-3 bg-sky-50 rounded-lg border border-sky-200 text-xs text-[#002D71] leading-relaxed">
          <span className="font-bold">Separate comparison types:</span> The findings above compare
          each new proposal with illustrative existing university project records. The three new
          proposals target different domains and show no significant direct overlap with one another.
        </div>
      </div>

      {/* CONSISTENT ANALYSIS CRITERIA TABLE */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-xs">
        <div className="border-b border-slate-100 pb-3 mb-4">
          <div className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider">
            CONSISTENT ANALYSIS CRITERIA
          </div>
          <h3 className="text-base font-bold text-[#1E293B] mt-0.5">Proposal comparison table</h3>
        </div>

        <div className="overflow-x-auto border border-slate-200 rounded-xl">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 font-semibold text-[#1E293B]">
              <tr>
                <th className="py-3 px-4 w-1/4">Comparison Criteria</th>
                <th className="py-3 px-4 w-1/4">Proposal 1</th>
                <th className="py-3 px-4 w-1/4">Proposal 2</th>
                <th className="py-3 px-4 w-1/4">Proposal 3</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {comparisonData.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50">
                  <td className="py-3 px-4 font-semibold text-slate-900 bg-slate-50/30">
                    {row.criterion}
                  </td>
                  <td className="py-3 px-4 text-slate-700">{row.prop1}</td>
                  <td className="py-3 px-4 text-slate-700">{row.prop2}</td>
                  <td className="py-3 px-4 text-slate-700">{row.prop3}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Action Footer */}
      <div className="fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-slate-200 px-6 py-4 shadow-lg flex items-center justify-between">
        <button
          onClick={() => setCurrentScreen('student-ai-analysis')}
          className="px-4 py-2 border border-slate-300 text-slate-700 text-xs font-semibold rounded-lg hover:bg-slate-50 transition-colors"
        >
          ← Back to AI Analysis
        </button>

        <div className="flex items-center gap-2">
          {proposals.map((prop) => (
            <button
              key={prop.id}
              onClick={() => handleOpenAnalysis(prop.id)}
              className="px-3.5 py-1.5 text-xs font-semibold bg-slate-100 text-[#002D71] rounded-lg hover:bg-[#002D71] hover:text-white transition-colors"
            >
              Proposal {prop.number} Analysis
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
