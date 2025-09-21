import React from "react";
import Header from "../components/Header";
import styles from "../css/MainPage.module.css";
import HeroSection from "../components/HeroSection";
import AccessChips from "../components/AccessChips";
import RecommendedList from "../components/RecommendedList";
import BottomNav from "../components/BottomNav";

function MainPage() {
  return (
    <div className={styles.app}>
      <div className={styles.phone}>
        <Header />
        <div className={styles.content}>
          <HeroSection />
          <AccessChips />
          <RecommendedList />
        </div>
        <BottomNav />
      </div>
    </div>
  );
}

export default MainPage;
