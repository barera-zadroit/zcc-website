
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion"; // ✅ animation
// import decrypt from "../../Helper/helper";
// import blogTemplateImg from "../../assets/blogsBannerPage.jpg";

// interface Blog {
//   blogContent: string;
//   blogDate: string;
//   blogImage: string;
//   blogTitle: string;
//   signedImageUrl?: string;
//   blogId:string;
// }

// interface BlogsResponse {
//   success: boolean;
//   AllBlogs?: Blog[];
// }

// const BlogsPreview: React.FC = () => {
//   const [listBlogs, setListBlogs] = useState<Blog[]>([]);
//   const navigate = useNavigate();

//   const fetchBlogs = () => {
//     axios
//       .post(
//         `${import.meta.env.VITE_API_URL}/UserRoutes/listBlogs`,
//         { refProductsId: import.meta.env.VITE_PRODUCT_ID },
//         { headers: { "Content-Type": "application/json" } }
//       )
//       .then((response) => {
//         const data = decrypt<BlogsResponse>(
//           response.data[1],
//           response.data[0],
//           import.meta.env.VITE_ENCRYPTION_KEY
//         );
//         if (data.success) {
//           setListBlogs(data.AllBlogs || []);
//         }
//       })
//       .catch((error) => console.error("Failed to fetch blog:", error));
//   };

//   useEffect(() => {
//     fetchBlogs();
//     window.scrollTo(0, 0);
//   }, []);

//   return (
//     <section className="bg-white py-16 px-6">
//       <div className="max-w-6xl mx-auto text-center mb-12">
//         <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
//           Latest Blogs
//         </h2>
//         <p className="text-lg text-gray-700 max-w-2xl mx-auto">
//           Stay updated with news, match highlights, and stories from ZadBy
//           Cricket Club.
//         </p>
//       </div>

//       {/* Blog Cards with animation */}
//       <motion.div
//         className="flex flex-wrap justify-between max-w-6xl mx-auto gap-8"
//         initial="hidden"
//         animate="show"
//         variants={{
//           hidden: { opacity: 0 },
//           show: { opacity: 1, transition: { staggerChildren: 0.2 } },
//         }}
//       >
//         {listBlogs.slice(0, 3).map((blog, index) => (
//           <motion.article
//             key={index}
//             className="bg-gray-100 rounded-lg shadow p-6 cursor-pointer flex-1 min-w-[300px] max-w-[32%]"
//             onClick={() => navigate("/blog-view", { state: { blog } })}
//             variants={{
//               hidden: { opacity: 0, y: 50 },
//               show: { opacity: 1, y: 0 },
//             }}
//             whileHover={{
//               y: -8,
//               scale: 1.03,
//               boxShadow: "0px 8px 20px rgba(45,20,135,0.25)",
//             }}
//             transition={{ type: "spring", stiffness: 120, damping: 15 }}
//           >
//             <img
//               src={blog.signedImageUrl || blogTemplateImg}
//               alt={blog.blogTitle}
//               className="w-full h-48 object-cover rounded mb-4"
//             />
//             <div className="flex flex-row w-full justify-between">
//               <h2 className="text-xl font-semibold mb-2 text-slate-900">
//                 {blog.blogTitle}
//               </h2>
//               {/* <p className="text-sm text-gray-500">{blog.blogDate}</p> */}
//               <p className="text-sm text-gray-500">
//                 {new Date(blog.blogDate).toLocaleDateString("en-US", {
//                   month: "long",
//                   day: "numeric",
//                   year: "numeric",
//                 })}
//               </p>
//             </div>

//             {/* <div className="flex flex-row justify-center w-full">
//               <button className="mt-4 bg-[#2d1487] text-white px-4 py-2 rounded-full text-center font-bold mx-auto w-[50%]">
//                 READ MORE
//               </button>
//             </div> */}
//             {/* Read More link at bottom-right */}
//             <div className="flex justify-end w-full mt-4">
//               <span
//                 onClick={() =>
//                   navigate(
//                     `/blog-view/${blog.blogId}/${encodeURIComponent(blog.blogTitle)}`,
//                     { state: blog } // ✅ send full blog data
//                   )
//                 }
//                 className="text-[#2d1487] font-medium cursor-pointer hover:underline"
//               >
//                 Read More
//               </span>
//             </div>

