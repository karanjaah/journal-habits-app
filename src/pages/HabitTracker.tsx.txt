type PageProps = { navigate: (page: string) => void };

export default function HabitTracker({ navigate }: PageProps) {
  return (
    <div>
      <button 
        onClick={() => navigate("dashboard")} 
        className="mb-4 px-4 py-2 bg-gray-200 rounded"
      >
        Back
      </button>
      <h1 className="text-2xl font-bold">Habit Tracker</h1>
      <p className="italic mt-2">Add, edit, and track your daily/weekly/monthly habits here.</p>
    </div>
  );
}
