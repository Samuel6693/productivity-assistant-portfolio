import { useState } from "react";
import { Link } from "react-router-dom";
import EventForm from "../components/EventForm";
import EventFilters from "../components/EventFilters";
import EventList from "../components/EventList";
import "../styles/Events.css";

const EventsPage = ({ events = [], setEvents = () => {} }) => {
  const [filter, setFilter] = useState("all");
  const [title, setTitle] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [editId, setEditId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !start || !end) {
      alert("Fill in all fields");
      return;
    }

    if (new Date(start) >= new Date(end)) {
      alert("Start must be before end");
      return;
    }

    const newEvent = {
      id: editId || crypto.randomUUID(),
      title,
      start,
      end,
    };

    const updatedEvents = editId
      ? events.map((event) => (event.id === editId ? newEvent : event))
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
    setEvents(events.filter((event) => event.id !== id));
  };

  const handleCancel = () => {
    setTitle("");
    setStart("");
    setEnd("");
    setEditId(null);
  };

  const now = new Date();
  const filteredEvents = events.filter((event) => {
    if (filter === "upcoming") return new Date(event.start) >= now;
    if (filter === "past") return new Date(event.end) < now;
    return true;
  });

  return (
    <div className="events-container">
      <section className="page-header">
        <h1>Events</h1>

        <Link className="dashboard-link" to="/">
          Dashboard
        </Link>
      </section>

      <div className="page-workspace">
        <section className="page-section page-form-panel events-section">
          <h2>{editId ? "Editing event" : "Create a new event"}</h2>

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

        <div className="page-list-panel">
          <section className="page-section events-section">
            <h2>Filters</h2>
            <EventFilters filter={filter} setFilter={setFilter} />
          </section>

          <section className="page-section events-section">
            <h2>All events</h2>
            <p className="event-count">
              Showing {filteredEvents.length} {filteredEvents.length === 1 ? "event" : "events"}
            </p>

            <EventList events={filteredEvents} onEdit={handleEdit} onDelete={handleDelete} />
          </section>
        </div>
      </div>
    </div>
  );
};

export default EventsPage;
