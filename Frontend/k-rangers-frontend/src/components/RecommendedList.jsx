import React from "react";
import styles from "../css/RecommendedList.module.css";
import RecommendedCard from "./RecommendedCard";

export default function RecommendedList({ onSelect }) {
const dummyItems = [
  {
    id: "daegu-modern-history-museum",
    name: "대구근대역사관",
    category: "관광지", 
    address: "대구광역시 중구 경상감영길 67",
    phone: "053-606-6432",
    thumbnailUrl: "https://picsum.photos/id/1011/1200/800",
    features: {
      toilet: true,        // 장애인 화장실
      elevator: true,      // 엘리베이터
      parking: false,      // 장애인 주차구역
      accessible: true,    // 장애인 이용가능시설
      ramp: true,          // 경사로
      guide: true,         // 관광안내소
      wheelchairRental: false, // 휠체어 대여소
      restaurant: false    // 음식점
    },
  },
  {
    id: "daegu-gyesan-cathedral",
    name: "계산성당",
    category: "관광지", 
    address: "대구광역시 중구 서성로 10",
    phone: "053-254-1811",
    thumbnailUrl: "https://picsum.photos/id/1005/1200/800",
    features: {
      toilet: true,
      elevator: false,
      parking: false,
      accessible: true,
      ramp: true,
      guide: false,
      wheelchairRental: false,
      restaurant: false
    },
  },
  {
    id: "yangnyeongsi-museum",
    name: "약령시 한의약박물관",
    category: "관광지", 
    address: "대구광역시 중구 남성로 51",
    phone: "053-253-4729",
    thumbnailUrl: "https://picsum.photos/id/1016/1200/800",
    features: {
      toilet: true,
      elevator: true,
      parking: true,
      accessible: true,
      ramp: true,
      guide: true,
      wheelchairRental: true,
      restaurant: true
    },
  },
];


  return (
    <section className={styles.wrapper} aria-labelledby="rec-title">
      <div className={styles.headerRow}>
        <h2 id="rec-title" className={styles.title}>추천 여행지</h2>
        <button className={styles.moreBtn}>모두 보기</button>
      </div>

      <div className={styles.grid}>
        {dummyItems.slice(0, 1).map((it) => (
          <RecommendedCard
            key={it.id}
            item={it}
            onClick={() => onSelect?.(it)}
          />
        ))}
      </div>
    </section>
  );
}
