import { useState, useEffect, useRef } from "react";
import { Calendar, ChevronDown, Menu, X, User, LogOut } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { useAuth } from "../../context/AuthContext";

interface HeaderProps {
  backgroundImage?: string;
  onBookNow: () => void;
}

const Header = ({ backgroundImage, onBookNow }: HeaderProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const profileDropdownRef = useRef<HTMLDivElement>(null);
  const { isAuthenticated, user, logout } = useAuth();

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node) &&
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false);
        setIsProfileDropdownOpen(false);
      }
    };

    if (isMobileMenuOpen || isProfileDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "auto";
    };
  }, [isMobileMenuOpen, isProfileDropdownOpen]);

  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
    setIsMobileMenuOpen(false);
  };

  const navigationItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Facilities", path: "/facilities" },
    { name: "Rooms", path: "/rooms" },
    { name: "Contact Us", path: "/contact" },
    ...(!isAuthenticated ? [{ name: "SignUp", path: "/register" }] : []),
  ];

  const isActivePath = (path: string): boolean => {
    return location.pathname === path;
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setIsProfileDropdownOpen(false);
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    setIsProfileDropdownOpen(false);
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-white">
      <div
        className="relative h-screen overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.4)), url('${
            backgroundImage ||
            "https://res.cloudinary.com/dbezoksfw/image/upload/v1749553010/Guest%20House/gabriel_ghnassia_A9h6OsAxTyQ_unsplash_1_coct9o.png"
          }')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <nav className="absolute top-0 left-0 right-0 z-50 px-4 md:px-16 py-0">
          <div className="w-full mx-auto flex items-center justify-between">
            <div
              className={`transform transition-all duration-1000 ${
                isVisible ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0"
              }`}
            >
              <div 
                className="!bg-[#E0B973] px-4 md:px-6 py-2 md:py-3 rounded-b-2xl cursor-pointer"
                onClick={() => handleNavigation("/")}
              >
                <div className="!text-white font-bold text-base md:text-lg tracking-wider">
                  BOTHRA
                  <div className="text-xs font-normal tracking-widest opacity-90">
                    Guest House
                  </div>
                </div>
              </div>
            </div>

            <div
              className={`hidden md:flex items-center space-x-8 transform transition-all duration-1000 delay-200 ${
                isVisible ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0"
              }`}
            >
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`!text-white font-medium tracking-wide transition-all duration-300 hover:!text-amber-400 hover:scale-105 relative pb-2 ${
                    isActivePath(item.path)
                      ? "border-b-2 border-white"
                      : "hover:border-b-2 hover:border-amber-400"
                  }`}
                >
                  {item.name}
                </Link>
              ))}

              {isAuthenticated ? (
                <div className="relative" ref={profileDropdownRef}>
                  <button
                    onClick={toggleProfileDropdown}
                    className="flex items-center space-x-1 !text-black font-medium tracking-wide transition-all duration-300 hover:!text-amber-400 hover:scale-105"
                  >
                    <User className="w-5 h-5" />
                    <span>{user?.name || "Account"}</span>
                  </button>

                  {isProfileDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 !bg-white rounded-md shadow-lg py-1 z-50">
                      <div className="px-4 py-2 text-sm !text-gray-700 border-b">
                        {user?.email}
                      </div>
                      {/* <button
                        onClick={() => {
                          handleNavigation("/profile");
                          setIsProfileDropdownOpen(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm !text-gray-700 hover:!bg-gray-100"
                      >
                        My Profile
                      </button> */}
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2 text-sm !text-red-600 hover:!bg-gray-100"
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to="/login"
                  className={`!text-white  font-medium tracking-wide transition-all duration-300 hover:!text-amber-400 hover:scale-105 relative pb-2 ${
                    isActivePath("/login")
                      ? "border-b-2 border-white"
                      : "hover:border-b-2 hover:border-amber-400"
                  }`}
                >
                  Log In
                </Link>
              )}
            </div>

            <div
              ref={mobileMenuRef}
              className={`md:hidden transform transition-all duration-1000 delay-200 ${
                isVisible ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0"
              }`}
            >
              <button
                onClick={toggleMobileMenu}
                className="!text-white !bg-black p-2 rounded-lg transition-colors duration-300 hover:!bg-white/20"
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>

              {isMobileMenuOpen && (
                <div className="absolute top-full right-0 mt-2 !bg-black/90 backdrop-blur-md rounded-lg min-w-[200px] shadow-2xl border border-white/20">
                  <div className="py-2">
                    {navigationItems.map((item) => (
                      <button
                        key={item.name}
                        onClick={() => handleNavigation(item.path)}
                        className={`block w-full text-left px-6 py-3 !text-white font-medium tracking-wide transition-all duration-300 hover:!bg-amber-400/20 hover:!text-amber-400 border-l-4 border-transparent ${
                          isActivePath(item.path)
                            ? "!bg-amber-400/10 border-amber-400 !text-amber-400"
                            : "hover:border-amber-400"
                        }`}
                      >
                        {item.name}
                      </button>
                    ))}

                    {isAuthenticated ? (
                      <>
                        <div className="px-6 py-3 !text-white border-t border-white/20">
                          <div className="text-sm">Logged in as:</div>
                          <div className="font-medium">{user?.name}</div>
                        </div>
                        <button
                          onClick={handleLogout}
                          className="block w-full text-left px-6 py-3 !text-white font-medium tracking-wide transition-all duration-300 hover:!bg-amber-400/20 hover:!text-amber-400 border-l-4 border-transparent"
                        >
                          Sign Out
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => handleNavigation("/login")}
                        className={`block w-full text-left px-6 py-3 !text-white font-medium tracking-wide transition-all duration-300 hover:!bg-amber-400/20 hover:!text-amber-400 border-l-4 border-transparent ${
                          isActivePath("/login")
                            ? "!bg-amber-400/10 border-amber-400 !text-amber-400"
                            : "hover:border-amber-400"
                        }`}
                      >
                        Sign In
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </nav>

        <div className="absolute inset-0 flex items-center justify-start px-4 md:px-16">
          <div className="max-w-7xl mx-auto w-full">
            <div className="max-w-2xl">
              <div
                className={`transform transition-all duration-1000 delay-500 ${
                  isVisible ? "translate-x-0 opacity-100" : "-translate-x-20 opacity-0"
                }`}
              >
                <p className="!text-white/90 text-sm md:text-lg lg:text-xl font-light tracking-widest mb-2 md:mb-4">
                  WELCOME TO
                </p>
              </div>

              <div
                className={`transform transition-all duration-1000 delay-700 ${
                  isVisible ? "translate-x-0 opacity-100" : "-translate-x-20 opacity-0"
                }`}
              >
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl font-bold !text-white leading-none mb-2 md:mb-4">
                  BOTHRA
                  <span className="block text-xl sm:text-2xl md:text-3xl lg:text-5xl xl:text-6xl font-light tracking-widest opacity-90 mt-1 md:mt-2">
                    GUEST HOUSE
                  </span>
                </h1>
              </div>

              <div
                className={`transform transition-all duration-1000 delay-900 ${
                  isVisible ? "translate-x-0 opacity-100" : "-translate-x-20 opacity-0"
                }`}
              >
                <p className="!text-white/80 text-sm sm:text-base md:text-lg font-light leading-relaxed mb-6 md:mb-8 max-w-md">
                  Book your stay and enjoy Luxury
                  <br />
                  redefined at the most affordable rates.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div
          className={`absolute bottom-20 sm:bottom-24 left-1/2 transform -translate-x-1/2 transition-all duration-1000 delay-1100 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <button
            onClick={onBookNow}
            className="group !bg-[#E0B973] hover:!from-amber-600 hover:!to-amber-700 !text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-lg"
          >
            <span className="flex items-center space-x-2">
              <Calendar className="w-5 sm:w-6 h-5 sm:h-6" />
              <span className="tracking-wide text-sm sm:text-base">
                BOOK NOW
              </span>
            </span>
          </button>
        </div>

        <div
          className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 transition-all duration-1000 delay-1300 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="text-center !text-white">
            <p className="text-xs sm:text-sm font-light tracking-widest mb-2 sm:mb-4">
              Scroll
            </p>
            <Button
              onClick={scrollToContent}
              className="animate-bounce !bg-white rounded-full w-10 sm:w-12 h-10 sm:h-12 hover:animate-none transition-all duration-300 hover:scale-110"
            >
              <ChevronDown className="w-5 sm:w-6 h-5 sm:h-6 mx-auto !text-black hover:!text-amber-400" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;