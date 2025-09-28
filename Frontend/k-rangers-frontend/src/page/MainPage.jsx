import React from "react";
import Header from "../components/Header";
import styles from "../css/PageCss/MainPage.module.css";
import HeroSection from "../components/CardOption/HeroSection";
import AccessChips from "../components/CardOption/AccessChips";
import AttRecommendedList from "../components/Attraction/AttRecommendedList";
import AccommodationList from "../components/Accommodation/AccomRecommendedList";
import BottomNav from "../components/BottomNav";

function MainPage() {
  return (
    <div className={styles.app}>
      <div className={styles.phone}>
        <Header />
        <div className={styles.content}>
          <HeroSection />
          <AccessChips />
          <AttRecommendedList />
          <AccommodationList />
        </div>
        <BottomNav />
      </div>
    </div>
  );
}

export default MainPage;