//           </motion.article>
//         ))}
//       </motion.div>

//       {/* View All Blogs Button */}
//       <motion.div
//         className="text-center mt-8"
//         initial={{ opacity: 0, y: 30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.5, duration: 0.6 }}
//       >
//         <motion.button
//           whileHover={{ scale: 1.08 }}
//           whileTap={{ scale: 0.95 }}
//           onClick={() => navigate("/blogs-all")}
//           className="bg-[#0A1B3F] hover:bg-[#a91632] text-white px-6 py-3 rounded-full font-semibold transition"
//         >
//           View All Blogs
//         </motion.button>
//       </motion.div>
//     </section>
//   );
// };

// export default BlogsPreview;
////////////////////////////////////////////////////////////////////////////////////////
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion"; // ✅ animation
// import decrypt from "../../Helper/helper";
// import blogTemplateImg from "../../assets/blogsBannerPage.jpg";

// interface Blog {
//   blogContent: string;
//   blogDate: string;
//   blogImage: string;
//   blogTitle: string;
//   signedImageUrl?: string;
//   blogId: string;
// }

// interface BlogsResponse {
//   success: boolean;
//   AllBlogs?: Blog[];
// }

// const BlogsPreview: React.FC = () => {
//   const [listBlogs, setListBlogs] = useState<Blog[]>([]);
//   const navigate = useNavigate();

//   const fetchBlogs = () => {
//     axios
//       .post(
//         `${import.meta.env.VITE_API_URL}/UserRoutes/listBlogs`,
//         { refProductsId: import.meta.env.VITE_PRODUCT_ID },
//         { headers: { "Content-Type": "application/json" } }
//       )
//       .then((response) => {
//         const data = decrypt<BlogsResponse>(
//           response.data[1],
//           response.data[0],
//           import.meta.env.VITE_ENCRYPTION_KEY
//         );
//         if (data.success) {
//           setListBlogs(data.AllBlogs || []);
//         }
//       })
//       .catch((error) => console.error("Failed to fetch blog:", error));
//   };

//   useEffect(() => {
//     fetchBlogs();
//     window.scrollTo(0, 0);
//   }, []);

//   return (
//     <section className="bg-white py-16 px-6">
//       <div className="max-w-6xl mx-auto text-center mb-12">
//         <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
//           Latest Blogs
//         </h2>
//         <p className="text-lg text-gray-700 max-w-2xl mx-auto">
//           Stay updated with news, match highlights, and stories from ZadBy
//           Cricket Club.
//         </p>
//       </div>

//       {/* Blog Cards with animation */}
//       <motion.div
//         className="flex flex-wrap justify-between max-w-6xl mx-auto gap-8"
//         initial="hidden"
//         animate="show"
//         variants={{
//           hidden: { opacity: 0 },
//           show: { opacity: 1, transition: { staggerChildren: 0.2 } },
//         }}
//       >
//         {listBlogs.slice(0, 3).map((blog, index) => (
//           <motion.article
//             key={index}
//             className="bg-gray-100 rounded-lg shadow p-6 flex-1 min-w-[300px] max-w-[32%]"
//             variants={{
//               hidden: { opacity: 0, y: 50 },
//               show: { opacity: 1, y: 0 },
//             }}
//             whileHover={{
//               y: -8,
//               scale: 1.03,
//               boxShadow: "0px 8px 20px rgba(45,20,135,0.25)",
//             }}
//             transition={{ type: "spring", stiffness: 120, damping: 15 }}
//           >
//             <img
//               src={blog.signedImageUrl || blogTemplateImg}
//               alt={blog.blogTitle}
//               className="w-full h-48 object-cover rounded mb-4"
//             />
//             <div className="flex flex-row w-full justify-between">
//               <h2 className="text-xl font-semibold mb-2 text-slate-900">
//                 {blog.blogTitle}
//               </h2>
//               <p className="text-sm text-gray-500">
//                 {new Date(blog.blogDate).toLocaleDateString("en-US", {
//                   month: "long",
//                   day: "numeric",
//                   year: "numeric",
//                 })}
//               </p>
//             </div>

