import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import blogTemplateImg from "../../assets/blogTemplate.jpg";

interface Blog {
  blogContent: string;
  blogDate: string;
  blogImage: string;
  blogTitle: string;
  signedImageUrl?: string;
}

const BlogView: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // ✅ Now using Blog interface directly
  const { blog } = (location.state || {}) as { blog?: Blog };
  console.log("blogs data",blog)

  useEffect(() => {
    window.scrollTo(0, 0); // ⬅️ scroll to top on page load
  }, []);

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600 text-lg">
        No Blog Found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8 mt-20">
      <div className="max-w-4xl mx-auto  rounded-xl p-8">

    

        {/* Title + Date */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">{blog.blogTitle}</h1>
          <p className="text-gray-600 text-sm mt-2 sm:mt-0">{blog.blogDate}</p>
        </div>

        {/* Image */}
        <div className="mb-6">
          <img
            src={blog.signedImageUrl || blogTemplateImg}
            alt={blog.blogTitle}
            className="rounded-lg max-h-[400px] object-cover w-full"
          />
        </div>

        {/* Content */}
        <div
          className="prose max-w-none text-justify"
          dangerouslySetInnerHTML={{ __html: blog.blogContent }}
        ></div>

        {/* Back button */}
        <div className="mt-8 text-center">
          <button
            onClick={() => {
              navigate(-1);
              window.scrollTo(0, 0);
            }}
            className="bg-[#2d1487] text-white px-5 py-2 rounded-full hover:bg-blue-400 transition duration-300"
          >
            Back to Blogs
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogView;
