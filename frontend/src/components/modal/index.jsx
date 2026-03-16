import styles from "./styles.module.scss";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlayStyle}>
      <div className={styles.modalStyle}>
        <button className={styles.closeBtn} onClick={onClose}>
          X
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
