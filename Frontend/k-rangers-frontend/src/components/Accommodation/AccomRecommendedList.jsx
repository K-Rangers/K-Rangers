import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../css/Accommodation/AccomRecommendedList.module.css";
import AccomRecommendedCard from "./AccomRecommendedCard";
import useAttractionStore from "../../store/AttractionStore"; 
import useAccommodation from "../../hooks/useAccommodation";
import { filterByFeatures } from "../../utils/FilterByFeatures";

function AccommodationList() {
  const navigate = useNavigate();
  const districtCode = useAttractionStore((s) => s.districtCode);

  const items = useAccommodation(districtCode);
  const filtered = filterByFeatures(items);

  const canSeeAll = filtered.length > 2;
  const displayItems = filtered.slice(0, 10); 

  const handleSeeAll = () => {
    navigate("/all", { state: { items: filtered, mode: 'accommodation' } });
  };

  const handleCardClick = (item) => {
    navigate("/map", { state: { selectedItem: item } });
  };

  return (
    <section className={styles.wrapper}>
      <div className={styles.headerRow}>
        <div className={styles.aiGradientText}>이런 숙박시설은 어때요?</div>
        {canSeeAll && (
          <button type="button" className={styles.moreBtn} onClick={handleSeeAll}>
            더 보기
          </button>
        )}
      </div>

      {filtered.length === 0 ? (
        <div className={styles.empty}>조건에 맞는 숙박이 없어요. 😢</div>
      ) : (
        <div className={styles.scrollContainer}>
          <div className={styles.cardList}>
            {displayItems.map((item) => (
              <AccomRecommendedCard
                key={String(item.id)}
                item={item}
                onClick={handleCardClick}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
export default AccommodationList;
