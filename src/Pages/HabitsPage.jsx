import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Habits.css";

const HabitsPage = ({ habits = [], setHabits = () => {} }) => {
  const habitList = habits;
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("medium");
  const [repetitions, setRepetitions] = useState(0);
  const [editId, setEditId] = useState(null);

  const [filterPriority, setFilterPriority] = useState("all");
  const [sortBy, setSortBy] = useState("repetitions");
  const [sortOrder, setSortOrder] = useState("desc");

  const PRIORITIES = ["low", "medium", "high"];



  const resetForm = () => {
    setTitle("");
    setPriority("medium");
    setRepetitions(0);
    setEditId(null);
  };

  const validate = () => {
    if (!title.trim()) return "Titel krävs";
    if (!PRIORITIES.includes(priority)) return "Ogiltig prioritering";
    if (repetitions < 0) return "Antal repetitioner måste vara 0 eller större";
    return null;
  }; 

  const handleSubmit = (e) => {
    e.preventDefault();
    const err = validate();
    if (err) return alert(err);

    if (editId) {
      setHabits((prev) =>
        prev.map((h) => (h.id === editId ? { ...h, title: title.trim(), priority, repetitions } : h))
      );
      resetForm();
      return;
    }

    const newHabit = {
      id: Date.now().toString(),
      title: title.trim(),
      priority,
      repetitions,
    };
    setHabits((prev) => [newHabit, ...prev]);
    resetForm();
  };

  const removeHabit = (id) => setHabits((prev) => prev.filter((h) => h.id !== id));
  const inc = (id) =>
    setHabits((prev) => prev.map((h) => (h.id === id ? { ...h, repetitions: (h.repetitions || 0) + 1 } : h)));
  const dec = (id) =>
    setHabits((prev) => prev.map((h) => (h.id === id ? { ...h, repetitions: Math.max(0, (h.repetitions || 0) - 1) } : h)));
  const reset = (id) => setHabits((prev) => prev.map((h) => (h.id === id ? { ...h, repetitions: 0 } : h)));

  const startEdit = (id) => {
    const h = habitList.find((item) => item.id === id);
    if (!h) return;
    setTitle(h.title);
    setPriority(h.priority || "medium");
    setRepetitions(h.repetitions || 0);
    setEditId(h.id);
  };

  const filtered = habitList.filter((h) => (filterPriority === "all" ? true : h.priority === filterPriority));
  const priorityWeight = (p) => (p === "high" ? 3 : p === "medium" ? 2 : 1);

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "repetitions") {
      return sortOrder === "desc" ? b.repetitions - a.repetitions : a.repetitions - b.repetitions;
    }
    return sortOrder === "desc" ? priorityWeight(b.priority) - priorityWeight(a.priority) : priorityWeight(a.priority) - priorityWeight(b.priority);
  });

  return (
    <div className="habits-page">
      <section className="habits-header">
        <h1>Rutiner</h1>
        <Link to="/">Översikt</Link>
      </section>

      <section>
        <h2>{editId ? "Redigera rutin" : "Ny rutin"}</h2>

        <form onSubmit={handleSubmit} className="habit-form">
          <label> Titel
            <input value={title} onChange={(e) => setTitle(e.target.value)} />
          </label>

          <label> Prioritet
            <select value={priority} onChange={(e) => setPriority(e.target.value)}>
              {PRIORITIES.map((p) => (
                <option key={p} value={p}>
                  {p === 'low' ? 'Låg' : p === 'medium' ? 'Medel' : 'Hög'}
                </option>
              ))}
            </select>
          </label>

           <label> Repetitioner
            <input type="number" min="0" value={repetitions}  onChange={(e) => {
              const value = e.target.value;
              if (value === "") {
                setRepetitions("");
              } else {
                setRepetitions(Math.max(0, Number(value)));
              }
          }} />
          </label>

          <div className="form-actions">
            <button type="submit">{editId ? "Spara" : "Lägg till"}</button>
            <button type="button" onClick={resetForm}> Rensa </button>
          </div>
        </form>
      </section>

      <section className="controls">
        <label> Filtrera
          <select value={filterPriority} onChange={(e) => setFilterPriority(e.target.value)}>
            <option value="all">Alla</option>
            {PRIORITIES.map((p) => (
              <option key={p} value={p}>
                {p === 'low' ? 'Låg' : p === 'medium' ? 'Medel' : p === 'high' ? 'Hög' : p}
              </option>
            ))}
          </select>
        </label>

        <label> Sortera efter
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="repetitions">Repetitioner</option>
            <option value="priority">Prioritet</option>
          </select>
        </label>

        <label> Ordning
          <button type="button" className="order-btn" onClick={() => setSortOrder((s) => (s === "desc" ? "asc" : "desc"))}>Ordning: {sortOrder === 'desc' ? 'Fallande' : 'Stigande'}</button>
        </label>
      </section>

      <section>
        <h2>Alla rutiner</h2>
        {sorted.length === 0 && <p>Inga rutiner ännu</p>}
        <div className="habit-list">
          {sorted.map((h) => (
            <div key={h.id} className="habit-item">
              <div className="left">
                <strong>{h.title}</strong>
                <div className="meta">Prioritet: {h.priority} • Repetitioner: {h.repetitions}</div>
              </div>
              <div className="right">
                <button onClick={() => inc(h.id)}>+</button>
                <button onClick={() => dec(h.id)}>-</button>
                <button onClick={() => reset(h.id)}>Återställ</button>
                <button onClick={() => startEdit(h.id)}>Redigera</button>
                <button onClick={() => removeHabit(h.id)}>Ta bort</button>
              </div>
            </div>
          ))}
        </div>
      </section> 
    </div>
  );
};

export default HabitsPage;