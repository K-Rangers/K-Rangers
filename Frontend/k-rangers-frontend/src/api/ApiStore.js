import axios from 'axios';

const API_BASE_URL = 'https://travelaiga.cloud/v1/main';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
});


function logError(ctx, err) {
  const status = err.response?.status;
  const body = typeof err.response?.data === 'string'
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

export const login = async (email, password) => {
  try {
    const res = await api.post('/login', { email, password });
    const token = res?.data?.accessToken ?? res?.data?.token ?? res?.data;
    if (!token) throw new Error('토큰이 없습니다.');

    localStorage.setItem('accessToken', token);
    api.defaults.headers.Authorization = `Bearer ${token}`;
    return token;
  } catch (err) {
    logError('login', err);
    throw err;
  }
};

export const createAttractionReview = async (attractionId, reviewData) => {
  try {
    const res = await api.post(
      `/user/reviews/attr/create/${attractionId}`,
      reviewData
    );
    return res.data;
  } catch (err) {
    logError('createAttractionReview', err);
    throw err;
  }
};