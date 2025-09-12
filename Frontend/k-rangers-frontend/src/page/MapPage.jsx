import { useState, useCallback, useEffect } from "react";
import { useLocation } from "react-router-dom";
import styles from "../css/MapPage.module.css";
import Map from "../components/Map";
import BottomNav from "../components/BottomNav";
import BottomSheet from "../components/BottomSheet";
import DetailPost from "../components/DetailPost";
import { getAttractionsByDistrict, getAttractionReviews, getAttractionReviewSummary, getAttractionRatingAvg } from "../api/ApiStore";

function pickLatLng(row) {
  const lat = Number(row?.mapY ?? row?.latitude ?? row?.lat);
  const lng = Number(row?.mapX ?? row?.longitude ?? row?.lng);
  return Number.isFinite(lat) && Number.isFinite(lng) ? { lat, lng } : null;
}

export default function MapPage() {
  const location = useLocation();

  const [selected, setSelected] = useState(null);
  const [open, setOpen] = useState(false);
  const [mapCenter, setMapCenter] = useState({ lat: 35.8683, lng: 128.5988 });
  const [mapLevel, setMapLevel] = useState(5);
  const [allMarkers, setAllMarkers] = useState([]);
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const rows = await getAttractionsByDistrict("ALL");
        const attractionList = Array.isArray(rows) ? rows : [];

        const promises = attractionList.map(async (item) => {
          const reviews = await getAttractionReviews(item.id).catch(() => []);
          const summary = await getAttractionReviewSummary(item.id).catch(() => null);
          const rating = await getAttractionRatingAvg(item.id).catch(() => 0);
          return { ...item, reviews, summary, rating };
        });

        const enhancedAttractionList = await Promise.all(promises);

        const ms = enhancedAttractionList
          .map((r) => {
            const ll = pickLatLng(r);
            if (!ll) return null;
            return {
              lat: ll.lat,
              lng: ll.lng,
              raw: r, 
            };
          })
          .filter(Boolean);
        
        setAllMarkers(ms);

      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  useEffect(() => {
    if (allMarkers.length === 0) return;

    let markerIndex = 0;
    const loadBatch = () => {
      if (markerIndex >= allMarkers.length) return;
      
      const batchSize = 100;
      const nextBatch = allMarkers.slice(markerIndex, markerIndex + batchSize);

      setMarkers(prev => [...prev, ...nextBatch]);
      
      markerIndex += batchSize;
      
      setTimeout(loadBatch, 100); 
    };

    loadBatch();

  }, [allMarkers]);

  const handleMarkerClick = useCallback((m) => {
    setSelected(m?.raw || null);
    setOpen(true);
    if (m?.lat && m?.lng) {
      setMapCenter({ lat: m.lat, lng: m.lng });
      setMapLevel(3);
    }
  }, []);

  useEffect(() => {
    const selectedItem = location.state?.selectedItem;
    if (!selectedItem || !allMarkers.length) return;

    const matching =
      allMarkers.find(
        (mm) => mm.raw?.id && selectedItem.id && mm.raw.id === selectedItem.id
      );
    if (matching) {
      setSelected(matching.raw);
      setOpen(true);
      setMapCenter({ lat: matching.lat, lng: matching.lng });
      setMapLevel(3);
    }
  }, [location.state, allMarkers]);

  return (
    <div className={styles.app}>
      <div className={styles.phone}>
        <div className={styles.mapWrap}>
          <Map
            center={mapCenter}
            level={mapLevel}
            markers={markers}
            onMarkerClick={handleMarkerClick}
          />
        </div>

        <BottomSheet open={open} onClose={() => setOpen(false)}>
          {selected ? (
            <DetailPost item={selected} /> 
          ) : (
            <div className={styles.sheetContent} />
          )}
        </BottomSheet>

        <BottomNav />
      </div>
    </div>
  );
}