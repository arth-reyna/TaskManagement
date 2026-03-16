import styles from "./styles.module.scss";
import { sidebarData } from "./sidebarData.js";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className={styles.main}>
      <ul>
        {sidebarData.map((item, idx) => {
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
