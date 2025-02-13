import { useState, useEffect } from "react";
import styles from "./LoadingSpinner.module.css";

function LoadingSpinner() {
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    // Set a timeout to display the message after 5 seconds
    const timer = setTimeout(() => {
      setShowMessage(true);
    }, 5000);

    // Cleanup the timer if the component is unmounted
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={styles.loadingSpinner}>
      <div className={styles.spinnerCircle}></div>
      {showMessage && <p>Please reconnect to the Internet.</p>}
    </div>
  );
}

export default LoadingSpinner;
