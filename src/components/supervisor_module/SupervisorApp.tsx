/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { ActiveView, SupervisedProject, NotificationItem, MilestoneItem } from './types';
import {
  SUPERVISED_PROJECTS,
  INITIAL_NOTIFICATIONS,
  MILESTONES_LIST,
} from './data/mockData';
import { SignInView } from './components/auth/SignInView';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { NotificationsDrawer } from './components/notifications/NotificationsDrawer';
import { DashboardView } from './components/dashboard/DashboardView';
import { MeetingsTasksView } from './components/meetings/MeetingsTasksView';
import { AssignTaskView } from './components/meetings/AssignTaskView';
import { SubmissionReviewView } from './components/submissions/SubmissionReviewView';
import { GroupDetailsView } from './components/groups/GroupDetailsView';
import { MyGroupsListView } from './components/groups/MyGroupsListView';
import { ProgressRiskView } from './components/progress/ProgressRiskView';
import { EvaluationView } from './components/evaluation/EvaluationView';
import { SettingsView } from './components/settings/SettingsView';
import { RecordMeetingModal } from './components/modals/RecordMeetingModal';
import { RiskReasonsModal } from './components/modals/RiskReasonsModal';
import { DocumentPreviewModal } from './components/modals/DocumentPreviewModal';

