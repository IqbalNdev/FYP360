import React from 'react';
import { Project, ProjectDocument } from '../types';

interface ProjectDossierViewProps {
  project: Project;
  onBack: () => void;
  onStartEvaluation: (projectId: string) => void;
  onOpenDoc: (doc: ProjectDocument) => void;
  onOpenConflictModal: () => void;
}

export const ProjectDossierView: React.FC<ProjectDossierViewProps> = ({
  project,
  onBack,
  onStartEvaluation,
  onOpenDoc,
  onOpenConflictModal,
}) => {
  return (
    <div className="flex flex-col w-full min-h-screen px-6 lg:px-10 py-8">
      {/* Main Centered Dossier Column */}
      <div className="max-w-[940px] w-full mx-auto pb-32">
        {/* Top Action / Back Link */}
        <div className="mb-6 flex items-center">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-2 text-kiet-orange hover:text-kiet-navy font-label-lg text-[13px] font-medium transition-colors group cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px] transition-transform group-hover:-translate-x-0.5">
              arrow_back
            </span>
            <span>Assigned projects</span>
          </button>
        </div>

        {/* Page Header & Title Area */}
        <header className="mb-10 flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="font-eyebrow text-[12px] text-kiet-orange font-bold uppercase tracking-widest">
              PROJECT DOSSIER
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-outline-variant"></span>
            <span className="font-label-md text-[12px] text-muted-text">
              KIET ACADEMIC EVALUATION RECORD
            </span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-1">
            <h1 className="font-headline-lg text-[34px] sm:text-[36px] text-primary font-light tracking-tight">
              {project.title}
            </h1>
            <div className="shrink-0">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-warning-bg text-warning-text font-label-md text-[12px] font-medium shadow-xs">
                <span className="w-2 h-2 rounded-full bg-warning-text"></span>
                Awaiting evaluation
              </span>
            </div>
          </div>
        </header>

        {/* Content Sections Stack */}
        <div className="flex flex-col gap-6">
          {/* SECTION A: Project Overview */}
          <section className="bg-card-surface rounded-[20px] p-6 shadow-sm border border-card-border">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-10 h-10 rounded-xl bg-kiet-navy flex items-center justify-center text-white font-headline-sm text-[18px] font-semibold shrink-0">
                A
              </div>
              <div className="flex flex-col">
                <h2 className="font-headline-sm text-[18px] text-primary font-medium leading-tight">
                  Project overview
                </h2>
                <p className="font-body-md text-[13px] text-muted-text mt-0.5">
                  Core administrative and academic registration details.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              <div className="bg-surface-container p-4 rounded-xl">
                <span className="font-label-md text-[12px] text-muted-text block mb-1">Project ID</span>
                <span className="font-label-lg text-[13px] text-primary font-semibold tracking-wide">
                  {project.id}
                </span>
              </div>
              <div className="bg-surface-container p-4 rounded-xl">
                <span className="font-label-md text-[12px] text-muted-text block mb-1">Project Type</span>
                <span className="font-label-lg text-[13px] text-on-surface font-medium">
                  {project.projectType}
                </span>
              </div>
              <div className="bg-surface-container p-4 rounded-xl">
                <span className="font-label-md text-[12px] text-muted-text block mb-1">Domain</span>
                <span className="font-label-lg text-[13px] text-on-surface font-medium">
                  {project.domain}
                </span>
              </div>
              <div className="bg-surface-container p-4 rounded-xl">
                <span className="font-label-md text-[12px] text-muted-text block mb-1">Supervisor</span>
                <span className="font-label-lg text-[13px] text-on-surface font-medium">
                  {project.supervisor}
                </span>
              </div>
              <div className="bg-surface-container p-4 rounded-xl">
                <span className="font-label-md text-[12px] text-muted-text block mb-1">Phase</span>
                <span className="inline-flex items-center px-2 py-0.5 rounded bg-secondary-container text-primary font-label-md text-[12px] font-semibold">
                  {project.phase}
                </span>
              </div>
            </div>
          </section>

          {/* SECTION B: Approved Proposal */}
          <section className="bg-card-surface rounded-[20px] p-6 shadow-sm border border-card-border">
            <div className="flex items-start gap-4 mb-5">
              <div className="w-10 h-10 rounded-xl bg-kiet-navy flex items-center justify-center text-white font-headline-sm text-[18px] font-semibold shrink-0">
                B
              </div>
              <div className="flex flex-col">
                <h2 className="font-headline-sm text-[18px] text-primary font-medium leading-tight">
                  Approved proposal
                </h2>
                <p className="font-body-md text-[13px] text-muted-text mt-0.5">
                  Executive summary and technology stack accepted by the KIET Academic Committee.
                </p>
              </div>
            </div>

            <div className="bg-surface-container rounded-xl p-5 mb-5">
              <p className="font-body-lg text-[15px] text-on-surface leading-relaxed">
                {project.proposalSummary}
              </p>
            </div>

            <div>
              <span className="font-eyebrow text-[11px] text-muted-text uppercase tracking-wider block mb-3 font-bold">
                Accepted Technology Stack
              </span>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="inline-flex items-center px-3 py-1.5 rounded-lg bg-secondary-container text-primary font-label-lg text-[13px] font-medium shadow-2xs border border-secondary/30"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </section>

          {/* SECTION C: Project Team */}
          <section className="bg-card-surface rounded-[20px] p-6 shadow-sm border border-card-border">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-10 h-10 rounded-xl bg-kiet-navy flex items-center justify-center text-white font-headline-sm text-[18px] font-semibold shrink-0">
                C
              </div>
              <div className="flex flex-col">
                <h2 className="font-headline-sm text-[18px] text-primary font-medium leading-tight">
                  Project team
                </h2>
                <p className="font-body-md text-[13px] text-muted-text mt-0.5">
                  Registered student group members and assigned project roles.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.team.map((member) => (
                <div
                  key={member.roll}
                  className="flex items-center justify-between p-4 rounded-xl bg-surface-container border border-card-border"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-label-lg text-[13px] font-semibold shrink-0 ${
                        member.isLead
                          ? 'bg-kiet-orange text-white shadow-xs'
                          : 'bg-surface-container-high text-on-surface'
                      }`}
                    >
                      {member.initials}
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="font-label-lg text-[13px] text-on-surface font-semibold truncate">
                        {member.name}
                      </span>
                      <span className="font-label-md text-[12px] text-muted-text">
                        {member.roll}
                      </span>
                    </div>
                  </div>

                  <span
                    className={`px-2.5 py-1 rounded-full font-label-md text-[11px] font-medium whitespace-nowrap ${
                      member.isLead
                        ? 'bg-kiet-navy text-white'
                        : 'bg-surface-container-high text-on-surface-variant'
                    }`}
                  >
                    {member.role}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION D: Progress Snapshot */}
          <section className="bg-card-surface rounded-[20px] p-6 shadow-sm border border-card-border">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-10 h-10 rounded-xl bg-kiet-navy flex items-center justify-center text-white font-headline-sm text-[18px] font-semibold shrink-0">
                D
              </div>
              <div className="flex flex-col">
                <h2 className="font-headline-sm text-[18px] text-primary font-medium leading-tight">
                  Progress snapshot
                </h2>
                <p className="font-body-md text-[13px] text-muted-text mt-0.5">
                  Current milestone status and supervisory check-in metrics.
                </p>
              </div>
            </div>

            {/* Stat Indicators */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div className="p-5 rounded-xl bg-surface-container flex items-center justify-between border border-card-border">
                <div className="flex flex-col">
                  <span className="font-label-md text-[12px] text-muted-text">Cumulative Progress</span>
                  <span className="font-big-number text-[32px] text-primary mt-1 leading-none font-semibold">
                    {project.progress.cumulative}%
                  </span>
                  <span className="font-label-md text-[12px] text-on-surface-variant mt-0.5">
                    milestone completion
                  </span>
                </div>
                <div className="w-12 h-12 rounded-xl bg-secondary-container text-secondary flex items-center justify-center">
                  <span className="material-symbols-outlined text-[24px]">flag</span>
                </div>
              </div>

              <div className="p-5 rounded-xl bg-surface-container flex items-center justify-between border border-card-border">
                <div className="flex flex-col">
                  <span className="font-label-md text-[12px] text-muted-text">Schedule Integrity</span>
                  <span className="font-big-number text-[32px] text-warning-text mt-1 leading-none font-semibold">
                    {project.progress.scheduleIntegrity}%
                  </span>
                  <span className="font-label-md text-[12px] text-on-surface-variant mt-0.5">
                    on-time rate
                  </span>
                </div>
                <div className="w-12 h-12 rounded-xl bg-warning-bg text-warning-text flex items-center justify-center">
                  <span className="material-symbols-outlined text-[24px]">history_toggle_off</span>
                </div>
              </div>
            </div>

            {/* 8-Step Horizontal Stepper */}
            <div className="mb-6 bg-surface-container p-5 rounded-xl overflow-x-auto border border-card-border custom-scroll">
              <div className="min-w-[760px] flex items-center justify-between relative">
                {/* Background connecting trace */}
                <div className="absolute top-4 left-6 right-6 h-0.5 bg-surface-container-highest z-0"></div>

                {project.milestones.map((step) => {
                  const isCompleted = step.status === 'completed';
                  const isOverdue = step.status === 'overdue';
                  const isInProgress = step.status === 'in_progress';
                  const isPending = step.status === 'pending';

                  return (
                    <div key={step.id} className="flex flex-col items-center relative z-10 w-24 text-center">
                      {isCompleted && (
                        <div className="w-8 h-8 rounded-full bg-kiet-orange text-white flex items-center justify-center shadow-xs">
                          <span className="material-symbols-outlined text-[18px]">check</span>
                        </div>
                      )}

                      {isOverdue && (
                        <div className="w-8 h-8 rounded-full bg-danger-bg text-danger-text flex items-center justify-center font-label-lg font-bold shadow-xs">
                          {step.id}
                        </div>
                      )}

                      {isInProgress && (
                        <div className="w-8 h-8 rounded-full bg-warning-bg text-warning-text flex items-center justify-center font-label-lg font-bold shadow-xs">
                          {step.id}
                        </div>
                      )}

                      {isPending && (
                        <div className="w-8 h-8 rounded-full bg-surface-container-highest text-muted-text flex items-center justify-center font-label-lg font-medium">
                          {step.id}
                        </div>
                      )}

                      <span
                        className={`font-label-md text-[11px] font-medium mt-2 leading-tight ${
                          isOverdue ? 'text-danger-text' : isPending ? 'text-muted-text' : 'text-on-surface'
                        }`}
                      >
                        {step.name}
                      </span>

                      <span
                        className={`font-eyebrow text-[10px] uppercase mt-0.5 font-bold ${
                          isCompleted
                            ? 'text-kiet-orange'
                            : isOverdue
                            ? 'text-danger-text'
                            : isInProgress
                            ? 'text-warning-text'
                            : 'text-muted-text'
                        }`}
                      >
                        {step.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex items-start gap-2.5 p-3 rounded-lg bg-surface-container text-muted-text">
              <span className="material-symbols-outlined text-[18px] text-secondary shrink-0 mt-0.5">
                info
              </span>
              <p className="font-body-md text-[13px] leading-normal text-muted-text">
                Milestones verified through KIET supervisor check-ins. Metric indicators reflect standard institutional thresholds.
              </p>
            </div>
          </section>

          {/* SECTION E: Documents */}
          <section className="bg-card-surface rounded-[20px] p-6 shadow-sm border border-card-border">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-10 h-10 rounded-xl bg-kiet-navy flex items-center justify-center text-white font-headline-sm text-[18px] font-semibold shrink-0">
                E
              </div>
              <div className="flex flex-col">
                <h2 className="font-headline-sm text-[18px] text-primary font-medium leading-tight">
                  Documents
                </h2>
                <p className="font-body-md text-[13px] text-muted-text mt-0.5">
                  Official milestone submissions and code artifacts available for defense evaluation.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              {project.documents.map((doc, idx) => (
                <div
                  key={idx}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-surface-container hover:bg-surface-container-high transition-colors gap-3 border border-card-border"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                        doc.type === 'repo'
                          ? 'bg-kiet-navy text-white'
                          : 'bg-danger-bg text-danger-text'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[24px]">
                        {doc.type === 'repo' ? 'code' : 'picture_as_pdf'}
                      </span>
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="font-label-lg text-[13px] text-on-surface font-medium truncate">
                        {doc.name}
                      </span>
                      <span className="font-label-md text-[12px] text-muted-text">
                        {doc.size} · {doc.date}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => onOpenDoc(doc)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-[14px] bg-card-surface hover:bg-surface-container text-primary font-label-lg text-[13px] font-medium shadow-xs transition-colors shrink-0 border border-card-border cursor-pointer"
                  >
                    <span>{doc.type === 'repo' ? 'Open repository' : 'View document'}</span>
                    <span className="material-symbols-outlined text-[16px] text-secondary">
                      {doc.type === 'repo' ? 'open_in_new' : 'arrow_forward'}
                    </span>
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* CONFLICT OF INTEREST CARD */}
          <section className="bg-card-surface rounded-[20px] p-6 shadow-sm border border-card-border">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-danger-bg text-danger-text flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[22px]">flip_camera_ios</span>
                </div>
                <div className="flex flex-col">
                  <h3 className="font-headline-sm text-[18px] text-primary font-medium leading-tight">
                    Conflict of interest
                  </h3>
                  <p className="font-body-md text-[13px] text-muted-text mt-1 max-w-xl">
                    If you have a relationship with this group or supervisor that could affect impartiality, declare it before evaluating.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={onOpenConflictModal}
                className="px-5 py-2.5 rounded-[14px] bg-white hover:bg-danger-bg text-danger-text font-label-lg text-[13px] font-semibold shadow-xs transition-colors shrink-0 text-center border border-danger-text/20 cursor-pointer"
              >
                Declare conflict of interest
              </button>
            </div>
          </section>
        </div>
      </div>

      {/* STICKY BOTTOM ACTION BAR */}
      <div className="fixed bottom-0 left-[260px] right-0 h-20 bg-card-surface/95 backdrop-blur-xl z-40 px-6 lg:px-10 flex items-center justify-between shadow-[0_-2px_12px_rgba(0,0,0,0.04)] border-t border-card-border">
        <div className="max-w-[940px] w-full mx-auto flex items-center justify-between">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-2 text-muted-text hover:text-primary font-label-lg text-[13px] transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            <span>Back to projects</span>
          </button>
          <button
            type="button"
            onClick={() => onStartEvaluation(project.id)}
            className="h-12 px-6 rounded-[14px] bg-kiet-navy hover:bg-sidebar-navy-gradient text-white font-label-lg text-[13px] font-semibold flex items-center gap-2 shadow-sm transition-all hover:translate-x-0.5 cursor-pointer"
          >
            <span>Start evaluation</span>
            <span className="material-symbols-outlined text-[18px] text-kiet-cyan">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  );
};
