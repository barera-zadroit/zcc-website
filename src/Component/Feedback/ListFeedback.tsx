
import React, { useEffect, useState } from "react";
import axios from "axios";
import decrypt from "../../Helper/helper";
import { FaStar } from "react-icons/fa";
import user from "../../assets/User.png";

interface Feedback {
  reviewContent: string;
  ratings: string;
  userEmail: string;
  userName: string;
}

interface FeedbackListResponse {
  success: boolean;
  allReview: Feedback[];
}

const ListFeedback: React.FC = () => {
  const [listFeedback, setListFeedback] = useState<Feedback[]>([]);
  const [visibleCount, setVisibleCount] = useState(4); // ✅ show 4 cards initially

  const fetchFeedback = () => {
    axios
      .post(
        `${import.meta.env.VITE_API_URL}/UserRoutes/listReviews`,
        { refProductsId: import.meta.env.VITE_PRODUCT_ID },
        { headers: { "Content-Type": "application/json" } }
      )
      .then((response) => {
        const data = decrypt<FeedbackListResponse>(
          response.data[1],
          response.data[0],
          import.meta.env.VITE_ENCRYPTION_KEY
        );
        if (data.success) {
          setListFeedback(data.allReview);
        }
      })
      .catch((error) => {
        console.error("Failed to fetch feedback:", error);
      });
  };

  useEffect(() => {
    fetchFeedback();
    const handler = () => fetchFeedback();
    window.addEventListener("feedback-updated", handler);
    return () => window.removeEventListener("feedback-updated", handler);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const displayedFeedback = listFeedback.slice(0, visibleCount);

  const stripHtmlTags = (html: string = "") => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    return tempDiv.textContent || tempDiv.innerText || "";
  };

  const renderStars = (count: string) => {
    const ratingNum = parseInt(count, 10) || 0;
    return Array.from({ length: 5 }, (_, i) => (
      <FaStar
        key={i}
        className={`w-5 h-5 ${i < ratingNum ? "text-yellow-400" : "text-gray-300"}`}
      />
    ));
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-semibold text-center mb-10 underline text-slate-900" style={{fontFamily:"DM Sans"}}>
          User Reviews
        </h1>

        {/* ✅ Show 4 cards per row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayedFeedback.map((feedback, index) => (
  <div
    key={index}
    className="relative bg-white p-6 border-2 border-blue-100 rounded-xl shadow hover:shadow-md transition"
  >
    {/* Profile Logo (fixed top-right) */}
    <img
      src={user}
      alt="Profile"
      className="w-8 h-8 absolute top-4 right-4"
    />

    {/* Name + Email */}
    <div className="mb-3 pr-10"> {/* padding-right so text doesn’t overlap logo */}
      <h2
        className="font-semibold text-lg truncate"
        title={feedback.userName}
      >
        {feedback.userName}
      </h2>
      <p
        className="text-sm text-gray-500 truncate"
        title={feedback.userEmail}
      >
        {feedback.userEmail}
      </p>
    </div>

    {/* Stars */}
    <div className="flex items-center mb-2">
      {renderStars(feedback.ratings)}
    </div>

    {/* Message */}
    <p
      className="text-gray-600 text-sm line-clamp-2"
      title={stripHtmlTags(feedback.reviewContent)}
    >
      {stripHtmlTags(feedback.reviewContent)}
    </p>
  </div>
))}

        </div>

        {/* ✅ View More / View Less button */}
        {listFeedback.length > 4 && (
          <div className="flex justify-center mt-10">
            <button
              className="px-7 py-3 bg-[#fdbe1b] font-bold text-white rounded-full hover:bg-[#E63946] transition"
              onClick={() =>
                visibleCount === 4
                  ? setVisibleCount(listFeedback.length)
                  : setVisibleCount(4)
              }
            >
              {visibleCount === 4 ? "View More" : "View Less"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListFeedback;
