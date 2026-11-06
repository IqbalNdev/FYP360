import React, { useState } from 'react';
import { ActiveView } from '../../types';

interface AssignTaskViewProps {
  setActiveView: (view: ActiveView) => void;
  onTaskAssigned?: (taskData: any) => void;
}

export const AssignTaskView: React.FC<AssignTaskViewProps> = ({
  setActiveView,
  onTaskAssigned,
}) => {
  const [taskTitle, setTaskTitle] = useState(
    'Complete System Architecture & DB Design Package'
  );
  const [taskDescription, setTaskDescription] = useState(
    'Prepare comprehensive system architecture diagrams, database relational schema, and API route specifications matching the approved proposal scope.'
  );
  const [instructions, setInstructions] = useState(
    'Submit deliverables as clean PDF exports along with verified ERD diagrams adhering to the departmental format.'
  );
  const [linkedMeeting, setLinkedMeeting] = useState(
    'Oct 1, 2026, 10:00 AM — Architecture Review'
  );
  const [submissionDate, setSubmissionDate] = useState('Oct 17, 2026');
  const [submissionTime, setSubmissionTime] = useState('05:00 PM');
  const [deliverables, setDeliverables] = useState<string[]>([
    'Architecture document PDF',
    'Data flow diagram',
  ]);
  const [newDeliverableInput, setNewDeliverableInput] = useState('');
  const [isAddingDeliverable, setIsAddingDeliverable] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleAddDeliverable = () => {
    if (newDeliverableInput.trim()) {
      setDeliverables([...deliverables, newDeliverableInput.trim()]);
      setNewDeliverableInput('');
      setIsAddingDeliverable(false);
    }
  };

  const handleRemoveDeliverable = (index: number) => {
    setDeliverables(deliverables.filter((_, i) => i !== index));
  };

  const handleSubmit = (isDraft = false) => {
    setIsSubmitted(true);
    if (onTaskAssigned) {
      onTaskAssigned({
        title: taskTitle,
        description: taskDescription,
        instructions,
        deliverables,
        date: submissionDate,
        time: submissionTime,
        isDraft,
      });
    }
    setTimeout(() => {
      setActiveView('meetings-tasks');
    }, 900);
  };

  return (
    <div className="w-full max-w-[940px] mx-auto p-10 pb-16 flex flex-col gap-6">
      {/* Top Context & Header Section */}
      <section className="flex flex-col">
        <button
          type="button"
          onClick={() => setActiveView('meetings-tasks')}
          className="inline-flex items-center gap-2 text-[#475569] hover:text-[#002D71] transition-colors text-sm w-fit group cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px] group-hover:-translate-x-0.5 transition-transform">
            arrow_back
          </span>
          <span>Meetings & Tasks</span>
        </button>

        <div className="mt-4 flex flex-col gap-1.5">
          <div className="flex items-center gap-2">
            <span className="text-[#FD7A12] text-xs font-bold tracking-widest uppercase">
              MILESTONE 3 · NEW TASK ASSIGNMENT
            </span>
          </div>
          <h1 className="text-4xl text-[#002D71] font-semibold tracking-tight">
            Assign task
          </h1>
          <p className="text-[#475569] text-sm">
            Tasks are officially synchronized to a recorded supervisor check-in at KIET.
          </p>
        </div>
      </section>

      {/* Card A: Task details */}
      <section className="bg-white rounded-[20px] p-6 shadow-sm border border-[#E2E8F0] flex flex-col gap-6">
        <div className="flex items-center gap-3.5">
          <div className="w-9 h-9 rounded-xl bg-[#002D71] flex items-center justify-center text-white font-bold text-[15px] shrink-0 shadow-sm">
            A
          </div>
          <div className="flex flex-col min-w-0">
            <h2 className="text-[#002D71] text-lg font-semibold">
              Task details
            </h2>
            <p className="text-[#475569] text-[13px] leading-tight mt-0.5">
              Define task objectives and instructions for the student team.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-5">
          {/* Task Title */}
          <div className="flex flex-col gap-1.5">
            <label
              className="text-[13px] font-medium text-[#002D71]"
              htmlFor="task-title"
            >
              Task Title
            </label>
            <div className="relative w-full">
              <input
                id="task-title"
                type="text"
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
                className="w-full h-[52px] px-4 rounded-xl bg-slate-50 border border-[#E2E8F0] text-[#1E293B] text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#01B0F1]/40 focus:border-[#01B0F1] transition-all"
              />
            </div>
          </div>

          {/* Task Description */}
          <div className="flex flex-col gap-1.5">
            <label
              className="text-[13px] font-medium text-[#002D71]"
              htmlFor="task-desc"
            >
              Task Description
            </label>
            <textarea
              id="task-desc"
              rows={3}
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
              className="w-full p-4 rounded-xl bg-slate-50 border border-[#E2E8F0] text-[#1E293B] text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#01B0F1]/40 focus:border-[#01B0F1] transition-all resize-none leading-relaxed"
            />
          </div>

          {/* Submission Instructions */}
          <div className="flex flex-col gap-1.5">
            <label
              className="text-[13px] font-medium text-[#002D71]"
              htmlFor="sub-instructions"
            >
              Submission Instructions
            </label>
            <textarea
              id="sub-instructions"
              rows={3}
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              className="w-full p-4 rounded-xl bg-slate-50 border border-[#E2E8F0] text-[#1E293B] text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#01B0F1]/40 focus:border-[#01B0F1] transition-all resize-none leading-relaxed"
            />
          </div>

          {/* Two Column Metadata */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Milestone (Locked) */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-medium text-[#002D71]">
                Milestone
              </label>
              <div className="h-[52px] px-4 rounded-xl bg-[#F1F5F9] flex items-center justify-between text-[#475569] select-none cursor-not-allowed border border-[#E2E8F0]">
                <span className="text-sm text-[#002D71] font-medium truncate">
                  Milestone 3: System Design
                </span>
                <div className="flex items-center gap-1 text-[#475569] shrink-0 bg-[#E2E8F0] px-2 py-0.5 rounded-md">
                  <span className="material-symbols-outlined text-[16px]">
                    lock
                  </span>
                  <span className="text-[11px] uppercase tracking-wider font-semibold">
                    Locked
                  </span>
                </div>
              </div>
            </div>

            {/* Linked Meeting */}
            <div className="flex flex-col gap-1.5">
              <label
                className="text-[13px] font-medium text-[#002D71]"
                htmlFor="linked-meeting"
              >
                Linked Meeting
              </label>
              <div className="relative w-full">
                <select
                  id="linked-meeting"
                  value={linkedMeeting}
                  onChange={(e) => setLinkedMeeting(e.target.value)}
                  className="w-full h-[52px] pl-4 pr-10 rounded-xl bg-slate-50 text-[#1E293B] text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#01B0F1]/40 focus:border-[#01B0F1] appearance-none cursor-pointer transition-all border border-[#E2E8F0]"
                >
                  <option>Oct 1, 2026, 10:00 AM — Architecture Review</option>
                  <option>Sep 24, 2026, 02:00 PM — Proposal Clarification</option>
                  <option>Sep 18, 2026, 11:30 AM — Kickoff Protocol</option>
                </select>
                <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-[#475569]">
                  <span className="material-symbols-outlined text-[20px]">
                    expand_more
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Card B: Required deliverables */}
      <section className="bg-white rounded-[20px] p-6 shadow-sm border border-[#E2E8F0] flex flex-col gap-6">
        <div className="flex items-center gap-3.5">
          <div className="w-9 h-9 rounded-xl bg-[#002D71] flex items-center justify-center text-white font-bold text-[15px] shrink-0 shadow-sm">
            B
          </div>
          <div className="flex flex-col min-w-0">
            <h2 className="text-[#002D71] text-lg font-semibold">
              Required deliverables
            </h2>
            <p className="text-[#475569] text-[13px] leading-tight mt-0.5">
              Specify mandatory assets students must submit for this task.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          {deliverables.map((item, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#01B0F1]">
                  <span className="material-symbols-outlined text-[18px]">
                    {index === 0 ? 'description' : 'schema'}
                  </span>
                </div>
                <input
                  type="text"
                  value={item}
                  onChange={(e) => {
                    const updated = [...deliverables];
                    updated[index] = e.target.value;
                    setDeliverables(updated);
                  }}
                  className="w-full h-[52px] pl-10 pr-4 rounded-xl bg-slate-50 text-[#1E293B] text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#01B0F1]/40 focus:border-[#01B0F1] transition-all border border-[#E2E8F0]"
                />
              </div>
              <button
                type="button"
                aria-label={`Remove ${item}`}
                onClick={() => handleRemoveDeliverable(index)}
                className="w-[52px] h-[52px] rounded-xl flex items-center justify-center text-[#475569] hover:text-[#DC2626] hover:bg-[#FEE2E2] transition-colors shrink-0 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">
                  delete
                </span>
              </button>
            </div>
          ))}

          {/* Add Deliverable Row */}
          {isAddingDeliverable ? (
            <div className="flex items-center gap-3 animate-in fade-in duration-150">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#FD7A12]">
                  <span className="material-symbols-outlined text-[18px]">
                    attach_file
                  </span>
                </div>
                <input
                  type="text"
                  autoFocus
                  placeholder="e.g. Test validation matrix, ERD specification"
                  value={newDeliverableInput}
                  onChange={(e) => setNewDeliverableInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleAddDeliverable();
                    if (e.key === 'Escape') setIsAddingDeliverable(false);
                  }}
                  className="w-full h-[52px] pl-10 pr-4 rounded-xl bg-white text-[#1E293B] text-sm focus:outline-none focus:ring-2 focus:ring-[#FD7A12]/40 border border-[#FD7A12]"
                />
              </div>
              <button
                type="button"
                onClick={handleAddDeliverable}
                className="h-[52px] px-5 rounded-xl bg-[#FD7A12] hover:bg-[#EA6800] text-white text-xs font-semibold cursor-pointer"
              >
                Add
              </button>
              <button
                type="button"
                onClick={() => setIsAddingDeliverable(false)}
                className="h-[52px] px-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#475569] text-xs cursor-pointer"
              >
                Cancel
              </button>
            </div>
          ) : (
            <div>
              <button
                type="button"
                onClick={() => setIsAddingDeliverable(true)}
                className="inline-flex items-center gap-1.5 text-[#FD7A12] hover:text-[#EA6800] text-xs font-semibold px-2 py-1.5 rounded-lg hover:bg-[#FFF4EB] transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">
                  add_circle
                </span>
                <span>+ Add deliverable</span>
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Card C: Deadline */}
      <section className="bg-white rounded-[20px] p-6 shadow-sm border border-[#E2E8F0] flex flex-col gap-6">
        <div className="flex items-center gap-3.5">
          <div className="w-9 h-9 rounded-xl bg-[#002D71] flex items-center justify-center text-white font-bold text-[15px] shrink-0 shadow-sm">
            C
          </div>
          <div className="flex flex-col min-w-0">
            <h2 className="text-[#002D71] text-lg font-semibold">Deadline</h2>
            <p className="text-[#475569] text-[13px] leading-tight mt-0.5">
              Set the submission cutoff date and time for group compliance.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Submission Date Picker */}
          <div className="flex flex-col gap-1.5">
            <label
              className="text-[13px] font-medium text-[#002D71]"
              htmlFor="sub-date"
            >
              Submission Date
            </label>
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#475569]">
                <span className="material-symbols-outlined text-[20px]">
                  calendar_today
                </span>
              </div>
              <input
                id="sub-date"
                type="text"
                value={submissionDate}
                onChange={(e) => setSubmissionDate(e.target.value)}
                className="w-full h-[52px] pl-11 pr-4 rounded-xl bg-slate-50 text-[#1E293B] text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#01B0F1]/40 focus:border-[#01B0F1] transition-all border border-[#E2E8F0]"
              />
            </div>
          </div>

          {/* Submission Time Picker */}
          <div className="flex flex-col gap-1.5">
            <label
              className="text-[13px] font-medium text-[#002D71]"
              htmlFor="sub-time"
            >
              Submission Time
            </label>
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#475569]">
                <span className="material-symbols-outlined text-[20px]">
                  schedule
                </span>
              </div>
              <input
                id="sub-time"
                type="text"
                value={submissionTime}
                onChange={(e) => setSubmissionTime(e.target.value)}
                className="w-full h-[52px] pl-11 pr-4 rounded-xl bg-slate-50 text-[#1E293B] text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#01B0F1]/40 focus:border-[#01B0F1] transition-all border border-[#E2E8F0]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Advisory Notice Banner */}
      <div className="w-full p-4 rounded-2xl bg-[#E0F2FE]/70 border border-[#01B0F1]/30 flex items-start gap-3.5">
        <div className="w-8 h-8 rounded-lg bg-[#01B0F1]/15 flex items-center justify-center text-[#002D71] shrink-0 mt-0.5">
          <span className="material-symbols-outlined text-[20px] text-[#01B0F1]">
            verified_user
          </span>
        </div>
        <div className="flex flex-col min-w-0 py-0.5">
          <span className="text-[11px] uppercase tracking-wider text-[#002D71] font-bold">
            KIET Institutional Advisory
          </span>
          <p className="text-[#475569] text-[13px] leading-relaxed mt-0.5">
            Institutional Notice: Assigned tasks automatically update the group&apos;s
            milestone timeline and alert all registered team members on the KIET portal.
          </p>
        </div>
      </div>

      {/* Action Buttons Bar */}
      <div className="flex items-center justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={() => handleSubmit(true)}
          className="h-12 px-6 rounded-[14px] bg-white border border-[#E2E8F0] hover:bg-slate-50 text-[#1E293B] text-sm font-semibold transition-all shadow-sm cursor-pointer"
        >
          Save as draft
        </button>
        <button
          type="button"
          onClick={() => handleSubmit(false)}
          className="h-12 px-7 rounded-[14px] bg-[#002D71] hover:bg-[#003B8F] text-white text-sm font-semibold flex items-center gap-2 shadow-sm transition-all cursor-pointer"
        >
          <span>{isSubmitted ? 'Assigning...' : 'Assign to group'}</span>
          <span className="material-symbols-outlined text-[18px]">
            arrow_forward
          </span>
        </button>
      </div>
    </div>
  );
};
