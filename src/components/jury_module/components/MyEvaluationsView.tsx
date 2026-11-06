import React from 'react';
import { EvaluationRecord } from '../types';

interface MyEvaluationsViewProps {
  evaluations: EvaluationRecord[];
  onViewEvaluation: (projectId: string) => void;
}

export const MyEvaluationsView: React.FC<MyEvaluationsViewProps> = ({
  evaluations,
  onViewEvaluation,
}) => {
  const totalEvaluated = evaluations.length;
  const publishedCount = evaluations.filter((e) => e.status === 'published').length;
  const pendingReleaseCount = evaluations.filter((e) => e.status === 'submitted_unpublished').length;

  return (
    <div className="max-w-[940px] mx-auto p-6 md:p-10">
      <div className="flex flex-col w-full pb-10">
        {/* Page Header */}
        <header className="flex flex-col gap-1 mb-6">
          <span className="font-eyebrow text-[12px] text-kiet-orange font-bold uppercase tracking-wider">
            HISTORY
          </span>
          <h1 className="font-headline-lg text-[36px] font-light text-primary tracking-tight leading-tight">
            My Evaluations
          </h1>
          <p className="font-body-lg text-[15px] text-muted-text">Marks and feedback you have submitted at KIET.</p>
        </header>

        {/* Confidentiality Policy Banner */}
        <div className="w-full bg-secondary-container/50 rounded-[20px] p-4 flex items-center justify-between shadow-xs mb-6 border border-secondary/30">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-secondary/15 flex items-center justify-center text-secondary shrink-0">
              <span
                className="material-symbols-outlined text-[20px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                verified_user
              </span>
            </div>
            <span className="font-body-md text-[14px] text-primary font-medium">
              Only your own submitted marks are shown here.
            </span>
          </div>
          <span className="font-label-md text-[12px] uppercase tracking-wider bg-card-surface text-kiet-orange border border-card-border px-3 py-1 rounded-full font-bold">
            CONFIDENTIAL
          </span>
        </div>

        {/* Key Metrics Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-card-surface rounded-[20px] p-5 shadow-sm flex items-center justify-between border border-card-border">
            <div className="flex flex-col">
              <span className="font-label-md text-[12px] text-muted-text font-medium uppercase tracking-wider">
                Total Evaluated
              </span>
              <span className="font-big-number text-[32px] text-primary font-semibold mt-1 leading-none">
                {totalEvaluated < 10 ? `0${totalEvaluated}` : totalEvaluated}
              </span>
            </div>
            <div className="w-11 h-11 rounded-xl bg-surface-container flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[24px]">assignment_turned_in</span>
            </div>
          </div>

          <div className="bg-card-surface rounded-[20px] p-5 shadow-sm flex items-center justify-between border border-card-border">
            <div className="flex flex-col">
              <span className="font-label-md text-[12px] text-muted-text font-medium uppercase tracking-wider">
                Published
              </span>
              <span className="font-big-number text-[32px] text-success-text font-semibold mt-1 leading-none">
                {publishedCount < 10 ? `0${publishedCount}` : publishedCount}
              </span>
            </div>
            <div className="w-11 h-11 rounded-xl bg-success-bg flex items-center justify-center text-success-text">
              <span className="material-symbols-outlined text-[24px]">task_alt</span>
            </div>
          </div>

          <div className="bg-card-surface rounded-[20px] p-5 shadow-sm flex items-center justify-between border border-card-border">
            <div className="flex flex-col">
              <span className="font-label-md text-[12px] text-muted-text font-medium uppercase tracking-wider">
                Pending Release
              </span>
              <span className="font-big-number text-[32px] text-warning-text font-semibold mt-1 leading-none">
                {pendingReleaseCount < 10 ? `0${pendingReleaseCount}` : pendingReleaseCount}
              </span>
            </div>
            <div className="w-11 h-11 rounded-xl bg-warning-bg flex items-center justify-center text-warning-text">
              <span className="material-symbols-outlined text-[24px]">pending_actions</span>
            </div>
          </div>
        </div>

        {/* Evaluation Table Container */}
        <div className="w-full bg-card-surface rounded-[20px] shadow-sm overflow-hidden border border-card-border">
          <div className="overflow-x-auto custom-scroll">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container border-b border-card-border">
                  <th
                    className="py-4 px-6 font-label-md text-[12px] font-semibold text-muted-text tracking-wider uppercase"
                    scope="col"
                  >
                    PROJECT
                  </th>
                  <th
                    className="py-4 px-6 font-label-md text-[12px] font-semibold text-muted-text tracking-wider uppercase"
                    scope="col"
                  >
                    STAGE
                  </th>
                  <th
                    className="py-4 px-6 font-label-md text-[12px] font-semibold text-muted-text tracking-wider uppercase"
                    scope="col"
                  >
                    MARKS GIVEN
                  </th>
                  <th
                    className="py-4 px-6 font-label-md text-[12px] font-semibold text-muted-text tracking-wider uppercase"
                    scope="col"
                  >
                    SUBMITTED
                  </th>
                  <th
                    className="py-4 px-6 font-label-md text-[12px] font-semibold text-muted-text tracking-wider uppercase"
                    scope="col"
                  >
                    STATE
                  </th>
                  <th
                    className="py-4 px-6 font-label-md text-[12px] font-semibold text-muted-text tracking-wider uppercase text-right"
                    scope="col"
                  >
                    ACTION
                  </th>
                </tr>
              </thead>
              <tbody>
                {evaluations.map((item, index) => {
                  const isLast = index === evaluations.length - 1;
                  const isUnpublished = item.status === 'submitted_unpublished';

                  return (
                    <tr
                      key={item.id}
                      className={`h-[72px] hover:bg-surface-container-low transition-colors ${
                        isLast ? '' : 'border-b border-card-border/60'
                      }`}
                    >
                      <td className="py-3 px-6 align-middle">
                        <div className="flex flex-col min-w-0 max-w-[340px]">
                          <span className="font-headline-sm text-[15px] font-medium text-primary leading-snug truncate">
                            {item.title}
                          </span>
                          <span className="font-label-md text-[12px] text-muted-text leading-tight mt-0.5">
                            {item.projectId} · Lead: {item.lead}
                          </span>
                        </div>
                      </td>

                      <td className="py-3 px-6 align-middle whitespace-nowrap">
                        <span className="font-body-md text-[14px] text-on-surface-variant font-medium">
                          {item.stage}
                        </span>
                      </td>

                      <td className="py-3 px-6 align-middle whitespace-nowrap">
                        <span className="font-body-lg text-[15px] font-bold text-primary tracking-tight">
                          {item.marksGiven}{' '}
                          <span className="font-normal text-muted-text text-[13px]">
                            / {item.marksMax}
                          </span>
                        </span>
                      </td>

                      <td className="py-3 px-6 align-middle whitespace-nowrap">
                        <span className="font-body-md text-[14px] text-muted-text">
                          {item.submittedDate}
                        </span>
                      </td>

                      <td className="py-3 px-6 align-middle whitespace-nowrap">
                        {isUnpublished ? (
                          <div className="inline-flex flex-col items-start">
                            <span className="bg-warning-bg text-warning-text font-label-md text-[12px] font-semibold px-2.5 py-0.5 rounded-full inline-flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-warning-text"></span>
                              Submitted
                            </span>
                            <span className="font-label-md text-[11px] text-muted-text mt-0.5 pl-1">
                              unpublished
                            </span>
                          </div>
                        ) : (
                          <span className="bg-success-bg text-success-text font-label-md text-[12px] font-semibold px-2.5 py-0.5 rounded-full inline-flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-success-text"></span>
                            Published
                          </span>
                        )}
                      </td>

                      <td className="py-3 px-6 align-middle whitespace-nowrap text-right">
                        <button
                          type="button"
                          onClick={() => onViewEvaluation(item.projectId)}
                          className="inline-flex items-center gap-1 font-label-lg text-[13px] font-semibold text-kiet-navy hover:text-kiet-orange transition-colors group cursor-pointer"
                        >
                          <span>View</span>
                          <span className="material-symbols-outlined text-[16px] transition-transform group-hover:translate-x-0.5 text-secondary">
                            arrow_forward
                          </span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer Informational Note */}
        <footer className="mt-4 flex items-center gap-2 px-2 text-muted-text">
          <span className="material-symbols-outlined text-[17px] text-secondary shrink-0">info</span>
          <span className="font-label-lg text-[13px] text-muted-text">
            Evaluations remain confidential until approved and released by the KIET FYP Coordinator.
          </span>
        </footer>
      </div>
    </div>
  );
};
