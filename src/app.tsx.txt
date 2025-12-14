import { useState } from "react";
import Dashboard from "./pages/Dashboard";
import Journal from "./pages/Journal";
import HabitTracker from "./pages/HabitTracker";
import MoodBehavior from "./pages/MoodBehavior";
import AIInsights from "./pages/AIInsights";
import Settings from "./pages/Settings";

type Page = "dashboard" | "journal" | "habit" | "mood" | "ai" | "settings";

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("dashboard");

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {currentPage === "dashboard" && <Dashboard navigate={setCurrentPage} />}
      {currentPage === "journal" && <Journal navigate={setCurrentPage} />}
      {currentPage === "habit" && <HabitTracker navigate={setCurrentPage} />}
      {currentPage === "mood" && <MoodBehavior navigate={setCurrentPage} />}
      {currentPage === "ai" && <AIInsights navigate={setCurrentPage} />}
      {currentPage === "settings" && <Settings navigate={setCurrentPage} />}
    </div>
  );
}
