import React from 'react';
import { Project } from '../types';

interface AssignedProjectsViewProps {
  projects: Project[];
  onSelectProject: (projectId: string, targetScreen: 'project-dossier' | 'evaluation-form') => void;
}

export const AssignedProjectsView: React.FC<AssignedProjectsViewProps> = ({
  projects,
  onSelectProject,
}) => {
  const activeCount = projects.filter((p) => p.status !== 'conflict').length;
  const excusedCount = projects.filter((p) => p.status === 'conflict').length;

  return (
    <div className="max-w-[940px] mx-auto py-10 px-6 lg:px-10">
      <div className="flex flex-col w-full pb-10">
        {/* Page Header */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div className="flex flex-col">
            <span className="font-eyebrow text-[12px] text-kiet-orange font-bold tracking-widest uppercase mb-1">
              ASSIGNED PROJECTS
            </span>
            <h1 className="font-headline-lg text-[36px] font-light text-primary tracking-tight leading-tight">
              Assigned Projects
            </h1>
            <p className="font-body-lg text-[15px] text-muted-text mt-1">
              Projects allocated to you by the KIET FYP Coordinator.
            </p>
          </div>

          {/* Quick Stats Bar */}
          <div className="flex items-center gap-2 bg-card-surface px-4 py-2.5 rounded-xl shadow-xs border border-card-border">
            <div className="flex items-center gap-2 pr-4">
              <span className="w-2 h-2 rounded-full bg-kiet-orange"></span>
              <span className="font-label-md text-[12px] text-muted-text">
                Active: <span className="font-semibold text-primary">{activeCount}</span>
              </span>
            </div>
            <div className="w-px h-4 bg-card-border"></div>
            <div className="flex items-center gap-2 pl-2">
              <span className="w-2 h-2 rounded-full bg-outline-variant"></span>
              <span className="font-label-md text-[12px] text-muted-text">
                Excused: <span className="font-semibold text-primary">{excusedCount}</span>
              </span>
            </div>
          </div>
        </header>

        {/* Advisory / Session Overview Banner */}
        <div className="bg-secondary-container/50 rounded-2xl p-4 mb-6 flex items-center justify-between shadow-xs border border-secondary/30">
          <div className="flex items-center gap-3.5">
            <div className="w-9 h-9 rounded-lg bg-secondary/15 flex items-center justify-center text-secondary shrink-0">
              <span className="material-symbols-outlined text-[20px]">calendar_month</span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-label-lg text-[13px] font-semibold text-kiet-navy">
                  Defense Session · Hall C-2
                </span>
                <span className="px-2 py-0.5 rounded-full bg-kiet-orange text-white font-eyebrow text-[10px] tracking-wider uppercase font-bold">
                  Advisory
                </span>
              </div>
              <p className="font-body-md text-[13px] text-on-surface-variant">
                Oct 28, 2026 · Evaluation rubric weights calibrated per KIET Faculty Board regulations.
              </p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-1.5 text-kiet-navy font-label-md text-[12px] font-medium">
            <span className="material-symbols-outlined text-[18px] text-secondary">verified</span>
            <span>Jury Panel Verified</span>
          </div>
        </div>

        {/* Cards Vertical List */}
        <div className="flex flex-col gap-5">
          {projects.map((project) => {
            const isConflict = project.status === 'conflict';
            const isSubmitted = project.status === 'submitted';
            const isDraft = project.status === 'draft';
            const isPending = project.status === 'not_started';

            if (isConflict) {
              return (
                <article
                  key={project.id}
                  className="bg-surface-container rounded-[20px] p-6 lg:p-7 shadow-xs border border-card-border opacity-85"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                    <div className="flex items-start gap-5 min-w-0">
                      {/* Numbered Tile (Muted / Locked) */}
                      <div className="w-12 h-12 rounded-2xl bg-surface-container-high text-muted-text flex items-center justify-center font-headline-sm text-[18px] font-semibold shrink-0">
                        <span className="material-symbols-outlined text-[24px]">lock</span>
                      </div>
                      <div className="flex flex-col min-w-0">
                        <div className="font-eyebrow text-[11px] text-muted-text/80 uppercase tracking-wider mb-1">
                          {project.id} · {project.stage}
                        </div>
                        <h2 className="font-headline-sm text-[18px] font-semibold text-muted-text truncate mb-3">
                          {project.title}
                        </h2>
                        <div className="flex flex-wrap items-center gap-2.5">
                          <span className="inline-flex items-center px-3 py-1 rounded-lg bg-surface-container-high text-on-surface-variant font-label-md text-[12px]">
                            {project.domain}
                          </span>
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-highest text-on-surface-variant font-label-md text-[12px] font-medium">
                            <span className="w-1.5 h-1.5 rounded-full bg-outline"></span>
                            Conflict declared
                          </span>
                          <span className="inline-flex items-center gap-1.5 text-muted-text font-label-md text-[12px] pl-1">
                            <span className="material-symbols-outlined text-[16px]">schedule</span>
                            {project.timeOnly}
                          </span>
                        </div>
                        <div className="mt-3 inline-flex items-center gap-2 text-danger-text bg-danger-bg px-3 py-1.5 rounded-lg w-fit border border-danger-text/20">
                          <span className="material-symbols-outlined text-[16px]">shield</span>
                          <span className="font-label-md text-[12px] font-medium">
                            Conflict declared. Coordinator notified.
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 self-end lg:self-center shrink-0">
                      <button
                        type="button"
                        disabled
                        className="h-11 px-5 rounded-[14px] bg-surface-container-high text-muted-text font-label-lg text-[13px] font-medium cursor-not-allowed inline-flex items-center gap-2 select-none"
                      >
                        <span className="material-symbols-outlined text-[18px]">block</span>
                        <span>Excused from jury</span>
                      </button>
                    </div>
                  </div>
                </article>
              );
            }

            return (
              <article
                key={project.id}
                className="bg-card-surface rounded-[20px] p-6 lg:p-7 shadow-sm hover:shadow-md transition-shadow duration-200 border border-card-border"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  <div className="flex items-start gap-5 min-w-0">
                    {/* Numbered Tile */}
                    <div className="w-12 h-12 rounded-2xl bg-kiet-navy text-white flex items-center justify-center font-headline-sm text-[18px] font-semibold shrink-0 shadow-xs">
                      {project.number}
                    </div>

                    <div className="flex flex-col min-w-0">
                      {/* Eyebrow */}
                      <div className="font-eyebrow text-[11px] text-muted-text uppercase tracking-wider mb-1">
                        {project.id} · {project.stage}
                      </div>
                      {/* Title */}
                      <h2 
                        onClick={() => onSelectProject(project.id, 'project-dossier')}
                        className="font-headline-sm text-[18px] font-semibold text-primary hover:text-kiet-orange transition-colors truncate mb-3 cursor-pointer"
                      >
                        {project.title}
                      </h2>
                      {/* Metadata Row */}
                      <div className="flex flex-wrap items-center gap-2.5">
                        <span className="inline-flex items-center px-3 py-1 rounded-lg bg-secondary-container text-primary font-label-md text-[12px] font-medium">
                          {project.domain}
                        </span>

                        {isSubmitted && (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-success-bg text-success-text font-label-md text-[12px] font-medium">
                            <span className="w-1.5 h-1.5 rounded-full bg-success-text"></span>
                            Submitted
                          </span>
                        )}

                        {isDraft && (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-warning-bg text-warning-text font-label-md text-[12px] font-medium">
                            <span className="w-1.5 h-1.5 rounded-full bg-warning-text"></span>
                            Draft saved
                          </span>
                        )}

                        {isPending && (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container text-on-surface-variant font-label-md text-[12px] font-medium">
                            <span className="w-1.5 h-1.5 rounded-full bg-outline"></span>
                            Pending evaluation
                          </span>
                        )}

                        <span className="inline-flex items-center gap-1.5 text-muted-text font-label-md text-[12px] pl-1">
                          <span className="material-symbols-outlined text-[16px]">schedule</span>
                          {project.scheduledTime}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-3 self-end lg:self-center shrink-0">
                    <button
                      type="button"
                      onClick={() => onSelectProject(project.id, 'project-dossier')}
                      className="h-11 px-5 rounded-[14px] bg-white hover:bg-surface-container text-primary font-label-lg text-[13px] font-medium transition-colors shadow-xs border border-card-border cursor-pointer"
                    >
                      View project
                    </button>
                    <button
                      type="button"
                      onClick={() => onSelectProject(project.id, 'evaluation-form')}
                      className="h-11 px-5 rounded-[14px] bg-kiet-navy hover:bg-sidebar-navy-gradient text-white font-label-lg text-[13px] font-medium inline-flex items-center gap-2 transition-colors shadow-xs cursor-pointer"
                    >
                      <span>Evaluate</span>
                      <span className="material-symbols-outlined text-[18px] text-kiet-cyan">arrow_forward</span>
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Bottom Session Notice */}
        <div className="mt-8 pt-4 flex flex-col sm:flex-row sm:items-center justify-between text-muted-text font-label-md text-[12px] gap-2 border-t border-card-border">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px] text-secondary">info</span>
            <span>Evaluations must be finalized within 2 hours of defense slot completion.</span>
          </div>
          <span>KIET College of Computing & Information Sciences</span>
        </div>
      </div>
    </div>
  );
};
