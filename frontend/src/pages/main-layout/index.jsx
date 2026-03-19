import Navbar from "../../components/navbar";
import Sidebar from "../../components/sidebar";
import { Outlet } from "react-router-dom";
import styles from "./styles.module.scss";
import { useState } from "react";

const MainLayout = () => {
  const [isLoggedIn, setIsLoggedIn] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [email, setEmail] = useState("");

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
      <Navbar
        isLoggedIn={isLoggedIn}
        openModal={openModal}
        onLoginClick={handleLoginButtonClick}
        onCloseModal={handleCloseModal}
        onLogin={loginHandler}
        email={email}
      />
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
