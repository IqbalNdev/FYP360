import React, { useState } from 'react';
import { SupervisedProject } from '../../types';

interface RecordMeetingModalProps {
  isOpen: boolean;
  onClose: () => void;
  projects: SupervisedProject[];
  defaultProjectId?: string;
  onSaveMeeting: (meetingData: any) => void;
}

export const RecordMeetingModal: React.FC<RecordMeetingModalProps> = ({
  isOpen,
  onClose,
  projects,
  defaultProjectId,
  onSaveMeeting,
}) => {
  const [selectedProjectId, setSelectedProjectId] = useState(
    defaultProjectId || projects[0]?.id || ''
  );
  const [title, setTitle] = useState('Core Prototype & Architecture Review');
  const [date, setDate] = useState('Oct 22, 2026');
  const [time, setTime] = useState('10:00 AM');
  const [notes, setNotes] = useState(
    'Evaluated student progress on the backend service layer and validated API specs against proposal scope.'
  );
  const [attendance, setAttendance] = useState<Record<string, boolean>>({});

  if (!isOpen) return null;

  const currentProject =
    projects.find((p) => p.id === selectedProjectId) || projects[0];

  const handleSave = () => {
    onSaveMeeting({
      projectId: selectedProjectId,
      title,
      date,
      time,
      notes,
      attendance,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#001F52]/40 backdrop-blur-[3px] transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative bg-white rounded-[24px] max-w-xl w-full p-6 shadow-2xl border border-[#E2E8F0] z-10 flex flex-col gap-5 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#E0F2FE] text-[#002D71] flex items-center justify-center">
              <span className="material-symbols-outlined text-[22px] text-[#01B0F1]">
                videocam
              </span>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-[#002D71]">
                Record Supervisor Meeting
              </h2>
              <p className="text-xs text-[#475569]">
                KIET institutional log for accreditation and committee verification
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

        <div className="flex flex-col gap-4">
          {/* Supervised Group */}
          <div>
            <label className="block text-xs font-semibold text-[#1E293B] mb-1.5">
              Supervised Project
            </label>
            <select
              value={selectedProjectId}
              onChange={(e) => setSelectedProjectId(e.target.value)}
              className="w-full h-11 px-3 rounded-xl bg-slate-50 border border-[#E2E8F0] text-sm text-[#1E293B] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#01B0F1]/40 focus:border-[#01B0F1] cursor-pointer"
            >
              {projects.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.code})
                </option>
              ))}
            </select>
          </div>

          {/* Meeting Title */}
          <div>
            <label className="block text-xs font-semibold text-[#1E293B] mb-1.5">
              Meeting Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full h-11 px-3 rounded-xl bg-slate-50 border border-[#E2E8F0] text-sm text-[#1E293B] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#01B0F1]/40 focus:border-[#01B0F1]"
            />
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#1E293B] mb-1.5">
                Date
              </label>
              <input
                type="text"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full h-11 px-3 rounded-xl bg-slate-50 border border-[#E2E8F0] text-sm text-[#1E293B] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#01B0F1]/40 focus:border-[#01B0F1]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#1E293B] mb-1.5">
                Time
              </label>
              <input
                type="text"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full h-11 px-3 rounded-xl bg-slate-50 border border-[#E2E8F0] text-sm text-[#1E293B] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#01B0F1]/40 focus:border-[#01B0F1]"
              />
            </div>
          </div>

          {/* Student Attendees Checklist */}
          <div>
            <label className="block text-xs font-semibold text-[#1E293B] mb-1.5">
              Attendees Verification
            </label>
            <div className="grid grid-cols-2 gap-2 bg-[#F4F6F9] p-3 rounded-xl border border-[#E2E8F0]">
              {currentProject?.team.map((member) => {
                const isChecked = attendance[member.id] !== false;
                return (
                  <label
                    key={member.id}
                    className="flex items-center gap-2 text-xs text-[#1E293B] cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={(e) =>
                        setAttendance({
                          ...attendance,
                          [member.id]: e.target.checked,
                        })
                      }
                      className="rounded text-[#002D71] focus:ring-[#01B0F1]"
                    />
                    <span className="truncate">{member.name}</span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Discussion Notes */}
          <div>
            <label className="block text-xs font-semibold text-[#1E293B] mb-1.5">
              Supervisory Notes & Action Items
            </label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full p-3 rounded-xl bg-slate-50 border border-[#E2E8F0] text-sm text-[#1E293B] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#01B0F1]/40 focus:border-[#01B0F1] resize-none"
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#E2E8F0]">
          <button
            type="button"
            onClick={onClose}
            className="px-4 h-10 rounded-xl bg-white border border-[#E2E8F0] hover:bg-slate-50 text-xs font-semibold text-[#475569] cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-5 h-10 rounded-xl bg-[#002D71] hover:bg-[#003B8F] text-white text-xs font-semibold transition-colors shadow-sm cursor-pointer"
          >
            Save Meeting Log
          </button>
        </div>
      </div>
    </div>
  );
};
