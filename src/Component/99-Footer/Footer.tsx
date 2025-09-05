import React from "react";
import { Link } from "react-router-dom";
import '@fortawesome/fontawesome-free/css/all.min.css';


const Footer: React.FC = () => {
  return (
    <footer className="bg-[#17203a] text-white pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* About Section */}
        <div>
          <h3 className="text-xl font-bold text-[#fdbe1b] mb-4">ZadBy Cricket Club</h3>
          <p className="text-gray-300 text-sm leading-relaxed mb-4">
            A premium sports ground in Salem, Tamil Nadu the perfect venue for cricket matches,
            tournaments, and sporting events. Book, manage, and enjoy seamless sporting experiences.
          </p>
          <div className="flex gap-4 text-[#fdbe1b] text-lg">
            <a href="https://www.facebook.com/profile.php?id=61578385682690" aria-label="Facebook" className="hover:text-white transition">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="https://www.instagram.com/zadby_cricket_club/" aria-label="Instagram" className="hover:text-white transition">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="mailto:info@zadroit.com" aria-label="Email" className="hover:text-white transition">
              <i className="fas fa-envelope"></i>
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-bold text-[#d9a477] mb-4">Quick Links</h3>
          <ul className="space-y-2 text-gray-300">
            <li><Link to="/" className="hover:text-[#d9a477] transition">Home</Link></li>
            <li><Link to="/about" className="hover:text-[#d9a477] transition">About Us</Link></li>
            <li><Link to="/services" className="hover:text-[#d9a477] transition">Services</Link></li>
            <li><Link to="/blogs" className="hover:text-[#d9a477] transition">Blogs</Link></li>
            <li><Link to="/achievements" className="hover:text-[#d9a477] transition">Achievements</Link></li>
            <li><Link to="/contact" className="hover:text-[#d9a477] transition">Contact</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-bold text-[#d9a477] mb-4">Contact Us</h3>
          <p className="text-gray-300 text-sm"><strong>Contact Person:</strong> Venkat Raghavan</p>
          <p className="text-gray-300 text-sm"><strong>Phone:</strong> +91 98420 89689 / +91 89719 77840</p>
          <p className="text-gray-300 text-sm"><strong>Email:</strong> info@zadroit.com</p>
          <p className="text-gray-300 text-sm"><strong>Location:</strong> ARRS Academy School Cricket Ground, Salem, Tamil Nadu</p>
        </div>

        {/* Map */}
        <div>
          <h3 className="text-xl font-bold text-[#d9a477] mb-4">Find Us</h3>
          <iframe
            title="ZadBy Cricket Club Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d185.99299154859344!2d78.2623488485208!3d11.708103971461231!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3babf31228c2a261%3A0xd30146273fdbc091!2sARRS%20Academy%20%7C%20CBSE%20Senior%20Secondary%20School!5e1!3m2!1sen!2sin!4v1756962519807!5m2!1sen!2sin"
            width="100%"
            height="200"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>
      </div>

      <div className="mt-10 border-t border-gray-700 pt-4 text-center text-gray-400 text-sm">
        © {new Date().getFullYear()} ZadBy Cricket Club. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;




