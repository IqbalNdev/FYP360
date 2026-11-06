import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Layers,
  CheckCircle2,
  Lock,
  Plus,
  Send,
  Paperclip,
  Check,
  Calendar,
  Clock,
  User,
  ArrowRight,
  ShieldCheck,
  Download,
  RotateCcw
} from 'lucide-react';

export const SupervisorMilestonesScreen: React.FC = () => {
  const {
    milestones,
    assignSupervisorTask,
    unlockNextMilestone,
    showToast
  } = useApp();

  const [newTaskName, setNewTaskName] = useState('Project Proposal & Problem Definition');
  const [newDeadline, setNewDeadline] = useState('08/25/2025');
  const [referenceDoc, setReferenceDoc] = useState('Proposal_Charter_Template.pdf');
  const [showAssignModal, setShowAssignModal] = useState(false);

  const activeMilestone = milestones.find((m) => m.status === 'in_progress') || milestones[0];
  const completedCount = milestones.filter((m) => m.status === 'completed').length;
  const progressPct = Math.round((completedCount / milestones.length) * 100);

  const handleAssignTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskName.trim()) {
      showToast('Please enter task name', 'warning');
      return;
    }
    assignSupervisorTask(activeMilestone.id, newTaskName, newDeadline, referenceDoc);
    setNewTaskName('');
    setShowAssignModal(false);
  };

  const lockedMilestones = [
    {
      id: 2,
      title: 'Milestone 2: Literature & Requirements Analysis',
      desc: 'Submit exhaustive comparative literature review, IEEE/ACM state-of-the-art gap analysis, and Software Requirements Specification (SRS).',
      target: 'Estimated Target: Sep 2025',
      prereq: 'Milestone 1',
    },
    {
      id: 3,
      title: 'Milestone 3: System Design & Architecture',
      desc: 'Complete system architecture package, microservices topology, ERD database design, and OpenAPI endpoint specifications.',
      target: 'Estimated Target: Oct 2025',
      prereq: 'Milestone 2',
    },
    {
      id: 4,
      title: 'Milestone 4: Core Prototype Demonstration',
      desc: 'Demonstrate working algorithmic recommendation workflow and synthetic profiling baseline.',
      target: 'Estimated Target: Oct 2025',
      prereq: 'Milestone 3',
    },
    {
      id: 5,
      title: 'Milestone 5: Feature Completion',
      desc: 'All auxiliary modules (appointment calendar, resume parsing, feedback loops) finished.',
      target: 'Estimated Target: Nov 2025',
      prereq: 'Milestone 4',
    },
    {
      id: 6,
      title: 'Milestone 6: Testing & Validation',
      desc: 'System stress tests, model precision benchmarks, and pilot cohort usability feedback.',
      target: 'Estimated Target: Nov 2025',
      prereq: 'Milestone 5',
    },
    {
      id: 7,
      title: 'Milestone 7: Final Report & Thesis',
      desc: 'Submission of bound report, Turnitin plagiarism similarity verification, and source artifacts.',
      target: 'Estimated Target: Dec 2025',
      prereq: 'Milestone 6',
    },
    {
      id: 8,
      title: 'Milestone 8: Defense Readiness',
      desc: 'External jury evaluation schedule, presentation rehearsals, and department viva.',
      target: 'Estimated Target: Dec 2025',
      prereq: 'Milestone 7',
    },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-20 animate-in fade-in duration-150">
      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="text-[11px] font-bold text-[#64748B] tracking-widest uppercase">
            SUPERVISED FYP WORKSPACE · Batch 2021 — Cohort SE-A
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#1E293B] mt-0.5">
            Progress & Milestones
          </h1>
          <p className="text-sm text-[#64748B]">
            Automated Code Vulnerability Assessment in CI/CD & Supervised Capstones
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => showToast('Exporting Capstone Syllabus and Marking Rubric PDF', 'info')}
            className="px-3.5 py-1.5 border border-slate-300 text-slate-700 text-xs font-semibold rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Syllabus & Rubric</span>
          </button>
          <button
            onClick={() => showToast('Reset demo state to initial sequential baseline', 'info')}
            className="px-3 py-1.5 text-xs text-slate-500 hover:text-slate-700 flex items-center gap-1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo</span>
          </button>
        </div>
      </div>

      {/* ASSIGNED SUPERVISION GROUP Box */}
      <div className="p-5 rounded-xl bg-white border border-[#E2E8F0] shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">
                ASSIGNED SUPERVISION GROUP
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#DCFCE7] text-[#15803D]">
                Active · Milestone 1 In Progress
              </span>
            </div>
            <h2 className="text-lg font-bold text-[#1E293B] mt-1">
              Batch 2025 - CS-042: AI-Powered Career Guidance (Lead: Ayesha Khan)
            </h2>
          </div>

          <div className="flex items-center gap-6 text-xs border-t md:border-t-0 md:border-l border-slate-200 pt-3 md:pt-0 md:pl-6">
            <div>
              <span className="text-slate-400 block text-[11px]">Group Members</span>
              <span className="font-semibold text-slate-800">
                Bilal Ahmed, Danial Qureshi, Hira Naveed
              </span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">Academic Track</span>
              <span className="font-semibold text-[#002D71]">Software Engineering & DevSecOps</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Stat KPI Boxes */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-[#E2E8F0] p-4 shadow-xs">
          <span className="text-xs text-[#64748B] block">Current Active Milestone</span>
          <span className="text-sm font-bold text-[#002D71] mt-1 block">
            Milestone {activeMilestone.id}
          </span>
        </div>

        <div className="bg-white rounded-xl border border-[#E2E8F0] p-4 shadow-xs">
          <span className="text-xs text-[#64748B] block">Locked Milestones</span>
          <span className="text-sm font-bold font-mono text-slate-700 mt-1 block">
            {milestones.length - completedCount - 1} of 8
          </span>
        </div>

        <div className="bg-white rounded-xl border border-[#E2E8F0] p-4 shadow-xs">
          <span className="text-xs text-[#64748B] block">Assigned Tasks (M{activeMilestone.id})</span>
          <span className="text-sm font-bold font-mono text-[#FD7A12] mt-1 block">
            {activeMilestone.tasks.length} Tasks
          </span>
        </div>

        <div className="bg-white rounded-xl border border-[#E2E8F0] p-4 shadow-xs">
          <span className="text-xs text-[#64748B] block">Milestone 1 Due</span>
          <span className="text-sm font-bold text-slate-900 mt-1 block">Aug 29, 2025</span>
        </div>
      </div>

      {/* SEQUENTIAL PROGRESSION TRACK */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider">
              SEQUENTIAL PROGRESSION TRACK
            </div>
            <h3 className="text-base font-bold text-[#1E293B]">
              Milestone Progress & Unlock Lifecycle
            </h3>
          </div>
          <span className="text-xs font-bold text-[#002D71] bg-slate-100 px-3 py-1 rounded-full">
            {completedCount} / 8 Milestones Active · {progressPct || 12.5}% Progress
          </span>
        </div>

        {/* 8-Node Milestone Progression Track */}
        <div className="pt-3 pb-4 overflow-x-auto">
          <div className="min-w-[700px] flex items-center justify-between relative">
            <div className="absolute top-4 left-6 right-6 h-0.5 bg-[#E2E8F0] z-0" />

            {milestones.map((m) => {
              const isComp = m.status === 'completed';
              const isAct = m.status === 'in_progress';

              return (
                <div key={m.id} className="relative z-10 flex flex-col items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                      isComp
                        ? 'bg-[#15803D] text-white shadow-xs'
                        : isAct
                        ? 'bg-[#01B0F1] text-white ring-4 ring-[#01B0F1]/20'
                        : 'bg-slate-100 text-slate-400 border border-slate-300'
                    }`}
                  >
                    {isComp ? '✓' : m.id}
                  </div>
                  <span className="text-xs font-semibold text-slate-800 mt-2 max-w-[80px] text-center truncate">
                    {m.shortTitle}
                  </span>
                  <span className="text-[10px] text-slate-400 capitalize">
                    {isComp ? 'Completed' : isAct ? 'In Progress' : 'Locked'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex items-center justify-end gap-4 pt-3 border-t border-slate-100 text-xs">
          <span className="flex items-center gap-1.5 text-slate-600">
            <span className="w-2.5 h-2.5 rounded-full bg-[#01B0F1]" /> Active / In Progress
          </span>
          <span className="flex items-center gap-1.5 text-slate-600">
            <span className="w-2.5 h-2.5 rounded-full bg-[#15803D]" /> Completed
          </span>
          <span className="flex items-center gap-1.5 text-slate-400">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-300" /> Locked (Sequential prerequisite)
          </span>
        </div>
      </div>

      {/* CURRENT UNLOCKED MILESTONE Card */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <div className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">
              CURRENT UNLOCKED MILESTONE · Open for Task Assignment
            </div>
            <h3 className="text-xl font-bold text-[#1E293B] mt-0.5">
              Milestone 1: Proposal Foundation
            </h3>
            <p className="text-xs text-[#475569] mt-1 leading-relaxed max-w-2xl">
              Formulate FYP problem scope, establish project charter, assign deliverable duties, and
              validate feasibility requirements with the student team.
            </p>
          </div>

          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#DCFCE7] text-[#15803D] self-start sm:self-auto">
            • Active Task Setup
          </span>
        </div>

        {/* Milestone Metadata */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-slate-500 block">Scheduled Meeting</span>
            <span className="font-semibold text-slate-900 mt-0.5 block">08/18/2025</span>
          </div>
          <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-slate-500 block">Milestone 1 Due Date</span>
            <span className="font-semibold text-[#C2392F] mt-0.5 block">08/25/2025</span>
          </div>
          <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-slate-500 block">Assigned Supervisor</span>
            <span className="font-semibold text-[#002D71] mt-0.5 block">
              Dr. Ahmed Rahman (Lead Advisor)
            </span>
          </div>
        </div>

        {/* Tasks & Deliverables Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-[#1E293B] flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#002D71]" /> Tasks & Deliverables
            </h4>

            <button
              onClick={() => setShowAssignModal(true)}
              className="px-3.5 py-1.5 bg-[#002D71] text-white text-xs font-semibold rounded-lg hover:bg-[#003B85] flex items-center gap-1.5 transition-colors shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Assign Task</span>
            </button>
          </div>

          {/* Form Modal / Inline Box */}
          {showAssignModal && (
            <form
              onSubmit={handleAssignTask}
              className="p-5 rounded-xl border border-[#002D71]/40 bg-slate-50/70 space-y-4 animate-in fade-in duration-100"
            >
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                <span className="text-xs font-bold text-slate-900">
                  Assign New Task & Deliverable (Milestone 1)
                </span>
                <button
                  type="button"
                  onClick={() => setShowAssignModal(false)}
                  className="text-slate-400 hover:text-slate-700 text-xs"
                >
                  ✕
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Task Name *
                  </label>
                  <input
                    type="text"
                    value={newTaskName}
                    onChange={(e) => setNewTaskName(e.target.value)}
                    placeholder="e.g. Project Proposal & Problem Definition"
                    className="w-full px-3 py-1.5 text-xs bg-white rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-[#002D71]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Deadline *</label>
                  <input
                    type="text"
                    value={newDeadline}
                    onChange={(e) => setNewDeadline(e.target.value)}
                    placeholder="08/25/2025"
                    className="w-full px-3 py-1.5 text-xs bg-white rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-[#002D71]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Attach Reference Document for Students (Optional)
                </label>
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 bg-white border border-slate-200 rounded text-xs text-slate-700 font-mono">
                    {referenceDoc}
                  </span>
                  <button
                    type="button"
                    onClick={() => showToast('Choose reference document', 'info')}
                    className="text-xs font-semibold text-[#002D71] hover:underline"
                  >
                    Choose Document
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-200">
                <span className="text-[11px] text-slate-500">
                  Assigning to: <strong>Batch 2025 - CS-042</strong>
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setShowAssignModal(false)}
                    className="px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-200 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 bg-[#002D71] text-white text-xs font-semibold rounded-lg hover:bg-[#003B85]"
                  >
                    Assign Task
                  </button>
                </div>
              </div>
            </form>
          )}

          {/* Action Row */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-100">
            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  showToast('Reminder sent to group via email and student notification bell', 'success')
                }
                className="px-3 py-1.5 border border-slate-300 text-slate-700 text-xs font-semibold rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send Reminder to Group</span>
              </button>

              <button
                onClick={() => showToast('Opening attachments repository', 'info')}
                className="px-3 py-1.5 border border-slate-300 text-slate-700 text-xs font-semibold rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-1.5"
              >
                <Paperclip className="w-3.5 h-3.5" />
                <span>Manage Attachments</span>
              </button>
            </div>

            <button
              onClick={() => unlockNextMilestone(1)}
              className="px-5 py-2 bg-[#15803D] text-white text-xs font-semibold rounded-lg hover:bg-emerald-700 transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Mark Milestone 1 as Completed & Unlock Milestone 2</span>
            </button>
          </div>
        </div>
      </div>

      {/* Locked Milestones List (Page 21 lower half) */}
      <div className="space-y-3 pt-2">
        {lockedMilestones.map((m) => (
          <div
            key={m.id}
            className="p-5 rounded-xl border border-slate-200 bg-slate-50/70 text-slate-600 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center shrink-0 mt-0.5">
                <Lock className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    MILESTONE {m.id} (LOCKED)
                  </span>
                  <span className="text-[11px] text-slate-400">
                    · Unlocks upon {m.prereq} Completion
                  </span>
                </div>
                <h4 className="text-sm font-bold text-slate-800 mt-0.5">{m.title}</h4>
                <p className="text-xs text-slate-500 mt-1 max-w-2xl">{m.desc}</p>
                <div className="text-[11px] text-slate-400 mt-1.5">{m.target}</div>
              </div>
            </div>

            <div className="shrink-0 self-end sm:self-center">
              <span className="px-3 py-1 bg-slate-200 text-slate-600 text-xs font-semibold rounded-lg flex items-center gap-1.5">
                <Lock className="w-3 h-3" />
                <span>Locked</span>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
