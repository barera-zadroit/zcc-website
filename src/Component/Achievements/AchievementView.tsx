import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface Achievement {
  achievementTitle: string;
  achievementDescription: string;
  achievedOn: string;
}

const AchievementView: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { achievement } = (location.state || {}) as { achievement?: Achievement };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!achievement) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600 text-lg">
        No Achievement Found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8 mt-20">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow p-8">
        
        {/* Title + Date */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            {achievement.achievementTitle}
          </h1>
          <p className="text-gray-600 text-sm mt-2 sm:mt-0">
            {achievement.achievedOn}
          </p>
        </div>

        {/* Content */}
        <div
          className="prose max-w-none text-justify"
          dangerouslySetInnerHTML={{ __html: achievement.achievementDescription }}
        ></div>

        {/* Back button */}
        <div className="mt-8 text-center">
          <button
            onClick={() => {
              navigate(-1);
              window.scrollTo(0, 0);
            }}
            className="bg-[#fdbe1b] text-white px-5 py-2 rounded-full hover:bg-[#E63946] transition duration-300"
          >
            Back to Achievements
          </button>
        </div>
      </div>
    </div>
  );
};

export default AchievementView;
