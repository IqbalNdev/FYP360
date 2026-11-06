import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Award,
  CheckCircle2,
  Lock,
  ArrowRight,
  ShieldAlert,
  FileCheck2,
  HelpCircle
} from 'lucide-react';

export const EvaluationResultsScreen: React.FC = () => {
  const {
    setCurrentScreen,
    evaluationItems,
    coordinatorConfirmedFYP1,
    toggleCoordinatorConfirmation
  } = useApp();

  const [lockModalOpen, setLockModalOpen] = useState(false);

  const totalObtained = evaluationItems.reduce((acc, curr) => acc + curr.obtainedMarks, 0);

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16 animate-in fade-in duration-150">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="text-[11px] font-bold text-[#64748B] tracking-widest uppercase">
            OFFICIAL ACADEMIC RESULTS
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#1E293B] mt-0.5">
            Evaluation & Results
          </h1>
          <p className="text-sm text-[#64748B]">
            Review officially released marks across the university's FYP1 and FYP2 structure.
          </p>
        </div>

        <div className="text-right">
          <div className="text-xs text-[#64748B]">Complete FYP evaluation</div>
          <div className="text-xl font-bold font-mono text-[#002D71]">100 marks</div>
        </div>
      </div>

      {/* Official Notice Banner */}
      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
        <div className="text-xs text-slate-700 leading-relaxed">
          Marks are entered by authorized evaluators and remain unpublished until officially
          released by the FYP Coordinator.
        </div>
      </div>

      {/* 2 Main Cards: FYP1 vs FYP2 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* FYP1 Card */}
        <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-3">
              <div className="w-8 h-8 rounded-lg bg-[#002D71] text-white flex items-center justify-center font-bold text-sm">
                1
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#DCFCE7] text-[#15803D]">
                Published
              </span>
            </div>

            <div className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider">
              FYP1 EVALUATION
            </div>
            <h3 className="text-lg font-bold text-[#1E293B] mt-0.5">
              Foundation & Internal Review
            </h3>

            <div className="my-5">
              <div className="text-3xl font-bold font-mono text-[#002D71]">
                {totalObtained} <span className="text-base font-normal text-slate-500">/ 40 marks</span>
              </div>
            </div>

            <div className="space-y-2 border-t border-slate-100 pt-3 text-xs">
              <div className="flex items-center justify-between py-1 border-b border-slate-50">
                <span className="text-slate-600">Defense</span>
                <span className="font-mono font-bold text-slate-800">8 / 10</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-slate-50">
                <span className="text-slate-600">Declaration & Literature Review</span>
                <span className="font-mono font-bold text-slate-800">9 / 10</span>
              </div>
              <div className="flex items-center justify-between py-1">
                <span className="text-slate-600">Internal Evaluation</span>
                <span className="font-mono font-bold text-slate-800">17 / 20</span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100">
              <div className="text-[11px] text-slate-500">Official result</div>
              <div className="text-xs font-bold text-[#B26B00] mt-0.5">
                {coordinatorConfirmedFYP1
                  ? 'Official Result: Passed by Coordinator'
                  : 'Awaiting Coordinator Confirmation'}
              </div>
            </div>
          </div>

          <div className="mt-6 pt-3">
            <button
              onClick={() => setCurrentScreen('student-evaluation-breakdown')}
              className="w-full py-2.5 bg-[#002D71] text-white text-xs font-semibold rounded-lg hover:bg-[#003B85] flex items-center justify-center gap-1.5 transition-colors shadow-xs"
            >
              <span>View Detailed Breakdown</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* FYP2 Card */}
        <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-3">
              <div className="w-8 h-8 rounded-lg bg-slate-200 text-slate-600 flex items-center justify-center font-bold text-sm">
                2
              </div>
              <span
                className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                  coordinatorConfirmedFYP1
                    ? 'bg-[#DCFCE7] text-[#15803D]'
                    : 'bg-slate-100 text-slate-600'
                }`}
              >
                {coordinatorConfirmedFYP1 ? 'Unlocked' : 'Locked'}
              </span>
            </div>

            <div className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider">
              FYP2 EVALUATION
            </div>
            <h3 className="text-lg font-bold text-[#1E293B] mt-0.5">Final Project Evaluation</h3>

            <div className="my-5">
              <div className="text-3xl font-bold font-mono text-slate-400">
                — <span className="text-base font-normal text-slate-500">/ 60 marks</span>
              </div>
            </div>

            <div className="space-y-2 border-t border-slate-100 pt-3 text-xs">
              <div className="flex items-center justify-between py-1 border-b border-slate-50">
                <span className="text-slate-600">FYP2 Declaration</span>
                <span className="font-mono text-slate-400">/ 10</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-slate-50">
                <span className="text-slate-600">Internal Evaluation</span>
                <span className="font-mono text-slate-400">/ 30</span>
              </div>
              <div className="flex items-center justify-between py-1">
                <span className="text-slate-600">External Evaluation</span>
                <span className="font-mono text-slate-400">/ 20</span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100">
              <div className="text-[11px] text-slate-500">Progression status</div>
              <div className="text-xs font-bold text-slate-800 mt-0.5">
                {coordinatorConfirmedFYP1
                  ? 'Eligible to begin Semester 2 Implementation'
                  : 'Awaiting Coordinator Confirmation'}
              </div>
            </div>
          </div>

          <div className="mt-6 pt-3">
            <button
              onClick={() => setLockModalOpen(true)}
              className="w-full py-2.5 bg-slate-50 border border-slate-300 text-slate-700 text-xs font-semibold rounded-lg hover:bg-slate-100 flex items-center justify-center gap-1.5 transition-colors"
            >
              <span>View Lock Requirements</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Lock Requirements Modal */}
      {lockModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in fade-in duration-150">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#1E293B]">FYP2 Unlock Requirements</h3>
                <p className="text-xs text-[#64748B]">Institutional Progression Policy</p>
              </div>
            </div>

            <div className="space-y-2 text-xs text-slate-600 bg-slate-50 p-4 rounded-xl border border-slate-200 leading-relaxed">
              <p>
                1. <strong>Passing Grade in FYP1:</strong> Minimum of 20 out of 40 obtained marks across all published components.
              </p>
              <p>
                2. <strong>Coordinator Formal Approval:</strong> Official results release confirmation authorized by the FYP department committee.
              </p>
              <p>
                3. <strong>Supervisor Milestone Sign-off:</strong> All Milestone 1 to 4 deliverable packages accepted.
              </p>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <button
                onClick={toggleCoordinatorConfirmation}
                className="text-xs font-semibold text-[#002D71] hover:underline"
              >
                [Admin Simulator: Toggle Pass Confirmation]
              </button>

              <button
                onClick={() => setLockModalOpen(false)}
                className="px-4 py-2 bg-[#002D71] text-white text-xs font-semibold rounded-lg hover:bg-[#003B85]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
