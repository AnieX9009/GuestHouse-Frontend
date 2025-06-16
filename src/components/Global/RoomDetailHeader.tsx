import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const RoomDetailHeader = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Trigger entrance animations
    setTimeout(() => setIsVisible(true), 300);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMobileMenuOpen &&
        !(event.target as Element).closest(".mobile-menu-container")
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener("click", handleClickOutside);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  // Navigation items with their corresponding routes
  const navigationItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Facilities", path: "/facilities" },
    { name: "Rooms", path: "/rooms" },
    { name: "Contact Us", path: "/contact" },
    { name: "SingUp", path: "/register" },
  ];

  // Check if current path matches navigation item
  const isActivePath = (path: string): boolean => {
    return location.pathname === path;
  };

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Close mobile menu when a link is clicked
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="bg-white">
      {/* Contact Header Section */}
      <div
        className="relative h-[250px] sm:h-[300px] md:h-[350px] overflow-hidden"
        style={{
          backgroundColor: "#14274A",
        }}
      >
        {/* Navigation */}
        <nav className="absolute top-0 left-0 right-0 z-50 px-4 md:px-16 py-0">
          <div className="w-full mx-auto flex items-center justify-between">
            {/* Logo */}
            <div
              className={`transform transition-all duration-1000 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "-translate-y-10 opacity-0"
              }`}
            >
              <Link to="/" className="bg-[#E0B973] px-4 md:px-6 py-2 md:py-3 rounded-b-2xl block">
                <div className="text-white font-bold text-base md:text-lg tracking-wider">
                  LUXURY
                  <div className="text-xs font-normal tracking-widest opacity-90">
                    HOTEL
                  </div>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <div
              className={`hidden md:flex items-center space-x-8 transform transition-all duration-1000 delay-200 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "-translate-y-10 opacity-0"
              }`}
            >
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`!text-white font-medium tracking-wide transition-all duration-300 hover:text-amber-400 hover:scale-105 relative pb-2 ${
                    isActivePath(item.path)
                      ? "border-b-2 border-white text-amber-400"
                      : "hover:border-b-2 hover:border-amber-400"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <div
              className={`md:hidden transform transition-all duration-1000 delay-200 mobile-menu-container ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "-translate-y-10 opacity-0"
              }`}
            >
              <button
                onClick={toggleMobileMenu}
                className="!text-white p-2 rounded-lg transition-colors duration-300 hover:bg-white/20"
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>

              {/* Mobile Menu Dropdown */}
              {isMobileMenuOpen && (
                <div className="absolute top-full right-0 mt-2 bg-black/90 backdrop-blur-md rounded-lg min-w-[200px] shadow-2xl border border-white/20 z-50">
                  <div className="py-2">
                    {navigationItems.map((item) => (
                      <Link
                        key={item.name}
                        to={item.path}
                        onClick={closeMobileMenu}
                        className={`block px-6 py-3 text-white font-medium tracking-wide transition-all duration-300 hover:bg-amber-400/20 hover:text-amber-400 border-l-4 border-transparent ${
                          isActivePath(item.path)
                            ? "bg-amber-400/10 border-amber-400 text-amber-400"
                            : "hover:border-amber-400"
                        }`}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </nav>

        {/* Contact Header Content */}
        <div className="absolute inset-0 flex items-center justify-center px-4 md:px-6">
          <div className="text-center">
            {/* Main Title */}
            <div
              className={`transform transition-all duration-1000 delay-700 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-20 opacity-0"
              }`}
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white leading-none tracking-widest">
                ROOM-DETAILS
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetailHeader;