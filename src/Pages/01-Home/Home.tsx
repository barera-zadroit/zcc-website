import React, { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";

// import heroImg from "../../assets/HOME-BG.jpg";
import heroImg from "../../assets/Home.jpg";
import aboutImg from "../../assets/About.jpg";
import foodImage from "../../assets/Food.jpg";
import groundBooking from "../../assets/Ground.jpg";
import teamAccommodation from "../../assets/team-accommodation.jpg";
import Blogs from "../04-Blogs/Blogs";
import Achievements from "../05-Achievements/Achievements";

const Home: React.FC = () => {
  const location = useLocation();

  const aboutRef = useRef<HTMLElement>(null);
  const servicesRef = useRef<HTMLElement>(null);
  const blogsRef = useRef<HTMLElement>(null);
  const achievementsRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);

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
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
    <div className="text-[#102A43]">

      {/* HERO */}
      <section
        aria-label="Hero"
        className="relative flex items-center justify-center text-center text-white"
        style={{
          backgroundImage: `linear-gradient(rgba(6,10,15,0.45), rgba(6,10,15,0.45)), url(${heroImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="w-full max-w-6xl px-6 py-28 md:py-36 lg:py-44">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight drop-shadow-md">
            ZadBy Cricket Club
          </h1>
          <p className="mt-4 text-sm sm:text-base md:text-lg text-white/90 max-w-3xl mx-auto">
            Book your ground and enjoy playing the game
          </p>

          <div className="mt-8 flex items-center justify-center gap-4">
            <Link
              to="/contact"
              className="inline-block bg-[#21254a] hover:bg-blue-400 text-white font-semibold px-6 py-3 rounded-md shadow-lg transition"
              aria-label="Book Ground Now"
            >
              Book Now
            </Link>
          </div>
        </div>
        <div className="absolute inset-0 pointer-events-none" />
      </section>

      {/* ABOUT */}
      <section
        id="about"
        ref={aboutRef as React.LegacyRef<HTMLElement>}
        aria-label="About ZadBy Cricket Club"
        className="bg-white py-16"
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">About Us</h2>
              <p className="text-lg text-slate-700 mb-6 leading-relaxed">
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
                  <div className="text-2xl font-extrabold text-slate-900">500+</div>
                  <div className="text-sm text-slate-600">Matches Hosted</div>
                </div>

                <div className="min-w-[140px]">
                  <div className="text-2xl font-extrabold text-slate-900">50+</div>
                  <div className="text-sm text-slate-600">Team Accommodation</div>
                </div>

                <div className="min-w-[140px]">
                  <div className="text-2xl font-extrabold text-slate-900">Food</div>
                  <div className="text-sm text-slate-600">Catered (₹500 / person / day)</div>
                </div>
              </div>
            </div>

            <div className="order-first md:order-last">
              <img
                src={aboutImg}
                alt="ZCC facilities"
                className="w-full h-64 md:h-80 object-cover rounded-xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section
        id="services"
        ref={servicesRef as React.LegacyRef<HTMLElement>}
        className="bg-blue-50 py-16 px-6"
      >
        <div className="max-w-7xl mx-auto text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-blue-900 mb-4">Our Services</h2>
          <p className="text-lg text-gray-600">
            We provide complete cricket ground facilities for players, teams, and corporate tournaments.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3 max-w-7xl mx-auto">
          {/* Ground Booking */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <img
              src={groundBooking}
              alt="Ground Booking"
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2 text-blue-800">Ground Booking</h3>
              <p className="text-gray-700 text-sm">
                Available for matches, practice sessions, and multi-day tournaments.
                Open to academies, schools, clubs, and corporate teams.
                All bookings are managed digitally via the ZadSports App.
              </p>
            </div>
          </div>

          {/* Team Accommodation */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <img
              src={teamAccommodation}
              alt="Team Accommodation"
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2 text-blue-800">Team Accommodation</h3>
              <p className="text-gray-700 text-sm">
                Free accommodation is provided for teams participating in multi-day tournaments,
                ensuring a comfortable stay during the event.
              </p>
            </div>
          </div>

          {/* Food Facilities */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <img
              src={foodImage}
              alt="Food Facilities"
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2 text-blue-800">Food Facilities</h3>
              <p className="text-gray-700 text-sm">
                Meals at ₹500 per person/day including Breakfast, Lunch,
                Evening Snacks, and Dinner. Prepared hygienically with nutrition in mind.
              </p>
            </div>
          </div>
        </div>
      </section>

{/* BLOGS */}
<section id="blogs" ref={blogsRef as React.LegacyRef<HTMLElement>}>
  <Blogs />
</section>

{/* ACHIEVEMENTS */}
<section id="achievements" ref={achievementsRef as React.LegacyRef<HTMLElement>}>
  <Achievements />
</section>

      {/* CONTACT FORM - Replaced with new form */}
      <section
        id="contact"
        ref={contactRef as React.LegacyRef<HTMLElement>}
        className="max-w-6xl mx-auto px-6 py-16 bg-white rounded-lg shadow-lg"
        aria-label="Contact ZadBy Cricket Club"
      >
        <h2 className="text-3xl font-semibold text-center mb-8 text-[#090a58]">
          Contact Us
        </h2>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          noValidate
        >
          <div>
            <label htmlFor="name" className="block mb-2 font-medium text-gray-700">
              Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#090a58]"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block mb-2 font-medium text-gray-700">
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your number"
              className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#090a58]"
            />
          </div>

          <div>
            <label htmlFor="email" className="block mb-2 font-medium text-gray-700">
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#090a58]"
            />
          </div>

          <div>
            <label htmlFor="subject" className="block mb-2 font-medium text-gray-700">
              Subject *
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Enter your subject"
              className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#090a58]"
            />
          </div>

          <div className="md:col-span-2">
            <label htmlFor="message" className="block mb-2 font-medium text-gray-700">
              Message *
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              value={formData.message}
              onChange={handleChange}
              placeholder="Write your message here..."
              className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#090a58]"
            ></textarea>
          </div>

          <div className="md:col-span-2 flex justify-center">
            <button
              type="submit"
              className="bg-[#090a58] hover:bg-[#090a58e4] text-white px-6 py-3 rounded-md font-semibold transition duration-200"
            >
              Send Message
            </button>
          </div>
        </form>
      </section>

    </div>
  );
};

export default Home;

// STATIC CODE
{/* BLOGS */}
      
      {/* <section
        id="blogs"
        ref={blogsRef as React.LegacyRef<HTMLElement>}
        className="bg-white py-16 px-6"
      >
        <div className="max-w-6xl mx-auto text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">Latest Blogs</h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Stay updated with news, match highlights, and stories from ZadBy Cricket Club.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 max-w-6xl mx-auto">
          <article className="bg-gray-100 rounded-lg shadow hover:shadow-lg transition p-6">
            <img
              // src={blog1Img}
              alt="Blog 1"
              className="w-full h-48 object-cover rounded mb-4"
            />
            <h3 className="text-xl font-semibold mb-2 text-slate-900">Summer Cricket Camp Highlights</h3>
            <p className="text-gray-700 text-sm">
              Our summer camp was a great success with over 100 young players learning and enjoying cricket.
            </p>
            <Link to="/blogs#camp" className="text-blue-600 hover:underline mt-2 inline-block">
              Read more
            </Link>
          </article>

          <article className="bg-gray-100 rounded-lg shadow hover:shadow-lg transition p-6">
            <img
              // src={blog2Img}
              alt="Blog 2"
              className="w-full h-48 object-cover rounded mb-4"
            />
            <h3 className="text-xl font-semibold mb-2 text-slate-900">How to Improve Your Batting Technique</h3>
            <p className="text-gray-700 text-sm">
              Tips from our coaches on improving your batting stance and stroke play.
            </p>
            <Link to="/blogs#batting" className="text-blue-600 hover:underline mt-2 inline-block">
              Read more
            </Link>
          </article>
        </div>
      </section> */}
      
// ACHIEVEMENTS STATIC
 {/* ACHIEVEMENTS*/}
{/* <section
  id="achievements"
  ref={achievementsRef as React.LegacyRef<HTMLElement>}
  className="bg-blue-50 py-16 px-6"
>
  <div className="max-w-6xl mx-auto text-center mb-12">
    <h2 className="text-3xl sm:text-4xl font-bold text-blue-900 mb-4">Achievements</h2>
    <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-10">
      Celebrating milestones and successes of ZadBy Cricket Club and its members.
    </p>

    <div className="grid gap-8 md:grid-cols-4 max-w-6xl mx-auto"> */}
      {/* Card 1 */}
      {/* <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
        <img
          src={achievementImg} // change to your actual image
          alt="Tournament Wins"
          className="w-32 h-32 object-cover rounded-full mb-4 shadow-md"
        />
        <h3 className="text-xl font-semibold text-blue-800 mb-2">Tournament Wins</h3>
        <p className="text-gray-700 text-center text-sm">
          CK Women – Winners<br />U12 Majestic Salem – Champions
        </p>
      </div> */}

      {/* Card 2 */}
      {/* <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
        <img
          src={achievementImg}
          alt="Notable Fixtures"
          className="w-32 h-32 object-cover rounded-full mb-4 shadow-md"
        />
        <h3 className="text-xl font-semibold text-blue-800 mb-2">Notable Fixtures</h3>
        <p className="text-gray-700 text-center text-sm">
          ZCC U-12 Tournament – August 2025
        </p>
      </div> */}

      {/* Card 3 */}
      {/* <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
        <img
          src={achievementImg}
          alt="Tournament Pools"
          className="w-32 h-32 object-cover rounded-full mb-4 shadow-md"
        />
        <h3 className="text-xl font-semibold text-blue-800 mb-2">Tournament Pools</h3>
        <p className="text-gray-700 text-center text-sm">
          Pool A: SKA Blue, Vellore CA, KICA Krishnagiri<br />
          Pool B: Sachin CA Salem, SKA Yellow, Majestic Salem
        </p>
      </div> */}

      {/* Card 4 */}
      {/* <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
        <img
          src={achievementImg}
          alt="Final Match"
          className="w-32 h-32 object-cover rounded-full mb-4 shadow-md"
        />
        <h3 className="text-xl font-semibold text-blue-800 mb-2">Final Match</h3>
        <p className="text-gray-700 text-center text-sm">
          Pool A Topper vs Pool B Topper<br />
          Date: 3rd August 2025<br />
          Additional practice matches available
        </p>
      </div>
    </div>
  </div>
</section> */}
      