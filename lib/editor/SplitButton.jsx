import styles from "./splitButton.module.css";

const SplitButton = ({ selectedComponents }) => {
  return (
    <div className={styles.splitButton}>
      {(selectedComponents.length !== 0) && (
        <button
          // onClick={splitDoc}
        >
          split doc
        </button>
      )}
    </div>
  )
}

export default SplitButton;