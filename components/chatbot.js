"use client";

import { useState, useRef, useEffect } from "react";

const SAMPLE_QUESTIONS = [
  "How do I create a new project?",
  "What is the Board view?",
  "How to set task priorities?",
  "How do I track project progress?",
  "What is Agile methodology?",
  "How to assign tasks to teammates?",
];

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hi! I'm ProjectFlow Assistant. I can help you with project management, navigating the app, or best practices. What would you like to know?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  async function sendMessage(text) {
    const userMsg = text || input.trim();
    if (!userMsg) return;
    setInput("");

    const newMessages = [...messages, { role: "user", content: userMsg }];
    setMessages(newMessages);
    setLoading(true);

    try {
      const apiMessages = newMessages.filter((m) => m.role !== "assistant" || newMessages.indexOf(m) !== 0).length > 0
        ? newMessages.map((m) => ({ role: m.role, content: m.content }))
        : [{ role: "user", content: userMsg }];

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: apiMessages }),
      });

      const data = await res.json();

      if (data.error) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: "Sorry, I encountered an error. Please try again." },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.reply },
        ]);
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Network error. Please check your connection and try again." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handleSampleClick(q) {
    sendMessage(q);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  const showSamples = messages.length <= 1;

  return (
    <>
      {/* Floating button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[hsl(210,80%,56%)] hover:bg-[hsl(210,80%,48%)] text-white shadow-xl flex items-center justify-center transition-all hover:scale-105"
          aria-label="Open chat assistant"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
          </svg>
        </button>
      )}

      {/* Chat window */}
      {open && (
        <div className="fixed bottom-6 right-6 z-50 w-96 h-[520px] bg-[hsl(220,15%,12%)] border border-[hsl(220,12%,22%)] rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-scale-in">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-[hsl(210,80%,56%)] flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                </svg>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">ProjectFlow Assistant</h3>
                <p className="text-[10px] text-white/70">Powered by AI</p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap ${
                    msg.role === "user"
                      ? "bg-[hsl(210,80%,56%)] text-white rounded-br-md"
                      : "bg-[hsl(220,15%,18%)] text-[hsl(210,20%,88%)] border border-[hsl(220,12%,22%)] rounded-bl-md"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="bg-[hsl(220,15%,18%)] border border-[hsl(220,12%,22%)] rounded-2xl rounded-bl-md px-4 py-3 flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-[hsl(215,15%,45%)] animate-bounce" style={{ animationDelay: "0ms" }} />
                  <div className="w-2 h-2 rounded-full bg-[hsl(215,15%,45%)] animate-bounce" style={{ animationDelay: "150ms" }} />
                  <div className="w-2 h-2 rounded-full bg-[hsl(215,15%,45%)] animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            )}

            {/* Sample questions */}
            {showSamples && (
              <div className="pt-2">
                <p className="text-xs text-[hsl(215,15%,45%)] mb-2">Try asking:</p>
                <div className="flex flex-wrap gap-1.5">
                  {SAMPLE_QUESTIONS.map((q, i) => (
                    <button
                      key={i}
                      onClick={() => handleSampleClick(q)}
                      className="text-xs px-3 py-1.5 bg-[hsl(220,15%,18%)] border border-[hsl(220,12%,24%)] rounded-full text-[hsl(210,80%,65%)] hover:bg-[hsl(220,15%,22%)] hover:border-[hsl(210,80%,56%,0.3)] transition-colors"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="flex-shrink-0 px-3 py-3 border-t border-[hsl(220,12%,20%)] bg-[hsl(220,15%,10%)]">
            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask me anything..."
                disabled={loading}
                className="flex-1 bg-[hsl(220,15%,16%)] border border-[hsl(220,12%,24%)] rounded-xl px-4 py-2.5 text-sm text-[hsl(210,20%,90%)] placeholder-[hsl(215,15%,40%)] focus:outline-none focus:border-[hsl(210,80%,56%)] transition-colors disabled:opacity-50"
              />
              <button
                onClick={() => sendMessage()}
                disabled={loading || !input.trim()}
                className="p-2.5 bg-[hsl(210,80%,56%)] hover:bg-[hsl(210,80%,48%)] disabled:opacity-40 disabled:hover:bg-[hsl(210,80%,56%)] text-white rounded-xl transition-colors flex-shrink-0"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
