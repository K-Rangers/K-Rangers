import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { FiChevronLeft } from "react-icons/fi";
import styles from "../css/PageCss/ReviewWritePage.module.css";
import { createAttractionReview, createAccommodationReview } from "../api/ApiStore";

function StarInput({ value, onChange }) {
  const [hover, setHover] = useState(0);
  const shown = hover || value;

  return (
    <div className={styles.stars} onMouseLeave={() => setHover(0)}>
      {[1, 2, 3, 4, 5].map((i) => (
        <button
          key={i}
          type="button"
          className={`${styles.starBtn} ${shown >= i ? styles.on : ""}`}
          onMouseEnter={() => setHover(i)}
          onClick={() => onChange(i)}
        >
          ★
        </button>
      ))}
    </div>
  );
}

function ReviewWritePage() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [sp] = useSearchParams();

  const targetId = useMemo(() => {
    const idFromState =
      state?.item?.accommodationId ?? state?.item?.attractionId ?? state?.item?.id;
    const idFromQuery = sp.get("id");
    return idFromState ?? (idFromQuery ? Number(idFromQuery) : null);
  }, [state, sp]);

  const reviewType = useMemo(() => {
    if (state?.item?.accommodationId) return "accommodation";
    if (state?.item?.attractionId) return "attraction";
    const typeQuery = sp.get("type");
    return typeQuery || "attraction"; 
  }, [state, sp]);
  useEffect(() => {
    console.log("넘어온 state:", state);
    console.log("리뷰 타입:", reviewType);
    console.log("요청할 ID:", targetId);
  }, [state, reviewType, targetId]);

  const placeName = state?.item?.name ?? sp.get("name") ?? "리뷰 작성";

  const [rating, setRating] = useState(5);
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");


  const canSubmit = useMemo(
    () =>
      targetId &&
      rating >= 1 &&
      rating <= 5 &&
      content.trim().length >= 5 &&
      !submitting,
    [targetId, rating, content, submitting]
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!canSubmit) return;

    setSubmitting(true);
    setErrorMsg("");

    try {
      if (reviewType === "attraction") {
        await createAttractionReview(targetId, { rating, content: content.trim() });
      } else if (reviewType === "accommodation") {
        await createAccommodationReview(targetId, { rating, content: content.trim() });
      } else {
        throw new Error("리뷰 타입이 잘못되었습니다.");
      }

      alert("리뷰가 등록되었습니다! 🙌");
      navigate(-1);
    } catch (err) {
      const status = err?.response?.status;
      if (status === 401 || status === 403) {
        setErrorMsg("권한이 없거나 로그인이 만료되었어요. 다시 로그인해 주세요.");
      } else {
        setErrorMsg(
          err?.response?.data?.message ||
          "리뷰 저장에 실패했습니다. 잠시 후 다시 시도해주세요."
        );
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.app}>
      <div className={styles.phone}>
        <div className={styles.page}>
          <header className={styles.header}>
            <button className={styles.backBtn} onClick={() => navigate(-1)}>
              <FiChevronLeft size={22} />
            </button>
            <h1 className={styles.title}>{placeName}</h1>
          </header>

          <form className={styles.form} onSubmit={handleSubmit}>
            <label className={styles.label}>별점을 남겨주세요!</label>
            <StarInput value={rating} onChange={setRating} />
            <div className={styles.hint}>
              악의적인 댓글 혹은 욕설은 예고없이 삭제될 수 있습니다.
            </div>

            <label className={styles.label} htmlFor="content">
              내용
            </label>
            <textarea
              id="content"
              className={styles.textarea}
              placeholder="방문 소감, 접근성, 편의시설 등을 자유롭게 적어주세요 (최소 5자)"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={8}
            />

            {errorMsg && <div className={styles.error}>{errorMsg}</div>}

            <button type="submit" className={styles.submitBtn} disabled={!canSubmit}>
              {submitting ? "작성 중..." : "리뷰 등록"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ReviewWritePage;