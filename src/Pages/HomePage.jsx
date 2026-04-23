import { Link } from "react-router-dom";
import TopHabits from "../components/HabitRanker";

const HomePage = ({ todoList }) => {
  const savedEvents = JSON.parse(localStorage.getItem("events")) || [];
  const now = new Date();

  const upcomingEvents = savedEvents
    .filter((event) => new Date(event.start) >= now)
    .sort((a, b) => new Date(a.start) - new Date(b.start))
    .slice(0, 3);

  const recentTodos = [...todoList]
    .filter((todo) => !todo.status)
    .sort((a, b) => b.id - a.id)
    .slice(0, 3);

  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>
      <nav>
        <section className="dashboard-section">
          <h2>Latest incomplete tasks</h2>
          {recentTodos.length === 0 ? (
            <p>No incomplete tasks</p>
          ) : (
            <ul>
              {recentTodos.map((todo) => (
                <li key={todo.id}>
                  {todo.title} - deadline: {todo.deadline}
                </li>
              ))}
            </ul>
          )}

          <br />
          <Link className="dashboard-link" to="/todos">
            Go to all tasks
          </Link>
        </section>

        <section className="dashboard-section">
          <h2>Top habits</h2>

          <div className="top-habits">
            <TopHabits count={3} />
            <br />
            <Link className="dashboard-link" to="/habits">
              Go to all habits
            </Link>
          </div>
        </section>

        <section className="dashboard-section">
          <h2>Upcoming events</h2>

          {upcomingEvents.length === 0 ? (
            <p>No upcoming events</p>
          ) : (
            <ul>
              {upcomingEvents.map((event) => (
                <li key={event.id}>
                  <strong>{event.title}</strong>
                  <br />
                  {new Date(event.start).toLocaleString()}
                </li>
              ))}
            </ul>
          )}

          <br />
          <Link className="dashboard-link" to="/events">
            Go to all events
          </Link>
        </section>
      </nav>
    </div>
  );
};

export default HomePage;
