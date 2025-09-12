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

        // 💥 수정: 리뷰, 요약, 평점 데이터를 한 번에 가져와서 raw 데이터에 포함
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
              raw: r, // raw 데이터에 모든 정보가 담겨 있음
            };
          })
          .filter(Boolean);
        
        setAllMarkers(ms);

      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  // 💥 레이지 로딩 로직 유지: 100개씩 나눠서 지도에 그리기
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
    // 두 번째 find 로직은 이전 코드와 충돌할 수 있어 제거
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
            <DetailPost item={selected} /> // 💥 수정: 모든 정보가 담긴 selected 객체를 그대로 전달
          ) : (
            <div className={styles.sheetContent} />
          )}
        </BottomSheet>

        <BottomNav />
      </div>
    </div>
  );
}