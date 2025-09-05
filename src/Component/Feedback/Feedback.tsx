import React, { useState } from "react";
import AdminFeedback from "./AdminFeedback";
import ListFeedback from "./ListFeedback";

const Feedback: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="">
      <section id="feedback" className="scroll-mt-50">
        <div className="px-6 py-30 bg-blue-50 ">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-10 text-[#fdbe1b]" style={{fontFamily:"DM Sans"}}>
            Feedback
          </h2>

          {/* ✅ List of Reviews */}
          <ListFeedback />

          {/* ✅ Share Feedback Button */}
          <div className="flex justify-center mt-10">
            <button
              onClick={() => setIsOpen(true)}
              className="px-6 py-3 bg-[#fdbe1b] text-white rounded-md hover:bg-[#E63946] transition" style={{fontFamily:"DM Sans"}}
            >
              Share Your Feedback
            </button>
          </div>

          {/* ✅ Popup Modal with AdminFeedback */}
          {isOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-5 relative">
                {/* Close Button */}
                <button
                  className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close"
                >
                  ✕
                </button>

                {/* Feedback Form */}
                <div className="max-h-[80vh] pr-1">
                  <AdminFeedback />
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Feedback;



