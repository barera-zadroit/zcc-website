//This is for an single page website routes navigation is to be correct//
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "../Component/00-Header/Header";
import Home from "../Pages/01-Home/Home";
import Footer from "../Component/99-Footer/Footer";
import BlogView from "../Component/Blogs/BlogView";
import BlogsAll from "../Component/Blogs/BlogsAll";
import AchievementsAll from "../Component/Achievements/AchievementsAll";
import AchievementView from "../Component/Achievements/AchievementView";
import Feedback from "../Component/Feedback/Feedback";





const Mainroutes: React.FC = () => {
    return (
        <Router>
            {/* Navbar stays constant */}
            <Header />

            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<Home />} />
                    <Route path="/services" element={<Home />} />
                    <Route path="/blogs" element={<Home />} />
                     {/* <Route path="/blog-view" element={<BlogView />} /> */}
                     <Route path="/blog-view/:id/:title" element={<BlogView />} />


                     <Route path="/blogs-all" element={<BlogsAll />} />
                    <Route path="/achievements" element={<Home />} />
                    <Route path="/feedback" element={<Feedback/>} />
                     <Route path="/achievements-all" element={<AchievementsAll />} />
                     <Route path="/achievement-view" element={<AchievementView />} />
                    <Route path="/contact" element={<Home />} />
                    
                   {/* <Route path="/achievement-view" element={<AchievementView />} /> */}

                </Routes>
            </main>

            {/* Footer stays constant */}
            <Footer />
        </Router>
    );
};

export default Mainroutes;

