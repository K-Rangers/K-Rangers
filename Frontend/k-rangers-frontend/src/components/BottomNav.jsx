import { NavLink } from "react-router-dom";
import { FiMap, FiHome, FiUser} from "react-icons/fi";
import styles from "../css/BottomNav.module.css";

function BottomNav() {
  return (
    <nav className={styles.bottomNav}>
      <NavLink to="/map"
        className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ""}`
        }
      >
        <FiMap className={styles.icon} />
        <span className={styles.label}>지도</span>
      </NavLink>

      <NavLink to="/"
        end
        className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ""}`
        }
      >
        <FiHome className={styles.icon} />
        <span className={styles.label}>홈</span>
      </NavLink>
      
      <NavLink
        to="/mypage"
        className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ""}`}
      >
        <FiUser className={styles.icon} />
        <span className={styles.label}>내정보</span>
      </NavLink>
    </nav>
  );
}
export default BottomNav;