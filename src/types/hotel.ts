// types/hotel.ts
export interface Room {
  _id: string;
  roomNumber: string;
  roomType: string;
  status: 'Available' | 'occupied' | 'maintenance' | 'reserved'; // Enum values
  pricePerNight: number;
  amenities: string[];
  photos: string[]; // Changed from 'photo' to 'photos' array
  createdAt?: Date;
  updatedAt?: Date;
}

export interface RoomWithImages extends Room {
  images: File[];
  imagePreviews: string[];
} 