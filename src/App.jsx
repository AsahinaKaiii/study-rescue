import { useEffect, useState } from "react";
import Dashboard from "./pages/Dashboard";
import AddAssignment from "./pages/AddAssignment";
import Auth from "./pages/Auth";
import { supabase } from "./services/supabase";
import { calculatePriority } from "./utils/priority";
import Availability from "./pages/Availability";

function App() {
  const [page, setPage] = useState("dashboard");
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [assignments, setAssignments] = useState([]);

    const [availability, setAvailability] = useState({
    Monday: 0,
    Tuesday: 0,
    Wednesday: 0,
    Thursday: 0,
    Friday: 0,
    Saturday: 0,
    Sunday: 0,
  });

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
        console.error(
          "Error loading assignments:",
          error
        );
        return;
      }

      const formattedAssignments = data.map(
        (assignment) => ({
          id: assignment.id,
          module: assignment.module,
          title: assignment.title,
          deadline: assignment.deadline,
          weight: assignment.weight,
          estimatedHours:
            assignment.estimated_hours,
          difficulty: assignment.difficulty,
          progress: assignment.progress,
        })
      );

      setAssignments(formattedAssignments);
    }

    loadAssignments();
  }, [session]);

    // Load study availability from Supabase
  useEffect(() => {
    if (!session) {
      return;
    }

    async function loadAvailability() {
      const { data, error } = await supabase
        .from("availability")
        .select("*")
        .eq("user_id", session.user.id)
        .maybeSingle();

      if (error) {
        console.error(
          "Error loading availability:",
          error
        );
        return;
      }

      if (data) {
        setAvailability({
          Monday: Number(data.monday),
          Tuesday: Number(data.tuesday),
          Wednesday: Number(data.wednesday),
          Thursday: Number(data.thursday),
          Friday: Number(data.friday),
          Saturday: Number(data.saturday),
          Sunday: Number(data.sunday),
        });
      }
    }

    loadAvailability();
  }, [session]);

  // Save assignment to Supabase
  async function handleSaveAssignment(formData) {
    if (!session) return;

    const cleanAssignment = {
      ...formData,
      weight: Number(formData.weight),
      estimatedHours: Number(
        formData.estimatedHours
      ),
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
      console.error(
        "Error saving assignment:",
        error
      );

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

  // Sign user out
  async function handleLogout() {
    const { error } = await supabase.auth.signOut({
      scope: "local",
    });

    if (error) {
      console.error(
        "Error signing out:",
        error
      );

      alert(
        "Could not sign out. Please try again."
      );

      return;
    }

    setPage("dashboard");
  }

  // Update assignment progress
  async function handleUpdateProgress(
    assignmentId,
    newProgress
  ) {
    const assignment = assignments.find(
      (item) => item.id === assignmentId
    );

    if (!assignment) return;

    const updatedAssignment = {
      ...assignment,
      progress: Number(newProgress),
    };

    const priority =
      calculatePriority(updatedAssignment);

    const { data, error } = await supabase
      .from("assignments")
      .update({
        progress: Number(newProgress),
        priority_score: priority.score,
        status:
          Number(newProgress) === 100
            ? "completed"
            : "pending",
      })
      .eq("id", assignmentId)
      .select()
      .single();

    if (error) {
      console.error(
        "Error updating progress:",
        error
      );

      alert(
        "Progress could not be updated."
      );

      return;
    }

    setAssignments((previous) =>
      previous.map((item) =>
        item.id === assignmentId
          ? {
              ...item,
              progress: data.progress,
            }
          : item
      )
    );
  }

  async function handleSaveAvailability(data) {
    if (!session) return;

    const availabilityData = {
      user_id: session.user.id,
      monday: Number(data.Monday),
      tuesday: Number(data.Tuesday),
      wednesday: Number(data.Wednesday),
      thursday: Number(data.Thursday),
      friday: Number(data.Friday),
      saturday: Number(data.Saturday),
      sunday: Number(data.Sunday),
    };

    // Check whether this user already has
    // an availability record
    const {
      data: existingAvailability,
      error: lookupError,
    } = await supabase
      .from("availability")
      .select("id")
      .eq("user_id", session.user.id)
      .maybeSingle();

    if (lookupError) {
      console.error(
        "Error checking availability:",
        lookupError
      );

      alert(
        "Could not save your availability."
      );

      return;
    }

    let error;

    if (existingAvailability) {
      // Update existing availability
      const result = await supabase
        .from("availability")
        .update(availabilityData)
        .eq("id", existingAvailability.id);

      error = result.error;
    } else {
      // Create first availability record
      const result = await supabase
        .from("availability")
        .insert(availabilityData);

      error = result.error;
    }

    if (error) {
      console.error(
        "Error saving availability:",
        error
      );

      alert(
        "Could not save your availability."
      );

      return;
    }

    setAvailability(data);
    setPage("dashboard");
  }

  // Loading screen
  if (loading) {
    return (
      <div className="page">
        <div className="form-container">
          <h2>Loading Study Rescue...</h2>
        </div>
      </div>
    );
  }

  // Login page
  if (!session) {
    return <Auth />;
  }

  // Add assignment page
  if (page === "add") {
    return (
      <AddAssignment
        onSave={handleSaveAssignment}
        onCancel={() =>
          setPage("dashboard")
        }
      />
    );
  }

     if (page === "availability") {
    return (
      <Availability
        initialAvailability={availability}
        onSave={handleSaveAvailability}
        onCancel={() => setPage("dashboard")}
      />
    );
  }
  // Main dashboard
  return (
    <Dashboard
      assignments={assignments}
      onAddAssignment={() =>
        setPage("add")
      }
      onLogout={handleLogout}
      onUpdateProgress={handleUpdateProgress}
      onAvailability={() => setPage("availability")

      }
    />
  );
}

export default App;