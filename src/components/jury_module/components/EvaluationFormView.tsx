import React, { useState } from 'react';
import { Project } from '../types';

interface EvaluationFormViewProps {
  project: Project;
  onBack: () => void;
  onSaveDraft: (projectId: string, scores: Project['evaluationScores']) => void;
  onSubmitEvaluation: (projectId: string, scores: Project['evaluationScores']) => void;
  showToast: (msg: string) => void;
}

interface CriterionConfig {
  id: 'clarity' | 'problemScope' | 'technical' | 'questions';
  num: number;
  title: string;
  max: number;
  description: string;
}

const CRITERIA: CriterionConfig[] = [
  {
    id: 'clarity',
    num: 1,
    title: 'Clarity of presentation',
    max: 3.0,
    description: 'Structure, visual clarity of slides, confidence, timing management, and professional delivery.',
  },
  {
    id: 'problemScope',
    num: 2,
    title: 'Problem and scope definition',
    max: 2.0,
    description: 'Clear articulation of the domain problem, justification of necessity, and bounded realistic scope.',
  },
  {
    id: 'technical',
    num: 3,
    title: 'Technical understanding',
    max: 3.0,
    description: 'Comprehension of baseline AI architectures, data pipeline pipelines, design feasibility, and engineering tradeoffs.',
  },
  {
    id: 'questions',
    num: 4,
    title: 'Response to questions',
    max: 2.0,
    description: 'Defense of methodologies, clarity under interrogation, individual member participation, and rebuttal accuracy.',
  },
];

