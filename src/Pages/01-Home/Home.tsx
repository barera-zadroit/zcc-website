  import React, { useState,useEffect, useRef } from "react";
  import { Link, useLocation } from "react-router-dom";
  import { motion } from "framer-motion"; // ✅ Added
  import heroImg1 from "../../assets/Home1.jpg";
  import heroImg2 from "../../assets/Home2.jpg";
 import heroImg3 from "../../assets/Home3.jpg";
 import contact from "../../assets/CONTACT.jpg"
 import bgImage from "../../assets/ground1.jpg";

  import aboutImg from "../../assets/About.jpg";
  import foodImage from "../../assets/Food.jpg";
  import groundBooking from "../../assets/Ground.jpg";
  import teamAccommodation from "../../assets/Room1.jpg";
  import Blogs from "../04-Blogs/Blogs";
  import Achievements from "../05-Achievements/Achievements";
  import Feedback from "../../Component/Feedback/Feedback";




  const Home: React.FC = () => {
    const location = useLocation();

    const aboutRef = useRef<HTMLElement>(null);
    const servicesRef = useRef<HTMLElement>(null);
    const blogsRef = useRef<HTMLElement>(null);
    const achievementsRef = useRef<HTMLElement>(null);
    const contactRef = useRef<HTMLElement>(null);

    const images = [heroImg1, heroImg2, heroImg3];
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto change every 2 seconds
  useEffect(() => {
  const interval = setInterval(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  }, 2000); // ⬅️ 7 seconds per slide
  return () => clearInterval(interval);
}, [images.length]);


    useEffect(() => {
      const map: Record<string, React.RefObject<HTMLElement | null>> = {
        "/about": aboutRef,
        "/services": servicesRef,
        "/blogs": blogsRef,
        "/achievements": achievementsRef,
        "/contact": contactRef,
        "/": { current: document.documentElement } as React.RefObject<HTMLElement>,
      };

      const ref = map[location.pathname];
      if (!ref) return;

      const el = ref.current;
      if (el === document.documentElement) {
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }

      if (el) {
        const headerOffset = 72;
        const elementPosition = el.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - headerOffset;
        window.scrollTo({ top: offsetPosition, behavior: "smooth" });
      }
    }, [location]);

    // New contact form state and handlers
    const [formData, setFormData] = React.useState({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });

   
    const handleChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
) => {
  const { name, value } = e.target;

  if (name === "phone") {
    // only digits, max 10
    if (/^\d{0,10}$/.test(value)) {
      setFormData({ ...formData, phone: value });
    }
  } else {
    setFormData({ ...formData, [name]: value });
  }
};


    const validateForm = () => {
      if (!formData.name.trim()) {
        alert("Please enter your name");
        return false;
      }
      if (!formData.email.trim()) {
        alert("Please enter your email");
        return false;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        alert("Please enter a valid email");
        return false;
      }
      if (!formData.subject.trim()) {
        alert("Please enter the subject");
        return false;
      }
      if (!formData.message.trim()) {
        alert("Please enter your message");
        return false;
      }
      return true;
    };

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();

      if (!validateForm()) return;

      const { name, email, phone, subject, message } = formData;

      const mailto = `https://mail.google.com/mail/?view=cm&fs=1&to=info@zadroit.com&su=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message}`
      )}`;

      window.open(mailto, "_blank");
    };
    

    return (
      // <div className="text-[#102A43]">
      <div className="text-[#090a58] overflow-x-hidden">

      {/* HERO */}
<section
  aria-label="Hero"
   id="home" 
  className="relative flex items-center justify-center text-center text-white overflow-hidden h-[100vh]"
>
  {/* Image Slider with Smooth Fade Animation */}
  <div className="absolute inset-0">
    {images.map((img, i) => (
      <motion.div
  key={i}
  initial={{ opacity: 0 }}
  animate={{ opacity: i === currentIndex ? 1 : 0 }}
  transition={{ duration: 1.5, ease: "easeInOut" }} // ✅ smoother fade
  className="absolute inset-0"
  style={{
    backgroundImage: `linear-gradient(rgba(6,10,15,0.70), rgba(6,10,15,0.45)), url(${img})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  }}
/>

    ))}
  </div>

  <div className="relative z-10 w-full max-w-6xl px-6 py-28 md:py-36 lg:py-44">
    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight drop-shadow-md" style={{fontFamily:"DM Sans"}}>
      ZadBy Cricket Club
    </h1>
    <p className="mt-4 text-sm sm:text-base lg:text-xl lg:mt-2 md:text-lg text-white/90 max-w-3xl mx-auto"style={{fontFamily:"DM Sans"}} >
      Book your ground and enjoy playing the game
    </p>

    <div className="mt-8 flex items-center justify-center gap-4">
      <Link
        to="/contact"
        className="inline-block bg-[#fdbe1b] hover:bg-[#a91632] text-white font-semibold px-6 py-3 rounded-md shadow-lg transition"
        aria-label="Book Ground Now"
      >
        Book Now
      </Link>
    </div>
  </div>

  {/* Dots Indicator */}
  <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
    {images.map((_, i) => (
      <button
        key={i}
        onClick={() => setCurrentIndex(i)}
        className={`w-3 h-3 rounded-full transition ${
          i === currentIndex ? "bg-white" : "bg-gray-400"
        }`}
      />
    ))}
  </div>
