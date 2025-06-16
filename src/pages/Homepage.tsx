import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const navigate = useNavigate();

  const goToRoom = () => {
    navigate('/rooms');
  };

  return (
    <div className="bg-white py-16 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-gray-600 text-3xl mb-2">
            All our room types are including complementary breakfast
          </p>
        </div>

        {/* Luxury redefined section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16 items-center">
          <div className="order-2 lg:order-1">
            <div className="bg-white px-8 border-l-2 border-[#14274A]">
              <h2 className="text-3xl font-bold !text-gray-800 mb-4 leading-tight">
                Luxury redefined
              </h2>
              <p className="!text-gray-600 leading-relaxed mb-4">
                Our rooms are designed to transport you into an environment made
                for leisure. Take your mind off the day-to-day of home life and
                find a private paradise for yourself.
              </p>
              <Button onClick={goToRoom} className="!bg-[#E0B973] hover:!bg-amber-600 !text-white !px-6 !py-3 rounded font-medium transition-colors">
                EXPLORE
              </Button>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <img
              src="https://res.cloudinary.com/dbezoksfw/image/upload/v1749624094/Guest%20House/WhatsApp_Image_2025-06-11_at_10.11.38_341f1bd2_dcqx2c.jpg"
              alt="Luxury hotel room with modern design"
              className="w-full h-80 object-cover shadow-lg"
            />
          </div>
        </div>

        {/* Leave your worries section */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16 items-center">
          <div className="order-2 lg:order-1">
            <div className="bg-white px-8 border-l-2 border-[#14274A]">
              <h2 className="text-3xl font-bold text-gray-800 mb-4 leading-tight">
                Leave your worries in the sand
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                We love life at the beach. Being close to the ocean with access
                to endless sandy beach ensures a relaxed state of mind. It seems
                like time stands still watching the ocean.
              </p>
              <Button className="!bg-[#E0B973] hover:!bg-amber-600 !text-white !px-6 !py-3 rounded font-medium transition-colors">
                EXPLORE
              </Button>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <img
              src="https://res.cloudinary.com/dbezoksfw/image/upload/v1749624228/Guest%20House/WhatsApp_Image_2025-06-11_at_10.11.40_670a9dd6_ln9fb2.jpg"
              alt="Beautiful beach resort with palm trees"
              className="w-full h-80 object-cover shadow-lg"
            />
          </div>
        </div>

        {/* Testimonials section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-12">
            Testimonials
          </h2>

          <div className="max-w-2xl mx-auto">
            <p className="text-xl text-gray-700 italic mb-6 leading-relaxed">
              "Calm, Serene, Retro - What a way to relax and enjoy"
            </p>
            <p className="text-gray-600 mb-8">Mr. and Mrs. Baxter, UK</p>

            {/* Navigation arrows */}
            <div className="flex justify-center space-x-4">
              <Button className="w-10 h-10 !bg-[#E0B973] hover:!bg-amber-600 !text-white rounded-full flex items-center justify-center transition-colors">
                <ChevronLeft className="!w-5 !h-5" />
              </Button>
              <Button className="w-10 h-10 !bg-[#E0B973] hover:!bg-amber-600 !text-white rounded-full flex items-center justify-center transition-colors">
                <ChevronRight className="!w-5 !h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
