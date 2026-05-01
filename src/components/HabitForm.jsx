const HabitForm = ({
  editId,
  title,
  priority,
  repetitions,
  priorities,
  formatPriority,
  setTitle,
  setPriority,
  setRepetitions,
  handleSubmit,
  resetForm,
}) => {
  return (
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
          {priorities.map((level) => (
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
  );
};

export default HabitForm;
