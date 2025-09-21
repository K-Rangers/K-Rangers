import React, { useState } from "react";
import styles from "../css/HeroSection.module.css";
import DropdownSelect from "./DropDownSelect";
import useAttractionStore from "../store/AttractionStore"; 
import { REGION_OPTIONS } from "../data/Options";

function HeroSection() {
  const [region, setRegion] = useState(REGION_OPTIONS[0].value); 
  const setDistrictCode = useAttractionStore((s) => s.setDistrictCode);


  const handleSubmit = (e) => {
    e.preventDefault();
    if (!region) return;
    setDistrictCode((typeof region === "string" ? region : region.value) ?? "ALL");
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
