const HabitList = ({ habits, formatPriority, inc, dec, reset, startEdit, removeHabit }) => {
  if (habits.length === 0) {
    return (
      <p className="habit-empty">
        No habits match your current view. Add a habit or adjust the priority filter.
      </p>
    );
  }

  return (
    <div className="habit-list">
      {habits.map((habit) => (
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
  );
};

export default HabitList;
