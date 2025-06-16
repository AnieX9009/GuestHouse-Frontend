import React, { useState, useRef } from 'react';
import { Plus, Edit, Trash2, Search, Check, X, ChevronDown, ChevronUp, Upload, Image as ImageIcon } from 'lucide-react';
import type { Room } from '../types/hotel';

const roomTypes = ['Standard Room', 'Deluxe Suite', 'Presidential Suite', 'Family Room'];
const amenitiesOptions = ['WiFi', 'TV', 'AC', 'Balcony', 'Kitchenette', 'Jacuzzi', 'Minibar', 'Sea View'];

interface RoomWithImages extends Room {
  images: File[];
  imagePreviews: string[];
}

const RoomsTab: React.FC<{ rooms: Room[]; getStatusColor: (status: string) => string }> = ({ 
  rooms: initialRooms, 
  getStatusColor 
}) => {
  const [rooms, setRooms] = useState<RoomWithImages[]>(initialRooms.map(room => ({
    ...room,
    images: [],
    imagePreviews: []
  })));
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentRoom, setCurrentRoom] = useState<RoomWithImages | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedRoomId, setExpandedRoomId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form state
  const [formData, setFormData] = useState<Omit<RoomWithImages, 'id'>>({
    number: '',
    type: 'Standard Room',
    status: 'available',
    price: 0,
    amenities: [],
    images: [],
    imagePreviews: []
  });

  // Filter rooms based on search term
  const filteredRooms = rooms.filter(room =>
    room.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
    room.type.toLowerCase().includes(searchTerm.toLowerCase())
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
      number: '',
      type: 'Standard Room',
      status: 'available',
      price: 0,
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
      number: room.number,
      type: room.type,
      status: room.status,
      price: room.price,
      amenities: room.amenities,
      images: room.images,
      imagePreviews: room.imagePreviews
    });
    setIsFormOpen(true);
  };

  // Save room (add or update)
  const handleSaveRoom = () => {
    if (!formData.number || formData.price <= 0) {
      return; // Don't save if required fields are empty or invalid
    }

    if (currentRoom) {
      // Update existing room
      setRooms(rooms.map(room =>
        room.id === currentRoom.id ? { 
          ...formData, 
          id: currentRoom.id,
          price: Number(formData.price)
        } : room
      ));
    } else {
      // Add new room
      const newRoom: RoomWithImages = {
        ...formData,
        id: Date.now().toString(),
        price: Number(formData.price)
      };
      setRooms([...rooms, newRoom]);
    }
    setIsFormOpen(false);
  };

  // Delete room
  const handleDeleteRoom = (id: string) => {
    setRooms(rooms.filter(room => room.id !== id));
  };

  // Toggle room details expansion
  const toggleExpandRoom = (id: string) => {
    setExpandedRoomId(expandedRoomId === id ? null : id);
  };

  return (
    <div className="space-y-6">
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
            className="!bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center justify-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Room
          </button>
        </div>
      </div>

      {/* Rooms Grid */}
      {filteredRooms.length === 0 ? (
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 text-center">
          <p className="text-gray-500 mb-4">No rooms found. Add your first room to get started.</p>
          <button 
            onClick={openAddForm}
            className="!bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center justify-center mx-auto"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Room
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRooms.map((room) => (
            <div key={room.id} className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
              {/* Room Images */}
              {room.imagePreviews.length > 0 ? (
                <div className="h-48 overflow-hidden">
                  <img 
                    src={room.imagePreviews[0]} 
                    alt={`Room ${room.number}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="h-48 bg-gray-100 flex items-center justify-center">
                  <ImageIcon className="w-12 h-12 text-gray-400" />
                </div>
              )}
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Room {room.number}</h3>
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(room.status)}`}>
                    {room.status}
                  </span>
                </div>
                
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">{room.type}</p>
                  <p className="text-lg font-bold text-gray-900">${room.price}/night</p>
                  
                  <div className="flex flex-wrap gap-1 mb-3">
                    {room.amenities.slice(0, 3).map((amenity, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                        {amenity}
                      </span>
                    ))}
                    {room.amenities.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                        +{room.amenities.length - 3} more
                      </span>
                    )}
                  </div>
                  
                  <button 
                    onClick={() => toggleExpandRoom(room.id)}
                    className="text-blue-600 text-sm font-medium flex items-center"
                  >
                    {expandedRoomId === room.id ? (
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
                  
                  {expandedRoomId === room.id && (
                    <div className="mt-3 pt-3 border-t border-gray-200 space-y-3">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900 mb-2">Amenities:</h4>
                        <div className="flex flex-wrap gap-1">
                          {room.amenities.map((amenity, index) => (
                            <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
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
                              <div key={index} className="relative">
                                <img 
                                  src={preview} 
                                  alt={`Room ${room.number} photo ${index + 1}`}
                                  className="w-full h-20 object-cover rounded"
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
              
              <div className="px-6 py-4 bg-gray-50 flex justify-between">
                <button 
                  onClick={() => openEditForm(room)}
                  className="text-blue-600 hover:text-blue-900 text-sm font-medium flex items-center"
                >
                  <Edit className="w-4 h-4 mr-1" />
                  Edit
                </button>
                <button 
                  onClick={() => handleDeleteRoom(room.id)}
                  className="text-red-600 hover:text-red-900 flex items-center"
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {currentRoom ? `Edit Room ${currentRoom.number}` : 'Add New Room'}
              </h3>
              <button onClick={() => setIsFormOpen(false)} className="text-gray-500 hover:text-gray-700">
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
                    name="number"
                    value={formData.number}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Room Type*</label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
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
                  >
                    <option value="available">Available</option>
                    <option value="occupied">Occupied</option>
                    <option value="maintenance">Maintenance</option>
                    <option value="cleaning">Cleaning</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price per Night ($)*</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    min="0"
                    required
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
                  onClick={() => fileInputRef.current?.click()}
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
                            className="w-full h-24 object-cover rounded"
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveImage(index)}
                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
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
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveRoom}
                className="px-4 py-2 !bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
                disabled={!formData.number || formData.price <= 0}
              >
                <Check className="w-4 h-4 mr-1" />
                {currentRoom ? 'Save Changes' : 'Add Room'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoomsTab;