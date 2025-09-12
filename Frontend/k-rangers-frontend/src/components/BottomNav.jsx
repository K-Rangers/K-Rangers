import { NavLink, useMatch } from "react-router-dom";
import { FiMap, FiHome, FiUser } from "react-icons/fi";
import styles from "../css/BottomNav.module.css";

function BottomNav() {
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