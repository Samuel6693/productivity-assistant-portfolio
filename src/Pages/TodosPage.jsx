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

  const [editTodo, setEditTodo] = useState(null); // Editering state
  // Filter states
  const [showFilter, setShowFilter] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  // Sorting Todos
  const [sortBy, setSortBy] = useState("none");
  const [sortDirection, setSortDirection] = useState("asc"); // asc = stigande, desc = fallande

  const handleSubmit = (e) => {
    e.preventDefault();

    // Edit existing todo
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
            : todo
        )
      );

      // lämna redigeringsläget
      setEditTodo(null);
    } else {
      // Lägg till nytt todo
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

    // Rensa formuläret (gäller både add och edit)
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
      prevList.map((todo) =>
        todo.id === id ? { ...todo, status: !todo.status } : todo
      )
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
    let statusMatch =
      statusFilter === "all" ||
      (statusFilter === "done" && todo.status) ||
      (statusFilter === "undone" && !todo.status);
      
    let categoryMatch =
      categoryFilter === "all" || todo.category === categoryFilter;
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

    return sortDirection === "asc" 
    ? valueA - valueB // stigande
    : valueB - valueA; // fallande
  });

  return (
    <div className="todos-container">
      <section>
        <h1>Todo Page</h1>

        <nav>
          <Link to="/">
            <h2>Översikt</h2>
          </Link>
        </nav>
      </section>

      <section>
        <h2>{editTodo !== null ? "Redigera ärende" : "Nytt Todo"}</h2>

        <TodoForm
          todos={todos}
          setTodos={setTodos}
          handleSubmit={handleSubmit}
          handleCancel={handleCancel}
          editTodo={editTodo}
        />
      </section>

      <section>
       <TodoFilters
       showFilter ={showFilter}
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

      <section>
        <h1>Alla ärenden</h1>

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
