import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  ArrowRight,
  Clock,
  Calendar,
  CheckCircle2,
  AlertCircle,
  FileText,
  Sparkles,
  ChevronRight,
  BookOpen,
  Layers,
  Award
} from 'lucide-react';

export const StudentDashboard: React.FC = () => {
  const {
    officialProject,
    milestones,
    setCurrentScreen,
    setActiveMilestoneId,
    setActiveTaskId,
    setHandbookOpen,
    evaluationItems,
    coordinatorConfirmedFYP1
  } = useApp();

  const totalMarksObtained = evaluationItems.reduce((acc, curr) => acc + curr.obtainedMarks, 0);

  const handleGoToOverdueTask = () => {
    setActiveMilestoneId(3);
    setActiveTaskId('M3-T1');
    setCurrentScreen('student-assignment-detail');
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12 animate-in fade-in duration-150">
      {/* Top Greeting & Alert */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="text-[11px] font-bold text-[#64748B] tracking-widest uppercase">
            SPRING SEMESTER 2025
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#1E293B] mt-1">
            Good morning, Ayesha.
          </h1>
          <p className="text-sm text-[#FD7A12] font-medium flex items-center gap-1.5 mt-1">
            <AlertCircle className="w-4 h-4 shrink-0" />
            You have 1 overdue task requiring attention.
          </p>
        </div>

        <div>
          <button
            onClick={handleGoToOverdueTask}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#002D71] text-white text-sm font-semibold hover:bg-[#003B85] shadow-xs hover:shadow-md transition-all active:scale-[0.98]"
          >
            <span>View next task</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* MY PROJECT Primary Overview Card */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-xs">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="text-xs font-bold text-[#64748B] uppercase tracking-wider">
            MY PROJECT
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#DCFCE7] text-[#15803D]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#15803D]" />
            <span>Approved</span>
          </div>
        </div>

        <div className="py-4">
          <h2
            onClick={() => setCurrentScreen('student-my-project')}
            className="text-xl sm:text-2xl font-bold text-[#1E293B] hover:text-[#002D71] cursor-pointer transition-colors"
          >
            {officialProject.title}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-4 pt-2">
            <div>
              <span className="text-xs text-[#64748B] block">Project supervisor</span>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-6 h-6 rounded-full bg-[#164783] text-white flex items-center justify-center font-bold text-[10px]">
                  DR
                </div>
                <span className="text-sm font-semibold text-[#1E293B]">
                  {officialProject.supervisor.name}
                </span>
              </div>
            </div>

            <div>
              <span className="text-xs text-[#64748B] block">Project ID</span>
              <span className="text-sm font-mono font-semibold text-[#1E293B] mt-1 block">
                {officialProject.code}
              </span>
            </div>

            <div>
              <span className="text-xs text-[#64748B] block">Current Academic Phase</span>
              <span className="text-sm font-semibold text-[#002D71] mt-1 block">
                {officialProject.phase} (Pass required for FYP2)
              </span>
            </div>

            <div>
              <span className="text-xs text-[#64748B] block">Primary Domain</span>
              <span className="text-sm font-medium text-[#1E293B] mt-1 block">
                {officialProject.specialization}
              </span>
            </div>
          </div>
        </div>

        {/* Milestone Progress Metrics */}
        <div className="mt-4 pt-4 border-t border-slate-100">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
            <div>
              <span className="text-sm font-semibold text-[#1E293B]">Project progress</span>
              <div className="text-xs text-[#64748B] mt-0.5">2 of 8 milestones completed</div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-xs text-[#64748B]">
                Deadline performance: <span className="font-semibold text-[#1E293B]">50% on time</span>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#FDE8E6] text-[#C2392F]">
                1 overdue
              </span>
              <div className="text-2xl font-bold font-mono text-[#002D71]">25%</div>
            </div>
          </div>

          {/* 8-Milestone Pipeline Stepper */}
          <div className="pt-2 overflow-x-auto">
            <div className="min-w-[640px] flex items-center justify-between relative">
              {/* Connecting Bar */}
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
                    onClick={() => {
                      setActiveMilestoneId(m.id);
                      setCurrentScreen('student-milestone-detail');
                    }}
                    className="relative z-10 flex flex-col items-center group cursor-pointer"
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                        isCompleted
                          ? 'bg-[#15803D] text-white shadow-xs'
                          : isOverdue
                          ? 'bg-[#C2392F] text-white ring-4 ring-[#C2392F]/20'
                          : isCurrent
                          ? 'bg-[#01B0F1] text-white ring-4 ring-[#01B0F1]/20'
                          : 'bg-[#F1F5F9] text-[#64748B] border border-[#CBD5E1]'
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
                          ? 'text-slate-700'
                          : 'text-[#94A3B8]'
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
      </div>

      {/* UP NEXT - Upcoming Tasks Card */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-xs">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <div className="text-xs font-bold text-[#64748B] uppercase tracking-wider">
              UP NEXT
            </div>
            <h3 className="text-lg font-bold text-[#1E293B] mt-0.5">Upcoming tasks</h3>
          </div>
          <button
            onClick={() => setCurrentScreen('student-milestones')}
            className="text-xs font-semibold text-[#002D71] hover:text-[#01B0F1] flex items-center gap-1 transition-colors"
          >
            <span>View all</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="divide-y divide-slate-100 mt-2">
          {/* Item 1: Complete system architecture package */}
          <div
            onClick={() => {
              setActiveMilestoneId(3);
              setActiveTaskId('M3-T1');
              setCurrentScreen('student-assignment-detail');
            }}
            className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/80 -mx-2 px-2 rounded-lg cursor-pointer transition-colors"
          >
            <div className="flex items-start gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#C2392F] mt-1.5 shrink-0" />
              <div>
                <h4 className="text-sm font-semibold text-[#1E293B] hover:text-[#002D71]">
                  Complete system architecture package
                </h4>
                <div className="flex items-center gap-2 text-xs text-[#C2392F] font-medium mt-0.5">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Overdue · Oct 17, 2026, 5:00 PM</span>
                </div>
              </div>
            </div>
            <div>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#FDE8E6] text-[#C2392F]">
                Overdue
              </span>
            </div>
          </div>

          {/* Item 2: Demonstrate core recommendation workflow */}
          <div
            onClick={() => {
              setActiveMilestoneId(4);
              setActiveTaskId('M4-T1');
              setCurrentScreen('student-assignment-detail');
            }}
            className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/80 -mx-2 px-2 rounded-lg cursor-pointer transition-colors"
          >
            <div className="flex items-start gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FD7A12] mt-1.5 shrink-0" />
              <div>
                <h4 className="text-sm font-semibold text-[#1E293B] hover:text-[#002D71]">
                  Demonstrate core recommendation workflow
                </h4>
                <div className="flex items-center gap-2 text-xs text-[#64748B] mt-0.5">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Due Oct 22, 2026, 5:00 PM</span>
                </div>
              </div>
            </div>
            <div>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#FFF4DF] text-[#B26B00]">
                Revision Required
              </span>
            </div>
          </div>

          {/* Item 3: Complete planned application features */}
          <div
            onClick={() => {
              setActiveMilestoneId(5);
              setActiveTaskId('M5-T1');
              setCurrentScreen('student-assignment-detail');
            }}
            className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/80 -mx-2 px-2 rounded-lg cursor-pointer transition-colors"
          >
            <div className="flex items-start gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-300 mt-1.5 shrink-0" />
              <div>
                <h4 className="text-sm font-semibold text-[#1E293B] hover:text-[#002D71]">
                  Complete planned application features
                </h4>
                <div className="flex items-center gap-2 text-xs text-[#64748B] mt-0.5">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Due Nov 6, 2026, 5:00 PM</span>
                </div>
              </div>
            </div>
            <div>
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-[#64748B]">
                Not Started
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Two Column Grid: Current Stage & Evaluation / Results */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* CURRENT STAGE Card (Primary Container Navy #164783 / #002D71) */}
        <div className="rounded-xl bg-[#002D71] text-white p-6 shadow-md relative overflow-hidden flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center text-[#01B0F1]">
                <Layers className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-bold text-[#01B0F1] uppercase tracking-wider">
                CURRENT STAGE
              </span>
            </div>

            <h3 className="text-xl font-bold mt-4">Milestone 3: System Design</h3>
            <p className="text-sm text-slate-300 mt-2 leading-relaxed">
              Prepare the solution architecture, data flow, microservices topology, and core interaction diagrams.
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
            <div>
              <span className="text-[11px] text-slate-400 block">Nearest deadline</span>
              <span className="text-xs font-semibold text-white flex items-center gap-1.5 mt-0.5">
                <Calendar className="w-3.5 h-3.5 text-[#FD7A12]" />
                Oct 17, 2026, 5:00 PM
              </span>
            </div>
            <button
              onClick={() => {
                setActiveMilestoneId(3);
                setCurrentScreen('student-milestone-detail');
              }}
              className="text-xs font-semibold text-[#01B0F1] hover:text-white flex items-center gap-1 transition-colors"
            >
              <span>Milestone detail</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* EVALUATION & RESULTS Card */}
        <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="text-xs font-bold text-[#64748B] uppercase tracking-wider">
                EVALUATION & RESULTS
              </div>
              <button
                onClick={() => setCurrentScreen('student-evaluation')}
                className="text-xs font-semibold text-[#002D71] hover:text-[#01B0F1] flex items-center gap-1 transition-colors"
              >
                <span>View results</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <h3 className="text-lg font-bold text-[#1E293B] mt-3">FYP1 Evaluation</h3>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200">
                <div className="text-[11px] text-[#64748B]">FYP1 Obtained</div>
                <div className="text-2xl font-bold font-mono text-[#002D71] mt-1">
                  {totalMarksObtained} <span className="text-sm font-normal text-[#64748B]">/ 40</span>
                </div>
                <div className="text-[10px] text-[#B26B00] font-medium mt-1">
                  {coordinatorConfirmedFYP1 ? 'Official Result: Passed' : 'Awaiting Coordinator Confirmation'}
                </div>
              </div>

              <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 opacity-75">
                <div className="text-[11px] text-[#64748B]">FYP2 Phase</div>
                <div className="text-xl font-bold text-[#64748B] mt-1">
                  {coordinatorConfirmedFYP1 ? 'Unlocked' : 'Locked'}
                </div>
                <div className="text-[10px] text-[#64748B] mt-1">
                  {coordinatorConfirmedFYP1 ? 'Eligible for Phase 2' : 'Pending FYP1 Pass'}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-[#64748B]">Defense, Literature & Internal rubrics</span>
            <button
              onClick={() => setCurrentScreen('student-evaluation-breakdown')}
              className="text-xs font-semibold text-[#002D71] hover:underline"
            >
              Detailed breakdown →
            </button>
          </div>
        </div>
      </div>

      {/* Recent Activity Card */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-xs">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="text-base font-bold text-[#1E293B]">Recent activity</h3>
          <span className="text-xs text-[#64748B]">Last 7 days</span>
        </div>

        <div className="space-y-4 mt-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div>
              <div className="text-sm font-semibold text-slate-800">
                Proposal approved by department
              </div>
              <div className="text-xs text-slate-400 mt-0.5">Today, 9:42 AM</div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
              <FileText className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium text-slate-700 bg-slate-50 p-3 rounded-lg border border-slate-200">
                <span className="font-semibold text-slate-900 block mb-1">Supervisor Note:</span>
                "The basic flow works. Revise the empty state and add source references to generated recommendations."
              </div>
              <div className="text-xs text-slate-400 mt-1">
                Demonstrate core recommendation workflow · Oct 13
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-sky-50 text-[#01B0F1] flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="text-sm font-semibold text-slate-800">
                AI analysis report generated
              </div>
              <div className="text-xs text-slate-400 mt-0.5">May 19, 11:05 AM</div>
            </div>
          </div>
        </div>
      </div>

      {/* Need Guidance? Banner */}
      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <BookOpen className="w-5 h-5 text-[#002D71]" />
          <div>
            <div className="text-sm font-bold text-slate-800">Need guidance?</div>
            <div className="text-xs text-slate-500">
              Explore the student FYP handbook for submission templates and defense rubrics.
            </div>
          </div>
        </div>
        <button
          onClick={() => setHandbookOpen(true)}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#002D71] hover:text-[#01B0F1] hover:underline self-start sm:self-auto"
        >
          <span>Open handbook</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
