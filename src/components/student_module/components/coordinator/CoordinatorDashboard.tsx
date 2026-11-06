import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  FolderGit2,
  Award,
  Layers,
  ArrowRight,
  Sparkles,
  Lock,
  Unlock
} from 'lucide-react';

export const CoordinatorDashboard: React.FC = () => {
  const {
    coordinatorConfirmedFYP1,
    toggleCoordinatorConfirmation,
    evaluationItems,
    setCurrentScreen,
    showToast
  } = useApp();

  const totalMarks = evaluationItems.reduce((acc, curr) => acc + curr.obtainedMarks, 0);

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16 animate-in fade-in duration-150">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="text-[11px] font-bold text-[#64748B] tracking-widest uppercase">
            FYP COORDINATOR PROGRAM ADMINISTRATION
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#1E293B] mt-0.5">
            Capstone Program Overview
          </h1>
          <p className="text-sm text-[#64748B]">
            Official approvals, academic cohort progression, and results publishing for Spring 2025.
          </p>
        </div>

        <button
          onClick={() => setCurrentScreen('student-dashboard')}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#002D71] text-white text-xs font-semibold rounded-lg hover:bg-[#003B85] transition-colors shadow-xs"
        >
          <span>Preview Student View</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Program Statistics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-[#E2E8F0] p-4 shadow-xs">
          <span className="text-xs text-[#64748B] block">Total Registered Groups</span>
          <span className="text-2xl font-bold font-mono text-[#002D71] mt-1 block">42</span>
          <span className="text-[11px] text-slate-400">168 Final Year Students</span>
        </div>

        <div className="bg-white rounded-xl border border-[#E2E8F0] p-4 shadow-xs">
          <span className="text-xs text-[#64748B] block">Proposals Approved</span>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-2xl font-bold font-mono text-emerald-600">39</span>
            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
          </div>
          <span className="text-[11px] text-slate-400">3 Pending Revisions</span>
        </div>

        <div className="bg-white rounded-xl border border-[#E2E8F0] p-4 shadow-xs">
          <span className="text-xs text-[#64748B] block">Supervisors Allocated</span>
          <span className="text-2xl font-bold font-mono text-[#1E293B] mt-1 block">14</span>
          <span className="text-[11px] text-slate-400">Capacity 88% Utilized</span>
        </div>

        <div className="bg-white rounded-xl border border-[#E2E8F0] p-4 shadow-xs">
          <span className="text-xs text-[#64748B] block">FYP1 Defense Status</span>
          <span className="text-2xl font-bold font-mono text-[#01B0F1] mt-1 block">
            {coordinatorConfirmedFYP1 ? 'Published' : 'Under Review'}
          </span>
          <span className="text-[11px] text-slate-400">Coordinator verification</span>
        </div>
      </div>

      {/* Official Results Confirmation Control Card */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-[#002D71]" />
            <h3 className="text-base font-bold text-[#1E293B]">
              Official FYP1 Results Confirmation & Release
            </h3>
          </div>
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${
              coordinatorConfirmedFYP1
                ? 'bg-[#DCFCE7] text-[#15803D]'
                : 'bg-[#FFF4DF] text-[#B26B00]'
            }`}
          >
            {coordinatorConfirmedFYP1 ? 'Status: Officially Passed' : 'Status: Awaiting Confirmation'}
          </span>
        </div>

        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h4 className="text-sm font-bold text-slate-900">
              Batch 2025 - CS-042: AI-Powered Career Guidance (Lead: Ayesha Khan)
            </h4>
            <p className="text-xs text-slate-600 mt-1">
              Current Obtained Marks: <strong className="text-[#002D71]">{totalMarks} / 40</strong>{' '}
              (Defense: 8/10, Lit Review: 9/10, Internal: 17/20).
            </p>
            <p className="text-xs text-slate-500 mt-1">
              Confirming this release officially passes FYP1 for this cohort and unlocks FYP2
              execution, declaration, and mid-term evaluations.
            </p>
          </div>

          <button
            onClick={toggleCoordinatorConfirmation}
            className={`px-5 py-2.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all shrink-0 shadow-xs ${
              coordinatorConfirmedFYP1
                ? 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                : 'bg-[#15803D] text-white hover:bg-emerald-700'
            }`}
          >
            {coordinatorConfirmedFYP1 ? (
              <>
                <Lock className="w-4 h-4" />
                <span>Revoke & Lock FYP2</span>
              </>
            ) : (
              <>
                <Unlock className="w-4 h-4" />
                <span>Confirm & Unlock FYP2</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
