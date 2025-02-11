import styles from "./LoadingSpinner.module.css";

function LoadingSpinner() {
  return (
    <div className={styles.loadingSpinner}>
      <div className={styles.spinnerCircle}></div>
      <p>Please reconnect to the Internet.</p>
    </div>
  );
}

export default LoadingSpinner;
