import React, { useState } from 'react';
import { ActiveView } from '../../types';

interface SubmissionReviewViewProps {
  setActiveView: (view: ActiveView) => void;
  onPreviewDocument: (docName: string) => void;
  onDecisionSubmitted?: (decision: 'accepted' | 'revision', feedback: string) => void;
}

export const SubmissionReviewView: React.FC<SubmissionReviewViewProps> = ({
  setActiveView,
  onPreviewDocument,
  onDecisionSubmitted,
}) => {
  const [decision, setDecision] = useState<'accepted' | 'revision' | null>(null);
  const [feedback, setFeedback] = useState('');
  const [confirmed, setConfirmed] = useState(false);

  const handleConfirmDecision = () => {
    if (!decision) return;
    setConfirmed(true);
    if (onDecisionSubmitted) {
      onDecisionSubmitted(decision, feedback);
    }
  };

  return (
    <div className="w-full max-w-[940px] mx-auto p-10 pb-16 flex flex-col gap-6">
      {/* Header & Context */}
      <div className="flex flex-col gap-3">
        <button
          type="button"
          onClick={() => setActiveView('meetings-tasks')}
          className="inline-flex items-center gap-2 text-[#475569] hover:text-[#002D71] transition-colors text-sm group w-fit cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px] transition-transform group-hover:-translate-x-1">
            arrow_back
          </span>
          <span>Meetings & Tasks</span>
        </button>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#FD7A12] uppercase tracking-wider">
                MILESTONE 3 · SUBMISSION REVIEW
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#E0F2FE] text-[#002D71] text-xs font-medium border border-[#01B0F1]/20">
                <span className="material-symbols-outlined text-[14px] text-[#01B0F1]">
                  verified
                </span>
                <span>Advisory Notice</span>
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-semibold text-[#002D71] tracking-tight">
              Complete system architecture package
            </h1>
          </div>

          <div className="shrink-0">
            {confirmed ? (
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#DCFCE7] text-[#16A34A] text-xs font-semibold shadow-sm border border-[#16A34A]/30">
                <span className="material-symbols-outlined text-[16px]">
                  check_circle
                </span>
                Decision Recorded
              </span>
            ) : (
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FEF3C7] text-[#B45309] text-xs font-medium shadow-sm border border-[#F59E0B]/20">
                <span className="w-2 h-2 rounded-full bg-[#F59E0B] animate-pulse" />
                Awaiting review
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Section A: Assignment details */}
      <section className="bg-white rounded-[20px] p-6 shadow-sm border border-[#E2E8F0] flex flex-col gap-6">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#002D71] text-white flex items-center justify-center text-xs font-bold shrink-0 shadow-sm">
            A
          </div>
          <div className="flex flex-col min-w-0">
            <h2 className="text-lg font-medium text-[#002D71] leading-tight">
              Assignment details
            </h2>
            <p className="text-sm text-[#475569] mt-0.5">
              Review assignment specifications and expected deliverables.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-[#F4F6F9] rounded-xl p-4 flex flex-col justify-between gap-3 border border-[#E2E8F0]">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#E0F2FE] text-[#002D71] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[18px]">
                  person
                </span>
              </div>
              <span className="text-xs font-bold text-[#475569] uppercase">
                Assigned by
              </span>
            </div>
            <div className="text-[15px] font-semibold text-[#002D71] truncate">
              Dr. Ahmed Rahman
            </div>
          </div>

          <div className="bg-[#F4F6F9] rounded-xl p-4 flex flex-col justify-between gap-3 border border-[#E2E8F0]">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#FFF4EB] text-[#FD7A12] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[18px]">
                  calendar_today
                </span>
              </div>
              <span className="text-xs font-bold text-[#475569] uppercase">
                Meeting date
              </span>
            </div>
            <div className="text-[15px] font-semibold text-[#002D71] truncate">
              Oct 1, 2026, 10:00 AM
            </div>
          </div>

          <div className="bg-[#F4F6F9] rounded-xl p-4 flex flex-col justify-between gap-3 border border-[#E2E8F0]">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#FEE2E2] text-[#DC2626] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[18px]">
                  event_busy
                </span>
              </div>
              <span className="text-xs font-bold text-[#475569] uppercase">
                Deadline
              </span>
            </div>
            <div className="text-[15px] font-semibold text-[#002D71] truncate">
              Oct 17, 2026, 5:00 PM
            </div>
          </div>
        </div>

        <div className="bg-[#F4F6F9] rounded-xl p-4 flex flex-col gap-3 border border-[#E2E8F0]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#475569] uppercase tracking-wider">
              REQUIRED DELIVERABLES
            </span>
            <span className="text-xs text-[#01B0F1] font-semibold">
              2 specifications mapped
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
            <div className="flex items-center gap-3 bg-white rounded-lg p-3 shadow-xs border border-[#E2E8F0]">
              <span className="w-5 h-5 rounded-full bg-[#DCFCE7] text-[#16A34A] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[15px]">check</span>
              </span>
              <span className="text-sm text-[#1E293B] font-medium">
                Architecture document PDF
              </span>
            </div>
            <div className="flex items-center gap-3 bg-white rounded-lg p-3 shadow-xs border border-[#E2E8F0]">
              <span className="w-5 h-5 rounded-full bg-[#DCFCE7] text-[#16A34A] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[15px]">check</span>
              </span>
              <span className="text-sm text-[#1E293B] font-medium">
                Data flow diagram
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Section B: Student submission */}
      <section className="bg-white rounded-[20px] p-6 shadow-sm border border-[#E2E8F0] flex flex-col gap-6">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#002D71] text-white flex items-center justify-center text-xs font-bold shrink-0 shadow-sm">
            B
          </div>
          <div className="flex flex-col min-w-0">
            <h2 className="text-lg font-medium text-[#002D71] leading-tight">
              Student submission
            </h2>
            <p className="text-sm text-[#475569] mt-0.5">
              Files uploaded by the student team for this milestone task.
            </p>
          </div>
        </div>

        <div className="bg-[#F4F6F9] rounded-xl p-4 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 border border-[#E2E8F0]">
          <div className="flex items-start sm:items-center gap-3.5 min-w-0">
            <div className="w-12 h-12 rounded-xl bg-white text-[#DC2626] flex items-center justify-center shrink-0 shadow-xs border border-[#E2E8F0]">
              <span className="material-symbols-outlined text-[28px]">
                picture_as_pdf
              </span>
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-lg font-semibold text-[#002D71] truncate max-w-sm">
                  architecture-package.pdf
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#FEE2E2] text-[#DC2626] text-xs font-medium shrink-0">
                  <span className="material-symbols-outlined text-[14px]">
                    warning
                  </span>
                  <span>Submitted late</span>
                </span>
              </div>
              <p className="text-sm text-[#475569] mt-0.5 truncate">
                Submitted Oct 18, 2026, 5:40 PM by Ayesha Khan (Team Lead)
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 w-full lg:w-auto shrink-0 pt-2 lg:pt-0">
            <button
              type="button"
              onClick={() => onPreviewDocument('architecture-package.pdf')}
              className="flex-1 lg:flex-initial inline-flex items-center justify-center gap-1.5 px-4 h-11 rounded-lg bg-white border border-[#E2E8F0] hover:bg-slate-100 text-[#002D71] text-xs font-semibold transition-colors shadow-xs cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">
                visibility
              </span>
              <span>Preview</span>
            </button>
            <a
              href="#download"
              onClick={(e) => {
                e.preventDefault();
                alert('Downloading architecture-package.pdf (5.1 MB)');
              }}
              className="flex-1 lg:flex-initial inline-flex items-center justify-center gap-1.5 px-4 h-11 rounded-lg bg-white border border-[#E2E8F0] hover:bg-slate-100 text-[#002D71] text-xs font-semibold transition-colors shadow-xs cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">
                download
              </span>
              <span>Download</span>
            </a>
          </div>
        </div>

        {/* Preview Context Scrim / Verification Component */}
        <div className="relative overflow-hidden rounded-xl bg-[#002D71] text-white p-5 flex flex-col md:flex-row items-center justify-between gap-4 border border-[#003B8F]/50">
          <div className="flex items-center gap-4 z-10 min-w-0">
            <div className="w-10 h-10 rounded-lg bg-[#01B0F1]/20 text-[#01B0F1] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[22px]">
                verified_user
              </span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-xs text-white font-semibold">
                Integrity & Similarity Report
              </span>
              <span className="text-sm text-slate-200 truncate">
                Turnitin index: 4% match · High originality confirmed across 24 pages
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3 z-10 shrink-0">
            <span className="px-3 py-1 rounded-full bg-[#16A34A] text-white text-xs font-bold tracking-wider uppercase">
              CLEARED
            </span>
          </div>
          <div className="absolute -right-8 -bottom-10 w-44 h-44 rounded-full bg-[#01B0F1]/10 pointer-events-none blur-2xl" />
        </div>
      </section>

      {/* Two columns layout: Decision & Previous feedback */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Your decision */}
        <div className="lg:col-span-7 bg-white rounded-[20px] p-6 shadow-sm border border-[#E2E8F0] flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <h2 className="text-lg font-medium text-[#002D71] leading-tight">
              Your decision
            </h2>
            <p className="text-sm text-[#475569]">
              Evaluate the submission and issue an official supervisory decision.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setDecision('accepted')}
              className={`inline-flex items-center justify-center gap-2 h-12 px-4 rounded-xl text-xs font-semibold transition-all shadow-xs cursor-pointer ${
                decision === 'accepted'
                  ? 'bg-[#DCFCE7] text-[#16A34A] ring-2 ring-[#16A34A]'
                  : 'bg-[#DCFCE7]/70 hover:bg-[#DCFCE7] text-[#16A34A]'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">
                check_circle
              </span>
              <span>Accept submission</span>
            </button>

            <button
              type="button"
              onClick={() => setDecision('revision')}
              className={`inline-flex items-center justify-center gap-2 h-12 px-4 rounded-xl text-xs font-semibold transition-all shadow-xs cursor-pointer ${
                decision === 'revision'
                  ? 'bg-[#FEF3C7] text-[#B45309] ring-2 ring-[#F59E0B]'
                  : 'bg-[#FEF3C7]/70 hover:bg-[#FEF3C7] text-[#B45309]'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">
                schedule
              </span>
              <span>Request revision</span>
            </button>
          </div>

          <div className="flex flex-col gap-2">
            <label
              className="text-[13px] text-[#002D71] font-semibold"
              htmlFor="feedback-text"
            >
              Feedback to the group
            </label>
            <textarea
              id="feedback-text"
              rows={5}
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Provide specific, actionable feedback or instructions for revision..."
              className="w-full bg-[#F4F6F9] border border-[#E2E8F0] rounded-xl p-4 text-sm text-[#1E293B] placeholder:text-[#475569] focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#01B0F1]/40 focus:border-[#01B0F1] shadow-inner resize-y transition-colors"
            />
          </div>

          <div className="flex items-center gap-2.5 px-3.5 py-3 rounded-xl bg-[#FEF3C7]/40 text-[#B45309] border border-[#F59E0B]/20">
            <span className="material-symbols-outlined text-[20px] text-[#F59E0B] shrink-0">
              info
            </span>
            <span className="text-sm">
              Constructive supervisory feedback is transmitted immediately to students.
            </span>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="button"
              disabled={!decision}
              onClick={handleConfirmDecision}
              className={`inline-flex items-center gap-2 px-6 h-12 rounded-xl text-xs font-semibold transition-all shadow-md group ${
                decision
                  ? 'bg-[#002D71] hover:bg-[#003B8F] text-white cursor-pointer'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              <span>Confirm Decision</span>
              <span className="material-symbols-outlined text-[18px] transition-transform group-hover:translate-x-1">
                arrow_forward
              </span>
            </button>
          </div>
        </div>

        {/* Right Column: Previous feedback */}
        <div className="lg:col-span-5 bg-white rounded-[20px] p-6 shadow-sm border border-[#E2E8F0] flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium text-[#002D71] leading-tight">
              Previous feedback
            </h2>
            <span className="text-xs font-bold text-[#475569] uppercase tracking-wider">
              LOG HISTORY
            </span>
          </div>

          <div className="flex flex-col gap-4">
            {/* Timeline Entry 1 */}
            <div className="relative pl-6 pb-4 flex flex-col gap-1.5">
              <div className="absolute left-1.5 top-2.5 -bottom-2 w-0.5 bg-[#E2E8F0]" />
              <div className="absolute left-0 top-1.5 w-3.5 h-3.5 rounded-full bg-[#01B0F1] ring-4 ring-white" />
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-semibold text-[#002D71]">
                  Milestone 2 - Literature Review Feedback
                </span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-[#DCFCE7] text-[#16A34A] text-[11px] font-semibold">
                  Accepted
                </span>
              </div>
              <span className="text-xs text-[#475569]">
                Accepted on Sep 14, 2026
              </span>
              <blockquote className="mt-1 bg-[#F4F6F9] border border-[#E2E8F0] rounded-xl p-3.5 text-sm text-[#1E293B] italic leading-relaxed">
                “Comprehensive literature foundation with solid methodology justifications.”
              </blockquote>
            </div>

            {/* Timeline Entry 2 */}
            <div className="relative pl-6 flex flex-col gap-1.5">
              <div className="absolute left-0 top-1.5 w-3.5 h-3.5 rounded-full bg-[#01B0F1] ring-4 ring-white" />
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-semibold text-[#002D71]">
                  Milestone 1 - Proposal & Scope
                </span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-[#DCFCE7] text-[#16A34A] text-[11px] font-semibold">
                  Accepted
                </span>
              </div>
              <span className="text-xs text-[#475569]">
                Accepted on Aug 28, 2026
              </span>
              <blockquote className="mt-1 bg-[#F4F6F9] border border-[#E2E8F0] rounded-xl p-3.5 text-sm text-[#1E293B] italic leading-relaxed">
                “Clear project scope and well-defined supervisor milestones. Approved for execution.”
              </blockquote>
            </div>
          </div>

          <div className="mt-2 pt-4 bg-[#F4F6F9] rounded-xl p-3 flex items-center justify-between border border-[#E2E8F0]">
            <div className="flex items-center gap-2 text-[#475569]">
              <span className="material-symbols-outlined text-[18px] text-[#01B0F1]">
                history_edu
              </span>
              <span className="text-xs">Archival audit trail synchronized</span>
            </div>
            <span className="w-2 h-2 rounded-full bg-[#16A34A]" />
          </div>
        </div>
      </div>
    </div>
  );
};
