import React, { useState } from 'react';
import { NotificationItem } from '../../types';

interface NotificationsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: NotificationItem[];
  onMarkAllAsRead: () => void;
  onSelectNotification: (notif: NotificationItem) => void;
}

export const NotificationsDrawer: React.FC<NotificationsDrawerProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAllAsRead,
  onSelectNotification,
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'unread'>('all');

  if (!isOpen) return null;

  const unreadCount = notifications.filter((n) => !n.read).length;
  const filteredNotifications =
    activeTab === 'unread' ? notifications.filter((n) => !n.read) : notifications;

  return (
    <>
      {/* Backdrop overlay */}
      <div
        aria-hidden="true"
        onClick={onClose}
        className="fixed inset-0 bg-[#001F52]/40 backdrop-blur-[3px] z-40 transition-opacity animate-in fade-in duration-200"
      />

      {/* Right-Side Notifications Drawer Panel */}
      <aside
        aria-label="Supervisor Notifications Drawer"
        className="fixed inset-y-0 right-0 z-50 w-full sm:w-[460px] bg-white border-l border-[#E2E8F0] shadow-2xl flex flex-col transform transition-transform duration-300 ease-out animate-in slide-in-from-right"
      >
        {/* Drawer Header */}
        <div className="p-6 border-b border-[#E2E8F0] flex flex-col gap-4 shrink-0">
          {/* Top row: Title and Close Button */}
          <div className="flex items-center justify-between">
            <h2 className="text-[22px] font-semibold text-[#002D71] tracking-tight leading-none">
              Notifications
            </h2>
            <button
              aria-label="Close notification panel"
              onClick={onClose}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-[#475569] hover:text-[#002D71] hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-[#01B0F1] cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          {/* Filter Tabs & Actions Row */}
          <div className="flex items-center justify-between pt-1">
            {/* Filter Tabs */}
            <div className="flex items-center gap-6">
              {/* All Tab */}
              <button
                type="button"
                onClick={() => setActiveTab('all')}
                className={`relative pb-2 text-sm font-semibold transition-colors cursor-pointer ${
                  activeTab === 'all'
                    ? 'text-[#002D71] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#FD7A12] after:rounded-full'
                    : 'text-[#475569] hover:text-[#002D71]'
                }`}
              >
                All
              </button>

              {/* Unread Tab */}
              <button
                type="button"
                onClick={() => setActiveTab('unread')}
                className={`relative pb-2 text-sm font-medium transition-colors flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'unread'
                    ? 'text-[#002D71] font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#FD7A12] after:rounded-full'
                    : 'text-[#475569] hover:text-[#002D71]'
                }`}
              >
                <span>Unread</span>
                {unreadCount > 0 && (
                  <span className="inline-flex items-center justify-center px-1.5 py-0.2 rounded-full text-[11px] font-bold bg-[#FFF4EB] text-[#FD7A12] border border-[#FD7A12]/30 min-w-[20px]">
                    {unreadCount}
                  </span>
                )}
              </button>
            </div>

            {/* Mark All As Read */}
            <button
              type="button"
              onClick={onMarkAllAsRead}
              className="text-[13px] font-semibold text-[#FD7A12] hover:text-[#EA6800] focus:outline-none cursor-pointer"
            >
              Mark all as read
            </button>
          </div>
        </div>

        {/* Drawer Body: Notification List Items */}
        <div className="flex-1 overflow-y-auto custom-scroll divide-y divide-[#E2E8F0]">
          {filteredNotifications.length === 0 ? (
            <div className="p-8 text-center text-[#475569] text-sm flex flex-col items-center justify-center h-48">
              <span className="material-symbols-outlined text-[32px] text-slate-300 mb-2">
                notifications_off
              </span>
              No notifications to display.
            </div>
          ) : (
            filteredNotifications.map((notif) => {
              const isUnread = !notif.read;
              return (
                <div
                  key={notif.id}
                  onClick={() => onSelectNotification(notif)}
                  className={`p-5 hover:bg-slate-50 transition-colors cursor-pointer group flex items-start gap-3.5 relative ${
                    isUnread ? 'bg-[#FFF4EB]/30' : ''
                  }`}
                >
                  {/* Left side icon container */}
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 border ${
                      notif.type === 'risk'
                        ? 'bg-[#FEE2E2] border-[#DC2626]/20 text-[#DC2626]'
                        : notif.type === 'announcement'
                        ? 'bg-[#E0F2FE] border-[#01B0F1]/20 text-[#01B0F1]'
                        : notif.type === 'deadline'
                        ? 'bg-[#FEF3C7] border-[#F59E0B]/20 text-[#B45309]'
                        : 'bg-[#E0F2FE] border-[#01B0F1]/20 text-[#002D71]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      {notif.type === 'assignment' && 'person_add'}
                      {notif.type === 'submission' && 'description'}
                      {notif.type === 'risk' && 'warning'}
                      {notif.type === 'deadline' && 'calendar_today'}
                      {notif.type === 'announcement' && 'campaign'}
                    </span>
                  </div>

                  {/* Notification Details */}
                  <div className="flex-1 min-w-0 pr-4">
                    <div className="flex items-baseline justify-between gap-2">
                      <h3 className="text-sm font-bold text-[#002D71] truncate group-hover:text-[#FD7A12] transition-colors">
                        {notif.title}
                      </h3>
                      <span className="text-xs text-[#475569] whitespace-nowrap shrink-0">
                        {notif.timestamp}
                      </span>
                    </div>
                    <p className="text-[13px] text-[#475569] mt-1 leading-snug truncate">
                      {notif.subtitle}
                    </p>
                  </div>

                  {/* Unread Dot (KIET Orange) */}
                  {isUnread && (
                    <span
                      aria-label="Unread"
                      className="w-2.5 h-2.5 rounded-full bg-[#FD7A12] shrink-0 self-center"
                    />
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Drawer Footer */}
        <footer className="p-4 px-6 border-t border-[#E2E8F0] bg-[#F4F6F9] shrink-0">
          <p className="text-xs text-[#475569] text-center leading-relaxed">
            KIET portal notifications are dispatched in real-time.
          </p>
        </footer>
      </aside>
    </>
  );
};
