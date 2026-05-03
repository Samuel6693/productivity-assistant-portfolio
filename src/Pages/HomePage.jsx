import { Link } from "react-router-dom";
import TopHabits from "../components/HabitRanker";

const DashboardCard = ({ title, children, linkTo, linkLabel }) => (
  <section className="dashboard-card">
    <h2 className="dashboard-card-title">{title}</h2>
    <div className="dashboard-card-content">{children}</div>
    <Link className="dashboard-card-link" to={linkTo}>
      {linkLabel}
    </Link>
  </section>
);

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
        <DashboardCard title="Latest incomplete tasks" linkTo="/todos" linkLabel="View tasks">
          {recentTodos.length === 0 ? (
            <p className="dashboard-empty">
              No open tasks right now. Add a task to start planning your next step.
            </p>
          ) : (
            <ul className="dashboard-preview-list">
              {recentTodos.map((todo) => (
                <li key={todo.id} className="dashboard-preview-item">
                  <strong>{todo.title}</strong>
                  <span className="dashboard-meta">
                    Deadline: {todo.deadline || "No deadline"}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </DashboardCard>

        <DashboardCard title="Top habits" linkTo="/habits" linkLabel="View habits">
          <TopHabits habits={habits} count={3} />
        </DashboardCard>

        <DashboardCard title="Upcoming events" linkTo="/events" linkLabel="View events">
          {upcomingEvents.length === 0 ? (
            <p className="dashboard-empty">
              No upcoming events yet. Add an event to see what is coming next.
            </p>
          ) : (
            <ul className="dashboard-preview-list">
              {upcomingEvents.map((event) => (
                <li key={event.id} className="dashboard-preview-item">
                  <strong>{event.title}</strong>
                  <span className="dashboard-meta">
                    Starts: {new Date(event.start).toLocaleString()}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </DashboardCard>
      </div>
    </div>
  );
};

export default HomePage;
