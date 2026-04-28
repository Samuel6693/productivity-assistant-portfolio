import { useState } from "react";
import { Link } from "react-router-dom";
import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";
import TodoFilters from "../components/TodoFilters";
import "../styles/Todos.css";

const TodosPage = ({ todoList, setTodoList }) => {
  const [todos, setTodos] = useState({
    title: "",
    description: "",
    timeEstimate: "",
    category: "",
    deadline: "",
  });

  const [editTodo, setEditTodo] = useState(null);
  const [showFilter, setShowFilter] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortBy, setSortBy] = useState("none");
  const [sortDirection, setSortDirection] = useState("asc");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editTodo !== null) {
      setTodoList((prevList) =>
        prevList.map((todo) =>
          todo.id === editTodo
            ? {
                ...todo,
                title: todos.title,
                description: todos.description,
                timeEstimate: todos.timeEstimate,
                category: todos.category,
                deadline: todos.deadline,
              }
            : todo,
        ),
      );

      setEditTodo(null);
    } else {
      const newTodo = {
        id: Date.now(),
        title: todos.title,
        description: todos.description,
        timeEstimate: todos.timeEstimate,
        category: todos.category,
        deadline: todos.deadline,
        status: false,
      };

      setTodoList((prevTodos) => [...prevTodos, newTodo]);
    }

    setTodos({
      title: "",
      description: "",
      timeEstimate: "",
      category: "",
      deadline: "",
    });
  };

  const handleCancel = () => {
    setTodos({
      title: "",
      description: "",
      timeEstimate: "",
      category: "",
      deadline: "",
    });
    setEditTodo(null);
  };

  const toggleStatus = (id) => {
    setTodoList((prevList) =>
      prevList.map((todo) => (todo.id === id ? { ...todo, status: !todo.status } : todo)),
    );
  };

  const deleteTodo = (id) => {
    setTodoList((prevList) => prevList.filter((todo) => todo.id !== id));
  };

  const handleEdit = (id) => {
    const todoToEdit = todoList.find((todo) => todo.id === id);
    if (!todoToEdit) return;

    setTodos({
      title: todoToEdit.title,
      description: todoToEdit.description,
      timeEstimate: todoToEdit.timeEstimate,
      category: todoToEdit.category,
      deadline: todoToEdit.deadline,
    });

    setEditTodo(id);
  };

  const visibleTodos = [...todoList]
    .filter((todo) => {
      const statusMatch =
        statusFilter === "all" ||
        (statusFilter === "done" && todo.status) ||
        (statusFilter === "undone" && !todo.status);

      const categoryMatch = categoryFilter === "all" || todo.category === categoryFilter;
      return statusMatch && categoryMatch;
    })
    .sort((a, b) => {
      if (sortBy === "none") return 0;

      let valueA;
      let valueB;

      if (sortBy === "deadline") {
        valueA = new Date(a.deadline).getTime();
        valueB = new Date(b.deadline).getTime();
      }

      if (sortBy === "timeEstimate") {
        const [hoursA, minutesA] = a.timeEstimate.split(":");
        const [hoursB, minutesB] = b.timeEstimate.split(":");
        valueA = Number(hoursA) * 60 + Number(minutesA);
        valueB = Number(hoursB) * 60 + Number(minutesB);
      }

      if (sortBy === "status") {
        valueA = Number(a.status);
        valueB = Number(b.status);
      }

      return sortDirection === "asc" ? valueA - valueB : valueB - valueA;
    });

  return (
    <div className="todos-container">
      <section className="page-header">
        <h1>Tasks</h1>

        <Link className="dashboard-link" to="/">
          Dashboard
        </Link>
      </section>

      <section className="page-section">
        <h2>{editTodo !== null ? "Edit task" : "New task"}</h2>

        <TodoForm
          todos={todos}
          setTodos={setTodos}
          handleSubmit={handleSubmit}
          handleCancel={handleCancel}
          editTodo={editTodo}
        />
      </section>

      <section className="page-section">
        <TodoFilters
          showFilter={showFilter}
          setShowFilter={setShowFilter}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
          sortBy={sortBy}
          setSortBy={setSortBy}
          sortDirection={sortDirection}
          setSortDirection={setSortDirection}
        />
      </section>

      <section className="page-section">
        <h1>All tasks</h1>

        <TodoList
          todoList={visibleTodos}
          toggleStatus={toggleStatus}
          deleteTodo={deleteTodo}
          handleEdit={handleEdit}
        />
      </section>
    </div>
  );
};

export default TodosPage;
