import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useEffect, useState } from 'react'
import HomePage from './pages/HomePage'
import TodosPage from './pages/TodosPage'
import HabitsPage from './pages/HabitsPage'
import EventsPage from './pages/EventsPage'
import Error from './pages/ErrorPage'


const TODOS_STORAGE_KEY = "todos";
const HABITS_STORAGE_KEY = "habits";

function App() {
// Läs in TodoList från localStorage vid första renderingen
  const [todoList, setTodoList] = useState(() => {
    try {
      const savedTodos = localStorage.getItem(TODOS_STORAGE_KEY);
      return savedTodos ? JSON.parse(savedTodos) : [];
    } catch (err) {
      console.error("Kunde inte läsa todos från localStorage:", err);
      return [];
    }
  });

// Spara Todos till localStorage varje gång TodoList ändras
useEffect(() => {
  try {
    localStorage.setItem(TODOS_STORAGE_KEY, JSON.stringify(todoList));
  } catch (err) {
    console.error("Kunde inte spara todos till localStorage:", err);
  }
}, [todoList]);

// Läs in Habits från localStorage vid första renderingen
  const [habits, setHabits] = useState(() => {
    try {
      const savedHabits = localStorage.getItem(HABITS_STORAGE_KEY);
      return savedHabits ? JSON.parse(savedHabits) : [];
    } catch (err) {
      console.error("Kunde inte läsa habits från localStorage:", err);
      return [];
    }
  });

// Spara habits till localStorage varje gång habits ändras
useEffect(() => {
  try {
    localStorage.setItem(HABITS_STORAGE_KEY, JSON.stringify(habits));
  } catch (err) {
    console.error("Kunde inte spara habits till localStorage:", err);
  }
}, [habits]);

  return (
    <BrowserRouter>

      <Routes>
        <Route path="/" element={<HomePage todoList={todoList} />}/>
        <Route path="/todos" element={<TodosPage todoList={todoList} setTodoList={setTodoList}/>}/>
        <Route path="/habits" element={<HabitsPage habits={habits} setHabits={setHabits}/>}/>
        <Route path="/events" element={<EventsPage />}/>
        <Route path="*" element={<Error />}/>
      </Routes>
    
    </BrowserRouter>
  );
}

export default App;
