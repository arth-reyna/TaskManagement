import styles from "./styles.module.scss";
import { sidebarData } from "./sidebarData.js";
import { NavLink } from "react-router-dom";
import Image from "../image/index.jsx";
import logo from "../../assets/logo.png";

const Sidebar = ({ isLoggedIn }) => {
  // Define visible items based on login state
  const visibleItems = isLoggedIn
    ? ["Tasks", "Dashboard", "Profile", "Logout"]
    : ["Home", "Login"];

  // Filter sidebar data
  const filteredSidebarData = sidebarData.filter((item) =>
    visibleItems.includes(item.label),
  );

  return (
    <div className={styles.main}>
      <ul>
        <Image src={logo} alt="logo" className={styles.logo} />
        {filteredSidebarData.map((item, idx) => (
          <li key={idx}>
            <NavLink to={item.path}>{item.label}</NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
