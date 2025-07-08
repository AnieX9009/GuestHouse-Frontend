import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";

interface Room {
  _id: string;
  roomNumber: string;
  roomType: string;
  status: string;
  pricePerNight: number;
  amenities: string[];
  photos: string[];
}

const RoomsAndRatesPage = () => {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch all rooms on component mount
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/rooms");
        setRooms(response.data);
      } catch (err) {
        setError("Failed to fetch rooms. Please try again later.");
        console.error("Error fetching rooms:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  const goToRoomDetails = (roomId: string) => {
    navigate(`/RoomDetails/${roomId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Skeleton className="h-12 w-1/2 mx-auto mb-8" />
            <Skeleton className="h-6 w-3/4 mx-auto" />
            <Skeleton className="h-6 w-2/3 mx-auto mt-4" />
          </div>
          <div className="space-y-12">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="border border-[#14274A] rounded-lg">
                <Skeleton className="w-full h-[500px]" />
                <div className="px-6 py-6 flex flex-col sm:flex-row justify-between items-center bg-gray-50 gap-4">
                  <Skeleton className="h-10 w-48" />
                  <Skeleton className="h-10 w-32" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
            ROOMS AND RATES
          </h1>
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
          <Button 
            onClick={() => window.location.reload()} 
            className="mt-4 bg-[#E0B973] hover:bg-amber-600 text-white"
          >
            Retry
          </Button>
        </div>
      </div>
    );
  }

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
          {rooms.map((room) => (
            <div
              key={room._id}
              className="!bg-white overflow-hidden border border-[#14274A] rounded-lg"
            >
              {/* Room Image */}
              <div className="relative">
                <img
                  src={room.photos[0] || "https://via.placeholder.com/800x500?text=No+Image"}
                  alt={`Room ${room.roomNumber}`}
                  className="w-full h-[300px] md:h-[500px] object-cover"
                />

                {/* Room Title Overlay */}
                <div className="absolute bottom-0 left-0 right-0 !bg-slate-800 bg-opacity-90">
                  <div className="px-6 py-4">
                    <h2 className="text-white text-2xl md:text-3xl font-bold tracking-wider text-center">
                      {room.roomType.toUpperCase()}
                    </h2>
                  </div>
                </div>
              </div>

              {/* Room Actions */}
              <div className="px-6 py-6 flex flex-col sm:flex-row justify-between items-center !bg-gray-50 gap-4">
                <Button 
                  onClick={() => goToRoomDetails(room._id)} 
                  className="flex items-center gap-2 !text-[#14274A] hover:!text-amber-700 transition-colors font-medium !bg-transparent w-full sm:w-auto justify-center sm:justify-start"
                >
                  <div className="!bg-[#E0B973] rounded-full p-1">
                    <Plus className="w-4 h-4 text-white" />
                  </div>
                  <span className="whitespace-nowrap">VIEW ROOM DETAILS</span>
                </Button>

                <Button className="!bg-[#E0B973] hover:!bg-amber-600 !important text-white px-6 py-2 rounded font-medium transition-colors w-full sm:w-auto">
                  ₹{room.pricePerNight} Avg/night
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