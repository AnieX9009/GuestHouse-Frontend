// types/room.ts
export interface Room {
  _id: string;
  roomNumber: string;
  roomType: string;
  status: 'Available' | 'Occupied' | 'Maintenance' | 'Reserved';
  pricePerNight: number;
  amenities: string[];
  photo: string;
  description?: string;
  capacity: {
    adults: number;
    children: number;
  };
  size?: number;
  bedType?: 'Single' | 'Double' | 'Queen' | 'King' | 'Twin' | 'Bunk';
  floor?: number;
  view?: 'City' | 'Garden' | 'Pool' | 'Ocean' | 'Mountain' | 'None';
  isFeatured?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

// For API responses
export interface RoomApiResponse {
  success: boolean;
  message?: string;
  data: Room | Room[] | null;
  count?: number;
}

// For room availability checks
export interface RoomAvailabilityParams {
  checkIn: string;
  checkOut: string;
  roomType?: string;
}

// For room filters
export interface RoomFilters {
  minPrice?: number;
  maxPrice?: number;
  roomType?: string;
  status?: string;
  bedType?: string;
  view?: string;
  minSize?: number;
  maxSize?: number;
  isFeatured?: boolean;
}

// For creating/updating rooms
export interface RoomFormData {
  roomNumber: string;
  roomType: string;
  status: string;
  pricePerNight: number;
  amenities: string[];
  photo?: File;
  description?: string;
  capacity: {
    adults: number;
    children: number;
  };
  size?: number;
  bedType?: string;
  floor?: number;
  view?: string;
  isFeatured?: boolean;
}