import React, { useMemo, useState } from "react";
import HeroSection from "./HeroSection";
import AccessChips from "./AccessChips";
import RecommendedList from "./RecommendedList";
import AllPostView from "./AllPostView";

const ITEMS = [
  {
    id: "daegu-modern-history-museum",
    name: "대구근대역사관",
    district: "jung",
    category: "관광지",
    address: "대구광역시 중구 경상감영길 67",
    phone: "053-606-6432",
    thumbnailUrl: "https://picsum.photos/id/1011/1200/800",
    features: {
      accessible: true,
      parking: false,
      toilet: true,
      elevator: true,
      ramp: true,
      guide: true,
      wheelchairRental: false,
      restaurant: false,
    },
  },
  {
    id: "daegu-modern-history-museum",
    name: "대구근대역사관",
    district: "jung",
    category: "관광지",
    address: "대구광역시 중구 경상감영길 67",
    phone: "053-606-6432",
    thumbnailUrl: "https://picsum.photos/id/1011/1200/800",
    features: {
      accessible: true,
      parking: false,
      toilet: true,
      elevator: true,
      ramp: true,
      guide: true,
      wheelchairRental: false,
      restaurant: false,
    },
  }
];

const FEATURE_KEY_MAP = {
  wheelchair: "accessible",
  parking: "parking",
  toilet: "toilet",
  elevator: "elevator",
  ramp: "ramp",
  info: "guide",
};


function RecommendationsSection() {
  const [district, setDistrict] = useState("");
  const [features, setFeatures] = useState(new Set());

  const toggleFeature = (chipKey) => {
    setFeatures((prev) => {
      const next = new Set(prev);
      next.has(chipKey) ? next.delete(chipKey) : next.add(chipKey);
      return next;
    });
  };

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

  return (
    <section>
      <HeroSection onSubmit={setDistrict} />
      <AccessChips selected={[...features]} onToggle={toggleFeature} />

      <RecommendedList
        items={filteredPreview}                         
        title={district}
      />
    </section>
  );
}

export default RecommendationsSection;