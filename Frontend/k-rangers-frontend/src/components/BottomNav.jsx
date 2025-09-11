import { NavLink, useMatch } from "react-router-dom";
import { FiMap, FiHome, FiUser } from "react-icons/fi";
import styles from "../css/BottomNav.module.css";

function BottomNav() {
  // ✅ /login, /signin, /signup, /mypage(하위 경로 포함)에서 활성 처리
  const matchLogin  = useMatch("/login");
  const matchSignin = useMatch("/signin");
  const matchSignup = useMatch("/signup");
  const matchMyPage = useMatch("/mypage/*");
  const isAccountActive = !!(matchLogin || matchSignin || matchSignup || matchMyPage);

  return (
    <nav className={styles.bottomNav}>
      <NavLink
        to="/map"
        className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ""}`}
      >
        <FiMap className={styles.icon} />
        <span className={styles.label}>지도</span>
      </NavLink>

      <NavLink
        to="/"
        end
        className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ""}`}
      >
        <FiHome className={styles.icon} />
        <span className={styles.label}>홈</span>
      </NavLink>

      {/* ✅ /signup에서도 파란색 활성화 */}
      <NavLink
        to="/login"
        className={() => `${styles.navItem} ${isAccountActive ? styles.active : ""}`}
      >
        <FiUser className={styles.icon} />
        <span className={styles.label}>내정보</span>
      </NavLink>
    </nav>
  );
}

export default BottomNav;