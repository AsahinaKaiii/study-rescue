import { useEffect, useState } from "react";
import Dashboard from "./pages/Dashboard";
import AddAssignment from "./pages/AddAssignment";

function App() {
  const [page, setPage] = useState("dashboard");

  const [assignments, setAssignments] = useState(() => {
    const savedAssignments = localStorage.getItem(
      "study-rescue-assignments"
    );

    return savedAssignments
      ? JSON.parse(savedAssignments)
      : [];
  });

  useEffect(() => {
    localStorage.setItem(
      "study-rescue-assignments",
      JSON.stringify(assignments)
    );
  }, [assignments]);

  function handleSaveAssignment(formData) {
    const newAssignment = {
      id: Date.now(),
      ...formData,
      weight: Number(formData.weight),
      estimatedHours: Number(formData.estimatedHours),
      progress: Number(formData.progress),
    };

    setAssignments((previous) => [
      ...previous,
      newAssignment,
    ]);

    setPage("dashboard");
  }

  if (page === "add") {
    return (
      <AddAssignment
        onSave={handleSaveAssignment}
        onCancel={() => setPage("dashboard")}
      />
    );
  }

  return (
    <Dashboard
      assignments={assignments}
      onAddAssignment={() => setPage("add")}
    />
  );
}

export default App;