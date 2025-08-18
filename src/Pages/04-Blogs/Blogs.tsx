import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import decrypt from "../../Helper/helper";
import blogTemplateImg from "../../assets/blogTemplate.jpg";

interface Blog {
  blogContent: string;
  blogDate: string;
  blogImage: string;
  blogTitle: string;
  signedImageUrl?: string;
}

const BlogsPreview: React.FC = () => {
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
        const data = decrypt(
          response.data[1],
          response.data[0],
          import.meta.env.VITE_ENCRYPTION_KEY
        );
        console.log('data--------->', data)
        if (data.success) {
          setListBlogs(data.AllBlogs);
        }
      })
      .catch((error) => console.error("Failed to fetch blog:", error));
  };

  // useEffect(() => {
  //   fetchBlogs();
  // }, []);
  useEffect(() => {
    fetchBlogs();
    window.scrollTo(0, 0); // ⬅️ scroll to top on page load
  }, []);

  return (
    <section className="bg-white py-16 px-6">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
          Latest Blogs
        </h2>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto">
          Stay updated with news, match highlights, and stories from ZadBy Cricket Club.
        </p>
      </div>

      <div className="flex flex-wrap justify-between max-w-6xl mx-auto gap-8">
  {listBlogs.slice(0, 3).map((blog, index) => (
    <article
      key={index}
      className="bg-gray-100 rounded-lg shadow hover:shadow-lg transition p-6 cursor-pointer flex-1 min-w-[300px] max-w-[32%]"
      onClick={() => {
        console.log(blog);
        navigate("/blog-view", { state: { blog } });
      }}
    >
      <img
        src={blog.signedImageUrl || blogTemplateImg}
        alt={blog.blogTitle}
        className="w-full h-48 object-cover rounded mb-4"
      />
      <div className="flex flex-row w-full justify-between">
        <h3 className="text-xl font-semibold mb-2 text-slate-900">
          {blog.blogTitle}
        </h3>
        <p className="text-sm text-gray-500">{blog.blogDate}</p>
      </div>
      <div className="flex flex-row justify-center w-full">
        <button className="mt-4 bg-[#2d1487] text-white px-4 py-2 rounded-full text-center font-bold mx-auto w-[50%]">
          READ MORE
        </button>
      </div>
    </article>
  ))}
</div>


      <div className="text-center mt-8">
        <button
          onClick={() => navigate("/blogs-all")}
          className="bg-[#2d1487] hover:bg-blue-400 text-white px-6 py-3 rounded-full font-semibold transition"
        >
          View All Blogs
        </button>
      </div>
    </section>
  );
};

export default BlogsPreview;
