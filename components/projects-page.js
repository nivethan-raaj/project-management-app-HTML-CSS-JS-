"use client";

import { useState } from "react";
import { useApp } from "@/lib/app-context";
import { PriorityBadge, StatusBadge } from "./home-page";

export function ProjectsPage() {
  const { projects, setCurrentPage, setCurrentProject } = useApp();
  const [viewMode, setViewMode] = useState("grid");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProjects = projects.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-[hsl(210,20%,95%)]">Projects</h1>
        <button
          onClick={() => setCurrentPage("add-project")}
          className="flex items-center gap-2 px-4 py-2 bg-[hsl(210,80%,56%)] hover:bg-[hsl(210,80%,48%)] text-[hsl(0,0%,100%)] rounded-lg text-sm font-medium transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          New Project
        </button>
      </div>

      {/* Search and view toggle */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <div className="relative flex-1 max-w-sm">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-[hsl(215,15%,40%)]" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-[hsl(220,15%,14%)] border border-[hsl(220,12%,20%)] rounded-lg text-sm text-[hsl(210,20%,90%)] placeholder-[hsl(215,15%,40%)] focus:outline-none focus:border-[hsl(210,80%,56%)]"
          />
        </div>
        <div className="flex items-center gap-1 bg-[hsl(220,15%,14%)] rounded-lg p-1 border border-[hsl(220,12%,20%)]">
          <button onClick={() => setViewMode("grid")} className={`p-1.5 rounded-md ${viewMode === "grid" ? "bg-[hsl(220,15%,22%)]" : ""}`}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={viewMode === "grid" ? "hsl(210,20%,90%)" : "hsl(215,15%,45%)"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
            </svg>
          </button>
          <button onClick={() => setViewMode("list")} className={`p-1.5 rounded-md ${viewMode === "list" ? "bg-[hsl(220,15%,22%)]" : ""}`}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={viewMode === "list" ? "hsl(210,20%,90%)" : "hsl(215,15%,45%)"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" /><line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" />
            </svg>
          </button>
        </div>
      </div>

      {/* Grid View */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProjects.map((project) => (
            <button
              key={project.id}
              onClick={() => {
                setCurrentProject(project);
                setCurrentPage("project-detail");
              }}
              className="bg-[hsl(220,15%,14%)] rounded-xl border border-[hsl(220,12%,20%)] p-5 text-left hover:border-[hsl(210,80%,56%,0.3)] transition-all"
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-[hsl(0,0%,100%)] text-base font-bold"
                  style={{ backgroundColor: project.color }}
                >
                  {project.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[hsl(210,20%,92%)]">{project.name}</h3>
                  <p className="text-xs text-[hsl(215,15%,50%)]">{project.members.length} members</p>
                </div>
              </div>
              <p className="text-xs text-[hsl(215,15%,50%)] mb-4 line-clamp-2">{project.description}</p>
              <div className="flex items-center gap-2 mb-3">
                <StatusBadge status={project.status} />
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-1.5 bg-[hsl(220,12%,20%)] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{ width: `${project.progress}%`, backgroundColor: project.color }}
                  />
                </div>
                <span className="text-xs text-[hsl(215,15%,50%)]">{project.progress}%</span>
              </div>
              <div className="flex items-center mt-4">
                <div className="flex -space-x-2">
                  {project.members.slice(0, 3).map((m, i) => (
                    <div
                      key={i}
                      className="w-6 h-6 rounded-full border-2 border-[hsl(220,15%,14%)] flex items-center justify-center text-[9px] font-bold text-[hsl(0,0%,100%)]"
                      style={{ backgroundColor: ["hsl(210,80%,56%)", "hsl(142,72%,42%)", "hsl(38,92%,50%)"][i % 3] }}
                    >
                      {m.charAt(0)}
                    </div>
                  ))}
                </div>
                {project.members.length > 3 && (
                  <span className="text-xs text-[hsl(215,15%,45%)] ml-2">+{project.members.length - 3}</span>
                )}
              </div>
            </button>
          ))}
        </div>
      ) : (
        /* List View */
        <div className="bg-[hsl(220,15%,14%)] rounded-xl border border-[hsl(220,12%,20%)] overflow-hidden">
          <div className="grid grid-cols-12 gap-4 px-5 py-3 bg-[hsl(220,15%,12%)] border-b border-[hsl(220,12%,20%)] text-xs text-[hsl(215,15%,50%)] font-medium uppercase tracking-wide">
            <div className="col-span-4">Project</div>
            <div className="col-span-2">Members</div>
            <div className="col-span-2">Status</div>
            <div className="col-span-2">Progress</div>
            <div className="col-span-2">Description</div>
          </div>
          {filteredProjects.map((project) => (
            <button
              key={project.id}
              onClick={() => {
                setCurrentProject(project);
                setCurrentPage("project-detail");
              }}
              className="grid grid-cols-12 gap-4 px-5 py-3 border-b border-[hsl(220,12%,20%)] hover:bg-[hsl(220,15%,16%)] transition-colors items-center w-full text-left"
            >
              <div className="col-span-4 flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-[hsl(0,0%,100%)] text-sm font-bold flex-shrink-0"
                  style={{ backgroundColor: project.color }}
                >
                  {project.name.charAt(0)}
                </div>
                <span className="text-sm text-[hsl(210,20%,90%)] truncate">{project.name}</span>
              </div>
              <div className="col-span-2 text-sm text-[hsl(215,15%,55%)]">{project.members.length} members</div>
              <div className="col-span-2"><StatusBadge status={project.status} /></div>
              <div className="col-span-2 flex items-center gap-2">
                <div className="flex-1 h-1.5 bg-[hsl(220,12%,20%)] rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${project.progress}%`, backgroundColor: project.color }} />
                </div>
                <span className="text-xs text-[hsl(215,15%,50%)]">{project.progress}%</span>
              </div>
              <div className="col-span-2 text-xs text-[hsl(215,15%,50%)] truncate">{project.description}</div>
            </button>
          ))}
        </div>
      )}

      {filteredProjects.length === 0 && (
        <div className="text-center py-16 text-[hsl(215,15%,45%)]">
          <p className="text-lg mb-2">No projects found</p>
          <p className="text-sm">Create a new project to get started.</p>
        </div>
      )}
    </div>
  );
}