export const EvaluationFormView: React.FC<EvaluationFormViewProps> = ({
  project,
  onBack,
  onSaveDraft,
  onSubmitEvaluation,
  showToast,
}) => {
  const [scores, setScores] = useState({
    clarity: project.evaluationScores.clarity,
    problemScope: project.evaluationScores.problemScope,
    technical: project.evaluationScores.technical,
    questions: project.evaluationScores.questions,
  });

  const [comments, setComments] = useState(
    project.evaluationScores.comments ||
      'The group demonstrates a solid grasp of NLP transformer models for resume profiling. However, the system architecture section requires clearer latency benchmarks for concurrent student queries. Recommend tightening empirical evaluation before FYP2.'
  );

  const adjustScore = (key: 'clarity' | 'problemScope' | 'technical' | 'questions', delta: number) => {
    setScores((prev) => {
      const current = prev[key];
      const max = CRITERIA.find((c) => c.id === key)!.max;
      let nextVal: number;

      if (current === null) {
        nextVal = delta > 0 ? 0.5 : 0.0;
      } else {
        nextVal = Math.round((current + delta) * 10) / 10;
      }

      if (nextVal < 0) nextVal = 0.0;
      if (nextVal > max) nextVal = max;

      return {
        ...prev,
        [key]: nextVal,
      };
    });
  };

  // Calculations
  const scoredCount = Object.values(scores).filter((v) => v !== null).length;
  const totalScore = Object.values(scores).reduce<number>((acc, v) => acc + (v !== null ? v : 0), 0);
  const totalMax = 10.0;
  const percent = Math.min(100, Math.round((totalScore / totalMax) * 100));
  const isComplete = scoredCount === 4;

  const handleSave = () => {
    onSaveDraft(project.id, {
      ...scores,
      comments,
    });
    showToast('Draft saved successfully');
  };

  const handleSubmit = () => {
    if (!isComplete) return;
    onSubmitEvaluation(project.id, {
      ...scores,
      comments,
    });
    showToast('Evaluation submitted and archived in KIET portal');
  };

  return (
    <div className="flex flex-col w-full max-w-[940px] mx-auto px-6 lg:px-10 py-8 pb-32">
      {/* Back Navigation Link */}
      <div className="mb-6">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 font-label-lg text-[13px] text-muted-text hover:text-kiet-orange transition-colors group cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px] transition-transform group-hover:-translate-x-1">
            arrow_back
          </span>
          <span>Assigned projects</span>
        </button>
      </div>

      {/* Header Section */}
      <header className="flex flex-col gap-2 mb-8">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-secondary-container font-eyebrow text-[11px] text-primary tracking-wider uppercase border border-secondary/30">
            FYP1 DEFENSE · 10 MARKS
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-outline-variant"></span>
          <span className="font-label-md text-[12px] text-muted-text font-medium">
            KIET Panel C · Hall C-2
          </span>
        </div>
        <h1 className="font-headline-lg text-[34px] sm:text-[36px] text-primary font-light tracking-tight mt-1">
          {project.title}
        </h1>
        <p className="font-body-lg text-[15px] text-muted-text">
          Score each criterion according to KIET rubrics and add jury feedback.
        </p>
      </header>

      {/* Institutional Advisory Banner */}
      <div className="bg-secondary-container/50 rounded-xl p-5 mb-8 flex items-center justify-between gap-4 shadow-xs border border-secondary/30">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-lg bg-secondary/15 flex items-center justify-center text-secondary shrink-0">
            <span className="material-symbols-outlined text-[24px]">verified_user</span>
          </div>
          <div className="flex flex-col">
            <span className="font-label-lg text-[13px] text-primary font-semibold">
              Institutional Privacy Protocol
            </span>
            <p className="font-body-md text-[13px] text-on-surface-variant leading-snug">
              Your marks are anonymous. Other jurors cannot see them and you cannot see theirs.
            </p>
          </div>
        </div>
        <span className="shrink-0 px-3 py-1 rounded-full bg-card-surface font-eyebrow text-[11px] text-kiet-orange shadow-xs tracking-wider uppercase border border-card-border font-bold">
          CONFIDENTIAL
        </span>
      </div>

      {/* Sticky/Floating Live Score Summary Bar */}
      <div className="sticky top-[88px] z-30 mb-8 bg-card-surface/95 backdrop-blur-md rounded-2xl p-5 shadow-sm border border-card-border transition-all">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <div className="flex flex-col">
              <span className="font-eyebrow text-[11px] text-muted-text uppercase tracking-wider">
                RUNNING TOTAL
              </span>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="font-big-number text-[32px] text-primary font-semibold leading-none">
                  {totalScore.toFixed(1)}
                </span>
                <span className="font-headline-sm text-[18px] text-muted-text">/ 10</span>
              </div>
            </div>

            <div className="h-10 w-px bg-card-border"></div>

            <div className="flex flex-col min-w-[200px]">
              <div className="flex justify-between items-center mb-1.5">
                <span className="font-label-md text-[12px] text-muted-text font-medium">
                  {scoredCount} of 4 criteria scored
                </span>
                <span className="font-label-md text-[12px] text-kiet-orange font-semibold">
                  {percent}%
                </span>
              </div>
              {/* Progress bar */}
              <div className="w-full h-2 rounded-full bg-surface-container-highest overflow-hidden">
                <div
                  className="h-full bg-kiet-orange rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${percent}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div
              className={`hidden sm:flex items-center gap-2 px-3 py-1 rounded-full font-label-md text-[12px] ${
                isComplete
                  ? 'bg-success-bg text-success-text'
                  : 'bg-warning-bg text-warning-text'
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  isComplete ? 'bg-success-text' : 'bg-warning-text animate-pulse'
                }`}
              ></span>
              <span>{isComplete ? 'All Criteria Scored' : 'Draft In Progress'}</span>
            </div>

            <button
              type="button"
              onClick={handleSave}
              className="px-4 py-2.5 rounded-lg bg-card-surface text-primary font-label-lg text-[13px] font-medium shadow-xs hover:bg-surface-container transition-colors flex items-center gap-2 border border-card-border cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px] text-muted-text">bookmark</span>
              <span>Save draft</span>
            </button>
          </div>
        </div>
      </div>

      {/* Rubric Card */}
      <section className="bg-card-surface rounded-[20px] p-7 mb-8 shadow-sm border border-card-border">
        <div className="flex items-start justify-between pb-6 mb-2">
          <div>
            <h2 className="font-headline-md text-[24px] font-medium text-primary tracking-tight">
              Rubric
            </h2>
            <p className="font-body-md text-[14px] text-muted-text mt-1">
              Grading calibrated per KIET College of Computing & Information Sciences FYP1 rubric.
            </p>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 bg-surface-container rounded-lg text-muted-text font-label-md text-[12px]">
            <span className="material-symbols-outlined text-[16px]">tune</span>
            <span>0.5 mark increments</span>
          </div>
        </div>

        {/* Rubric Rows Container */}
        <div className="flex flex-col gap-4">
          {CRITERIA.map((criterion) => {
            const val = scores[criterion.id];
            const isUnscored = val === null;

            return (
              <div
                key={criterion.id}
                className={`p-5 rounded-xl transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4 border ${
                  isUnscored
                    ? 'bg-warning-bg/30 hover:bg-warning-bg/50 border-warning-bg'
                    : 'bg-surface-container-low hover:bg-surface-container border-card-border'
                }`}
              >
                <div className="flex-1 pr-4">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-headline-sm text-[16px] font-semibold text-primary">
                      {criterion.title}
                    </h3>
                    <span className="px-2.5 py-0.5 rounded-full bg-surface-container-high text-muted-text font-label-md text-[12px] font-medium">
                      / {criterion.max} marks
                    </span>

                    {isUnscored && (
                      <span className="px-2.5 py-0.5 rounded-full bg-warning-bg text-warning-text font-label-md text-[12px] font-semibold flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">error</span>
                        Unscored · Requires rating
                      </span>
                    )}
                  </div>
                  <p className="font-body-md text-[13px] text-muted-text leading-relaxed">
                    {criterion.description}
                  </p>
                </div>

                <div className="flex items-center gap-4 shrink-0">
                  <div className="flex items-center bg-card-surface rounded-xl p-1 shadow-xs border border-card-border">
                    <button
                      type="button"
                      onClick={() => adjustScore(criterion.id, -0.5)}
                      className="w-10 h-10 rounded-lg flex items-center justify-center text-primary hover:bg-surface-container active:scale-95 transition-all text-xl font-bold select-none cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[20px]">remove</span>
                    </button>
                    <span
                      className={`w-12 text-center font-headline-sm text-[18px] font-semibold select-none ${
                        isUnscored ? 'text-muted-text' : 'text-primary'
                      }`}
                    >
                      {isUnscored ? '—' : val.toFixed(1)}
                    </span>
                    <button
                      type="button"
                      onClick={() => adjustScore(criterion.id, 0.5)}
                      className="w-10 h-10 rounded-lg flex items-center justify-center text-primary hover:bg-surface-container active:scale-95 transition-all text-xl font-bold select-none cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[20px]">add</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Overall Comments Card */}
      <section className="bg-card-surface rounded-[20px] p-7 shadow-sm mb-6 border border-card-border">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="font-headline-md text-[24px] font-medium text-primary tracking-tight">
              Overall comments
            </h2>
            <p className="font-body-md text-[14px] text-muted-text mt-0.5">
              Detailed remarks on the project's technical maturity, defense weaknesses, or commendable aspects.
            </p>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 bg-surface-container text-primary rounded-full font-label-md text-[12px] font-medium">
            <span className="material-symbols-outlined text-[16px] text-secondary">visibility_off</span>
            <span>Advisory Only</span>
          </div>
        </div>

        <div className="relative">
          <textarea
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            rows={5}
            placeholder="Enter comprehensive feedback, strengths, and areas requiring remediation before Final Defense..."
            className="w-full rounded-xl bg-surface-container p-4 font-body-md text-[14px] text-on-surface placeholder:text-muted-text focus:outline-none focus:bg-white focus:ring-2 focus:ring-kiet-orange/40 focus:border-kiet-orange transition-all resize-y min-h-[140px] border border-card-border"
          />
        </div>

        <div className="flex items-center gap-2 mt-3 text-muted-text font-label-md text-[12px]">
          <span className="material-symbols-outlined text-[16px]">lock</span>
          <span>Visible to the KIET Coordinator and supervisor only, not to students.</span>
        </div>
      </section>

      {/* Bottom Fixed Evaluation Action Bar */}
      <div className="fixed bottom-0 left-[260px] right-0 h-20 bg-card-surface/95 backdrop-blur-xl z-40 px-6 lg:px-10 flex items-center justify-between shadow-[0_-4px_20px_rgba(0,0,0,0.04)] border-t border-card-border">
        <div className="max-w-[940px] w-full mx-auto flex items-center justify-between">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-2 font-label-lg text-[13px] text-muted-text hover:text-primary transition-colors py-2 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            <span>Back to projects</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleSave}
              className="h-11 px-5 rounded-lg bg-card-surface text-primary font-label-lg text-[13px] font-semibold hover:bg-surface-container transition-colors shadow-xs flex items-center gap-2 border border-card-border cursor-pointer"
            >
              <span>Save draft</span>
            </button>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={!isComplete}
              className={`h-11 px-6 rounded-lg font-label-lg text-[13px] font-semibold transition-all flex items-center gap-2 ${
                isComplete
                  ? 'bg-kiet-navy text-white hover:bg-sidebar-navy-gradient cursor-pointer shadow-md'
                  : 'bg-surface-container-highest text-muted-text cursor-not-allowed'
              }`}
            >
              <span>Submit evaluation</span>
              <span className="material-symbols-outlined text-[18px] text-kiet-cyan">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
