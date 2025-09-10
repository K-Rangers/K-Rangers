export const ITEMS = [
  {
    id: "daegu-modern-history-museum",
    name: "대구근대역사관",
    district: "jung",
    category: "박물관",
    address: "대구광역시 중구 경상감영길 67",
    phone: "053-606-6432",
    thumbnailUrl: "https://picsum.photos/id/1011/1200/800",
    coords: { lat: 35.8695, lng: 128.5940 },
    features: {
      accessible: true, parking: false, toilet: true, elevator: true,
      ramp: true, guide: true, wheelchairRental: false, restaurant: false,
    },
  },
  {
    id: "seomun-market",
    name: "서문시장",
    district: "seo",
    category: "시장",
    address: "대구광역시 서구 달서천로 2길",
    phone: "",
    thumbnailUrl: "https://picsum.photos/id/1015/1200/800",
    coords: { lat: 35.8700, lng: 128.5800 },
    features: {
      accessible: true, parking: true, toilet: true, elevator: false,
      ramp: true, guide: false, wheelchairRental: false, restaurant: true,
    },
  },
  {
    id: "daegu-art-museum",
    name: "대구미술관",
    district: "suseong",
    category: "미술관",
    address: "대구광역시 수성구 미술관로 40",
    phone: "",
    thumbnailUrl: "https://picsum.photos/id/1025/1200/800",
    coords: { lat: 35.8298, lng: 128.6950 },
    features: {
      accessible: true, parking: true, toilet: true, elevator: true,
      ramp: true, guide: true, wheelchairRental: false, restaurant: false,
    },
  },
  {
    id: "suseong-lake",
    name: "수성못",
    district: "suseong",
    category: "호수/공원",
    address: "대구광역시 수성구 두산동 일대",
    phone: "",
    thumbnailUrl: "https://picsum.photos/id/1035/1200/800",
    coords: { lat: 35.8313, lng: 128.7085 },
    features: {
      accessible: true, parking: true, toilet: true, elevator: false,
      ramp: true, guide: false, wheelchairRental: false, restaurant: true,
    },
  },
  {
    id: "eworld",
    name: "이월드",
    district: "dalseo",
    category: "테마파크",
    address: "대구광역시 달서구 두류공원로 200",
    phone: "",
    thumbnailUrl: "https://picsum.photos/id/1043/1200/800",
    coords: { lat: 35.8534, lng: 128.5668 },
    features: {
      accessible: true, parking: true, toilet: true, elevator: true,
      ramp: true, guide: true, wheelchairRental: true, restaurant: true,
    },
  },
  {
    id: "eighty-three-tower",
    name: "83타워",
    district: "dalseo",
    category: "전망대",
    address: "대구광역시 달서구 두류공원로 200",
    phone: "",
    thumbnailUrl: "https://picsum.photos/id/1050/1200/800",
    coords: { lat: 35.8530, lng: 128.5643 },
    features: {
      accessible: true, parking: true, toilet: true, elevator: true,
      ramp: true, guide: true, wheelchairRental: false, restaurant: true,
    },
  },
  {
    id: "daegu-national-museum",
    name: "국립대구박물관",
    district: "suseong",
    category: "박물관",
    address: "대구광역시 수성구 황금동 70",
    phone: "",
    thumbnailUrl: "https://picsum.photos/id/1062/1200/800",
    coords: { lat: 35.8291, lng: 128.6191 },
    features: {
      accessible: true, parking: true, toilet: true, elevator: true,
      ramp: true, guide: true, wheelchairRental: false, restaurant: false,
    },
  },
  {
    id: "duryu-park",
    name: "두류공원",
    district: "dalseo",
    category: "공원",
    address: "대구광역시 달서구 공원순환로 일대",
    phone: "",
    thumbnailUrl: "https://picsum.photos/id/1074/1200/800",
    coords: { lat: 35.8488, lng: 128.5576 },
    features: {
      accessible: true, parking: true, toilet: true, elevator: false,
      ramp: true, guide: false, wheelchairRental: false, restaurant: true,
    },
  },
  {
    id: "dongseongno",
    name: "동성로",
    district: "jung",
    category: "쇼핑/거리",
    address: "대구광역시 중구 동성로 일대",
    phone: "",
    thumbnailUrl: "https://picsum.photos/id/1084/1200/800",
    coords: { lat: 35.8697, lng: 128.5952 },
    features: {
      accessible: true, parking: false, toilet: true, elevator: false,
      ramp: true, guide: false, wheelchairRental: false, restaurant: true,
    },
  },
  {
    id: "palgongsan-cablecar",
    name: "팔공산 케이블카",
    district: "dong",
    category: "자연/레저",
    address: "대구광역시 동구 팔공산로 일대",
    phone: "",
    thumbnailUrl: "https://picsum.photos/id/109/1200/800",
    coords: { lat: 35.9900, lng: 128.6900 },
    features: {
      accessible: true, parking: true, toilet: true, elevator: false,
      ramp: true, guide: true, wheelchairRental: false, restaurant: false,
    },
  },
];

