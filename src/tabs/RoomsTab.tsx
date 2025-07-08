import React, { useState, useRef, useEffect } from 'react';
import { Plus, Edit, Trash2, Search, Check, X, ChevronDown, ChevronUp, Upload, Image as ImageIcon, Loader2 } from 'lucide-react';
import axios from 'axios';
import type { Room } from '../types/hotel';

const API_BASE_URL = 'http://localhost:5000/api';

const roomTypes = ['Standard Room', 'Deluxe Suite', 'Presidential Suite', 'Family Room'];
const amenitiesOptions = ['WiFi', 'TV', 'AC', 'Balcony', 'Kitchenette', 'Jacuzzi', 'Minibar', 'Sea View'];

interface RoomWithImages extends Room {
  images: File[];
  imagePreviews: string[];
}

const RoomsTab: React.FC<{ getStatusColor: (status: string) => string }> = ({ getStatusColor }) => {
  const [rooms, setRooms] = useState<RoomWithImages[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentRoom, setCurrentRoom] = useState<RoomWithImages | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedRoomId, setExpandedRoomId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [deletingPhoto, setDeletingPhoto] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form state
  const [formData, setFormData] = useState({
    roomNumber: '',
    roomType: 'Standard Room',
    status: 'Available',
    pricePerNight: 0,
    amenities: [] as string[],
    images: [] as File[],
    imagePreviews: [] as string[],
  });

  // Fetch rooms from API
  const fetchRooms = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${API_BASE_URL}/rooms`);
      const roomsData = response.data.map((room: Room) => ({
        ...room,
        images: [] as File[],
        imagePreviews: room.photos || [],
      }));
      setRooms(roomsData);
    } catch (err) {
      setError('Failed to fetch rooms');
      console.error('Error fetching rooms:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  // Filter rooms based on search term
  const filteredRooms = rooms.filter(room =>
    room.roomNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    room.roomType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle amenities toggle
  const handleAmenityToggle = (amenity: string) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const previews = files.map(file => URL.createObjectURL(file));
      
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...files],
        imagePreviews: [...prev.imagePreviews, ...previews]
      }));
    }
  };

  // Remove image
  const handleRemoveImage = (index: number) => {
    const newImages = [...formData.images];
    const newPreviews = [...formData.imagePreviews];
    
    newImages.splice(index, 1);
    newPreviews.splice(index, 1);
    
    setFormData(prev => ({
      ...prev,
      images: newImages,
      imagePreviews: newPreviews
    }));
  };

  // Open form for adding new room
  const openAddForm = () => {
    setCurrentRoom(null);
    setFormData({
      roomNumber: '',
      roomType: 'Standard Room',
      status: 'Available',
      pricePerNight: 0,
      amenities: [],
      images: [],
      imagePreviews: []
    });
    setIsFormOpen(true);
  };

  // Open form for editing
  const openEditForm = (room: RoomWithImages) => {
    setCurrentRoom(room);
    setFormData({
      roomNumber: room.roomNumber,
      roomType: room.roomType,
      status: room.status,
      pricePerNight: room.pricePerNight,
      amenities: room.amenities || [],
      images: [],
      imagePreviews: room.photos || []
    });
    setIsFormOpen(true);
  };

  // Save room (add or update)
  const handleSaveRoom = async () => {
    if (!formData.roomNumber || formData.pricePerNight <= 0) {
      setError('Room number and valid price are required');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('roomNumber', formData.roomNumber);
      formDataToSend.append('roomType', formData.roomType);
      formDataToSend.append('status', formData.status);
      formDataToSend.append('pricePerNight', formData.pricePerNight.toString());
      formDataToSend.append('amenities', formData.amenities.join(','));
      
      formData.images.forEach((image) => {
        formDataToSend.append('photos', image);
      });

      if (currentRoom) {
        await axios.put(`${API_BASE_URL}/rooms/${currentRoom._id}`, formDataToSend, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        setSuccessMessage('Room updated successfully!');
      } else {
        await axios.post(`${API_BASE_URL}/rooms/add`, formDataToSend, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        setSuccessMessage('Room added successfully!');
      }
      
      await fetchRooms();
      setIsFormOpen(false);
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save room. Please try again.');
      console.error('Error saving room:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Delete room
  const handleDeleteRoom = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this room?')) {
      setIsLoading(true);
      try {
        await axios.delete(`${API_BASE_URL}/rooms/${id}`);
        setSuccessMessage('Room deleted successfully!');
        await fetchRooms();
        setTimeout(() => setSuccessMessage(null), 3000);
      } catch (err) {
        setError('Failed to delete room');
        console.error('Error deleting room:', err);
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Delete a specific photo
  const handleDeletePhoto = async (roomId: string, photoUrl: string) => {
    if (window.confirm('Are you sure you want to delete this photo?')) {
      setDeletingPhoto(photoUrl);
      try {
        await axios.delete(`${API_BASE_URL}/rooms/${roomId}/photos/${encodeURIComponent(photoUrl)}`);
        setSuccessMessage('Photo deleted successfully!');
        await fetchRooms();
        setTimeout(() => setSuccessMessage(null), 3000);
      } catch (err) {
        setError('Failed to delete photo');
        console.error('Error deleting photo:', err);
      } finally {
        setDeletingPhoto(null);
      }
    }
  };

  // Toggle room details expansion
  const toggleExpandRoom = (id: string) => {
    setExpandedRoomId(expandedRoomId === id ? null : id);
  };

  return (
    <div className="space-y-6">
      {/* Success Message */}
      {successMessage && (
        <div className="!bg-green-100 border !border-green-400 !text-green-700 px-4 py-3 rounded relative">
          <span className="block sm:inline">{successMessage}</span>
          <button 
            onClick={() => setSuccessMessage(null)}
            className="absolute top-0 right-0 px-2 py-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="!bg-red-100 border !border-red-400 !text-red-700 px-4 py-3 rounded relative">
          <span className="block sm:inline">{error}</span>
          <button 
            onClick={() => setError(null)}
            className="absolute top-0 right-0 px-2 py-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Loading Indicator */}
      {isLoading && (
        <div className="fixed inset-0 !bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="!bg-white p-6 rounded-lg shadow-lg">
            <p className="text-lg font-medium">Loading...</p>
          </div>
        </div>
      )}

      {/* Header and Search */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-2xl font-bold text-gray-900">Room Management</h2>
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search rooms..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button 
            onClick={openAddForm}
            className="!bg-blue-600 text-white px-4 py-2 rounded-lg hover:!bg-blue-700 flex items-center justify-center"
            disabled={isLoading}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Room
          </button>
        </div>
      </div>

      {/* Rooms Grid */}
      {filteredRooms.length === 0 ? (
        <div className="!bg-white rounded-xl shadow-lg border border-gray-100 p-8 text-center">
          <p className="text-gray-500 mb-4">No rooms found. Add your first room to get started.</p>
          <button 
            onClick={openAddForm}
            className="!bg-blue-600 text-white px-4 py-2 rounded-lg hover:!bg-blue-700 flex items-center justify-center mx-auto"
            disabled={isLoading}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Room
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRooms.map((room) => (
            <div key={room._id} className="!bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
              {/* Room Images */}
              {room.imagePreviews.length > 0 ? (
                <div className="h-48 overflow-hidden">
                  <img 
                    src={room.imagePreviews[0]} 
                    alt={`Room ${room.roomNumber}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="h-48 !bg-gray-100 flex items-center justify-center">
                  <ImageIcon className="w-12 h-12 text-gray-400" />
                </div>
              )}
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Room {room.roomNumber}</h3>
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(room.status)}`}>
                    {room.status}
                  </span>
                </div>
                
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">{room.roomType}</p>
                  <p className="text-lg font-bold text-gray-900">${room.pricePerNight}/night</p>
                  
                  <div className="flex flex-wrap gap-1 mb-3">
                    {room.amenities.slice(0, 3).map((amenity, index) => (
                      <span key={index} className="px-2 py-1 !bg-gray-100 text-gray-700 text-xs rounded">
                        {amenity}
                      </span>
                    ))}
                    {room.amenities.length > 3 && (
                      <span className="px-2 py-1 !bg-gray-100 text-gray-700 text-xs rounded">
                        +{room.amenities.length - 3} more
                      </span>
                    )}
                  </div>
                  
                  <button 
                    onClick={() => toggleExpandRoom(room._id)}
                    className="text-blue-600 text-sm font-medium flex items-center"
                  >
                    {expandedRoomId === room._id ? (
                      <>
                        <ChevronUp className="w-4 h-4 mr-1" />
                        Hide Details
                      </>
                    ) : (
                      <>
                        <ChevronDown className="w-4 h-4 mr-1" />
                        Show Details
                      </>
                    )}
                  </button>
                  
                  {expandedRoomId === room._id && (
                    <div className="mt-3 pt-3 border-t border-gray-200 space-y-3">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900 mb-2">Amenities:</h4>
                        <div className="flex flex-wrap gap-1">
                          {room.amenities.map((amenity, index) => (
                            <span key={index} className="px-2 py-1 !bg-gray-100 text-gray-700 text-xs rounded">
                              {amenity}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      {room.imagePreviews.length > 0 && (
                        <div>
                          <h4 className="text-sm font-medium text-gray-900 mb-2">Photos:</h4>
                          <div className="grid grid-cols-3 gap-2">
                            {room.imagePreviews.map((preview, index) => (
                              <div key={index} className="relative group">
                                <img 
                                  src={preview} 
                                  alt={`Room ${room.roomNumber} photo ${index + 1}`}
                                  className="w-full h-20 object-cover rounded"
                                />
                                <button
                                  type="button"
                                  onClick={() => handleDeletePhoto(room._id, preview)}
                                  className="absolute top-1 right-1 !bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                  disabled={isLoading || deletingPhoto === preview}
                                >
                                  {deletingPhoto === preview ? (
                                    <Loader2 className="w-3 h-3 animate-spin" />
                                  ) : (
                                    <Trash2 className="w-3 h-3" />
                                  )}
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
              
              <div className="px-6 py-4 !bg-gray-50 flex justify-between">
                <button 
                  onClick={() => openEditForm(room)}
                  className="text-blue-600 hover:text-blue-900 text-sm font-medium flex items-center"
                  disabled={isLoading}
                >
                  <Edit className="w-4 h-4 mr-1" />
                  Edit
                </button>
                <button 
                  onClick={() => handleDeleteRoom(room._id)}
                  className="text-red-600 hover:text-red-900 flex items-center"
                  disabled={isLoading}
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  <span className="hidden sm:inline">Delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Room Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 !bg-black/50 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="!bg-white rounded-xl shadow-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {currentRoom ? `Edit Room ${currentRoom.roomNumber}` : 'Add New Room'}
              </h3>
              <button 
                onClick={() => setIsFormOpen(false)} 
                className="!text-gray-500 hover:!text-gray-700"
                disabled={isLoading}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Room Number*</label>
                  <input
                    type="text"
                    name="roomNumber"
                    value={formData.roomNumber}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    required
                    disabled={isLoading}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Room Type*</label>
                  <select
                    name="roomType"
                    value={formData.roomType}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    disabled={isLoading}
                  >
                    {roomTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status*</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    disabled={isLoading}
                  >
                    <option value="Available">Available</option>
                    <option value="Occupied">Occupied</option>
                    <option value="Maintenance">Maintenance</option>
                    <option value="Reserved">Reserved</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price per Night ($)*</label>
                  <input
                    type="number"
                    name="pricePerNight"
                    value={formData.pricePerNight}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    min="0"
                    required
                    disabled={isLoading}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Amenities</label>
                  <div className="grid grid-cols-2 gap-2">
                    {amenitiesOptions.map(amenity => (
                      <div key={amenity} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`amenity-${amenity}`}
                          checked={formData.amenities.includes(amenity)}
                          onChange={() => handleAmenityToggle(amenity)}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          disabled={isLoading}
                        />
                        <label htmlFor={`amenity-${amenity}`} className="ml-2 text-sm text-gray-700">
                          {amenity}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Right Column - Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Room Photos</label>
                <div 
                  className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-blue-500 transition-colors"
                  onClick={() => !isLoading && fileInputRef.current?.click()}
                >
                  <Upload className="w-12 h-12 mx-auto text-gray-400" />
                  <p className="mt-2 text-sm text-gray-600">
                    Click to upload images or drag and drop
                  </p>
                  <p className="text-xs text-gray-500">
                    PNG, JPG, JPEG up to 5MB
                  </p>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    className="hidden"
                    accept="image/*"
                    multiple
                    disabled={isLoading}
                  />
                </div>
                
                {/* Image Previews */}
                {formData.imagePreviews.length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Uploaded Images:</h4>
                    <div className="grid grid-cols-3 gap-2">
                      {formData.imagePreviews.map((preview, index) => (
                        <div key={index} className="relative group">
                          <img 
                            src={preview} 
                            alt={`Preview ${index + 1}`}
                            className="w-full h-20 object-cover rounded"
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveImage(index)}
                            className="absolute top-1 right-1 !bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            disabled={isLoading}
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="mt-6 flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setIsFormOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveRoom}
                className="px-4 py-2 !bg-blue-600 text-white rounded-lg hover:!bg-blue-700 flex items-center"
                disabled={!formData.roomNumber || formData.pricePerNight <= 0 || isLoading}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {currentRoom ? 'Saving...' : 'Adding...'}
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4 mr-1" />
                    {currentRoom ? 'Save Changes' : 'Add Room'}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoomsTab;