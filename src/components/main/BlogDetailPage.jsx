import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router";
import { useBlog } from "../../context/BlogContext";

const BlogDetailPage = () => {
  const { id } = useParams();
  const { getBlogById, singleBlog, loading, error } = useBlog();
  const [imageLoaded, setImageLoaded] = useState(false);
  const fetchedRef = useRef(false);

  useEffect(() => {
    setImageLoaded(false);

    if (id && (!fetchedRef.current || fetchedRef.current !== id)) {
      getBlogById(id);
      fetchedRef.current = id;
    }

    return () => {};
  }, [id, getBlogById]);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!singleBlog) return <div>Waiting for blog data...</div>;

  return (
    <section className="mt-10 max-w-screen-xl mx-auto">
      <div className="w-full h-[500px]">
        <img
          src={`${import.meta.env.VITE_API_URL_IMAGE}${singleBlog.imgUrl}`}
          alt={singleBlog.title}
          onLoad={handleImageLoad}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-aqua my-5 font-bold uppercase  truncate text-xl">
          {singleBlog.categoryName || "Category"}
        </h3>
        <h1 className="font-bold text-2xl mt-2 uppercase   ">
          {singleBlog.title || "Category"}
        </h1>
        <div className="text-gray-500 text-lg mt-5">
          {singleBlog.description && (
            <div dangerouslySetInnerHTML={{ __html: singleBlog.description }} />
          )}
        </div>
      </div>
    </section>
  );
};

export default BlogDetailPage;