export const FEATURE_KEY_MAP = {
  wheelchair: "accessible",
  parking: "parking",
  toilet: "toilet",
  elevator: "elevator",
  ramp: "ramp",
  info: "guide",
};

export const REVIEWS = [
  {
    placeId: "daegu-modern-history-museum",
    nickname: "문화러버",
    rating: 4.5,
    content: "전시 내용이 알차고 직원 분들도 친절했어요. 건물이 약간 오래됐지만 분위기 있음!",
    createdAt: "2025-09-01",
  },
  {
    placeId: "daegu-modern-history-museum",
    nickname: "문화러버",
    rating: 1.5,
    content: "전시 내용이 알차고 직원 분들도 친절했어요. 건물이 약간 오래됐지만 분위기 있음!",
    createdAt: "2025-09-02",
  },
  {
    placeId: "daegu-modern-history-museum",
    nickname: "문화러버",
    rating: 2.5,
    content: "전시 내용이 알차고 직원 분들도 친절했어요. 건물이 약간 오래됐지만 분위기 있음!",
    createdAt: "2025-09-03",
  },
  {
    placeId: "seomun-market",
    nickname: "시장골목매니아",
    rating: 4.0,
    content: "먹을 게 정말 많고 접근성도 좋았어요. 다만 화장실이 좀 불편했어요.",
    createdAt: "2025-09-03",
  },
  {
    placeId: "daegu-art-museum",
    nickname: "예술을찾아서",
    rating: 5.0,
    content: "대구에 이런 미술관이 있다는 게 자랑스럽습니다. 아이랑 함께 가기 좋아요.",
    createdAt: "2025-09-05",
  },
  {
    placeId: "suseong-lake",
    nickname: "산책러",
    rating: 4.7,
    content: "야경이 너무 예뻐요. 산책로도 잘 정비되어 있어서 휠체어도 문제없습니다.",
    createdAt: "2025-09-07",
  },
  {
    placeId: "eworld",
    nickname: "놀이기구킬러",
    rating: 3.8,
    content: "놀이기구는 많지만 주말엔 사람이 너무 많아요. 휠체어 대여가 있어서 좋았어요.",
    createdAt: "2025-09-02",
  },
  {
    placeId: "dongseongno",
    nickname: "쇼핑중독자",
    rating: 4.2,
    content: "브랜드 매장이 많고 볼 것도 많아요. 다만 주차가 조금 아쉬워요.",
    createdAt: "2025-09-06",
  },
  {
    placeId: "palgongsan-cablecar",
    nickname: "산정상러버",
    rating: 4.5,
    content: "경치가 정말 끝내줘요! 탑승도 편하고 친절한 안내가 인상적이었어요.",
    createdAt: "2025-09-04",
  },
];

export const RECOMMEND_REASONS = {
  "daegu-modern-history-museum":
    "역사와 문화를 동시에 체험할 수 있고, 전시 내용이 알차며 직원 서비스가 친절해서 추천해요.",
  "seomun-market":
    "다양한 먹거리와 활기찬 시장 분위기를 즐길 수 있고 접근성이 좋아 누구나 편하게 방문할 수 있어요.",
  "daegu-art-museum":
    "아이와 함께 예술을 가까이에서 체험할 수 있고, 대구 시민들이 자랑스러워하는 문화 공간이에요.",
  "suseong-lake":
    "야경이 아름답고 산책로가 잘 정비되어 있어 가족, 연인, 휠체어 이용자까지 모두 즐기기 좋은 장소예요.",
  "eworld":
    "다양한 놀이기구와 테마 공간이 있어 즐길 거리가 풍부하며, 휠체어 대여 서비스도 제공돼 접근성이 좋아요.",
  "dongseongno":
    "쇼핑과 문화생활을 동시에 즐길 수 있는 대구 대표 번화가로, 다양한 브랜드 매장과 볼거리가 풍부해요.",
  "palgongsan-cablecar":
    "편리한 케이블카로 정상까지 올라가면 대구 전경을 한눈에 볼 수 있고, 친절한 안내 서비스로 여행 만족도가 높아요."
};
