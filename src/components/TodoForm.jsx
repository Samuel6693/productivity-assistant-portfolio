const TodoForm = ({ todos, setTodos, handleSubmit, handleCancel, editTodo }) => {

  return (
    <form className="todo-form"onSubmit={handleSubmit}>
      Titel:{" "}
      <input
        type="text"
        placeholder="Title"
        required
        value={todos.title}
        onChange={(e) => setTodos({ ...todos, title: e.target.value })}
      />
      <br />

      Beskrivning:{" "}
      <input
        type="text"
        placeholder="Beskriv ditt ärende"
        required
        value={todos.description}
        onChange={(e) => setTodos({ ...todos, description: e.target.value })}
      />
      <br />

      Tidsestimat:{" "}
      <input
        type="time"
        placeholder="Tidsestimat"
        required
        value={todos.timeEstimate}
        onChange={(e) => setTodos({ ...todos, timeEstimate: e.target.value })}
      />
      <br />

      <label>
        {" "}
        Kategori:{" "}
        <select
          name="kategori"
          required
          value={todos.category}
          onChange={(e) => setTodos({ ...todos, category: e.target.value })}
        >
          <option value="">Välj kategori</option>
          <option value="hälsa">Hälsa</option>
          <option value="hushåll">Hushåll</option>
          <option value="jobbrelaterat">Jobbrelaterat</option>
          <option value="studier">Studier</option>
          <option value="ekonomi">Ekonomi</option>
          <option value="nöje">Nöje</option>
          <option value="personlig">Personlig</option>
          <option value="övrigt">Övrigt</option>
        </select>
      </label>
      <br />

      Deadline: {""}
      <input
        type="date"
        placeholder="Deadline"
        required
        value={todos.deadline}
        onChange={(e) => setTodos({ ...todos, deadline: e.target.value })}
      />
      <br />

      <button type="submit">{editTodo !== null ? "Spara ändringar" : "Lägg till"}</button>

      <button type="button" className="secondary-btn" onClick={handleCancel}>
        Avbryt
      </button>
    </form>
  );
};

export default TodoForm;
