import React from "react";
import Header from "../components/Header";
import styles from "../css/MainPage.module.css";
import RecommendedSection from "../components/RecommendedSection";

function MainPage() {
  return (
    <div className={styles.app}>
      <div className={styles.phone}>
        <Header />
        <div className={styles.content}>
          <RecommendedSection />
        </div>
        <BottomNav />
      </div>
    </div>
  );
}

export default MainPage;
