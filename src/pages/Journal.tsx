import { useState, ChangeEvent } from "react";

type JournalEntry = {
  mood: string;
  title: string;
  text: string;
  tags: string;
  attachment: File | null;
  timestamp: Date;
};

type JournalProps = { navigate: (page: string) => void };

export default function Journal({ navigate }: JournalProps) {
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([]);
  const [newEntry, setNewEntry] = useState<JournalEntry>({
    mood: "Happy",
    title: "",
    text: "",
    tags: "",
    attachment: null,
    timestamp: new Date(),
  });

  const moods = ["Happy", "Neutral", "Sad"];

  const handleEntrySubmit = () => {
    if (!newEntry.title && !newEntry.text) return;
    setJournalEntries([...journalEntries, { ...newEntry, timestamp: new Date() }]);
    setNewEntry({ mood: "Happy", title: "", text: "", tags: "", attachment: null, timestamp: new Date() });
  };

  const handleDelete = (index: number) => {
    setJournalEntries(journalEntries.filter((_, i) => i !== index));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) setNewEntry({ ...newEntry, attachment: e.target.files[0] });
    else setNewEntry({ ...newEntry, attachment: null });
  };

  return (
    <div>
      <button onClick={() => navigate("dashboard")} className="mb-4 px-4 py-2 bg-gray-200 rounded">Back</button>
      <h1 className="text-2xl font-bold mb-4">Journal</h1>

      <div className="border p-4 rounded shadow mb-6 space-y-2">
        <select value={newEntry.mood} onChange={(e) => setNewEntry({ ...newEntry, mood: e.target.value })} className="border p-1 rounded">
          {moods.map((m) => <option key={m} value={m}>{m}</option>)}
        </select>

        <input type="text" placeholder="Title" value={newEntry.title} onChange={(e) => setNewEntry({ ...newEntry, title: e.target.value })} className="border p-1 rounded w-full" />

        <textarea placeholder="Text" value={newEntry.text} onChange={(e) => setNewEntry({ ...newEntry, text: e.target.value })} className="border p-1 rounded w-full" />

        <input type="text" placeholder="Tags (comma separated)" value={newEntry.tags} onChange={(e) => setNewEntry({ ...newEntry, tags: e.target.value })} className="border p-1 rounded w-full" />

        <input type="file" onChange={handleFileChange} />

        <button onClick={handleEntrySubmit} className="bg-blue-500 text-white px-4 py-1 rounded mt-2">Add Entry</button>
      </div>

      <div className="space-y-4">
        {journalEntries.map((entry, index) => (
          <div key={index} className="border p-3 rounded shadow">
            <p><strong>Mood:</strong> {entry.mood} | <strong>Title:</strong> {entry.title}</p>
            <p>{entry.text}</p>
            <p className="italic text-sm">{entry.tags}</p>
            {entry.attachment && <p>File: {entry.attachment.name}</p>}
            <button onClick={() => handleDelete(index)} className="bg-red-500 text-white px-2 py-1 rounded mt-2">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}
