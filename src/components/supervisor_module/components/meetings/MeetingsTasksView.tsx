import React, { useState } from 'react';
import { SupervisedProject, MilestoneItem, ActiveView } from '../../types';

interface MeetingsTasksViewProps {
  projects: SupervisedProject[];
  selectedProject: SupervisedProject;
  onSelectProject: (projectId: string) => void;
  milestones: MilestoneItem[];
  setActiveView: (view: ActiveView) => void;
  onRecordMeeting: () => void;
}

export const MeetingsTasksView: React.FC<MeetingsTasksViewProps> = ({
  projects,
  selectedProject,
  onSelectProject,
  milestones,
  setActiveView,
  onRecordMeeting,
}) => {
  const [showAllMilestones, setShowAllMilestones] = useState(false);
  const [groupDropdownOpen, setGroupDropdownOpen] = useState(false);

  const displayedMilestones = showAllMilestones ? milestones : milestones.slice(0, 4);

  return (
    <div className="max-w-[1040px] w-full mx-auto flex flex-col gap-8 p-10 pb-16">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="flex flex-col">
          <span className="text-xs font-bold text-[#FD7A12] tracking-widest uppercase">
            PROJECT DELIVERY · KIET
          </span>
          <h1 className="text-4xl text-[#002D71] font-light tracking-tight mt-1">
            Meetings & Tasks
          </h1>
          <p className="text-sm text-[#475569] mt-1">
            Record supervisor meetings and assign milestone tasks.
          </p>
        </div>

        {/* Top Right Action: Active Group Dropdown Chip */}
        <div className="relative shrink-0">
          <button
            type="button"
            onClick={() => setGroupDropdownOpen(!groupDropdownOpen)}
            className="inline-flex items-center gap-3 px-4 py-2.5 bg-white border border-[#E2E8F0] rounded-xl shadow-sm text-left hover:bg-[#F1F5F9] transition-colors cursor-pointer"
          >
            <div className="w-7 h-7 rounded-lg bg-[#E0F2FE] flex items-center justify-center text-[#01B0F1]">
              <span className="material-symbols-outlined text-[18px]">group</span>
            </div>
            <div className="flex flex-col min-w-0 pr-1">
              <span className="text-[10px] text-[#475569] uppercase leading-none font-semibold">
                Active Group
              </span>
              <span className="text-xs font-medium text-[#002D71] truncate max-w-[260px] mt-0.5">
                {selectedProject.name}
              </span>
            </div>
            <span
              className={`material-symbols-outlined text-[20px] text-[#475569] ml-1 transition-transform duration-200 ${
                groupDropdownOpen ? 'rotate-180' : ''
              }`}
            >
              expand_more
            </span>
          </button>

          {/* Dropdown Menu items */}
          {groupDropdownOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white border border-[#E2E8F0] rounded-xl shadow-xl p-2 z-30 animate-in fade-in zoom-in-95 duration-150">
              <div className="px-3 py-2 text-[11px] font-bold text-[#475569] uppercase tracking-wider">
                Select Supervised Project
              </div>
              {projects.map((proj) => {
                const isCurrent = proj.id === selectedProject.id;
                return (
                  <button
                    key={proj.id}
                    type="button"
                    onClick={() => {
                      onSelectProject(proj.id);
                      setGroupDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2.5 rounded-lg text-sm flex items-center justify-between cursor-pointer transition-colors ${
                      isCurrent
                        ? 'bg-[#E0F2FE] text-[#002D71] font-semibold'
                        : 'hover:bg-[#F1F5F9] text-[#1E293B]'
                    }`}
                  >
                    <span className="truncate">{proj.name}</span>
                    {isCurrent && (
                      <span className="material-symbols-outlined text-[#01B0F1] text-[18px]">
                        check
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* 4 Stat Tiles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Stat 1 */}
        <div className="bg-white border border-[#E2E8F0] rounded-[20px] p-5 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-xl bg-[#E0F2FE] flex items-center justify-center text-[#002D71] shrink-0">
            <span className="material-symbols-outlined text-[24px]">
              folder_special
            </span>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-[13px] text-[#475569] leading-tight truncate">
              Total Milestones
            </span>
            <span className="text-3xl font-semibold text-[#002D71] mt-1">
              8
            </span>
          </div>
        </div>

        {/* Stat 2 */}
        <div className="bg-white border border-[#E2E8F0] rounded-[20px] p-5 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-xl bg-[#DCFCE7] flex items-center justify-center text-[#16A34A] shrink-0">
            <span className="material-symbols-outlined text-[24px]">
              check_circle
            </span>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-[13px] text-[#475569] leading-tight truncate">
              Completed
            </span>
            <span className="text-3xl font-semibold text-[#002D71] mt-1">
              2
            </span>
          </div>
        </div>

        {/* Stat 3 */}
        <div
          onClick={() => setActiveView('submission-review')}
          className="bg-white border border-[#E2E8F0] rounded-[20px] p-5 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow cursor-pointer"
        >
          <div className="w-12 h-12 rounded-xl bg-[#FEF3C7] flex items-center justify-center text-[#F59E0B] shrink-0">
            <span className="material-symbols-outlined text-[24px]">
              assignment_late
            </span>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-[13px] text-[#475569] leading-tight truncate">
              Tasks awaiting review
            </span>
            <span className="text-3xl font-semibold text-[#002D71] mt-1">
              1
            </span>
          </div>
        </div>

        {/* Stat 4 */}
        <div className="bg-white border border-[#E2E8F0] rounded-[20px] p-5 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-xl bg-[#FFF4EB] flex items-center justify-center text-[#FD7A12] shrink-0">
            <span className="material-symbols-outlined text-[24px]">event</span>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-[13px] text-[#475569] leading-tight truncate">
              Next deadline
            </span>
            <span className="text-lg text-[#002D71] mt-1.5 font-semibold truncate">
              Oct 22, 2026
            </span>
          </div>
        </div>
      </div>

      {/* Card: Project Lifecycle */}
      <div className="bg-white border border-[#E2E8F0] rounded-[20px] p-6 shadow-sm flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs font-bold uppercase text-[#475569] tracking-wider">
              Project Lifecycle
            </span>
            <h2 className="text-lg font-medium text-[#002D71] mt-0.5">
              Milestone progress
            </h2>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 bg-[#DCFCE7] rounded-full border border-[#16A34A]/20">
            <span className="w-2 h-2 rounded-full bg-[#16A34A]" />
            <span className="text-xs font-semibold text-[#16A34A]">
              25% complete
            </span>
          </div>
        </div>

        {/* Stepper Component (8 steps) */}
        <div className="overflow-x-auto pb-2 -mx-2 px-2 no-scrollbar">
          <div className="min-w-[840px] grid grid-cols-8 relative py-2">
            {/* Step 1: Completed */}
            <div className="flex flex-col items-center text-center relative group">
              <div className="absolute top-4 left-1/2 w-full h-[2px] bg-[#16A34A] z-0" />
              <div className="relative z-10 w-8 h-8 rounded-full bg-[#16A34A] text-white flex items-center justify-center shadow-sm">
                <span className="material-symbols-outlined text-[18px]">check</span>
              </div>
              <span className="text-xs text-[#002D71] mt-3 font-semibold line-clamp-1">
                Proposal Foundation
              </span>
              <span className="text-[11px] text-[#16A34A] mt-0.5 font-medium">
                Completed
              </span>
            </div>

            {/* Step 2: Completed */}
            <div className="flex flex-col items-center text-center relative group">
              <div className="absolute top-4 left-1/2 w-full h-[2px] bg-[#16A34A] z-0" />
              <div className="relative z-10 w-8 h-8 rounded-full bg-[#16A34A] text-white flex items-center justify-center shadow-sm">
                <span className="material-symbols-outlined text-[18px]">check</span>
              </div>
              <span className="text-xs text-[#002D71] mt-3 font-semibold line-clamp-1">
                Literature & Req.
              </span>
              <span className="text-[11px] text-[#16A34A] mt-0.5 font-medium">
                Completed
              </span>
            </div>

            {/* Step 3: Overdue */}
            <div className="flex flex-col items-center text-center relative group">
              <div className="absolute top-4 left-1/2 w-full h-[2px] bg-[#E2E8F0] z-0" />
              <div className="relative z-10 w-8 h-8 rounded-full bg-[#DC2626] text-white flex items-center justify-center shadow-sm text-xs font-bold">
                3
              </div>
              <span className="text-xs text-[#002D71] mt-3 font-semibold line-clamp-1">
                System Design
              </span>
              <span className="text-[11px] text-[#DC2626] mt-0.5 font-medium">
                Overdue
              </span>
            </div>

            {/* Step 4: In Progress */}
            <div className="flex flex-col items-center text-center relative group">
              <div className="absolute top-4 left-1/2 w-full h-[2px] bg-[#E2E8F0] z-0" />
              <div className="relative z-10 w-8 h-8 rounded-full bg-[#F59E0B] text-white flex items-center justify-center shadow-sm text-xs font-bold">
                4
              </div>
              <span className="text-xs text-[#002D71] mt-3 font-semibold line-clamp-1">
                Core Prototype
              </span>
              <span className="text-[11px] text-[#B45309] mt-0.5 font-medium">
                In progress
              </span>
            </div>

            {/* Step 5: Upcoming */}
            <div className="flex flex-col items-center text-center relative group">
              <div className="absolute top-4 left-1/2 w-full h-[2px] bg-[#E2E8F0] z-0" />
              <div className="relative z-10 w-8 h-8 rounded-full bg-[#E2E8F0] text-[#475569] flex items-center justify-center text-xs font-semibold">
                5
              </div>
              <span className="text-xs text-[#475569] mt-3 font-medium line-clamp-1">
                Feature Completion
              </span>
              <span className="text-[11px] text-[#475569] mt-0.5">Upcoming</span>
            </div>

            {/* Step 6: Upcoming */}
            <div className="flex flex-col items-center text-center relative group">
              <div className="absolute top-4 left-1/2 w-full h-[2px] bg-[#E2E8F0] z-0" />
              <div className="relative z-10 w-8 h-8 rounded-full bg-[#E2E8F0] text-[#475569] flex items-center justify-center text-xs font-semibold">
                6
              </div>
              <span className="text-xs text-[#475569] mt-3 font-medium line-clamp-1">
                Testing & Validation
              </span>
              <span className="text-[11px] text-[#475569] mt-0.5">Upcoming</span>
            </div>

            {/* Step 7: Upcoming */}
            <div className="flex flex-col items-center text-center relative group">
              <div className="absolute top-4 left-1/2 w-full h-[2px] bg-[#E2E8F0] z-0" />
              <div className="relative z-10 w-8 h-8 rounded-full bg-[#E2E8F0] text-[#475569] flex items-center justify-center text-xs font-semibold">
                7
              </div>
              <span className="text-xs text-[#475569] mt-3 font-medium line-clamp-1">
                Final Report
              </span>
              <span className="text-[11px] text-[#475569] mt-0.5">Upcoming</span>
            </div>

            {/* Step 8: Upcoming */}
            <div className="flex flex-col items-center text-center relative group">
              <div className="relative z-10 w-8 h-8 rounded-full bg-[#E2E8F0] text-[#475569] flex items-center justify-center text-xs font-semibold">
                8
              </div>
              <span className="text-xs text-[#475569] mt-3 font-medium line-clamp-1">
                Defense Readiness
              </span>
              <span className="text-[11px] text-[#475569] mt-0.5">Upcoming</span>
            </div>
          </div>
        </div>
      </div>

      {/* Vertical Timeline Section with Milestone Cards */}
      <div className="relative flex flex-col gap-6">
        <div className="hidden md:block absolute left-6 top-8 bottom-8 w-[2px] bg-[#E2E8F0] z-0" />

        {displayedMilestones.map((milestone) => {
          const isCompleted = milestone.status === 'completed';
          const isOverdue = milestone.status === 'overdue';
          const isInProgress = milestone.status === 'in-progress';

          return (
            <div key={milestone.id} className="relative flex items-start gap-6 group">
              {/* Stepper node circle on the vertical stem */}
              <div className="hidden md:flex relative z-10 w-12 h-12 rounded-full bg-white shadow-sm items-center justify-center shrink-0 mt-4 border border-[#E2E8F0]">
                {isCompleted ? (
                  <div className="w-8 h-8 rounded-full bg-[#DCFCE7] flex items-center justify-center text-[#16A34A]">
                    <span className="material-symbols-outlined text-[18px]">
                      check
                    </span>
                  </div>
                ) : isOverdue ? (
                  <div className="w-8 h-8 rounded-full bg-[#FEE2E2] flex items-center justify-center text-[#DC2626] font-bold text-xs">
                    {milestone.id}
                  </div>
                ) : isInProgress ? (
                  <div className="w-8 h-8 rounded-full bg-[#FEF3C7] flex items-center justify-center text-[#B45309] font-bold text-xs">
                    {milestone.id}
                  </div>
                ) : (
                  <div className="w-8 h-8 rounded-full bg-[#F1F5F9] flex items-center justify-center text-[#475569] font-medium text-xs">
                    {milestone.id}
                  </div>
                )}
              </div>

              {/* Milestone Card */}
              <div className="flex-1 bg-white border border-[#E2E8F0] rounded-[20px] p-6 shadow-sm hover:shadow-md transition-all flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase font-bold tracking-wider text-[#475569]">
                    MILESTONE {milestone.id}
                  </span>
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                      isCompleted
                        ? 'bg-[#DCFCE7] text-[#16A34A] border border-[#16A34A]/20'
                        : isOverdue
                        ? 'bg-[#FEE2E2] text-[#DC2626] border border-[#DC2626]/20'
                        : isInProgress
                        ? 'bg-[#FEF3C7] text-[#B45309] border border-[#B45309]/20'
                        : 'bg-slate-100 text-[#475569]'
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        isCompleted
                          ? 'bg-[#16A34A]'
                          : isOverdue
                          ? 'bg-[#DC2626]'
                          : isInProgress
                          ? 'bg-[#F59E0B]'
                          : 'bg-[#475569]'
                      }`}
                    />
                    {isCompleted
                      ? 'Completed'
                      : isOverdue
                      ? 'Overdue'
                      : isInProgress
                      ? 'In progress'
                      : 'Upcoming'}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-[#002D71]">
                    {milestone.title}
                  </h3>
                  <p className="text-sm text-[#475569] mt-1">
                    {milestone.description}
                  </p>
                </div>

                {/* Metadata */}
                <div className="flex flex-wrap items-center gap-6 pt-1 text-[#475569]">
                  {milestone.meetingDate && (
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[18px] text-[#01B0F1]">
                        video_camera_front
                      </span>
                      <span className="text-xs">
                        Meeting: {milestone.meetingDate}
                      </span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <span
                      className={`material-symbols-outlined text-[18px] ${
                        isOverdue ? 'text-[#DC2626]' : 'text-[#475569]'
                      }`}
                    >
                      schedule
                    </span>
                    <span
                      className={`text-xs ${
                        isOverdue ? 'text-[#DC2626] font-medium' : ''
                      }`}
                    >
                      Due: {milestone.dueDate}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      if (milestone.id === 3) {
                        setActiveView('submission-review');
                      } else {
                        setActiveView('group-details');
                      }
                    }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[14px] bg-white border border-[#E2E8F0] shadow-sm text-[#002D71] text-xs font-semibold hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    <span>Open milestone</span>
                    <span className="material-symbols-outlined text-[18px]">
                      arrow_forward
                    </span>
                  </button>

                  {/* Assign task button on Milestone 3 */}
                  {milestone.id === 3 && (
                    <button
                      type="button"
                      onClick={() => setActiveView('assign-task')}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[14px] bg-[#002D71] text-white text-xs font-semibold hover:bg-[#003B8F] transition-colors shadow-sm cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        add_task
                      </span>
                      <span>Assign task</span>
                    </button>
                  )}

                  {/* Record meeting button on Milestone 4 */}
                  {milestone.id === 4 && (
                    <button
                      type="button"
                      onClick={onRecordMeeting}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[14px] bg-[#002D71] text-white text-xs font-semibold hover:bg-[#003B8F] transition-colors shadow-sm cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        calendar_month
                      </span>
                      <span>Record meeting</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Show more toggle */}
      <div className="flex justify-center pt-2">
        <button
          type="button"
          onClick={() => setShowAllMilestones(!showAllMilestones)}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-[#475569] hover:text-[#002D71] hover:bg-white border border-transparent hover:border-[#E2E8F0] transition-all text-xs font-semibold focus:outline-none cursor-pointer"
        >
          <span>
            {showAllMilestones ? 'Show fewer milestones' : 'Show 4 more milestones'}
          </span>
          <span
            className={`material-symbols-outlined text-[18px] transition-transform ${
              showAllMilestones ? 'rotate-180' : ''
            }`}
          >
            expand_more
          </span>
        </button>
      </div>
    </div>
  );
};
