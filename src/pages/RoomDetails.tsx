import { BedDouble, Users, X,  ChevronLeft, ChevronRight, Heart, Share2, MapPin, Wifi, Utensils, Car, Tv, Dumbbell, Droplet, Snowflake, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import  { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const RoomDetailsPage = () => {
  const [showGallery, setShowGallery] = useState(false);
  const [currentGalleryImage, setCurrentGalleryImage] = useState(0);
  const [likedRooms, setLikedRooms] = useState<number[]>([]);
  const navigate = useNavigate();

  const room = {
    id: 0,
    title: "Deluxe Single Room",
    images: [
      "https://res.cloudinary.com/dbezoksfw/image/upload/v1750091820/82303571_ipwstr.jpg",
      "https://res.cloudinary.com/dbezoksfw/image/upload/v1749572325/double-room_1_ubljvm.png",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      "https://res.cloudinary.com/dbezoksfw/image/upload/v1749572325/double-room_1_ubljvm.png",
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    ],
    price: "₹11,500",
    originalPrice: "₹13,500",
    taxes: "₹2,070 taxes & fees per night",
    description: "Fits 2 Adults • 32 m²",
    highlights: [
      "Complimentary Breakfast",
      "Free Cancellation (48hrs prior)",
      "Non-Smoking Room",
      "24/7 Room Service",
    ],
    layout: "1 Bedroom • 1 Bathroom • 1 Queen Bed",
    amenities: [
      { name: "Free Wifi", icon: Wifi },
      { name: "Restaurant", icon: Utensils },
      { name: "Parking", icon: Car },
      { name: "TV", icon: Tv },
      { name: "Gym", icon: Dumbbell },
      { name: "Shower", icon: Droplet },
      { name: "Air Conditioning", icon: Snowflake },
      { name: "Heating", icon: Sun },
    ],
    food: [
      "Meals offered: Breakfast, Lunch, Evening Snacks, Dinner",
      "Meal charges (approx): INR 900 per person per meal",
      "Special dietary requirements available",
    ],
    location: "Floor 3, Wing B, Ocean View",
    rating: 4.7,
    reviews: 128,
  };

  const ROOMS_DATA = [
    {
      id: 1,
      title: "Premium Double Room",
      images: [
        "https://res.cloudinary.com/dbezoksfw/image/upload/v1749572324/devon-janse-van-rensburg-_WEDFTZV0qU-unsplash_1_mgsfvm.png",
        "https://res.cloudinary.com/dbezoksfw/image/upload/v1749572325/double-room_1_ubljvm.png",
        "https://res.cloudinary.com/dbezoksfw/image/upload/v1750091820/82303571_ipwstr.jpg",
      ],
      alt: "Modern single room with natural lighting and plants",
      price: "₹15,500",
      originalPrice: "₹18,000",
      description: "Fits 3 Adults • 45 m²",
      rating: 4.9,
    },
    {
      id: 2,
      title: "Executive Twin Room",
      images: [
        "https://res.cloudinary.com/dbezoksfw/image/upload/v1749572325/double-room_1_ubljvm.png",
        "https://res.cloudinary.com/dbezoksfw/image/upload/v1749572324/devon-janse-van-rensburg-_WEDFTZV0qU-unsplash_1_mgsfvm.png",
        "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
      ],
      alt: "Elegant double room with comfortable bedding",
      price: "₹18,200",
      originalPrice: "₹21,000",
      description: "Fits 4 Adults • 55 m²",
      rating: 4.8,
    },
  ];

  const toggleLike = (roomId: number) => {
    if (likedRooms.includes(roomId)) {
      setLikedRooms(likedRooms.filter(id => id !== roomId));
    } else {
      setLikedRooms([...likedRooms, roomId]);
    }
  };

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
    setCurrentGalleryImage((prev) => 
      prev === room.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevGalleryImage = () => {
    setCurrentGalleryImage((prev) => 
      prev === 0 ? room.images.length - 1 : prev - 1
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center text-sm text-gray-600 mb-6">
          <span className="hover:text-blue-600 cursor-pointer">Home</span>
          <span className="mx-2">/</span>
          <span className="hover:text-blue-600 cursor-pointer">Rooms</span>
          <span className="mx-2">/</span>
          <span className="text-blue-600 font-medium">{room.title}</span>
        </nav>

        {/* Room Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold !text-gray-900">{room.title}</h1>
            <div className="flex items-center mt-2">
              <div className="flex items-center !bg-blue-100 px-2 py-1 rounded-md">
                <span className="!text-blue-800 font-medium">{room.rating}</span>
                <svg className="w-4 h-4 ml-1 !text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <span className="ml-2 !text-gray-600">{room.reviews} reviews</span>
              <div className="flex items-center ml-4 !text-gray-600">
                <MapPin className="w-4 h-4 mr-1" />
                <span>{room.location}</span>
              </div>
            </div>
          </div>
          <div className="flex space-x-3 mt-4 md:mt-0">
            <Button variant="outline" className="flex items-center gap-2">
              <Share2 className="w-4 h-4" />
              <span>Share</span>
            </Button>
            <Button 
              variant="outline" 
              className={`flex items-center gap-2 ${likedRooms.includes(room.id) ? '!text-red-500' : ''}`}
              onClick={() => toggleLike(room.id)}
            >
              <Heart className={`w-4 h-4 ${likedRooms.includes(room.id) ? 'fill-current' : ''}`} />
              <span>Save</span>
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
                  src={room.images[0]}
                  alt="Room"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 !bg-transparent  group-hover: transition-all duration-300"></div>
              </div>

              {/* Secondary images */}
              {[1, 2, 3].map((index) => (
                <div 
                  key={index}
                  className="relative group cursor-pointer rounded-xl overflow-hidden"
                  onClick={() => openGallery(index)}
                >
                  {index === 3 && room.images.length > 4 ? (
                    <>
                      <img
                        src={room.images[index]}
                        alt="Room"
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 flex items-center justify-center text-white font-medium">
                        +{room.images.length - 4} more
                      </div>
                    </>
                  ) : (
                    <>
                      <img
                        src={room.images[index]}
                        alt="Room"
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0  group-hover:bg-opacity-10 transition-all duration-300"></div>
                    </>
                  )}
                </div>
              ))}
            </div>

            {/* Room Details */}
            <div className="!bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold !text-gray-900 mb-4">Room Details</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Layout */}
                <div>
                  <h3 className="font-medium !text-gray-900 mb-3 flex items-center">
                    <BedDouble className="w-5 h-5 mr-2 !text-blue-600" />
                    Room Layout
                  </h3>
                  <p className="!text-gray-600">{room.layout}</p>
                </div>

                {/* Description */}
                <div>
                  <h3 className="font-medium !text-gray-900 mb-3 flex items-center">
                    <Users className="w-5 h-5 mr-2 !text-blue-600" />
                    Description
                  </h3>
                  <p className="!text-gray-600">{room.description}</p>
                </div>

                {/* Amenities */}
                <div className="md:col-span-2">
                  <h3 className="font-medium text-gray-900 mb-3">Amenities</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {room.amenities.map((item, idx) => (
                      <div key={idx} className="flex items-center">
                        <item.icon className="w-5 h-5 mr-2 text-blue-600" />
                        <span className="text-gray-600">{item.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Food and Dining */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Food & Dining</h2>
              <ul className="space-y-3">
                {room.food.map((item, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 mr-2"></span>
                    <span className="text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right side: Booking Card */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-gray-500">Starting from</p>
                  <div className="flex items-end">
                    <span className="text-3xl font-bold text-gray-900">{room.price}</span>
                    <span className="text-sm text-gray-500 ml-1 line-through">{room.originalPrice}</span>
                    <span className="text-xs !bg-green-100 text-green-800 px-2 py-0.5 rounded ml-2">15% OFF</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">{room.taxes}</p>
                </div>
                <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-sm font-medium">
                  {room.rating} ★
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-blue-50 p-3 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Highlights</h4>
                  <ul className="space-y-2">
                    {room.highlights.map((item, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 mr-2"></span>
                        <span className="text-gray-600 text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Button 
                  onClick={() => navigate("/booknow")}
                  className="w-full py-6 text-lg font-medium bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900"
                >
                  Book Now
                </Button>

                <div className="text-center text-sm text-gray-500">
                  No payment required at this stage
                </div>
              </div>
            </div>

            {/* Why Book With Us */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Why Book With Us</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 mr-2"></span>
                  <span className="text-gray-600 text-sm">Best price guarantee</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 mr-2"></span>
                  <span className="text-gray-600 text-sm">Free cancellation</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 mr-2"></span>
                  <span className="text-gray-600 text-sm">No booking fees</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 mr-2"></span>
                  <span className="text-gray-600 text-sm">Instant confirmation</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Similar Rooms */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Similar Rooms</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ROOMS_DATA.map((room) => {
              const [currentImageIndex, setCurrentImageIndex] = useState(0);

              const handleNext = () => {
                setCurrentImageIndex((prevIndex) =>
                  prevIndex === room.images.length - 1 ? 0 : prevIndex + 1
                );
              };

              const handlePrev = () => {
                setCurrentImageIndex((prevIndex) =>
                  prevIndex === 0 ? room.images.length - 1 : prevIndex - 1
                );
              };

              return (
                <div key={room.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                  {/* Room Image */}
                  <div className="relative">
                    <img
                      src={room.images[currentImageIndex]}
                      alt={room.alt}
                      className="w-full h-64 object-cover"
                    />

                    {/* Navigation Arrows */}
                    {room.images.length > 1 && (
                      <div className="absolute inset-0 flex items-center justify-between p-2 opacity-0 hover:opacity-100 transition-opacity">
                        <button
                          onClick={handlePrev}
                          className="!bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-70 transition-all"
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                          onClick={handleNext}
                          className="!bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-70 transition-all"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      </div>
                    )}

                    {/* Like Button */}
                    <button
                      onClick={() => toggleLike(room.id)}
                      className={`absolute top-3 right-3 p-2 rounded-full ${likedRooms.includes(room.id) ? 'text-red-500 bg-white' : 'text-gray-400 bg-white'}`}
                    >
                      <Heart className={`w-5 h-5 ${likedRooms.includes(room.id) ? 'fill-current' : ''}`} />
                    </button>

                    {/* Image Indicators */}
                    {room.images.length > 1 && (
                      <div className="absolute bottom-3 left-0 right-0 flex justify-center space-x-1.5">
                        {room.images.map((_, index) => (
                          <div
                            key={index}
                            className={`w-2 h-2 rounded-full ${index === currentImageIndex ? 'bg-white' : 'bg-white/50'}`}
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Room Info */}
                  <div className="p-4">
                    <div className="flex justify-between items-start">
                      <h3 className="font-semibold text-lg !text-gray-900">{room.title}</h3>
                      <div className="flex items-center !bg-blue-100 px-2 py-0.5 rounded-md">
                        <span className="!text-blue-800 text-sm font-medium">{room.rating}</span>
                        <svg className="w-3 h-3 ml-0.5 !text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </div>
                    </div>
                    <p className="!text-gray-600 text-sm mt-1">{room.description}</p>
                    <div className="mt-3 flex justify-between items-center">
                      <div>
                        <span className="text-lg font-bold !text-gray-900">{room.price}</span>
                        <span className="text-sm !text-gray-500 ml-1 line-through">{room.originalPrice}</span>
                      </div>
                      <Button 
                        variant="outline" 
                        className="!text-blue-600 !border-blue-600 hover:bg-blue-50"
                        // onClick={() => navigate(`/rooms/${room.id}`)}
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Image Gallery Modal */}
      <AnimatePresence>
        {showGallery && (
          <motion.div 
            className="fixed inset-0 !bg-black bg-opacity-30  z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button 
              onClick={closeGallery}
              className="absolute top-6 right-6 !text-black hover:!text-gray-300 transition-colors"
            >
              <X className="w-8 h-8" />
            </button>

            <div className="relative max-w-4xl w-full">
              <motion.img
                key={currentGalleryImage}
                src={room.images[currentGalleryImage]}
                alt="Room"
                className="w-full max-h-[80vh] object-contain rounded-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              />

              <button
                onClick={prevGalleryImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 !bg-black bg-opacity-50 !text-white rounded-full p-2 hover:bg-opacity-70 transition-all"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextGalleryImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 !bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-70 transition-all"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            <div className="absolute bottom-6 left-0 right-0 flex justify-center space-x-2">
              {room.images.map((_, index) => (
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