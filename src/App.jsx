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

const formatDate = (date) => date.toISOString().slice(0, 10);
const formatDateTime = (date) => date.toISOString().slice(0, 16);
const addDays = (days) => new Date(Date.now() + days * 24 * 60 * 60 * 1000);

const defaultTodos = [
  {
    id: 1,
    title: "Plan weekly priorities",
    description: "Review goals and choose the most important tasks for the week.",
    timeEstimate: "00:30",
    category: "work",
    deadline: formatDate(addDays(1)),
    status: false,
  },
  {
    id: 2,
    title: "Update portfolio case study",
    description: "Add recent improvements and screenshots from the productivity app.",
    timeEstimate: "01:30",
    category: "studies",
    deadline: formatDate(addDays(3)),
    status: false,
  },
  {
    id: 3,
    title: "Prepare tomorrow's focus block",
    description: "Set up notes, tabs, and materials before the next work session.",
    timeEstimate: "00:20",
    category: "personal",
    deadline: formatDate(addDays(2)),
    status: false,
  },
];

const defaultHabits = [
  {
    id: "habit-1",
    title: "Morning planning",
    priority: "high",
    repetitions: 12,
  },
  {
    id: "habit-2",
    title: "Read for 20 minutes",
    priority: "medium",
    repetitions: 8,
  },
  {
    id: "habit-3",
    title: "Evening reset",
    priority: "low",
    repetitions: 5,
  },
];

const defaultEvents = [
  {
    id: "event-1",
    title: "Portfolio review",
    start: formatDateTime(addDays(1)),
    end: formatDateTime(addDays(1.05)),
  },
  {
    id: "event-2",
    title: "Study session",
    start: formatDateTime(addDays(2)),
    end: formatDateTime(addDays(2.08)),
  },
  {
    id: "event-3",
    title: "Weekly planning",
    start: formatDateTime(addDays(4)),
    end: formatDateTime(addDays(4.04)),
  },
];

function App() {
  const [todoList, setTodoList] = useLocalStorageState(TODOS_STORAGE_KEY, defaultTodos);
  const [habits, setHabits] = useLocalStorageState(HABITS_STORAGE_KEY, defaultHabits);
  const [events, setEvents] = useLocalStorageState(EVENTS_STORAGE_KEY, defaultEvents);

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
