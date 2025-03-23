import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { useBlog } from "../../context/BlogContext";
import { Link } from "react-router";
import Loading from "../loading/Loading";

const BlogDetailPage = () => {
  const { id } = useParams();
  const { getBlogById, singleBlog, loading, error, blog, fetchBlogs } = useBlog();
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
      const filteredPosts = blog.filter(post => post.id !== id);
      const randomPosts = filteredPosts.slice(0, 3);
      setRelatedPosts(randomPosts);
    }
  }, [blog, id]);

  if (loading) return <Loading />;

  if (!singleBlog) return <div className="flex justify-center items-center h-screen">No blog post found</div>;

  return (
    <section className="bg-halfwhite relative">
      <div className="mt-10 max-w-screen-xl mx-auto bg-white">
        <div>
          <div className="w-full md:h-[500px] bg-gray-100">
            {singleBlog.imgUrl && (
              <img
                src={`${import.meta.env.VITE_API_URL_IMAGE}${singleBlog.imgUrl}`}
                alt={singleBlog.title}
                className="w-full h-full object-cover"
              />
            )}
          </div>
          <div className="p-4">
            <h3 className="text-aqua my-5 font-bold uppercase truncate text-xl">
              {singleBlog.categoryName || "Category"}
            </h3>
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
        <div className="mt-5 p-4">
          <h1 className="uppercase font-bold">Related Posts</h1>
          {relatedPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              {relatedPosts.map(post => (
                <Link
                  to={`/blog/${post.id}`}
                  key={post.id}
                  className="block hover:shadow-lg transition-shadow"
                >
                  <div className="border rounded overflow-hidden">
                    <div className="h-48 overflow-hidden bg-gray-100">
                      {post.imgUrl && (
                        <img
                          src={`${import.meta.env.VITE_API_URL_IMAGE}${post.imgUrl}`}
                          alt={post.title}
                          className="w-full h-full object-cover hover:scale-105 transition-transform"
                        />
                      )}
                    </div>
                    <div className="p-3">
                      <h3 className="text-aqua text-sm font-semibold uppercase truncate">
                        {post.categoryName || "Category"}
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
    </section>
  );
};

export default BlogDetailPage;