</section>



        {/* ABOUT */}
       
       <motion.section
  id="about"
  ref={aboutRef as React.LegacyRef<HTMLElement>}
  aria-label="About ZadBy Cricket Club"
  className="bg-white py-16"
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.3 }}
  transition={{ staggerChildren: 0.3 }}
>
  <div className="max-w-6xl mx-auto px-6">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
      
      {/* Left Content (Text) */}
      <motion.div
        variants={{
          hidden: { opacity: 0, x: -120 },
          visible: { opacity: 1, x: 0 },
        }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4" style={{fontFamily:"DM Sans"}}>About Us</h2>
        <p className="text-lg text-slate-700 mb-6 leading-relaxed text-justify" style={{fontFamily:"DM Sans"}}>
          Zadby Cricket Club (ZCC) has been established to support players, academies, schools, and sports
          organizers by offering a professional and reliable sports environment.
          All ground bookings and tournament arrangements are efficiently managed through the ZadSports App,
          ensuring a seamless experience from planning to execution.
          ZCC is located at ARRS Academy School in Salem and has proudly hosted numerous youth and
          women’s cricket tournaments. We are committed to promoting grassroots talent and fostering the
          growth of organized sports.
        </p>

        <div className="mt-6 flex flex-wrap gap-6">
          <div className="min-w-[140px]">
            <div className="text-2xl font-extrabold text-[#fdbe1b] text-justify">500+</div>
            <div className="text-sm text-slate-600 " style={{fontFamily:"DM Sans"}}>Matches Hosted</div>
          </div>

          <div className="min-w-[140px]">
            <div className="text-2xl font-extrabold text-[#fdbe1b] text-justify">50+</div>
            <div className="text-sm text-slate-600" style={{fontFamily:"DM Sans"}}>Team Accommodation</div>
          </div>

          <div className="min-w-[140px]">
            <div className="text-2xl font-extrabold text-[#fdbe1b] text-justify">Food</div>
            <div className="text-sm text-slate-600">Catered (₹500 / person / day)</div>
          </div>
        </div>
      </motion.div>

      {/* Right Content (Image) */}
      <motion.div
        className="order-first md:order-last"
        variants={{
          hidden: { opacity: 0, x: 120 },
          visible: { opacity: 1, x: 0 },
        }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <img
          src={aboutImg}
          alt="ZCC facilities"
          className="w-full h-64 md:h-80 object-cover rounded-xl shadow-lg"
        />
      </motion.div>
    </div>
  </div>
</motion.section>
    
      


        {/* SERVICES */}

  <motion.section
  id="services"
  ref={servicesRef as React.LegacyRef<HTMLElement>}
  className="bg-blue-50 py-16 px-6"
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.2 }}
  transition={{ staggerChildren: 0.3 }}
