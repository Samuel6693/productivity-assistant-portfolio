import { useState } from "react";
import { Link } from "react-router-dom";
import HabitFilters from "../components/HabitFilters";
import HabitForm from "../components/HabitForm";
import HabitList from "../components/HabitList";
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

      <div className="page-workspace">
        <section className="page-section page-form-panel">
          <h2>{editId ? "Editing habit" : "Create a new habit"}</h2>

          <HabitForm
            editId={editId}
            title={title}
            priority={priority}
            repetitions={repetitions}
            priorities={PRIORITIES}
            formatPriority={formatPriority}
            setTitle={setTitle}
            setPriority={setPriority}
            setRepetitions={setRepetitions}
            handleSubmit={handleSubmit}
            resetForm={resetForm}
          />
        </section>

        <div className="page-list-panel">
          <HabitFilters
            filterPriority={filterPriority}
            sortBy={sortBy}
            sortOrder={sortOrder}
            priorities={PRIORITIES}
            formatPriority={formatPriority}
            setFilterPriority={setFilterPriority}
            setSortBy={setSortBy}
            setSortOrder={setSortOrder}
          />

          <section className="page-section">
            <h2>All habits</h2>

            <HabitList
              habits={sorted}
              formatPriority={formatPriority}
              inc={inc}
              dec={dec}
              reset={reset}
              startEdit={startEdit}
              removeHabit={removeHabit}
            />
          </section>
        </div>
      </div>
    </div>
  );
};

export default HabitsPage;
