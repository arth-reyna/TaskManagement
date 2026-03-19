import styles from "./styles.module.scss";
import { sidebarData } from "./sidebarData.js";
import { NavLink } from "react-router-dom";

const Sidebar = ({ isLoggedIn }) => {
  return (
    <div className={styles.main}>
      <ul>
        {sidebarData.map((item, idx) => {
          if (item.label === "Logout" && !isLoggedIn) {
            return null;
          }
          return (
            <li key={idx}>
              <NavLink to={item.path}>{item.label}</NavLink>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;
