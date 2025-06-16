export interface Booking {
  id: string;
  guestName: string;
  email: string;
  phone: string;
  roomType: string;
  roomNumber: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  status: 'confirmed' | 'pending' | 'cancelled' | 'checked-in' | 'checked-out';
  totalAmount: number;
  specialRequests?: string;
}

export interface Room {
  id: string;
  number: string;
  type: string;
  status: 'available' | 'occupied' | 'maintenance' | 'cleaning';
  price: number;
  amenities: string[];
  
}

export interface Guest {
  id: string;
  name: string;
  email: string;
  phone: string;
  totalBookings: number;
  totalSpent: number;
  lastVisit: string;
  vipStatus: boolean;
}

export type TabType = 'overview' | 'bookings' | 'rooms' | 'guests';