//             {/* Read More link at bottom-right */}
//             <div className="flex justify-end w-full mt-4">
//               <span
//                 onClick={() =>
//                   navigate(
//                     `/blog-view/${blog.blogId}/${encodeURIComponent(blog.blogTitle)}`,
//                     { state: blog } // ✅ send full blog data
//                   )
//                 }
//                 className="text-[#2d1487] font-medium cursor-pointer hover:underline"
//               >
//                 Read More
//               </span>
//             </div>
//           </motion.article>
//         ))}
//       </motion.div>

//       {/* View All Blogs Button */}
//       <motion.div
//         className="text-center mt-8"
//         initial={{ opacity: 0, y: 30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.5, duration: 0.6 }}
//       >
//         <motion.button
//           whileHover={{ scale: 1.08 }}
//           whileTap={{ scale: 0.95 }}
//           onClick={() => navigate("/blogs-all")}
//           className="bg-[#0A1B3F] hover:bg-[#a91632] text-white px-6 py-3 rounded-full font-semibold transition"
//         >
//           View All Blogs
//         </motion.button>
//       </motion.div>
//     </section>
//   );
// };

// export default BlogsPreview;
///////////////////////////////////////////////////////////////////   final 
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion"; // ✅ animation
// import decrypt from "../../Helper/helper";
// import blogTemplateImg from "../../assets/blogsBannerPage.jpg";

// interface Blog {
//   blogContent: string;
//   blogDate: string;
//   blogImage: string;
//   blogTitle: string;
//   signedImageUrl?: string;
//   blogId: string;
// }

// interface BlogsResponse {
//   success: boolean;
//   AllBlogs?: Blog[];
// }

// const BlogsPreview: React.FC = () => {
//   const [listBlogs, setListBlogs] = useState<Blog[]>([]);
//   const navigate = useNavigate();

//   const fetchBlogs = () => {
//     axios
//       .post(
//         `${import.meta.env.VITE_API_URL}/UserRoutes/listBlogs`,
//         { refProductsId: import.meta.env.VITE_PRODUCT_ID },
//         { headers: { "Content-Type": "application/json" } }
//       )
//       .then((response) => {
//         const data = decrypt<BlogsResponse>(
//           response.data[1],
//           response.data[0],
//           import.meta.env.VITE_ENCRYPTION_KEY
//         );
//         if (data.success) {
//           setListBlogs(data.AllBlogs || []);
//         }
//       })
//       .catch((error) => console.error("Failed to fetch blog:", error));
//   };

//   useEffect(() => {
//     fetchBlogs();
//     window.scrollTo(0, 0);
//   }, []);

//   return (
//     <section className="bg-white py-16 px-6">
//       <div className="max-w-6xl mx-auto text-center mb-12">
//         <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
//           Latest Blogs
//         </h2>
//         <p className="text-lg text-gray-700 max-w-2xl mx-auto">
//           Stay updated with news, match highlights, and stories from ZadBy
//           Cricket Club.
//         </p>
//       </div>

//       {/* Blog Cards with animation */}
//       <motion.div
//         className="flex flex-wrap justify-between max-w-6xl mx-auto gap-8"
//         initial="hidden"
//         animate="show"
//         variants={{
//           hidden: { opacity: 0 },
//           show: { opacity: 1, transition: { staggerChildren: 0.2 } },
//         }}
//       >
//         {listBlogs.slice(0, 3).map((blog, index) => (
//           <motion.article
//             key={index}
//             className="bg-gray-100 rounded-lg shadow p-6 cursor-pointer flex-1 min-w-[300px] max-w-[32%]"
//             variants={{
//               hidden: { opacity: 0, y: 50 },
//               show: { opacity: 1, y: 0 },
//             }}
//             whileHover={{
//               y: -8,
//               scale: 1.03,
//               boxShadow: "0px 8px 20px rgba(45,20,135,0.25)",
//             }}
//             transition={{ type: "spring", stiffness: 120, damping: 15 }}
//           >
//             <img
//               src={blog.signedImageUrl || blogTemplateImg}
//               alt={blog.blogTitle}
//               className="w-full h-48 object-cover rounded mb-4"
//             />
//             <div className="flex flex-row w-full justify-between">
//               <h2 className="text-xl font-semibold mb-2 text-slate-900">
//                 {blog.blogTitle}
//               </h2>
//               <p className="text-sm text-gray-500">
//                 {new Date(blog.blogDate).toLocaleDateString("en-US", {
//                   month: "long",
//                   day: "numeric",
//                   year: "numeric",
//                 })}
//               </p>
//             </div>

