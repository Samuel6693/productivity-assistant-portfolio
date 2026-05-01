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
      <label>
        Event title
        <input
          type="text"
          placeholder="Example: Study session"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>

      <label>
        Start date and time
        <input
          type="datetime-local"
          required
          value={start}
          onChange={(e) => setStart(e.target.value)}
        />
      </label>

      <label>
        End date and time
        <input
          type="datetime-local"
          required
          value={end}
          onChange={(e) => setEnd(e.target.value)}
        />
      </label>

      <button type="submit">{editId ? "Save changes" : "Add event"}</button>

      <button type="button" className="secondary-btn" onClick={handleCancel}>
        {editId ? "Cancel editing" : "Clear form"}
      </button>
    </form>
  );
};

export default EventForm;