>
  <div className="max-w-7xl mx-auto text-center mb-12">
    <h2 className="text-3xl sm:text-4xl font-bold  mb-4 text-[#fdbe1b]" style={{fontFamily:"DM Sans"}}>Our Services</h2>
    <p className="text-lg text-gray-600" style={{fontFamily:"DM Sans"}}>
      We provide complete cricket ground facilities for players, teams, and corporate tournaments.
    </p>
  </div>

  <div className="grid gap-8 md:grid-cols-3 max-w-7xl mx-auto">
    {/* Ground Booking */}
    <motion.div
      className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer"
      variants={{
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1 },
      }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{ scale: 1.05, boxShadow: "0px 8px 24px rgba(0,0,0,0.15)" }}
      whileTap={{ scale: 0.98 }}
    >
      <img
        src={groundBooking}
        alt="Ground Booking"
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2 text-[#fdbe1b] " style={{fontFamily:"DM Sans"}}>Ground Booking</h3>
        <p className="text-gray-700 text-sm" style={{fontFamily:"DM Sans"}}>
          Available for matches, practice sessions, and multi-day tournaments.
          Open to academies, schools, clubs, and corporate teams.
          All bookings are managed digitally via the ZadSports App.
        </p>
      </div>
    </motion.div>

    {/* Team Accommodation */}
    <motion.div
      className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer"
      variants={{
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1 },
      }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{ scale: 1.05, boxShadow: "0px 8px 24px rgba(0,0,0,0.15)" }}
      whileTap={{ scale: 0.98 }}
    >
      <img
        src={teamAccommodation}
        alt="Team Accommodation"
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2 text-[#fdbe1b]" style={{fontFamily:"DM Sans"}}>Team Accommodation</h3>
        <p className="text-gray-700 text-sm" style={{fontFamily:"DM Sans"}}>
          Free accommodation is provided for teams participating in multi-day tournaments,
          ensuring a comfortable stay during the event.
        </p>
      </div>
    </motion.div>

    {/* Food Facilities */}
    <motion.div
      className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer"
      variants={{
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1 },
      }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{ scale: 1.05, boxShadow: "0px 8px 24px rgba(0,0,0,0.15)" }}
      whileTap={{ scale: 0.98 }}
    >
      <img
        src={foodImage}
        alt="Food Facilities"
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2 text-[#fdbe1b]" style={{fontFamily:"DM Sans"}}>Food Facilities</h3>
        <p className="text-gray-700 text-sm" style={{fontFamily:"DM Sans"}} >
          Meals at ₹500 per person/day including Breakfast, Lunch,
          Evening Snacks, and Dinner. Prepared hygienically with nutrition in mind.
        </p>
      </div>
    </motion.div>
  </div>
</motion.section>

  {/* BLOGS */}
  <section id="blogs" ref={blogsRef as React.LegacyRef<HTMLElement>}>
    <Blogs />
  </section>

  {/* ACHIEVEMENTS */}
  <section className="" id="achievements" ref={achievementsRef as React.LegacyRef<HTMLElement>}>
    <Achievements />
  </section>

  {/* FEEDBACK */}
<section id="feedback" className="">
  <Feedback />
</section>

{/* contact */}
<section
  id="contact"
  ref={contactRef as React.LegacyRef<HTMLElement>}
  className="relative w-full px-4 py-6 bg-gray-50"
  aria-label="Contact ZadBy Cricket Club"
>
  {/* 🔹 Background */}
  <div
    className="absolute inset-0 bg-cover bg-center blur-sm"
    style={{ backgroundImage: `url(${bgImage})` }}
  ></div>
  <div className="absolute inset-0 bg-black/30"></div>

  {/* 🔹 Content */}
  <div className="relative z-10 max-w-6xl mx-auto" >
    <h2 className="text-2xl font-semibold text-center mb-6 text-[#090a58]" style={{fontFamily:"DM Sans"}}>
      Contact Us
    </h2>

    <div className="flex flex-col md:flex-row items-stretch gap-6">
      {/* Left Side Image */}
      <motion.div
        className="flex-shrink-0 w-full md:w-[40%] flex"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <img
          src={contact}
          alt="Contact illustration"
          className="rounded-lg shadow-lg object-cover w-full h-[400px]"
        />
      </motion.div>

      {/* Contact Form */}
      <motion.form
        onSubmit={handleSubmit}
        className="flex-1 bg-white rounded-lg shadow-lg p-6 flex flex-col justify-between h-[400px]"
        noValidate
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {/* Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block mb-1 text-sm font-medium text-gray-700" style={{fontFamily:"DM Sans"}}>
              Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full px-3 py-2 border rounded-md text-sm focus:ring-2 focus:ring-[#090a58]"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block mb-1 text-sm font-medium text-gray-700" style={{fontFamily:"DM Sans"}}>
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your number"
              className="w-full px-3 py-2 border rounded-md text-sm focus:ring-2 focus:ring-[#090a58]"
              maxLength={10}
              pattern="\d{10}"
            />
          </div>

          <div>
            <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-700" style={{fontFamily:"DM Sans"}}>
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full px-3 py-2 border rounded-md text-sm focus:ring-2 focus:ring-[#090a58]"
            />
          </div>

          <div>
            <label htmlFor="subject" className="block mb-1 text-sm font-medium text-gray-700" style={{fontFamily:"DM Sans"}}>
              Subject *
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Enter your subject"
              className="w-full px-3 py-2 border rounded-md text-sm focus:ring-2 focus:ring-[#090a58]"
            />
          </div>
        </div>

        {/* Textarea */}
        <div className="mt-3 flex-1">
          <label htmlFor="message" className="block mb-1 text-sm font-medium text-gray-700" style={{fontFamily:"DM Sans"}}>
            Message *
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Write your message here..."
            className="w-full px-3 py-2 border rounded-md text-sm focus:ring-2 focus:ring-[#090a58] resize-none overflow-y-auto"
            style={{ height: "120px", maxHeight: "120px" }}
          ></textarea>
        </div>

        {/* Button */}
        <div className="mt-4 flex justify-center">
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-[#fdbe1b] hover:bg-[#a91632] text-white px-6 py-2 rounded-md text-sm font-semibold transition duration-300" style={{fontFamily:"DM Sans"}}
          >
            Send Message
          </motion.button>
        </div>
      </motion.form>
    </div>
  </div>
</section>





      </div>
    );
  };

  export default Home;
