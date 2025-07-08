import { BedDouble, Users, X, ChevronLeft, ChevronRight, Share2, Wifi, Utensils, Car, Tv, Dumbbell, Droplet, Snowflake, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";

interface Room {
  _id: string;
  roomNumber: string;
  roomType: string;
  status: string;
  pricePerNight: number;
  amenities: string[];
  photos: string[];
  description?: string;
  capacity?: number;
  size?: number;
  bedType?: string;
}

interface SimilarRoom {
  _id: string;
  roomType: string;
  pricePerNight: number;
  photos: string[];
  description?: string;
}

const RoomDetailsPage = () => {
  const [showGallery, setShowGallery] = useState(false);
  const [currentGalleryImage, setCurrentGalleryImage] = useState(0);
  const [room, setRoom] = useState<Room | null>(null);
  const [similarRooms, setSimilarRooms] = useState<SimilarRoom[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView();
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [hash]);

  // Fetch room details and similar rooms
  useEffect(() => {
    const fetchRoomDetails = async () => {
      if (!id) {
        setError("No room ID provided");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        
        // Fetch room details
        const roomResponse = await fetch(`http://localhost:5000/api/rooms/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        if (!roomResponse.ok) {
          if (roomResponse.status === 404) {
            throw new Error('Room not found');
          } else if (roomResponse.status >= 500) {
            throw new Error('Server error. Please try again later.');
          } else {
            throw new Error(`HTTP error! status: ${roomResponse.status}`);
          }
        }
        
        const roomData = await roomResponse.json();
        setRoom(roomData);
        
        // Fetch all rooms for similar rooms
        try {
          const similarResponse = await fetch("http://localhost:5000/api/rooms", {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          
          if (similarResponse.ok) {
            const allRooms = await similarResponse.json();
            // Filter out the current room and get available rooms
            const similar = allRooms
              .filter((r: Room) => r._id !== id && r.status === 'available')
              .slice(0, 3);
            setSimilarRooms(similar);
          }
        } catch (similarError) {
          console.warn('Could not fetch similar rooms:', similarError);
        }
        
      } catch (err) {
        console.error("Error fetching room:", err);
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Failed to fetch room details. Please try again later.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchRoomDetails();
  }, [id]);

  const openGallery = (index: number) => {
    setCurrentGalleryImage(index);
    setShowGallery(true);
    document.body.style.overflow = 'hidden';
  };

  const closeGallery = () => {
    setShowGallery(false);
    document.body.style.overflow = 'auto';
  };

  const nextGalleryImage = () => {
    if (!room) return;
    setCurrentGalleryImage((prev) =>
      prev === room.photos.length - 1 ? 0 : prev + 1
    );
  };

  const prevGalleryImage = () => {
    if (!room) return;
    setCurrentGalleryImage((prev) =>
      prev === 0 ? room.photos.length - 1 : prev - 1
    );
  };

  if (loading) {
    return (
      <div className="!bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Left side loading */}
            <div className="lg:col-span-2 space-y-6">
              {/* Image gallery skeleton */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                <Skeleton className="sm:col-span-2 row-span-2 h-96 rounded-xl" />
                <Skeleton className="h-44 rounded-xl" />
                <Skeleton className="h-44 rounded-xl" />
                <Skeleton className="h-44 rounded-xl" />
              </div>
              
              {/* Details skeleton */}
              <div className="space-y-6">
                <Skeleton className="h-80 rounded-xl" />
                <Skeleton className="h-60 rounded-xl" />
              </div>
            </div>
            
            {/* Right side loading */}
            <div className="space-y-6">
              <Skeleton className="h-96 rounded-xl" />
              <Skeleton className="h-40 rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="!bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="max-w-md text-center p-6 !bg-white rounded-xl shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Error Loading Room</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <div className="space-y-3">
            <Button 
              onClick={() => window.location.reload()} 
              className="w-full !bg-[#E0B973] hover:!bg-amber-600 text-white"
            >
              Retry
            </Button>
            <Button 
              variant="outline"
              onClick={() => navigate('/')} 
              className="w-full"
            >
              Back to Home
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (!room) {
    return (
      <div className="!bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="max-w-md text-center p-6 !bg-white rounded-xl shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Room Not Found</h2>
          <p className="text-gray-600 mb-6">The room you're looking for doesn't exist.</p>
          <Button 
            onClick={() => navigate('/')} 
            className="!bg-[#E0B973] hover:!bg-amber-600 text-white"
          >
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  // Amenity icons mapping
  const amenityIcons: { [key: string]: React.ComponentType<any> } = {
    'Wifi': Wifi,
    'Restaurant': Utensils,
    'Parking': Car,
    'TV': Tv,
    'Gym': Dumbbell,
    'Shower': Droplet,
    'Air Conditioning': Snowflake,
    'Heating': Sun,
    'Swimming Pool': Droplet,
    'Mini Bar': Utensils,
    'Safe': Utensils,
    'Room Service': Utensils
  };

  // Prepare room details for display
  const roomDetails = {
    id: room._id,
    title: `${room.roomType} - Room ${room.roomNumber}`,
    images: room.photos && room.photos.length > 0 ? room.photos : ["https://via.placeholder.com/800x500?text=No+Image"],
    price: `₹${room.pricePerNight.toLocaleString()}`,
    originalPrice: `₹${Math.round(room.pricePerNight * 1.15).toLocaleString()}`,
    taxes: `₹${Math.round(room.pricePerNight * 0.18).toLocaleString()} taxes & fees per night`,
    description: `Fits ${room.capacity || 2} Adults • ${room.size || 30} m²`,
    highlights: [
      "Complimentary Breakfast",
      "Free Cancellation (48hrs prior)",
      "Non-Smoking Room",
      "24/7 Room Service",
    ],
    layout: `1 Bedroom • 1 Bathroom • ${room.bedType || "Queen Bed"}`,
    amenities: room.amenities.map(amenity => ({
      name: amenity,
      icon: amenityIcons[amenity] || Utensils // Default icon if not found
    })),
    food: [
      "Meals offered: Breakfast, Lunch, Evening Snacks, Dinner",
      "Meal charges (approx): INR 200 per person per meal",
      "Special dietary requirements available",
    ],
  };

  return (
    <div className="!bg-gray-50 min-h-screen">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center text-sm text-gray-600 mb-6">
          <span 
            onClick={() => navigate('/')} 
            className="hover:text-blue-600 cursor-pointer"
          >
            Home
          </span>
          <span className="mx-2">/</span>
          <span 
            onClick={() => navigate('/rooms')} 
            className="hover:text-blue-600 cursor-pointer"
          >
            Rooms
          </span>
          <span className="mx-2">/</span>
          <span className="text-blue-600 font-medium">{roomDetails.title}</span>
        </nav>

        {/* Room Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">{roomDetails.title}</h1>
            <div className="flex items-center mt-2">
              <div className="flex items-center">
                <Users className="w-4 h-4 mr-1 text-gray-500" />
                <span className="text-gray-600">{room.capacity || 2} Adults</span>
              </div>
              <div className="flex items-center ml-4">
                <BedDouble className="w-4 h-4 mr-1 text-gray-500" />
                <span className="text-gray-600">{room.bedType || "Queen Bed"}</span>
              </div>
            </div>
          </div>
          <div className="flex space-x-3 mt-4 md:mt-0">
            <Button variant="outline" className="flex items-center gap-2 !bg-white">
              <Share2 className="w-4 h-4" />
              <span>Share</span>
            </Button>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left side: Images and Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              {/* Main image */}
              <div
                className="sm:col-span-2 row-span-2 relative group cursor-pointer rounded-xl overflow-hidden"
                onClick={() => openGallery(0)}
              >
                <img
                  src={roomDetails.images[0]}
                  alt="Room"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 group-hover:!bg-black/70 group-hover:!bg-opacity-10 transition-all duration-300"></div>
              </div>

              {/* Secondary images */}
              {[1, 2, 3].map((index) => (
                <div
                  key={index}
                  className="relative group cursor-pointer rounded-xl overflow-hidden"
                  onClick={() => openGallery(index)}
                >
                  {roomDetails.images[index] ? (
                    <>
                      <img
                        src={roomDetails.images[index]}
                        alt="Room"
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 group-hover:!bg-black/70 group-hover:!bg-opacity-10 transition-all duration-300"></div>
                    </>
                  ) : (
                    <div className="w-full h-full !bg-gray-200 flex items-center justify-center">
                      <span className="!text-gray-500">No Image</span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Room Details */}
            <div className="!bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Room Details</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Layout */}
                <div>
                  <h3 className="font-medium text-gray-900 mb-3 flex items-center">
                    <BedDouble className="w-5 h-5 mr-2 text-blue-600" />
                    Room Layout
                  </h3>
                  <p className="text-gray-600">{roomDetails.layout}</p>
                </div>

                {/* Description */}
                <div>
                  <h3 className="font-medium text-gray-900 mb-3 flex items-center">
                    <Users className="w-5 h-5 mr-2 text-blue-600" />
                    Description
                  </h3>
                  <p className="text-gray-600">{room.description || 'No description provided'}</p>
                </div>

                {/* Amenities */}
                <div className="md:col-span-2">
                  <h3 className="font-medium text-gray-900 mb-3">Amenities</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {roomDetails.amenities.length > 0 ? (
                      roomDetails.amenities.map((item, idx) => (
                        <div key={idx} className="flex items-center">
                          <item.icon className="w-5 h-5 mr-2 text-blue-600" />
                          <span className="text-gray-600">{item.name}</span>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500 col-span-full">No amenities listed</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Food and Dining */}
            <div className="!bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Food & Dining</h2>
              <ul className="space-y-3">
                {roomDetails.food.map((item, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="inline-block w-1.5 h-1.5 rounded-full !bg-blue-600 mt-2 mr-2"></span>
                    <span className="text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Similar Rooms Section */}
            {/* {similarRooms.length > 0 && (
              <div className="!bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Similar Rooms Available</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {similarRooms.map((similarRoom) => (
                    <div 
                      key={similarRoom._id} 
                      className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => navigate(`/rooms/${similarRoom._id}`)}
                    >
                      <div className="h-48 overflow-hidden">
                        <img
                          src={similarRoom.photos?.[0] || "https://via.placeholder.com/300x200?text=No+Image"}
                          alt={similarRoom.roomType}
                          className="w-full h-full object-cover hover:scale-105 transition-transform"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-medium text-gray-900">{similarRoom.roomType}</h3>
                        <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                          {similarRoom.description || 'No description available'}
                        </p>
                        <div className="mt-3 flex justify-between items-center">
                          <span className="font-bold text-gray-900">₹{similarRoom.pricePerNight.toLocaleString()}</span>
                          <Button 
                            size="sm" 
                            className="!bg-[#E0B973] hover:!bg-amber-600 text-white"
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/booknow/${similarRoom._id}`);
                            }}
                          >
                            Book Now
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )} */}
          </div>

          {/* Right side: Booking Card */}
          <div className="space-y-6">
            <div className="!bg-white rounded-xl shadow-sm p-6 sticky top-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-gray-500">Starting from</p>
                  <div className="flex items-end">
                    <span className="text-3xl font-bold text-gray-900">{roomDetails.price}</span>
                    <span className="text-sm text-gray-500 ml-1 line-through">{roomDetails.originalPrice}</span>
                    <span className="text-xs !bg-green-100 text-green-800 px-2 py-0.5 rounded ml-2">15% OFF</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">{roomDetails.taxes}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="!bg-blue-50 p-3 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Highlights</h4>
                  <ul className="space-y-2">
                    {roomDetails.highlights.map((item, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="inline-block w-1.5 h-1.5 rounded-full !bg-blue-600 mt-1.5 mr-2"></span>
                        <span className="text-gray-600 text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Button
                  onClick={() => navigate(`/booknow/${room._id}`)}
                  className="w-full py-6 text-lg font-medium !bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900"
                >
                  Book Now
                </Button>

                <div className="text-center text-sm text-gray-500">
                  No payment required at this stage
                </div>
              </div>
            </div>

            {/* Why Book With Us */}
            <div className="!bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Why Book With Us</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="inline-block w-1.5 h-1.5 rounded-full !bg-blue-600 mt-1.5 mr-2"></span>
                  <span className="text-gray-600 text-sm">Best price guarantee</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-1.5 h-1.5 rounded-full !bg-blue-600 mt-1.5 mr-2"></span>
                  <span className="text-gray-600 text-sm">Free cancellation</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-1.5 h-1.5 rounded-full !bg-blue-600 mt-1.5 mr-2"></span>
                  <span className="text-gray-600 text-sm">No booking fees</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-1.5 h-1.5 rounded-full !bg-blue-600 mt-1.5 mr-2"></span>
                  <span className="text-gray-600 text-sm">Instant confirmation</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Image Gallery Modal */}
      <AnimatePresence>
        {showGallery && (
          <motion.div
            className="fixed inset-0 !bg-black !bg-opacity-90 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              onClick={closeGallery}
              className="absolute top-6 right-6 text-white hover:text-gray-300 transition-colors"
            >
              <X className="w-8 h-8 text-black" />
            </button>

            <div className="relative max-w-4xl w-full">
              <motion.img
                key={currentGalleryImage}
                src={roomDetails.images[currentGalleryImage]}
                alt="Room"
                className="w-full max-h-[80vh] object-contain rounded-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              />

              <button
                onClick={prevGalleryImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 !bg-black !bg-opacity-50 text-white rounded-full p-2 hover:!bg-opacity-70 transition-all"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextGalleryImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 !bg-black !bg-opacity-50 text-white rounded-full p-2 hover:!bg-opacity-70 transition-all"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            <div className="absolute bottom-6 left-0 right-0 flex justify-center space-x-2">
              {roomDetails.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentGalleryImage(index)}
                  className={`w-3 h-3 rounded-full ${index === currentGalleryImage ? '!bg-white' : '!bg-white/50'}`}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RoomDetailsPage;