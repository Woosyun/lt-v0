"use client"
import styles from "./overlay.module.css"

const Overlay = ({
  selectionStart,
  selectionEnd
}) => {
  return (
    <div
      className={styles.container}
      style={{
        left: Math.min(selectionStart.x, selectionEnd.x),
        top: Math.min(selectionStart.y, selectionEnd.y),
        width: Math.abs(selectionEnd.x - selectionStart.x),
        height: Math.abs(selectionEnd.y - selectionStart.y),
      }}
    />
  )
}

export default Overlay;