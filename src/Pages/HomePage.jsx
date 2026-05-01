import { Link } from "react-router-dom";
import TopHabits from "../components/HabitRanker";

const HomePage = ({ todoList, habits, events }) => {
  const now = new Date();

  const upcomingEvents = events
    .filter((event) => new Date(event.start) >= now)
    .sort((a, b) => new Date(a.start) - new Date(b.start))
    .slice(0, 3);

  const recentTodos = [...todoList]
    .filter((todo) => !todo.status)
    .sort((a, b) => b.id - a.id)
    .slice(0, 3);

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <p className="dashboard-eyebrow">Productivity overview</p>
        <h1>Your dashboard</h1>
        <p className="dashboard-intro">
          Get a quick look at your open tasks, strongest habits, and upcoming events.
        </p>
      </header>

      <div className="dashboard-grid">
        <section className="dashboard-section">
          <h2>Latest incomplete tasks</h2>
          {recentTodos.length === 0 ? (
            <p className="dashboard-empty">
              No open tasks right now. Add a task to start planning your next step.
            </p>
          ) : (
            <ul>
              {recentTodos.map((todo) => (
                <li key={todo.id}>
                  <strong>{todo.title}</strong>
                  <span className="dashboard-meta">
                    Deadline: {todo.deadline || "No deadline"}
                  </span>
                </li>
              ))}
            </ul>
          )}

          <Link className="dashboard-link" to="/todos">
            View tasks
          </Link>
        </section>

        <section className="dashboard-section">
          <h2>Top habits</h2>

          <div className="top-habits">
            <TopHabits habits={habits} count={3} />
            <Link className="dashboard-link" to="/habits">
              View habits
            </Link>
          </div>
        </section>

        <section className="dashboard-section">
          <h2>Upcoming events</h2>

          {upcomingEvents.length === 0 ? (
            <p className="dashboard-empty">
              No upcoming events yet. Add an event to see what is coming next.
            </p>
          ) : (
            <ul>
              {upcomingEvents.map((event) => (
                <li key={event.id}>
                  <strong>{event.title}</strong>
                  <span className="dashboard-meta">
                    Starts: {new Date(event.start).toLocaleString()}
                  </span>
                </li>
              ))}
            </ul>
          )}

          <Link className="dashboard-link" to="/events">
            View events
          </Link>
        </section>
      </div>
    </div>
  );
};

export default HomePage;
