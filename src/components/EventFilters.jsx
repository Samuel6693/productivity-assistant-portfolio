const EventFilters = ({ filter, setFilter }) => {
  const options = [
    { value: "all", label: "All events" },
    { value: "upcoming", label: "Upcoming events" },
    { value: "past", label: "Past events" },
  ];

  return (
    <section className="event-filters">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          className={filter === option.value ? "active" : ""}
          onClick={() => setFilter(option.value)}
        >
          {option.label}
        </button>
      ))}
    </section>
  );
};

export default EventFilters;
