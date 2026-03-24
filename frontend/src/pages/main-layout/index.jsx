import Navbar from "../../components/navbar";
import Sidebar from "../../components/sidebar";
import { Outlet, useLocation } from "react-router-dom";
import styles from "./styles.module.scss";
import { useState, useEffect } from "react";

const MainLayout = () => {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const auth = localStorage.getItem("isAuthenticated");
    const userEmail = localStorage.getItem("userEmail");
    setIsLoggedIn(auth === "true");
    setEmail(userEmail || "");
  }, [location]);

  const handleLoginButtonClick = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const loginHandler = (email, password) => {
    if (email && password) {
      setIsLoggedIn(true);
      setOpenModal(false);
      setEmail(email);
    }
  };

  return (
    <div className={styles.mainbody}>
      {/* <Navbar
        isLoggedIn={isLoggedIn}
        openModal={openModal}
        onLoginClick={handleLoginButtonClick}
        onCloseModal={handleCloseModal}
        onLogin={loginHandler}
        email={email}
      /> */}
      <div className={styles.content}>
        <Sidebar isLoggedIn={isLoggedIn} email={email} />
        <div className={styles.outlet}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
