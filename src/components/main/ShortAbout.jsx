import React, { useEffect, useState } from "react";
import { useBlog } from "../../context/BlogContext";
import { useNavigate } from "react-router";

const ShortAbout = () => {
  const { blog } = useBlog();
  const navigate = useNavigate();
  const [popularPosts, setPopularPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (blog && blog.length > 0) {
      setPopularPosts(blog.slice(0, 3));
      setLoading(false);
    }
  }, [blog]);

  const navigateToDetail = (id) => {
    navigate(`/blog/${id}`);
  };

  return (
    <div className="w-full mx-auto bg-white mt-10  md:w-1/3 md:mx-3 md:mt-0 h-2/3 shadow-md md:sticky right-0 top-0">
      <h1 className="font-semibold text-2xl my-3 border-l-4 border-lightgrey px-2">ABOUT ME</h1>
      <div className="w-11/12 mx-auto">
        <img
          src="https://picsum.photos/400/200"
          alt=""
          className="w-full h-full object-cover"
        />
        <p className="text-gray-500 text-sm mt-2">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Omnis sed
          optio corrupti odio. Labore repellendus inventore fugiat
          necessitatibus obcaecati, non error nesciunt tempora, asperiores, vero
          eius aliquam veniam officiis!
        </p>
      </div>
      <div className="mt-10">
        <h3 className="border-l-4 border-lightgrey px-2">Popular posts</h3>
        <ul className="w-full my-3 px-3">
          {popularPosts.slice(0, 3).map((post, index) => (
            <li
              key={index}
              className="flex border-y py-3 hover:scale-105 transition-all duration-500"
              onClick={() => navigateToDetail(post.id)}
              style={{ cursor: "pointer" }}
            >
              <div className="w-2/3">
                <span className="text-aqua font-bold uppercase text-[0.7em]">
                  {post.categoryName}
                </span>
                <h5 className="text-grey text-lg font-bold uppercase">
                  {post.title}
                </h5>
                <div>
                  {post.blogTags &&
                    Array.isArray(post.blogTags) &&
                    post.blogTags.map((tagObj, tagIndex) => (
                      <span
                        key={tagObj.id || tagIndex}
                        className="text-grey text-sm font-bold mr-2"
                      >
                        {tagObj.tag ? tagObj.tag.name : ""}
                      </span>
                    ))}
                </div>
              </div>
              <img
                src={`${import.meta.env.VITE_API_URL_IMAGE}${post.imgUrl}`}
                alt={post.title}
                className="w-1/3 object-cover"
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ShortAbout;
