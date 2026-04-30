const TodoFilters = ({
  statusFilter,
  setStatusFilter,
  categoryFilter,
  setCategoryFilter,
  sortBy,
  setSortBy,
  sortDirection,
  setSortDirection,
}) => {
  return (
    <div className="filters-panel">
      <label>
        Status:{" "}
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="all">All tasks</option>
          <option value="done">Completed tasks</option>
          <option value="undone">Open tasks</option>
        </select>
      </label>

      <label>
        Category:{" "}
        <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="health">Health</option>
          <option value="home">Home</option>
          <option value="work">Work</option>
          <option value="studies">Studies</option>
          <option value="finance">Finance</option>
          <option value="leisure">Leisure</option>
          <option value="personal">Personal</option>
          <option value="other">Other</option>
        </select>
      </label>

      <label>
        Sort by:{" "}
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="none">None</option>
          <option value="deadline">Deadline</option>
          <option value="timeEstimate">Time estimate</option>
          <option value="status">Status</option>
        </select>
      </label>

      <button
        type="button"
        onClick={() => setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"))}
      >
        {sortDirection === "asc" ? "Sort ascending" : "Sort descending"}
      </button>
    </div>
  );
};

export default TodoFilters;
