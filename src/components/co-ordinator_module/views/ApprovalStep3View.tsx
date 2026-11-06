import React, { useState } from 'react';
import { AppView, ProposalItem } from '../types';

interface ApprovalStep3ViewProps {
  onNavigate: (view: AppView) => void;
  proposal?: ProposalItem;
  onShowToast?: (message: string) => void;
}

export const ApprovalStep3View: React.FC<ApprovalStep3ViewProps> = ({ onNavigate, proposal, onShowToast }) => {
  const [milestones, setMilestones] = useState([
    {
      num: '01',
      title: 'Proposal Foundation',
      desc: 'Formal problem charter, supervisor sign-off & dataset acquisition plan',
      meeting: 'Aug 8, 2026',
      due: 'Aug 15, 2026',
    },
    {
      num: '02',
      title: 'Literature & Requirements',
      desc: 'Comprehensive literature survey, IEEE SRS specification & ethical clearance',
      meeting: 'Sep 1, 2026',
      due: 'Sep 11, 2026',
    },
    {
      num: '03',
      title: 'System Design',
      desc: 'High/Low-level architectural schema, database design & API specifications',
      meeting: 'Oct 1, 2026',
      due: 'Oct 17, 2026',
    },
    {
      num: '04',
      title: 'Core Prototype',
      desc: 'End-to-end baseline recommendation engine & foundational user authentication',
      meeting: 'Oct 13, 2026',
      due: 'Oct 22, 2026',
    },
    {
      num: '05',
      title: 'Feature Completion',
      desc: 'Full LLM career inference agent, interactive UI dashboards, and notification pipeline',
      meeting: 'Oct 27, 2026',
      due: 'Nov 6, 2026',
    },
    {
      num: '06',
      title: 'Testing & Validation',
      desc: 'Student empirical cohort evaluation, security audit, latency & load benchmarks',
      meeting: 'Nov 12, 2026',
      due: 'Nov 24, 2026',
    },
    {
      num: '07',
      title: 'Final Report',
      desc: 'Complete formatted monograph, turnitin plagiarism certificate, code artifact submission',
      meeting: 'Dec 2, 2026',
      due: 'Dec 14, 2026',
    },
    {
      num: '08',
      title: 'Defense Readiness',
      desc: 'Pre-defense committee dry-run, slide deck finalization & project poster print',
      meeting: 'Dec 20, 2026',
      due: 'Dec 28, 2026',
    },
  ]);

  const [isActivating, setIsActivating] = useState(false);
  const [isActivated, setIsActivated] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleDateChange = (index: number, field: 'meeting' | 'due', val: string) => {
    const updated = [...milestones];
    updated[index][field] = val;
    setMilestones(updated);
  };

  const handleActivate = () => {
    setIsActivating(true);
    setShowToast(true);

    setTimeout(() => {
      setIsActivating(false);
      setIsActivated(true);
      setTimeout(() => {
        setShowToast(false);
        onNavigate('groups-projects');
      }, 1800);
    }, 1500);
  };

  return (
    <div className="flex flex-col w-full max-w-[1040px] mx-auto pb-16 space-y-6">
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-24 right-8 bg-[#002D71] text-white px-5 py-4 rounded-xl shadow-2xl flex items-center gap-3 z-50 border border-[#FD7A12] animate-in fade-in slide-in-from-bottom-2">
          <div className="w-7 h-7 rounded-full bg-[#FD7A12] text-white flex items-center justify-center">
            <span className="material-symbols-outlined text-[16px]">done</span>
          </div>
          <div>
            <div className="font-semibold text-sm">Project FYP-CS-2025-042 Activated</div>
            <div className="text-xs text-[#CBD5E1]">Allocations registered, official records sealed. Redirecting...</div>
          </div>
        </div>
      )}

      {/* Stepper Navigation */}
      <div className="bg-white rounded-2xl shadow-sm border border-[#E2E8F0] p-5">
        <div className="flex items-center justify-between">
          {/* Step 1 */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#FD7A12] text-white flex items-center justify-center shadow-xs">
              <span className="material-symbols-outlined text-[18px]">check</span>
            </div>
            <div className="flex flex-col">
              <span className="font-eyebrow text-[#64748B] uppercase tracking-wider text-[11px] font-bold">
                STEP 1
              </span>
              <span className="font-label-lg text-[#1E293B] font-medium text-xs sm:text-sm">
                Supervisor
              </span>
            </div>
          </div>

          <div className="flex-1 mx-4 sm:mx-6 h-0.5 bg-[#FD7A12]"></div>

          {/* Step 2 */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#FD7A12] text-white flex items-center justify-center shadow-xs">
              <span className="material-symbols-outlined text-[18px]">check</span>
            </div>
            <div className="flex flex-col">
              <span className="font-eyebrow text-[#64748B] uppercase tracking-wider text-[11px] font-bold">
                STEP 2
              </span>
              <span className="font-label-lg text-[#1E293B] font-medium text-xs sm:text-sm">Jury</span>
            </div>
          </div>

          <div className="flex-1 mx-4 sm:mx-6 h-0.5 bg-[#FD7A12]"></div>

          {/* Step 3 */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#FD7A12] text-white flex items-center justify-center font-semibold text-xs ring-4 ring-[#FFF1E5] shadow-xs">
              3
            </div>
            <div className="flex flex-col">
              <span className="font-eyebrow text-[#FD7A12] uppercase tracking-wider text-[11px] font-bold">
                STEP 3 · ACTIVE
              </span>
              <span className="font-label-lg text-[#002D71] font-semibold text-xs sm:text-sm">
                Timeline &amp; confirm
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Header Banner Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-[#E2E8F0] p-6 sm:p-8 relative overflow-hidden">
        <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-[#FFF1E5]/40 pointer-events-none"></div>
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#FFF1E5] text-[#FD7A12] font-eyebrow text-[11px] uppercase tracking-wider font-bold mb-3 border border-[#FD7A12]/20">
            <span className="material-symbols-outlined text-[14px]">tune</span>
            APPROVAL · STEP 3 OF 3
          </div>
          <h1 className="font-headline-lg text-[#002D71] font-light tracking-tight text-[32px] sm:text-[36px] leading-[44px]">
            Timeline and confirmation
          </h1>
          <p className="font-body-lg text-[#64748B] mt-2 leading-relaxed text-sm sm:text-base">
            Review the automatically projected milestone dates, confirm committee allocations, and activate the project workspace.
          </p>
        </div>
      </div>

      {/* Allocation Summary Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-[#E2E8F0] p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 bg-[#f5f3f6]/50 -mx-6 -mt-6 p-6 rounded-t-2xl border-b border-[#E2E8F0] gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#EAF5FC] flex items-center justify-center text-[#002D71]">
              <span className="material-symbols-outlined text-[22px]">assignment_turned_in</span>
            </div>
            <div>
              <h2 className="font-headline-sm text-[#002D71] font-medium text-base">
                Allocation Summary
              </h2>
              <p className="text-xs text-[#64748B]">
                Verified academic committee distribution for FYP cycle 2024–2025
              </p>
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF1E5] text-[#FD7A12] text-xs font-semibold self-start sm:self-auto border border-[#FD7A12]/20">
            <span className="w-2 h-2 rounded-full bg-[#FD7A12] animate-pulse"></span>
            Validation Complete
          </span>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Project Scope */}
          <div className="bg-[#F4F6F9] rounded-xl p-4 flex flex-col justify-between border border-[#E2E8F0]">
            <div>
              <span className="font-eyebrow text-[#64748B] uppercase text-[11px] font-bold">
                CHOSEN PROPOSAL IDEA
              </span>
              <div className="flex items-center gap-2 mt-1">
                <h3 className="font-headline-sm text-[#002D71] font-semibold text-[15px]">
                  AI-Powered Student Career Guidance System
                </h3>
              </div>
              <div className="flex flex-wrap items-center gap-2 mt-3">
                <span className="text-xs bg-white text-[#002D71] font-mono px-2.5 py-1 rounded border border-[#E2E8F0]">
                  FYP-CS-2025-042
                </span>
                <span className="text-xs bg-[#EAF5FC] text-[#021b3c] px-2.5 py-1 rounded font-medium">
                  Artificial Intelligence &amp; EdTech
                </span>
              </div>
            </div>

            <div className="mt-4 pt-3 flex items-center justify-between text-[#64748B] text-xs bg-white/70 px-3 py-2 rounded-lg border border-[#E2E8F0]/60">
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-[#64748B]">group</span>
                Lead: <strong className="text-[#1E293B] font-semibold">Ayesha Khan</strong> (4 members)
              </span>
              <span className="font-mono text-[11px]">Session 2024–2025</span>
            </div>
          </div>

          {/* Supervisor Allocation */}
          <div className="bg-[#F4F6F9] rounded-xl p-4 flex flex-col justify-between border border-[#E2E8F0]">
            <div>
              <div className="flex items-center justify-between">
                <span className="font-eyebrow text-[#64748B] uppercase text-[11px] font-bold">
                  APPOINTED SUPERVISOR
                </span>
                <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded bg-[#FFF1E5] text-[#FD7A12] font-semibold border border-[#FD7A12]/20">
                  <span className="material-symbols-outlined text-[14px]">auto_awesome</span>
                  92% Match
                </span>
              </div>
              <div className="flex items-center gap-3 mt-3">
                <div className="w-12 h-12 rounded-full bg-[#164783] text-white flex items-center justify-center font-semibold text-sm">
                  AR
                </div>
                <div>
                  <div className="text-sm text-[#002D71] font-semibold leading-tight">
                    Dr. Ahmed Rahman
                  </div>
                  <div className="text-xs text-[#64748B] mt-0.5">
                    Department of Computer Science
                  </div>
                  <div className="text-[11px] text-[#64748B]">
                    Specialization: Natural Language Processing &amp; Knowledge Graphs
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 flex items-center gap-2 text-xs text-[#64748B] bg-white/70 px-3 py-2 rounded-lg border border-[#E2E8F0]/60">
              <span className="material-symbols-outlined text-[16px] text-[#FD7A12]">verified</span>
              <span>Supervisory workload capacity confirmed (2 of 4 slots occupied)</span>
            </div>
          </div>
        </div>

        {/* Jury Members Section */}
        <div className="bg-[#F4F6F9] rounded-xl p-4 border border-[#E2E8F0]">
          <div className="flex items-center justify-between mb-3">
            <span className="font-eyebrow text-[#64748B] uppercase text-[11px] font-bold">
              EVALUATION JURY PANEL (3 MEMBERS CONFIRMED)
            </span>
            <span className="text-xs text-[#64748B] font-medium">Defense Committee Quorum: Met</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* Jury 1 */}
            <div className="bg-white rounded-xl p-3 shadow-xs border border-[#E2E8F0] flex flex-col justify-between">
              <div className="flex items-start justify-between">
                <div className="w-8 h-8 rounded-full bg-[#EAF5FC] text-[#002D71] flex items-center justify-center font-semibold text-xs">
                  SF
                </div>
                <span className="inline-flex items-center gap-1 text-[#FD7A12] font-medium bg-[#FFF1E5] px-2 py-0.5 rounded-full text-[11px]">
                  <span className="material-symbols-outlined text-[12px]">check_circle</span>
                  Confirmed
                </span>
              </div>
              <div className="mt-2.5">
                <div className="text-xs font-semibold text-[#002D71]">Dr. Sana Farooq</div>
                <div className="text-[11px] text-[#64748B]">Dept. of Computer Science</div>
                <span className="inline-block mt-2 bg-[#F4F6F9] text-[#64748B] px-2 py-0.5 rounded text-[10px] font-medium">
                  External Examiner
                </span>
              </div>
            </div>

            {/* Jury 2 */}
            <div className="bg-white rounded-xl p-3 shadow-xs border border-[#E2E8F0] flex flex-col justify-between">
              <div className="flex items-start justify-between">
                <div className="w-8 h-8 rounded-full bg-[#EAF5FC] text-[#002D71] flex items-center justify-center font-semibold text-xs">
                  IQ
                </div>
                <span className="inline-flex items-center gap-1 text-[#FD7A12] font-medium bg-[#FFF1E5] px-2 py-0.5 rounded-full text-[11px]">
                  <span className="material-symbols-outlined text-[12px]">check_circle</span>
                  Confirmed
                </span>
              </div>
              <div className="mt-2.5">
                <div className="text-xs font-semibold text-[#002D71]">Dr. Imran Qureshi</div>
                <div className="text-[11px] text-[#64748B]">Dept. of Software Engineering</div>
                <span className="inline-block mt-2 bg-[#F4F6F9] text-[#64748B] px-2 py-0.5 rounded text-[10px] font-medium">
                  Internal Jury Member
                </span>
              </div>
            </div>

            {/* Jury 3 */}
            <div className="bg-white rounded-xl p-3 shadow-xs border border-[#E2E8F0] flex flex-col justify-between">
              <div className="flex items-start justify-between">
                <div className="w-8 h-8 rounded-full bg-[#EAF5FC] text-[#002D71] flex items-center justify-center font-semibold text-xs">
                  HA
                </div>
                <span className="inline-flex items-center gap-1 text-[#FD7A12] font-medium bg-[#FFF1E5] px-2 py-0.5 rounded-full text-[11px]">
                  <span className="material-symbols-outlined text-[12px]">check_circle</span>
                  Confirmed
                </span>
              </div>
              <div className="mt-2.5">
                <div className="text-xs font-semibold text-[#002D71]">Dr. Hira Anwar</div>
                <div className="text-[11px] text-[#64748B]">Dept. of Data Sciences</div>
                <span className="inline-block mt-2 bg-[#F4F6F9] text-[#64748B] px-2 py-0.5 rounded text-[10px] font-medium">
                  Technical Domain Reader
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Generated Timeline Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-[#E2E8F0] p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 gap-4 border-b border-[#E2E8F0]">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-headline-sm text-[#002D71] font-medium text-lg">
                Generated timeline
              </h2>
              <span className="bg-[#FFF1E5] text-[#FD7A12] px-2 py-0.5 rounded font-semibold text-[11px] border border-[#FD7A12]/20">
                Academic Template 2026-F
              </span>
            </div>
            <p className="text-xs text-[#64748B] mt-1">
              Milestone dates calculated from departmental academic calendar. You may modify scheduled meetings and deadlines.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              // reset animation
            }}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#efedf0] text-[#002D71] text-xs font-medium hover:bg-[#e3e2e5] transition-colors self-start sm:self-auto cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">restart_alt</span>
            <span>Reset to template</span>
          </button>
        </div>

        {/* Table Legend */}
        <div className="hidden md:grid grid-cols-12 gap-4 px-4 py-3 bg-[#F4F6F9] rounded-lg font-eyebrow text-[#64748B] uppercase text-[11px] font-bold my-4 tracking-wider">
          <div className="col-span-1">No.</div>
          <div className="col-span-5">Milestone &amp; Deliverables</div>
          <div className="col-span-3">Planned Meeting Date</div>
          <div className="col-span-3">Deliverable Due Date</div>
        </div>

        {/* Milestone Rows */}
        <div className="space-y-2">
          {milestones.map((m, idx) => (
            <div
              key={idx}
              className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4 p-3.5 sm:p-4 rounded-xl bg-white hover:bg-[#F4F6F9] transition-colors items-center border border-[#E2E8F0]"
            >
              <div className="md:col-span-1 flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-[#164783] text-white text-xs font-semibold flex items-center justify-center">
                  {m.num}
                </span>
                <span className="md:hidden font-eyebrow text-[#64748B] uppercase text-[11px] font-bold">
                  Milestone {idx + 1}
                </span>
              </div>

              <div className="md:col-span-5 min-w-0">
                <div className="text-sm font-semibold text-[#002D71] truncate">{m.title}</div>
                <div className="text-xs text-[#64748B] truncate mt-0.5">{m.desc}</div>
              </div>

              <div className="md:col-span-3">
                <label className="md:hidden font-eyebrow text-[#64748B] uppercase text-[10px] block mb-1">
                  Planned Meeting
                </label>
                <div className="relative flex items-center">
                  <span className="material-symbols-outlined absolute left-3 text-[#64748B] text-[18px] pointer-events-none">
                    calendar_today
                  </span>
                  <input
                    type="text"
                    value={m.meeting}
                    onChange={(e) => handleDateChange(idx, 'meeting', e.target.value)}
                    className="w-full h-10 pl-9 pr-3 rounded-lg bg-[#F4F6F9] text-xs text-[#1E293B] focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#FD7A12] border border-transparent"
                  />
                </div>
              </div>

              <div className="md:col-span-3">
                <label className="md:hidden font-eyebrow text-[#64748B] uppercase text-[10px] block mb-1">
                  Due Date
                </label>
                <div className="relative flex items-center">
                  <span className="material-symbols-outlined absolute left-3 text-[#64748B] text-[18px] pointer-events-none">
                    event_available
                  </span>
                  <input
                    type="text"
                    value={m.due}
                    onChange={(e) => handleDateChange(idx, 'due', e.target.value)}
                    className="w-full h-10 pl-9 pr-3 rounded-lg bg-[#F4F6F9] text-xs text-[#1E293B] focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#FD7A12] border border-transparent"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Advisory Banner */}
      <div className="bg-[#164783] rounded-2xl p-5 text-white shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[#FD7A12] text-[22px]">gavel</span>
          </div>
          <div>
            <div className="text-sm text-white font-semibold flex items-center gap-2">
              AI recommended. You decided.
              <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-white/10 text-[#CBD5E1] uppercase tracking-wider">
                ADVISORY
              </span>
            </div>
            <p className="text-xs text-[#7c91b7] mt-0.5">
              Formal coordinator authorization creates the active project repository, registers supervisor capacity, and notifies assigned jury members.
            </p>
          </div>
        </div>

        <div className="shrink-0 flex items-center gap-2 text-[#FD7A12] text-xs font-semibold px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
          <span className="material-symbols-outlined text-[16px]">verified_user</span>
          Coordinator Discretion Logged
        </div>
      </div>

      {/* Sticky Bottom Actions Bar */}
      <div className="sticky bottom-4 z-30 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-[#E2E8F0] p-4 flex items-center justify-between">
        <button
          type="button"
          onClick={() => onNavigate('approval-step-2')}
          className="inline-flex items-center gap-2 px-5 h-12 rounded-xl bg-[#efedf0] text-[#1E293B] text-xs font-medium hover:bg-[#e3e2e5] transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          Back
        </button>

        <div className="flex items-center gap-4">
          <span className="hidden sm:inline text-xs text-[#64748B]">
            Ready for departmental registration
          </span>
          <button
            type="button"
            disabled={isActivating || isActivated}
            onClick={handleActivate}
            className={`inline-flex items-center gap-2 px-6 h-12 rounded-xl text-white text-xs font-semibold transition-all shadow-sm cursor-pointer ${
              isActivated
                ? 'bg-[#002D71]'
                : isActivating
                ? 'bg-[#164783] opacity-80 cursor-wait'
                : 'bg-[#002D71] hover:bg-[#164783]'
            }`}
          >
            {isActivating ? (
              <>
                <span className="material-symbols-outlined text-[18px] animate-spin">
                  progress_activity
                </span>
                <span>Activating workspace...</span>
              </>
            ) : isActivated ? (
              <>
                <span className="material-symbols-outlined text-[18px]">check_circle</span>
                <span>Workspace Activated</span>
              </>
            ) : (
              <>
                <span>Approve and activate project</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApprovalStep3View;
