import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  ArrowLeft,
  CheckCircle2,
  Calendar,
  User,
  ListTodo,
  Clock,
  ChevronRight,
  AlertCircle
} from 'lucide-react';

export const MilestoneDetailScreen: React.FC = () => {
  const {
    milestones,
    activeMilestoneId,
    setCurrentScreen,
    setActiveTaskId
  } = useApp();

  const milestone = milestones.find((m) => m.id === activeMilestoneId) || milestones[0];

  const handleOpenTask = (taskId: string) => {
    setActiveTaskId(taskId);
    setCurrentScreen('student-assignment-detail');
  };

  const isCompleted = milestone.status === 'completed';

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16 animate-in fade-in duration-150">
      {/* Top Breadcrumb */}
      <div>
        <button
          onClick={() => setCurrentScreen('student-milestones')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#002D71] hover:text-[#01B0F1] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>All milestones</span>
        </button>
      </div>

      {/* Milestone Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
        <div>
          <div className="text-[11px] font-bold text-[#64748B] tracking-wider uppercase">
            MILESTONE {milestone.id} OF {milestones.length}
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#1E293B] mt-0.5">
            {milestone.shortTitle}
          </h1>
          <p className="text-sm text-[#64748B]">
            Tasks assigned during the supervisor meeting on {milestone.meetingDate.split(',')[0]}.
          </p>
        </div>

        <div>
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold capitalize ${
              isCompleted
                ? 'bg-[#DCFCE7] text-[#15803D]'
                : milestone.status === 'overdue'
                ? 'bg-[#FDE8E6] text-[#C2392F]'
                : 'bg-[#EAF5FC] text-[#01B0F1]'
            }`}
          >
            {isCompleted && <CheckCircle2 className="w-3.5 h-3.5" />}
            {milestone.status.replace('_', ' ')}
          </span>
        </div>
      </div>

      {/* 3 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-[#E2E8F0] p-4 shadow-xs flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-slate-100 text-[#002D71] flex items-center justify-center shrink-0">
            <User className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[11px] text-[#64748B] block">Assigned supervisor</span>
            <span className="text-sm font-bold text-[#1E293B] block">{milestone.supervisor}</span>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-[#E2E8F0] p-4 shadow-xs flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-slate-100 text-[#002D71] flex items-center justify-center shrink-0">
            <Calendar className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[11px] text-[#64748B] block">Meeting date</span>
            <span className="text-sm font-bold text-[#1E293B] block">{milestone.meetingDate}</span>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-[#E2E8F0] p-4 shadow-xs flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-slate-100 text-[#002D71] flex items-center justify-center shrink-0">
            <ListTodo className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[11px] text-[#64748B] block">Assigned tasks</span>
            <span className="text-sm font-bold font-mono text-[#1E293B] block">
              {milestone.tasks.length || 1}
            </span>
          </div>
        </div>
      </div>

      {/* Task List */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-[#1E293B]">Assigned Deliverables</h3>

        {milestone.tasks.length === 0 ? (
          <div className="bg-white rounded-xl border border-[#E2E8F0] p-8 text-center text-slate-500">
            No specific tasks assigned for this milestone yet. Your supervisor will assign
            deliverables following your scheduled meeting.
          </div>
        ) : (
          milestone.tasks.map((task) => {
            const taskCompleted = task.status === 'completed';
            const taskOverdue = task.status === 'overdue';
            const taskRevision = task.status === 'revision_required';

            return (
              <div
                key={task.id}
                className="bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-xs hover:border-[#002D71]/40 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 ${
                      taskCompleted
                        ? 'bg-[#15803D] text-white'
                        : taskOverdue
                        ? 'bg-[#C2392F] text-white'
                        : 'bg-amber-100 text-amber-900'
                    }`}
                  >
                    {taskCompleted ? <CheckCircle2 className="w-4 h-4" /> : '•'}
                  </div>

                  <div>
                    <span className="text-[10px] font-mono font-bold text-[#64748B] uppercase tracking-wider block">
                      {task.id}
                    </span>
                    <h4 className="text-base font-bold text-[#1E293B]">{task.title}</h4>
                    <p className="text-xs text-[#64748B] mt-0.5 max-w-xl">{task.description}</p>

                    <div className="flex items-center gap-3 mt-2 text-xs">
                      <span className="text-slate-500">
                        Deadline: <strong className="text-slate-800">{task.deadline}</strong>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-center">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${
                      taskCompleted
                        ? 'bg-[#DCFCE7] text-[#15803D]'
                        : taskOverdue
                        ? 'bg-[#FDE8E6] text-[#C2392F]'
                        : taskRevision
                        ? 'bg-[#FFF4DF] text-[#B26B00]'
                        : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {task.status.replace('_', ' ')}
                  </span>

                  <button
                    onClick={() => handleOpenTask(task.id)}
                    className="px-4 py-2 bg-slate-50 border border-slate-300 text-[#002D71] text-xs font-semibold rounded-lg hover:bg-slate-100 flex items-center gap-1.5 transition-colors"
                  >
                    <span>View Assignment</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
