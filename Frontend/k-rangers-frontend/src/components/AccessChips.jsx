import React from "react";
import styles from "../css/AccessChips.module.css";

const CHIPS = [
  { key: "facility",           label: "휠체어 접근성",   icon: "♿️" },
  { key: "parking",            label: "장애인 주차구역", icon: "🚗" },
  { key: "restroom",           label: "장애인 화장실",   icon: "🚻" },
  { key: "elevator",           label: "엘리베이터",      icon: "🛗" },
  { key: "lift",               label: "휠체어 리프트",   icon: "🦽" },  
  { key: "ramp",               label: "경사로",          icon: "↗️" },
  { key: "informationCenter",  label: "관광안내소",      icon: "👩‍✈️" },
  { key: "wheelchairRental",   label: "휠체어 대여소",   icon: "🦽" },
  { key: "restaurant",         label: "음식점",          icon: "🍽️" },
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