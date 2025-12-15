import React, { useState } from "react";

export default function AIInsights({ navigate }) {
  const [loading, setLoading] = useState(false);
  const [insight, setInsight] = useState("");

  const generateInsights = async () => {
    setLoading(true);
    setInsight("");

    // Load mood entries from localStorage
    const moodEntries = JSON.parse(localStorage.getItem("moodEntries")) || [];

    // Build prompt for Gemini
    const prompt = `
You are a helpful AI assistant analyzing the user's mood and habit entries.
Mood and habit data:
${JSON.stringify(moodEntries, null, 2)}

Provide:
1. Emotional patterns
2. Habit suggestions
3. Encouraging insights
`;

    try {
      const response = await fetch("http://localhost:5000/ai-insights", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();
      setInsight(data.insight);
    } catch (error) {
      setInsight("Failed to fetch AI insights.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <button
        onClick={() => navigate("dashboard")}
        className="mb-4 px-4 py-2 bg-gray-200 rounded"
      >
        ← Back
      </button>

      <h1 className="text-2xl font-bold mb-4">AI Insights</h1>

      <button
        onClick={generateInsights}
        className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
      >
        Generate Insights
      </button>

      {loading && <p className="mt-4 text-gray-500">Thinking...</p>}

      {insight && (
        <div className="mt-6 p-4 border rounded bg-purple-50 whitespace-pre-line">
          {insight}
        </div>
      )}
    </div>
  );
}
