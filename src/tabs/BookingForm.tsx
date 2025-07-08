// import React, { useState, useEffect } from 'react';
// import { Calendar, User, Bed, CreditCard } from 'lucide-react';
// import axios from 'axios';
// import type { Room } from '../types/room';

// interface BookingFormProps {
//   booking?: Booking | null;
//   onSubmit: (bookingData: Omit<Booking, 'id'>) => void;
//   onCancel: () => void;
// }

// interface Booking {
//   id?: string;
//   guestName: string;
//   email: string;
//   phone: string;
//   roomType: string;
//   roomNumber: string;
//   checkIn: string;
//   checkOut: string;
//   guests: number;
//   status: string;
//   totalAmount: number;
//   specialRequests: string;
// }

// const BookingForm: React.FC<BookingFormProps> = ({ booking, onSubmit, onCancel }) => {
//   const [formData, setFormData] = useState<Omit<Booking, 'id'>>({
//     guestName: booking?.guestName || '',
//     email: booking?.email || '',
//     phone: booking?.phone || '',
//     roomType: booking?.roomType || 'standard',
//     roomNumber: booking?.roomNumber || '',
//     checkIn: booking?.checkIn || '',
//     checkOut: booking?.checkOut || '',
//     guests: booking?.guests || 1,
//     status: booking?.status || 'pending',
//     totalAmount: booking?.totalAmount || 0,
//     specialRequests: booking?.specialRequests || '',
//   });

//   const [availableRooms, setAvailableRooms] = useState<Room[]>([]);
//   const [loadingRooms, setLoadingRooms] = useState(false);
//   const [error, setError] = useState('');

//   const roomTypes = [
//     { value: 'standard', label: 'Standard' },
//     { value: 'deluxe', label: 'Deluxe' },
//     { value: 'suite', label: 'Suite' },
//     { value: 'executive', label: 'Executive' },
//     { value: 'presidential', label: 'Presidential' },
//   ];

//   const statusOptions = [
//     { value: 'pending', label: 'Pending' },
//     { value: 'confirmed', label: 'Confirmed' },
//     { value: 'cancelled', label: 'Cancelled' },
//     { value: 'completed', label: 'Completed' },
//   ];

//   useEffect(() => {
//     if (formData.checkIn && formData.checkOut) {
//       fetchAvailableRooms();
//     }
//   }, [formData.checkIn, formData.checkOut, formData.roomType]);

//   const fetchAvailableRooms = async () => {
//     try {
//       setLoadingRooms(true);
//       setError('');
      
//       const response = await axios.get('http://localhost:5000/api/rooms/available', {
//         params: {
//           checkIn: formData.checkIn,
//           checkOut: formData.checkOut,
//           roomType: formData.roomType
//         }
//       });
      
//       setAvailableRooms(response.data.rooms);
//     } catch (err) {
//       setError('Failed to fetch available rooms');
//       console.error('Error fetching rooms:', err);
//     } finally {
//       setLoadingRooms(false);
//     }
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: name === 'guests' || name === 'totalAmount' ? Number(value) : value
//     }));
//   };

//   const handleRoomSelect = (roomNumber: string, price: number) => {
//     setFormData(prev => ({
//       ...prev,
//       roomNumber,
//       totalAmount: calculateTotal(price)
//     }));
//   };

//   const calculateTotal = (pricePerNight: number) => {
//     if (!formData.checkIn || !formData.checkOut) return 0;
    
//     const nights = Math.ceil(
//       (new Date(formData.checkOut).getTime() - new Date(formData.checkIn).getTime()) 
//       / (1000 * 60 * 60 * 24)
//     );
    
//     return nights * pricePerNight;
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
    
//     // Validate dates
//     if (new Date(formData.checkOut) <= new Date(formData.checkIn)) {
//       setError('Check-out date must be after check-in date');
//       return;
//     }
    
//     // Validate room selection
//     if (!formData.roomNumber) {
//       setError('Please select a room');
//       return;
//     }
    
//     onSubmit(formData);
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-6">
//       {error && (
//         <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg">
//           {error}
//         </div>
//       )}

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {/* Guest Information */}
//         <div className="space-y-4">
//           <h3 className="text-lg font-medium text-gray-900 flex items-center">
//             <User className="w-5 h-5 mr-2" />
//             Guest Information
//           </h3>
          
//           <div>
//             <label htmlFor="guestName" className="block text-sm font-medium text-gray-700 mb-1">
//               Full Name *
//             </label>
//             <input
//               type="text"
//               id="guestName"
//               name="guestName"
//               value={formData.guestName}
//               onChange={handleChange}
//               required
//               className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//             />
//           </div>
          
//           <div>
//             <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
//               Email *
//             </label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               required
//               className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//             />
//           </div>
          
//           <div>
//             <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
//               Phone Number *
//             </label>
//             <input
//               type="tel"
//               id="phone"
//               name="phone"
//               value={formData.phone}
//               onChange={handleChange}
//               required
//               className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//             />
//           </div>
//         </div>

