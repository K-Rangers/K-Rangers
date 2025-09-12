import React, { useMemo } from "react";
import styles from "../css/RecommendedCard.module.css";

const isOn = (v) => {
  if (typeof v === "boolean") return v;
  if (v == null) return false;
  const s = String(v).trim().toLowerCase();
  return s === "있음" || s === "y";
};

const CATEGORY_LABELS = {
  Park: "공원",
  Museum: "박물관",
  ThemaPark: "테마파크",
  Market: "시장",
  Temple: "사찰",
  School: "학교",
  SportsFacility: "스포츠 시설",
  CulturalHeritage: "문화재",
  ArtMuseum: "미술관",
  Arboretum: "수목원",
  Attraction: "명소",
  DepartmentStore: "백화점",
  CultureCenter: "문화센터",
  LearningCenter: "학습관",
  ExhibitionHall: "전시장",
  Aquarium: "아쿠아리움",
  Theater: "공연예술극장",
};

function RecommendedCard({ item, reviews = [], onClick, reason }) {
  const chips = [
    isOn(item.restroom) && "장애인 화장실",
    isOn(item.elevator) && "엘리베이터",
    isOn(item.parking) && "장애인 주차구역",
    isOn(item.facility) && "장애인 이용가능시설",
    isOn(item.ramp) && "경사로",
    isOn(item.informationCenter) && "관광안내소",
    isOn(item.wheelchairRental) && "휠체어 대여소",
    isOn(item.restaurant) && "음식점",
    isOn(item.lift) && "휠체어 리프트",
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

  const getCategoryLabel = (cat) =>
    CATEGORY_LABELS[cat?.toString().trim()] ?? cat ?? "";

  const thumb = item.thumbnailUrl || "https://velog.velcdn.com/images/kiw0n/post/d254dfb0-b3b6-43b4-b0b5-2914257a09c7/image.jpeg";
  const category = getCategoryLabel(item.category) || "";
  const name = item.name || "";
  const address = item.address || "";

  return (
    <article
      className={styles.card}
      role="button"
      tabIndex={0}
      onClick={() => onClick?.(item)}
      onKeyDown={(e) => e.key === "Enter" && onClick?.(item)}
      style={{ cursor: "pointer" }}
    >


      <div className={styles.thumbWrap}>
        <img
          src={thumb}
          alt={`${name} 대표 이미지`}
          className={styles.thumb}
          loading="lazy"
        />
        {category && <span className={styles.category}>{category}</span>}
        <h3 className={styles.name}>{name}</h3>
      </div>

      <div className={styles.meta}>
        {address && <span className={styles.address}>{address}</span>}
      </div>

      {chips.length > 0 && (
        <div className={styles.chips}>
          {chips.slice(0, 10).map((c) => (
            <span key={c} className={styles.chip}>{c}</span>
          ))}
        </div>
      )}

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
