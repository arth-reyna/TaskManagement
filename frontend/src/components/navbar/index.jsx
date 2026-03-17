import Image from "../image";
import styles from "./styles.module.scss";
import logo from "../../assets/logo.png";
import { useState } from "react";
import Button from "../button";
import Modal from "../modal";
import LoginForm from "../login-form/index";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [email, setEmail] = useState(null);

  const handleLoginButtonClick = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const loginHandler = (email, password) => {
    console.log("Login details:", { email, password });
    if (email && password) {
      setIsLoggedIn(true);
      setOpenModal(false);
      setEmail(email);
    }
  };
  return (
    <div className={styles.main}>
      <div className={styles.leftPanel}>
        <Image src={logo} alt="logo" className={styles.logo}  />
      </div>

      <div className={styles.rightPanel}>
        {isLoggedIn ? (
          <p className={styles.username}>Welcome ${email}!  </p>
        ) : (
          <Button props={{ text: "Login", onClick: handleLoginButtonClick, styles: styles.btn }} />
        )}
      </div>

      <Modal isOpen={openModal} onClose={handleCloseModal}>
        <LoginForm onSubmit={loginHandler} />
      </Modal>
    </div>
  );
};

export default Navbar;
