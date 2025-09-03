import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../css/RecommendedList.module.css";
import RecommendedCard from "./RecommendedCard";

export default function RecommendedList({
  items = [],          // 미리보기용 (district + features 반영)
  allItems,            // 모두보기용 (district만 반영 or 전체) ← 중요
  title = "추천 여행지",
  onSelect,
}) {
  const navigate = useNavigate();

  const totalList = Array.isArray(allItems) ? allItems : items;
  const canSeeAll = totalList.length > 1;
  const view = items.slice(0, 1);

  const handleSeeAll = () => {
    navigate("/all", {
      state: {
        title,
        items: totalList,   // ← 여기! 전체 목록을 state로 넘김
      },
    });
  };

  return (
    <section className={styles.wrapper}>
      <div className={styles.headerRow}>
        
        <h2 className={styles.title}>{title}</h2>

        {canSeeAll && (
          <button
            type="button"
            className={styles.moreBtn}
            onClick={handleSeeAll}
          >
            모두 보기
          </button>
        )}
      </div>

      <div className={styles.grid}>
        {view.map((it) => (
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
