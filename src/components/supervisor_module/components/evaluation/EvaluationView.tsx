import React, { useState } from 'react';
import { SupervisedProject, EvaluationCriterion } from '../../types';
import { INITIAL_EVALUATION_CRITERIA } from '../../data/mockData';

interface EvaluationViewProps {
  projects: SupervisedProject[];
  selectedProject: SupervisedProject;
  onSelectProject: (projectId: string) => void;
  onSaveMarks?: (total: number, comments: string, isDraft: boolean) => void;
}

export const EvaluationView: React.FC<EvaluationViewProps> = ({
  projects,
  selectedProject,
  onSelectProject,
  onSaveMarks,
}) => {
  const [criteria, setCriteria] = useState<EvaluationCriterion[]>(
    INITIAL_EVALUATION_CRITERIA
  );
  const [comments, setComments] = useState(
    'Thorough literature review identifying pertinent ML model architectures. Requirement specifications are well-aligned with the project proposal scope. Minor improvements required in declaration formatting.'
  );
  const [groupDropdownOpen, setGroupDropdownOpen] = useState(false);
  const [submittedStatus, setSubmittedStatus] = useState<string | null>(null);

  const handleScoreChange = (id: string, value: string) => {
    const num = parseFloat(value);
    setCriteria((prev) =>
      prev.map((c) => {
        if (c.id === id) {
          const clamped = isNaN(num) ? 0 : Math.max(0, Math.min(c.maxMarks, num));
          return { ...c, awardedMarks: clamped };
        }
        return c;
      })
    );
  };

  const totalScore = criteria.reduce((sum, c) => sum + c.awardedMarks, 0);
  const formattedScore = (Math.round(totalScore * 10) / 10).toFixed(1);
  const progressPercent = Math.min(Math.round((totalScore / 10) * 100), 100);

  const handleSubmit = (isDraft: boolean) => {
    if (onSaveMarks) {
      onSaveMarks(totalScore, comments, isDraft);
    }
    setSubmittedStatus(isDraft ? 'Draft saved' : 'Marks submitted to Coordinator');
    setTimeout(() => {
      setSubmittedStatus(null);
    }, 3000);
  };

  return (
    <div className="max-w-[980px] w-full mx-auto p-10 pb-16 flex flex-col gap-6">
      {/* Top Context & Group Selection Bar */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="flex flex-col">
          <span className="text-xs font-bold text-[#FD7A12] tracking-wider uppercase mb-1">
            OFFICIAL ACADEMIC EVALUATION · KIET
          </span>
          <h1 className="text-4xl text-[#002D71] font-light tracking-tight leading-none mb-2">
            Evaluation
          </h1>
          <p className="text-sm text-[#475569]">
            Enter marks for the component assigned to the supervisor.
          </p>
        </div>

        {/* Group Selector Pill / Dropdown Container */}
        <div className="relative inline-block text-left self-start md:self-auto">
          <label className="block text-[10px] font-bold text-[#475569] uppercase tracking-wider mb-1">
            ACTIVE GROUP
          </label>
          <button
            type="button"
            onClick={() => setGroupDropdownOpen(!groupDropdownOpen)}
            className="h-[52px] bg-white border border-[#E2E8F0] rounded-xl px-4 flex items-center justify-between gap-3 shadow-sm hover:border-[#01B0F1] transition-colors min-w-[320px] cursor-pointer"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <span className="material-symbols-outlined text-[#01B0F1] text-[20px] shrink-0">
                folder_shared
              </span>
              <span className="text-xs font-semibold text-[#002D71] truncate">
                {selectedProject.name}
              </span>
            </div>
            <span
              className={`material-symbols-outlined text-[#475569] text-[20px] shrink-0 transition-transform ${
                groupDropdownOpen ? 'rotate-180' : ''
              }`}
            >
              expand_more
            </span>
          </button>

          {groupDropdownOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white border border-[#E2E8F0] rounded-xl shadow-xl p-2 z-30 animate-in fade-in zoom-in-95 duration-150">
              <div className="px-3 py-2 text-[11px] font-bold text-[#475569] uppercase tracking-wider">
                Select Supervised Project
              </div>
              {projects.map((proj) => (
                <button
                  key={proj.id}
                  type="button"
                  onClick={() => {
                    onSelectProject(proj.id);
                    setGroupDropdownOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold flex items-center justify-between cursor-pointer ${
                    proj.id === selectedProject.id
                      ? 'bg-[#E0F2FE] text-[#002D71]'
                      : 'hover:bg-slate-50 text-[#1E293B]'
                  }`}
                >
                  <span className="truncate">{proj.name}</span>
                  {proj.id === selectedProject.id && (
                    <span className="material-symbols-outlined text-[16px] text-[#01B0F1]">
                      check
                    </span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Institutional Advisory Banner */}
      <div className="bg-[#E0F2FE]/70 border border-[#01B0F1]/30 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#01B0F1]/20 flex items-center justify-center shrink-0 text-[#002D71]">
            <span className="material-symbols-outlined text-[20px] text-[#01B0F1]">
              verified_user
            </span>
          </div>
          <span className="text-sm font-medium text-[#002D71]">
            Marks stay unpublished until the Coordinator officially releases them.
          </span>
        </div>
        <div className="flex items-center self-start sm:self-auto">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#002D71] px-2.5 py-1 rounded-full bg-white/90 border border-[#01B0F1]/30">
            OFFICIAL POLICY
          </span>
        </div>
      </div>

      {/* Success / Alert Banner */}
      {submittedStatus && (
        <div className="bg-[#DCFCE7] border border-[#16A34A] rounded-xl p-3 px-4 flex items-center justify-between text-xs text-[#16A34A] font-semibold animate-in fade-in duration-200">
          <span className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">check</span>
            {submittedStatus}
          </span>
        </div>
      )}

      {/* Main Evaluation Rubric Card */}
      <div className="bg-white border border-[#E2E8F0] rounded-[20px] p-6 sm:p-8 shadow-sm flex flex-col gap-6">
        {/* Card Header with Running Score Highlight */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E2E8F0]">
          <div className="flex flex-col">
            <h2 className="text-lg font-semibold text-[#002D71] tracking-tight">
              FYP1 · Declaration & Literature Review · 10 marks
            </h2>
            <p className="text-sm text-[#475569] mt-0.5">
              Assess the student group against the assigned institutional criteria.
            </p>
          </div>

          {/* Prominent Badge Indicator */}
          <div className="bg-[#FFF4EB] border border-[#FD7A12]/30 rounded-xl px-4 py-2.5 flex items-center gap-3 self-start sm:self-auto">
            <div className="flex flex-col text-right">
              <span className="text-[10px] font-bold text-[#475569] uppercase tracking-wider">
                TOTAL SCORE
              </span>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-semibold text-[#FD7A12] leading-none">
                  {formattedScore}
                </span>
                <span className="text-xs text-[#475569]">/ 10 marks</span>
              </div>
            </div>
          </div>
        </div>

        {/* Rubric Criteria List */}
        <div className="flex flex-col divide-y divide-[#E2E8F0]">
          {criteria.map((criterion) => (
            <div
              key={criterion.id}
              className="py-4 first:pt-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="flex flex-col max-w-xl">
                <div className="flex items-center gap-2">
                  <span className="text-[15px] font-medium text-[#002D71]">
                    {criterion.title}
                  </span>
                  <span className="text-xs px-2 py-0.5 bg-slate-100 rounded text-[#475569] font-medium">
                    / {criterion.maxMarks} marks
                  </span>
                </div>
                <p className="text-sm text-[#475569] mt-1">
                  {criterion.description}
                </p>
              </div>
              <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                <input
                  type="number"
                  min="0"
                  max={criterion.maxMarks}
                  step="0.5"
                  value={criterion.awardedMarks}
                  onChange={(e) =>
                    handleScoreChange(criterion.id, e.target.value)
                  }
                  className="h-[48px] w-[104px] border border-[#E2E8F0] rounded-xl px-3 text-base font-semibold text-center text-[#002D71] bg-slate-50 focus:bg-white focus:outline-none focus:border-[#01B0F1] transition-colors"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Running Total Summary Progress Bar Box */}
        <div className="bg-[#F4F6F9] border border-[#E2E8F0] rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-2">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#01B0F1] text-[18px]">
              info
            </span>
            <span className="text-xs text-[#475569]">
              Sample criteria, configured by the Departmental FYP Coordinator
            </span>
          </div>

          <div className="flex items-center gap-4 self-end sm:self-auto min-w-[240px]">
            <div className="flex-1 flex flex-col gap-1.5">
              <div className="flex justify-between items-center text-xs text-[#475569]">
                <span>Running total</span>
                <span className="font-semibold text-[#002D71]">
                  {progressPercent}%
                </span>
              </div>
              <div className="w-full bg-[#E2E8F0] h-2 rounded-full overflow-hidden">
                <div
                  className="bg-[#002D71] h-full transition-all duration-300 rounded-full"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
            <div className="text-lg font-bold text-[#002D71] pl-2 border-l border-[#E2E8F0] whitespace-nowrap">
              <span>{formattedScore}</span>{' '}
              <span className="text-[#475569] font-normal text-xs">/ 10</span>
            </div>
          </div>
        </div>

        {/* Supervisor Comments Field */}
        <div className="flex flex-col gap-2 pt-2">
          <label
            className="text-xs font-semibold text-[#002D71]"
            htmlFor="evaluatorComments"
          >
            Supervisor Evaluator Comments
          </label>
          <textarea
            id="evaluatorComments"
            rows={4}
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            placeholder="Provide formal evaluative remarks and constructive academic feedback for the Coordinator and project records..."
            className="w-full border border-[#E2E8F0] rounded-xl p-3.5 text-sm text-[#1E293B] bg-slate-50 focus:bg-white focus:outline-none focus:border-[#01B0F1] transition-colors resize-y leading-relaxed"
          />
        </div>

        {/* Action Buttons Row */}
        <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-3 pt-4 border-t border-[#E2E8F0]">
          <button
            type="button"
            onClick={() => handleSubmit(true)}
            className="w-full sm:w-auto h-[48px] px-6 bg-white border border-[#E2E8F0] hover:bg-slate-50 text-[#1E293B] text-xs font-semibold rounded-xl transition-colors shadow-xs text-center cursor-pointer"
          >
            Save draft
          </button>
          <button
            type="button"
            onClick={() => handleSubmit(false)}
            className="w-full sm:w-auto h-[48px] px-7 bg-[#002D71] hover:bg-[#003B8F] text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors shadow-xs cursor-pointer"
          >
            <span>Submit marks</span>
            <span className="material-symbols-outlined text-[18px]">
              arrow_forward
            </span>
          </button>
        </div>
      </div>

      {/* Institutional Disclosure / Restricted Access Card */}
      <div className="bg-[#F4F6F9] border border-[#E2E8F0] rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-3.5">
          <div className="w-9 h-9 rounded-full bg-slate-200 flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[#475569] text-[20px]">
              lock
            </span>
          </div>
          <p className="text-sm text-[#475569] font-medium m-0">
            Jury defense and internal evaluation marks are securely held in the KIET Examination Repository.
          </p>
        </div>
        <div className="flex items-center self-start sm:self-auto">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#475569] px-3 py-1 bg-slate-200 rounded-full whitespace-nowrap">
            RESTRICTED ACCESS
          </span>
        </div>
      </div>
    </div>
  );
};
