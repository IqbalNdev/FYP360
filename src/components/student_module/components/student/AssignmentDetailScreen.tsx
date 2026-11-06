import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ArrowLeft,
  CheckCircle2,
  Calendar,
  User,
  Clock,
  FileText,
  Upload,
  MessageSquare,
  ShieldAlert,
  AlertTriangle,
  X,
  FileCheck,
  Check,
  Download
} from 'lucide-react';

export const AssignmentDetailScreen: React.FC = () => {
  const {
    milestones,
    activeMilestoneId,
    activeTaskId,
    setCurrentScreen,
    reviewSubmission,
    simulateDeadlineExpiry,
    showToast
  } = useApp();

  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  const milestone = milestones.find((m) => m.id === activeMilestoneId) || milestones[0];
  const task =
    milestone.tasks.find((t) => t.id === activeTaskId) ||
    milestone.tasks[0] || {
      id: 'M1-T1',
      milestoneId: 1,
      title: 'Finalize approved project proposal',
      description: 'Incorporate panel comments and prepare the approved proposal baseline.',
      instructions: 'Use the departmental proposal template and address every annotated comment.',
      requiredDeliverables: ['Final proposal PDF', 'Signed approval page'],
      meetingDate: 'Aug 8, 2026, 10:00 AM',
      deadline: 'Aug 15, 2026, 5:00 PM',
      status: 'completed' as const,
      assignedBy: 'Dr. Ahmed Rahman',
      submission: {
        fileName: 'approved-proposal.pdf',
        submittedAt: 'Aug 13, 2026, 2:00 PM',
        fileSize: '2.4 MB',
        note: 'Updated after panel feedback.',
        isOnTime: true,
        status: 'accepted' as const,
      },
      supervisorFeedback: {
        feedbackText:
          'Accepted. The scope and problem statement are now appropriately focused.',
        providedAt: 'Aug 14, 2026, 11:30 AM',
        supervisorName: 'Dr. Ahmed Rahman',
      },
    };

  const isCompleted = task.status === 'completed';
  const isRevision = task.status === 'revision_required';
  const isOverdue = task.status === 'overdue';

  const handleSimulateUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const name = e.target.files[0].name;
      setSelectedFile(name);
      showToast(`Uploaded new deliverable: ${name}`, 'success');
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-24 animate-in fade-in duration-150 relative">
      {/* Top Breadcrumb */}
      <div>
        <button
          onClick={() => setCurrentScreen('student-milestone-detail')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#002D71] hover:text-[#01B0F1] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Milestone {milestone.id}</span>
        </button>
      </div>

      {/* Assignment Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
        <div>
          <div className="text-[11px] font-bold text-[#64748B] tracking-wider uppercase">
            MILESTONE {milestone.id} · ASSIGNMENT
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#1E293B] mt-0.5">{task.title}</h1>
          <p className="text-sm text-[#64748B]">
            Review the assignment requirements and submit your team's work.
          </p>
        </div>

        <div>
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold capitalize ${
              isCompleted
                ? 'bg-[#DCFCE7] text-[#15803D]'
                : isOverdue
                ? 'bg-[#FDE8E6] text-[#C2392F]'
                : isRevision
                ? 'bg-[#FFF4DF] text-[#B26B00]'
                : 'bg-slate-100 text-slate-700'
            }`}
          >
            {isCompleted && <CheckCircle2 className="w-3.5 h-3.5" />}
            {task.status.replace('_', ' ')}
          </span>
        </div>
      </div>

      {/* Section A: Assignment details */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-xs space-y-5">
        <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3">
          <div className="w-6 h-6 rounded-md bg-[#002D71] text-white flex items-center justify-center font-bold text-xs">
            A
          </div>
          <div>
            <h3 className="text-sm font-bold text-[#1E293B]">Assignment details</h3>
            <p className="text-[11px] text-[#64748B]">Instructions provided by your FYP supervisor.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pb-2">
          <div>
            <span className="text-xs text-[#64748B] block">Assigned by</span>
            <span className="text-sm font-semibold text-slate-900 mt-0.5 block">
              {task.assignedBy || milestone.supervisor}
            </span>
          </div>
          <div>
            <span className="text-xs text-[#64748B] block">Meeting date</span>
            <span className="text-sm font-semibold text-slate-900 mt-0.5 block">
              {task.meetingDate}
            </span>
          </div>
          <div>
            <span className="text-xs text-[#64748B] block">Submission deadline</span>
            <span className="text-sm font-bold text-[#C2392F] mt-0.5 block">{task.deadline}</span>
          </div>
        </div>

        <div>
          <span className="text-xs font-bold text-[#1E293B] block uppercase tracking-wider mb-1">
            TASK DESCRIPTION
          </span>
          <p className="text-xs text-[#475569] leading-relaxed bg-slate-50 p-3.5 rounded-lg border border-slate-200">
            {task.description}
          </p>
        </div>

        <div>
          <span className="text-xs font-bold text-[#1E293B] block uppercase tracking-wider mb-1">
            SUBMISSION INSTRUCTIONS
          </span>
          <p className="text-xs text-[#475569] leading-relaxed bg-slate-50 p-3.5 rounded-lg border border-slate-200">
            {task.instructions}
          </p>
        </div>

        <div>
          <span className="text-xs font-bold text-[#1E293B] block uppercase tracking-wider mb-2">
            REQUIRED DELIVERABLES
          </span>
          <div className="space-y-1.5">
            {task.requiredDeliverables?.map((del, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{del}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Section B: Task submission */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-xs space-y-5">
        <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3">
          <div className="w-6 h-6 rounded-md bg-[#002D71] text-white flex items-center justify-center font-bold text-xs">
            B
          </div>
          <div>
            <h3 className="text-sm font-bold text-[#1E293B]">Task submission</h3>
            <p className="text-[11px] text-[#64748B]">Upload the required files before the supervisor deadline.</p>
          </div>
        </div>

        {/* Current status alert */}
        {isCompleted ? (
          <div className="p-4 rounded-xl bg-[#DCFCE7]/60 border border-emerald-200 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
            <div>
              <span className="text-sm font-bold text-emerald-900 block">
                Submission accepted by supervisor
              </span>
              <span className="text-xs text-emerald-800">
                Submitted {task.submission?.submittedAt || 'Aug 13, 2026, 2:00 PM'} ·{' '}
                {task.submission?.fileName || 'approved-proposal.pdf'}
              </span>
            </div>
          </div>
        ) : isRevision ? (
          <div className="p-4 rounded-xl bg-[#FFF4DF] border border-amber-200 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-[#B26B00] shrink-0 mt-0.5" />
            <div>
              <span className="text-sm font-bold text-amber-900 block">
                Revision requested by supervisor
              </span>
              <span className="text-xs text-amber-800">
                Please address the notes provided and upload revised materials.
              </span>
            </div>
          </div>
        ) : (
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
            <Clock className="w-5 h-5 text-slate-500 shrink-0 mt-0.5" />
            <div>
              <span className="text-sm font-bold text-slate-800 block">Ready for submission</span>
              <span className="text-xs text-slate-500">
                Upload your files in PDF or ZIP format (max 50MB).
              </span>
            </div>
          </div>
        )}

        {/* Upload Form Box */}
        <div className="p-4 rounded-xl border border-dashed border-slate-300 hover:border-[#002D71] transition-colors bg-slate-50/50 flex flex-col items-center justify-center text-center">
          <Upload className="w-8 h-8 text-[#002D71] mb-2" />
          <div className="text-xs font-semibold text-slate-800">
            {selectedFile ? `Selected: ${selectedFile}` : 'Upload deliverable documents'}
          </div>
          <p className="text-[11px] text-slate-400 mt-0.5">PDF, DOCX, ZIP up to 50MB</p>
          <label className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#002D71] text-white text-xs font-semibold rounded-lg hover:bg-[#003B85] cursor-pointer shadow-xs">
            <span>Choose File</span>
            <input type="file" onChange={handleSimulateUpload} className="hidden" />
          </label>
        </div>

        {/* Submission history */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-xs font-bold text-[#1E293B] uppercase tracking-wider">
              Submission history
            </h4>
            <span className="text-xs text-[#64748B]">1 submission</span>
          </div>

          <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileCheck className="w-5 h-5 text-[#002D71] shrink-0" />
              <div>
                <div className="text-xs font-bold text-slate-900">
                  {task.submission?.fileName || 'approved-proposal.pdf'}
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">
                  {task.submission?.submittedAt || 'Aug 13, 2026, 2:00 PM'} ·{' '}
                  {task.submission?.note || 'Updated after panel feedback.'}
                </div>
              </div>
            </div>

            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-100 text-emerald-800">
              On time
            </span>
          </div>
        </div>
      </div>

      {/* Two Column Bottom Grid: Supervisor Feedback & Simulation Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Supervisor Feedback Card */}
        <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#64748B] uppercase tracking-wider mb-2">
              <MessageSquare className="w-4 h-4 text-[#002D71]" />
              <span>Supervisor feedback</span>
            </div>
            <p className="text-xs text-slate-700 bg-slate-50 p-3.5 rounded-lg border border-slate-200 leading-relaxed italic">
              "{task.supervisorFeedback?.feedbackText || 'Accepted. The scope and problem statement are now appropriately focused.'}"
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100">
            <button
              onClick={() => setFeedbackModalOpen(true)}
              className="w-full py-2 bg-slate-50 border border-slate-300 text-[#002D71] text-xs font-semibold rounded-lg hover:bg-slate-100 transition-colors"
            >
              View Feedback
            </button>
          </div>
        </div>

        {/* Prototype Simulation Card */}
        <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-xs space-y-3">
          <div>
            <div className="text-[10px] font-bold text-[#FD7A12] uppercase tracking-wider">
              PROTOTYPE SIMULATION
            </div>
            <h4 className="text-sm font-bold text-slate-900 mt-0.5">Simulate supervisor outcome</h4>
            <p className="text-[11px] text-slate-500 mt-0.5">
              These controls represent future supervisor actions and update the shared task state.
            </p>
          </div>

          <div className="space-y-2 pt-1">
            <button
              onClick={() =>
                reviewSubmission('sub-042', 'accept', 'Accepted. All requirements verified.')
              }
              className="w-full py-2 bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold rounded-lg hover:bg-emerald-100 flex items-center justify-center gap-1.5 transition-colors"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Accept submission</span>
            </button>

            <button
              onClick={() =>
                reviewSubmission(
                  'sub-042',
                  'revision',
                  'The basic flow works. Revise the empty state and add source references.'
                )
              }
              className="w-full py-2 bg-amber-50 text-amber-800 border border-amber-200 text-xs font-semibold rounded-lg hover:bg-amber-100 flex items-center justify-center gap-1.5 transition-colors"
            >
              <Clock className="w-3.5 h-3.5" />
              <span>Request revision</span>
            </button>

            <button
              onClick={() => simulateDeadlineExpiry(task.id)}
              className="w-full py-2 bg-rose-50 text-[#C2392F] border border-rose-200 text-xs font-semibold rounded-lg hover:bg-rose-100 flex items-center justify-center gap-1.5 transition-colors"
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Simulate deadline expiry</span>
            </button>
          </div>
        </div>
      </div>

      {/* Page 13: Supervisor Feedback Modal Dialog */}
      {feedbackModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-5 animate-in fade-in duration-150 text-center">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>

            <div>
              <div className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">
                SUPERVISOR FEEDBACK
              </div>
              <h3 className="text-base font-bold text-[#1E293B] mt-1">{task.title}</h3>
            </div>

            <p className="text-xs text-slate-700 bg-slate-50 p-4 rounded-xl border border-slate-200 leading-relaxed">
              "{task.supervisorFeedback?.feedbackText || 'Accepted. The scope and problem statement are now appropriately focused.'}"
            </p>

            <button
              onClick={() => setFeedbackModalOpen(false)}
              className="w-full py-2.5 bg-[#002D71] text-white text-xs font-semibold rounded-lg hover:bg-[#003B85] transition-colors"
            >
              Close Feedback
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
