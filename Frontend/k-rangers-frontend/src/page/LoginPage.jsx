import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BottomNav from "../components/BottomNav";
import styles from "../css/Login.module.css";
import logo from "../assets/Mainlogo.png";

function MyPage() {
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
        <main className={styles.content}>

          <p className={styles.slogan}>
            <img src={logo} alt="Travel Aiga 로고" className={styles.logo} />
            여행의 새로운 시작, Travel Aiga와 함께!
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
            </div>
          </form>

          <p className={styles.signupText}>
            아이디가 없으신가요?{" "}
            <span
              className={styles.signupLink}
              onClick={() => navigate("/signup")}
            >
              회원가입
            </span>
          </p>
        </main>
        <BottomNav />
      </div>
      
    </div>
    
  );
}
export default MyPage;