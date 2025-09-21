import React, { useMemo, useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../css/DetailPost.module.css";
import { CATEGORY_LABELS, CHIPS } from "../data/Options";

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

function DetailPost({ item }) {
  const navigate = useNavigate();

  const ratingInfo = useMemo(() => {
    const avg = Number.isFinite(item?.rating) ? Math.round(item.rating * 10) / 10 : null;
    const count = Array.isArray(item?.reviews) ? item.reviews.length : 0;
    return { avg, count };
  }, [item]);

  const reasonText = item?.summary || "요약할 리뷰가 없습니다.";

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
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [showModal]);

  if (!item) {
    return (
      <div className={styles.container}>
        <div className={styles.empty}>게시물 정보를 불러올 수 없습니다.</div>
      </div>
    );
  }

  const thumb =
    item.thumbnailUrl ||
    "https://velog.velcdn.com/images/kiw0n/post/d254dfb0-b3b6-43b4-b0b5-2914257a09c7/image.jpeg";
  const category =
    CATEGORY_LABELS[item.category?.toString().trim()] ?? (item.category || "");

  const handleWrite = () => {
    const id = item?.accommodationId || item?.id || item?.attractionId;
    if (!id) return;

    const token = localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken");
    const target = `/reviews?id=${id}`;

    if (!token) {
      window.alert("로그인이 필요합니다. 로그인 후 리뷰를 작성해주세요!");
      navigate(`/login?redirect=${encodeURIComponent(target)}`, {
        state: { redirectTo: target, item },
        replace: true,
      });
      return;
    }

    navigate(target, { state: { item } });
  };

  return (
    <div className={styles.container}>
      <div className={styles.thumbWrap}>
        <img src={thumb} alt={`${item.name} 대표 이미지`} className={styles.thumb} />
        {category && <span className={styles.category}>{category}</span>}
        <h3 className={styles.name}>{item.name}</h3>
      </div>

      <div className={styles.infoSection}>
        <div className={styles.addressRow}>
          <div
            ref={addressRef}
            className={`${styles.address} ${isOverflow ? styles.addressClickable : ""}`}
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

          {ratingInfo.avg != null && (
            <div className={styles.inlineRating}>
              <StarRating rating={ratingInfo.avg} small />
              <span className={styles.reviewAvgText}>{ratingInfo.avg.toFixed(1)}</span>
              <span className={styles.reviewCount}>({ratingInfo.count}개)</span>
            </div>
          )}
        </div>
      </div>

      <div className={styles.accessibilitySection}>
        <h3 className={styles.sectionTitle}>접근성 정보</h3>
        <div className={styles.chips}>
          {CHIPS.map(({ key, label }) =>
            item[key] === "있음" ? (
              <span key={key} className={styles.chip}>
                {label}
              </span>
            ) : null
          )}
        </div>
      </div>

      <div className={styles.reasonBox}>
        <div className={styles.reasonTitle}>AI가 추천해요!</div>
        <p className={styles.reasonText} title={reasonText}>{reasonText}</p>
      </div>

      <div className={styles.sectionHeader}>
        <h3 className={styles.reviewTitle}>
          리뷰 <span className={styles.reviewCount}>({ratingInfo.count || 0}개)</span>
        </h3>
        <div
          className={styles.writeBtn}
          onClick={handleWrite}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handleWrite();
            }
          }}
        >
          리뷰 작성하기
        </div>
      </div>

      {Array.isArray(item.reviews) && item.reviews.length > 0 ? (
        <div className={styles.reviewList}>
          {item.reviews.map((review) => (
            <div key={review.reviewId} className={styles.reviewItem}>
              <div className={styles.reviewHead}>
                <div className={styles.reviewMeta}>
                  <span className={styles.nick}>{review.userName || "익명"}</span>
                  <span className={styles.date}>
                    {review.createdAt ? new Date(review.createdAt).toLocaleDateString() : "날짜 없음"}
                  </span>
                </div>
                <div className={styles.itemStars}>
                  <StarRating rating={review.rating} small />
                </div>
              </div>
              <p className={styles.reviewBody}>{review.content}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.empty}>아직 등록된 리뷰가 없어요. 첫 리뷰를 남겨보세요!</div>
      )}

      {showModal && (
        <div className={styles.modalBackdrop} onClick={() => setShowModal(false)}>
          <div
            className={styles.modal}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.modalHeader}>
              <h4 className={styles.modalTitle}>전체 주소</h4>
              <div
                className={styles.modalClose}
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
