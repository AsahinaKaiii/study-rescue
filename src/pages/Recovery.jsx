import { useState } from "react";

function Recovery({
  onRecover,
  onCancel,
  generatingPlan,
}) {
  const [missedHours, setMissedHours] = useState(1);
  const [reason, setReason] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    onRecover({
      missedHours: Number(missedHours),
      reason,
    });
  }

  return (
    <div className="page">
      <div className="form-container">
        <button
          className="back-button"
          onClick={onCancel}
          type="button"
        >
          ← Back to Dashboard
        </button>

        <h1>I Fell Behind</h1>

        <p className="section-description">
          That's okay. Tell Study Rescue what changed
          and we'll rebuild your plan.
        </p>

        <form onSubmit={handleSubmit}>
          <label>How many study hours did you miss?</label>

          <input
            type="number"
            min="0.5"
            step="0.5"
            value={missedHours}
            onChange={(event) =>
              setMissedHours(event.target.value)
            }
            required
          />

          <label>What happened?</label>

          <select
            value={reason}
            onChange={(event) =>
              setReason(event.target.value)
            }
            required
          >
            <option value="">
              Select a reason
            </option>

            <option value="Work commitment">
              Work commitment
            </option>

            <option value="Illness">
              Illness
            </option>

            <option value="Family responsibility">
              Family responsibility
            </option>

            <option value="Unexpected event">
              Unexpected event
            </option>

            <option value="I underestimated the work">
              I underestimated the work
            </option>

            <option value="Other">
              Other
            </option>
          </select>

          <button
            className="rescue-button"
            type="submit"
            disabled={generatingPlan}
          >
            {generatingPlan
              ? "Rebuilding..."
              : "Rebuild My Plan"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Recovery;