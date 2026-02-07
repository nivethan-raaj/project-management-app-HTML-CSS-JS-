"use client";

import { useState } from "react";
import { useApp } from "@/lib/app-context";

export default function InboxPage() {
  const { user } = useApp();
  const [activeTab, setActiveTab] = useState("all");

  const notifications = [
    {
      id: 1,
      type: "task_assigned",
      title: "New task assigned to you",
      message: "Alice assigned \"Design homepage mockup\" to you in Website Redesign.",
      time: "2 hours ago",
      read: false,
      avatar: "A",
      color: "hsl(210,80%,56%)",
    },
    {
      id: 2,
      type: "comment",
      title: "New comment on your task",
      message: "Bob commented on \"Set up CI/CD pipeline\": \"Looks good, let's deploy to staging first.\"",
      time: "4 hours ago",
      read: false,
      avatar: "B",
      color: "hsl(142,72%,42%)",
    },
    {
      id: 3,
      type: "status_update",
      title: "Project status updated",
      message: "Mobile App Development status changed from \"On track\" to \"At risk\".",
      time: "6 hours ago",
      read: true,
      avatar: "C",
      color: "hsl(38,92%,50%)",
    },
    {
      id: 4,
      type: "due_soon",
      title: "Task due tomorrow",
      message: "\"User authentication module\" is due tomorrow. Mark it as complete or update the due date.",
      time: "8 hours ago",
      read: true,
      avatar: "!",
      color: "hsl(0,72%,51%)",
    },
    {
      id: 5,
      type: "mention",
      title: "You were mentioned",
      message: "Diana mentioned you in Marketing Campaign Q1: \"@" + (user?.name || "you") + " can you review the content plan?\"",
      time: "1 day ago",
      read: true,
      avatar: "D",
      color: "hsl(280,65%,60%)",
    },
    {
      id: 6,
      type: "completed",
      title: "Task completed",
      message: "Eve completed \"Social media content plan\" in Marketing Campaign Q1.",
      time: "1 day ago",
      read: true,
      avatar: "E",
      color: "hsl(142,72%,42%)",
    },
  ];

  const [items, setItems] = useState(notifications);

  const filteredItems = items.filter((n) => {
    if (activeTab === "unread") return !n.read;
    return true;
  });

  const markAllRead = () => {
    setItems((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const toggleRead = (id) => {
    setItems((prev) => prev.map((n) => (n.id === id ? { ...n, read: !n.read } : n)));
  };

  const unreadCount = items.filter((n) => !n.read).length;

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[hsl(210,20%,95%)]">Inbox</h1>
          <p className="text-sm text-[hsl(215,15%,55%)] mt-1">
            {unreadCount > 0 ? `${unreadCount} unread notification${unreadCount > 1 ? "s" : ""}` : "All caught up!"}
          </p>
        </div>
        {unreadCount > 0 && (
          <button
            onClick={markAllRead}
            className="px-4 py-2 text-sm text-[hsl(210,80%,56%)] hover:bg-[hsl(210,80%,56%,0.08)] rounded-lg transition-colors"
          >
            Mark all as read
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 mb-6 border-b border-[hsl(220,12%,20%)]">
        {[
          { key: "all", label: "All" },
          { key: "unread", label: `Unread (${unreadCount})` },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2.5 text-sm font-medium -mb-px transition-colors ${
              activeTab === tab.key
                ? "text-[hsl(210,80%,56%)] border-b-2 border-[hsl(210,80%,56%)]"
                : "text-[hsl(215,15%,55%)] hover:text-[hsl(210,20%,85%)]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="bg-[hsl(220,15%,14%)] rounded-xl border border-[hsl(220,12%,20%)] overflow-hidden">
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 text-[hsl(215,15%,45%)]">
            <svg className="mx-auto mb-4" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
              <path d="M5.45 5.11L2 12v6a2 2 0 002 2h16a2 2 0 002-2v-6l-3.45-6.89A2 2 0 0016.76 4H7.24a2 2 0 00-1.79 1.11z" />
            </svg>
            <p className="text-base mb-1">No notifications</p>
            <p className="text-sm">{"You're all caught up!"}</p>
          </div>
        ) : (
          filteredItems.map((notification) => (
            <button
              key={notification.id}
              onClick={() => toggleRead(notification.id)}
              className={`w-full flex items-start gap-4 px-5 py-4 border-b border-[hsl(220,12%,20%)] text-left transition-colors hover:bg-[hsl(220,15%,16%)] ${
                !notification.read ? "bg-[hsl(210,80%,56%,0.04)]" : ""
              }`}
            >
              {!notification.read && (
                <div className="w-2 h-2 rounded-full bg-[hsl(210,80%,56%)] mt-2 flex-shrink-0" />
              )}
              {notification.read && <div className="w-2 flex-shrink-0" />}
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-[hsl(0,0%,100%)] flex-shrink-0"
                style={{ backgroundColor: notification.color }}
              >
                {notification.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-medium mb-0.5 ${!notification.read ? "text-[hsl(210,20%,95%)]" : "text-[hsl(210,20%,80%)]"}`}>
                  {notification.title}
                </p>
                <p className="text-sm text-[hsl(215,15%,50%)] leading-relaxed">{notification.message}</p>
              </div>
              <span className="text-xs text-[hsl(215,15%,40%)] flex-shrink-0 mt-0.5">{notification.time}</span>
            </button>
          ))
        )}
      </div>
    </div>
  );
}
