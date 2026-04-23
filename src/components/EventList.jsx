const EventList = ({ events, onEdit, onDelete }) => {
  if (events.length === 0) {
    return <p>No events to display.</p>;
  }

  const now = new Date();

  return (
    <ul className="event-list">
      {events.map((event) => {
        const isPast = new Date(event.end) < now;

        return (
          <li key={event.id} className={`event-item ${isPast ? "past" : ""}`}>
            <strong>{event.title}</strong>
            <p>Start: {new Date(event.start).toLocaleString()}</p>
            <p>End: {new Date(event.end).toLocaleString()}</p>

            <button onClick={() => onEdit(event)}>Edit</button>
            <button onClick={() => onDelete(event.id)}>Delete</button>
          </li>
        );
      })}
    </ul>
  );
};

export default EventList;
