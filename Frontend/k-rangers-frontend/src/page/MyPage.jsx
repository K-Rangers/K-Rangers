import React, { useState } from "react";
import { useNavigate} from "react-router-dom";
import BottomNav from "../components/BottomNav";
import styles from "../css/MyPage.module.css";
import brandAvatar from "../assets/chricon.png";
import { FiTrash2 } from "react-icons/fi";

export default function MyPage({ user }) {
  const navigate = useNavigate();
  const name = user?.name || "계명레인저";
  const email = user?.email || "krangers@example.com";

  const [reviews, setReviews] = useState([
    { id: 1, attractionName: "앞산빨래터공원", content: "정말 볼거리가 많고 유익한 시간이었어요. 아이들과 함께 오기 좋네요." },
    { id: 2, attractionName: "이월드", content: "놀이기구가 다양하고 야경이 멋져요." },
    { id: 3, attractionName: "83타워", content: "전망이 끝내줍니다. 카페도 좋아요." },
  ]);

  const handleDelete = (id) => {
    setReviews((prev) => prev.filter((r) => r.id !== id));
  };

  const goLogin = () => navigate("/login");

  return (
    <div className={styles.app}>
      <div className={styles.phone}>
        <header className={styles.header}>
          <section className={styles.profileRow}>
           <div className={styles.profileRowIcon}>
                <img src={brandAvatar} alt="프로필" className={styles.avatarImg} />
            </div>
            <div className={styles.profileTexts}>
                <p className={styles.profileName}>{name}</p>
                <p className={styles.profileEmail}>{email}</p>
            </div>
          </section>
        </header>

        <main className={styles.content}>
          <h2 className={styles.reviewTitle}>내가 쓴 리뷰</h2>
            <ul className={styles.reviewList}>
    {reviews.map((review) => (
      <li key={review.id} className={styles.reviewItem}>
        <div className={styles.reviewTexts}>
          <p className={styles.reviewPlace}>{review.attractionName}</p>
          <p className={styles.reviewContent}>
            {review.content.length > 30
              ? review.content.slice(0, 30) + "..."
              : review.content}
          </p>
        </div>
        <button
          type="button"
          className={styles.deleteBtn}
          onClick={() => handleDelete(review.id)}
        >
          <FiTrash2 />
        </button>
      </li>
    ))}
  </ul>
          <nav className={`${styles.list} ${styles.logoutSection}`} aria-label="계정 메뉴">
            <button
              type="button"
              className={`${styles.item} ${styles.dangerItem}`}
              onClick={goLogin}
            >
              로그아웃
            </button>
          </nav>
        </main>

        <BottomNav />
      </div>
    </div>
  );
}