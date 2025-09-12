import React, { useMemo, useRef, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "../css/DetailPost.module.css";

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
  const location = useLocation();

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

  const thumb =
    item.thumbnailUrl ||
    "https://velog.velcdn.com/images/kiw0n/post/d254dfb0-b3b6-43b4-b0b5-2914257a09c7/image.jpeg";
  const category =
    CATEGORY_LABELS[item.category?.toString().trim()] ?? (item.category || "");

  // 버튼 클릭 시 리뷰 작성 페이지로 이동 (미로그인 → 로그인으로)
  const handleWrite = () => {
    const id = item?.accommodationId || item?.id || item?.attractionId;
    if (!id) return;

    const token =
      localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken");

    const target = `/reviews/new?id=${id}`;

    if (!token) {
      window.alert("로그인이 필요합니다. 로그인 후 리뷰를 작성해주세요!");
      // 쿼리 + state 둘 다에 redirect 넣어 안정성 확보
      navigate(`/login?redirect=${encodeURIComponent(target)}`, {
        state: { redirectTo: target, from: location.pathname + location.search, item },
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

          {ratingInfo.avg != null && (
            <div className={styles.inlineRating}>
              <StarRating rating={ratingInfo.avg} small />
              <span className={styles.reviewAvgText}>{ratingInfo.avg.toFixed(1)}</span>
              <span className={styles.reviewCount}>({ratingInfo.count}개)</span>
            </div>
          )}
        </div>
      </div>

      <div className={styles.reasonBox} role="note">
        <div className={styles.reasonTitle}>AI가 추천해요!</div>
        <p className={styles.reasonText} title={reasonText}>{reasonText}</p>
      </div>

      <div className={styles.sectionHeader}>
        <h3 className={styles.reviewTitle}>
          리뷰 <span className={styles.reviewCount}>({ratingInfo.count || 0}개)</span>
        </h3>
        <div
          role="button"
          tabIndex={0}
          className={styles.writeBtn}
          aria-label="리뷰 작성하기"
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
