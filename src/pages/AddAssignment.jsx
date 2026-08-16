import { useState } from "react";

function AddAssignment({ onSave, onCancel }) {
  const [formData, setFormData] = useState({
    module: "",
    title: "",
    deadline: "",
    weight: "",
    estimatedHours: "",
    difficulty: "Medium",
    progress: 0,
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    onSave(formData);
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

        <h1>Add Assignment</h1>

        <p className="section-description">
          Tell Study Rescue what you need to complete.
        </p>

        <form onSubmit={handleSubmit}>
          <label>Module</label>
          <input
            type="text"
            name="module"
            placeholder="e.g. ITECA"
            value={formData.module}
            onChange={handleChange}
            required
          />

          <label>Assignment Name</label>
          <input
            type="text"
            name="title"
            placeholder="e.g. E-Commerce Proposal"
            value={formData.title}
            onChange={handleChange}
            required
          />

          <label>Deadline</label>
          <input
            type="date"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
            required
          />

          <label>Assignment Weight (%)</label>
          <input
            type="number"
            name="weight"
            min="0"
            max="100"
            placeholder="30"
            value={formData.weight}
            onChange={handleChange}
            required
          />

          <label>Estimated Hours Needed</label>
          <input
            type="number"
            name="estimatedHours"
            min="1"
            placeholder="4"
            value={formData.estimatedHours}
            onChange={handleChange}
            required
          />

          <label>Difficulty</label>
          <select
            name="difficulty"
            value={formData.difficulty}
            onChange={handleChange}
          >
            <option>Easy</option>
            <option>Medium</option>
            <option>Hard</option>
          </select>

          <label>Current Progress (%)</label>
          <input
            type="number"
            name="progress"
            min="0"
            max="100"
            value={formData.progress}
            onChange={handleChange}
          />

          <button
            className="primary-button"
            type="submit"
          >
            Save Assignment
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddAssignment;