import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const AboutHeader = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Trigger entrance animations
    setTimeout(() => setIsVisible(true), 300);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMobileMenuOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node) &&
        menuButtonRef.current &&
        !menuButtonRef.current.contains(event.target as Node)
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
    { name: "Sign Up", path: "/register" },
  ];

  // Check if current path matches navigation item
  const isActivePath = (path: string): boolean => {
    return location.pathname === path;
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="bg-white">
      {/* About Header Section */}
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
              className={`md:hidden transform transition-all duration-1000 delay-200 ${
                isVisible ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0"
              }`}
            >
              <button
                ref={menuButtonRef}
                onClick={toggleMobileMenu}
                className="!text-white !bg-black p-2 rounded-lg transition-colors duration-300 hover:bg-white/20"
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu Dropdown - Full Screen */}
          {isMobileMenuOpen && (
            <div 
              ref={mobileMenuRef}
              className="md:hidden fixed inset-0 !bg-black/95 backdrop-blur-md z-40 mt-16 overflow-y-auto"
            >
              <div className="flex flex-col space-y-1 pt-4 pb-8">
                {navigationItems.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => handleNavigation(item.path)}
                    className={`px-8 py-4 text-left !bg-black text-white text-lg font-medium tracking-wide transition-all duration-300 ${
                      isActivePath(item.path)
                        ? "!bg-amber-400/10 !text-amber-400"
                        : "hover:!bg-amber-400/10 hover:!text-amber-400"
                    }`}
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </nav>

        {/* About Header Content */}
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
                ABOUT-US
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutHeader;