export default function useTopHabits(count = 3) {
  try {
    const habits = JSON.parse(localStorage.getItem("habits")) || [];
    const normalized = (habits || []).map((habit) => ({
      id: String(habit?.id || habit?._id || crypto.randomUUID()),
      title: String(habit?.title || habit?.name || ""),
      priority:
        habit?.priority && ["low", "medium", "high"].includes(habit.priority)
          ? habit.priority
          : habit?.priorityLabel
            ? String(habit.priorityLabel).toLowerCase()
            : "medium",
      repetitions: Number(habit?.repetitions !== undefined ? habit.repetitions : habit?.count || 0),
    }));

    const top = [...normalized]
      .sort((a, b) => Number(b.repetitions || 0) - Number(a.repetitions || 0))
      .slice(0, count);

    return { top, total: normalized.length };
  } catch {
    return { top: [], total: 0 };
  }
}
