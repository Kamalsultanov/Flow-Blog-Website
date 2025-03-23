import React, { useState, useEffect } from "react";
import { useBlog } from "../../context/BlogContext";
import EditorComponent from "./TextEditor";
import { useTag } from "../../Context/TagContext";
import { useCategory } from "../../Context/CategoryContext";
import { FaCheck } from "react-icons/fa";

const Blog = () => {
  const {
    blog,
    loading,
    error,
    createBlog,
    deleteBlog,
    updateBlog,
    uploadImage,
  } = useBlog();

  const { tags } = useTag();
  const { categories } = useCategory();

  const [blogData, setBlogData] = useState({
    title: "",
    content: "",
    image: null,
    imageUrl: "",
    categoryId: "",
    tagIds: [],
  });

  const [fileUploadStatus, setFileUploadStatus] = useState({
    uploading: false,
    error: null,
    fileName: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlogData({
      ...blogData,
      [name]: value,
    });
  };

  const handleEditorChange = (content) => {
    setBlogData((prev) => ({
      ...prev,
      content: content || "",
    }));
  };

  const handleCategoryChange = (e) => {
    setBlogData({
      ...blogData,
      categoryId: e.target.value,
    });
  };

  const handleToggleTag = (tagId) => {
    setBlogData((prevData) => {
      const isAlreadySelected = prevData.tagIds.includes(tagId);
      return {
        ...prevData,
        tagIds: isAlreadySelected
          ? prevData.tagIds.filter((id) => id !== tagId) 
          : [...prevData.tagIds, tagId], 
      };
    });
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setBlogData((prev) => ({
      ...prev,
      image: file,
    }));

    setFileUploadStatus({
      uploading: false,
      error: null,
      fileName: file.name,
    });

    const previewUrl = URL.createObjectURL(file);
    setBlogData((prev) => ({
      ...prev,
      imageUrl: previewUrl,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!blogData.title) {
      alert("Title is required");
      return;
    }

    if (!blogData.image) {
      alert("Please upload an image");
      return;
    }

    if (!blogData.content) {
      alert("Content is required");
      return;
    }

    if (!blogData.categoryId) {
      alert("Please select a category");
      return;
    }

    try {
      setFileUploadStatus((prev) => ({
        ...prev,
        uploading: true,
        error: null,
      }));

      console.log("Submitting blog data:", {
        title: blogData.title,
        description: blogData.content,
        image: blogData.image ? blogData.image.name : "No image",
        categoryId: blogData.categoryId,
        tagIds: blogData.tagIds,
      });

      await createBlog({
        title: blogData.title,
        content: blogData.content,
        image: blogData.image,
        categoryId: blogData.categoryId,
        tagIds: blogData.tagIds,
      });
      setBlogData({
        title: "",
        content: "",
        image: null,
        imageUrl: "",
        categoryId: "",
        tagIds: [],
      });

      if (blogData.imageUrl && blogData.imageUrl.startsWith("blob:")) {
        URL.revokeObjectURL(blogData.imageUrl);
      }

      setFileUploadStatus({
        uploading: false,
        error: null,
        fileName: "",
      });
    } catch (err) {
      console.error("Error creating blog post:", err);
      setFileUploadStatus({
        uploading: false,
        error: err.message || "Failed to create blog post",
        fileName: blogData.image ? blogData.image.name : "",
      });
    }
  };

  useEffect(() => {
    return () => {
      if (blogData.imageUrl && blogData.imageUrl.startsWith("blob:")) {
        URL.revokeObjectURL(blogData.imageUrl);
      }
    };
  }, [blogData.imageUrl]);

  return (
    <section className="p-10 bg-onyx w-full md:w-[80%] text-white mx-auto  shadow-lg">
      <h1 className="text-3xl font-semibold mb-6">Create Blog</h1>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="py-5 w-full">
            <label className="text-md py-2 font-bold rounded-t-md p-3 block bg-matte">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={blogData.title}
              onChange={handleChange}
              className="w-full  p-3 outline-none rounded-b-md text-onyx "
              required
            />
          </div>
          <div className="py-5">
            <label className="text-md py-2 font-bold rounded-t-md   p-3  block bg-matte">
              Category
            </label>
            <select
              name="categoryId"
              value={blogData.categoryId}
              onChange={handleCategoryChange}
              className="w-full  p-3 outline-none rounded-b-md text-onyx"
              required
            >
              <option value="">Select a category</option>
              {categories &&
                categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
            </select>
          </div>
        </div>

        <div className=" bg-white text-black rounded-md">
          <EditorComponent
            onChange={handleEditorChange}
            value={blogData.content}
          />
        </div>

        <div className="py-5">
          <label className="text-md p-3 font-light rounded-t-md block w-1/2 bg-matte ">
            Tags
          </label>
          <div className="w-1/2 p-3 rounded-md bg-white text-onyx flex flex-wrap gap-2">
            {tags.map((tag) => {
              const tagColorHex = tag.colorHexCode || "#cccccc";
              const isSelected = blogData.tagIds.includes(tag.id);

              return (
                <div
                  key={tag.id}
                  onClick={() => handleToggleTag(tag.id)}
                  className={`cursor-pointer flex items-center
                     justify-center px-4 text-white 
                    rounded-full overflow-hidden py-2 min-w-16 relative group  transition-all duration-500 `}
                  style={{ backgroundColor: tagColorHex }}
                >
                  {tag.name}{" "}
                  {isSelected ? (
                    <div
                      className="w-full absolute backdrop-blur-lg h-full top-0 left-0 right-0 
                    bottom-0 flex justify-center items-center  transition-all duration-500"
                    >
                      <FaCheck color="black" />
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              );
            })}
          </div>
        </div>
        <div className="py-5 ">
          <label className="text-md py-2 font-light block">Upload Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="block w-full text-sm  file:mr-4 file:border-gray-500 file:text-gray-500 file:cursor-pointer file:py-2 file:px-4 
            file:border-dashed  file:border-2 file:bg-onyx file:rounded-md file:text-sm 
            file:font-semibold "
          />
          {blogData.imageUrl && (
            <div className="mt-3">
              <div className="mt-2 max-w-xs">
                <img
                  src={blogData.imageUrl}
                  alt="Preview"
                  className="max-w-full h-auto rounded-md border border-gray-400"
                />
              </div>
            </div>
          )}
        </div>
        <div className="py-5">
          <button
            type="submit"
            className="bg-aqua p-3 font-bold   hover:scale-105 transition-all duration-300"
            disabled={loading || fileUploadStatus.uploading}
          >
            {loading || fileUploadStatus.uploading
              ? "Creating..."
              : "Create Blog Post"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Blog;
