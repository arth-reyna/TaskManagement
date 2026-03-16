

const Button = ({ props }) => {
  const { text, onClick, styles } = props;

  return (
    <button onClick={onClick} className={styles}>
      {text}
    </button>
  );
};

export default Button;
