import { useEffect, useState } from "react";
import styles from "./styles.module.scss";

const Dashboard = () => {
  const [data, setData] = useState({
    totalTasks: 0,
    activeTasks: 0,
    inActiveTasks: 0,
  });

  useEffect(() => {
    const fetchDashboard = async () => {
      const response = await fetch("http://localhost:5000/api/overview", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Unable to fetch dashboard data");
      }

      const result = await response.json();
      setData(result.data);
    };

    fetchDashboard();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Your Dashboard</h1>
        <hr />
      </div>

      <div className={styles.cards}>
        <div className={styles.card}>
          <h3>Total Tasks</h3>
          <p>{data.totalTasks}</p>
        </div>
        <div className={styles.card}>
          <h3>Active Tasks</h3>
          <p>{data.activeTasks}</p>
        </div>
        <div className={styles.card}>
          <h3>Completed Tasks</h3>
          <p>{data.inActiveTasks}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
