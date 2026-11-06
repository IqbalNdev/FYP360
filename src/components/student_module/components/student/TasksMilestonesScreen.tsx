import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  CheckSquare,
  CheckCircle2,
  Clock,
  Calendar,
  AlertCircle,
  ChevronRight,
  User,
  Layers,
  ArrowRight
} from 'lucide-react';

export const TasksMilestonesScreen: React.FC = () => {
  const {
    milestones,
    setCurrentScreen,
    setActiveMilestoneId,
    setActiveTaskId,
    showToast
  } = useApp();

  const completedMilestones = milestones.filter((m) => m.status === 'completed').length;
  const pendingTasks = milestones.reduce(
    (acc, m) => acc + m.tasks.filter((t) => t.status !== 'completed').length,
    0
  );

  const handleOpenMilestone = (mId: number) => {
    setActiveMilestoneId(mId);
    setCurrentScreen('student-milestone-detail');
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16 animate-in fade-in duration-150">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="text-[11px] font-bold text-[#64748B] tracking-widest uppercase">
            PROJECT DELIVERY
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#1E293B] mt-0.5">
            Tasks & Milestones
          </h1>
          <p className="text-sm text-[#64748B]">
            Track supervisor assignments, submit deliverables, and monitor your project progress.
          </p>
        </div>

        <button
          onClick={() => {
            showToast('Loaded standard FYP assignment workflow template', 'info');
          }}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-slate-300 text-xs font-semibold rounded-lg bg-white hover:bg-slate-50 transition-colors shadow-xs"
        >
          <Layers className="w-3.5 h-3.5 text-[#002D71]" />
          <span>Sample supervisor assignments</span>
        </button>
      </div>

      {/* 4 Stat KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-[#E2E8F0] p-4 shadow-xs">
          <span className="text-xs text-[#64748B] block">Total Milestones</span>
          <span className="text-2xl font-bold font-mono text-[#1E293B] mt-1 block">
            {milestones.length}
          </span>
        </div>

        <div className="bg-white rounded-xl border border-[#E2E8F0] p-4 shadow-xs">
          <span className="text-xs text-[#64748B] block">Completed Milestones</span>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-2xl font-bold font-mono text-emerald-600">
              {completedMilestones}
            </span>
            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl border border-[#E2E8F0] p-4 shadow-xs">
          <span className="text-xs text-[#64748B] block">Pending Tasks</span>
          <span className="text-2xl font-bold font-mono text-[#FD7A12] mt-1 block">
            {pendingTasks || 6}
          </span>
        </div>

        <div className="bg-white rounded-xl border border-[#E2E8F0] p-4 shadow-xs">
          <span className="text-xs text-[#64748B] block">Upcoming Deadline</span>
          <span className="text-base font-bold text-[#1E293B] mt-1 block">Oct 22, 2026</span>
          <span className="text-[10px] text-slate-400">Milestone 4 Prototype</span>
        </div>
      </div>

      {/* Project Lifecycle Milestone Pipeline */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider">
              PROJECT LIFECYCLE
            </div>
            <h3 className="text-base font-bold text-[#1E293B]">Milestone progress</h3>
          </div>
          <div className="text-lg font-bold font-mono text-[#002D71]">25% complete</div>
        </div>

        {/* Milestone Bar */}
        <div className="pt-3 pb-4 overflow-x-auto">
          <div className="min-w-[720px] flex items-center justify-between relative">
            <div className="absolute top-4 left-6 right-6 h-0.5 bg-[#E2E8F0] z-0">
              <div className="h-full bg-[#01B0F1] w-[28%]" />
            </div>

            {milestones.map((m) => {
              const isCompleted = m.status === 'completed';
              const isOverdue = m.status === 'overdue';
              const isInProgress = m.status === 'in_progress';

              return (
                <div
                  key={m.id}
                  onClick={() => handleOpenMilestone(m.id)}
                  className="relative z-10 flex flex-col items-center group cursor-pointer"
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                      isCompleted
                        ? 'bg-[#15803D] text-white shadow-xs'
                        : isOverdue
                        ? 'bg-[#C2392F] text-white ring-4 ring-[#C2392F]/20'
                        : isInProgress
                        ? 'bg-[#01B0F1] text-white ring-4 ring-[#01B0F1]/20'
                        : 'bg-white text-slate-400 border border-slate-300'
                    }`}
                  >
                    {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : m.id}
                  </div>
                  <span className="text-xs font-semibold text-slate-800 mt-2 text-center max-w-[90px] truncate">
                    {m.shortTitle}
                  </span>
                  <span
                    className={`text-[10px] mt-0.5 capitalize ${
                      isCompleted
                        ? 'text-emerald-700 font-medium'
                        : isOverdue
                        ? 'text-[#C2392F] font-bold'
                        : isInProgress
                        ? 'text-[#01B0F1] font-bold'
                        : 'text-slate-400'
                    }`}
                  >
                    {m.status.replace('_', ' ')}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex items-center justify-end gap-4 pt-3 border-t border-slate-100 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#15803D]" />
            <span className="text-slate-600">Completed</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#01B0F1]" />
            <span className="text-slate-600">In Progress</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#C2392F]" />
            <span className="text-slate-600">Overdue</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
            <span className="text-slate-600">Upcoming</span>
          </div>
        </div>
      </div>

      {/* 8 Milestone Cards List */}
      <div className="space-y-3.5">
        {milestones.map((milestone) => {
          const isCompleted = milestone.status === 'completed';
          const isOverdue = milestone.status === 'overdue';
          const isInProgress = milestone.status === 'in_progress';

          return (
            <div
              key={milestone.id}
              className="bg-white rounded-xl border border-[#E2E8F0] p-5 shadow-xs hover:border-[#002D71]/40 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="flex items-start gap-4">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 ${
                    isCompleted
                      ? 'bg-[#15803D] text-white'
                      : isOverdue
                      ? 'bg-[#C2392F] text-white ring-2 ring-[#C2392F]/20'
                      : isInProgress
                      ? 'bg-[#01B0F1] text-white'
                      : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : milestone.id}
                </div>

                <div>
                  <div className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">
                    MILESTONE {milestone.id}
                  </div>
                  <h4 className="text-base font-bold text-[#1E293B]">{milestone.shortTitle}</h4>
                  <p className="text-xs text-[#64748B] mt-0.5">{milestone.subtitle}</p>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 mt-2">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      Meeting: {milestone.meetingDate}
                    </span>
                    <span className="flex items-center gap-1">
                      <User className="w-3.5 h-3.5 text-slate-400" />
                      {milestone.supervisor}
                    </span>
                    <span className="flex items-center gap-1 font-semibold text-slate-700">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      Due: {milestone.dueDate}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 self-end sm:self-center">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${
                    isCompleted
                      ? 'bg-[#DCFCE7] text-[#15803D]'
                      : isOverdue
                      ? 'bg-[#FDE8E6] text-[#C2392F]'
                      : isInProgress
                      ? 'bg-[#EAF5FC] text-[#01B0F1]'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {milestone.status.replace('_', ' ')}
                </span>

                <button
                  onClick={() => handleOpenMilestone(milestone.id)}
                  className="px-3.5 py-1.5 border border-slate-300 text-slate-700 text-xs font-semibold rounded-lg hover:bg-slate-50 flex items-center gap-1 transition-colors"
                >
                  <span>View Details</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