/* Project Detail View */
export function ProjectDetailPage() {
  const { currentProject, tasks, setCurrentPage, updateTask, deleteTask } = useApp();
  const [view, setView] = useState("list");

  if (!currentProject) {
    return (
      <div className="text-center py-16 text-[hsl(215,15%,45%)]">
        <p>No project selected</p>
        <button onClick={() => setCurrentPage("projects")} className="text-[hsl(210,80%,56%)] hover:underline mt-2">
          Back to projects
        </button>
      </div>
    );
  }

  const projectTasks = tasks.filter((t) => t.projectId === currentProject.id);
  const sections = ["To do", "Doing", "Done"];

  return (
    <div className="animate-fade-in">
      <button
        onClick={() => setCurrentPage("projects")}
        className="flex items-center gap-2 text-[hsl(215,15%,55%)] hover:text-[hsl(210,20%,85%)] text-sm mb-4 transition-colors"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
        </svg>
        Back to projects
      </button>

      <div className="flex items-center gap-4 mb-6">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center text-[hsl(0,0%,100%)] text-xl font-bold"
          style={{ backgroundColor: currentProject.color }}
        >
          {currentProject.name.charAt(0)}
        </div>
        <div>
          <h1 className="text-2xl font-bold text-[hsl(210,20%,95%)]">{currentProject.name}</h1>
          <p className="text-sm text-[hsl(215,15%,55%)]">{currentProject.description}</p>
        </div>
        <div className="ml-auto flex items-center gap-3">
          <StatusBadge status={currentProject.status} />
          <div className="flex items-center gap-2">
            <div className="w-20 h-1.5 bg-[hsl(220,12%,20%)] rounded-full overflow-hidden">
              <div className="h-full rounded-full" style={{ width: `${currentProject.progress}%`, backgroundColor: currentProject.color }} />
            </div>
            <span className="text-xs text-[hsl(215,15%,50%)]">{currentProject.progress}%</span>
          </div>
        </div>
      </div>

      {/* View Tabs */}
      <div className="flex items-center gap-6 mb-6 border-b border-[hsl(220,12%,20%)] pb-3">
        {["list", "board", "timeline", "calendar"].map((v) => (
          <button
            key={v}
            onClick={() => setView(v)}
            className={`text-sm font-medium pb-3 -mb-3 capitalize transition-colors ${
              view === v
                ? "text-[hsl(210,80%,56%)] border-b-2 border-[hsl(210,80%,56%)]"
                : "text-[hsl(215,15%,55%)] hover:text-[hsl(210,20%,85%)]"
            }`}
          >
            {v}
          </button>
        ))}
      </div>

      {/* Re-use view components from MyTasks but with project-specific tasks */}
      <ProjectViewContent view={view} tasks={projectTasks} sections={sections} updateTask={updateTask} deleteTask={deleteTask} />
    </div>
  );
}

