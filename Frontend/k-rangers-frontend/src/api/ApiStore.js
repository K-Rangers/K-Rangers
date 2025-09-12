import axios from 'axios';

const API_BASE_URL = 'https://travel.gamja.cloud/v1/main';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
});

api.interceptors.request.use(
  (config) => {
    if (!config.headers.Authorization) {
      const t =
        localStorage.getItem('accessToken') ??
        sessionStorage.getItem('accessToken');
      if (t) config.headers.Authorization = `Bearer ${t}`;
    }
    return config;
  },
  (err) => Promise.reject(err)
);

function logError(ctx, err) {
  const status = err.response?.status;
  const body =
    typeof err.response?.data === 'string'
      ? err.response.data
      : JSON.stringify(err.response?.data || {});
  console.error(`[${ctx}] status: ${status} body: ${body}`);
}

export const getAttractionsByDistrict = async (district) => {
  try {
    const res = await api.get(`/attractions/by-district/${district}`);
    return Array.isArray(res.data) ? res.data : [];
  } catch (err) {
    logError('getAttractionsByDistrict', err);
    throw err;
  }
};

export const getAttractionReviews = async (attractionId) => {
  try {
    const res = await api.get(`/reviews/attr/${attractionId}`);
    return Array.isArray(res.data) ? res.data : [];
  } catch (err) {
    logError('getAttractionReviews', err);
    throw err;
  }
};

export const getAttractionReviewSummary = async (attractionId) => {
  try {
    const res = await api.get(`/reviews/attr/${attractionId}/summary`);
    return res.data;
  } catch (err) {
    logError('getAttractionReviewSummary', err);
    throw err;
  }
};

export const getAttractionRatingAvg = async (attractionId) => {
  try {
    const res = await api.get(`/reviews/attr/${attractionId}/avg`);
    return res.data;
  } catch (err) {
    logError('getAttractionRatingAvg', err);
    throw err;
  }
};

export const createAccommodationReview = async (accommodationId, reviewData) => {
  try {
    const res = await api.post(`/user/reviews/accom/create/${accommodationId}`, reviewData);
    return res.data;
  } catch (err) {
    logError('createAccommodationReview', err);
    throw err;
  }
};