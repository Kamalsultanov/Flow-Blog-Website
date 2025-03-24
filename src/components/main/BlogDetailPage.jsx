import React, { useEffect, useRef, useState } from "react";
import { Links, useParams } from "react-router";
import { useBlog } from "../../context/BlogContext";
import { Link } from "react-router";
import Loading from "../loading/Loading";
import ShortAbout from "./ShortAbout";

const BlogDetailPage = () => {
  const { id } = useParams();
  const { getBlogById, singleBlog, loading, error, blog, fetchBlogs } =
    useBlog();
  const [relatedPosts, setRelatedPosts] = useState([]);
  const fetchedRef = useRef(false);

  useEffect(() => {
    if (id && (!fetchedRef.current || fetchedRef.current !== id)) {
      getBlogById(id);
      fetchBlogs();
      fetchedRef.current = id;
    }
  }, [id, getBlogById, fetchBlogs]);

  useEffect(() => {
    if (blog && Array.isArray(blog) && blog.length > 0 && id) {
      const filteredPosts = blog.filter((post) => post.id !== id);
      const randomPosts = filteredPosts.slice(0, 3);
      setRelatedPosts(randomPosts);
    }
  }, [blog, id]);

  if (loading) return <Loading />;

  if (!singleBlog)
    return (
      <div className="flex justify-center items-center h-screen">
        No blog post found
      </div>
    );

  return (
    <section className="bg-halfwhite relative w-11/12  pt-10 mx-auto md:flex">
      <div className=" max-w-screen-xl mx-auto bg-white shadow-md">
        <div>
          <div className="w-full md:h-[500px] bg-gray-100">
            {singleBlog.imgUrl && (
              <img
                src={`${import.meta.env.VITE_API_URL_IMAGE}${
                  singleBlog.imgUrl
                }`}
                alt={singleBlog.title}
                className="w-full h-full object-cover"
              />
            )}
          </div>
          <div className="p-4">
            <Link to={`/category/${singleBlog.categoryName}`}>
              <h3 className="text-aqua my-5 font-bold uppercase truncate text-xl">
                {singleBlog.categoryName || "Category"}
              </h3>
            </Link>
            <h1 className="font-bold text-2xl mt-2 uppercase">
              {singleBlog.title || "Title"}
            </h1>
            <div className="text-gray-500 text-lg mt-5">
              {singleBlog.description && (
                <div
                  dangerouslySetInnerHTML={{ __html: singleBlog.description }}
                />
              )}
            </div>
          </div>
        </div>
        <div className="p-5 border-y ">
          {singleBlog.blogTags &&
            Array.isArray(singleBlog.blogTags) &&
            singleBlog.blogTags.map((tagObj, tagIndex) => (
              <span
                key={tagObj.id || tagIndex}
                className="text-grey text-sm font-bold mr-2 hover:text-aqua transition-all duration-500"
              >
                {tagObj.tag ? tagObj.tag.name : ""}
              </span>
            ))}
        </div>
        <div className="mt-5 p-4">
          <h1 className="uppercase font-bold">Related Posts</h1>
          {relatedPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              {relatedPosts.map((post) => (
                <Link
                  to={`/blog/${post.id}`}
                  key={post.id}
                  className="block hover:shadow-lg transition-shadow duration-500"
                >
                  <div className="border  overflow-hidden">
                    <div className="h-48 overflow-hidden bg-gray-100">
                      {post.imgUrl && (
                        <img
                          src={`${import.meta.env.VITE_API_URL_IMAGE}${
                            post.imgUrl
                          }`}
                          alt={post.title}
                          className="w-full h-full object-cover "
                        />
                      )}
                    </div>
                    <div className="p-3">
                      <h3 className="text-aqua text-sm font-semibold uppercase truncate">
                        {post.categoryName }
                      </h3>
                      <h2 className="font-bold truncate">{post.title}</h2>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="relative h-48">
              <Loading />
              <p className="text-center mt-32">Finding related posts...</p>
            </div>
          )}
        </div>
      </div>
      <ShortAbout />
    </section>
  );
};

export default BlogDetailPage;
