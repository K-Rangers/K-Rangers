// src/pages/ReviewWrite.jsx
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import styles from "../css/ReviewWritePage.module.css";
// 이미 너가 만든 api 인스턴스/함수 위치에 맞춰 경로 조정
import { createAccommodationReview } from "../api/ApiStore"; 

function StarInput({ value, onChange }) {
  const [hover, setHover] = useState(0);
  const shown = hover || value;
  return (
    <div className={styles.stars} onMouseLeave={() => setHover(0)}>
      {[1,2,3,4,5].map((i) => (
        <button
          key={i}
          type="button"
          className={`${styles.starBtn} ${shown >= i ? styles.on : ""}`}
          onMouseEnter={() => setHover(i)}
          onClick={() => onChange(i)}
          aria-label={`${i}점`}
        >
          ★
        </button>
      ))}
    </div>
  );
}

export default function ReviewWrite() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [sp] = useSearchParams();

  // accom id 가져오기: state 우선, 없으면 쿼리스트링
  const accomId = useMemo(() => {
    const fromState = state?.item?.accommodationId || state?.item?.id || state?.item?.attractionId;
    const fromQuery = sp.get("id");
    return fromState ?? (fromQuery ? Number(fromQuery) : null);
  }, [state, sp]);

  // 화면 표시용 장소명
  const placeName = state?.item?.name ?? "리뷰 작성";

  const [rating, setRating] = useState(5);
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (!accomId) setErrorMsg("대상 ID가 없습니다. 뒤로 가서 다시 시도해주세요.");
  }, [accomId]);

  const canSubmit = useMemo(() => {
    return accomId && rating >= 1 && rating <= 5 && content.trim().length >= 5 && !submitting;
  }, [accomId, rating, content, submitting]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!canSubmit) return;
    setSubmitting(true);
    setErrorMsg("");

    try {
      // 백엔드 스펙 맞추기: 필요한 필드만 전송
      // userName 등 서버에서 토큰으로 식별하면 필요 없음
      const payload = {
        rating,               // number (1~5)
        content: content.trim(), // string
      };
      await createAccommodationReview(accomId, payload);
      // 성공 시: 디테일 페이지로 되돌리기
      // state로 갔던 경우 브라우저 back이 자연스러움
      navigate(-1); 
    } catch (err) {
      // 에러 메시지 가공
      const serverMsg = err?.response?.data?.message;
      setErrorMsg(serverMsg || "리뷰 저장에 실패했습니다. 잠시 후 다시 시도해주세요.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <button className={styles.backBtn} onClick={() => navigate(-1)} aria-label="뒤로가기">←</button>
        <h1 className={styles.title}>{placeName} 리뷰</h1>
      </header>

      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.label}>별점</label>
        <StarInput value={rating} onChange={setRating} />
        <div className={styles.hint}>1~5점 중 선택</div>

        <label className={styles.label} htmlFor="content">내용</label>
        <textarea
          id="content"
          className={styles.textarea}
          placeholder="방문 소감, 접근성, 편의시설 등을 자유롭게 적어주세요 (최소 5자)"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={8}
        />

        {errorMsg && <div className={styles.error}>{errorMsg}</div>}

        <button
          type="submit"
          className={styles.submitBtn}
          disabled={!canSubmit}
          aria-disabled={!canSubmit}
        >
          {submitting ? "작성 중..." : "리뷰 등록"}
        </button>
      </form>
    </div>
  );
}
