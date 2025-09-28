import { useState, useEffect } from "react";
import { 
  getAccommodationByDistrict,
  getAccommodationReviews,
  getAccommodationRating
} from "../api/ApiStore";

function useAccommodation(districtCode) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    let alive = true;

    const fetchData = async () => {
      try {
        const accommodations = await getAccommodationByDistrict(districtCode);
        const list = Array.isArray(accommodations) ? accommodations : [];

        const promises = list.map(async (item) => {
          const reviews = await getAccommodationReviews(item.id).catch(() => []);
          const rating = await getAccommodationRating(item.id).catch(() => 0);
          return { ...item, reviews, rating, type: 'accommodation' };
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

export default useAccommodation;
