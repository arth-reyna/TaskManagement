import Navbar from "../../components/navbar";
import Sidebar from "../../components/sidebar";
import { Outlet } from "react-router-dom";
import styles from "./styles.module.scss";

const Dashboard = () => {
  return (
    <div className={styles.dashboard}>
      <Navbar />
      <div className={styles.content}>
        <Sidebar />
        <div className={styles.outlet}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
