import AssignmentCard from "../components/AssignmentCard";
import { calculatePriority } from "../utils/priority";

function Dashboard({
  assignments,
  onAddAssignment,
  onLogout,
  onUpdateProgress,
}) {const completed = assignments.filter(
    (assignment) => assignment.progress === 100
  ).length;

  const remaining =
    assignments.length - completed;

    const sortedAssignments = [...assignments].sort(
  (a, b) =>
    calculatePriority(b).score -
    calculatePriority(a).score
);

  return (
    <div className="app-layout">
      <aside className="sidebar">
        <h2>Study Rescue</h2>

        <nav>
          <button className="nav-active">
            Dashboard
          </button>

          <button>Assignments</button>
          <button>Study Plan</button>
          <button>Progress</button>
        </nav>

    <div className="sidebar-bottom">
  <button className="rescue-button">
    I Fell Behind
  </button>

  <button
    className="logout-button"
    onClick={onLogout}
  >
    Sign Out
  </button>
</div>
      </aside>

      <main className="dashboard">
        <header className="dashboard-header">
          <div>
            <p className="small-text">
              STUDY RESCUE
            </p>

            <h1>Welcome back 👋</h1>

            <p>
              Let's work out what needs your
              attention first.
            </p>
          </div>

          <button
            className="primary-button"
            onClick={onAddAssignment}
          >
            + Add Assignment
          </button>
        </header>

        <section className="stats">
          <div className="stat-card">
            <p>Total Assignments</p>
            <h2>{assignments.length}</h2>
          </div>

          <div className="stat-card">
            <p>Completed</p>
            <h2>{completed}</h2>
          </div>

          <div className="stat-card">
            <p>Still To Do</p>
            <h2>{remaining}</h2>
          </div>
        </section>

        <section>
          <h2>Priority Tasks</h2>

          <p className="section-description">
            Your most important assignments
            will appear here.
          </p>

          {assignments.length === 0 ? (
            <div className="empty-state">
              <h3>No assignments yet</h3>

              <p>
                Add your first assignment to
                start building your rescue plan.
              </p>

              <button
                className="primary-button"
                onClick={onAddAssignment}
              >
                Add Assignment
              </button>
            </div>
          ) : (
            <div className="assignment-grid">
              {sortedAssignments.map((assignment) => (
               <AssignmentCard
  key={assignment.id}
  assignment={assignment}
  onUpdateProgress={onUpdateProgress}
/>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default Dashboard;