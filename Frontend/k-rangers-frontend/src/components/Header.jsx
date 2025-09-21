import styles from "../css/Header.module.css";
import logo from "../assets/Mainlogo.png";
import Chricon from "../assets/chricon.png";

function Header() {
  return (
    <header className={styles.header}>
      
      <div className={styles.top}>
        <a href="/" className={styles.brand}>
          <img src={logo} className={styles.logo} alt="로고" />
        </a>
      </div>

      <div className={styles.hero}>
        <img src={Chricon} className={styles.chrlogo} alt="캐릭터 로고" />
      </div>
    </header>
  );
}

export default Header;
