import axios from 'axios';

const API_BASE_URL = 'https://travel.gamja.cloud/v1/main';

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
