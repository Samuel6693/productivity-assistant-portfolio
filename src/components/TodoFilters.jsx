const TodoFilters = ({
    showFilter, 
    setShowFilter, 
    statusFilter, 
    setStatusFilter, 
    categoryFilter, 
    setCategoryFilter, 
    sortBy, 
    setSortBy, 
    sortDirection, 
    setSortDirection}) => {

    return (
        <section>
            <button type="button" onClick={() => setShowFilter((s) => !s)}>
                {showFilter ? "Dölj filter" : "Filter"}
            </button>

            {showFilter && (
                <div className="filters-panel">
                    <label>
                        Status: {" "}
                        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                            <option value="all">Alla</option>
                            <option value="done">Slutförda</option>
                            <option value="undone">Ej Slutförda</option>
                        </select>
                    </label>
                    <label>
                        Category: {" "}
                        <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
                            <option value="all">Alla</option>
                            <option value="hälsa">Hälsa</option>
                            <option value="hushåll">Hushåll</option>
                            <option value="jobbrelaterat">Jobbrelaterat</option>
                            <option value="studier">Studier</option>
                            <option value="ekonomi">Ekonomi</option>
                            <option value="nöje">Nöje</option>
                            <option value="personlig">Personlig</option>
                            <option value="övrigt">Övrigt</option>
                        </select>
                    </label>

                    <label>
                        Sortera efter: {" "}
                        <select value={sortBy} onChange={(e)=> setSortBy(e.target.value)}>
                            <option value="none">Ingen</option>
                            <option value="deadline">Deadline</option>
                            <option value="timeEstimate">Tidsestimat</option>
                            <option value="status">Status</option>
                        </select>
                    </label>
                    <button
                        type="button"
                        onClick={() =>
                            setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"))}>
                        {sortDirection === "asc" ? "⬆ Stigande" : "⬇ Fallande"}
                    </button>

                </div>
            )}
        </section>
    )
}

export default TodoFilters;