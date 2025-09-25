import { useState, useEffect } from "react";
import { getAttractionsByDistrict,getAttractionReviews,getAttractionReviewSummary, getAttractionRatingAvg, } from "../api/ApiStore";

function useAttraction(districtCode) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    let alive = true;

    const fetchData = async () => {
      try {
        const attractions = await getAttractionsByDistrict(districtCode);
        const list = Array.isArray(attractions) ? attractions : [];

        const promises = list.map(async (item) => {
          const reviews = await getAttractionReviews(item.id).catch(() => []);
          const summary = await getAttractionReviewSummary(item.id).catch(() => null);
          const rating = await getAttractionRatingAvg(item.id).catch(() => 0)
          return { ...item, reviews, summary, rating };
        });

        const enhanced = await Promise.all(promises);
        if (alive) setItems(enhanced);
      } catch (e) {
        if (alive) setItems([]);
      }
    };

    fetchData();

    return () => {
      alive = false;
    };
  }, [districtCode]);
  
  return items;
}




export default useAttraction;