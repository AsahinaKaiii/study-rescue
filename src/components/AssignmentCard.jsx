import { calculatePriority } from "../utils/priority";

function AssignmentCard({ assignment }) {
  const result = calculatePriority(assignment);

  return (
    <div className="assignment-card">
      <div className="assignment-top">
        <div>
          <span className="module">
            {assignment.module}
          </span>

          <h3>{assignment.title}</h3>
        </div>

        <span
          className={`priority-badge ${result.priority.toLowerCase()}`}
        >
          {result.priority}
        </span>
      </div>

      <div className="assignment-details">
        <span>Due: {assignment.deadline}</span>

        <span>
          {result.daysLeft <= 0
            ? "Due today / overdue"
            : `${result.daysLeft} day${result.daysLeft === 1 ? "" : "s"} left`}
        </span>

        <span>Weight: {assignment.weight}%</span>

        <span>Est: {assignment.estimatedHours} hrs</span>
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

      <div className="priority-score">
        Priority Score: <strong>{result.score}</strong>
      </div>
    </div>
  );
}

export default AssignmentCard;