const TopHabits = ({ count = 3 }) => {
  const translatePriority = (priority) =>
    priority === "low" ? "Low" : priority === "medium" ? "Medium" : priority === "high" ? "High" : priority;

  const getTopHabits = () => {
    try {
      const habits = JSON.parse(localStorage.getItem("habits")) || [];
      return [...habits]
        .map((habit) => ({ ...habit, _score: Number(habit.repetitions ?? 0) }))
        .sort((a, b) => b._score - a._score)
        .slice(0, count);
    } catch {
      return [];
    }
  };

  const top = getTopHabits();

  if (!top || top.length === 0) {
    return (
      <p className="dashboard-empty">
        No habits tracked yet. Add a habit to start building consistency.
      </p>
    );
  }

  return (
    <ul>
      {top.map((habit) => (
        <li key={habit.id}>
          <strong>{habit.title}</strong>
          <span className="dashboard-meta">
            Reps: {habit.repetitions || 0} · Priority:{" "}
            {translatePriority(habit.priority || "medium")}
          </span>
        </li>
      ))}
    </ul>
  );
};

export default TopHabits;
