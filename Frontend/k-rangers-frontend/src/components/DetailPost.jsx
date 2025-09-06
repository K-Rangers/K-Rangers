import React from "react";
import styles from "../css/DetailPost.module.css";

function DetailPost({ item }) {
    if (!item) {
        return (
            <div className={styles.container}>
                <div className={styles.empty}>
                    <p>게시물 정보를 불러올 수 없습니다.</p>
                </div>
            </div>
        );
    }

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
        <div className={styles.container}>
            <div className={styles.imageSection}>
                <img
                    src={item.thumbnailUrl}
                    alt={`${item.name} 대표 이미지`}
                    className={styles.mainImage}
                />
                <div className={styles.imageOverlay}>
                    <span className={styles.category}>{item.category}</span>
                    <h1 className={styles.title}>{item.name}</h1>
                </div>
            </div>

            <div className={styles.infoSection}>
                <div className={styles.addressInfo}>
                    <span className={styles.pin} aria-hidden>📍</span>
                    <span className={styles.address}>{item.address}</span>
                </div>
                
                {item.phone && (
                    <div className={styles.phoneInfo}>
                        <span className={styles.phoneIcon} aria-hidden>📞</span>
                        <span className={styles.phone}>{item.phone}</span>
                    </div>
                )}
            </div>

            <div className={styles.accessibilitySection}>
                <h3 className={styles.sectionTitle}>접근성 정보</h3>
                <div className={styles.chips}>
                    {chips.map((chip, index) => (
                        <span key={index} className={styles.chip}>
                            {chip}
                        </span>
                    ))}
                </div>
            </div>

        </div>
    );
}

export default DetailPost;
