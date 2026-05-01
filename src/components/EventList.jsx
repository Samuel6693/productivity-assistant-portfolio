const EventList = ({ events, onEdit, onDelete }) => {
  if (events.length === 0) {
    return (
      <p className="event-empty">
        No events match your current view. Add an event or choose another filter.
      </p>
    );
  }

  const now = new Date();
  const formatDateTime = (value) =>
    new Date(value).toLocaleString([], {
      dateStyle: "medium",
      timeStyle: "short",
    });

  return (
    <ul className="event-list">
      {events.map((event) => {
        const isPast = new Date(event.end) < now;

        return (
          <li key={event.id} className={`event-item ${isPast ? "past" : ""}`}>
            <div className="event-item-header">
              <strong>{event.title}</strong>
              <span className={`event-status ${isPast ? "past" : "upcoming"}`}>
                {isPast ? "Past" : "Upcoming"}
              </span>
            </div>

            <p className="event-meta">Starts: {formatDateTime(event.start)}</p>
            <p className="event-meta">Ends: {formatDateTime(event.end)}</p>

            <div className="event-actions">
              <button onClick={() => onEdit(event)}>Edit</button>
              <button onClick={() => onDelete(event.id)}>Delete</button>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default EventList;
