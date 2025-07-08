import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FiInfo, FiPlus, FiMinus, FiChevronDown, FiX } from "react-icons/fi";
import { FaStar, FaRegStar, FaCheck } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addDays, format, differenceInDays } from "date-fns";

type Guest = {
  title: "MR" | "MRS" | "MS" | "DR";
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  id: number;
};

type Coupon = {
  code: string;
  discount: number;
};

type HotelBooking = {
  id: number;
  hotelName: string;
  stars: number;
  address: string;
  imageUrl: string;
  checkInTime: string;
  checkOutTime: string;
  adults: number;
  rooms: number;
  roomType: string;
  amenities: string[];
  importantInfo: string[];
  basePricePerNight: number;
  hotelTaxesPercentage: number;
  cancellationPolicy: string;
};

const BookingDetails = () => {
  const navigate = useNavigate();
  const [nights, setNights] = useState<number>(1);
  const [guests, setGuests] = useState<Guest[]>([
    {
      title: "MR",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      id: 1,
    },
  ]);
  const [couponCode, setCouponCode] = useState<string>("");
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [checkInDate, setCheckInDate] = useState<Date>(new Date());
  const [checkOutDate, setCheckOutDate] = useState<Date>(addDays(new Date(), 1));
  const [showCheckInCalendar, setShowCheckInCalendar] = useState<boolean>(false);
  const [showCheckOutCalendar, setShowCheckOutCalendar] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 768);
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
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Update nights count when dates change
  useEffect(() => {
    const diff = differenceInDays(checkOutDate, checkInDate);
    setNights(diff > 0 ? diff : 1);
  }, [checkInDate, checkOutDate]);

  const hotelBookings: HotelBooking[] = [
    {
      id: 1,
      hotelName: "The Oberoi Amarvilas",
      stars: 5,
      address: "Taj East Gate Road, Near Taj Mahal, Agra, India",
      imageUrl:
        "https://res.cloudinary.com/dbezoksfw/image/upload/v1750091820/82303571_ipwstr.jpg",
      checkInTime: "2 PM",
      checkOutTime: "12 PM",
      adults: 2,
      rooms: 1,
      roomType: "Premier Room King",
      amenities: [
        "Room Only",
        "No meals included",
        "Complimentary In Room Refreshments",
        "MMTPS Best Available Rate",
      ],
      importantInfo: [
        "Rate and cancellation policy applicable for booking up to 5 rooms. More than 5 rooms considered group bookings & subject to hotel policy.",
        "Outside food is not allowed",
        "Unmarried couples allowed",
      ],
      basePricePerNight: 37500,
      hotelTaxesPercentage: 0.18, // 18%
      cancellationPolicy: "Non-Refundable",
    },
  ];

  // Calculate prices based on nights
  useEffect(() => {
    const basePrice = hotelBookings[0].basePricePerNight * nights;
    const hotelTaxes = basePrice * hotelBookings[0].hotelTaxesPercentage;
    setTotalPrice(basePrice + hotelTaxes);
  }, [nights]);

  const handleAddNight = () => {
    if (nights < 30) {
      const newNights = nights + 1;
      setNights(newNights);
      setCheckOutDate(addDays(checkInDate, newNights));
    }
  };

  const handleRemoveNight = () => {
    if (nights > 1) {
      const newNights = nights - 1;
      setNights(newNights);
      setCheckOutDate(addDays(checkInDate, newNights));
    }
  };

  const formatDisplayDate = (date: Date) => {
    return format(date, "EEE dd MMM yyyy");
  };

  const handleCheckInChange = (date: Date | null) => {
    // Adjust checkout date if it's before or same as checkin date
    if (date) {
      setCheckInDate(date);
    }
    setShowCheckInCalendar(false);
  };

  const handleCheckOutChange = (date: Date | null) => {
    if (date) {
      setCheckOutDate(date);
      setShowCheckOutCalendar(false);
    }
  };

  const handleAddGuest = () => {
    if (guests.length < 5) {
      setGuests([
        ...guests,
        {
          title: "MR",
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          id: guests.length + 1,
        },
      ]);
    }
  };

  const handleGuestChange = (index: number, field: keyof Guest, value: string) => {
    const updatedGuests = [...guests];
    updatedGuests[index] = { ...updatedGuests[index], [field]: value };
    setGuests(updatedGuests);
  };

  const handleRemoveGuest = (id: number) => {
    if (guests.length > 1) {
      setGuests(guests.filter((guest) => guest.id !== id));
    }
  };

  const handleApplyCoupon = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      if (couponCode === "DISCOUNT20") {
        setAppliedCoupon({
          code: "DISCOUNT20",
          discount: 0.2, // 20% discount
        });
      } else if (couponCode === "DISCOUNT10") {
        setAppliedCoupon({
          code: "DISCOUNT10",
          discount: 0.1, // 10% discount
        });
      } else {
        alert("Invalid coupon code");
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode("");
  };

  const calculateFinalPrice = (): number => {
    let finalPrice = totalPrice;
    if (appliedCoupon) {
      finalPrice = totalPrice * (1 - appliedCoupon.discount);
    }
    return finalPrice;
  };

  const handlePayment = () => {
    // Validate guest details before proceeding to payment
    const isValid = guests.every(
      (guest) => guest.firstName && guest.lastName && guest.phone
    );

    if (!isValid) {
      alert("Please fill in all required guest details");
      return;
    }

    // Proceed to payment
    navigate("/payment", {
      state: {
        bookingDetails: {
          ...hotelBookings[0],
          checkInDate: format(checkInDate, "EEE dd MMM yyyy"),
          checkOutDate: format(checkOutDate, "EEE dd MMM yyyy"),
          nights,
          guests,
          priceBreakup: {
            basePrice: hotelBookings[0].basePricePerNight * nights,
            hotelTaxes:
              hotelBookings[0].basePricePerNight *
              nights *
              hotelBookings[0].hotelTaxesPercentage,
            discount: appliedCoupon ? calculateFinalPrice() - totalPrice : 0,
            total: calculateFinalPrice(),
          },
        },
      },
    });
  };

  const renderStars = (count: number) => {
    return Array(5)
      .fill(0)
      .map((_, i) =>
        i < count ? (
          <FaStar key={i} className="text-yellow-400 inline text-lg" />
        ) : (
          <FaRegStar key={i} className="text-gray-300 inline text-lg" />
        )
      );
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      {/* Header */}
      <header className="bg-white shadow-sm py-4 px-4 sm:px-6 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-xl sm:text-2xl font-bold text-blue-600">Booking Details</h1>
          <button
            onClick={() => navigate(-1)}
            className="!text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center !bg-white"
            aria-label="Back to search"
          >
            <FiChevronDown className="transform rotate-90 mr-1" />
            <span className="hidden sm:inline">Back to search</span>
            <span className="sm:hidden">Back</span>
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Main Booking Card */}
        <div className="!bg-white rounded-xl shadow-lg overflow-hidden mb-6 border !border-gray-200">
          {/* Hotel Info Section */}
          <div className="p-4 sm:p-6 md:p-8 flex flex-col md:flex-row gap-4 sm:gap-6 border-b">
            <div className="flex-1">
              <div className="flex flex-col md:flex-row justify-between gap-4 sm:gap-6">
                <div className="flex-1">
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold !text-gray-900 mb-2">
                    {hotelBookings[0].hotelName}
                  </h2>
                  <div className="mb-3 flex items-center">
                    {renderStars(hotelBookings[0].stars)}
                    <span className="ml-2 text-sm !text-gray-600">
                      {hotelBookings[0].stars}-star hotel
                    </span>
                  </div>
                  <p className="!text-gray-600 mb-4 flex items-start">
                    <svg
                      className="w-4 h-4 mr-2 mt-1 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    {hotelBookings[0].address}
                  </p>
                </div>
                <div className="w-full md:w-80 h-48 md:h-56 flex-shrink-0 relative">
                  <img
                    src={hotelBookings[0].imageUrl}
                    alt="Hotel"
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <button
                    className="absolute top-2 right-2 !bg-white/90 p-1 rounded-full shadow-sm hover:!bg-white transition"
                    aria-label="Save hotel"
                  >
                    <svg
                      className="w-5 h-5 !text-gray-700"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 8a1 1 0 011-1h14a1 1 0 011 1v10a1 1 0 01-1 1H5a1 1 0 01-1-1V8z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V4a1 1 0 011-1h6a1 1 0 011 1v3m-6 5h2m-4 0h2m4 0h2"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Dates Section */}
          <div className="p-4 sm:p-6 md:p-8 border-b !bg-gray-50">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-center md:text-left !bg-white p-3 sm:p-4 rounded-lg shadow-sm border !border-gray-200 w-full md:w-auto relative">
                <p className="text-xs uppercase !text-gray-500 mb-1">Check In</p>
                <button
                  onClick={() => setShowCheckInCalendar(!showCheckInCalendar)}
                  className="font-semibold w-full text-left !bg-white"
                  aria-label="Select check-in date"
                >
                  {formatDisplayDate(checkInDate)}
                </button>
                <p className="text-sm !text-gray-500">
                  {hotelBookings[0].checkInTime}
                </p>
                {showCheckInCalendar && (
                  <div className={`absolute z-10 mt-2 ${isMobile ? 'left-0 right-0 mx-auto w-[300px]' : ''}`}>
                    <DatePicker
                      selected={checkInDate}
                      onChange={handleCheckInChange}
                      minDate={new Date()}
                      inline
                      calendarClassName="shadow-lg rounded-lg"
                    />
                  </div>
                )}
              </div>

              <div className="hidden md:flex flex-col items-center">
                <div className="relative">
                  <div className="h-0.5 w-16 !bg-gray-300"></div>
                  <div className="absolute -top-2 left-0 right-0 flex justify-center">
                    <div className="!bg-gray-50 text-center px-2 text-xs text-gray-500">
                      {nights} night{nights > 1 ? "s" : ""}
                    </div>
                  </div>
                </div>
                <div className="flex items-center mt-2 space-x-2">
                  <button
                    onClick={handleRemoveNight}
                    disabled={nights <= 1}
                    className={`p-1 rounded-full ${nights <= 1
                      ? "!bg-gray-200 !text-gray-400 cursor-not-allowed"
                      : "!bg-blue-100 !text-blue-600 hover:!bg-blue-200"
                      }`}
                    aria-label="Decrease nights"
                  >
                    <FiMinus className="w-4 h-4" />
                  </button>
                  <span className="text-sm font-medium">{nights}</span>
                  <button
                    onClick={handleAddNight}
                    disabled={nights >= 30}
                    className={`p-1 rounded-full ${nights >= 30
                      ? "!bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "!bg-blue-100 text-blue-600 hover:!bg-blue-200"
                      }`}
                    aria-label="Increase nights"
                  >
                    <FiPlus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="md:hidden flex items-center justify-between w-full !bg-white p-3 sm:p-4 rounded-lg shadow-sm border border-gray-200">
                <div>
                  <p className="text-xs uppercase !text-gray-500">Nights</p>
                  <div className="flex items-center mt-1 space-x-3">
                    <button
                      onClick={handleRemoveNight}
                      disabled={nights <= 1}
                      className={`p-1 rounded-full ${nights <= 1
                        ? "!bg-gray-200 !text-gray-400 cursor-not-allowed"
                        : "!bg-blue-100 !text-blue-600 hover:!bg-blue-200"
                        }`}
                      aria-label="Decrease nights"
                    >
                      <FiMinus className="w-4 h-4" />
                    </button>
                    <span className="text-sm font-medium">{nights}</span>
                    <button
                      onClick={handleAddNight}
                      disabled={nights >= 30}
                      className={`p-1 rounded-full ${nights >= 30
                        ? "!bg-gray-200 text-gray-400 cursor-not-allowed"
                        : "!bg-blue-100 text-blue-600 hover:bg-blue-200"
                        }`}
                      aria-label="Increase nights"
                    >
                      <FiPlus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div>
                  <p className="text-xs uppercase text-gray-500">Guests</p>
                  <p className="text-sm font-medium mt-1">
                    {hotelBookings[0].adults} Adults
                  </p>
                </div>
                <div>
                  <p className="text-xs uppercase text-gray-500">Rooms</p>
                  <p className="text-sm font-medium mt-1">
                    {hotelBookings[0].rooms} Room
                  </p>
                </div>
              </div>

              <div className="hidden md:block text-center md:text-left !bg-white p-3 sm:p-4 rounded-lg shadow-sm border border-gray-200 relative">
                <p className="text-xs uppercase text-gray-500 mb-1">Check Out</p>
                <button
                  onClick={() => setShowCheckOutCalendar(!showCheckOutCalendar)}
                  className="font-semibold w-full !bg-white text-left"
                  aria-label="Select check-out date"
                >
                  {formatDisplayDate(checkOutDate)}
                </button>
                <p className="text-sm text-gray-500">
                  {hotelBookings[0].checkOutTime}
                </p>
                {showCheckOutCalendar && (
                  <div className={`absolute z-10 mt-2 ${isMobile ? 'left-0 right-0 mx-auto w-[300px]' : 'right-0'}`}>
                    <DatePicker
                      selected={checkOutDate}
                      onChange={handleCheckOutChange}
                      minDate={addDays(checkInDate, 1)}
                      inline
                      calendarClassName="shadow-lg rounded-lg"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Mobile Checkout Date Picker */}
            {isMobile && (
              <div className="mt-4 !bg-white p-3 sm:p-4 rounded-lg shadow-sm border !border-gray-200 relative">
                <p className="text-xs uppercase !text-gray-500 mb-1">Check Out</p>
                <button
                  onClick={() => setShowCheckOutCalendar(!showCheckOutCalendar)}
                  className="font-semibold w-full text-left"
                  aria-label="Select check-out date"
                >
                  {formatDisplayDate(checkOutDate)}
                </button>
                <p className="text-sm !text-gray-500">
                  {hotelBookings[0].checkOutTime}
                </p>
                {showCheckOutCalendar && (
                  <div className="absolute z-10 mt-2 left-0 right-0 mx-auto w-[300px]">
                    <DatePicker
                      selected={checkOutDate}
                      onChange={handleCheckOutChange}
                      minDate={addDays(checkInDate, 1)}
                      inline
                      calendarClassName="shadow-lg rounded-lg"
                    />
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="flex flex-col lg:flex-row">
            {/* Left Section - Room Details */}
            <div className="flex-1 p-4 sm:p-6 md:p-8">
              <div className="mb-6 sm:mb-8">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">
                  {hotelBookings[0].roomType}
                </h3>
                <p className="text-gray-600 mb-4">
                  {hotelBookings[0].adults} Adults
                </p>
                <ul className="space-y-2 mb-4">
                  {hotelBookings[0].amenities.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <FaCheck className="!text-green-500 mr-2 mt-1 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="!bg-blue-50 p-3 sm:p-4 rounded-lg border !border-blue-100">
                  <p className="font-semibold !text-gray-900 flex items-center">
                    <svg
                      className="w-5 h-5 text-blue-500 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    {hotelBookings[0].cancellationPolicy}
                  </p>
                  <p className="text-gray-600 text-sm mt-1 ml-7">
                    Refund is not applicable for this booking
                  </p>
                  <button
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium mt-2 ml-7 flex items-center"
                    aria-label="View cancellation policy"
                  >
                    View cancellation policy
                    <svg
                      className="w-4 h-4 ml-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 flex items-center">
                  <svg
                    className="w-5 h-5 text-gray-700 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Important information
                </h3>
                <ul className="space-y-2">
                  {hotelBookings[0].importantInfo.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-gray-400 mr-2 mt-1">•</span>
                      <span className="text-gray-500">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Section - Price Summary */}
            <div className="lg:w-96 border-t lg:border-l p-4 sm:p-6 md:p-8 !bg-gray-50">
              <div className="sticky top-4 sm:top-8">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">
                  Price Summary
                </h3>

                <div className="!bg-white border !border-gray-200 rounded-lg p-4 sm:p-5 mb-4 sm:mb-6 shadow-sm">
                  <div className="space-y-3 sm:space-y-4">
                    <div className="flex justify-between">
                      <div>
                        <p className="font-medium text-gray-800">
                          {hotelBookings[0].rooms} Room × {nights} Night
                          {nights > 1 ? "s" : ""}
                        </p>
                        <p className="text-sm text-gray-500">Base Price</p>
                      </div>
                      <p className="font-medium text-gray-800">
                        ₹{(hotelBookings[0].basePricePerNight * nights).toLocaleString()}
                      </p>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <p className="font-medium text-gray-800 mr-1">
                          Taxes & Fees
                        </p>
                        <FiInfo className="text-gray-400 text-sm" />
                      </div>
                      <p className="font-medium text-gray-800">
                        ₹{(
                          hotelBookings[0].basePricePerNight *
                          nights *
                          hotelBookings[0].hotelTaxesPercentage
                        ).toLocaleString()}
                      </p>
                    </div>

                    {appliedCoupon && (
                      <div className="flex justify-between items-center !bg-green-50 p-2 rounded">
                        <div className="flex items-center">
                          <p className="font-medium text-green-800 mr-1">
                            Discount ({appliedCoupon.code})
                          </p>
                          <button
                            onClick={handleRemoveCoupon}
                            className="text-gray-400 hover:text-gray-600 ml-1"
                            aria-label="Remove coupon"
                          >
                            <FiX className="w-3 h-3" />
                          </button>
                        </div>
                        <p className="font-medium text-green-800">
                          -₹{(totalPrice * appliedCoupon.discount).toLocaleString()}
                        </p>
                      </div>
                    )}

                    <div className="border-t pt-3 sm:pt-4 flex justify-between font-semibold text-gray-900">
                      <span>Total Amount</span>
                      <span>₹{calculateFinalPrice().toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className="!bg-white border !border-gray-200 rounded-lg p-4 sm:p-5 mb-4 sm:mb-6 shadow-sm">
                  <h4 className="font-semibold text-gray-800 mb-3">
                    Apply Coupon
                  </h4>
                  <div className="flex">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="Enter coupon code"
                      className="flex-1 border !border-gray-300 rounded-l-lg px-3 sm:px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      disabled={appliedCoupon !== null}
                      aria-label="Coupon code"
                    />
                    <button
                      onClick={appliedCoupon ? handleRemoveCoupon : handleApplyCoupon}
                      disabled={isLoading || !couponCode.trim()}
                      className={`px-3 sm:px-4 py-2 rounded-r-lg transition-colors ${appliedCoupon
                        ? "!bg-red-500 !hover:bg-red-600 !text-white"
                        : isLoading
                          ? "!bg-blue-400 !text-white cursor-not-allowed"
                          : couponCode.trim()
                            ? "!bg-blue-600 hover:!bg-blue-700 text-white"
                            : "!bg-gray-200 text-gray-400 cursor-not-allowed"
                        }`}
                      aria-label={appliedCoupon ? "Remove coupon" : "Apply coupon"}
                    >
                      {isLoading ? (
                        "Applying..."
                      ) : appliedCoupon ? (
                        "Remove"
                      ) : (
                        "Apply"
                      )}
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Try <span className="font-medium">DISCOUNT10</span> or{" "}
                    <span className="font-medium">DISCOUNT20</span>
                  </p>
                  <div className="!bg-yellow-50 text-yellow-800 text-xs p-2 rounded mt-3 text-center border !border-yellow-100">
                    MMT Gift Cards can be applied at payment step
                  </div>
                </div>

                <button
                  onClick={handlePayment}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-3 px-4 rounded-lg shadow-md transition-all transform hover:scale-[1.01]"
                  aria-label="Proceed to payment"
                >
                  Proceed to Payment
                </button>

                <div className="mt-3 sm:mt-4 flex items-center text-xs text-gray-500">
                  <svg
                    className="w-4 h-4 mr-2 text-gray-400 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                  Secure SSL encrypted payment
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Guest Details Form */}
        <div className="!bg-white rounded-xl shadow-lg overflow-hidden mb-6 border !border-gray-200">
          <div className="p-4 sm:p-6 md:p-8 border-b">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center">
              <svg
                className="w-5 sm:w-6 h-5 sm:h-6 !text-blue-500 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              Guest Details
            </h2>


            {guests.map((guest, index) => (
              <div
                key={guest.id}
                className={`mb-8 ${index > 0 ? "border-t pt-6" : ""}`}
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium text-gray-900 flex items-center">
                    <svg
                      className="w-5 h-5 text-gray-500 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    Guest {index + 1} {index === 0 && "(Primary)"}
                  </h3>
                  {index > 0 && (
                    <button
                      onClick={() => handleRemoveGuest(guest.id)}
                      className="text-red-600 hover:text-red-800 text-sm flex items-center"
                    >
                      <FiX className="mr-1" />
                      Remove
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="relative">
                    <select
                      value={guest.title}
                      onChange={(e) =>
                        handleGuestChange(index, "title", e.target.value)
                      }
                      className="w-full border !border-gray-300 rounded-lg px-4 py-3 pr-8 appearance-none !bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="MR">Mr</option>
                      <option value="MRS">Mrs</option>
                      <option value="MS">Ms</option>
                      <option value="DR">Dr</option>
                    </select>
                    <FiChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  </div>

                  <div className="md:col-span-1">
                    <input
                      type="text"
                      value={guest.firstName}
                      onChange={(e) =>
                        handleGuestChange(index, "firstName", e.target.value)
                      }
                      placeholder="First Name *"
                      className="w-full border !border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:!border-blue-500"
                      required
                    />
                  </div>

                  <div className="md:col-span-1">
                    <input
                      type="text"
                      value={guest.lastName}
                      onChange={(e) =>
                        handleGuestChange(index, "lastName", e.target.value)
                      }
                      placeholder="Last Name *"
                      className="w-full border !border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>

                  <div className="md:col-span-1">
                    <input
                      type="email"
                      value={guest.email}
                      onChange={(e) =>
                        handleGuestChange(index, "email", e.target.value)
                      }
                      placeholder="Email (Optional)"
                      className="w-full border !border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div className="md:col-span-1">
                    <input
                      type="tel"
                      value={guest.phone}
                      onChange={(e) =>
                        handleGuestChange(index, "phone", e.target.value)
                      }
                      placeholder="Phone Number *"
                      className="w-full border !border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={handleAddGuest}
              disabled={guests.length >= 5}
              className={`flex items-center ${guests.length >= 5
                ? "text-gray-400 cursor-not-allowed"
                : "text-blue-600 hover:text-blue-800"
                } font-medium`}
            >
              <FiPlus className="mr-2" />
              Add Guest {guests.length >= 5 && "(Max 5 guests)"}
            </button>
          </div>
        </div>

        {/* Login Banner */}
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-6 flex flex-col md:flex-row items-center justify-between border border-blue-200">
          <div className="flex items-center mb-4 md:mb-0">
            <svg
              className="w-6 h-6 text-blue-600 mr-3 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
              />
            </svg>
            <p className="text-gray-800">
              Login to prefill traveller details and get access to secret deals
            </p>
          </div>
          <button
            onClick={() => navigate("/login")}
            className="!bg-white text-blue-600 font-semibold py-2 px-6 rounded-lg hover:!bg-gray-50 transition-colors whitespace-nowrap shadow-sm border border-gray-200"
          >
            Login / Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingDetails;