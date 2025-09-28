import React from "react";
import styles from "../../css/CardOption/RecommendedCard.module.css";
import isOn from "../../utils/isOn";
import { CATEGORY_LABELS, CHIPS } from "../../data/Options";
import CalcStars from "../../utils/CalcStars";

function AttRecommendedCard({ item, onClick, reason }) {
  const chips = CHIPS.filter((chip) => isOn(item[chip.key])).map((chip) => chip.label);

  const reviewCount = item.reviews?.length ?? 0;
  const categoryLabels = CATEGORY_LABELS[item.category]

  const thumb = item.imageUrl || "/assets/no-image.png";
  const category = categoryLabels || "";
  const name = item.name || "";
  const address = item.address || "";
  const stars = CalcStars(item.rating);

  return (
    <article
      className={styles.card}
      tabIndex={0}
      onClick={() => onClick?.(item)}
      onKeyDown={(e) => e.key === "Enter" && onClick?.(item)}
    >
      <div className={styles.thumbWrap}>
        {thumb && (
          <img
            src={thumb}
            alt={`${name} 대표 이미지`}
            className={styles.thumb}
            loading="lazy"
          />
        )}
        {category && <span className={styles.category}>{category}</span>}
        {name && <h3 className={styles.name}>{name}</h3>}
      </div>

      {address && (
        <div className={styles.meta}>
          <span className={styles.address}>{address}</span>
        </div>
      )}

      {chips.length > 0 && (
        <div className={styles.chips}>
          {chips.map((c) => (
            <span key={c} className={styles.chip}>
              {c}
            </span>
          ))}
        </div>
      )}
      <div className={styles.reviewSummary}>
        <div className={styles.starsRow}>
          <div className={styles.stars}>
            {stars.map((s) => (
              <span key={s.id} className={styles.star}>
                ★
                <span
                  className={styles.starFill}
                  style={{ width: `${s.fill}%` }}
                >
                  ★
                </span>
              </span>
            ))}
          </div>
          <span className={styles.reviewAvgText}>
            {reviewCount > 0 ? item.rating.toFixed(1) : "0.0"}
          </span>
          <span className={styles.reviewCount}>
            {reviewCount}개 리뷰
          </span>
        </div>
      </div>

      <div className={styles.reasonBox}>
        <div className={styles.reasonTitle}>AI가 추천해요!</div>
        <p className={styles.reasonText}>{reason}</p>
      </div>
    </article>
  );
}

export default AttRecommendedCard;
