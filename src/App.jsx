import { useEffect, useState } from "react";
import Dashboard from "./pages/Dashboard";
import AddAssignment from "./pages/AddAssignment";
import Auth from "./pages/Auth";
import { supabase } from "./services/supabase";

function App() {
  const [page, setPage] = useState("dashboard");
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  const [assignments, setAssignments] = useState(() => {
    const savedAssignments = localStorage.getItem(
      "study-rescue-assignments"
    );

    return savedAssignments
      ? JSON.parse(savedAssignments)
      : [];
  });

  useEffect(() => {
    async function checkSession() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      setSession(session);
      setLoading(false);
    }

    checkSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

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

  if (loading) {
    return (
      <div className="page">
        <div className="form-container">
          <h2>Loading Study Rescue...</h2>
        </div>
      </div>
    );
  }

  if (!session) {
    return <Auth />;
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