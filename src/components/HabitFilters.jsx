const HabitFilters = ({
  filterPriority,
  sortBy,
  sortOrder,
  priorities,
  formatPriority,
  setFilterPriority,
  setSortBy,
  setSortOrder,
}) => {
  return (
    <section className="page-section">
      <h2>Filters & sorting</h2>

      <div className="controls">
        <label>
          Filter by priority
          <select value={filterPriority} onChange={(e) => setFilterPriority(e.target.value)}>
            <option value="all">All priorities</option>
            {priorities.map((level) => (
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
      </div>
    </section>
  );
};

export default HabitFilters;
