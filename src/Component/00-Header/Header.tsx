
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import logoImg from "../../assets/logo1.png";
import { Menu, X } from "lucide-react";

const navLinks = [
  { to: "/", label: "Home", id: "home" },
  { to: "/about", label: "About", id: "about" },
  { to: "/services", label: "Services", id: "services" },
  { to: "/blogs", label: "Blogs", id: "blogs" },
  { to: "/achievements", label: "Achievements", id: "achievements" },
  { to: "/feedback", label: "Feedback", id: "feedback" },
  { to: "/contact", label: "Contact Us", id: "contact" },
];

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("/");
  const location = useLocation();
  const navigate = useNavigate();

  // ✅ Scroll spy effect (always runs, not only on "/")
  useEffect(() => {
    const handleScroll = () => {
      let found = false;
      navLinks.forEach((link) => {
        const section = document.getElementById(link.id);
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            setActiveTab(link.to);
            found = true;
          }
        }
      });

      // ✅ fallback → highlight Home when no section matches
      if (!found) setActiveTab("/");
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  // ✅ Handle nav clicks (update URL + scroll)
  const handleNavClick = (link: { to: string; id: string }) => {
    setIsOpen(false);
    setActiveTab(link.to);

    if (link.to === "/") {
      if (location.pathname !== "/") {
        navigate("/");
        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }, 100);
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } else {
      // Always stay on home page
      if (location.pathname !== "/") {
        navigate("/", { replace: true });
        setTimeout(() => {
          const section = document.getElementById(link.id);
          if (section) {
            section.scrollIntoView({ behavior: "smooth" });
          }
        }, 200);
      } else {
        const section = document.getElementById(link.id);
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
        }
      }
    }

  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#18223d] text-white shadow-lg font-semibold">
      <div className="flex justify-between items-center px-8 py-4">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <img src={logoImg} alt="Logo" className="h-16 w-auto" />
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:block">
          <ul className="flex gap-6 text-lg font-medium">
            {navLinks.map((link) => (
              <li key={link.to}>
                <button
                  onClick={() => handleNavClick(link)}
                  className={`transition-colors duration-200 ${activeTab === link.to
                    ? "text-[#d9a477]"
                    : "text-white hover:text-[#d9a477]"
                    }`}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-[#18223d] px-8 pb-4">
          <ul className="flex flex-col gap-4 text-lg font-medium">
            {navLinks.map((link) => (
              <li key={link.to}>
                <button
                  onClick={() => handleNavClick(link)}
                  className={`transition-colors duration-200 ${activeTab === link.to
                    ? "text-[#d9a477]"
                    : "text-white hover:text-[#d9a477]"
                    }`}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;

