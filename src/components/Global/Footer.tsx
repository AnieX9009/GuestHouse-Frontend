import { useState } from "react";
import { Facebook, Twitter, Instagram } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = () => {
    if (email) {
      console.log("Subscribing email:", email);
      setEmail("");
    }
  };

  return (
    <footer className="bg-[#14274A] text-white py-8 px-4 md:px-16">
      <div className="w-full mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Address */}
          <div className="col-span-1 md:col-span-1">
            <div className="mb-6">
              <div className="bg-[#E0B973] px-4 py-2 rounded-lg inline-block mb-4">
                <div className="text-white font-bold text-sm tracking-wider">
                  BOTHRA
                  <div className="text-xs font-normal tracking-widest opacity-90">
                    Guest House
                  </div>
                </div>
              </div>
            </div>
            <div className="text-sm text-white leading-relaxed">
              <p>
                P-1, CIT Rd Scheme 6M, above Bata Showroom, Kadapara, Phool
                Bagan, Kankurgachi, Kolkata, West Bengal 700054
              </p>
              <p>+91-9830536736</p>
              <p>bothraguesthouse@gmail.com</p>
            </div>
          </div>

          {/* About Us */}
          <div className="col-span-1">
            <ul className="space-y-3 text-sm ">
              <li>
                <Link
                  to="/contact"
                  className="hover:text-amber-400 !text-white transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="hover:text-amber-400 !text-white transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="hover:text-amber-400 !text-white transition-colors"
                >
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="col-span-1">
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Facebook className="w-4 h-4 text-white fill-white" />
                <Link
                  to="#"
                  className="text-sm !text-white hover:text-amber-400 transition-colors"
                >
                  Facebook
                </Link>
              </div>
              <div className="flex items-center space-x-3">
                <Twitter className="w-4 h-4 !text-white fill-white" />
                <Link
                  to="#"
                  className="text-sm !text-white hover:text-amber-400 transition-colors"
                >
                  Twitter
                </Link>
              </div>
              <div className="flex items-center space-x-3">
                <Instagram className="w-4 h-4 !text-white" />
                <Link
                  to="#"
                  className="text-sm !text-white hover:text-amber-400 transition-colors"
                >
                  Instagram
                </Link>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="col-span-1">
            <h3 className="text-white font-semibold mb-4 text-sm tracking-wide">
              Subscribe to our newsletter
            </h3>
            <div className="flex">
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-3 py-2 bg-transparent border border-[#E0B973] rounded-none text-sm text-white placeholder-gray-400 focus:outline-none focus:border-amber-400"
              />
              <Button
                onClick={handleSubscribe}
                className="!bg-[#E0B973] hover:!bg-amber-600 !text-white !px-4 !py-2 !rounded-none text-sm font-medium transition-colors"
              >
                OK
              </Button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
