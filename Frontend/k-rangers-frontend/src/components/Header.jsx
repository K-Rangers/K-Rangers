import styles from "../css/Header.module.css";

function Header() {
  return (
    <div className={styles.header}>
      <a href="/" className={styles.brand} aria-label="Travel Alga 홈">
        <div className={styles.word}>Travel,&nbsp;AIga?</div>
      </a>
    </div>
  );
}
export default Header;