//         {/* Room Information */}
//         <div className="space-y-4">
//           <h3 className="text-lg font-medium text-gray-900 flex items-center">
//             <Bed className="w-5 h-5 mr-2" />
//             Room Information
//           </h3>
          
//           <div>
//             <label htmlFor="roomType" className="block text-sm font-medium text-gray-700 mb-1">
//               Room Type *
//             </label>
//             <select
//               id="roomType"
//               name="roomType"
//               value={formData.roomType}
//               onChange={handleChange}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//             >
//               {roomTypes.map(option => (
//                 <option key={option.value} value={option.value}>
//                   {option.label}
//                 </option>
//               ))}
//             </select>
//           </div>
          
//           <div>
//             <label htmlFor="guests" className="block text-sm font-medium text-gray-700 mb-1">
//               Number of Guests *
//             </label>
//             <input
//               type="number"
//               id="guests"
//               name="guests"
//               min="1"
//               max="10"
//               value={formData.guests}
//               onChange={handleChange}
//               required
//               className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//             />
//           </div>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {/* Dates */}
//         <div className="space-y-4">
//           <h3 className="text-lg font-medium text-gray-900 flex items-center">
//             <Calendar className="w-5 h-5 mr-2" />
//             Dates
//           </h3>
          
//           <div>
//             <label htmlFor="checkIn" className="block text-sm font-medium text-gray-700 mb-1">
//               Check-in Date *
//             </label>
//             <input
//               type="date"
//               id="checkIn"
//               name="checkIn"
//               value={formData.checkIn}
//               onChange={handleChange}
//               min={new Date().toISOString().split('T')[0]}
//               required
//               className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//             />
//           </div>
          
//           <div>
//             <label htmlFor="checkOut" className="block text-sm font-medium text-gray-700 mb-1">
//               Check-out Date *
//             </label>
//             <input
//               type="date"
//               id="checkOut"
//               name="checkOut"
//               value={formData.checkOut}
//               onChange={handleChange}
//               min={formData.checkIn || new Date().toISOString().split('T')[0]}
//               required
//               className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//             />
//           </div>
//         </div>

//         {/* Payment & Status */}
//         <div className="space-y-4">
//           <h3 className="text-lg font-medium text-gray-900 flex items-center">
//             <CreditCard className="w-5 h-5 mr-2" />
//             Payment & Status
//           </h3>
          
//           <div>
//             <label htmlFor="totalAmount" className="block text-sm font-medium text-gray-700 mb-1">
//               Total Amount ($)
//             </label>
//             <input
//               type="number"
//               id="totalAmount"
//               name="totalAmount"
//               min="0"
//               step="0.01"
//               value={formData.totalAmount}
//               onChange={handleChange}
//               required
//               className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//               readOnly
//             />
//           </div>
          
//           <div>
//             <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
//               Booking Status
//             </label>
//             <select
//               id="status"
//               name="status"
//               value={formData.status}
//               onChange={handleChange}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//             >
//               {statusOptions.map(option => (
//                 <option key={option.value} value={option.value}>
//                   {option.label}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>
//       </div>

//       {/* Available Rooms */}
//       {loadingRooms && (
//         <div className="p-4 bg-blue-50 text-blue-700 rounded-lg">
//           Loading available rooms...
//         </div>
//       )}

//       {availableRooms.length > 0 && (
//         <div className="space-y-2">
//           <h3 className="text-lg font-medium text-gray-900">
//             Available Rooms
//           </h3>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//             {availableRooms.map(room => (
//               <div 
//                 key={room._id}
//                 onClick={() => handleRoomSelect(room.roomNumber, room.pricePerNight)}
//                 className={`p-4 border rounded-lg cursor-pointer transition-colors ${
//                   formData.roomNumber === room.roomNumber 
//                     ? 'border-blue-500 bg-blue-50' 
//                     : 'border-gray-200 hover:border-blue-300'
//                 }`}
//               >
//                 <div className="font-medium">Room {room.roomNumber}</div>
//                 <div className="text-sm text-gray-600">{room.roomType}</div>
//                 <div className="text-sm">${room.pricePerNight}/night</div>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Special Requests */}
//       <div>
//         <label htmlFor="specialRequests" className="block text-sm font-medium text-gray-700 mb-1">
//           Special Requests
//         </label>
//         <textarea
//           id="specialRequests"
//           name="specialRequests"
//           rows={3}
//           value={formData.specialRequests}
//           onChange={handleChange}
//           className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//           placeholder="Any special requests or notes..."
//         />
//       </div>

//       {/* Form Actions */}
//       <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
//         <button
//           type="button"
//           onClick={onCancel}
//           className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
//         >
//           Cancel
//         </button>
//         <button
//           type="submit"
//           className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//         >
//           {booking ? 'Update Booking' : 'Create Booking'}
//         </button>
//       </div>
//     </form>
//   );
// };

// export default BookingForm;