import React from 'react';
import { SupervisedProject, ActiveView } from '../../types';

interface DashboardViewProps {
  projects: SupervisedProject[];
  setActiveView: (view: ActiveView) => void;
  onSelectProject: (projectId: string) => void;
  onRecordMeeting: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  projects,
  setActiveView,
  onSelectProject,
  onRecordMeeting,
}) => {
  return (
    <div className="max-w-[1040px] mx-auto p-10 pb-16">
      {/* Header Section */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div className="flex flex-col">
          <span className="text-xs font-bold text-[#FD7A12] uppercase tracking-widest mb-1.5">
            SPRING SEMESTER 2025 · KIET
          </span>
          <h1 className="text-4xl text-[#002D71] font-light tracking-tight leading-tight">
            Good morning, Dr. Rahman.
          </h1>
          <p className="text-[15px] text-[#475569] mt-1">
            3 submissions are waiting for your review.
          </p>
        </div>
        <div className="flex items-center">
          <button
            type="button"
            onClick={() => setActiveView('submission-review')}
            className="h-12 px-6 rounded-xl bg-[#002D71] hover:bg-[#003B8F] text-white text-sm font-medium inline-flex items-center gap-2.5 transition-colors shadow-sm cursor-pointer"
          >
            <span>Review next submission</span>
            <span className="material-symbols-outlined text-[18px]">
              arrow_forward
            </span>
          </button>
        </div>
      </header>

      {/* 4 Stat Tiles Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-7">
        {/* Tile 1 */}
        <div
          onClick={() => setActiveView('my-groups')}
          className="bg-white rounded-[20px] p-6 shadow-sm border border-[#E2E8F0] flex items-center justify-between cursor-pointer hover:shadow-md transition-shadow"
        >
          <div className="flex flex-col">
            <span className="text-[13px] font-medium text-[#475569]">
              Assigned groups
            </span>
            <span className="text-3xl font-semibold text-[#002D71] mt-1">
              4 / 5
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-[#E0F2FE] text-[#01B0F1] flex items-center justify-center">
            <span className="material-symbols-outlined text-[24px]">groups</span>
          </div>
        </div>

        {/* Tile 2 */}
        <div
          onClick={() => setActiveView('submission-review')}
          className="bg-white rounded-[20px] p-6 shadow-sm border border-[#E2E8F0] flex items-center justify-between cursor-pointer hover:shadow-md transition-shadow"
        >
          <div className="flex flex-col">
            <span className="text-[13px] font-medium text-[#475569]">
              Pending reviews
            </span>
            <span className="text-3xl font-semibold text-[#002D71] mt-1">
              3
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-[#FEF3C7] text-[#F59E0B] flex items-center justify-center">
            <span className="material-symbols-outlined text-[24px]">
              rate_review
            </span>
          </div>
        </div>

        {/* Tile 3 */}
        <div
          onClick={() => setActiveView('meetings-tasks')}
          className="bg-white rounded-[20px] p-6 shadow-sm border border-[#E2E8F0] flex items-center justify-between cursor-pointer hover:shadow-md transition-shadow"
        >
          <div className="flex flex-col">
            <span className="text-[13px] font-medium text-[#475569]">
              Overdue groups
            </span>
            <span className="text-3xl font-semibold text-[#002D71] mt-1">
              2
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-[#FEE2E2] text-[#DC2626] flex items-center justify-center">
            <span className="material-symbols-outlined text-[24px]">
              schedule
            </span>
          </div>
        </div>

        {/* Tile 4 */}
        <div
          onClick={() => setActiveView('progress-risk')}
          className="bg-white rounded-[20px] p-6 shadow-sm border border-[#E2E8F0] flex items-center justify-between cursor-pointer hover:shadow-md transition-shadow"
        >
          <div className="flex flex-col">
            <span className="text-[13px] font-medium text-[#475569]">
              At-risk groups
            </span>
            <span className="text-3xl font-semibold text-[#002D71] mt-1">
              1
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-[#FEE2E2] text-[#DC2626] flex items-center justify-center">
            <span className="material-symbols-outlined text-[24px]">
              gpp_maybe
            </span>
          </div>
        </div>
      </section>

      {/* Action queue Card */}
      <section className="bg-white rounded-[20px] p-7 shadow-sm border border-[#E2E8F0] mb-7 flex flex-col">
        <div className="flex items-center justify-between pb-4">
          <div className="flex flex-col">
            <span className="text-xs font-bold text-[#FD7A12] uppercase tracking-wider">
              PENDING ACTIONS
            </span>
            <h2 className="text-2xl font-medium text-[#002D71] mt-1">
              Action queue
            </h2>
          </div>
          <button
            type="button"
            onClick={() => setActiveView('meetings-tasks')}
            className="text-[#FD7A12] hover:text-[#EA6800] text-sm font-semibold flex items-center gap-1 cursor-pointer"
          >
            <span>View all</span>
            <span className="material-symbols-outlined text-[16px]">
              chevron_right
            </span>
          </button>
        </div>

        <div className="flex flex-col divide-y divide-[#E2E8F0]/80">
          {/* Row 1 */}
          <div
            onClick={() => setActiveView('submission-review')}
            className="py-4.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl px-4 my-1 hover:bg-[#F4F6F9] transition-colors cursor-pointer group"
          >
            <div className="flex items-start sm:items-center gap-3.5">
              <div className="w-9 h-9 rounded-lg bg-[#FEE2E2] text-[#DC2626] flex items-center justify-center shrink-0 mt-0.5 sm:mt-0">
                <span className="material-symbols-outlined text-[20px]">alarm</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[15px] font-semibold text-[#002D71] group-hover:text-[#FD7A12] transition-colors">
                  Review: Complete system architecture package
                </span>
                <span className="text-xs text-[#475569] mt-0.5">
                  Milestone 3 · Submitted by Campus Navigation AR App · 3 days ago
                </span>
              </div>
            </div>
            <div className="sm:self-center pl-12 sm:pl-0">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-[#FEE2E2] text-[#DC2626]">
                Submitted late
              </span>
            </div>
          </div>

          {/* Row 2 */}
          <div
            onClick={() => {
              onSelectProject('FYP-CS-2025-042');
              setActiveView('submission-review');
            }}
            className="py-4.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl px-4 my-1 hover:bg-[#F4F6F9] transition-colors cursor-pointer group"
          >
            <div className="flex items-start sm:items-center gap-3.5">
              <div className="w-9 h-9 rounded-lg bg-[#FEF3C7] text-[#F59E0B] flex items-center justify-center shrink-0 mt-0.5 sm:mt-0">
                <span className="material-symbols-outlined text-[20px]">
                  description
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-[15px] font-semibold text-[#002D71] group-hover:text-[#FD7A12] transition-colors">
                  Review: Literature review revision
                </span>
                <span className="text-xs text-[#475569] mt-0.5">
                  Milestone 2 · Submitted by AI-Powered Student Career Guidance System · Yesterday
                </span>
              </div>
            </div>
            <div className="sm:self-center pl-12 sm:pl-0">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-[#FEF3C7] text-[#B45309]">
                Resubmitted
              </span>
            </div>
          </div>

          {/* Row 3 */}
          <div
            onClick={() => {
              onSelectProject('FYP-CS-2025-019');
              setActiveView('progress-risk');
            }}
            className="py-4.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl px-4 my-1 hover:bg-[#F4F6F9] transition-colors cursor-pointer group"
          >
            <div className="flex items-start sm:items-center gap-3.5">
              <div className="w-9 h-9 rounded-lg bg-[#FEE2E2] text-[#DC2626] flex items-center justify-center shrink-0 mt-0.5 sm:mt-0">
                <span className="material-symbols-outlined text-[20px]">warning</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[15px] font-semibold text-[#002D71] group-hover:text-[#FD7A12] transition-colors">
                  2 missed check-ins
                </span>
                <span className="text-xs text-[#475569] mt-0.5">
                  Secure Exam Proctoring Assistant · No progress update since Oct 12
                </span>
              </div>
            </div>
            <div className="sm:self-center pl-12 sm:pl-0">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-[#FEE2E2] text-[#DC2626]">
                At risk
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Group health Card */}
      <section className="bg-white rounded-[20px] p-7 shadow-sm border border-[#E2E8F0] mb-7 flex flex-col">
        <div className="flex flex-col mb-4">
          <span className="text-xs font-bold text-[#FD7A12] uppercase tracking-wider">
            SUPERVISED PROJECTS
          </span>
          <h2 className="text-2xl font-medium text-[#002D71] mt-1">Group health</h2>
        </div>
        <div className="flex flex-col gap-2">
          {projects.map((project) => (
            <div
              key={project.id}
              onClick={() => {
                onSelectProject(project.id);
                setActiveView('group-details');
              }}
              className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-4 px-4 rounded-xl bg-slate-50 hover:bg-[#F1F5F9] transition-colors cursor-pointer group"
            >
              <div className="md:w-5/12 min-w-0">
                <span className="text-[15px] font-medium text-[#002D71] group-hover:text-[#FD7A12] transition-colors truncate block">
                  {project.name}
                </span>
              </div>
              <div className="flex items-center gap-4 flex-1 max-w-sm">
                <div className="w-full bg-[#E2E8F0] h-2.5 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      project.healthStatus === 'Healthy'
                        ? 'bg-[#16A34A]'
                        : project.healthStatus === 'Watch'
                        ? 'bg-[#F59E0B]'
                        : 'bg-[#DC2626]'
                    }`}
                    style={{ width: `${project.healthScore}%` }}
                  />
                </div>
                <span className="text-sm text-[#002D71] font-medium w-9 text-right">
                  {project.healthScore}%
                </span>
              </div>
              <div className="flex justify-end md:w-28">
                <span
                  className={`inline-flex items-center justify-center px-3.5 py-1 rounded-full text-xs font-semibold ${
                    project.healthStatus === 'Healthy'
                      ? 'bg-[#DCFCE7] text-[#16A34A]'
                      : project.healthStatus === 'Watch'
                      ? 'bg-[#FEF3C7] text-[#B45309]'
                      : 'bg-[#FEE2E2] text-[#DC2626]'
                  }`}
                >
                  {project.healthStatus}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Two Cards Side-by-Side Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Card: KIET Navy Next Meeting */}
        <div className="bg-[#002D71] rounded-[20px] p-7 text-white shadow-sm flex flex-col justify-between relative overflow-hidden border border-[#003B8F]/50">
          <div className="absolute -right-8 -top-8 w-40 h-40 rounded-full bg-[#01B0F1]/15 blur-2xl pointer-events-none" />
          <div className="relative z-10 flex flex-col">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-widest text-[#01B0F1] font-bold">
                NEXT MEETING
              </span>
              <span className="w-8 h-8 rounded-lg bg-white/10 text-white flex items-center justify-center">
                <span className="material-symbols-outlined text-[18px]">
                  calendar_month
                </span>
              </span>
            </div>
            <h3 className="text-2xl text-white font-semibold mt-3">
              Core Prototype check-in
            </h3>
            <div className="flex items-center gap-2 text-sm text-slate-200 mt-2">
              <span className="material-symbols-outlined text-[18px]">
                schedule
              </span>
              <span>Oct 22, 2026 · 10:00 AM</span>
            </div>
            <div className="mt-4">
              <span className="inline-flex items-center px-3 py-1 rounded-md bg-white/10 text-white text-xs font-medium">
                Campus Navigation AR App
              </span>
            </div>
          </div>
          <div className="relative z-10 mt-8 pt-2">
            <button
              type="button"
              onClick={onRecordMeeting}
              className="px-5 py-2.5 rounded-xl bg-white text-[#002D71] hover:bg-[#F4F6F9] text-sm font-semibold inline-flex items-center gap-2 shadow transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px] text-[#FD7A12]">
                videocam
              </span>
              <span>Record meeting</span>
            </button>
          </div>
        </div>

        {/* Right Card: Supervision Capacity */}
        <div className="bg-white rounded-[20px] p-7 shadow-sm border border-[#E2E8F0] flex flex-col justify-between">
          <div className="flex flex-col">
            <span className="text-xs text-[#FD7A12] uppercase tracking-wider font-bold">
              CAPACITY STATUS
            </span>
            <h3 className="text-lg text-[#002D71] font-semibold mt-1">
              SUPERVISION CAPACITY
            </h3>
            <span className="text-3xl text-[#002D71] font-semibold mt-3">
              4 of 5 groups
            </span>
            {/* Segmented Bar (5 segments: 4 active KIET cyan, 1 open slot) */}
            <div className="grid grid-cols-5 gap-2 mt-5">
              <div className="h-3 rounded-full bg-[#01B0F1]" />
              <div className="h-3 rounded-full bg-[#01B0F1]" />
              <div className="h-3 rounded-full bg-[#01B0F1]" />
              <div className="h-3 rounded-full bg-[#01B0F1]" />
              <div className="h-3 rounded-full bg-[#E2E8F0]" />
            </div>
          </div>
          <div className="mt-6 pt-4 flex items-center gap-2 bg-[#E0F2FE]/50 border border-[#01B0F1]/20 rounded-xl px-4 py-3">
            <span className="material-symbols-outlined text-[#01B0F1] text-[20px] shrink-0">
              info
            </span>
            <p className="text-xs text-[#475569] leading-snug">
              80% supervisory load · 1 available student group slot remaining for Fall/Spring cycle
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
