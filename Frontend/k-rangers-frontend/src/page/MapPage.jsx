import { useState, useCallback, useEffect } from "react";
import { useLocation } from "react-router-dom";
import styles from "../css/PageCss/MapPage.module.css";
import Map from "../components/Map";
import BottomNav from "../components/BottomNav";
import BottomSheet from "../components/BottomSheet";
import DetailPost from "../components/CardOption/DetailPost";
import useAttractionStore from "../store/AttractionStore";
import useAttraction from "../hooks/useAttraction";
import useAccommodation from "../hooks/useAccommodation";

function MapPage() {
  const location = useLocation();

  const districtCode = useAttractionStore((s) => s.districtCode);
  const attractions = useAttraction(districtCode);
  const accommodations = useAccommodation(districtCode);

  const [selected, setSelected] = useState(null); 
  const [open, setOpen] = useState(false); 
  const [mapCenter, setMapCenter] = useState({ lat: 35.8683, lng: 128.5988 });
  const [mapLevel, setMapLevel] = useState(5); 
  const [markers, setMarkers] = useState([]);
  const [filterType, setFilterType] = useState('all'); 

  useEffect(() => {
    const allItems = [...attractions, ...accommodations];
    if (!allItems.length) return;

    let filteredItems = allItems;
    if (filterType === 'accommodation') {
      filteredItems = accommodations;
    } else if (filterType === 'attraction') {
      filteredItems = attractions;
    }

    const ms = filteredItems
      .map((r) => {
        if (!r) return null;
        return {
          lat: r.latitude,
          lng: r.longitude,
          raw: r,
        };
      })
      .filter(Boolean);

    setMarkers(ms);
  }, [attractions, accommodations, filterType]);

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
    if (!selectedItem || !markers.length) return;

    const matching = markers.find((mm) => {
      if (!mm.raw?.id || !selectedItem.id) return false;
      if (mm.raw.id !== selectedItem.id) return false;
      
      return mm.raw.type === selectedItem.type;
    });

    if (matching) {
      setSelected(matching.raw);
      setOpen(true);
      setMapCenter({ lat: matching.lat, lng: matching.lng });
      setMapLevel(3);
    }
  }, [location.state, markers]);

  return (
    <div className={styles.app}>
      <div className={styles.phone}>
        <div className={styles.mapWrap}>
          <div className={styles.filterTabs}>
            <button 
              className={`${styles.filterTab} ${filterType === 'all' ? styles.active : ''}`}
              onClick={() => setFilterType('all')}
            >
              전체
            </button>
            <button 
              className={`${styles.filterTab} ${filterType === 'accommodation' ? styles.active : ''}`}
              onClick={() => setFilterType('accommodation')}
            >
              숙소
            </button>
            <button 
              className={`${styles.filterTab} ${filterType === 'attraction' ? styles.active : ''}`}
              onClick={() => setFilterType('attraction')}
            >
              여행지
            </button>
          </div>
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

export default MapPage;