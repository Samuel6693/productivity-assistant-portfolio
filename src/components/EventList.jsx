const EventList = ({ events, onEdit, onDelete }) => {
  if (events.length === 0) {
    return <p>Inga händelser att visa.</p>;
  }

  const now = new Date();

  return (
    <ul className="event-list">
      {events.map((ev) => {
        const isPast = new Date(ev.end) < now;

        return (
          <li key={ev.id} className={`event-item ${isPast ? "past" : ""}`}>
            <strong>{ev.title}</strong>
            <p>Start: {new Date(ev.start).toLocaleString()}</p>
            <p>Slut: {new Date(ev.end).toLocaleString()}</p>

            <button onClick={() => onEdit(ev)}>Redigera</button>
            <button onClick={() => onDelete(ev.id)}>Ta bort</button>
          </li>
        );
      })}
    </ul>
  );
};

export default EventList;
