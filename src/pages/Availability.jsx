import { useState } from "react";

function Availability({ onSave, onCancel }) {
  const [availability, setAvailability] = useState({
    Monday: 0,
    Tuesday: 0,
    Wednesday: 0,
    Thursday: 0,
    Friday: 0,
    Saturday: 0,
    Sunday: 0,
  });

  function handleChange(day, value) {
    setAvailability((previous) => ({
      ...previous,
      [day]: Number(value),
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    onSave(availability);
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

        <h1>Study Availability</h1>

        <p className="section-description">
          How many hours can you realistically study each day?
        </p>

        <form onSubmit={handleSubmit}>
          {Object.entries(availability).map(
            ([day, hours]) => (
              <div
                className="availability-row"
                key={day}
              >
                <label>{day}</label>

                <input
                  type="number"
                  min="0"
                  max="24"
                  step="0.5"
                  value={hours}
                  onChange={(event) =>
                    handleChange(
                      day,
                      event.target.value
                    )
                  }
                />
              </div>
            )
          )}

          <button
            className="primary-button"
            type="submit"
          >
            Save Availability
          </button>
        </form>
      </div>
    </div>
  );
}

export default Availability;