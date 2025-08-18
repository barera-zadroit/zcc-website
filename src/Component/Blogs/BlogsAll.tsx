// import React, { useEffect, useState } from "react";
// import blogTemplateImg from "../../assets/blogTemplate.jpg";
// import decrypt from "../../Helper/helper";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// interface Blog {
//   blogContent: string;
//   blogDate: string;
//   blogImage: string;
//   blogTitle: string;
//   signedImageUrl?: string;
// }

// const BlogsAll: React.FC = () => {
//   const [listBlogs, setListBlogs] = useState<Blog[]>([]);
//   const navigate = useNavigate(); // ✅ Correct hook

//   const fetchBlogs = () => {
//     axios
//       .post(
//         `${import.meta.env.VITE_API_URL}/UserRoutes/listBlogs`,
//         { refProductsId: import.meta.env.VITE_PRODUCT_ID },
//         { headers: { "Content-Type": "application/json" } }
//       )
//       .then((response) => {
//         const data = decrypt(
//           response.data[1],
//           response.data[0],
//           import.meta.env.VITE_ENCRYPTION_KEY
//         );
//         console.log("data--------->", data);
//         if (data.success) {
//           setListBlogs(data.AllBlogs);
//         }
//       })
//       .catch((error) => console.error("Failed to fetch blog:", error));
//   };

//   useEffect(() => {
//   fetchBlogs();
//   window.scrollTo(0, 0); // ⬅️ scroll to top on page load
// }, []);

//   return (
//     <div className="min-h-screen bg-gray-100 p-8 mt-20">
//       <div className="max-w-6xl mx-auto grid gap-8 md:grid-cols-2">
//         {listBlogs.map((item, index) => (
//           <div
//             key={index}
//             className="bg-white shadow-lg rounded-xl p-6 flex flex-col"
//           >
//             {/* Title + Date */}
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-xl font-bold text-gray-900">
//                 {item.blogTitle}
//               </h2>
//               <p className="text-gray-600 text-sm">{item.blogDate}</p>
//             </div>

//             {/* Image */}
//             <img
//               src={item.signedImageUrl || blogTemplateImg}
//               alt={item.blogTitle}
//               className="rounded-lg max-h-[250px] object-cover mb-4"
//             />

//             {/* Content */}
//             {/* <div
//               className="prose max-w-none text-justify flex-1"
//               dangerouslySetInnerHTML={{ __html: item.blogContent }}
//             ></div> */}

//             {/* View Button */}
//             <button
//               onClick={() =>
//                 navigate("/blog-view", { state: { blog: item } }) // ✅ Passing blog data
//               }
//               className="mt-4 bg-[#2d1487] text-white px-4 py-2 rounded-full hover:bg-blue-400 transition duration-300 mx-auto w-[50%]"
//             >
//               Read More
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default BlogsAll;
///////////////////////////////////////////////////////////////////////////////////////
import React, { useEffect, useState } from "react";
import blogTemplateImg from "../../assets/blogTemplate.jpg";
import decrypt from "../../Helper/helper";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface Blog {
  blogContent: string;
  blogDate: string;
  blogImage: string;
  blogTitle: string;
  signedImageUrl?: string;
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
    <div className="min-h-screen bg-gray-100 p-8 mt-20">
      <div className="max-w-6xl mx-auto grid gap-8 md:grid-cols-2">
        {listBlogs.map((item, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-xl p-6 flex flex-col"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">
                {item.blogTitle}
              </h2>
              <p className="text-gray-600 text-sm">{item.blogDate}</p>
            </div>

            <img
              src={item.signedImageUrl || blogTemplateImg}
              alt={item.blogTitle}
              className="rounded-lg max-h-[250px] object-cover mb-4"
            />

            <button
              onClick={() => navigate("/blog-view", { state: { blog: item } })}
              className="mt-4 bg-[#2d1487] text-white px-4 py-2 rounded-full hover:bg-blue-400 transition duration-300 mx-auto w-[50%]"
            >
              Read More
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogsAll;
