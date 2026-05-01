import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import TodosPage from "./pages/TodosPage";
import HabitsPage from "./pages/HabitsPage";
import EventsPage from "./pages/EventsPage";
import Error from "./pages/ErrorPage";
import { useLocalStorageState } from "./hooks/useLocalStorageState";

const TODOS_STORAGE_KEY = "todos";
const HABITS_STORAGE_KEY = "habits";
const EVENTS_STORAGE_KEY = "events";

function App() {
  const [todoList, setTodoList] = useLocalStorageState(TODOS_STORAGE_KEY, []);
  const [habits, setHabits] = useLocalStorageState(HABITS_STORAGE_KEY, []);
  const [events, setEvents] = useLocalStorageState(EVENTS_STORAGE_KEY, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage todoList={todoList} habits={habits} events={events} />} />
        <Route path="/todos" element={<TodosPage todoList={todoList} setTodoList={setTodoList} />} />
        <Route path="/habits" element={<HabitsPage habits={habits} setHabits={setHabits} />} />
        <Route path="/events" element={<EventsPage events={events} setEvents={setEvents} />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
