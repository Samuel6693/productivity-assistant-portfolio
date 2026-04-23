const EventForm = ({
  title,
  start,
  end,
  editId,
  setTitle,
  setStart,
  setEnd,
  handleSubmit,
  handleCancel,
}) => {
  return (
    <form className="event-form" onSubmit={handleSubmit}>
      <h2>{editId ? "Edit event" : "Create event"}</h2>

      <input
        type="text"
        placeholder="Title"
        required
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <label>
        Start time:
        <input
          type="datetime-local"
          required
          value={start}
          onChange={(e) => setStart(e.target.value)}
        />
      </label>

      <label>
        End time:
        <input
          type="datetime-local"
          required
          value={end}
          onChange={(e) => setEnd(e.target.value)}
        />
      </label>

      <button type="submit">{editId ? "Save changes" : "Add event"}</button>

      {editId && (
        <button type="button" onClick={handleCancel}>
          Cancel
        </button>
      )}
    </form>
  );
};

export default EventForm;
