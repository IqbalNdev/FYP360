import React from 'react';
import { SupervisedProject } from '../../types';

interface RiskReasonsModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: SupervisedProject | null;
  onTakeAction?: () => void;
}

export const RiskReasonsModal: React.FC<RiskReasonsModalProps> = ({
  isOpen,
  onClose,
  project,
  onTakeAction,
}) => {
  if (!isOpen || !project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#001F52]/40 backdrop-blur-[3px] transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative bg-white rounded-[24px] max-w-lg w-full p-6 shadow-2xl border border-[#E2E8F0] z-10 flex flex-col gap-5 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                project.healthStatus === 'At risk'
                  ? 'bg-[#FEE2E2] text-[#DC2626]'
                  : 'bg-[#FEF3C7] text-[#F59E0B]'
              }`}
            >
              <span className="material-symbols-outlined text-[22px]">
                {project.healthStatus === 'At risk' ? 'warning' : 'visibility'}
              </span>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-[#002D71]">
                Health Score Analysis: {project.healthScore} ({project.healthStatus})
              </h2>
              <p className="text-xs text-[#475569] truncate max-w-sm">
                {project.name}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-[#475569] hover:bg-slate-100 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Rule Factors */}
        <div className="flex flex-col gap-3">
          <div className="p-3.5 rounded-xl bg-[#F4F6F9] border border-[#E2E8F0] flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#1E293B]">
                Milestone Deliverable Compliance
              </span>
              <span
                className={`text-xs font-semibold ${
                  project.overdueTasks > 0 ? 'text-[#DC2626]' : 'text-[#16A34A]'
                }`}
              >
                {project.overdueTasks > 0
                  ? `${project.overdueTasks} Overdue Task`
                  : 'On Schedule'}
              </span>
            </div>
            <p className="text-xs text-[#475569]">
              Calculated from scheduled milestone cutoff deadlines versus recorded student uploads.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-[#F4F6F9] border border-[#E2E8F0] flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#1E293B]">
                Check-in Meeting Cadence
              </span>
              <span
                className={`text-xs font-semibold ${
                  project.missedCheckIns > 0
                    ? 'text-[#B45309]'
                    : 'text-[#16A34A]'
                }`}
              >
                {project.missedCheckIns > 0
                  ? `${project.missedCheckIns} Missed Meeting Check-in`
                  : 'Up to Date'}
              </span>
            </div>
            <p className="text-xs text-[#475569]">
              KIET academic policy mandates at least bi-weekly supervisor consultation meetings.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-[#F4F6F9] border border-[#E2E8F0] flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#1E293B]">
                On-time Submission Rate
              </span>
              <span className="text-xs font-semibold text-[#002D71]">
                {project.onTimeRate}%
              </span>
            </div>
            <p className="text-xs text-[#475569]">
              Historical punctuality ratio across FYP milestone submission intervals.
            </p>
          </div>

          {/* Advisory Policy Box */}
          <div className="p-3 bg-[#E0F2FE]/70 border border-[#01B0F1]/30 rounded-xl flex items-center gap-2.5 text-xs text-[#002D71]">
            <span className="material-symbols-outlined text-[#01B0F1] text-[18px] shrink-0">
              verified_user
            </span>
            <span>
              Advisory health calculations provide guidance for proactive intervention and never replace official supervisor evaluation.
            </span>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#E2E8F0]">
          <button
            type="button"
            onClick={onClose}
            className="px-4 h-10 rounded-xl bg-white border border-[#E2E8F0] hover:bg-slate-50 text-xs font-semibold text-[#475569] cursor-pointer"
          >
            Dismiss
          </button>
          {onTakeAction && (
            <button
              type="button"
              onClick={() => {
                onClose();
                onTakeAction();
              }}
              className="px-5 h-10 rounded-xl bg-[#002D71] hover:bg-[#003B8F] text-white text-xs font-semibold transition-colors shadow-sm cursor-pointer"
            >
              Contact Team Lead
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
