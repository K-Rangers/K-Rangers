import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import BottomNav from "../components/BottomNav";
import styles from "../css/Login.module.css";
import logo from "../assets/Mainlogo.png";
import { login } from "../api/ApiStore.js";

function getStoredToken() {
  const keys = ["accessToken"];
  for (const k of keys) {
    const v = localStorage.getItem(k) || sessionStorage.getItem(k);
    if (v) return v;
  }
  return null;
}

function isJwtExpired(token) {
  try {
    const [, payload] = token.split(".");
    if (!payload) return true;
    const b64 = payload.replace(/-/g, "+").replace(/_/g, "/");
    const json = JSON.parse(atob(b64));
    if (!json.exp) return false;
    const nowSec = Math.floor(Date.now() / 1000);
    return json.exp <= nowSec;
  } catch {
    return true;
  } 
}

function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const redirectTo = (() => {
    const sp = new URLSearchParams(location.search);
    return location.state?.redirectTo || sp.get("redirect") || "/mypage";
  })();

  const [booting, setBooting] = useState(true);

  useEffect(() => {
    const token = getStoredToken();
    if (token && !isJwtExpired(token)) {
      navigate(redirectTo, { replace: true });
      return;
    }
    setBooting(false);
  }, [navigate, redirectTo]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setErrorMsg("");
    setIsSubmitting(true);
    try {
      await login(email.trim(), password);
      navigate(redirectTo, { replace: true });
    } catch (err) {
  const msg =
    err?.response?.data && typeof err.response.data === "string"
      ? err.response.data
      : "로그인에 실패했어요. 이메일/비밀번호를 확인해 주세요.";
    setErrorMsg(msg);
  } finally {
    setIsSubmitting(false);
  }
  };

  if (booting) return null;

  return (
    <div className={styles.app}>
      <div className={styles.phone}>
        <main className={styles.content}>
          <p className={styles.slogan}>
            <img src={logo} alt="Travel Aiga 로고" className={styles.logo} />
            여행의 새로운 시작, Travel Aiga와 함께!
          </p>

          <form className={styles.form} onSubmit={handleSubmit} noValidate>
            <div className={styles.inputGroup}>
              <input
                type="email"
                className={styles.inputField}
                placeholder="이메일"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
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
                autoComplete="current-password"
                required
              />
            </div>

            {errorMsg && (
              <p className={styles.error}>
                {errorMsg}
              </p>
            )}

            <div className={styles.actions}>
              <button
                type="submit"
                className={styles.btnPrimary}
                disabled={isSubmitting}
              >
                {isSubmitting ? "로그인 중..." : "로그인"}
              </button>
            </div>
          </form>

          <p className={styles.signupText}>
            아이디가 없으신가요?{" "}
            <span
              className={styles.signupLink}
              role="button"
              tabIndex={0}
              onClick={() => navigate("/signup", { state: { redirectTo } })}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  navigate("/signup", { state: { redirectTo } });
                }
              }}
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

export default LoginPage;
