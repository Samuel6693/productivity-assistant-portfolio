import { Link } from "react-router-dom"
import { useEffect, useState } from "react";
import TopHabits, { translatePriority } from "../components/HabitRanker";
import useTopHabits from "../components/HabitsPriority";

const HomePage = ({ todoList }) => {

    const [upcomingEvents, setUpcomingEvents] = useState([]);

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem("events")) || [];

        const now = new Date();

        const nextThree = saved
            .filter(ev => new Date(ev.start) >= now) 
            .sort((a, b) => new Date(a.start) - new Date(b.start)) 
            .slice(0, 3); // max 3 st

        setUpcomingEvents(nextThree);
    }, []);


    const recentTodos = [...todoList]
    .filter((todo) => !todo.status)
    .sort((a, b) => b.id - a.id)
    .slice(0, 3);

   
    const { top: topHabits, total: habitCount } = useTopHabits(3);
    const topHabit = topHabits && topHabits.length > 0 ? topHabits[0] : null;

    return (
        <div className="dashboard-container">
            <h1>Dashboard</h1>
            <nav>
                <section className="dashboard-section">
                    <h2> Senaste ej utförda ärenden</h2>
                    {recentTodos.length === 0 ? (
                        <p>Inga ej utförda ärenden</p>) : (
                            <ul>
                                {recentTodos.map((todo) => (
                                    <li key={todo.id}>{todo.title} - deadline: {todo.deadline}</li>
                                ))}
                            </ul>
                        )}

                    <br />
                    <Link className="dashboard-link" to="/todos">
                        Gå till alla ärenden
                    </Link>
                </section>  


                <section className="dashboard-section">
                    <h2>Viktigaste rutiner</h2>
                    
                    <div className="top-habits">
                      <TopHabits count={3} />
                      <br />
                      <Link className="dashboard-link" to="/habits">Gå till alla rutiner</Link>
                    </div>
                </section>  


                <section className="dashboard-section">
                    <h2>Kommande händelser</h2>

                    {upcomingEvents.length === 0 ? (
                        <p>Inga kommande händelser</p>
                    ) : (
                        <ul>
                        {upcomingEvents.map((ev) => (
                            <li key={ev.id}>
                            <strong>{ev.title}</strong><br />
                            {new Date(ev.start).toLocaleString()}
                            </li>
                        ))}
                        </ul>
                    )}

                    <br />
                    <Link className="dashboard-link" to="/events">
                        Gå till alla händelser
                    </Link>
                </section>

            </nav>
        </div>

    )
}

export default HomePage