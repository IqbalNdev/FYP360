import React from 'react';
import { Project, Screen } from '../types';

interface DashboardViewProps {
  projects: Project[];
  onNavigate: (screen: Screen) => void;
  onSelectProject: (projectId: string, targetScreen: 'project-dossier' | 'evaluation-form') => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  projects,
  onNavigate,
  onSelectProject,
}) => {
  const evaluatedCount = projects.filter((p) => p.status === 'submitted').length;
  const pendingCount = projects.filter((p) => p.status === 'draft' || p.status === 'not_started').length;
  const totalAllocated = projects.length;
  const progressPercent = Math.round((evaluatedCount / totalAllocated) * 100);

  const handleStartNextEvaluation = () => {
    // Find first pending or draft evaluation
    const nextProject = projects.find((p) => p.status === 'draft' || p.status === 'not_started') || projects[0];
    onSelectProject(nextProject.id, 'evaluation-form');
  };

  return (
    <div className="max-w-[1000px] mx-auto p-6 md:p-10">
      <div className="flex flex-col w-full gap-6">
        {/* 1. Confidentiality Advisory Banner */}
        <section className="bg-secondary-container/50 rounded-2xl p-4 sm:px-5 flex items-center justify-between shadow-xs transition-all duration-200 border border-secondary/30">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-secondary/15 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-secondary text-[20px]">
                verified_user
              </span>
            </div>
            <p className="font-body-md text-[14px] text-on-surface font-medium">
              Marking is anonymous and confidential. You can only see your own marks.
            </p>
          </div>
          <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 shadow-xs shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-kiet-orange"></span>
            <span className="font-eyebrow text-[11px] font-bold text-primary uppercase tracking-wider">
              CONFIDENTIAL EVALUATION
            </span>
          </div>
        </section>

        {/* 2. Page Header with Responsive Layout */}
        <header className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pt-2">
          <div className="flex flex-col gap-1">
            <span className="font-eyebrow text-[12px] font-bold text-kiet-orange uppercase tracking-wider">
              SPRING SEMESTER 2025 · KIET
            </span>
            <h1 className="font-headline-lg text-[36px] font-light text-primary tracking-tight leading-tight">
              Good morning, Dr. Farooq.
            </h1>
            <p className="font-body-lg text-[15px] text-muted-text">
              You have {pendingCount} evaluations pending for the FYP1 Defense.
            </p>
          </div>
          <div className="shrink-0">
            <button
              type="button"
              onClick={handleStartNextEvaluation}
              className="w-full sm:w-auto h-12 px-6 rounded-xl bg-kiet-navy text-white font-label-lg text-[13px] font-medium flex items-center justify-center gap-2 shadow-sm hover:bg-sidebar-navy-gradient transition-colors duration-150 group cursor-pointer"
            >
              <span>Start next evaluation</span>
              <span className="material-symbols-outlined text-[18px] group-hover:translate-x-0.5 transition-transform text-kiet-cyan">
                arrow_forward
              </span>
            </button>
          </div>
        </header>

        {/* 3. Key Stat Tiles (4-Column Layout) */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Stat 1: Assigned Projects */}
          <div 
            onClick={() => onNavigate('assigned-projects')}
            className="bg-card-surface rounded-[20px] p-5 shadow-sm border border-card-border flex flex-col gap-3 group hover:shadow-md transition-all cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <span className="font-label-lg text-[13px] text-muted-text">Assigned projects</span>
              <div className="w-10 h-10 rounded-xl bg-secondary-container flex items-center justify-center text-secondary">
                <span className="material-symbols-outlined text-[22px]">folder</span>
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-big-number text-[32px] font-semibold text-primary leading-none">
                {totalAllocated}
              </span>
              <span className="font-label-md text-[12px] text-muted-text">allocated</span>
            </div>
          </div>

          {/* Stat 2: Evaluated */}
          <div 
            onClick={() => onNavigate('my-evaluations')}
            className="bg-card-surface rounded-[20px] p-5 shadow-sm border border-card-border flex flex-col gap-3 group hover:shadow-md transition-all cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <span className="font-label-lg text-[13px] text-muted-text">Evaluated</span>
              <div className="w-10 h-10 rounded-xl bg-success-bg flex items-center justify-center text-success-text">
                <span className="material-symbols-outlined text-[22px]">
                  check_circle
                </span>
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-big-number text-[32px] font-semibold text-primary leading-none">
                {evaluatedCount}
              </span>
              <span className="font-label-md text-[12px] text-success-text font-medium">
                {progressPercent}% complete
              </span>
            </div>
          </div>

          {/* Stat 3: Pending */}
          <div 
            onClick={() => onNavigate('assigned-projects')}
            className="bg-card-surface rounded-[20px] p-5 shadow-sm border border-card-border flex flex-col gap-3 group hover:shadow-md transition-all cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <span className="font-label-lg text-[13px] text-muted-text">Pending</span>
              <div className="w-10 h-10 rounded-xl bg-warning-bg flex items-center justify-center text-warning-text">
                <span className="material-symbols-outlined text-[22px]">hourglass_top</span>
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-big-number text-[32px] font-semibold text-warning-text leading-none">
                {pendingCount}
              </span>
              <span className="font-label-md text-[12px] text-warning-text font-medium">
                Action required
              </span>
            </div>
          </div>

          {/* Stat 4: Next Session */}
          <div className="bg-card-surface rounded-[20px] p-5 shadow-sm border border-card-border flex flex-col gap-3 group hover:shadow-md transition-all">
            <div className="flex items-center justify-between">
              <span className="font-label-lg text-[13px] text-muted-text">Next session</span>
              <div className="w-10 h-10 rounded-xl bg-info-tint flex items-center justify-center text-kiet-navy">
                <span className="material-symbols-outlined text-[22px]">event</span>
              </div>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="font-headline-sm text-[20px] font-semibold text-primary">
                Oct 28, 2026
              </span>
            </div>
          </div>
        </section>

        {/* 4. Main Two-Column Workflow Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* 4A. Left Column: KIET Navy Next Session Card */}
          <aside className="lg:col-span-4 rounded-[24px] bg-gradient-to-b from-sidebar-navy to-sidebar-navy-gradient p-6 text-white shadow-md flex flex-col justify-between gap-6 relative overflow-hidden">
            {/* Ambient subtle highlight circle */}
            <div className="absolute -right-8 -top-8 w-44 h-44 rounded-full bg-kiet-cyan/15 blur-2xl pointer-events-none"></div>

            <div className="flex flex-col gap-5 relative z-10">
              <div className="flex items-center justify-between">
                <span className="font-eyebrow text-[11px] font-bold text-kiet-cyan tracking-wider uppercase">
                  NEXT SESSION
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-[11px] font-medium text-white/90">
                  Hall C-2 Scheduled
                </span>
              </div>

              <div>
                <h2 className="font-headline-md text-[26px] font-semibold leading-tight text-white mb-2">
                  FYP1 Defense
                </h2>
                <p className="font-body-md text-[14px] text-slate-200">
                  Fall & Spring Consolidated Capstone Defense Panel
                </p>
              </div>

              <div className="flex flex-col gap-3.5 pt-2">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[18px] text-slate-200">
                      group
                    </span>
                  </div>
                  <span className="font-body-md text-[14px] text-slate-200">
                    Panel of 3 jurors · 5 projects
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-kiet-cyan/20 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[18px] text-kiet-cyan">
                      calendar_month
                    </span>
                  </div>
                  <span className="font-body-md text-[14px] text-white font-medium">
                    Oct 28, 2026, 10:00 AM · Hall C-2
                  </span>
                </div>
              </div>

              {/* Inline Visual Mini Timeline */}
              <div className="bg-black/25 rounded-xl p-3.5 flex flex-col gap-2 mt-2">
                <span className="font-eyebrow text-[10px] text-white/60 uppercase tracking-widest">
                  SESSION TIMELINE
                </span>
                <div className="flex items-center justify-between font-label-md text-[12px] text-white/90">
                  <span>10:00 AM</span>
                  <span className="h-1.5 flex-1 mx-3 rounded-full bg-white/10 relative overflow-hidden">
                    <span className="absolute left-0 top-0 h-full w-2/5 bg-kiet-cyan rounded-full"></span>
                  </span>
                  <span>01:30 PM</span>
                </div>
              </div>
            </div>

            <div className="pt-4 relative z-10 flex items-center gap-2 border-t border-white/10">
              <span className="material-symbols-outlined text-[16px] text-white/60 shrink-0">
                info
              </span>
              <span className="font-label-md text-[12px] text-white/70">
                Finalized by KIET FYP Coordinator.
              </span>
            </div>
          </aside>

          {/* 4B. Right Column: Evaluation Progress Card & Project Rows */}
          <section className="lg:col-span-8 bg-card-surface rounded-[20px] p-6 shadow-sm border border-card-border flex flex-col gap-5">
            {/* Progress Bar Card Header */}
            <div className="flex flex-col gap-3 pb-2">
              <div className="flex items-center justify-between">
                <span className="font-eyebrow text-[12px] font-bold text-kiet-orange uppercase tracking-wider">
                  EVALUATION PROGRESS
                </span>
                <span className="font-body-md text-[14px] font-medium text-primary">
                  {evaluatedCount} of {totalAllocated} evaluated
                </span>
              </div>
              {/* Track & bar */}
              <div className="w-full h-2 rounded-full bg-surface-container-highest overflow-hidden">
                <div 
                  className="h-full bg-kiet-orange rounded-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                ></div>
              </div>
            </div>

            {/* 5 Project Evaluation Rows */}
            <div className="flex flex-col divide-y divide-card-border/60">
              {projects.map((project) => {
                const isSubmitted = project.status === 'submitted';
                const isDraft = project.status === 'draft';
                const isNotStarted = project.status === 'not_started';
                const isConflict = project.status === 'conflict';

                return (
                  <div
                    key={project.id}
                    className="py-4 first:pt-2 last:pb-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-surface-container-low px-2 -mx-2 rounded-xl transition-colors"
                  >
                    <div 
                      onClick={() => !isConflict && onSelectProject(project.id, 'project-dossier')}
                      className={`flex flex-col min-w-0 pr-2 ${!isConflict ? 'cursor-pointer group' : ''}`}
                    >
                      <h3 className="font-headline-sm text-[15px] font-medium text-primary group-hover:text-kiet-orange transition-colors truncate">
                        {project.title}
                      </h3>
                      <span className="font-body-md text-[12px] text-muted-text mt-0.5">
                        Group {project.id} · Lead: {project.lead}
                      </span>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
                      {isSubmitted && (
                        <>
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-success-bg text-success-text font-label-md text-[12px] font-medium">
                            <span className="material-symbols-outlined text-[16px]">check</span>
                            Submitted
                          </span>
                          <button
                            type="button"
                            onClick={() => onSelectProject(project.id, 'evaluation-form')}
                            className="font-label-lg text-[13px] font-medium text-kiet-navy hover:text-kiet-orange flex items-center gap-1 transition-colors cursor-pointer"
                          >
                            <span>View evaluation</span>
                            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                          </button>
                        </>
                      )}

                      {isDraft && (
                        <>
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-warning-bg text-warning-text font-label-md text-[12px] font-medium">
                            <span className="material-symbols-outlined text-[15px]">edit</span>
                            Draft
                          </span>
                          <button
                            type="button"
                            onClick={() => onSelectProject(project.id, 'evaluation-form')}
                            className="font-label-lg text-[13px] font-medium text-warning-text hover:underline flex items-center gap-1 transition-colors cursor-pointer"
                          >
                            <span>Continue draft</span>
                            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                          </button>
                        </>
                      )}

                      {isNotStarted && (
                        <>
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container text-muted-text font-label-md text-[12px] font-medium">
                            <span className="material-symbols-outlined text-[15px]">radio_button_unchecked</span>
                            Not started
                          </span>
                          <button
                            type="button"
                            onClick={() => onSelectProject(project.id, 'evaluation-form')}
                            className="h-9 px-3.5 rounded-lg bg-kiet-navy text-white font-label-md text-[12px] font-medium inline-flex items-center gap-1.5 hover:bg-sidebar-navy-gradient transition-colors shadow-xs cursor-pointer"
                          >
                            <span>Start evaluation</span>
                            <span className="material-symbols-outlined text-[15px] text-kiet-cyan">arrow_forward</span>
                          </button>
                        </>
                      )}

                      {isConflict && (
                        <>
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-danger-bg text-danger-text font-label-md text-[12px] font-medium">
                            <span className="material-symbols-outlined text-[15px]">flag</span>
                            Conflict declared
                          </span>
                          <span className="font-body-md text-[13px] italic text-muted-text">
                            Excused from jury
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
