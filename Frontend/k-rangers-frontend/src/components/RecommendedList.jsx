import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../css/RecommendedList.module.css";
import RecommendedCard from "./RecommendedCard";
import useAttractionStore from "../store/AttractionStore";
import useAttraction from "../hooks/useAttraction";

const isOn = (v) => {
  if (typeof v === "boolean") return v;
  if (v == null) return false;
  const s = String(v).trim().toLowerCase();
  return s === "있음" ;
};

function RecommendedList() {
  const navigate = useNavigate();
  const districtCode = useAttractionStore((s) => s.districtCode);
  const features = useAttractionStore((s) => s.features);

  const items = useAttraction(districtCode);

  const regioned =
    districtCode === "ALL"
      ? items
      : items.filter((it) => it.district === districtCode);

  const filtered =
    features.size === 0
      ? regioned
      : regioned.filter((it) => [...features].every((k) => isOn(it[k])));

  const title = "AI 추천 여행지";
  const canSeeAll = filtered.length > 1;
  const view = filtered.slice(0, 1);

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
          {view.map((it) => (
            <RecommendedCard
              key={String(it.id)}
              item={it}
              onClick={handleCardClick}
              reason={it.summary || "요약할 리뷰가 없습니다."}
            />
          ))}
        </div>
      )}
    </section>
  );
}
export default RecommendedList;
