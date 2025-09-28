import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../css/Attraction/AttRecommendedList.module.css";
import AttRecommendedCard from "./AttRecommendedCard";
import useAttractionStore from "../../store/AttractionStore";
import useAttraction from "../../hooks/useAttraction";
import { filterByFeatures } from "../../utils/FilterByFeatures";

function AttRecommendedList() {
  const navigate = useNavigate();
  const districtCode = useAttractionStore((s) => s.districtCode);
  const features = useAttractionStore((s) => s.features);

  const items = useAttraction(districtCode);
  const filtered = filterByFeatures(items, features, "attraction");

  const canSeeAll = filtered.length > 1;
  const first = filtered[0];

  const handleSeeAll = () => {
    navigate("/all", { state: { items: filtered, mode: 'attraction' } });
  };

  const handleCardClick = (item) => {
    navigate("/map", { state: { selectedItem: item } });
  };

  return (
    <section className={styles.wrapper}>
      <div className={styles.headerRow}>
        <div className={styles.aiGradientText}>AI 추천 여행지</div>
        {canSeeAll && (
          <button type="button" className={styles.moreBtn} onClick={handleSeeAll}>
            더 보기
          </button>
        )}
      </div>

      {filtered.length === 0 ? (
        <div className={styles.empty}>조건에 맞는 관광지가 없어요. 😢</div>
      ) : (
        <div className={styles.grid}>
          {first && (
            <AttRecommendedCard
              key={String(first.id)}
              item={first}
              onClick={handleCardClick}
              reason={first.summary || "AI가 요약할 리뷰가 없습니다."}
            />
          )}
        </div>
      )}
    </section>
  );
}
export default AttRecommendedList;