//             {/* Read More link at bottom-right */}
//             <div className="flex justify-end w-full mt-4">
//               <span
//                 onClick={() =>
//                   navigate(
//                     `/blog-view/${blog.blogId}/${encodeURIComponent(blog.blogTitle)}`,
//                     { state: blog } // ✅ send full blog data
//                   )
//                 }
//                 className="text-[#2d1487] font-medium cursor-pointer hover:underline"
//               >
//                 Read More
//               </span>
//             </div>
//           </motion.article>
//         ))}
//       </motion.div>

//       {/* View All Blogs Button */}
//       <motion.div
//         className="text-center mt-8"
//         initial={{ opacity: 0, y: 30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.5, duration: 0.6 }}
//       >
//         <motion.button
//           whileHover={{ scale: 1.08 }}
//           whileTap={{ scale: 0.95 }}
//           onClick={() => navigate("/blogs-all")}
//           className="bg-[#0A1B3F] hover:bg-[#a91632] text-white px-6 py-3 rounded-full font-semibold transition"
//         >
//           View All Blogs
//         </motion.button>
//       </motion.div>
//     </section>
//   );
// };

// export default BlogsPreview;
///////////////////////////////////////////////////
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // ✅ animation
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

interface BlogsResponse {
  success: boolean;
  AllBlogs?: Blog[];
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
    <section className="bg-white py-16 px-6">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
          Latest Blogs
        </h2>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto">
          Stay updated with news, match highlights, and stories from ZadBy
          Cricket Club.
        </p>
      </div>

      {/* Blog Cards with animation */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
        initial="hidden"
        animate="show"
        variants={{
          hidden: { opacity: 0 },
          show: { opacity: 1, transition: { staggerChildren: 0.2 } },
        }}
      >
        {listBlogs.slice(0, 3).map((blog, index) => (
          <motion.article
            key={index}
            className="bg-gray-100 rounded-lg shadow p-6 cursor-pointer"
            variants={{
              hidden: { opacity: 0, y: 50 },
              show: { opacity: 1, y: 0 },
            }}
            whileHover={{
              y: -8,
              scale: 1.03,
              boxShadow: "0px 8px 20px rgba(45,20,135,0.25)",
            }}
            transition={{ type: "spring", stiffness: 120, damping: 15 }}
          >
            <img
              src={blog.signedImageUrl || blogTemplateImg}
              alt={blog.blogTitle}
              className="w-full h-48 object-cover rounded mb-4"
            />
            <div className="flex flex-row w-full justify-between">
              <h2 className="text-xl font-semibold mb-2 text-slate-900">
                {blog.blogTitle}
              </h2>
              <p className="text-sm text-gray-500">
                {new Date(blog.blogDate).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>

            {/* Read More link at bottom-right */}
            <div className="flex justify-end w-full mt-4">
              <span
                onClick={() =>
                  navigate(
                    `/blog-view/${blog.blogId}/${encodeURIComponent(blog.blogTitle)}`,
                    { state: blog }
                  )
                }
                className="text-[#2d1487] font-medium cursor-pointer hover:underline"
              >
                Read More
              </span>
            </div>
          </motion.article>
        ))}
      </motion.div>

      {/* View All Blogs Button */}
      <motion.div
        className="text-center mt-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/blogs-all")}
          className="bg-[#0A1B3F] hover:bg-[#a91632] text-white px-6 py-3 rounded-full font-semibold transition"
        >
          View All Blogs
        </motion.button>
      </motion.div>
    </section>
  );
};

export default BlogsPreview;


