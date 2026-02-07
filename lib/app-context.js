"use client";

import { createContext, useContext, useState, useCallback } from "react";

const AppContext = createContext(null);

const defaultUser = null;

const defaultProjects = [
  {
    id: "p1",
    name: "Website Redesign",
    color: "#4573d2",
    members: ["You", "Alice", "Bob"],
    status: "On track",
    progress: 65,
    description: "Complete overhaul of the company website",
  },
  {
    id: "p2",
    name: "Mobile App Development",
    color: "#aa62e3",
    members: ["You", "Charlie"],
    status: "At risk",
    progress: 40,
    description: "Build iOS and Android mobile application",
  },
  {
    id: "p3",
    name: "Marketing Campaign Q1",
    color: "#e8842c",
    members: ["You", "Diana", "Eve"],
    status: "On track",
    progress: 80,
    description: "Q1 marketing campaign planning and execution",
  },
  {
    id: "p4",
    name: "Data Migration",
    color: "#4ecbc4",
    members: ["You", "Frank"],
    status: "Off track",
    progress: 20,
    description: "Migrate legacy data to new system",
  },
];

const defaultTasks = [
  {
    id: "t1",
    name: "Design homepage mockup",
    projectId: "p1",
    assignee: "You",
    dueDate: "2026-02-10",
    priority: "High",
    status: "On track",
    section: "To do",
    description: "Create wireframes and mockups for the new homepage",
  },
  {
    id: "t2",
    name: "Set up CI/CD pipeline",
    projectId: "p1",
    assignee: "Alice",
    dueDate: "2026-02-12",
    priority: "Medium",
    status: "On track",
    section: "Doing",
    description: "Configure automated deployment pipeline",
  },
  {
    id: "t3",
    name: "Write API documentation",
    projectId: "p2",
    assignee: "Bob",
    dueDate: "2026-02-15",
    priority: "Low",
    status: "At risk",
    section: "To do",
    description: "Document all API endpoints for the mobile app",
  },
  {
    id: "t4",
    name: "User authentication module",
    projectId: "p2",
    assignee: "You",
    dueDate: "2026-02-09",
    priority: "High",
    status: "Off track",
    section: "Doing",
    description: "Implement login and registration functionality",
  },
  {
    id: "t5",
    name: "Social media content plan",
    projectId: "p3",
    assignee: "Diana",
    dueDate: "2026-02-08",
    priority: "Medium",
    status: "On track",
    section: "Done",
    description: "Create content calendar for social media",
  },
  {
    id: "t6",
    name: "Database schema design",
    projectId: "p4",
    assignee: "Frank",
    dueDate: "2026-02-20",
    priority: "High",
    status: "At risk",
    section: "To do",
    description: "Design the new database schema for migration",
  },
  {
    id: "t7",
    name: "Review competitor analysis",
    projectId: "p3",
    assignee: "Eve",
    dueDate: "2026-02-11",
    priority: "Low",
    status: "On track",
    section: "To do",
    description: "Analyze competitor marketing strategies",
  },
  {
    id: "t8",
    name: "Performance optimization",
    projectId: "p1",
    assignee: "You",
    dueDate: "2026-02-14",
    priority: "Medium",
    status: "On track",
    section: "To do",
    description: "Optimize page load times and performance metrics",
  },
];

const defaultGoals = [
  {
    id: "g1",
    name: "Launch redesigned website",
    status: "On track",
    progress: 65,
    timePeriod: "Q1 2026",
    team: "Engineering",
    owner: "You",
  },
  {
    id: "g2",
    name: "Reach 10k mobile app downloads",
    status: "At risk",
    progress: 30,
    timePeriod: "Q2 2026",
    team: "Product",
    owner: "Charlie",
  },
  {
    id: "g3",
    name: "Increase conversion rate by 20%",
    status: "On track",
    progress: 55,
    timePeriod: "Q1 2026",
    team: "Marketing",
    owner: "Diana",
  },
];

export function AppProvider({ children }) {
  const [user, setUser] = useState(defaultUser);
  const [projects, setProjects] = useState(defaultProjects);
  const [tasks, setTasks] = useState(defaultTasks);
  const [goals, setGoals] = useState(defaultGoals);
  const [currentPage, setCurrentPage] = useState("landing");
  const [currentProject, setCurrentProject] = useState(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const login = useCallback((email, password) => {
    setUser({ name: email.split("@")[0], email, avatar: null });
    setCurrentPage("home");
  }, []);

  const signup = useCallback((name, email, password) => {
    setUser({ name, email, avatar: null });
    setCurrentPage("home");
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setCurrentPage("landing");
  }, []);

  const addTask = useCallback((task) => {
    setTasks((prev) => [
      ...prev,
      { ...task, id: "t" + (prev.length + 1) },
    ]);
  }, []);

  const updateTask = useCallback((id, updates) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updates } : t))
    );
  }, []);

  const deleteTask = useCallback((id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addProject = useCallback((project) => {
    setProjects((prev) => [
      ...prev,
      { ...project, id: "p" + (prev.length + 1) },
    ]);
  }, []);

  const addGoal = useCallback((goal) => {
    setGoals((prev) => [...prev, { ...goal, id: "g" + (prev.length + 1) }]);
  }, []);

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        login,
        signup,
        logout,
        projects,
        setProjects,
        addProject,
        tasks,
        setTasks,
        addTask,
        updateTask,
        deleteTask,
        goals,
        setGoals,
        addGoal,
        currentPage,
        setCurrentPage,
        currentProject,
        setCurrentProject,
        sidebarCollapsed,
        setSidebarCollapsed,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
