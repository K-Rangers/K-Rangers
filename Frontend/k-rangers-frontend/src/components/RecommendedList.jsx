import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../css/RecommendedList.module.css";
import RecommendedCard from "./RecommendedCard";

// 👈 ratings를 props로 추가
function RecommendedList({ items = [], reviews = {}, reasons = {}, summaries = {}, ratings = {} }) {
  const navigate = useNavigate();
  const title = "AI 추천 여행지";
  const canSeeAll = items.length > 1;
  const view = items.slice(0, 1);

  const handleSeeAll = () => {
    // 💥 navigate 함수에 ratings도 함께 state로 넘김
    navigate("/all", { state: { items, reviews, reasons, summaries, ratings } }); 
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
            const itemReviews = reviews[it.id] || [];
            return (
              <RecommendedCard
                key={String(it.id)}
                item={it}
                reviews={itemReviews}
                onClick={handleCardClick}
                reason={summaries[it.id] || reasons[it.id]}
                rating={ratings[it.id] || 0} // 👈 여기서 평점 데이터를 전달!
              />
            );
          })}
        </div>
      )}
    </section>
  );
}
export default RecommendedList;