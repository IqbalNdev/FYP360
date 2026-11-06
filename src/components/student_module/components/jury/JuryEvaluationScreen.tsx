import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Award,
  CheckCircle2,
  Users,
  FileText,
  Star,
  Save,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

export const JuryEvaluationScreen: React.FC = () => {
  const { evaluationItems, updateEvaluationMarks, showToast, setCurrentScreen } = useApp();

  const [score, setScore] = useState(evaluationItems[0].obtainedMarks || 8);
  const [feedback, setFeedback] = useState(evaluationItems[0].feedback || 'Clear presentation and a well-defined project scope.');
  const [criterionPresentation, setCriterionPresentation] = useState(3);
  const [criterionMethodology, setCriterionMethodology] = useState(3);
  const [criterionQnA, setCriterionQnA] = useState(2);

  const handleSaveJuryScore = (e: React.FormEvent) => {
    e.preventDefault();
    const computed = criterionPresentation + criterionMethodology + criterionQnA;
    updateEvaluationMarks(0, computed, feedback);
    showToast(`Defense Evaluation Score recorded: ${computed} / 10 marks`, 'success');
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16 animate-in fade-in duration-150">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="text-[11px] font-bold text-[#64748B] tracking-widest uppercase">
            JURY EVALUATION PANEL · SEMESTER DEFENSE VIVA
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#1E293B] mt-0.5">
            Defense Evaluations
          </h1>
          <p className="text-sm text-[#64748B]">
            Award marks and provide formal academic feedback for FYP1 Defense (10 Marks).
          </p>
        </div>

        <button
          onClick={() => setCurrentScreen('student-dashboard')}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 border border-slate-300 text-xs font-semibold rounded-lg hover:bg-slate-50 transition-colors"
        >
          <span>Preview Student Portal View</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Evaluating Project Info Card */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-xs">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
          <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">
            PROJECT UNDER EVALUATION
          </span>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#DCFCE7] text-[#15803D]">
            Defense Scheduled
          </span>
        </div>

        <h3 className="text-lg font-bold text-[#1E293B]">
          AI-Powered Student Career Guidance System (FYP-CS-2025-042)
        </h3>
        <p className="text-xs text-[#64748B] mt-1">
          Lead Student: Ayesha Khan · Supervisor: Dr. Ahmed Rahman · Dept. of Computer Science
        </p>
      </div>

      {/* Evaluation Rubrics Form */}
      <form onSubmit={handleSaveJuryScore} className="bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-xs space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-[#002D71]" />
            <h3 className="text-base font-bold text-[#1E293B]">FYP1 Defense Marking Rubric</h3>
          </div>
          <div className="text-right">
            <span className="text-xs text-[#64748B]">Total Score: </span>
            <span className="text-xl font-bold font-mono text-[#002D71]">
              {criterionPresentation + criterionMethodology + criterionQnA} / 10
            </span>
          </div>
        </div>

        {/* Criterion 1 */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h4 className="text-sm font-bold text-slate-900">
              1. Project Scope & Presentation Clarity (Max 4 Marks)
            </h4>
            <p className="text-xs text-slate-500 mt-0.5">
              Articulation of problem statement, motivation, and solution architecture.
            </p>
          </div>
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4].map((pts) => (
              <button
                key={pts}
                type="button"
                onClick={() => setCriterionPresentation(pts)}
                className={`w-9 h-9 rounded-lg font-bold text-xs font-mono transition-all ${
                  criterionPresentation === pts
                    ? 'bg-[#002D71] text-white shadow-xs'
                    : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-100'
                }`}
              >
                {pts}
              </button>
            ))}
          </div>
        </div>

        {/* Criterion 2 */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h4 className="text-sm font-bold text-slate-900">
              2. Technical Feasibility & Methodology (Max 3 Marks)
            </h4>
            <p className="text-xs text-slate-500 mt-0.5">
              Appropriateness of proposed ML algorithms, architecture stacks, and data sources.
            </p>
          </div>
          <div className="flex items-center gap-2">
            {[1, 2, 3].map((pts) => (
              <button
                key={pts}
                type="button"
                onClick={() => setCriterionMethodology(pts)}
                className={`w-9 h-9 rounded-lg font-bold text-xs font-mono transition-all ${
                  criterionMethodology === pts
                    ? 'bg-[#002D71] text-white shadow-xs'
                    : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-100'
                }`}
              >
                {pts}
              </button>
            ))}
          </div>
        </div>

        {/* Criterion 3 */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h4 className="text-sm font-bold text-slate-900">
              3. Q&A Defense & Team Mastery (Max 3 Marks)
            </h4>
            <p className="text-xs text-slate-500 mt-0.5">
              Ability of the student cohort to defend trade-offs and address committee inquiries.
            </p>
          </div>
          <div className="flex items-center gap-2">
            {[1, 2, 3].map((pts) => (
              <button
                key={pts}
                type="button"
                onClick={() => setCriterionQnA(pts)}
                className={`w-9 h-9 rounded-lg font-bold text-xs font-mono transition-all ${
                  criterionQnA === pts
                    ? 'bg-[#002D71] text-white shadow-xs'
                    : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-100'
                }`}
              >
                {pts}
              </button>
            ))}
          </div>
        </div>

        {/* Feedback Textarea */}
        <div>
          <label className="text-xs font-bold text-slate-900 block mb-1">
            Formal Jury Panel Critique & Recommendations
          </label>
          <textarea
            rows={3}
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="w-full p-3 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#002D71]"
          />
        </div>

        <div className="pt-2 flex items-center justify-between border-t border-slate-100">
          <span className="text-xs text-slate-500">
            Evaluating on behalf of External Department Jury Committee
          </span>
          <button
            type="submit"
            className="px-6 py-2.5 bg-[#002D71] text-white text-xs font-semibold rounded-lg hover:bg-[#003B85] transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Submit Defense Evaluation</span>
          </button>
        </div>
      </form>
    </div>
  );
};
