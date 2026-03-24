import Image from "../image";
import styles from "./styles.module.scss";
import logo from "../../assets/logo.png";
import Button from "../button";
import Modal from "../modal";
import LoginForm from "../login-form/index";

const Navbar = ({
  isLoggedIn,
  openModal,
  onLoginClick,
  onCloseModal,
  onLogin,
  email
}) => {

  return (
    <div className={styles.main}>
      <div className={styles.leftPanel}>
        <Image src={logo} alt="logo" className={styles.logo} />
      </div>

      <div className={styles.rightPanel}>
        {isLoggedIn ? (
          <p className={styles.username}>Welcome {email}! </p>
        ) : (
          <Button
            props={{
              text: "Login",
              onClick: onLoginClick,
              styles: styles.btn,
            }}
          />
        )}
      </div>

      <Modal isOpen={openModal} onClose={onCloseModal}>
        <LoginForm onSubmit={onLogin} />
      </Modal>
    </div>
  );
};

export default Navbar;