export default function SupervisorApp({ onSignOut }: { onSignOut?: () => void } = {}) {
  const [activeView, setActiveView] = useState<ActiveView>('dashboard');
  const [selectedProjectId, setSelectedProjectId] = useState<string>('FYP-CS-2025-042');
  const [projects] = useState<SupervisedProject[]>(SUPERVISED_PROJECTS);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [milestones, setMilestones] = useState<MilestoneItem[]>(MILESTONES_LIST);

  // Modals & Drawers state
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [recordMeetingOpen, setRecordMeetingOpen] = useState(false);
  const [riskModalProject, setRiskModalProject] = useState<SupervisedProject | null>(null);
  const [previewDocTitle, setPreviewDocTitle] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  const selectedProject =
    projects.find((p) => p.id === selectedProjectId) || projects[0];

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleSignIn = (role: string) => {
    setActiveView('dashboard');
    showToast(`Signed in successfully as ${role}.`);
  };

  const handleSignOut = () => {
    if (onSignOut) {
      onSignOut();
    } else {
      setActiveView('dashboard');
    }
  };

  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    showToast('All notifications marked as read.');
  };

  const handleSelectNotification = (notif: NotificationItem) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === notif.id ? { ...n, read: true } : n))
    );

    if (notif.targetGroupId) {
      setSelectedProjectId(notif.targetGroupId);
    }

    if (notif.targetView) {
      setActiveView(notif.targetView);
    }
    setNotificationsOpen(false);
  };

  const handleTaskAssigned = (taskData: any) => {
    showToast(
      taskData.isDraft
        ? 'Task draft saved successfully.'
        : `Task "${taskData.title}" assigned to ${selectedProject.name}.`
    );
  };

  const handleDecisionSubmitted = (decision: 'accepted' | 'revision') => {
    setMilestones((prev) =>
      prev.map((m) =>
        m.id === 3
          ? {
              ...m,
              status: decision === 'accepted' ? 'completed' : 'in-progress',
            }
          : m
      )
    );
    showToast(
      decision === 'accepted'
        ? 'Submission accepted. Official archival decision synchronized.'
        : 'Revision request transmitted to student team lead.'
    );
  };

  const handleSaveMarks = (total: number, _comments: string, isDraft: boolean) => {
    showToast(
      isDraft
        ? 'Evaluation draft preserved.'
        : `Official score of ${total.toFixed(1)}/10 transmitted for ${selectedProject.name}.`
    );
  };

  const handleSaveMeeting = (meetingData: any) => {
    showToast(`Supervisor meeting recorded for ${meetingData.date}.`);
  };


  return (
    <div className="min-h-screen bg-[#F4F6F9] flex">
      {/* Toast Notification Popup */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#002D71] text-white px-5 py-3 rounded-xl shadow-xl flex items-center gap-3 border border-white/10 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <span className="material-symbols-outlined text-[#FD7A12] text-[20px]">
            check_circle
          </span>
          <span className="text-xs font-medium">{toastMessage}</span>
          <button
            type="button"
            onClick={() => setToastMessage(null)}
            className="text-white/60 hover:text-white ml-2 text-xs cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

      {/* Fixed Sidebar (260px) */}
      <Sidebar
        activeView={activeView}
        setActiveView={setActiveView}
        unreadCount={unreadCount}
        onSignOut={handleSignOut}
      />

      {/* Main App Container */}
      <div className="pl-[260px] min-h-screen flex flex-col flex-1 bg-[#F4F6F9] min-w-0">
        {/* Fixed Header (72px) */}
        <Header
          activeView={activeView}
          unreadCount={unreadCount}
          onOpenNotifications={() => setNotificationsOpen(true)}
          onProfileClick={() => setActiveView('settings')}
          onSignOut={handleSignOut}
          selectedGroupName={selectedProject.name}
        />

        {/* Content Area */}
        <main className="relative pt-[72px] flex-1 bg-[#F4F6F9]">
          {activeView === 'dashboard' && (
            <DashboardView
              projects={projects}
              setActiveView={setActiveView}
              onSelectProject={setSelectedProjectId}
              onRecordMeeting={() => setRecordMeetingOpen(true)}
            />
          )}

          {activeView === 'my-groups' && (
            <MyGroupsListView
              projects={projects}
              onSelectProject={setSelectedProjectId}
              setActiveView={setActiveView}
            />
          )}

          {activeView === 'group-details' && (
            <GroupDetailsView
              project={selectedProject}
              projects={projects}
              onSelectProject={setSelectedProjectId}
              setActiveView={setActiveView}
              onPreviewDocument={(doc) => setPreviewDocTitle(doc)}
            />
          )}

          {activeView === 'meetings-tasks' && (
            <MeetingsTasksView
              projects={projects}
              selectedProject={selectedProject}
              onSelectProject={setSelectedProjectId}
              milestones={milestones}
              setActiveView={setActiveView}
              onRecordMeeting={() => setRecordMeetingOpen(true)}
            />
          )}

          {activeView === 'assign-task' && (
            <AssignTaskView
              setActiveView={setActiveView}
              onTaskAssigned={handleTaskAssigned}
            />
          )}

          {activeView === 'submission-review' && (
            <SubmissionReviewView
              setActiveView={setActiveView}
              onPreviewDocument={(doc) => setPreviewDocTitle(doc)}
              onDecisionSubmitted={handleDecisionSubmitted}
            />
          )}

          {activeView === 'progress-risk' && (
            <ProgressRiskView
              projects={projects}
              onSelectProject={setSelectedProjectId}
              setActiveView={setActiveView}
              onOpenRiskReasons={(proj) => setRiskModalProject(proj)}
            />
          )}

          {activeView === 'evaluation' && (
            <EvaluationView
              projects={projects}
              selectedProject={selectedProject}
              onSelectProject={setSelectedProjectId}
              onSaveMarks={handleSaveMarks}
            />
          )}

          {activeView === 'settings' && (
            <SettingsView onSignOut={handleSignOut} />
          )}
        </main>
      </div>

      {/* Notifications Drawer */}
      <NotificationsDrawer
        isOpen={notificationsOpen}
        onClose={() => setNotificationsOpen(false)}
        notifications={notifications}
        onMarkAllAsRead={handleMarkAllAsRead}
        onSelectNotification={handleSelectNotification}
      />

      {/* Record Meeting Modal */}
      <RecordMeetingModal
        isOpen={recordMeetingOpen}
        onClose={() => setRecordMeetingOpen(false)}
        projects={projects}
        defaultProjectId={selectedProjectId}
        onSaveMeeting={handleSaveMeeting}
      />

      {/* Risk Reasons Breakdown Modal */}
      <RiskReasonsModal
        isOpen={!!riskModalProject}
        onClose={() => setRiskModalProject(null)}
        project={riskModalProject}
        onTakeAction={() => {
          if (riskModalProject) {
            setSelectedProjectId(riskModalProject.id);
            setActiveView('group-details');
          }
        }}
      />

      {/* Document Preview Modal */}
      <DocumentPreviewModal
        isOpen={!!previewDocTitle}
        onClose={() => setPreviewDocTitle(null)}
        documentTitle={previewDocTitle || ''}
      />
    </div>
  );
}
