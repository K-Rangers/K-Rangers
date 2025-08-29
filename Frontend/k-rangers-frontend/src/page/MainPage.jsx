import React from "react";
import Header from "../components/Header";
import styles from "../css/MainPage.module.css";  

function MainPage() {
  return (
    <div className={styles.app}>
      <div className={styles.phone}>
        <Header />  

      </div>
    </div>
  );
}

export default MainPage;
