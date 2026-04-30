const TodoList = ({ todoList, toggleStatus, deleteTodo, handleEdit }) => {
  if (todoList.length === 0) {
    return (
      <p className="todo-empty">
        No tasks match your current view. Add a task or adjust the filters.
      </p>
    );
  }

  return (
    <ul className="todo-list">
      {todoList.map((todo) => (
        <li key={todo.id} className={`todo-item ${todo.status ? "done" : ""}`}>
          <h3>{todo.title}</h3>
          <p>Description: {todo.description}</p>
          <p>Time estimate: {todo.timeEstimate}</p>
          <p>Category: {todo.category}</p>
          <p>Deadline: {todo.deadline}</p>
          <p>
            Status:{" "}
            <span className={`todo-status ${todo.status ? "completed" : "open"}`}>
              {todo.status ? "Completed" : "Open"}
            </span>
          </p>

          <div className="todo-actions">
            <button onClick={() => toggleStatus(todo.id)}>
              {todo.status ? "Mark as incomplete" : "Mark as completed"}
            </button>

            <button onClick={() => deleteTodo(todo.id)}>Delete</button>

            <button onClick={() => handleEdit(todo.id)}>Edit</button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
