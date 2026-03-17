// import style from "./styles.module.scss";

const TextBox = ({ props }) => {

  const { name, id, styles, onchange, value } = props;

  return (
    <div>
      <input type="text" name={name} id={id} className={styles} onChange={onchange} value={value} />
    </div>
  )
}

export default TextBox