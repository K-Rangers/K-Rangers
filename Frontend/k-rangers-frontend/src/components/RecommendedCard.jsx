import React from "react";
import styles from "../css/RecommendedCard.module.css";
import isOn from "../utils/isOn";
import { CATEGORY_LABELS , CHIPS} from "../data/Options";

function StarRating({ rating = 0, small = false }) {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    let fill = 0;
    if (rating >= i) fill = 100;
    else if (rating >= i - 0.5) fill = 50;

    stars.push(
      <span
        key={i}
        className={`${styles.star} ${small ? styles.starsSm : ""}`}
      >
        ★
        <span
          className={styles.starFill}
          style={{ width: `${fill}%` }}
        >
          ★
        </span>
      </span>
    );
  }
  return <div className={styles.stars}>{stars}</div>;
}

function RecommendedCard({ item, onClick, reason }) {
  const chips = CHIPS
  .filter((chip) => isOn(item[chip.key]))
  .map((chip) => chip.label);

  const reviewCount = item.reviews?.length ?? 0;
  const getCategoryLabel = (cat) =>
    CATEGORY_LABELS[cat?.toString().trim()] ?? cat ?? "";

  const thumb = item.imageUrl || "/assets/no-image.png";
  const category = getCategoryLabel(item.category);
  const name = item.name || "";
  const address = item.address || "";

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
        {reviewCount > 0 ? (
          <div
            className={styles.starsRow}
          >
            <StarRating rating={item.rating} />
            <span className={styles.reviewAvgText}>
              {item.rating.toFixed(1)}
            </span>
            <span className={styles.reviewCount}>
              {reviewCount}개 리뷰
            </span>
          </div>
        ) : (
          <span className={styles.reviewCount}>
            리뷰가 아직 없어요. 😭
          </span>
        )}
      </div>

      <div className={styles.reasonBox}>
        <div className={styles.reasonTitle}>AI가 추천해요!</div>
        <p className={styles.reasonText}>{reason}</p>
      </div>
    </article>
  );
}

export default RecommendedCard;
