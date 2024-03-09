"use client"
import styles from "./markdownBlock.module.css";

const MarkdownBlock = ({
  block,
  idx,
  handleInput,
  blockHandleKeyDown
}) => {
  return (
    <textarea
      className={styles.textarea}
      value={block.content}
      onInput={(e) => {
        handleInput(e, idx);
      }}
      onKeyDown={(e) => {
        blockHandleKeyDown(e, idx);
      }}
    >
    </textarea>
  )
}

export default MarkdownBlock