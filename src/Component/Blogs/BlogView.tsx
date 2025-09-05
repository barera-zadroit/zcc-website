import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import decrypt from "../../Helper/helper";
import blogTemplateImg from "../../assets/blogsBannerPage.jpg";

interface Blog {
  blogContent: string;
  blogDate: string;
  blogImage: string;
  blogTitle: string;
  signedImageUrl?: string;
  blogId: string;
}

interface BlogResponse {
  success: boolean;
  Blog?: Blog;
}

const BlogView: React.FC = () => {
  const { blogId } = useParams<{ blogId: string }>();
  const location = useLocation();
  const navigate = useNavigate();

  const [blog, setBlog] = useState<Blog | null>(location.state || null);

  useEffect(() => {

     // ✅ Always scroll to top when BlogView mounts
  window.scrollTo(0, 0);
    // ✅ If no state (direct URL visit), fetch from API
    if (!blog && blogId) {
      axios
        .post(
          `${import.meta.env.VITE_API_URL}/UserRoutes/getBlogById`,
          { blogId },
          { headers: { "Content-Type": "application/json" } }
        )
        .then((response) => {
          const data = decrypt<BlogResponse>(
            response.data[1],
            response.data[0],
            import.meta.env.VITE_ENCRYPTION_KEY
          );
          if (data.success && data.Blog) {
            setBlog(data.Blog);
          }
        })
        .catch((err) => console.error("Error fetching blog:", err));
    }
  }, [blog, blogId]);

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Loading blog...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6 mt-20 flex flex-col items-center">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-xl p-8">
        <img
          src={blog.signedImageUrl || blogTemplateImg}
          alt={blog.blogTitle}
          className="w-full max-h-[400px] object-cover rounded-lg mb-6"
          
        />
        

        <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold mb-2 text-slate-900" style={{fontFamily:"DM Sans"}}>
                {blog.blogTitle}
              </h2>
        

        <p className="text-sm text-gray-500 mb-6" style={{fontFamily:"DM Sans"}}>
          {new Date(blog.blogDate).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </p>
        </div>

        <div
          className="prose max-w-none text-gray-800"
          dangerouslySetInnerHTML={{ __html: blog.blogContent }}
        />

        <div className="text-center mt-8">
          <button
            onClick={() => navigate(-1)}
            className="bg-[#fdbe1b] hover:bg-[#a91632] text-white px-6 py-3 rounded-full font-semibold transition" style={{fontFamily:"DM Sans"}}
          >
            Back to Blogs
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogView;
