const TodoForm = ({ todos, setTodos, handleSubmit, handleCancel, editTodo }) => {
  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      Title:{" "}
      <input
        type="text"
        placeholder="Title"
        required
        value={todos.title}
        onChange={(e) => setTodos({ ...todos, title: e.target.value })}
      />
      <br />

      Description:{" "}
      <input
        type="text"
        placeholder="Describe your task"
        required
        value={todos.description}
        onChange={(e) => setTodos({ ...todos, description: e.target.value })}
      />
      <br />

      Time estimate:{" "}
      <input
        type="time"
        placeholder="Time estimate"
        required
        value={todos.timeEstimate}
        onChange={(e) => setTodos({ ...todos, timeEstimate: e.target.value })}
      />
      <br />

      <label>
        {" "}
        Category:{" "}
        <select
          name="category"
          required
          value={todos.category}
          onChange={(e) => setTodos({ ...todos, category: e.target.value })}
        >
          <option value="">Select category</option>
          <option value="hÃ¤lsa">Health</option>
          <option value="hushÃ¥ll">Home</option>
          <option value="jobbrelaterat">Work</option>
          <option value="studier">Studies</option>
          <option value="ekonomi">Finance</option>
          <option value="nÃ¶je">Leisure</option>
          <option value="personlig">Personal</option>
          <option value="Ã¶vrigt">Other</option>
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

      <button type="submit">{editTodo !== null ? "Save changes" : "Add task"}</button>

      <button type="button" className="secondary-btn" onClick={handleCancel}>
        Cancel
      </button>
    </form>
  );
};

export default TodoForm;
