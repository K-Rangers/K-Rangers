import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../css/AllPostView.module.css";
import RecommendedCard from "./RecommendedCard";
import { FiChevronLeft } from "react-icons/fi";

function AllView({ items = [], onClose, reviews = [] , reasons = []}) {
  const navigate = useNavigate();

  const handleKeyDown = (e) => {
    if (!onClose) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClose();
    }
  };

  const handleCardClick = (item) => {
    navigate("/map", { state: { selectedItem: item } });
  };

  return (
    <section className={styles.wrapper}>
      <div className={styles.headerRow}>
        {onClose ? (
          <span
            className={styles.moreBtn}
            role="button"
            tabIndex={0}
            onClick={onClose}
            onKeyDown={handleKeyDown}
          >
            <FiChevronLeft size={18} aria-hidden="true" />
          </span>
        ) : (
          <span />
        )}

        <h2 className={styles.title}>AI 추천 여행지</h2>
      </div>

      {items.length === 0 ? (
        <p>표시할 항목이 없습니다.</p>
      ) : (
        <div className={styles.grid}>
          {items.map((it) => {
            const itemReviews = reviews.filter((r) => r.placeId === it.id);
            return (
              <RecommendedCard
                key={it.id}
                item={it}
                onClick={() => handleCardClick(it)}
                reviews={itemReviews}
                reason={reasons[it.id]}
              />
            );
          })}
        </div>
      )}
    </section>
  );
}

export default AllView;
