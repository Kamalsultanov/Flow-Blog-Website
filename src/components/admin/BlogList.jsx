import React, { useState, useEffect } from "react";
import { useBlog } from "../../context/BlogContext";
import { useCategory } from "../../context/CategoryContext";
import { useTag } from "../../context/TagContext";
import EditorComponent from "./TextEditor";
import { RiEmotionSadLine } from "react-icons/ri";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import { FaRegTrashCan } from "react-icons/fa6";
import { FaPen } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { FaCheck } from "react-icons/fa";

const BlogList = () => {
  const { blog, loading, error, deleteBlog, updateBlog, fetchBlogs } =
    useBlog();
  const { categories } = useCategory();
  const { tags } = useTag();

  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [activeCategory, setActiveCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const [blogToEdit, setBlogToEdit] = useState(null);
  const [editFormData, setEditFormData] = useState({
    title: "",
    categoryId: "",
    content: "",
    tagIds: [],
    image: null,
    imageUrl: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const blogsPerPage = 8;

  useEffect(() => {
    setFilteredBlogs(blog);
  }, [blog]);

  useEffect(() => {
    if (activeCategory === "") {
      setFilteredBlogs(blog);
    } else {
      setFilteredBlogs(
        blog.filter((item) => item.categoryName === activeCategory)
      );
    }
    setCurrentPage(1);
  }, [blog, activeCategory]);

  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);
  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleFind = () => {
    setActiveCategory(selectedCategory);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleEditBlog = (blogPost) => {
    setBlogToEdit(blogPost);

    const selectedTagIds = blogPost.blogTags
      ? blogPost.blogTags
          .map((tagItem) => tagItem.tagId)
          .filter((id) => id !== null && id !== undefined)
      : [];

    const categoryObj = categories.find(
      (cat) => cat.name === blogPost.categoryName
    );
    const categoryId = categoryObj ? categoryObj.id : "";

    setEditFormData({
      title: blogPost.title || "",
      categoryId: categoryId || "",
      content: blogPost.description || "",
      tagIds: selectedTagIds,
      image: null,
      imageUrl: blogPost.imgUrl
        ? `${import.meta.env.VITE_API_URL_IMAGE}${blogPost.imgUrl}`
        : "",
    });

    setShowEditForm(true);
  };

  const handleEditFormChange = (e) => {
    const { name, value, files, type } = e.target;

    if (type === "file" && files[0]) {
      const file = files[0];
      const previewUrl = URL.createObjectURL(file);

      setEditFormData({
        ...editFormData,
        image: file,
        imageUrl: previewUrl,
      });
    } else {
      setEditFormData({
        ...editFormData,
        [name]: value,
      });
    }
  };

  const handleEditorChange = (content) => {
    setEditFormData((prev) => ({
      ...prev,
      content: content || "",
    }));
  };

  const handleToggleTag = (tagId) => {
    if (!tagId) return;

    setEditFormData((prevData) => {
      const isAlreadySelected = prevData.tagIds.includes(tagId);
      return {
        ...prevData,
        tagIds: isAlreadySelected
          ? prevData.tagIds.filter((id) => id !== tagId)
          : [...prevData.tagIds, tagId],
      };
    });
  };

  const handleCloseEditForm = () => {
    setShowEditForm(false);
    setBlogToEdit(null);
    if (editFormData.imageUrl && editFormData.imageUrl.startsWith("blob:")) {
      URL.revokeObjectURL(editFormData.imageUrl);
    }
    setEditFormData({
      title: "",
      categoryId: "",
      content: "",
      tagIds: [],
      image: null,
      imageUrl: "",
    });
  };

  const handleSubmitEditForm = async (e) => {
    e.preventDefault();
    if (!blogToEdit) return;

    if (!editFormData.title) {
      alert("Title is required");
      return;
    }

    if (!editFormData.content) {
      alert("Content is required");
      return;
    }

    if (!editFormData.categoryId) {
      alert("Please select a category");
      return;
    }

    setIsSubmitting(true);

    try {
      const cleanedTagIds = editFormData.tagIds.filter(
        (id) => id !== null && id !== undefined
      );

      const updateData = {
        title: editFormData.title,
        content: editFormData.content,
        categoryId: editFormData.categoryId,
        tagIds: cleanedTagIds,
        image: editFormData.image || null,
        imageUrl:
          !editFormData.image && editFormData.imageUrl
            ? editFormData.imageUrl.replace(
                `${import.meta.env.VITE_API_URL_IMAGE}`,
                ""
              )
            : "",
      };

      await updateBlog(blogToEdit.id, updateData);

      handleCloseEditForm();
      await fetchBlogs();
    } catch (error) {
      console.error("Error updating blog:", error);
      alert("Failed to update blog. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleShowDeleteConfirmation = (blog) => {
    setBlogToDelete(blog);
    setDeleteConfirmation(true);
  };

  const handleCancelDelete = () => {
    setBlogToDelete(null);
    setDeleteConfirmation(false);
  };

  const handleDeleteBlog = async () => {
    if (!blogToDelete) return;

    try {
      await deleteBlog(blogToDelete.id);
      setDeleteConfirmation(false);
      setBlogToDelete(null);
    } catch (error) {
      console.error("Error deleting blog:", error);
      alert("Failed to delete blog. Please try again.");
    }
  };

  useEffect(() => {
    return () => {
      if (editFormData.imageUrl && editFormData.imageUrl.startsWith("blob:")) {
        URL.revokeObjectURL(editFormData.imageUrl);
      }
    };
  }, []);

  return (
    <section className="p-10 bg-onyx w-full  text-white  min-h-screen shadow-lg">
      <div className=" ">
        <div>
          <h3 className="text-2xl font-bold mb-6">Blog List</h3>
          <div className="flex gap-4 mb-8">
            <select
              name="Category"
              id="Category"
              className="bg-matte outline-none w-1/2 p-2 rounded"
              value={selectedCategory}
              onChange={handleCategoryChange}
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
            <button className="px-4 py-2 bg-aqua" onClick={handleFind}>
              Find
            </button>
          </div>

          {!loading && !error && (
            <div>
              <div
                className="w-full p-3 grid grid-cols-1 md:grid-cols-4 min-h-[600px] border-2 border-jet rounded-md
             bg-matte gap-3 transition-all duration-300"
              >
                {currentBlogs.length > 0 ? (
                  currentBlogs.map((blogPost) => (
                    <div
                      key={blogPost.id}
                      className="bg-jet overflow-hidden shadow-md h-full w-full flex flex-col relative group"
                    >
                      {blogPost.imgUrl && (
                        <div className="h-2/3 overflow-hidden">
                          <img
                            src={`${import.meta.env.VITE_API_URL_IMAGE}${
                              blogPost.imgUrl
                            }`}
                            alt={blogPost.title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.onerror = null;
                            }}
                          />
                        </div>
                      )}
                      <div className="p-3 flex-1 flex flex-col ">
                        <h4 className="text-xl font-semibold mb-2 capitalize ">
                          {blogPost.title}
                        </h4>

                        <div className="mt-auto">
                          <div className="flex flex-col sm:flex-row justify-between items-center mb-3">
                            <span className="bg-matte px-2 py-1 rounded text-sm">
                              {blogPost.categoryName}
                            </span>
                            {blogPost.blogTags &&
                              blogPost.blogTags.length > 0 && (
                                <div className="flex flex-wrap gap-2 mt-2">
                                  {blogPost.blogTags
                                    .slice(0, 3)
                                    .map((tagItem) => (
                                      <span
                                        key={tagItem.id}
                                        className="px-2 py-1 rounded-full text-xs bg-aqua "
                                      >
                                        {tagItem.tag.name}
                                      </span>
                                    ))}
                                </div>
                              )}
                          </div>
                        </div>
                      </div>
                      <div
                        className="absolute top-0 right-0 w-full justify-center items-center h-full backdrop-blur-md hidden 
                      group-hover:flex transition-all duration-300"
                      >
                        <FaPen
                          className="w-10 h-10 text-white mx-1 cursor-pointer"
                          onClick={() => handleEditBlog(blogPost)}
                        />
                        <FaRegTrashCan
                          className="w-10 h-10 text-red-700 cursor-pointer"
                          onClick={() => handleShowDeleteConfirmation(blogPost)}
                        />
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full w-full h-full text-center flex items-center justify-center">
                    <RiEmotionSadLine className="w-36 h-36 text-white mx-auto transition-all duration-500" />
                  </div>
                )}
              </div>

              <div className="flex justify-center items-center gap-4 mt-8">
                <button
                  className={`px-4 py-2 rounded ${
                    currentPage > 1 ? "bg-aqua" : "bg-matte cursor-not-allowed"
                  }`}
                  onClick={handlePrevPage}
                  disabled={currentPage <= 1}
                >
                  <IoIosArrowBack />
                </button>
                <span className="px-4">
                  {currentPage} / {totalPages || 1}
                </span>
                <button
                  className={`px-4 py-2 rounded ${
                    currentPage < totalPages
                      ? "bg-aqua hover:bg-blue-700"
                      : "bg-matte cursor-not-allowed"
                  }`}
                  onClick={handleNextPage}
                  disabled={currentPage >= totalPages}
                >
                  <IoIosArrowForward />
                </button>
              </div>
            </div>
          )}
        </div>

        {deleteConfirmation && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-matte p-6 rounded-lg max-w-md w-full">
              <h4 className="text-xl font-bold mb-4">Confirm Delete</h4>
              <p className="mb-6">
                Are you sure you want to delete "{blogToDelete?.title}"? This
                action cannot be undone.
              </p>
              <div className="flex justify-end gap-4">
                <button
                  className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-700"
                  onClick={handleCancelDelete}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-red-600 rounded hover:bg-red-700"
                  onClick={handleDeleteBlog}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {showEditForm && blogToEdit && (
          <div className="w-full ">
            <div className="bg-jet p-6 rounded-lg  ">
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-xl font-bold">Edit Blog</h4>
                <button
                  className="text-gray-400 hover:text-white"
                  onClick={handleCloseEditForm}
                >
                  <IoClose size={24} />
                </button>
              </div>

              <form onSubmit={handleSubmitEditForm}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 items-center">
                  <div className="w-full">
                    <label className="text-md py-2 font-bold rounded-t-md p-3 block bg-matte">
                      Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={editFormData.title}
                      onChange={handleEditFormChange}
                      className="w-full p-3 outline-none rounded-b-md text-onyx"
                      required
                    />
                  </div>
                  <div className="">
                    <label className="text-md py-2 font-bold rounded-t-md p-3 block bg-matte">
                      Category
                    </label>
                    <select
                      name="categoryId"
                      value={editFormData.categoryId}
                      onChange={handleEditFormChange}
                      className="w-full p-3 outline-none rounded-b-md text-onyx"
                      required
                    >
                      <option value="">Select a category</option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="">
                    <label className="text-md p-3 font-light rounded-t-md block  bg-matte">
                      Tags
                    </label>
                    <div className="w-full  p-3 rounded-md bg-white text-onyx flex flex-wrap gap-2">
                      {tags.map((tag) => {
                        const tagColorHex = tag.colorHexCode || "#cccccc";
                        const isSelected = editFormData.tagIds.includes(tag.id);

                        return (
                          <div
                            key={tag.id}
                            onClick={() => handleToggleTag(tag.id)}
                            className={`cursor-pointer flex items-center
                           justify-center px-4 text-white 
                          rounded-full overflow-hidden py-2 min-w-16 relative group transition-all duration-500`}
                            style={{ backgroundColor: tagColorHex }}
                          >
                            {tag.name}{" "}
                            {isSelected ? (
                              <div
                                className="w-full absolute backdrop-blur-lg h-full top-0 left-0 right-0 
                          bottom-0 flex justify-center items-center transition-all duration-500"
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
                </div>

                <div className="bg-white text-black rounded-md mb-4">
                  <EditorComponent
                    onChange={handleEditorChange}
                    value={editFormData.content}
                  />
                </div>

                <div className="py-5">
                  <label className="text-md py-2 font-light block">
                    Update Image
                  </label>
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleEditFormChange}
                    className="block w-full text-sm file:mr-4 file:border-gray-500 file:text-gray-500 file:cursor-pointer file:py-2 file:px-4 
                  file:border-dashed file:border-2 file:bg-onyx file:rounded-md file:text-sm 
                  file:font-semibold"
                  />
                  {editFormData.imageUrl && (
                    <div className="mt-3">
                      <p className="mb-2">Preview:</p>
                      <img
                        src={editFormData.imageUrl}
                        alt="Preview"
                        className="w-48 h-48 object-cover rounded"
                      />
                    </div>
                  )}
                </div>

                <div className="flex justify-end mt-6">
                  <button
                    type="button"
                    className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-700 mr-4"
                    onClick={handleCloseEditForm}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-aqua rounded hover:bg-blue-700"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Updating..." : "Update Blog"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogList;
