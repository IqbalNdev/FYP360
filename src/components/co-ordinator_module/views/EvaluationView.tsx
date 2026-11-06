import { useState } from 'react';
import { initialEvaluations } from '../mockData';
import { EvaluationItem } from '../types';

interface EvaluationViewProps {
  onShowToast: (message: string) => void;
}

interface RubricCriterion {
  id: string;
  title: string;
  marks: number;
  evaluator: string;
  badge: string;
  desc: string;
}

export default function EvaluationView({ onShowToast }: EvaluationViewProps) {
  const [activeTab, setActiveTab] = useState<'results' | 'rubrics'>('results');
  const [evaluations, setEvaluations] = useState<EvaluationItem[]>(initialEvaluations);
  const [selectedIds, setSelectedIds] = useState<string[]>(['FYP-CS-2025-042']);
  const [verdict, setVerdict] = useState<'pass' | 'fail'>('pass');
  const [selectedProjectDetail, setSelectedProjectDetail] = useState<EvaluationItem | null>(null);

  // Rubrics state
  const [fyp1Criteria, setFyp1Criteria] = useState<RubricCriterion[]>([
    {
      id: 'c1',
      title: 'Defense /10 (Jury)',
      marks: 10,
      evaluator: 'Jury',
      badge: 'Summative',
      desc: 'Presentation clarity, Q&A defense, and individual contribution.',
    },
    {
      id: 'c2',
      title: 'Declaration & Literature Review /10 (Supervisor)',
      marks: 10,
      evaluator: 'Supervisor',
      badge: 'Formative',
      desc: 'Scope definition, literature survey completeness, and supervisor approval.',
    },
    {
      id: 'c3',
      title: 'Internal Evaluation /20 (Authorized internal evaluator)',
      marks: 20,
      evaluator: 'Authorized internal evaluator',
      badge: 'Milestone',
      desc: 'Interim deliverable milestones, prototype validation, and documentation.',
    },
  ]);

  const [fyp2Criteria, setFyp2Criteria] = useState<RubricCriterion[]>([
    {
      id: 'c4',
      title: 'Declaration /10',
      marks: 10,
      evaluator: 'Supervisor',
      badge: 'Milestone',
      desc: 'Final thesis scope declaration and initial prototype sign-off.',
    },
    {
      id: 'c5',
      title: 'Internal Evaluation /30',
      marks: 30,
      evaluator: 'Advisor & Committee',
      badge: 'Continuous',
      desc: 'Continuous milestone evaluations, advisor ratings, and testing deliverables.',
    },
    {
      id: 'c6',
      title: 'External Evaluation /20',
      marks: 20,
      evaluator: 'External Examiner',
      badge: 'Viva Voce',
      desc: 'Final defense presentation, project demonstration, and viva voce.',
    },
  ]);

  const [editingCriterion, setEditingCriterion] = useState<RubricCriterion | null>(null);

  const toggleSelect = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((item) => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const toggleSelectAll = () => {
    const selectable = evaluations.filter((e) => e.status.toLowerCase() !== 'incomplete').map((e) => e.id);
    if (selectedIds.length === selectable.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(selectable);
    }
  };

  const handlePublishMarks = () => {
    if (selectedIds.length === 0) {
      onShowToast('Please select at least one project to publish marks.');
      return;
    }
    setEvaluations((prev) =>
      prev.map((item) => (selectedIds.includes(item.id) ? { ...item, status: 'Published' } : item))
    );
    onShowToast(`Published evaluation marks for ${selectedIds.length} project(s).`);
  };

  const handleConfirmResults = () => {
    if (selectedIds.length === 0) {
      onShowToast('Please select at least one project to confirm official result.');
      return;
    }
    setEvaluations((prev) =>
      prev.map((item) => (selectedIds.includes(item.id) ? { ...item, status: 'Confirmed' } : item))
    );
    onShowToast(
      `Official FYP1 result confirmed as ${verdict.toUpperCase()} for ${selectedIds.length} project(s). FYP2 unlocked.`
    );
  };

  const handleSaveCriterion = (updated: RubricCriterion) => {
    setFyp1Criteria((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
    setFyp2Criteria((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
    setEditingCriterion(null);
    onShowToast(`Updated rubric criteria: ${updated.title}`);
  };

  return (
    <div className="flex flex-col w-full">
      <div className="w-full max-w-[1040px] mx-auto space-y-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-1">
            <span className="font-eyebrow text-[11px] text-[#FD7A12] tracking-widest uppercase font-bold block">
              OFFICIAL ACADEMIC RESULTS
            </span>
            <h1 className="font-headline-xl text-[#164783] tracking-tight">
              Evaluation
            </h1>
            <p className="font-body-md text-[#64748B] mt-1">
              {activeTab === 'results'
                ? 'Track marking, publish marks and confirm results.'
                : 'Configure rubrics and marking components.'}
            </p>
          </div>

          {activeTab === 'results' ? (
            <div className="flex items-center gap-3 bg-white px-4 py-2.5 rounded-xl border border-[#E2E8F0] shadow-xs">
              <div className="w-10 h-10 rounded-lg bg-[#FFF1E5] flex items-center justify-center text-[#FD7A12]">
                <span className="material-symbols-outlined text-[22px]">assignment_turned_in</span>
              </div>
              <div>
                <span className="font-label-md text-[#64748B] block leading-none">Cohort Progress</span>
                <span className="font-headline-sm text-[#002D71] font-semibold leading-tight">
                  48 / 52 Projects Scored
                </span>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3 bg-white rounded-xl px-4 py-2.5 shadow-xs border border-[#E2E8F0]">
              <div className="w-8 h-8 rounded-lg bg-[#FFF1E5] flex items-center justify-center text-[#FD7A12]">
                <span className="material-symbols-outlined text-[20px]">verified</span>
              </div>
              <div className="flex flex-col">
                <span className="font-label-md text-[#64748B] uppercase tracking-wider font-semibold text-[11px]">
                  Governance Schema
                </span>
                <span className="font-body-md text-[#002D71] font-medium text-xs">
                  Total: 100 marks across FYP1 &amp; FYP2
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Academic Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-[#E2E8F0] pb-px">
          <button
            onClick={() => setActiveTab('results')}
            className={`h-11 px-4 flex items-center gap-2 font-label-lg font-semibold transition-colors cursor-pointer ${
              activeTab === 'results'
                ? 'text-[#002D71] border-b-2 border-[#FD7A12]'
                : 'text-[#64748B] hover:text-[#1E293B]'
            }`}
          >
            <span
              className={`material-symbols-outlined text-[18px] ${
                activeTab === 'results' ? 'text-[#FD7A12]' : 'text-[#74777f]'
              }`}
            >
              rule_settings
            </span>
            Results &amp; publishing
          </button>
          <button
            onClick={() => setActiveTab('rubrics')}
            className={`h-11 px-4 flex items-center gap-2 font-label-lg font-semibold transition-colors cursor-pointer ${
              activeTab === 'rubrics'
                ? 'text-[#002D71] border-b-2 border-[#FD7A12]'
                : 'text-[#64748B] hover:text-[#1E293B]'
            }`}
          >
            <span
              className={`material-symbols-outlined text-[18px] ${
                activeTab === 'rubrics' ? 'text-[#FD7A12]' : 'text-[#74777f]'
              }`}
            >
              grading
            </span>
            Rubrics
          </button>
        </div>

        {/* TAB 1: RESULTS & PUBLISHING */}
        {activeTab === 'results' && (
          <div className="space-y-6">
            {/* Dark Navy Decision Banner */}
            <div className="bg-[#164783] rounded-[20px] p-4 px-6 flex items-center justify-between shadow-xs">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white shrink-0">
                  <span className="material-symbols-outlined text-[22px]">verified_user</span>
                </div>
                <p className="font-body-md text-white font-medium text-sm">
                  Marks are entered by authorized evaluators and remain unpublished until you release them.
                </p>
              </div>
              <div className="hidden md:flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-white/10 text-white font-label-md tracking-wide">
                  FYP1 Foundation Stage
                </span>
              </div>
            </div>

            {/* Marking & Evaluation Results Table Card */}
            <div className="bg-white rounded-[20px] border border-[#E2E8F0] shadow-xs overflow-hidden">
              {/* Card Toolbar */}
              <div className="p-5 border-b border-[#E2E8F0] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="font-headline-sm text-[#002D71] font-medium">
                    Project Submissions &amp; Evaluation Marks
                  </h2>
                  <p className="font-label-md text-[#64748B] mt-0.5">
                    Jury marks are shown as Juror A, Juror B, Juror C.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-label-md text-[#64748B] mr-1">Filter Cohort:</span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#f5f3f6] text-[#1E293B] font-label-md border border-[#E2E8F0]">
                    <span>BSCS Fall 2024</span>
                    <span className="material-symbols-outlined text-[16px] text-[#64748B]">arrow_drop_down</span>
                  </span>
                </div>
              </div>

              {/* Table Container */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[850px]">
                  <thead>
                    <tr className="bg-[#f5f3f6] text-[#64748B] uppercase font-eyebrow text-[11px] tracking-wider border-b border-[#E2E8F0]">
                      <th className="py-3 px-4 pl-6 w-12 text-center">
                        <input
                          aria-label="Select all projects"
                          type="checkbox"
                          checked={
                            selectedIds.length ===
                            evaluations.filter((e) => e.status.toLowerCase() !== 'incomplete').length
                          }
                          onChange={toggleSelectAll}
                          className="w-4 h-4 rounded border-[#CBD5E1] accent-[#002D71] cursor-pointer"
                        />
                      </th>
                      <th className="py-3 px-4 font-semibold">Group / Project</th>
                      <th className="py-3 px-4 font-semibold">
                        Defense (Jury) <span className="font-normal text-[#CBD5E1]">/10</span>
                      </th>
                      <th className="py-3 px-4 font-semibold">
                        Declaration &amp; Lit. Review <span className="font-normal text-[#CBD5E1]">/10</span>
                      </th>
                      <th className="py-3 px-4 font-semibold">
                        Internal Eval. <span className="font-normal text-[#CBD5E1]">/20</span>
                      </th>
                      <th className="py-3 px-4 font-semibold text-right">
                        Total <span className="font-normal text-[#CBD5E1]">/40</span>
                      </th>
                      <th className="py-3 px-4 font-semibold text-center">Status</th>
                      <th className="py-3 px-4 pr-6 font-semibold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E2E8F0]">
                    {evaluations.map((item) => {
                      const s = item.status.toLowerCase();
                      const isReady = s === 'ready';
                      const isPublished = s === 'published';
                      const isConfirmed = s === 'confirmed';
                      const isIncomplete = s === 'incomplete';

                      return (
                        <tr
                          key={item.id}
                          className={`hover:bg-[#F4F6F9]/60 transition-colors ${
                            selectedIds.includes(item.id) ? 'bg-[#FFF1E5]/20' : ''
                          }`}
                        >
                          <td className="py-4 px-4 pl-6 text-center align-middle">
                            <input
                              type="checkbox"
                              checked={selectedIds.includes(item.id)}
                              disabled={isIncomplete}
                              onChange={() => toggleSelect(item.id)}
                              className="w-4 h-4 rounded border-[#CBD5E1] accent-[#002D71] cursor-pointer disabled:opacity-40"
                            />
                          </td>
                          <td className="py-4 px-4 align-middle">
                            <div className="flex flex-col">
                              <span className="font-body-md font-medium text-[#002D71]">{item.title}</span>
                              <div className="flex items-center gap-1.5 mt-0.5">
                                <span className="font-label-md text-[#64748B] font-mono text-xs">{item.id}</span>
                                <span className="text-[#CBD5E1] text-xs">•</span>
                                <span className="font-label-md text-[#64748B] text-xs">Lead: {item.leadName}</span>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-4 align-middle">
                            <div className="font-body-md font-medium text-[#002D71]">
                              {item.defenseJury !== null ? item.defenseJury : '—'}
                              <span className="text-[#64748B] font-normal text-xs">/10</span>
                            </div>
                            <span
                              className={`font-label-md text-[11px] block leading-none mt-1 ${
                                item.defenseDetails?.includes('pending') ? 'text-[#C2392F]' : 'text-[#64748B]'
                              }`}
                            >
                              {item.defenseDetails}
                            </span>
                          </td>
                          <td className="py-4 px-4 align-middle">
                            <div className="font-body-md font-medium text-[#002D71]">
                              {item.declarationLit !== null ? item.declarationLit : '—'}
                              <span className="text-[#64748B] font-normal text-xs">/10</span>
                            </div>
                            <span className="font-label-md text-[11px] text-[#64748B] block leading-none mt-1">
                              {item.declarationDetails}
                            </span>
                          </td>
                          <td className="py-4 px-4 align-middle">
                            <div className="font-body-md font-medium text-[#002D71]">
                              {item.internalEval !== null ? item.internalEval : '—'}
                              <span className="text-[#64748B] font-normal text-xs">/20</span>
                            </div>
                          </td>
                          <td className="py-4 px-4 align-middle text-right">
                            <div
                              className={`font-headline-sm font-semibold ${
                                item.total !== null ? 'text-[#002D71]' : 'text-[#CBD5E1]'
                              }`}
                            >
                              {item.total !== null ? item.total : '—'}
                              <span className="text-[#64748B] font-normal text-xs"> / 40</span>
                            </div>
                          </td>
                          <td className="py-4 px-4 align-middle text-center">
                            {isReady && (
                              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-[#FFF4DF] text-[#B26B00]">
                                Ready
                              </span>
                            )}
                            {isPublished && (
                              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-[#FFF1E5] text-[#FD7A12]">
                                Published
                              </span>
                            )}
                            {isConfirmed && (
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-[#FFF1E5] text-[#FD7A12]">
                                <span className="material-symbols-outlined text-[14px]">check</span>
                                Confirmed
                              </span>
                            )}
                            {isIncomplete && (
                              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-[#e9e7eb] text-[#64748B]">
                                Incomplete
                              </span>
                            )}
                          </td>
                          <td className="py-4 px-4 pr-6 align-middle text-right">
                            <button
                              onClick={() => setSelectedProjectDetail(item)}
                              className="inline-flex items-center gap-1 font-label-md text-[#002D71] font-medium hover:text-[#FD7A12] transition-colors cursor-pointer"
                            >
                              Details <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Table Footer Metadata */}
              <div className="p-4 px-6 bg-[#f5f3f6] border-t border-[#E2E8F0] flex flex-col sm:flex-row sm:items-center justify-between text-[#64748B] text-xs">
                <span>Showing {evaluations.length} active groups in current evaluation period</span>
                <span className="font-medium">1 project pending juror submission</span>
              </div>
            </div>

            {/* Publishing & Official Confirmation Actions Card */}
            <div className="bg-white rounded-[20px] border border-[#E2E8F0] p-6 shadow-xs">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                {/* Left Side: Verdict Decision Controller */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div>
                    <span className="font-label-md text-[#64748B] block mb-1.5 font-medium">
                      Official Cohort Decision
                    </span>
                    <div
                      aria-label="Pass or Fail Verdict selector"
                      className="inline-flex items-center p-1 bg-[#F4F6F9] rounded-xl border border-[#E2E8F0]"
                      role="group"
                    >
                      <button
                        onClick={() => setVerdict('pass')}
                        className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                          verdict === 'pass'
                            ? 'bg-[#002D71] text-white shadow-xs'
                            : 'text-[#64748B] hover:text-[#002D71]'
                        }`}
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[16px]">check_circle</span>
                        Pass
                      </button>
                      <button
                        onClick={() => setVerdict('fail')}
                        className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                          verdict === 'fail'
                            ? 'bg-[#ba1a1a] text-white shadow-xs'
                            : 'text-[#64748B] hover:text-[#ba1a1a]'
                        }`}
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[16px]">cancel</span>
                        Fail
                      </button>
                    </div>
                  </div>
                  <div className="h-10 w-px bg-[#E2E8F0] hidden sm:block mx-2"></div>
                  <div className="flex items-center gap-1.5 text-[#64748B]">
                    <span className="material-symbols-outlined text-[20px] text-[#FD7A12]">info</span>
                    <span className="font-label-md text-xs">
                      {selectedIds.length} group{selectedIds.length === 1 ? '' : 's'} selected for batch action
                    </span>
                  </div>
                </div>

                {/* Right Side: Action Buttons */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                  <button
                    onClick={handlePublishMarks}
                    className="h-12 px-6 rounded-xl bg-white border border-[#E2E8F0] text-[#002D71] hover:bg-[#F4F6F9] font-label-lg font-medium transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                  >
                    <span className="material-symbols-outlined text-[18px]">send</span>
                    Publish marks
                  </button>
                  <button
                    onClick={handleConfirmResults}
                    className="h-12 px-6 rounded-xl bg-[#002D71] text-white hover:bg-[#164783] font-label-lg font-medium transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                  >
                    Confirm official FYP1 result
                    <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                  </button>
                </div>
              </div>

              {/* Institutional Lock Requirement Note */}
              <div className="mt-4 pt-4 border-t border-[#E2E8F0] flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-[#64748B]">lock</span>
                <p className="font-label-md text-[#64748B] text-xs">
                  FYP2 is locked until FYP1 is confirmed as Passed.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: RUBRICS */}
        {activeTab === 'rubrics' && (
          <div className="space-y-6">
            {/* Assessment Stage Distribution Metric Bar */}
            <div className="bg-white rounded-xl p-5 shadow-xs border border-[#E2E8F0] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <div className="flex flex-col">
                  <span className="font-label-md text-[#64748B] uppercase font-semibold text-[11px]">
                    Stage Distribution Ratio
                  </span>
                  <span className="font-headline-sm text-[#002D71] font-semibold">
                    40% Foundation / 60% Capstone
                  </span>
                </div>
              </div>
              <div className="w-full sm:max-w-md flex flex-col gap-1.5">
                <div className="h-3 w-full bg-[#efedf0] rounded-full overflow-hidden flex">
                  <div className="h-full bg-[#FD7A12] w-[40%]" title="FYP1: 40 Marks"></div>
                  <div className="h-full bg-[#002D71] w-[60%]" title="FYP2: 60 Marks"></div>
                </div>
                <div className="flex justify-between font-label-md text-[#64748B] text-xs">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#FD7A12]"></span>
                    FYP1 (40 Marks)
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#002D71]"></span>
                    FYP2 (60 Marks)
                  </span>
                </div>
              </div>
            </div>

            {/* Rubric Configuration Cards (2-Column Grid) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
              {/* CARD 1: FYP1 */}
              <div className="bg-white rounded-[20px] p-6 shadow-xs border border-[#E2E8F0] flex flex-col space-y-6">
                <div className="flex items-start justify-between pb-4 border-b border-[#E2E8F0]">
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-full bg-[#002D71] flex items-center justify-center text-white font-headline-sm font-semibold shadow-xs">
                      1
                    </div>
                    <div className="flex flex-col">
                      <span className="font-eyebrow text-[11px] text-[#FD7A12] uppercase tracking-wider font-bold">
                        FYP1 EVALUATION
                      </span>
                      <h2 className="font-headline-md text-[#002D71] font-medium tracking-tight">
                        FYP1 · 40 marks
                      </h2>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="px-3 py-1 rounded-full bg-[#FFF1E5] text-[#FD7A12] font-label-md font-semibold tracking-wide flex items-center gap-1 text-xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FD7A12]"></span>
                      Foundation Stage
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between px-4 py-2.5 rounded-lg bg-[#f5f3f6] text-[#1E293B]">
                  <span className="font-label-md text-[#64748B] font-medium text-xs">Cumulative Allocation</span>
                  <span className="font-body-md font-semibold text-[#002D71] text-xs">40 / 100 total marks</span>
                </div>

                <div className="space-y-3">
                  {fyp1Criteria.map((c) => (
                    <div
                      key={c.id}
                      className="p-4 rounded-xl bg-[#f5f3f6]/70 hover:bg-[#f5f3f6] transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-[#E2E8F0]/60"
                    >
                      <div className="flex flex-col space-y-1">
                        <div className="flex items-center flex-wrap gap-2">
                          <span className="font-body-md text-[#002D71] font-semibold text-sm">{c.title}</span>
                          <span className="font-label-md px-2 py-0.5 rounded bg-white text-[#64748B] font-medium shadow-xs text-xs">
                            {c.badge}
                          </span>
                        </div>
                        <p className="font-body-md text-[#64748B] text-xs leading-relaxed">{c.desc}</p>
                      </div>
                      <button
                        onClick={() => setEditingCriterion(c)}
                        className="self-start sm:self-center shrink-0 px-3 py-1.5 rounded-lg bg-white text-[#002D71] hover:bg-[#efedf0] text-xs font-label-lg shadow-xs font-medium transition-colors flex items-center gap-1.5 border border-[#E2E8F0] cursor-pointer"
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[16px] text-[#64748B]">tune</span>
                        Edit criteria
                      </button>
                    </div>
                  ))}
                </div>

                <div className="pt-2 flex items-center justify-between text-[#64748B] font-label-md text-xs border-t border-[#E2E8F0]">
                  <span className="flex items-center gap-1 text-[#FD7A12]">
                    <span className="material-symbols-outlined text-[16px]">check_circle</span>
                    All 3 criteria rubrics validated
                  </span>
                  <span className="font-mono text-xs">Weight: 40%</span>
                </div>
              </div>

              {/* CARD 2: FYP2 */}
              <div className="bg-white rounded-[20px] p-6 shadow-xs border border-[#E2E8F0] flex flex-col space-y-6">
                <div className="flex items-start justify-between pb-4 border-b border-[#E2E8F0]">
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-full bg-[#164783] flex items-center justify-center text-white font-headline-sm font-semibold shadow-xs">
                      2
                    </div>
                    <div className="flex flex-col">
                      <span className="font-eyebrow text-[11px] text-[#FD7A12] uppercase tracking-wider font-bold">
                        FYP2 EVALUATION
                      </span>
                      <h2 className="font-headline-md text-[#002D71] font-medium tracking-tight">
                        FYP2 · 60 marks
                      </h2>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="px-3 py-1 rounded-full bg-[#EAF5FC] text-[#002D71] font-label-md font-semibold tracking-wide flex items-center gap-1 text-xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#002D71]"></span>
                      Final Stage
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between px-4 py-2.5 rounded-lg bg-[#f5f3f6] text-[#1E293B]">
                  <span className="font-label-md text-[#64748B] font-medium text-xs">Cumulative Allocation</span>
                  <span className="font-body-md font-semibold text-[#002D71] text-xs">60 / 100 total marks</span>
                </div>

                <div className="space-y-3">
                  {fyp2Criteria.map((c) => (
                    <div
                      key={c.id}
                      className="p-4 rounded-xl bg-[#f5f3f6]/70 hover:bg-[#f5f3f6] transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-[#E2E8F0]/60"
                    >
                      <div className="flex flex-col space-y-1">
                        <div className="flex items-center flex-wrap gap-2">
                          <span className="font-body-md text-[#002D71] font-semibold text-sm">{c.title}</span>
                          <span className="font-label-md px-2 py-0.5 rounded bg-white text-[#64748B] font-medium shadow-xs text-xs">
                            {c.badge}
                          </span>
                        </div>
                        <p className="font-body-md text-[#64748B] text-xs leading-relaxed">{c.desc}</p>
                      </div>
                      <button
                        onClick={() => setEditingCriterion(c)}
                        className="self-start sm:self-center shrink-0 px-3 py-1.5 rounded-lg bg-white text-[#002D71] hover:bg-[#efedf0] text-xs font-label-lg shadow-xs font-medium transition-colors flex items-center gap-1.5 border border-[#E2E8F0] cursor-pointer"
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[16px] text-[#64748B]">tune</span>
                        Edit criteria
                      </button>
                    </div>
                  ))}
                </div>

                <div className="pt-2 flex items-center justify-between text-[#64748B] font-label-md text-xs border-t border-[#E2E8F0]">
                  <span className="flex items-center gap-1 text-[#FD7A12]">
                    <span className="material-symbols-outlined text-[16px]">check_circle</span>
                    All 3 criteria rubrics validated
                  </span>
                  <span className="font-mono text-xs">Weight: 60%</span>
                </div>
              </div>
            </div>

            {/* Institutional Advisory Banner */}
            <div className="p-4 rounded-xl bg-[#FFF1E5] text-[#1E293B] flex items-center gap-3 border border-[#FD7A12]/20">
              <span className="material-symbols-outlined text-[#FD7A12] text-[22px] shrink-0">info</span>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between w-full gap-2">
                <span className="font-body-md text-[#1E293B] text-xs">
                  Sample marking structure, configurable by the institution.
                </span>
                <span className="font-eyebrow text-[11px] text-[#FD7A12] uppercase tracking-wider whitespace-nowrap font-bold">
                  Academic Policy Compliance
                </span>
              </div>
            </div>

            {/* Global Action Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
              <button
                onClick={() => onShowToast('Add evaluation component dialog (Customizable per department).')}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-white text-[#002D71] hover:bg-[#efedf0] font-label-lg text-xs font-medium shadow-xs transition-colors flex items-center justify-center gap-2 border border-[#E2E8F0] cursor-pointer"
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]">add_circle</span>
                Add evaluation component
              </button>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={() => onShowToast('Rubric changes discarded.')}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-white text-[#64748B] hover:text-[#1E293B] font-label-lg text-xs font-medium shadow-xs transition-colors border border-[#E2E8F0] cursor-pointer"
                  type="button"
                >
                  Discard changes
                </button>
                <button
                  onClick={() => onShowToast('Rubric schema saved successfully for AY 2024–2025.')}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#002D71] text-white hover:bg-[#164783] font-label-lg text-xs font-semibold shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  type="button"
                >
                  <span>Save rubric changes</span>
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Details Modal */}
      {selectedProjectDetail && (
        <div className="fixed inset-0 z-50 bg-[#002D71]/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-[24px] p-6 shadow-2xl max-w-lg w-full flex flex-col border border-[#E2E8F0]">
            <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
              <div>
                <h3 className="font-headline-sm text-[#002D71] font-semibold">Evaluation Breakdown</h3>
                <span className="text-xs text-[#64748B] font-mono">{selectedProjectDetail.id}</span>
              </div>
              <button
                onClick={() => setSelectedProjectDetail(null)}
                className="p-1 rounded-lg hover:bg-[#efedf0] text-[#64748B] cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            <div className="py-4 space-y-3">
              <div className="p-3 bg-[#f5f3f6] rounded-xl">
                <span className="text-xs text-[#64748B] uppercase font-bold tracking-wider">Project</span>
                <p className="font-medium text-[#002D71] text-sm mt-0.5">{selectedProjectDetail.title}</p>
                <p className="text-xs text-[#64748B] mt-0.5">Student Lead: {selectedProjectDetail.leadName}</p>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between p-2 rounded-lg bg-[#faf9fc]">
                  <span className="text-[#64748B]">Defense (Jury /10):</span>
                  <span className="font-semibold text-[#002D71]">{selectedProjectDetail.defenseJury ?? 'Pending'}</span>
                </div>
                <div className="flex justify-between p-2 rounded-lg bg-[#faf9fc]">
                  <span className="text-[#64748B]">Declaration &amp; Lit. Review (/10):</span>
                  <span className="font-semibold text-[#002D71]">{selectedProjectDetail.declarationLit ?? 'Pending'}</span>
                </div>
                <div className="flex justify-between p-2 rounded-lg bg-[#faf9fc]">
                  <span className="text-[#64748B]">Internal Evaluation (/20):</span>
                  <span className="font-semibold text-[#002D71]">{selectedProjectDetail.internalEval ?? 'Pending'}</span>
                </div>
                <div className="flex justify-between p-3 rounded-lg bg-[#FFF1E5] text-[#FD7A12] font-bold text-sm">
                  <span>Total FYP1 Score:</span>
                  <span>{selectedProjectDetail.total !== null ? `${selectedProjectDetail.total} / 40` : 'Incomplete'}</span>
                </div>
              </div>
            </div>
            <div className="flex justify-end pt-2 border-t border-[#E2E8F0]">
              <button
                onClick={() => setSelectedProjectDetail(null)}
                className="px-4 py-2 rounded-lg bg-[#002D71] text-white text-xs font-medium cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Criteria Modal */}
      {editingCriterion && (
        <div className="fixed inset-0 z-50 bg-[#002D71]/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-[24px] p-6 shadow-2xl max-w-md w-full flex flex-col border border-[#E2E8F0]">
            <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
              <h3 className="font-headline-sm text-[#002D71] font-semibold">Edit Rubric Criteria</h3>
              <button
                onClick={() => setEditingCriterion(null)}
                className="p-1 rounded-lg hover:bg-[#efedf0] text-[#64748B] cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            <div className="py-4 space-y-3 text-xs">
              <div>
                <label className="font-medium text-[#1E293B] block mb-1">Criterion Title &amp; Weight</label>
                <input
                  type="text"
                  value={editingCriterion.title}
                  onChange={(e) => setEditingCriterion({ ...editingCriterion, title: e.target.value })}
                  className="w-full h-10 px-3 rounded-lg bg-[#faf9fc] border border-[#E2E8F0] text-[#1E293B]"
                />
              </div>
              <div>
                <label className="font-medium text-[#1E293B] block mb-1">Description &amp; Rubric Guide</label>
                <textarea
                  rows={3}
                  value={editingCriterion.desc}
                  onChange={(e) => setEditingCriterion({ ...editingCriterion, desc: e.target.value })}
                  className="w-full p-2.5 rounded-lg bg-[#faf9fc] border border-[#E2E8F0] text-[#1E293B]"
                />
              </div>
              <div>
                <label className="font-medium text-[#1E293B] block mb-1">Evaluator Category</label>
                <input
                  type="text"
                  value={editingCriterion.evaluator}
                  onChange={(e) => setEditingCriterion({ ...editingCriterion, evaluator: e.target.value })}
                  className="w-full h-10 px-3 rounded-lg bg-[#faf9fc] border border-[#E2E8F0] text-[#1E293B]"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2 border-t border-[#E2E8F0]">
              <button
                onClick={() => setEditingCriterion(null)}
                className="px-4 py-2 rounded-lg bg-[#efedf0] text-[#1E293B] text-xs font-medium cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => handleSaveCriterion(editingCriterion)}
                className="px-4 py-2 rounded-lg bg-[#002D71] text-white text-xs font-medium cursor-pointer"
              >
                Apply Criteria
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
