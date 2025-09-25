import { useState, useCallback, useEffect } from "react";
import { useLocation } from "react-router-dom";
import styles from "../css/MapPage.module.css";
import Map from "../components/Map";
import BottomNav from "../components/BottomNav";
import BottomSheet from "../components/BottomSheet";
import DetailPost from "../components/DetailPost";
import useAttractionStore from "../store/AttractionStore";
import useAttraction from "../hooks/useAttraction";

function MapPage() {
  const location = useLocation();

  const districtCode = useAttractionStore((s) => s.districtCode);
  const items = useAttraction(districtCode);

  const [selected, setSelected] = useState(null); 
  const [open, setOpen] = useState(false); 
  const [mapCenter, setMapCenter] = useState({ lat: 35.8683, lng: 128.5988 });
  const [mapLevel, setMapLevel] = useState(5); 
  const [markers, setMarkers] = useState([]); 

  useEffect(() => {
    if (!items.length) return;

    const ms = items
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
  }, [items]);

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

    const matching = markers.find(
      (mm) => mm.raw?.id && selectedItem.id && mm.raw.id === selectedItem.id
    );

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