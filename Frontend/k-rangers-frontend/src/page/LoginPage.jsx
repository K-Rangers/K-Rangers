import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BottomNav from "../components/BottomNav";
import styles from "../css/Login.module.css";
import logo from "../assets/Mainlogo.png";
import { BiSolidUserCircle } from "react-icons/bi";

export default function MyPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/login");
  };

  return (
    <div className={styles.app}>
      <div className={styles.phone}>
        <header className={styles.header}>
          <img src={logo} alt="Travel Aiga 로고" className={styles.logo} />
        </header>
        <main className={styles.content}>
         <section className={styles.card}>
          <div className={styles.avatarWrap}>
            <BiSolidUserCircle size={120} color="#9CA3AF" />
          </div>
          <h2 className={styles.title}>로그인이 필요합니다</h2>
          <p className={styles.subtext}>
            로그인하고 맞춤 서비스를 이용해보세요
          </p>
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.inputGroup}>
                <input
                  type="email"
                  className={styles.inputField}
                  placeholder="이메일"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className={styles.inputGroup}>
                <input
                  type="password"
                  className={styles.inputField}
                  placeholder="비밀번호"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className={styles.actions}>
                <button type="submit" className={styles.btnPrimary}>
                  로그인
                </button>
                <button
                  type="button"
                  className={styles.btnOutline}
                  onClick={() => navigate("/signup")}
                >
                  회원가입
                </button>
              </div>
            </form>
          </section>
        </main>
        <BottomNav />
      </div>
    </div>
  );
}