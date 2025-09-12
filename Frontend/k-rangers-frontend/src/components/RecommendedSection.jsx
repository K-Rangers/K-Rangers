import React, { useState, useEffect, useCallback } from "react";
import HeroSection from "./HeroSection";
import AccessChips from "./AccessChips";
import RecommendedList from "./RecommendedList";
import { RECOMMEND_REASONS } from "../Data/Data";
import { getAttractionsByDistrict } from "../api/ApiStore";

const isOn = (v) => {
  if (typeof v === "boolean") return v;
  if (v == null) return false;
  const s = String(v).trim().toLowerCase();
  return s === "있음" || s === "y";
};

export default function RecommendationsSection() {
  const [districtCode, setDistrictCode] = useState("ALL");
  const [features, setFeatures] = useState(new Set());
  const [items, setItems] = useState([]);

  const handleDistrictSubmit = useCallback((payload) => {
    const code =
      typeof payload === "string" ? payload : (payload?.code || payload?.value || "ALL");
    setDistrictCode(code || "ALL");
  }, []);

  useEffect(() => {
    let alive = true;
    getAttractionsByDistrict(districtCode)
      .then((list) => { if (alive) setItems(Array.isArray(list) ? list : []); })
      .catch(() => { if (alive) setItems([]); });
    return () => { alive = false; };
  }, [districtCode]);

  const toggleFeature = useCallback((key) => {
    setFeatures((prev) => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });
  }, []);

  const filtered =
    features.size === 0
      ? items
      : items.filter((it) => [...features].every((k) => isOn(it[k])));

  return (
    <section>
      <HeroSection onSubmit={handleDistrictSubmit} />
      <AccessChips selected={[...features]} onToggle={toggleFeature} />
      <RecommendedList
        items={filtered}
        reviews={[]}
        reasons={RECOMMEND_REASONS}
      />
    </section>
  );
}
