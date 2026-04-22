import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import EventForm from "../components/EventForm";
import EventFilters from "../components/EventFilters";
import EventList from "../components/EventList";
import "../styles/Events.css";

const EventsPage = () => {
  const [filter, setFilter] = useState("all");
  const [title, setTitle] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [editId, setEditId] = useState(null);
  
  const [events, setEvents] = useState(() => {
    const saved = localStorage.getItem("events");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(events));
  }, [events]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !start || !end) {
      alert("Fyll i alla fält");
      return;
    }

    if (new Date(start) >= new Date(end)) {
      alert("Start måste vara före slut");
      return;
    }

    const newEvent = {
      id: editId || crypto.randomUUID(),
      title,
      start,
      end,
    };

    const updatedEvents = editId
      ? events.map((ev) => (ev.id === editId ? newEvent : ev))
      : [...events, newEvent];

    updatedEvents.sort((a, b) => new Date(a.start) - new Date(b.start));
    setEvents(updatedEvents);

    handleCancel();
  };

  const handleEdit = (event) => {
    setTitle(event.title);
    setStart(event.start);
    setEnd(event.end);
    setEditId(event.id);
  };

  const handleDelete = (id) => {
    setEvents(events.filter((ev) => ev.id !== id));
  };

  const handleCancel = () => {
    setTitle("");
    setStart("");
    setEnd("");
    setEditId(null);
  };

  const now = new Date();
  const filteredEvents = events.filter((ev) => {
    if (filter === "upcoming") return new Date(ev.start) >= now;
    if (filter === "past") return new Date(ev.end) < now;
    return true;
  });

  return (
    <div className="events-container">
      <section className="events-header">
        <h1>Event Planner</h1>

        <nav>
          <Link to="/">
            <h2>Översikt</h2>
          </Link>
        </nav>
      </section>

      <section className="events-section">
        <h2>{editId ? "Redigera händelse" : "Ny händelse"}</h2>

        <EventForm
          title={title}
          start={start}
          end={end}
          editId={editId}
          setTitle={setTitle}
          setStart={setStart}
          setEnd={setEnd}
          handleSubmit={handleSubmit}
          handleCancel={handleCancel}
        />
      </section>

      <section className="events-section">
        <h2>Filter</h2>
        <EventFilters filter={filter} setFilter={setFilter} />
      </section>

      <section className="events-section">
        <h2>Alla händelser</h2>
        <p>Antal events: {filteredEvents.length}</p>

        <EventList
          events={filteredEvents}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </section>
    </div>
  );
};

export default EventsPage;
