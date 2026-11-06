import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  ArrowLeft,
  CheckCircle2,
  Award,
  ShieldCheck,
  MessageSquare,
  FileCheck2
} from 'lucide-react';

export const EvaluationBreakdownScreen: React.FC = () => {
  const {
    setCurrentScreen,
    evaluationItems,
    coordinatorConfirmedFYP1,
    toggleCoordinatorConfirmation
  } = useApp();

  const totalObtained = evaluationItems.reduce((acc, curr) => acc + curr.obtainedMarks, 0);

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16 animate-in fade-in duration-150">
      {/* Top Breadcrumb */}
      <div>
        <button
          onClick={() => setCurrentScreen('student-evaluation')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#002D71] hover:text-[#01B0F1] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Evaluation overview</span>
        </button>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="text-[11px] font-bold text-[#64748B] tracking-widest uppercase">
            FYP1 · 40 MARKS
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#1E293B] mt-0.5">
            FYP1 Evaluation Breakdown
          </h1>
          <p className="text-sm text-[#64748B]">
            Only officially published marks are visible as obtained results.
          </p>
        </div>

        <div className="text-right">
          <div className="text-xs text-[#64748B]">Published total</div>
          <div className="text-2xl font-bold font-mono text-[#002D71]">{totalObtained} / 40</div>
        </div>
      </div>

      {/* Structured Rubrics Table */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-[#1E293B] font-semibold">
              <tr>
                <th className="py-3.5 px-5">EVALUATION TITLE</th>
                <th className="py-3.5 px-4 text-center">MAXIMUM MARKS</th>
                <th className="py-3.5 px-4 text-center">OBTAINED MARKS</th>
                <th className="py-3.5 px-4">EVALUATOR ROLE</th>
                <th className="py-3.5 px-4 text-right">STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {evaluationItems.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50">
                  <td className="py-3.5 px-5 font-semibold text-slate-900">{item.title}</td>
                  <td className="py-3.5 px-4 text-center font-mono text-slate-500">{item.maxMarks}</td>
                  <td className="py-3.5 px-4 text-center font-mono font-bold text-[#002D71]">
                    {item.obtainedMarks} / {item.maxMarks}
                  </td>
                  <td className="py-3.5 px-4 text-slate-600">{item.evaluatorRole}</td>
                  <td className="py-3.5 px-4 text-right">
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#DCFCE7] text-[#15803D]">
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}

              {/* Total Row */}
              <tr className="bg-slate-50/70 font-semibold border-t-2 border-slate-200">
                <td className="py-3.5 px-5 text-slate-900">Total Obtained Marks</td>
                <td className="py-3.5 px-4 text-center font-mono text-slate-700">40</td>
                <td className="py-3.5 px-4 text-center font-mono font-bold text-base text-[#002D71]">
                  {totalObtained} / 40
                </td>
                <td colSpan={2} className="py-3.5 px-4 text-right text-[11px] text-[#64748B]">
                  Automatically calculated from published components
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 3 Evaluator Feedback Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {evaluationItems.map((item, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl border border-[#E2E8F0] p-5 shadow-xs flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-3">
                <h4 className="text-xs font-bold text-slate-900">{item.title}</h4>
                <span className="px-2 py-0.5 bg-slate-100 rounded text-[10px] font-medium text-slate-600">
                  {item.evaluatorRole.split(' ')[0]}
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed italic bg-slate-50 p-3 rounded-lg border border-slate-200">
                "{item.feedback}"
              </p>
            </div>

            <div className="mt-4 pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-400">Awarded score</span>
              <span className="font-mono font-bold text-[#002D71]">
                {item.obtainedMarks} / {item.maxMarks}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Official Confirmation Banner */}
      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <CheckCircle2
            className={`w-5 h-5 shrink-0 ${
              coordinatorConfirmedFYP1 ? 'text-emerald-600' : 'text-[#B26B00]'
            }`}
          />
          <div>
            <div className="text-xs font-bold text-slate-900">
              Official FYP1 result:{' '}
              <span
                className={coordinatorConfirmedFYP1 ? 'text-emerald-700' : 'text-[#B26B00]'}
              >
                {coordinatorConfirmedFYP1
                  ? 'Confirmed (Passed)'
                  : 'Awaiting Coordinator Confirmation'}
              </span>
            </div>
            <div className="text-[11px] text-slate-500 mt-0.5">
              The Coordinator confirms the official result. FYP2 unlocks only after FYP1 is
              officially marked as Passed.
            </div>
          </div>
        </div>

        <button
          onClick={toggleCoordinatorConfirmation}
          className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 self-start sm:self-auto shrink-0 transition-colors"
        >
          {coordinatorConfirmedFYP1 ? 'Reset Confirmation' : 'Simulate Confirm'}
        </button>
      </div>
    </div>
  );
};
