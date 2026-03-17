import styles from "./styles.module.scss"

const Button = ({ props }) => {
  const { text, onClick } = props;

  return (
    <button onClick={onClick} className={styles.button}>
      {text}
    </button>
  );
};

export default Button;
