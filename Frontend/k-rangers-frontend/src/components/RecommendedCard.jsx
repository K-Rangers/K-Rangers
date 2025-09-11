import React, { useMemo } from "react";
import styles from "../css/RecommendedCard.module.css";

function RecommendedCard({ item, reviews = [], onClick, reason }) {
  const f = item.features || {};
  const chips = [
    f.toilet && "장애인 화장실",
    f.elevator && "엘리베이터",
    f.parking && "장애인 주차구역",
    f.accessible && "장애인 이용가능시설",
    f.ramp && "경사로",
    f.guide && "관광안내소",
    f.wheelchairRental && "휠체어 대여소",
    f.restaurant && "음식점",
  ].filter(Boolean);

  const { avg, count, sum } = useMemo(() => {
    const c = reviews.length;
    if (!c) return { avg: null, count: 0, sum: 0 };
    const sum = reviews.reduce((s, r) => s + (Number(r.rating) || 0), 0);
    const avg = Math.round((sum / c) * 10) / 10;
    return { avg, count: c, sum };
  }, [reviews]);

  const renderStars = (rating = 0) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      let fill = 0;
      if (rating >= i) fill = 100;
      else if (rating >= i - 0.5) fill = 50;
      stars.push(
        <span key={i} className={styles.star}>
          ★
          <span className={styles.starFill} style={{ width: `${fill}%` }}>
            ★
          </span>
        </span>
      );
    }
    return stars;
  };

  return (
    <article
      className={styles.card}
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => e.key === "Enter" && onClick?.()}
    >
      <div className={styles.thumbWrap}>
        <img
          src={item.thumbnailUrl}
          alt={`${item.name} 대표 이미지`}
          className={styles.thumb}
        />
        <span className={styles.category}>{item.category}</span>
        <h3 className={styles.name}>{item.name}</h3>
      </div>

      <div className={styles.meta}>
        <span className={styles.address}>{item.address}</span>
      </div>

      <div className={styles.chips}>
        {chips.slice(0, 5).map((c) => (
          <span key={c} className={styles.chip}>{c}</span>
        ))}
      </div>

      <div className={styles.reviewSummary}>
        {count > 0 ? (
          <div className={styles.starsRow} aria-label={`평균 평점 ${avg}점`}>
            {renderStars(avg)}
            <span
              className={styles.reviewAvgText}
              title={`${sum} ÷ ${count} = ${avg}`}
            >
              {avg.toFixed(1)}
            </span>
            <span className={styles.reviewCount}>{count}개 리뷰</span>
          </div>
        ) : (
          <span className={styles.reviewCount}>리뷰가 아직 없어요. 😭</span>
        )}
      </div>

      {reason && (
        <div className={styles.reasonBox} role="note">
          <div className={styles.reasonTitle}>AI가 추천해요!</div>
          <p className={styles.reasonText} title={reason}>
            {reason}
          </p>
        </div>
      )}
    </article>
  );
}

export default RecommendedCard;
