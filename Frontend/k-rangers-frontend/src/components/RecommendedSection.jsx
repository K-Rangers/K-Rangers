import React, { useMemo, useState, useEffect, useCallback } from "react";
import HeroSection from "./HeroSection";
import AccessChips from "./AccessChips";
import RecommendedList from "./RecommendedList";
import { ITEMS, FEATURE_KEY_MAP, REVIEWS, RECOMMEND_REASONS } from "../Data/Data";                                


function RecommendationsSection({ onFilteredChange }) {
  const [district, setDistrict] = useState("");
  const [features, setFeatures] = useState(new Set());

  const toggleFeature = useCallback((chipKey) => {
    setFeatures((prev) => {
      const next = new Set(prev);
      next.has(chipKey) ? next.delete(chipKey) : next.add(chipKey);
      return next;
    });
  }, []);

  const filteredPreview = useMemo(() => {
    return ITEMS.filter((it) => {
      if (district && it.district !== district) return false;
      if (features.size > 0) {
        for (const chipKey of features) {
          const fKey = FEATURE_KEY_MAP[chipKey];
          if (!it.features?.[fKey]) return false;
        }
      }
      return true;
    });
  }, [district, features]);

  const filteredReviews = useMemo(() => {
  return REVIEWS.filter((r) =>
    filteredPreview.some((item) => item.id === r.placeId)
  );
}, [filteredPreview]);

  useEffect(() => {
    onFilteredChange?.(filteredPreview);
  }, [filteredPreview, onFilteredChange]);

  return (
    <section>
      <HeroSection onSubmit={setDistrict} />
      <AccessChips selected={[...features]} onToggle={toggleFeature} />
      <RecommendedList items={filteredPreview} title={district} reviews={filteredReviews} reasons={RECOMMEND_REASONS}/>
    </section>
  );
}

export default RecommendationsSection;
