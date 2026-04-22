const EventForm = ({
  title,
  start,
  end,
  editId,
  setTitle,
  setStart,
  setEnd,
  handleSubmit,
  handleCancel
}) => {
  return (
    <form className="event-form" onSubmit={handleSubmit}>
      <h2>{editId ? "Redigera händelse" : "Skapa händelse"}</h2>

      <input
        type="text"
        placeholder="Titel"
        required
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <label>
        Starttid:
        <input
          type="datetime-local"
          required
          value={start}
          onChange={(e) => setStart(e.target.value)}
        />
      </label>

      <label>
        Sluttid:
        <input
          type="datetime-local"
          required
          value={end}
          onChange={(e) => setEnd(e.target.value)}
        />
      </label>

      <button type="submit">
        {editId ? "Spara ändringar" : "Lägg till"}
      </button>

      {editId && (
        <button type="button" onClick={handleCancel}>
          Avbryt
        </button>
      )}
    </form>
  );
};

export default EventForm;
