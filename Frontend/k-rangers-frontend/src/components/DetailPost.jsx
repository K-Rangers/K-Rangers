import React, { useMemo, useRef, useState, useEffect } from "react";
import styles from "../css/DetailPost.module.css";
import { REVIEWS, RECOMMEND_REASONS } from "../Data/Data";

function StarRating({ rating = 0, small = false }) {
  const render = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      let fill = 0;
      if (rating >= i) fill = 100;
      else if (rating >= i - 0.5) fill = 50;
      stars.push(
        <span key={i} className={`${styles.star} ${small ? styles.starsSm : ""}`}>
          ★
          <span className={styles.starFill} style={{ width: `${fill}%` }}>★</span>
        </span>
      );
    }
    return stars;
  };
  return <div className={styles.stars}>{render()}</div>;
}

function DetailPost({ item, onWriteReview }) {
  const reviews = useMemo(
    () => (item ? (REVIEWS || []).filter((r) => r.placeId === item.id) : []),
    [item]
  );

  const { avg, count } = useMemo(() => {
    const c = reviews.length;
    if (!c) return { avg: null, count: 0 };
    const sum = reviews.reduce((s, r) => s + (r.rating || 0), 0);
    return { avg: Math.round((sum / c) * 10) / 10, count: c };
  }, [reviews]);

  const chips = useMemo(() => {
    const f = item?.features || {};
    return [
      f.toilet && "장애인 화장실",
      f.elevator && "엘리베이터",
      f.parking && "장애인 주차구역",
      f.accessible && "장애인 이용가능시설",
      f.ramp && "경사로",
      f.guide && "관광안내소",
      f.wheelchairRental && "휠체어 대여소",
      f.restaurant && "음식점",
    ].filter(Boolean);
  }, [item]);

  const reason = RECOMMEND_REASONS?.[item?.id];

  const addressRef = useRef(null);
  const [isOverflow, setIsOverflow] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const el = addressRef.current;
    if (!el) return;
    const check = () => setIsOverflow(el.scrollWidth > el.clientWidth);
    check();
    let ro;
    if ("ResizeObserver" in window) {
      ro = new ResizeObserver(check);
      ro.observe(el);
    }
    window.addEventListener("resize", check);
    return () => {
      window.removeEventListener("resize", check);
      ro?.disconnect();
    };
  }, [item?.address]);

  useEffect(() => {
    if (!showModal) return;
    const onKey = (e) => e.key === "Escape" && setShowModal(false);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [showModal]);

  if (!item) {
    return (
      <div className={styles.container}>
        <div className={styles.empty}>게시물 정보를 불러올 수 없습니다.</div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.thumbWrap}>
        <img src={item.thumbnailUrl} alt={`${item.name} 대표 이미지`} className={styles.thumb} />
        <span className={styles.category}>{item.category}</span>
        <h3 className={styles.name}>{item.name}</h3>
      </div>

      <div className={styles.infoSection}>
        <div className={styles.addressRow}>
          <div
            ref={addressRef}
            className={`${styles.address} ${isOverflow ? styles.addressClickable : ""}`}
            role={isOverflow ? "button" : undefined}
            tabIndex={isOverflow ? 0 : -1}
            aria-label={isOverflow ? "전체 주소 보기" : undefined}
            onClick={() => isOverflow && setShowModal(true)}
            onKeyDown={(e) => {
              if (!isOverflow) return;
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setShowModal(true);
              }
            }}
            title={!isOverflow ? item.address : ""}
          >
            {item.address}
          </div>

          {avg && (
            <div className={styles.inlineRating}>
              <StarRating rating={avg} small />
              <span className={styles.reviewAvgText}>{avg.toFixed(1)}</span>
              <span className={styles.reviewCount}>({count}개)</span>
            </div>
          )}
        </div>
      </div>

      {chips.length > 0 && (
        <div className={styles.accessibilitySection}>
          <h3 className={styles.sectionTitle}>접근성 정보</h3>
          <div className={styles.chips}>
            {chips.map((c) => (
              <span key={c} className={styles.chip}>{c}</span>
            ))}
          </div>
        </div>
      )}

      {reason && (
        <div className={styles.reasonBox} role="note">
          <div className={styles.reasonTitle}>AI가 추천해요!</div>
          <p className={styles.reasonText} title={reason}>{reason}</p>
        </div>
      )}

      <div className={styles.sectionHeader}>
        <h3 className={styles.reviewTitle}>
          리뷰 <span className={styles.reviewCount}>({count}개)</span>
        </h3>
        <div
          role="button"
          tabIndex={0}
          className={styles.writeBtn}
          aria-label="리뷰 작성하기"
          onClick={() => onWriteReview?.(item)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onWriteReview?.(item);
            }
          }}
        >
          리뷰 작성하기
        </div>
      </div>

      {reviews.length > 0 ? (
        <div className={styles.reviewList}>
          {reviews.map((r, i) => (
            <div key={i} className={styles.reviewItem}>
              <div className={styles.reviewHead}>
                <span className={styles.nick}>{r.nickname}</span>
                <time className={styles.date}>
                  {r.createdAt ? new Date(r.createdAt).toLocaleDateString("ko-KR") : ""}
                </time>
                <div className={styles.itemStars}>
                  <StarRating rating={r.rating} small />
                  <span className={styles.itemRatingNumber}>
                    {r.rating?.toFixed?.(1) ?? r.rating}
                  </span>
                </div>
              </div>
              <p className={styles.reviewBody}>{r.content}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.empty}>아직 등록된 리뷰가 없어요. 첫 리뷰를 남겨보세요!</div>
      )}

      {showModal && (
        <div className={styles.modalBackdrop} onClick={() => setShowModal(false)} role="presentation">
          <div
            className={styles.modal}
            role="dialog"
            aria-modal="true"
            aria-labelledby="addressModalTitle"
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.modalHeader}>
              <h4 id="addressModalTitle" className={styles.modalTitle}>전체 주소</h4>
              <div
                className={styles.modalClose}
                role="button"
                tabIndex={0}
                aria-label="닫기"
                onClick={() => setShowModal(false)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") setShowModal(false);
                }}
              >
                ✕
              </div>
            </div>
            <div className={styles.modalBody}>
              <p className={styles.fullAddress}>{item.address}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DetailPost;
