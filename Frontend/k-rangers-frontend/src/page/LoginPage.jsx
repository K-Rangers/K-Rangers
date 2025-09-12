// src/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import BottomNav from "../components/BottomNav";
import styles from "../css/Login.module.css";
import logo from "../assets/Mainlogo.png";
import { api } from "../api/ApiStore";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const params = new URLSearchParams(location.search);
  const redirectFromQuery = params.get("redirect");
  const redirectFromState = location.state?.redirectTo;
  const redirectTo = redirectFromQuery || redirectFromState || "/mypage";

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // 1) 로그인 API 호출
      const res = await api.post("/auth/login", { email, password });

      // 2) 토큰 추출 (서버 응답 구조에 맞춰 수정!)
      const token = res.data?.accessToken || res.data?.token;
      if (!token) throw new Error("토큰 없음");

      // 3) 토큰 저장
      localStorage.setItem("accessToken", token);

      // 4) 바로 axios 헤더에도 주입
      api.defaults.headers.Authorization = `Bearer ${token}`;

      // 5) 원래 가려던 곳으로 이동
      navigate(redirectTo, { replace: true });
    } catch (err) {
      console.error(err);
      alert("로그인 실패. 이메일/비밀번호 확인하세요.");
    }
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
              onClick={() => navigate("/signup", { state: { redirectTo } })}
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
