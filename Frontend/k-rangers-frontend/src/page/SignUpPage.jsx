import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import styles from "../css/PageCss/SignUpPage.module.css";
import BottomNav from "../components/BottomNav";
import logo from "../assets/Mainlogo.png";
import { signup } from "../api/ApiStore";

function SignUpPage({ onDone }) {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid, isSubmitting },
    setError,
    clearErrors,
  } = useForm({ mode: "onChange" });

  const password = watch("password", "");

  const onSubmit = async (data) => {
    try {
      clearErrors("root");
      const { name, email, password } = data;
      await signup({ name, email, password });

      if (onDone) onDone();
      else navigate("/login", { replace: true });
    } catch (e) {
  const status = e.response?.status;

  if (status === 400) {
    setError("email", { message: "올바른 이메일 형식이 아닙니다." });
  } else if (status === 409 || status === 403) {
    setError("email", { message: "이미 가입된 이메일입니다." });
  } else {
    setError("root", { message: "회원가입 중 오류가 발생했습니다." });
  }
}
  };

  return (
    <div className={styles.app}>
      <div className={styles.phone}>
        <div className={styles.header}>
          <img src={logo} alt="앱 로고" className={styles.logo} />
        </div>

        <form className={styles.formBox} onSubmit={handleSubmit(onSubmit)} noValidate>
          <label className={styles.label} htmlFor="name">이름</label>
          <input
            id="name"
            type="text"
            className={styles.input}
            placeholder="이름을 입력하세요"
            autoComplete="name"
            {...register("name", {
              required: "이름을 입력하세요.",
              minLength: { value: 2, message: "이름은 2자 이상이어야 합니다." },
              maxLength: { value: 20, message: "이름은 20자 이하여야 합니다." },
              pattern: { value: /^[A-Za-z가-힣\s]+$/, message: "이름은 한글/영문만 입력하세요." }
            })}
          />
          {errors.name && <span className={styles.errorText}>{errors.name.message}</span>}

          <label className={styles.label} htmlFor="email">이메일</label>
          <input
            id="email"
            type="email"
            className={styles.input}
            placeholder="example@store.com"
            autoComplete="email"
            inputMode="email"
            {...register("email", {
              required: "이메일을 입력하세요.",
              pattern: { value: /^\S+@\S+\.\S+$/, message: "올바른 이메일 형식이 아닙니다." }
            })}
          />
          {errors.email && <span className={styles.errorText}>{errors.email.message}</span>}

          <label className={styles.label} htmlFor="password">비밀번호</label>
          <input
            id="password"
            type="password"
            className={styles.input}
            placeholder="비밀번호를 입력하세요"
            autoComplete="new-password"
            {...register("password", {
              required: "비밀번호를 입력하세요.",
              pattern: {
                value: /^(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/,
                message: "비밀번호는 특수문자를 포함하고 8자 이상이어야 합니다."
              }
            })}
          />
          {errors.password && <span className={styles.errorText}>{errors.password.message}</span>}

          <label className={styles.label} htmlFor="confirmPassword">비밀번호 확인</label>
          <input
            id="confirmPassword"
            type="password"
            className={styles.input}
            placeholder="비밀번호를 다시 입력하세요"
            autoComplete="new-password"
            {...register("confirmPassword", {
              required: "비밀번호 확인을 입력하세요.",
              validate: v => v === password || "비밀번호가 일치하지 않습니다."
            })}
          />
          {errors.confirmPassword && (
            <span className={styles.errorText}>{errors.confirmPassword.message}</span>
          )}
          {errors.root && (
            <div className={styles.errorBanner} role="alert" aria-live="assertive">
              {errors.root.message}
            </div>
          )}

          <button className={styles.button} type="submit" disabled={!isValid || isSubmitting}>
            {isSubmitting ? "처리 중..." : "가입하기"}
          </button>

          <p className={styles.helper}>
            이미 계정이 있나요?{" "}
            <button
              type="button"
              className={styles.linkBtn}
              onClick={() => (onDone ? onDone() : navigate("/login"))}
            >
              로그인
            </button>
          </p>
        </form>
        <BottomNav />
      </div>
    </div>
  );
}

export default SignUpPage;