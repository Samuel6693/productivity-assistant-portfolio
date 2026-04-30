const TodoForm = ({ todos, setTodos, handleSubmit, handleCancel, editTodo }) => {
  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <label>
        Task title
        <input
          type="text"
          placeholder="Example: Finish portfolio update"
          required
          value={todos.title}
          onChange={(e) => setTodos({ ...todos, title: e.target.value })}
        />
      </label>

      <label>
        Description
        <input
          type="text"
          placeholder="Add a short note about what needs to be done"
          required
          value={todos.description}
          onChange={(e) => setTodos({ ...todos, description: e.target.value })}
        />
      </label>

      <label>
        Time estimate
        <input
          type="time"
          required
          value={todos.timeEstimate}
          onChange={(e) => setTodos({ ...todos, timeEstimate: e.target.value })}
        />
      </label>

      <label>
        Category
        <select
          name="category"
          required
          value={todos.category}
          onChange={(e) => setTodos({ ...todos, category: e.target.value })}
        >
          <option value="">Select category</option>
          <option value="health">Health</option>
          <option value="home">Home</option>
          <option value="work">Work</option>
          <option value="studies">Studies</option>
          <option value="finance">Finance</option>
          <option value="leisure">Leisure</option>
          <option value="personal">Personal</option>
          <option value="other">Other</option>
        </select>
      </label>

      <label>
        Deadline
        <input
          type="date"
          required
          value={todos.deadline}
          onChange={(e) => setTodos({ ...todos, deadline: e.target.value })}
        />
      </label>

      <button type="submit">{editTodo !== null ? "Save changes" : "Add task"}</button>

      <button type="button" className="secondary-btn" onClick={handleCancel}>
        {editTodo !== null ? "Cancel editing" : "Clear form"}
      </button>
    </form>
  );
};

export default TodoForm;
