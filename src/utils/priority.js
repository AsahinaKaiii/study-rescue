export function calculatePriority(assignment) {
  let score = 0;

  const today = new Date();
  const deadline = new Date(assignment.deadline);

  const difference = deadline - today;

  const daysLeft = Math.ceil(
    difference / (1000 * 60 * 60 * 24)
  );

  // Deadline urgency
  if (daysLeft <= 1) {
    score += 40;
  } else if (daysLeft <= 3) {
    score += 30;
  } else if (daysLeft <= 7) {
    score += 20;
  } else {
    score += 10;
  }

  // Assignment weight
  const weight = Number(assignment.weight);

  if (weight >= 30) {
    score += 30;
  } else if (weight >= 20) {
    score += 20;
  } else if (weight >= 10) {
    score += 10;
  }

  // Difficulty
  if (assignment.difficulty === "Hard") {
    score += 15;
  } else if (assignment.difficulty === "Medium") {
    score += 10;
  } else {
    score += 5;
  }

  // Progress
  const progress = Number(assignment.progress);

  if (progress <= 25) {
    score += 15;
  } else if (progress <= 50) {
    score += 10;
  } else if (progress <= 75) {
    score += 5;
  }

  let priority = "Low";

  if (score >= 80) {
    priority = "Critical";
  } else if (score >= 60) {
    priority = "High";
  } else if (score >= 40) {
    priority = "Medium";
  }

  return {
    score,
    priority,
    daysLeft,
  };
}