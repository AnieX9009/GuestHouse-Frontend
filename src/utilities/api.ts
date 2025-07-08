// api.ts (create a new file in your utilities folder)
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export const addRoom = async (roomData: FormData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/rooms/add`, roomData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error adding room:', error);
    throw error;
  }
};

export const getAllRooms = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/rooms`);
    return response.data;
  } catch (error) {
    console.error('Error fetching rooms:', error);
    throw error;
  }
};