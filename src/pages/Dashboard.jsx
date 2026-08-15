function Dashboard({ onAddAssignment }) {
  return (
    <div className="app-layout">
      <aside className="sidebar">
        <h2>Study Rescue</h2>

        <nav>
          <button className="nav-active">Dashboard</button>
          <button>Assignments</button>
          <button>Study Plan</button>
          <button>Progress</button>
        </nav>

        <div className="sidebar-bottom">
          <button className="rescue-button">
            I Fell Behind
          </button>
        </div>
      </aside>

      <main className="dashboard">
        <header className="dashboard-header">
          <div>
            <p className="small-text">STUDY RESCUE</p>

            <h1>Welcome back 👋</h1>

            <p>
              Let's work out what needs your attention first.
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
            <h2>0</h2>
          </div>

          <div className="stat-card">
            <p>Completed</p>
            <h2>0</h2>
          </div>

          <div className="stat-card">
            <p>Still To Do</p>
            <h2>0</h2>
          </div>
        </section>

        <section>
          <h2>Priority Tasks</h2>

          <p className="section-description">
            Your most important assignments will appear here.
          </p>

          <div className="empty-state">
            <h3>No assignments yet</h3>

            <p>
              Add your first assignment to start building
              your rescue plan.
            </p>

            <button
              className="primary-button"
              onClick={onAddAssignment}
            >
              Add Assignment
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;