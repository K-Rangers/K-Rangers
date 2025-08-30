import styles from "../css/Header.module.css";
import logo from "../assets/Mainlogo.png";
function Header() {
  return (
    <div className={styles.header}>
      <a href="/" className={styles.brand} aria-label="Travel Alga 홈">
              <img src={logo} className={styles.logo} alt="로고" />
      </a>
    </div>
  );
}
export default Header;