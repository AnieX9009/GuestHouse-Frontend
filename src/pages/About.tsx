import { useState } from 'react';
import { FiMapPin, FiPhone, FiMail, FiArrowRight } from 'react-icons/fi';
import { FaTripadvisor, FaGoogle, FaYelp } from 'react-icons/fa';

const About = () => {
  const [isMapOpen, setIsMapOpen] = useState(false);

  const toggleMap = () => {
    setIsMapOpen(!isMapOpen);
  };

  return (
    <div className="py-16 lg:py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#14274A] mb-4">
            Discover Our Story
          </h2>
          <div className="w-20 h-1 bg-[#E0B973] mx-auto"></div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side */}
          <div className="space-y-6 text-[#14274A]">
            <h3 className="text-3xl font-bold text-[#E0B973]">
              WE ARE HERE FOR YOU
            </h3>

            <div className="flex items-start space-x-3">
              <FiMapPin className="text-[#E0B973] text-xl mt-1" />
              <p className="text-lg">
                497 Evergreen Rd. Roseville, CA 95673
              </p>
            </div>

            <p className="text-gray-600 leading-relaxed">
              At Luxury Hotels, we take our customers seriously. Do you have any
              enquiries, complaints or requests, please forward it to our
              support desk and we will get back to you as soon as possible.
            </p>

            <button
              onClick={toggleMap}
              className="flex items-center text-[#14274A] font-semibold space-x-2 hover:text-[#E0B973] transition-colors duration-300 group"
            >
              <span>View map</span>
              <FiArrowRight className="transform group-hover:translate-x-1 transition-transform duration-300" />
            </button>

            {isMapOpen && (
              <div className="mt-4 rounded-lg overflow-hidden shadow-lg">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d317715.7119263355!2d-0.38178406930701625!3d51.52873519756608!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47d8a00baf21de75%3A0x52963a5addd52a99!2sLondon%2C%20UK!5e0!3m2!1sen!2sus!4v1623941473178!5m2!1sen!2sus"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  loading="lazy"
                  className="rounded-lg"
                ></iframe>
              </div>
            )}

            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <FiPhone className="text-[#E0B973] text-xl" />
                <p className="font-medium">+44 345 678 903</p>
              </div>
              <div className="flex items-center space-x-3">
                <FiMail className="text-[#E0B973] text-xl" />
                <p className="font-medium">luxury_hotels@gmail.com</p>
              </div>
            </div>

            {/* Review Badges */}
            <div className="pt-4">
              <h4 className="text-lg font-semibold mb-3">
                Rated Excellent On:
              </h4>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="bg-white p-3 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex items-center space-x-2"
                >
                  <FaTripadvisor className="text-green-600 text-2xl" />
                  <span className="font-medium">TripAdvisor</span>
                </a>
                <a
                  href="#"
                  className="bg-white p-3 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex items-center space-x-2"
                >
                  <FaGoogle className="text-blue-500 text-2xl" />
                  <span className="font-medium">Google</span>
                </a>
                <a
                  href="#"
                  className="bg-white p-3 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex items-center space-x-2"
                >
                  <FaYelp className="text-red-500 text-2xl" />
                  <span className="font-medium">Yelp</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="relative group">
            <div className="absolute -inset-2 bg-[#E0B973] rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
            <div className="relative rounded-xl overflow-hidden shadow-2xl transition-transform duration-500 group-hover:-translate-y-2">
              <img
                src="https://res.cloudinary.com/dbezoksfw/image/upload/v1749899172/Guest%20House/premium_photo-1686167988053-3c95_da36u0.png"
                alt="Luxury Hotel Exterior"
                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex items-end p-6">
                <div className="text-white">
                  <h3 className="text-xl font-bold">Our Luxury Retreat</h3>
                  <p className="text-sm opacity-90">
                    Experience unparalleled comfort and service
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { number: "25+", label: "Years Experience" },
            { number: "150+", label: "Rooms Available" },
            { number: "98%", label: "Guest Satisfaction" },
            { number: "24/7", label: "Customer Support" },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <p className="text-3xl font-bold text-[#E0B973] mb-2">
                {stat.number}
              </p>
              <p className="text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;