import React, { useState } from "react";
import { Link } from "react-router-dom";
import logoImg from "../../assets/logo.png"; // transparent logo preferred
import { Menu, X } from "lucide-react"; // for toggle icons

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/services", label: "Services" },
    { to: "/blogs", label: "Blogs" },
    { to: "/achievements", label: "Achievements" },
    { to: "/contact", label: "Contact Us" }
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#18223d] text-white shadow-lg">
      <div className="flex justify-between items-center px-8 py-4">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <img
            src={logoImg}
            alt="Logo"
            className="h-16 w-auto "
          />
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:block">
          <ul className="flex gap-6 text-lg font-medium">
            {navLinks.map((link, index) => (
              <li key={index}>
                <Link
                  to={link.to}
                  className="hover:text-gray-200 transition-colors duration-200"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-[#ff9800] px-8 pb-4">
          <ul className="flex flex-col gap-4 text-lg font-medium">
            {navLinks.map((link, index) => (
              <li key={index}>
                <Link
                  to={link.to}
                  onClick={() => setIsOpen(false)}
                  className="hover:text-gray-200 transition-colors duration-200"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
