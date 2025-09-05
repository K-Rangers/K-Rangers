import React from "react";
import styles from "../css/AccessChips.module.css";

const CHIPS = [
  { key: "wheelchair", label: "휠체어 접근성", icon: "♿️" },
  { key: "parking", label: "주차구역 유무", icon: "🚗" },
  { key: "toilet", label: "장애인 화장실", icon: "🚻" },
  { key: "elevator", label: "엘리베이터", icon: "🛗" },
  { key: "ramp", label: "경사로", icon: "↗️" },
  { key: "info", label: "관광안내소", icon: "👩‍✈️" },
];

 function AccessChips({ selected = [], onToggle }) {
  return (
    <div className={styles.section}>
      <h3 className={styles.title}>맞춤형 관광지 찾기</h3>
      <div className={styles.scroller} role="listbox" aria-label="접근성 필터">
        {CHIPS.map((c) => {
          const active = selected.includes(c.key);
          return (
            <button
              key={c.key}
              type="button"
              className={`${styles.chip} ${active ? styles.active : ""}`}
              onClick={() => onToggle?.(c.key)}
            >
              <span className={styles.icon} aria-hidden="true">{c.icon}</span>
              {c.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default AccessChips;