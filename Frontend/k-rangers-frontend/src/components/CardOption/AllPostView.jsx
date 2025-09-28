import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "../../css/CardOption/AllPostView.module.css";
import AttRecommendedCard from "../Attraction/AttRecommendedCard";
import AllPostAccomCard from "../Accommodation/AllPostAccomCard";
import { MdArrowBack } from "react-icons/md";


function AllView({ onClose }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { items = [], mode = "attraction" } = location.state || {};

  const handleCardClick = (item) => {
    navigate("/map", { state: { selectedItem: item } });
  };

  return (
    <section className={styles.wrapper}>
      <div className={styles.headerRow}>
        {onClose ? (
          <span className={styles.moreBtn} onClick={onClose}>
            <MdArrowBack size={18} />
          </span>
        ) : (
          <span />
        )}

        <h2 className={styles.title}>
          {mode === "accommodation" ? "이런 숙박시설은 어때요?" : "AI 추천 여행지"}
        </h2>
      </div>

      <div className={styles.scrollArea}>
        {items.length === 0 ? (
          <div className={styles.empty}>
            {mode === "accommodation"
              ? "조건에 맞는 숙박이 없어요. 😢"
              : "조건에 맞는 관광지가 없어요. 😢"}
          </div>
        ) : (
          <div className={styles.grid}>
            {items.map((it) =>
              mode === "accommodation" ? (
                <AllPostAccomCard
                  key={it.id}
                  item={it}
                  onClick={() => handleCardClick(it)}
                />
              ) : (
                <AttRecommendedCard
                  key={it.id}
                  item={it}
                  onClick={() => handleCardClick(it)}
                  reviews={it.reviews}
                  rating={it.rating}
                  reason={it.summary || "요약할 리뷰가 없습니다."}
                />
              )
            )}
          </div>
        )}
      </div>
    </section>
  );
}

export default AllView;
