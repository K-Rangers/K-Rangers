import { useState, useCallback, useEffect } from "react";
import { useLocation } from "react-router-dom";
import styles from "../css/MapPage.module.css";
import Map from "../components/Map";
import BottomNav from "../components/BottomNav";
import BottomSheet from "../components/BottomSheet";
import DetailPost from "../components/DetailPost";
import { getAttractionsByDistrict } from "../api/ApiStore";

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
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const rows = await getAttractionsByDistrict("ALL");
        const ms = (Array.isArray(rows) ? rows : [])
          .map((r) => {
            const ll = pickLatLng(r);
            if (!ll) return null;
            return {
              lat: ll.lat,
              lng: ll.lng,
              // title: r.name || r.title || "장소",
              // address: r.address || "",
              raw: r,
            };
          })
          .filter(Boolean);

        setMarkers(ms);
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

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

    const matching =
      markers.find(
        (mm) => mm.raw?.id && selectedItem.id && mm.raw.id === selectedItem.id
      ) ||
      markers.find(
        (mm) =>
          mm.title === selectedItem.name && mm.address === selectedItem.address
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
