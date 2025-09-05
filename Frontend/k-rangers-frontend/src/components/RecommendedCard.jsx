import React from "react";
import styles from "../css/RecommendedCard.module.css";

function RecommendedCard({ item, onClick }) {
    const f = item.features || {};
    const chips = [
        f.toilet && "장애인 화장실",
        f.elevator && "엘리베이터",
        f.parking && "장애인 주차구역",
        f.accessible && "장애인 이용가능시설",
        f.ramp && "경사로",
        f.guide && "관광안내소",
        f.wheelchairRental && "휠체어 대여소",
        f.restaurant && "음식점"
    ].filter(Boolean);

    return (
        <article
            className={styles.card}
            role="button"
            tabIndex={0}
            onClick={onClick}
            onKeyDown={(e) => e.key === "Enter" && onClick?.()}
        >
            <div className={styles.thumbWrap}>
                <img
                    src={item.thumbnailUrl}
                    alt={`${item.name} 대표 이미지`}
                    className={styles.thumb}
                />
                <span className={styles.category}>{item.category}</span>
                <h3 className={styles.name}>{item.name}</h3>
            </div>

            <div className={styles.meta}>
                <span className={styles.pin} aria-hidden>
                    📍
                </span>
                <span className={styles.address}>{item.address}</span>
            </div>

            <div className={styles.chips}>
                {chips.slice(0, 5).map((c) => (
                    <span key={c} className={styles.chip}>
                        {c}
                    </span>
                ))}
            </div>
        </article>
    );
}

export default RecommendedCard;