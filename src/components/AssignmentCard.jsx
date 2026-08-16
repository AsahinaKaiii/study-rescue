function AssignmentCard({ assignment }) {
  return (
    <div className="assignment-card">
      <div className="assignment-top">
        <div>
          <span className="module">
            {assignment.module}
          </span>

          <h3>{assignment.title}</h3>
        </div>

        <span className="difficulty">
          {assignment.difficulty}
        </span>
      </div>

      <div className="assignment-details">
        <span>
          Due: {assignment.deadline}
        </span>

        <span>
          Weight: {assignment.weight}%
        </span>

        <span>
          Est: {assignment.estimatedHours} hrs
        </span>
      </div>

      <div className="progress-row">
        <span>Progress</span>
        <strong>{assignment.progress}%</strong>
      </div>

      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{
            width: `${assignment.progress}%`,
          }}
        ></div>
      </div>
    </div>
  );
}

export default AssignmentCard;