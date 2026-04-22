import React, { useEffect, useState } from "react";

// Räknar den rutin med flest repetitioner som högst, vid lika antal repetitioner vinner högre prio.
const priorityWeight = (p) => (p === "high" ? 3 : p === "medium" ? 2 : 1);

const computeScore = (h) => {
  return Number(h.repetitions ?? 0);
};


export const translatePriority = (p) => (p === 'low' ? 'Låg' : p === 'medium' ? 'Medel' : p === 'high' ? 'Hög' : p);

export const getTopHabits = (count = 3) => {
  try {
    const habits = JSON.parse(localStorage.getItem("habits")) || [];
    const ranked = [...habits]
      .map((h) => ({ ...h, _score: computeScore(h) }))
      .sort((a, b) => b._score - a._score)
      .slice(0, count);
    return ranked;
  } catch (e) {
    return [];
  }
};

const TopHabits = ({ count = 3 }) => {
  const [top, setTop] = useState([]);

  useEffect(() => {
    try {
      const ranked = getTopHabits(count);
      setTop(ranked);
    } catch (e) {
      setTop([]);
    }
  }, [count]);

  if (!top || top.length === 0) {
    return <ul><p>Inga registrerade rutiner än</p></ul>;
  }

  return (
    <ul>
      {top.map((h) => (
        <li key={h.id}>
          <strong>{h.title}</strong> — Reps: {h.repetitions || 0} • Prio: {translatePriority(h.priority || 'medium')}
        </li>
      ))}
    </ul>
  );
};

export default TopHabits;