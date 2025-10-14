import React from "react";
import styles from "../../css/CardOption/AccessChips.module.css";
import useAttractionStore from "../../store/AttractionStore"; 
import {CHIPS} from "../../data/Options";

function AccessChips() {
  const features = useAttractionStore((s) => s.features);     
  const toggleFeature = useAttractionStore((s) => s.toggleFeature);

  return (
    <div className={styles.section}>
      <h3 className={styles.title}>맞춤형 관광지 찾기</h3>
      <div className={styles.scroller}>
        {CHIPS.map((c) => {
          const active = features.has(c.key);
          return (
            <button
              key={c.key}
              type="button"
              className={`${styles.chip} ${active ? styles.active : ""}`}
              onClick={() => toggleFeature(c.key)}
            >
              <span className={styles.icon}>{c.icon}</span>
              {c.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default AccessChips;
