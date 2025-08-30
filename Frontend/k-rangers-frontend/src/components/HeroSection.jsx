import { useState } from "react";
import styles from "../css/HeroSection.module.css";
import DropdownSelect from "./DropDownSelect";

const REGION_OPTIONS = [
  { value: "jung", label: "중구" },
  { value: "dalseo", label: "달서구" },
  { value: "seo", label: "서구" },
  { value: "buk", label: "북구" },
  { value: "dong", label: "동구" },
  { value: "nam", label: "남구" },
  { value: "suseong", label: "수성구" },
];


function HeroSection({ onSubmit }) {
  const [region, setRegion] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!region) return;
    onSubmit(region);
  };

  return (
    <section className={styles.hero}>
      <h1 className={styles.title}>모두를 위한 여행</h1>
      <p className={styles.subtitle}>
        접근성이 보장된 관광지를 찾아<br />
        자유롭고 안전한 여행을 시작하세요
      </p>

      <form className={styles.searchCard} onSubmit={handleSubmit}>
        <DropdownSelect
          name="region"
          placeholder="어디로 여행을 떠나고 싶으신가요?"
          options={REGION_OPTIONS}
          value={region}
          onChange={setRegion}
        />
        <button className={styles.button} type="submit" disabled={!region}>
          찾기
        </button>
      </form>
    </section>
  );
}
export default HeroSection;