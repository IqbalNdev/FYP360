import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  BarChart3,
  CheckCircle2,
  Clock,
  AlertTriangle,
  ArrowRight,
  Layers,
  Calendar
} from 'lucide-react';

export const ProgressTrackingScreen: React.FC = () => {
  const { milestones, setCurrentScreen, setActiveMilestoneId, setActiveTaskId } = useApp();

  const handleOpenMilestone = (mId: number) => {
    setActiveMilestoneId(mId);
    setCurrentScreen('student-milestone-detail');
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16 animate-in fade-in duration-150">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="text-[11px] font-bold text-[#64748B] tracking-widest uppercase">
            PROJECT MONITORING
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#1E293B] mt-0.5">
            Progress Tracking
          </h1>
          <p className="text-sm text-[#64748B]">
            Monitor accepted milestone completion separately from submission consistency.
          </p>
        </div>

        <button
          onClick={() => setCurrentScreen('student-milestones')}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#002D71] text-white text-xs font-semibold rounded-lg hover:bg-[#003B85] transition-colors shadow-xs"
        >
          <span>View Tasks & Milestones</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* ACADEMIC PROGRESS - Milestone Completion */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-xs">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
          <div>
            <div className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider">
              ACADEMIC PROGRESS
            </div>
            <h3 className="text-base font-bold text-[#1E293B]">Milestone completion</h3>
            <p className="text-xs text-[#64748B] mt-0.5">
              Only milestones with all tasks accepted by the supervisor contribute to this
              percentage.
            </p>
          </div>
          <div className="text-2xl font-bold font-mono text-[#002D71]">25%</div>
        </div>

        {/* 8 Milestone Stepper */}
        <div className="pt-2 pb-4 overflow-x-auto">
          <div className="min-w-[640px] flex items-center justify-between relative">
            <div className="absolute top-4 left-6 right-6 h-0.5 bg-[#E2E8F0] z-0">
              <div className="h-full bg-[#01B0F1] w-[28%]" />
            </div>

            {milestones.map((m) => {
              const isCompleted = m.status === 'completed';
              const isOverdue = m.status === 'overdue';
              const isCurrent = m.id === 3;

              return (
                <div
                  key={m.id}
                  onClick={() => handleOpenMilestone(m.id)}
                  className="relative z-10 flex flex-col items-center group cursor-pointer"
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                      isCompleted
                        ? 'bg-[#15803D] text-white'
                        : isOverdue
                        ? 'bg-[#C2392F] text-white ring-4 ring-[#C2392F]/20'
                        : isCurrent
                        ? 'bg-[#01B0F1] text-white ring-4 ring-[#01B0F1]/20'
                        : 'bg-white text-slate-400 border border-slate-300'
                    }`}
                  >
                    {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : m.id}
                  </div>
                  <span
                    className={`text-xs mt-2 font-medium text-center max-w-[80px] truncate ${
                      isCurrent
                        ? 'text-[#002D71] font-bold'
                        : isOverdue
                        ? 'text-[#C2392F] font-bold'
                        : isCompleted
                        ? 'text-slate-800'
                        : 'text-slate-400'
                    }`}
                  >
                    {m.shortTitle}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* DEADLINE PERFORMANCE */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-xs">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
          <div className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider">
            DEADLINE PERFORMANCE
          </div>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#FDE8E6] text-[#C2392F]">
            2 missed or late deadlines
          </span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 mb-2">
          <div className="text-3xl font-bold font-mono text-[#002D71]">50%</div>
          <div className="text-sm font-semibold text-slate-700">On-time submission rate</div>
        </div>

        <p className="text-xs text-[#64748B] leading-relaxed">
          Late work can still increase milestone completion after supervisor acceptance, but the
          missed-deadline record remains part of your semester delivery profile.
        </p>
      </div>

      {/* CURRENT MILESTONE Card */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-slate-100 text-[#002D71] flex items-center justify-center shrink-0">
            <Layers className="w-5 h-5 text-[#002D71]" />
          </div>
          <div>
            <div className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">
              CURRENT MILESTONE
            </div>
            <div className="flex items-center gap-2 mt-0.5">
              <h3 className="text-base font-bold text-[#1E293B]">Milestone 3: System Design</h3>
              <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-[#FDE8E6] text-[#C2392F]">
                Overdue
              </span>
            </div>
            <p className="text-xs text-[#64748B] mt-0.5">
              Complete system architecture package, microservices topology, and database schemas.
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            setActiveMilestoneId(3);
            setActiveTaskId('M3-T1');
            setCurrentScreen('student-assignment-detail');
          }}
          className="px-4 py-2 bg-slate-50 border border-slate-300 text-[#002D71] text-xs font-semibold rounded-lg hover:bg-slate-100 transition-colors flex items-center gap-1.5 shrink-0 self-end sm:self-center"
        >
          <span>Open assignments</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Deadline records requiring attention */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="text-base font-bold text-[#1E293B]">
            Deadline records requiring attention
          </h3>
          <span className="text-xs text-[#64748B]">2 recorded</span>
        </div>

        <div className="space-y-3">
          {/* Record 1 */}
          <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-start gap-3">
              <Clock className="w-4 h-4 text-[#FD7A12] shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-slate-900">
                  Submit literature review and requirements
                </h4>
                <div className="text-[11px] text-slate-500 mt-0.5">
                  Milestone 2 · Deadline Sep 11, 2026, 5:00 PM
                </div>
              </div>
            </div>

            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#FFF4DF] text-[#B26B00] self-start sm:self-auto">
              Submitted late
            </span>
          </div>

          {/* Record 2 */}
          <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-4 h-4 text-[#C2392F] shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-slate-900">
                  Complete system architecture package
                </h4>
                <div className="text-[11px] text-slate-500 mt-0.5">
                  Milestone 3 · Deadline Oct 17, 2026, 5:00 PM
                </div>
              </div>
            </div>

            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#FDE8E6] text-[#C2392F] self-start sm:self-auto">
              Overdue
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
