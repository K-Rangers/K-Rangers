import styles from "../css/RecommendedList.module.css";
import RecommendedCard from "./RecommendedCard";

export default function AllView({ items = [], onClose }) {
  return (
    <section className={styles.wrapper}>
      <div className={styles.headerRow}>
        <h2 className={styles.title}>게시물</h2>
        {onClose && (
          <button type="button" className={styles.moreBtn} onClick={onClose}>
            뒤로
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <p>표시할 항목이 없습니다.</p>
      ) : (
        <div className={styles.grid}>
          {items.map((it) => (
            <RecommendedCard key={it.id} item={it} />
          ))}
        </div>
      )}
    </section>
  );
}
