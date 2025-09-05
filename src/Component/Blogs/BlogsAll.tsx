import React, { useEffect, useState } from "react";
import blogTemplateImg from "../../assets/blogsBannerPage.jpg";
import decrypt from "../../Helper/helper";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface Blog {
  blogContent: string;
  blogDate: string;
  blogImage: string;
  blogTitle: string;
  signedImageUrl?: string;
  blogId: string;
}

interface BlogsResponse {
  success: boolean;
  AllBlogs?: Blog[];
}

const BlogsAll: React.FC = () => {
  const [listBlogs, setListBlogs] = useState<Blog[]>([]);
  const navigate = useNavigate();

  const fetchBlogs = () => {
    axios
      .post(
        `${import.meta.env.VITE_API_URL}/UserRoutes/listBlogs`,
        { refProductsId: import.meta.env.VITE_PRODUCT_ID },
        { headers: { "Content-Type": "application/json" } }
      )
      .then((response) => {
        const data = decrypt<BlogsResponse>(
          response.data[1],
          response.data[0],
          import.meta.env.VITE_ENCRYPTION_KEY
        );
        if (data.success) {
          setListBlogs(data.AllBlogs || []);
        }
      })
      .catch((error) => console.error("Failed to fetch blog:", error));
  };

  useEffect(() => {
    fetchBlogs();
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8 mt-20 flex flex-col">
      <div className="max-w-6xl mx-auto grid gap-8 md:grid-cols-2 flex-1">
        {listBlogs.map((item, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-xl p-6 flex flex-col"
          >
            <img
              src={item.signedImageUrl || blogTemplateImg}
              alt={item.blogTitle}
              className="rounded-lg max-h-[250px] object-cover mb-4"
            />

            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold mb-2 text-slate-900" style={{fontFamily:"DM Sans"}}>
                {item.blogTitle}
              </h2>
              <p className="text-sm text-gray-500" style={{fontFamily:"DM Sans"}}>
                {new Date(item.blogDate).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>

            <div className="flex justify-end w-full mt-4">
              <span
                onClick={() =>
                  navigate(`/blog-view/${item.blogId}/${encodeURIComponent(item.blogTitle)}`, {
                    state: item, // ✅ send full blog data
                  })
                }
                className="text-[#fdbe1b] font-medium cursor-pointer underline" style={{fontFamily:"DM Sans"}}
              >
                Read More
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-12">
        <button
          onClick={() => navigate("/blogs")}
          className="bg-[#fdbe1b] hover:bg-[#a91632] text-white px-6 py-3 rounded-full font-semibold transition"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default BlogsAll;
