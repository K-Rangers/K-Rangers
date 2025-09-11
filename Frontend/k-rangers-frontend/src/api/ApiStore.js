import axios from "axios";

const api = axios.create({
  baseURL: "https://travel.gamja.cloud", 
  headers: { Accept: "application/json" },
  timeout: 10000,
});

const DISTRICT_MAP = {
  jung: "JUNG_GU",
  dong: "DONG_GU",
  seo: "SEO_GU",
  nam: "NAM_GU",
  buk: "BUK_GU",
  suseong: "SUSEONG_GU",
  dalseo: "DALSEO_GU",
  dalseong: "DALSEONG_GUN",
  chilgok: "CHILGOK",
};

const yes = (v) => {
  if (v === true || v === 1) return true;
  if (typeof v === "number") return v > 0;
  const s = String(v ?? "").trim().toLowerCase();
  if (["n", "no", "false", "0", "x", "없음", "불가"].includes(s)) return false;
  return ["y", "yes", "true", "1", "o", "ok", "가능", "있음"].includes(s);
};

const normalizeCategory = (c) => {
  const key = String(c || "").toLowerCase();
  const map = {
    park: "공원",
    museum: "박물관",
    art: "미술관",
    market: "시장",
    themepark: "테마파크",
    observationdeck: "전망대",
    shopping: "쇼핑/거리",
    lake: "호수/공원",
  };
  return map[key] || c || "관광지";
};

// 백엔드 → 프론트 모델
const mapAttraction = (raw) => ({
  id: String(raw.id),
  name: raw.name,
  address: raw.address,
  category: normalizeCategory(raw.category),
  thumbnailUrl: raw.thumbnailUrl || raw.imageUrl || raw.thumbnail || null,
  coords:
    raw.latitude != null && raw.longitude != null
      ? { lat: Number(raw.latitude), lng: Number(raw.longitude) }
      : raw.lat != null && raw.lng != null
      ? { lat: Number(raw.lat), lng: Number(raw.lng) }
      : null,
  features: {
    elevator: yes(raw.elevator) || yes(raw.lift),
    parking: yes(raw.parking),
    accessible: yes(raw.facility),           // facility → accessible
    ramp: yes(raw.ramp),
    guide: yes(raw.informationCenter),       // informationCenter → guide
    toilet: yes(raw.restroom),               // restroom → toilet
    wheelchairRental: yes(raw.wheelchairRental),
    restaurant: yes(raw.restaurant),
  },
  meta: {
    tableType: raw.tableType || null,
    lift: raw.lift ?? null,
  },
});

export async function getAttractionsByDistrict(districtLike) {
  const key = String(districtLike || "").toLowerCase();
  const district = DISTRICT_MAP[key] || String(districtLike).toUpperCase();
  const { data } = await api.get(
    `/v1/main/user/attractions/by_district/${district}`
  );
  return Array.isArray(data) ? data.map(mapAttraction) : [];
}

const ApiStore = { getAttractionsByDistrict };
export default ApiStore;
