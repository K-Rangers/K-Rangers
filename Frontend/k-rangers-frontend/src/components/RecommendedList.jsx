import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../css/RecommendedList.module.css";
import RecommendedCard from "./RecommendedCard";
import useAttractionStore from "../store/AttractionStore";
import useAttraction from "../hooks/useAttraction";
import isOn from "../utils/isOn";

function RecommendedList() {
  const navigate = useNavigate();
  const districtCode = useAttractionStore((s) => s.districtCode);
  const features = useAttractionStore((s) => s.features);

  const items = useAttraction(districtCode);

  const filtered =
    features.size === 0
      ? items
      : items.filter((it) => [...features].every((k) => isOn(it[k])));

  const title = "AI 추천 여행지";
  const canSeeAll = filtered.length > 1;
  const first = filtered[0];

  const handleSeeAll = () => {
    navigate("/all", { state: { items: filtered } });
  };

  const handleCardClick = (item) => {
    navigate("/map", { state: { selectedItem: item } });
  };

  return (
    <section className={styles.wrapper}>
      <div className={styles.headerRow}>
        <div className={styles.aiGradientText}>{title}</div>
        {canSeeAll && (
          <button type="button" className={styles.moreBtn} onClick={handleSeeAll}>
            모두 보기
          </button>
        )}
      </div>

      {filtered.length === 0 ? (
        <div className={styles.empty}>조건에 맞는 관광지가 없어요. 😢</div>
      ) : (
        <div className={styles.grid}>
          {first && (
            <RecommendedCard
              key={String(first.id)}
              item={first}
              onClick={handleCardClick}
              reason={first.summary || "요약할 리뷰가 없습니다."}
            />
          )}
        </div>
      )}
    </section>
  );
}
export default RecommendedList;
