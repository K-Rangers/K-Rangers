import React from "react";
import { useNavigate } from "react-router-dom";
import BottomNav from "../components/BottomNav";
import styles from "../css/PageCss/MyPage.module.css";
import brandAvatar from "../assets/chricon.png";

function MyPage() {
  const navigate = useNavigate();

  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  const name = user?.name || "계명레인저";
  const email = user?.email || "krangers@example.com";

  const goLogin = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    navigate("/login");
  };

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

export default MyPage;
