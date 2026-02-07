"use client";

import { AppProvider, useApp } from "@/lib/app-context";
import Sidebar from "@/components/sidebar";
import LandingPage from "@/components/landing-page";
import { LoginPage, SignupPage } from "@/components/auth-pages";
import HomePage from "@/components/home-page";
import AboutPage from "@/components/about-page";
import MyTasksPage from "@/components/my-tasks-page";
import { ProjectsPage, ProjectDetailPage } from "@/components/projects-page";
import GoalsPage from "@/components/goals-page";
import InboxPage from "@/components/inbox-page";
import PortfoliosPage from "@/components/portfolios-page";
import ReportingPage from "@/components/reporting-page";
import SettingsPage from "@/components/settings-page";
import { AddTaskPage, AddProjectPage, AddGoalPage } from "@/components/form-pages";

function AppContent() {
  const { currentPage, user, sidebarCollapsed } = useApp();

  // Pages without sidebar (unauthenticated)
  if (!user) {
    switch (currentPage) {
      case "login":
        return <LoginPage />;
      case "signup":
        return <SignupPage />;
      case "about":
        return <AboutPage />;
      default:
        return <LandingPage />;
    }
  }

  // Authenticated pages with sidebar
  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage />;
      case "inbox":
        return <InboxPage />;
      case "my-tasks":
        return <MyTasksPage />;
      case "projects":
        return <ProjectsPage />;
      case "project-detail":
        return <ProjectDetailPage />;
      case "portfolios":
        return <PortfoliosPage />;
      case "goals":
        return <GoalsPage />;
      case "reporting":
        return <ReportingPage />;
      case "about":
        return <AboutPage />;
      case "settings":
        return <SettingsPage />;
      case "add-task":
        return <AddTaskPage />;
      case "add-project":
        return <AddProjectPage />;
      case "add-goal":
        return <AddGoalPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="flex min-h-screen bg-[hsl(220,15%,13%)]">
      <Sidebar />
      <main
        className="flex-1 overflow-y-auto transition-all duration-300"
        style={{
          marginLeft: sidebarCollapsed ? "4rem" : "15rem",
        }}
      >
        {/* Top header bar */}
        <header className="sticky top-0 z-30 flex items-center justify-between px-8 py-4 bg-[hsl(220,15%,13%,0.85)] backdrop-blur-xl border-b border-[hsl(220,12%,18%)]">
          <div className="flex items-center gap-3">
            <h2 className="text-sm font-medium text-[hsl(215,15%,55%)] capitalize">
              {currentPage.replace(/-/g, " ")}
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-[hsl(215,15%,40%)]" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                placeholder="Search..."
                className="pl-9 pr-4 py-1.5 bg-[hsl(220,15%,16%)] border border-[hsl(220,12%,22%)] rounded-lg text-sm text-[hsl(210,20%,90%)] placeholder-[hsl(215,15%,40%)] focus:outline-none focus:border-[hsl(210,80%,56%)] w-56"
              />
            </div>
            <button className="relative p-2 hover:bg-[hsl(220,15%,18%)] rounded-lg transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="hsl(215,15%,55%)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8A6 6 0 106 8c0 7-3 9-3 9h18s-3-2-3-9z" />
                <path d="M13.73 21a2 2 0 01-3.46 0" />
              </svg>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[hsl(0,72%,51%)] rounded-full" />
            </button>
            <button className="p-2 hover:bg-[hsl(220,15%,18%)] rounded-lg transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="hsl(215,15%,55%)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="1" /><circle cx="12" cy="5" r="1" /><circle cx="12" cy="19" r="1" />
              </svg>
            </button>
          </div>
        </header>
        <div className="p-8">
          {renderPage()}
        </div>
      </main>
    </div>
  );
}

export default function Page() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
