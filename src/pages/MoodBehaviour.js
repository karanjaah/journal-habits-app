import React, { useState, useEffect } from "react";

export default function MoodBehavior({ navigate }) {
  const [mood, setMood] = useState("");
  const [notes, setNotes] = useState("");
  const [entries, setEntries] = useState([]);

  // Load entries from localStorage on mount
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("moodEntries")) || [];
    setEntries(saved);
  }, []);

  // Save entries to localStorage whenever entries change
  useEffect(() => {
    localStorage.setItem("moodEntries", JSON.stringify(entries));
  }, [entries]);

  const handleSave = () => {
    if (!mood) return alert("Select a mood first!");
    const newEntry = {
      mood,
      notes,
      date: new Date().toISOString().split("T")[0],
    };
    setEntries([...entries, newEntry]);
    setMood("");
    setNotes("");
  };

  const handleDelete = (index) => {
    const updated = entries.filter((_, i) => i !== index);
    setEntries(updated);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <button
        onClick={() => navigate("dashboard")}
        className="mb-4 px-4 py-2 bg-gray-200 rounded"
      >
        ← Back
      </button>

      <h1 className="text-2xl font-bold mb-4">Mood & Behavior</h1>

      <select
        value={mood}
        onChange={(e) => setMood(e.target.value)}
        className="border p-2 rounded mb-4 w-full"
      >
        <option value="">Select Mood</option>
        <option value="Happy">Happy</option>
        <option value="Excited">Excited</option>
        <option value="Calm">Calm</option>
        <option value="Content">Content</option>
        <option value="Neutral">Neutral</option>
        <option value="Sad">Sad</option>
        <option value="Angry">Angry</option>
        <option value="Frustrated">Frustrated</option>
        <option value="Anxious">Anxious</option>
      </select>

      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Add thoughts / behavior notes"
        className="border p-2 rounded mb-4 w-full h-24"
      ></textarea>

      <button
        onClick={handleSave}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-6"
      >
        Save
      </button>

      <h2 className="text-xl font-semibold mb-2">Your Entries</h2>
      <ul className="space-y-3">
        {entries.map((entry, idx) => (
          <li
            key={idx}
            className="border p-3 rounded bg-gray-50 flex justify-between items-start"
          >
            <div>
              <strong>{entry.mood}</strong> - {entry.date}
              {entry.notes && (
                <p className="mt-1 whitespace-pre-line">{entry.notes}</p>
              )}
            </div>
            <button
              onClick={() => handleDelete(idx)}
              className="text-red-500 font-bold ml-4"
            >
              🗑
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
