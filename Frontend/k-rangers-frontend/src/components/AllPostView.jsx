import React from "react";
import styles from "../css/AllPostView.module.css";
import RecommendedCard from "./RecommendedCard";
import { FiChevronLeft } from "react-icons/fi";

function AllView({ items = [], onClose }) {
  
  const handleKeyDown = (e) => {
    if (!onClose) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClose();
    }
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
          {items.map((it) => (
            <RecommendedCard key={it.id} item={it} />
          ))}
        </div>
      )}
    </section>
  );
}

export default AllView;
