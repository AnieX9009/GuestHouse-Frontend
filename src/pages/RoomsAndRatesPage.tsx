import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";


const ROOMS_DATA = [
  {
    id: 1,
    title: "SINGLE ROOM",
    image:
      "https://res.cloudinary.com/dbezoksfw/image/upload/v1750091820/82303565_vpnsch.jpg",
    alt: "Modern single room with natural lighting and plants",
    price: "₹1000 Avg/night",
  },
  {
    id: 2,
    title: "DOUBLE ROOM",
    image:
      "https://res.cloudinary.com/dbezoksfw/image/upload/v1749572325/double-room_1_ubljvm.png",
    alt: "Elegant double room with comfortable bedding",
    price: "₹2000 Avg/night",
  },
];

const RoomsAndRatesPage = () => {
  const navigate = useNavigate();

  const goToRoomDetails = () => {
    navigate('/RoomDetails');
  };
  return (
    <div className="min-h-screen bg-white py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 tracking-wide">
            ROOMS AND RATES
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed max-w-5xl mx-auto">
            Each of our bright, light-flooded rooms come with everything you
            could possibly need for a comfortable stay. And yes, comfort isn't
            our only objective, we also value great design, sleek contemporary
            furnishing complemented by the rich tones of nature's palette as
            visible from our scenic staircase windows and terraces.
          </p>
        </div>

        {/* Rooms Grid */}
        <div className="space-y-12">
          {ROOMS_DATA.map((room) => (
            <div
              key={room.id}
              className="bg-white overflow-hidden border border-[#14274A] rounded-lg"
            >
              {/* Room Image */}
              <div className="relative">
                <img
                  src={room.image}
                  alt={room.alt}
                  className="w-full h-[300px] md:h-[500px] object-cover"
                />

                {/* Room Title Overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-slate-800 bg-opacity-90">
                  <div className="px-6 py-4">
                    <h2 className="text-white text-2xl md:text-3xl font-bold tracking-wider text-center">
                      {room.title}
                    </h2>
                  </div>
                </div>
              </div>

              {/* Room Actions */}
              <div className="px-6 py-6 flex justify-between items-center bg-gray-50">
                
                <Button onClick={goToRoomDetails} className="flex items-center gap-2 !text-[#14274A] hover:!text-amber-700 transition-colors font-medium !bg-transparent">
                  <div className="bg-[#E0B973] rounded-full p-1">
                    <Plus className="w-4 h-4 text-white" />
                  </div>
                  VIEW ROOM DETAILS
                </Button>

                <Button className="!bg-[#E0B973] hover:!bg-amber-600 !important text-white px-6 py-2 rounded font-medium transition-colors">
                  {room.price}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoomsAndRatesPage;
