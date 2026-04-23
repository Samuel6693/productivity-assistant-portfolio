const EventFilters = ({ setFilter }) => {
  return (
    <section className="event-filters">
      <button onClick={() => setFilter("all")}>All/Ongoing</button>
      <button onClick={() => setFilter("upcoming")}>Upcoming</button>
      <button onClick={() => setFilter("past")}>Past</button>
    </section>
  );
};

export default EventFilters;
