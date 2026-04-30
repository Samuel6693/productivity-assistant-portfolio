import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Habits.css";

const HabitsPage = ({ habits = [], setHabits = () => {} }) => {
  const habitList = habits;
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("medium");
  const [repetitions, setRepetitions] = useState(0);
  const [editId, setEditId] = useState(null);

  const [filterPriority, setFilterPriority] = useState("all");
  const [sortBy, setSortBy] = useState("repetitions");
  const [sortOrder, setSortOrder] = useState("desc");

  const PRIORITIES = ["low", "medium", "high"];
  const formatPriority = (level) => {
    if (level === "low") return "Low priority";
    if (level === "high") return "High priority";
    return "Medium priority";
  };

  const resetForm = () => {
    setTitle("");
    setPriority("medium");
    setRepetitions(0);
    setEditId(null);
  };

  const validate = () => {
    if (!title.trim()) return "Title is required";
    if (!PRIORITIES.includes(priority)) return "Invalid priority";
    if (repetitions < 0) return "Repetitions must be 0 or greater";
    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const err = validate();
    if (err) return alert(err);

    if (editId) {
      setHabits((prev) =>
        prev.map((habit) =>
          habit.id === editId ? { ...habit, title: title.trim(), priority, repetitions } : habit,
        ),
      );
      resetForm();
      return;
    }

    const newHabit = {
      id: Date.now().toString(),
      title: title.trim(),
      priority,
      repetitions,
    };
    setHabits((prev) => [newHabit, ...prev]);
    resetForm();
  };

  const removeHabit = (id) => setHabits((prev) => prev.filter((habit) => habit.id !== id));
  const inc = (id) =>
    setHabits((prev) =>
      prev.map((habit) =>
        habit.id === id ? { ...habit, repetitions: (habit.repetitions || 0) + 1 } : habit,
      ),
    );
  const dec = (id) =>
    setHabits((prev) =>
      prev.map((habit) =>
        habit.id === id ? { ...habit, repetitions: Math.max(0, (habit.repetitions || 0) - 1) } : habit,
      ),
    );
  const reset = (id) =>
    setHabits((prev) =>
      prev.map((habit) => (habit.id === id ? { ...habit, repetitions: 0 } : habit)),
    );

  const startEdit = (id) => {
    const habit = habitList.find((item) => item.id === id);
    if (!habit) return;
    setTitle(habit.title);
    setPriority(habit.priority || "medium");
    setRepetitions(habit.repetitions || 0);
    setEditId(habit.id);
  };

  const filtered = habitList.filter((habit) =>
    filterPriority === "all" ? true : habit.priority === filterPriority,
  );
  const priorityWeight = (level) => (level === "high" ? 3 : level === "medium" ? 2 : 1);

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "repetitions") {
      return sortOrder === "desc" ? b.repetitions - a.repetitions : a.repetitions - b.repetitions;
    }
    return sortOrder === "desc"
      ? priorityWeight(b.priority) - priorityWeight(a.priority)
      : priorityWeight(a.priority) - priorityWeight(b.priority);
  });

  return (
    <div className="habits-page">
      <section className="page-header">
        <h1>Habits</h1>

        <Link className="dashboard-link" to="/">
          Dashboard
        </Link>
      </section>

      <section className="page-section">
        <h2>{editId ? "Editing habit" : "Create a new habit"}</h2>

        <form onSubmit={handleSubmit} className="habit-form">
          <label>
            Habit title
            <input
              value={title}
              placeholder="Example: Read for 20 minutes"
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>

          <label>
            Priority
            <select value={priority} onChange={(e) => setPriority(e.target.value)}>
              {PRIORITIES.map((level) => (
                <option key={level} value={level}>
                  {formatPriority(level)}
                </option>
              ))}
            </select>
          </label>

          <label>
            Repetitions
            <input
              type="number"
              min="0"
              value={repetitions}
              onChange={(e) => {
                const value = e.target.value;
                if (value === "") {
                  setRepetitions("");
                } else {
                  setRepetitions(Math.max(0, Number(value)));
                }
              }}
            />
          </label>

          <div className="form-actions">
            <button type="submit">{editId ? "Save changes" : "Add habit"}</button>
            <button type="button" onClick={resetForm}>
              {editId ? "Cancel editing" : "Clear form"}
            </button>
          </div>
        </form>
      </section>

      <section className="page-section controls">
        <h2>Filters & sorting</h2>

        <label>
          Filter by priority
          <select value={filterPriority} onChange={(e) => setFilterPriority(e.target.value)}>
            <option value="all">All priorities</option>
            {PRIORITIES.map((level) => (
              <option key={level} value={level}>
                {formatPriority(level)}
              </option>
            ))}
          </select>
        </label>

        <label>
          Sort by
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="repetitions">Most repetitions</option>
            <option value="priority">Priority level</option>
          </select>
        </label>

        <label>
          Order
          <button
            type="button"
            className="order-btn"
            onClick={() => setSortOrder((state) => (state === "desc" ? "asc" : "desc"))}
          >
            {sortOrder === "desc" ? "Sort descending" : "Sort ascending"}
          </button>
        </label>
      </section>

      <section className="page-section">
        <h2>All habits</h2>
        {sorted.length === 0 ? (
          <p className="habit-empty">
            No habits match your current view. Add a habit or adjust the priority filter.
          </p>
        ) : (
          <div className="habit-list">
            {sorted.map((habit) => (
              <div key={habit.id} className="habit-item">
                <div className="left">
                  <strong>{habit.title}</strong>
                  <div className="meta">
                    {formatPriority(habit.priority)} - {habit.repetitions} repetitions
                  </div>
                </div>
                <div className="right">
                  <button onClick={() => inc(habit.id)}>+</button>
                  <button onClick={() => dec(habit.id)}>-</button>
                  <button onClick={() => reset(habit.id)}>Reset reps</button>
                  <button onClick={() => startEdit(habit.id)}>Edit</button>
                  <button onClick={() => removeHabit(habit.id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default HabitsPage;
