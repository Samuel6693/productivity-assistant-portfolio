import { useEffect, useState } from "react";
import { getTopHabits } from "./HabitRanker";

// Custom hook för att hämta top N(antal) rutiner och totalen av registrerade rutiner
export default function useTopHabits(count = 3) {
  const [top, setTop] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const update = () => {
      try {
        const raw = JSON.parse(localStorage.getItem("habits")) || [];
        const normalized = (raw || []).map((h, idx) => ({
          id: h && (h.id || h._id) ? String(h.id || h._id) : String(Date.now()) + "-" + idx,
          title: (h && (h.title || h.name)) ? String(h.title || h.name) : "",
          priority: (h && h.priority && (["low","medium","high"].includes(h.priority))) ? h.priority : (h && h.priorityLabel ? String(h.priorityLabel).toLowerCase() : 'medium'),
          repetitions: Number((h && (h.repetitions !== undefined ? h.repetitions : h.count)) || 0),
        }));

        setTotal(normalized.length);

        // getTopHabits läser från localStorage och rankar, så den kan används
        const ranked = getTopHabits(count);
        setTop(ranked);
      } catch (e) {
        setTop([]);
        setTotal(0);
      }
    };

    update();

    const onStorage = (e) => {
      if (!e.key || e.key === 'habits') update();
    };

    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, [count]);

  return { top, total };
}