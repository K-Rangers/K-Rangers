import { useEffect, useRef, useState } from "react";
import styles from "../css/Map.module.css";

const KAKAO_JS_KEY = "1977884cfe27f35a9276beec0e35952d";

function loadKakaoSdk() {
  return new Promise((resolve, reject) => {
    if (!KAKAO_JS_KEY) return reject(new Error("Kakao JS key missing"));
    if (window.kakao?.maps) {
      window.kakao.maps.load(() => resolve(window.kakao));
      return;
    }
    const id = "kakao-map-sdk";
    const exist = document.getElementById(id);
    if (exist) {
      exist.addEventListener("load", () => window.kakao.maps.load(() => resolve(window.kakao)));
      exist.addEventListener("error", reject);
      return;
    }
    const s = document.createElement("script");
    s.id = id;
    s.async = true;
    s.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_JS_KEY}&autoload=false`;
    s.onload = () => window.kakao.maps.load(() => resolve(window.kakao));
    s.onerror = reject;
    document.head.appendChild(s);
  });
}

export default function Map({
  center = { lat: 35.8714, lng: 128.6014 },
  level = 7,
  markers = [],
  onMarkerClick,
}) {
  const mapEl = useRef(null);
  const mapRef = useRef(null);
  const markerRefs = useRef([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let mounted = true;
    loadKakaoSdk()
      .then((kakao) => {
        if (!mounted) return;
        const map = new kakao.maps.Map(
          mapEl.current,
          { center: new kakao.maps.LatLng(center.lat, center.lng), level }
        );
        mapRef.current = map;
        setReady(true);
      })
      .catch((e) => console.error("[KakaoMap] SDK load failed:", e));
    return () => { mounted = false; };
  }, []);

  useEffect(() => {
    if (!ready) return;
    const { kakao } = window;
    const map = mapRef.current;
    if (!map || !kakao?.maps) return;
    map.setLevel(level);
    map.setCenter(new kakao.maps.LatLng(center.lat, center.lng));
  }, [ready, center.lat, center.lng, level]);

  useEffect(() => {
    if (!ready) return;
    const { kakao } = window;
    const map = mapRef.current;
    if (!map || !kakao?.maps) return;

    markerRefs.current.forEach((m) => m.setMap(null));
    markerRefs.current = [];

    if (!markers.length) return;

    markers.forEach((mData) => {
      const lat = Number(mData.lat);
      const lng = Number(mData.lng);
      if (Number.isNaN(lat) || Number.isNaN(lng)) return;

      const pos = new kakao.maps.LatLng(lat, lng);
      const marker = new kakao.maps.Marker({ position: pos, map, title: mData.title });
      markerRefs.current.push(marker);

      kakao.maps.event.addListener(marker, "click", () => {
        map.setLevel(3);
        map.setCenter(new kakao.maps.LatLng(lat, lng));
        onMarkerClick?.(mData); 
      });
    });
  }, [ready, markers, onMarkerClick]);

  return <div ref={mapEl} className={styles.mapRoot} />;
}
