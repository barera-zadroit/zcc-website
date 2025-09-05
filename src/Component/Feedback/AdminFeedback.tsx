
import React, { useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import axios from "axios";
import decrypt from "../../Helper/helper";

interface AddReviewResponse {
  success: boolean;
  message?: string;
}

const AdminFeedback: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const submitFeedback = () => {
    axios
      .post(
        `${import.meta.env.VITE_API_URL}/settingsRoutes/addReviews`,
        {
          refProductName: import.meta.env.VITE_PRODUCT_NAME,
          userName: name,
          userEmail: email,
          reviewContent: message,
          ratings: rating.toString(),
        },
        { headers: { "Content-Type": "application/json" } }
      )
      .then((response) => {
        const data = decrypt<AddReviewResponse>(
          response.data[1],
          response.data[0],
          import.meta.env.VITE_ENCRYPTION_KEY
        );

        console.log('AdminFeedback.tsx / data / 41 -------------------  ', data);
        if (data.success) {
          setSuccessMsg("✅ Thank you! Your feedback has been submitted.");
          setName("");
          setEmail("");
          setMessage("");
          setRating(0);
        } else {
          setErrorMsg(data.message || "Something went wrong. Please try again.");
        }
      })
      .catch(() => {
        setErrorMsg("Failed to send feedback. Please try again.");
      })
      .finally(() => setLoading(false));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message || rating === 0) {
      setErrorMsg("⚠️ Please fill all fields and provide a rating.");
      return;
    }
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");
    submitFeedback();
  };

  return (
    <div className="bg-white rounded-lg p-4 w-full">
      <h2 className="text-lg font-semibold text-gray-800 mb-4 border-l-4 border-[#090a58] pl-3" style={{fontFamily:"DM Sans"}}>
        Tell us what you think
      </h2>

      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <div>
          <label className="block mb-1 text-gray-700 text-sm font-medium" style={{fontFamily:"DM Sans"}}>
            Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#090a58] text-sm"
          />
        </div>

        <div>
          <label className="block mb-1 text-gray-700 text-sm font-medium" style={{fontFamily:"DM Sans"}}>
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#090a58] text-sm"
          />
        </div>

        <div>
          <label className="block mb-1 text-gray-700 text-sm font-medium" style={{fontFamily:"DM Sans"}}>
            Your Rating
          </label>
          <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className="text-xl text-[#fca000] hover:scale-110 transition-transform"
              >
                {rating >= star ? <AiFillStar /> : <AiOutlineStar />}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block mb-1 text-gray-700 text-sm font-medium" style={{fontFamily:"DM Sans"}}>
            Message
          </label>
          <textarea
            rows={3}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write your message here..."
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#090a58] text-sm resize-none overflow-y-auto"
          ></textarea>
        </div>

        {errorMsg && (
          <div className="text-red-600 text-sm font-medium">{errorMsg}</div>
        )}
        {successMsg && (
          <div className="text-green-600 text-sm font-medium">{successMsg}</div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="bg-[#fdbe1b] hover:bg-[#E63946] text-white px-4 py-2 rounded-md font-medium transition disabled:opacity-50 text-sm" style={{fontFamily:"DM Sans"}}
        >
          {loading ? "Sending..." : "Send Feedback"}
        </button>
      </form>
    </div>
  );
};

export default AdminFeedback;

