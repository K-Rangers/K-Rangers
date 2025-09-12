import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../css/RecommendedList.module.css";
import RecommendedCard from "./RecommendedCard";

function RecommendedList({ items = [] }) { 
  const navigate = useNavigate();
  const title = "AI 추천 여행지";
  const canSeeAll = items.length > 1;
  const view = items.slice(0, 1);

  const handleSeeAll = () => {
    navigate("/all", { state: { items } });
  };

  const handleCardClick = (item) => {
    navigate("/map", { state: { selectedItem: item } });
  };

  return (
    <section className={styles.wrapper}>
      <div className={styles.headerRow}>
        <div className={styles.aiGradientText}>{title}</div>

        {canSeeAll && (
          <button type="button" className={styles.moreBtn} onClick={handleSeeAll}>
            모두 보기
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <div className={styles.empty}>
          조건에 맞는 관광지가 없어요. 😢
        </div>
      ) : (
        <div className={styles.grid}>
          {view.map((it) => {
            return (
              <RecommendedCard
                key={String(it.id)}
                item={it}
                onClick={handleCardClick}
                reason={it.summary || "요약할 리뷰가 없습니다."}
              />
            );
          })}
        </div>
      )}
    </section>
  );
}
export default RecommendedList;