import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/bookings'; // Adjust based on your backend URL

export const createBooking = async (bookingData: any) => {
  try {
    const response = await axios.post(API_BASE_URL, bookingData, {
      headers: {
        'Content-Type': 'application/json',
        // Add authorization header if needed
        // 'Authorization': `Bearer ${token}`
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating booking:', error);
    throw error;
  }
};

export const getBookingsByUser = async (userId: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user bookings:', error);
    throw error;
  }
};