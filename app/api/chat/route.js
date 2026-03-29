"use server";

export async function POST(request) {
  const { messages } = await request.json();

  const systemMessage = {
    role: "system",
    content: `You are ProjectFlow Assistant, an AI helper built into a project management application called ProjectFlow. You help users with:

1. **Project Management Advice**: How to organize projects, set priorities, manage deadlines, and track progress.
2. **App Navigation**: Guide users on how to use ProjectFlow features like List view, Board view, Timeline view, Calendar view, creating tasks, managing projects, setting goals, and using reporting.
3. **Team Collaboration**: Tips on assigning tasks, communicating with team members, and managing workloads.
4. **Best Practices**: Agile, Scrum, Kanban, waterfall methodologies, sprint planning, retrospectives, and more.
5. **Troubleshooting**: Help users resolve common issues with task management and project workflows.

Key features of ProjectFlow:
- List View: Track tasks in a structured table with priorities, due dates, and statuses
- Board View: Drag and drop tasks across columns (Todo, Doing, Done)
- Timeline View: Gantt-like chart for visualizing deadlines
- Calendar View: See tasks on an interactive calendar
- Goals & Reporting: Set team goals and track progress with charts
- Team Collaboration: Invite teammates, assign tasks
- Projects can have multiple tasks, each with priority (Low/Medium/High), status (On track/At risk/Off track), and sections (To do/Doing/Done)

Keep responses concise, helpful, and friendly. Use bullet points when listing steps. All pricing is in Indian Rupees (INR). The app is built with HTML, CSS, JavaScript, React, Next.js, and Tailwind CSS.`
  };

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [systemMessage, ...messages],
        temperature: 0.7,
        max_tokens: 1024,
        stream: false,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error("[v0] Groq API error:", errorData);
      return Response.json(
        { error: "Failed to get response from AI" },
        { status: 500 }
      );
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "Sorry, I could not generate a response.";

    return Response.json({ reply });
  } catch (error) {
    console.error("[v0] Chatbot error:", error);
    return Response.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
