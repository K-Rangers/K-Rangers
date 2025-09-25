import { Map, MapMarker } from "react-kakao-maps-sdk";
import styles from "../css/Map.module.css";

function KakaoMap({
  center,
  level,
  markers = [],
  onMarkerClick,
}) {
  return (
    <div className={styles.kakaoMapRoot}>
      <Map
        center={center}
        level={level}
        className={styles.kakaoMap}   
      >
        {markers.map((m) => (
          <MapMarker
            key={m.raw?.id}
            position={{ lat: m.lat, lng: m.lng }}
            onClick={() => onMarkerClick?.(m)}
          >
          </MapMarker>
        ))}
      </Map>
    </div>
  );
}

export default KakaoMap;