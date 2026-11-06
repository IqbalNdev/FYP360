import React from 'react';
import { useApp } from '../../context/AppContext';
import { X, BookOpen, CheckCircle, FileText, Scale, Clock, Award } from 'lucide-react';

export const HandbookModal: React.FC = () => {
  const { isHandbookOpen, setHandbookOpen } = useApp();

  if (!isHandbookOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[85vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in duration-150">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#002D71]/10 flex items-center justify-center text-[#002D71]">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#1E293B]">KIET University FYP Handbook</h2>
              <p className="text-xs text-[#64748B]">Guidelines, Milestones, and Grading Rubrics for Capstone Projects</p>
            </div>
          </div>
          <button
            onClick={() => setHandbookOpen(false)}
            className="p-2 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-[#475569]">
          <div className="p-4 rounded-xl bg-[#EAF5FC] border border-[#01B0F1]/20">
            <h3 className="font-semibold text-[#002D71] flex items-center gap-2 mb-1">
              <Award className="w-4 h-4 text-[#01B0F1]" /> Capstone Progression Requirements
            </h3>
            <p className="text-xs text-[#1E293B] leading-relaxed">
              Final Year Projects (FYP) span two consecutive semesters: <strong>FYP1 (Foundation, 40 marks)</strong> and <strong>FYP2 (Implementation & Defense, 60 marks)</strong>. A minimum score of 50% in FYP1 is mandatory before the FYP Coordinator authorizes progression to FYP2.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-[#1E293B] text-base mb-3 flex items-center gap-2">
              <Scale className="w-4 h-4 text-[#FD7A12]" /> Evaluation Mark Allocation (100 Marks Total)
            </h4>
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-[#1E293B] font-semibold">
                  <tr>
                    <th className="py-2.5 px-4">Phase</th>
                    <th className="py-2.5 px-4">Evaluation Component</th>
                    <th className="py-2.5 px-4">Evaluator</th>
                    <th className="py-2.5 px-4 text-right">Max Marks</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="py-2.5 px-4 font-medium text-[#002D71]" rowSpan={3}>FYP1 (40 Marks)</td>
                    <td className="py-2.5 px-4">FYP1 Defense (Scope & Methodology)</td>
                    <td className="py-2.5 px-4">External Jury Panel</td>
                    <td className="py-2.5 px-4 text-right font-mono font-semibold">10</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4">Declaration & Literature Review</td>
                    <td className="py-2.5 px-4">Assigned Supervisor</td>
                    <td className="py-2.5 px-4 text-right font-mono font-semibold">10</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4">Internal Progress & Mid-Term Evaluation</td>
                    <td className="py-2.5 px-4">Authorized Internal Evaluator</td>
                    <td className="py-2.5 px-4 text-right font-mono font-semibold">20</td>
                  </tr>
                  <tr className="bg-slate-50/50">
                    <td className="py-2.5 px-4 font-medium text-[#002D71]" rowSpan={3}>FYP2 (60 Marks)</td>
                    <td className="py-2.5 px-4">FYP2 Declaration & Architecture</td>
                    <td className="py-2.5 px-4">Supervisor & Department</td>
                    <td className="py-2.5 px-4 text-right font-mono font-semibold">10</td>
                  </tr>
                  <tr className="bg-slate-50/50">
                    <td className="py-2.5 px-4">Internal Technical Execution</td>
                    <td className="py-2.5 px-4">Internal Evaluation Committee</td>
                    <td className="py-2.5 px-4 text-right font-mono font-semibold">30</td>
                  </tr>
                  <tr className="bg-slate-50/50">
                    <td className="py-2.5 px-4">Final Viva & External Defense</td>
                    <td className="py-2.5 px-4">External Defense Jury</td>
                    <td className="py-2.5 px-4 text-right font-mono font-semibold">20</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-[#1E293B] text-base mb-3 flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#002D71]" /> Milestone Submission & Deadlines Policy
            </h4>
            <div className="space-y-2 text-xs text-[#475569]">
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Deliverables must be submitted before 5:00 PM on the designated date through FYP360.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Submissions past the deadline are flagged as <em>Submitted Late</em> or <em>Overdue</em> and are subject to 5% mark deductions per calendar day up to a 3-day grace period.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>AI Similarity Analysis will automatically inspect submitted proposals against previous university records to maintain original scholarship.</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-[#1E293B] text-base mb-2 flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#002D71]" /> Contact & Departmental Support
            </h4>
            <p className="text-xs text-[#64748B]">
              For queries regarding supervisor allocations or committee meetings, please contact the FYP Coordinator’s Office at <code>fyp.coordinator@university.edu</code> or visit Tech Block Room 201.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <span className="text-xs text-[#64748B]">Document version: Academic Session 2024–2025 v2.1</span>
          <button
            onClick={() => setHandbookOpen(false)}
            className="px-4 py-2 text-xs font-semibold text-white bg-[#002D71] rounded-lg hover:bg-[#003B85] transition-colors"
          >
            Close Handbook
          </button>
        </div>
      </div>
    </div>
  );
};
