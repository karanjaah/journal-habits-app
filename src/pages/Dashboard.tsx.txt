type DashboardProps = { navigate: (page: string) => void };

export default function Dashboard({ navigate }: DashboardProps) {
  const buttons = [
    { name: "Add Task", page: "dashboard" },
    { name: "Journal", page: "journal" },
    { name: "Habit Tracker", page: "habit" },
    { name: "Mood & Behavior", page: "mood" },
    { name: "AI Insights", page: "ai" },
    { name: "Settings", page: "settings" }
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Hello! How are you today?</h1>
      <div className="grid grid-cols-2 gap-4">
        {buttons.map((b) => (
          <button
            key={b.name}
            onClick={() => navigate(b.page)}
            className="bg-blue-500 text-white p-4 rounded shadow"
          >
            {b.name}
          </button>
        ))}
      </div>
    </div>
  );
}
