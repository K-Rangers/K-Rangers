import { useMemo, useState, useCallback, useEffect } from "react";
import { useLocation } from "react-router-dom";
import styles from "../css/MapPage.module.css";
import Map from "../components/Map";
import BottomNav from "../components/BottomNav";
import BottomSheet from "../components/BottomSheet";
import DetailPost from "../components/DetailPost";
import { ITEMS } from "../Data/Data";

export default function MapPage() {
  const location = useLocation();
  const NAV_HEIGHT = 70;
  const [selected, setSelected] = useState(null);
  const [open, setOpen] = useState(false);
  const [mapCenter, setMapCenter] = useState({ lat: 35.8714, lng: 128.6014 });
  const [mapLevel, setMapLevel] = useState(7);

  const markers = useMemo(() => {
    return (ITEMS || [])
      .filter(it => it?.coords?.lat && it?.coords?.lng)
      .map(it => ({
        lat: Number(it.coords.lat),
        lng: Number(it.coords.lng),
        title: it.name,
        address: it.address,
        raw: it, 
      }));
  }, []);

  const handleMarkerClick = useCallback((m) => {
    setSelected(m);
    setOpen(true);
    setMapCenter({ lat: m.lat, lng: m.lng });
    setMapLevel(3);
  }, []);

  useEffect(() => {
    const selectedItem = location.state?.selectedItem;
    if (selectedItem) {
      const matchingMarker = markers.find(marker => marker.raw.id === selectedItem.id);
      if (matchingMarker) {
        setSelected(matchingMarker);
        setOpen(true);
        setMapCenter({ lat: matchingMarker.lat, lng: matchingMarker.lng });
        setMapLevel(3);
      }
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

        <BottomSheet
          open={open}
          onClose={() => setOpen(false)}
          bottomOffset={`calc(${NAV_HEIGHT}px + env(safe-area-inset-bottom))`}
          height={500}
        >
          {selected ? (
            <DetailPost item={selected.raw} />
          ) : (
            <div className={styles.sheetContent}>
              마커를 탭하면 상세 정보가 여기에 보여요.
            </div>
          )}
        </BottomSheet>

        <BottomNav />
      </div>
    </div>
  );
}
