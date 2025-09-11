import axios from 'axios';

const API_BASE_URL = 'https://travel.gamja.cloud/v1/main/user';

export const getAttractionsByDistrict = async (district) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/attractions/by-district/${district}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching attractions:', error);
        throw error;
    }
};