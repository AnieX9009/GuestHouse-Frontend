const FACILITIES_DATA = [
  {
    id: 1,
    title: "THE GYM",
    image:
      "https://res.cloudinary.com/dbezoksfw/image/upload/v1749571738/Group_42_snvbzo.png",
    alt: "Modern gym with state-of-the-art equipment",
  },
  {
    id: 2,
    title: "BEAUTIFUL GARDEN",
    image:
      "https://res.cloudinary.com/dbezoksfw/image/upload/v1750091576/images_1_w2eisz.jpg",
    alt: "Scenic poolside bar with ocean view at sunset",
  },
];

const FacilitiesPage = () => {
  return (
    <div className="min-h-screen bg-white py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 tracking-wide">
            FACILITIES
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed mx-auto">
            We want your stay at our lush hotel to be truly unforgettable. That
            is why we give special attention to all of your needs so that we can
            ensure an experience quite unique. Luxury hotel, offers the perfect
            setting with stunning views for leisure and our modern luxury resort
            facilities will help you enjoy the best of all.
          </p>
        </div>

        {/* Facilities Grid */}
        <div className="space-y-16">
          {FACILITIES_DATA.map((facility) => (
            <div key={facility.id} className="relative">
              <div className="relative overflow-hidden">
                <img
                  src={facility.image}
                  alt={facility.alt}
                  className="w-full h-[400px] md:h-[500px] object-cover"
                />

                {/* Title Overlay - Centered */}
                <div className="absolute inset-0 flex items-end justify-center">
                  <div className="bg-white px-8 py-4 rounded-t-sm">
                    <h2 className="text-black text-2xl md:text-3xl font-bold tracking-wider text-center">
                      {facility.title}
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FacilitiesPage;
