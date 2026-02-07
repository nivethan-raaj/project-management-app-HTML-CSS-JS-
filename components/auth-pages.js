"use client";

import { useState } from "react";
import { useApp } from "@/lib/app-context";

export function LoginPage() {
  const { login, setCurrentPage } = useApp();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }
    login(email, password);
  };

  return (
    <div className="min-h-screen bg-[hsl(220,15%,8%)] flex">
      {/* Left panel */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <button
            onClick={() => setCurrentPage("landing")}
            className="flex items-center gap-2 text-[hsl(215,15%,55%)] hover:text-[hsl(210,20%,85%)] text-sm mb-8 transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
            </svg>
            Back to home
          </button>

          <div className="flex items-center gap-2 mb-8">
            <div className="w-9 h-9 rounded-lg bg-[hsl(210,80%,56%)] flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 17l10-10M12 7l10 10M2 7l10 10M12 17l10-10" />
              </svg>
            </div>
            <span className="font-bold text-[hsl(210,20%,95%)] text-xl">ProjectFlow</span>
          </div>

          <h1 className="text-3xl font-bold text-[hsl(210,20%,95%)] mb-2">Welcome back</h1>
          <p className="text-[hsl(215,15%,55%)] mb-8">Log in to your account to continue.</p>

          {error && (
            <div className="bg-[hsl(0,72%,51%,0.12)] border border-[hsl(0,72%,51%,0.3)] text-[hsl(0,72%,65%)] text-sm px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[hsl(210,20%,80%)] mb-1.5">Email address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-2.5 bg-[hsl(220,15%,14%)] border border-[hsl(220,12%,22%)] rounded-lg text-[hsl(210,20%,90%)] placeholder-[hsl(215,15%,40%)] focus:outline-none focus:border-[hsl(210,80%,56%)] focus:ring-1 focus:ring-[hsl(210,80%,56%)] transition-colors text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[hsl(210,20%,80%)] mb-1.5">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-4 py-2.5 bg-[hsl(220,15%,14%)] border border-[hsl(220,12%,22%)] rounded-lg text-[hsl(210,20%,90%)] placeholder-[hsl(215,15%,40%)] focus:outline-none focus:border-[hsl(210,80%,56%)] focus:ring-1 focus:ring-[hsl(210,80%,56%)] transition-colors text-sm"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2.5 bg-[hsl(210,80%,56%)] hover:bg-[hsl(210,80%,48%)] text-[hsl(0,0%,100%)] rounded-lg font-semibold text-sm transition-colors"
            >
              Log In
            </button>
          </form>

          <p className="mt-6 text-sm text-[hsl(215,15%,50%)] text-center">
            {"Don't have an account? "}
            <button onClick={() => setCurrentPage("signup")} className="text-[hsl(210,80%,56%)] hover:underline font-medium">
              Sign up
            </button>
          </p>
        </div>
      </div>

      {/* Right panel - decorative */}
      <div className="hidden lg:flex flex-1 items-center justify-center bg-[hsl(220,15%,10%)] border-l border-[hsl(220,12%,15%)]">
        <div className="text-center px-12">
          <div className="w-32 h-32 rounded-full bg-[hsl(210,80%,56%,0.08)] flex items-center justify-center mx-auto mb-8 border border-[hsl(210,80%,56%,0.15)]">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="hsl(210,80%,56%)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-[hsl(210,20%,90%)] mb-3">Manage work, hit deadlines</h2>
          <p className="text-[hsl(215,15%,50%)] max-w-sm leading-relaxed">Join thousands of teams using ProjectFlow to streamline their project management.</p>
        </div>
      </div>
    </div>
  );
}

export function SignupPage() {
  const { signup, setCurrentPage } = useApp();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setError("Please fill in all fields");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    signup(name, email, password);
  };

  return (
    <div className="min-h-screen bg-[hsl(220,15%,8%)] flex">
      {/* Left panel */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <button
            onClick={() => setCurrentPage("landing")}
            className="flex items-center gap-2 text-[hsl(215,15%,55%)] hover:text-[hsl(210,20%,85%)] text-sm mb-8 transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
            </svg>
            Back to home
          </button>

          <div className="flex items-center gap-2 mb-8">
            <div className="w-9 h-9 rounded-lg bg-[hsl(210,80%,56%)] flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 17l10-10M12 7l10 10M2 7l10 10M12 17l10-10" />
              </svg>
            </div>
            <span className="font-bold text-[hsl(210,20%,95%)] text-xl">ProjectFlow</span>
          </div>

          <h1 className="text-3xl font-bold text-[hsl(210,20%,95%)] mb-2">Create your account</h1>
          <p className="text-[hsl(215,15%,55%)] mb-8">Start managing your projects for free.</p>

          {error && (
            <div className="bg-[hsl(0,72%,51%,0.12)] border border-[hsl(0,72%,51%,0.3)] text-[hsl(0,72%,65%)] text-sm px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[hsl(210,20%,80%)] mb-1.5">Full name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className="w-full px-4 py-2.5 bg-[hsl(220,15%,14%)] border border-[hsl(220,12%,22%)] rounded-lg text-[hsl(210,20%,90%)] placeholder-[hsl(215,15%,40%)] focus:outline-none focus:border-[hsl(210,80%,56%)] focus:ring-1 focus:ring-[hsl(210,80%,56%)] transition-colors text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[hsl(210,20%,80%)] mb-1.5">Email address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-2.5 bg-[hsl(220,15%,14%)] border border-[hsl(220,12%,22%)] rounded-lg text-[hsl(210,20%,90%)] placeholder-[hsl(215,15%,40%)] focus:outline-none focus:border-[hsl(210,80%,56%)] focus:ring-1 focus:ring-[hsl(210,80%,56%)] transition-colors text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[hsl(210,20%,80%)] mb-1.5">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 6 characters"
                className="w-full px-4 py-2.5 bg-[hsl(220,15%,14%)] border border-[hsl(220,12%,22%)] rounded-lg text-[hsl(210,20%,90%)] placeholder-[hsl(215,15%,40%)] focus:outline-none focus:border-[hsl(210,80%,56%)] focus:ring-1 focus:ring-[hsl(210,80%,56%)] transition-colors text-sm"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2.5 bg-[hsl(210,80%,56%)] hover:bg-[hsl(210,80%,48%)] text-[hsl(0,0%,100%)] rounded-lg font-semibold text-sm transition-colors"
            >
              Create Account
            </button>
          </form>

          <p className="mt-6 text-sm text-[hsl(215,15%,50%)] text-center">
            Already have an account?{" "}
            <button onClick={() => setCurrentPage("login")} className="text-[hsl(210,80%,56%)] hover:underline font-medium">
              Log in
            </button>
          </p>
        </div>
      </div>

      {/* Right panel - decorative */}
      <div className="hidden lg:flex flex-1 items-center justify-center bg-[hsl(220,15%,10%)] border-l border-[hsl(220,12%,15%)]">
        <div className="text-center px-12">
          <div className="w-32 h-32 rounded-full bg-[hsl(210,80%,56%,0.08)] flex items-center justify-center mx-auto mb-8 border border-[hsl(210,80%,56%,0.15)]">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="hsl(210,80%,56%)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87" /><path d="M16 3.13a4 4 0 010 7.75" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-[hsl(210,20%,90%)] mb-3">Start collaborating today</h2>
          <p className="text-[hsl(215,15%,50%)] max-w-sm leading-relaxed">Create your free account and invite your team to start organizing projects in minutes.</p>
        </div>
      </div>
    </div>
  );
}
