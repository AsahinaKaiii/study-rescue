import { useEffect, useState } from "react";
import Dashboard from "./pages/Dashboard";
import AddAssignment from "./pages/AddAssignment";
import Auth from "./pages/Auth";
import { supabase } from "./services/supabase";
import { calculatePriority } from "./utils/priority";

function App() {
  const [page, setPage] = useState("dashboard");
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [assignments, setAssignments] = useState([]);

  // Check whether user is logged in
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

  // Load assignments from Supabase
  useEffect(() => {
    if (!session) {
      setAssignments([]);
      return;
    }

    async function loadAssignments() {
      const { data, error } = await supabase
        .from("assignments")
        .select("*")
        .order("created_at", {
          ascending: false,
        });

      if (error) {
        console.error("Error loading assignments:", error);
        return;
      }

      const formattedAssignments = data.map(
        (assignment) => ({
          id: assignment.id,
          module: assignment.module,
          title: assignment.title,
          deadline: assignment.deadline,
          weight: assignment.weight,
          estimatedHours: assignment.estimated_hours,
          difficulty: assignment.difficulty,
          progress: assignment.progress,
        })
      );

      setAssignments(formattedAssignments);
    }

    loadAssignments();
  }, [session]);

  // Save assignment to Supabase
  async function handleSaveAssignment(formData) {
    if (!session) return;

    const cleanAssignment = {
      ...formData,
      weight: Number(formData.weight),
      estimatedHours: Number(formData.estimatedHours),
      progress: Number(formData.progress),
    };

    const priority =
      calculatePriority(cleanAssignment);

    const { data, error } = await supabase
      .from("assignments")
      .insert({
        user_id: session.user.id,
        module: cleanAssignment.module,
        title: cleanAssignment.title,
        deadline: cleanAssignment.deadline,
        weight: cleanAssignment.weight,
        estimated_hours:
          cleanAssignment.estimatedHours,
        difficulty: cleanAssignment.difficulty,
        progress: cleanAssignment.progress,
        priority_score: priority.score,
        status:
          cleanAssignment.progress === 100
            ? "completed"
            : "pending",
      })
      .select()
      .single();

    if (error) {
      console.error("Error saving assignment:", error);

      alert(
        "Assignment could not be saved. Check the browser console."
      );

      return;
    }

    const newAssignment = {
      id: data.id,
      module: data.module,
      title: data.title,
      deadline: data.deadline,
      weight: data.weight,
      estimatedHours: data.estimated_hours,
      difficulty: data.difficulty,
      progress: data.progress,
    };

    setAssignments((previous) => [
      newAssignment,
      ...previous,
    ]);

    setPage("dashboard");
  }
async function handleLogout() {
  const { error } = await supabase.auth.signOut({
    scope: "local",
  });

  if (error) {
    console.error("Error signing out:", error);
    alert("Could not sign out. Please try again.");
    return;
  }

  setPage("dashboard");
}
async function handleLogout() {
  const { error } = await supabase.auth.signOut({
    scope: "local",
  });

  if (error) {
    console.error("Error signing out:", error);
    alert("Could not sign out. Please try again.");
    return;
  }

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
    onLogout={handleLogout}
  />
);
}

export default App;