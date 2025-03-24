import React, { useState, useEffect } from "react";
import { useBlog } from "../../context/BlogContext";
import EditorComponent from "./TextEditor";
import { useTag } from "../../context/TagContext";
import { useCategory } from "../../context/CategoryContext";
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

  const [success, setSuccess] = useState(false);

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

  const [errors, setErrors] = useState({
    title: false,
    content: false,
    image: false,
    categoryId: false,
  });

  const validateForm = () => {
    const newErrors = {
      title: !blogData.title,
      content: !blogData.content,
      image: !blogData.image,
      categoryId: !blogData.categoryId,
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some(Boolean);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlogData({
      ...blogData,
      [name]: value,
    });
    if (errors[name]) {
      setErrors({ ...errors, [name]: false });
    }
  };

  const handleEditorChange = (content) => {
    setBlogData((prev) => ({
      ...prev,
      content: content || "",
    }));
    if (errors.content) {
      setErrors({ ...errors, content: false });
    }
  };

  const handleCategoryChange = (e) => {
    setBlogData({
      ...blogData,
      categoryId: e.target.value,
    });
    if (errors.categoryId) {
      setErrors({ ...errors, categoryId: false });
    }
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

    if (errors.image) {
      setErrors({ ...errors, image: false });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setFileUploadStatus((prev) => ({
        ...prev,
        uploading: true,
        error: null,
      }));

      await createBlog({
        title: blogData.title,
        content: blogData.content,
        image: blogData.image,
        categoryId: blogData.categoryId,
        tagIds: blogData.tagIds,
      });

      setSuccess(true);
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

      setTimeout(() => setSuccess(false), 6000);
    } catch (err) {
      setSuccess(false);
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
    <section className="p-10 bg-onyx w-full text-white mx-auto shadow-lg">
      <div className="w-11/12 mx-auto">
        <h1 className="text-3xl font-semibold mb-6">Create Blog</h1>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="py-5 w-full">
              <label className="text-md py-2 font-bold rounded-t-md p-3 block bg-matte">
                Title{errors.title && <span className="text-red-500">*</span>}
              </label>
              <input
                type="text"
                name="title"
                value={blogData.title}
                onChange={handleChange}
                className={`w-full p-3 outline-none rounded-b-md text-onyx ${
                  errors.title ? "border-2 border-red-500" : ""
                }`}
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">Title is required</p>
              )}
            </div>
            <div className="py-5">
              <label className="text-md py-2 font-bold rounded-t-md p-3 block bg-matte">
                Category{" "}
                {errors.categoryId && <span className="text-red-500">*</span>}
              </label>
              <select
                name="categoryId"
                value={blogData.categoryId}
                onChange={handleCategoryChange}
                className={`w-full p-3 outline-none rounded-b-md text-onyx ${
                  errors.categoryId ? "border-2 border-red-500" : ""
                }`}
              >
                <option value="">Select a category</option>
                {categories &&
                  categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
              </select>
              {errors.categoryId && (
                <p className="text-red-500 text-sm mt-1">
                  Category is required
                </p>
              )}
            </div>
          </div>

          <div className="bg-white text-black rounded-md">
            <EditorComponent
              onChange={handleEditorChange}
              value={blogData.content}
              className={errors.content ? "border-2 border-red-500" : ""}
            />
          </div>
          {errors.content && (
            <p className="text-red-500 text-sm mt-1 p-2 ">
              Content is required *
            </p>
          )}

          <div className="py-5">
            <label className="text-md p-3 font-light rounded-t-md block w-full md:w-1/2 bg-matte">
              Tags
            </label>
            <div className="w-full md:w-1/2 p-3 rounded-md bg-white text-onyx flex flex-wrap gap-2">
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
          <div className="py-5">
            <label className="text-md py-2 font-light block">
              Upload Image{" "}
              {errors.image && <span className="text-red-500">*</span>}
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className={`block w-full text-sm file:mr-4 file:border-gray-500 file:text-gray-500 file:cursor-pointer file:py-2 file:px-4 
            file:border-dashed file:border-2 file:bg-onyx file:rounded-md file:text-sm 
            file:font-semibold `}
            />
            {errors.image && (
              <p className="text-red-500 text-sm mt-1">Image is required*</p>
            )}
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
              className="bg-aqua p-3 font-bold hover:scale-105 transition-all duration-300"
              disabled={loading || fileUploadStatus.uploading}
            >
              {loading || fileUploadStatus.uploading
                ? "Creating..."
                : "Create Blog Post"}
            </button>
            {success && (
              <div
                className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2
               rounded-md shadow-lg flex items-center transition-all"
              >
                <FaCheck className="mr-2" />
                Blog post created successfully!
              </div>
            )}
          </div>
        </form>
      </div>
    </section>
  );
};

export default Blog;
