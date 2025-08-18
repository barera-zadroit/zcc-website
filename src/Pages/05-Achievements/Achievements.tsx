import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import decrypt from "../../Helper/helper";

interface Achievement {
  achievementTitle: string;
  achievementDescription: string;
  achievedOn: string;
}

const Achievements: React.FC = () => {
  const [listAchievements, setListAchievements] = useState<Achievement[]>([]);
  const navigate = useNavigate();

  const fetchAchievements = () => {
    axios
      .post(
        `${import.meta.env.VITE_API_URL}/UserRoutes/listAchievements`,
        { refProductsId: import.meta.env.VITE_PRODUCT_ID },
        { headers: { "Content-Type": "application/json" } }
      )
      .then((response) => {
        const data = decrypt(
          response.data[1],
          response.data[0],
          import.meta.env.VITE_ENCRYPTION_KEY
        );

        if (data.success) {
          setListAchievements(data.Achievements || []);
        }
      })
      .catch((error) => {
        console.error("Failed to listAchievements:", error);
      });
  };

  useEffect(() => {
    fetchAchievements();
    window.scrollTo(0, 0);
  }, []);

  const stripHtmlTags = (html: string = "") => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    return tempDiv.textContent || tempDiv.innerText || "";
  };

  return (
    <section className="bg-blue-50 py-16 px-6">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-blue-900 mb-4">
          Achievements
        </h2>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-10">
          Celebrating milestones and successes of ZadBy Cricket Club and its
          members.
        </p>
      </div>

      {/* Only show latest 3 */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {listAchievements.slice(0, 3).map((achievement, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow p-6 border-l-4 border-[#2d1487] hover:shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out text-left cursor-pointer"
            onClick={() =>
              navigate("/achievement-view", { state: { achievement } })
            }
          >
            <div className="flex justify-between items-center mb-3">
              <h3
                className="font-semibold text-lg truncate"
                title={achievement.achievementTitle}
              >
                {achievement.achievementTitle}
              </h3>
              <p className="text-sm text-gray-500">{achievement.achievedOn}</p>
            </div>
            <p className="text-gray-600 text-sm line-clamp-3">
              {stripHtmlTags(achievement.achievementDescription).length > 100
                ? `${stripHtmlTags(
                    achievement.achievementDescription
                  ).slice(0, 100)}...`
                : stripHtmlTags(achievement.achievementDescription)}
            </p>
          </div>
        ))}
      </div>

      {/* View All Button */}
      <div className="text-center mt-8">
        <button
          onClick={() => navigate("/achievements-all")}
          className="bg-[#2d1487] hover:bg-blue-400 text-white px-6 py-3 rounded-full font-semibold transition"
        >
          View All Achievements
        </button>
      </div>
    </section>
  );
};

export default Achievements;