function ProjectViewContent({ view, tasks, sections, updateTask, deleteTask }) {
  if (view === "board") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {sections.map((section) => {
          const sectionTasks = tasks.filter((t) => t.section === section);
          const colors = { "To do": "hsl(210,80%,56%)", Doing: "hsl(38,92%,50%)", Done: "hsl(142,72%,42%)" };
          return (
            <div key={section} className="bg-[hsl(220,15%,12%)] rounded-xl border border-[hsl(220,12%,20%)] overflow-hidden"
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => { e.preventDefault(); updateTask(e.dataTransfer.getData("taskId"), { section }); }}
            >
              <div className="flex items-center gap-2 px-4 py-3 border-b border-[hsl(220,12%,20%)]">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: colors[section] }} />
                <span className="text-sm font-semibold text-[hsl(210,20%,90%)]">{section}</span>
                <span className="text-xs text-[hsl(215,15%,45%)] ml-auto bg-[hsl(220,15%,18%)] px-2 py-0.5 rounded-full">{sectionTasks.length}</span>
              </div>
              <div className="p-3 space-y-2 min-h-[150px]">
                {sectionTasks.map((task) => (
                  <div key={task.id} draggable onDragStart={(e) => e.dataTransfer.setData("taskId", task.id)}
                    className="bg-[hsl(220,15%,16%)] rounded-lg p-3 border border-[hsl(220,12%,22%)] cursor-grab hover:border-[hsl(210,80%,56%,0.3)] transition-colors">
                    <p className="text-sm text-[hsl(210,20%,88%)] mb-2">{task.name}</p>
                    <div className="flex items-center gap-2">
                      <PriorityBadge priority={task.priority} />
                      <StatusBadge status={task.status} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  // Default list view for project detail
  return (
    <div className="bg-[hsl(220,15%,14%)] rounded-xl border border-[hsl(220,12%,20%)] overflow-hidden">
      {sections.map((section) => {
        const sectionTasks = tasks.filter((t) => t.section === section);
        return (
          <div key={section}>
            <div className="flex items-center gap-2 px-5 py-3 bg-[hsl(220,15%,11%)] border-b border-[hsl(220,12%,20%)]">
              <span className="text-sm font-semibold text-[hsl(210,20%,88%)]">{section}</span>
              <span className="text-xs text-[hsl(215,15%,45%)]">({sectionTasks.length})</span>
            </div>
            {sectionTasks.map((task) => (
              <div key={task.id} className="flex items-center gap-4 px-5 py-3 border-b border-[hsl(220,12%,20%)] hover:bg-[hsl(220,15%,16%)] transition-colors">
                <button
                  onClick={() => updateTask(task.id, { section: task.section === "Done" ? "To do" : "Done" })}
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                    task.section === "Done" ? "bg-[hsl(142,72%,42%)] border-[hsl(142,72%,42%)]" : "border-[hsl(220,12%,30%)] hover:border-[hsl(210,80%,56%)]"
                  }`}
                >
                  {task.section === "Done" && (
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </button>
                <span className={`flex-1 text-sm ${task.section === "Done" ? "text-[hsl(215,15%,45%)] line-through" : "text-[hsl(210,20%,88%)]"}`}>
                  {task.name}
                </span>
                <PriorityBadge priority={task.priority} />
                <StatusBadge status={task.status} />
                <span className="text-xs text-[hsl(215,15%,45%)]">{new Date(task.dueDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
                <button onClick={() => deleteTask(task.id)} className="text-[hsl(215,15%,40%)] hover:text-[hsl(0,72%,60%)] transition-colors p-1">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6m5-3h4a1 1 0 011 1v1H9V4a1 1 0 011-1z" />
                  </svg>
                </button>
              </div>
            ))}
            {sectionTasks.length === 0 && (
              <div className="px-5 py-4 text-sm text-[hsl(215,15%,35%)] border-b border-[hsl(220,12%,20%)]">No tasks</div>
            )}
          </div>
        );
      })}
    </div>
  );
}
