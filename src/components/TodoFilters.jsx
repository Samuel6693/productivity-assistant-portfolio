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
    <section>
      <div className="filters-panel">
          <label>
            Status:{" "}
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="all">All</option>
              <option value="done">Completed</option>
              <option value="undone">Incomplete</option>
            </select>
          </label>
          <label>
            Category:{" "}
            <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
              <option value="all">All</option>
              <option value="hÃ¤lsa">Health</option>
              <option value="hushÃ¥ll">Home</option>
              <option value="jobbrelaterat">Work</option>
              <option value="studier">Studies</option>
              <option value="ekonomi">Finance</option>
              <option value="nÃ¶je">Leisure</option>
              <option value="personlig">Personal</option>
              <option value="Ã¶vrigt">Other</option>
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
            {sortDirection === "asc" ? "↑ Ascending" : "↓ Descending"}
          </button>
        </div>
    </section>
  );
};

export default TodoFilters;
