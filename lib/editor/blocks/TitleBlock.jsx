import styles from "./titleBlock.module.css";

const TitleBlock = ({
  title,
  titleHandleChange
}) => {
  return (
    <textarea
      // id="-1"
      className={styles.textarea}
      // contentEditable
      value={title}
      placeholder="TITLE"
      onInput={(e) => titleHandleChange(e.target.value)}
    ></textarea>
  )
}

export default TitleBlock