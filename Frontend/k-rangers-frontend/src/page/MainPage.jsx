import React from "react";
import Header from "../components/Header";
import styles from "../css/MainPage.module.css";
import HeroSection from "../components/HeroSection";

function MainPage() {
  return (
    <div className={styles.app}>
      <div className={styles.phone}>
        <Header />
        <div className={styles.content}>
          <HeroSection />
        </div>
      </div>
    </div>
  );
}

export default MainPage;
