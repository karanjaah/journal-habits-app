type PageProps = { navigate: (page: string) => void };

export default function AIInsights({ navigate }: PageProps) {
  return (
    <div>
      <button 
        onClick={() => navigate("dashboard")} 
        className="mb-4 px-4 py-2 bg-gray-200 rounded"
      >
        Back
      </button>
      <h1 className="text-2xl font-bold">AI Insights</h1>
      <p className="italic mt-2">View weekly and monthly reports and insights based on your data.</p>
    </div>
  );
}
