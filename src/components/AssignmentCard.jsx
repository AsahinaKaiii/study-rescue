import { useState } from "react";
import { calculatePriority } from "../utils/priority";

function AssignmentCard({
  assignment,
  onUpdateProgress,
}) {
  const result = calculatePriority(assignment);

  const [progress, setProgress] = useState(
    assignment.progress
  );

  function handleProgressChange(event) {
    setProgress(Number(event.target.value));
  }

  function handleSaveProgress() {
    onUpdateProgress(assignment.id, progress);
  }

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
            : `${result.daysLeft} day${
                result.daysLeft === 1 ? "" : "s"
              } left`}
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

        <strong>{progress}%</strong>
      </div>

      <input
        type="range"
        min="0"
        max="100"
        step="10"
        value={progress}
        onChange={handleProgressChange}
        className="progress-slider"
      />

      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{
            width: `${progress}%`,
          }}
        ></div>
      </div>

      <button
        className="save-progress-button"
        onClick={handleSaveProgress}
      >
        Save Progress
      </button>

      <div className="priority-score">
        Priority Score:{" "}
        <strong>{result.score}</strong>
      </div>
    </div>
  );
}

export default AssignmentCard;