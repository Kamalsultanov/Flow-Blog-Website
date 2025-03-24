import React, { useState } from "react";
import { useCategory } from "../../context/CategoryContext";
import { FaRegTrashCan } from "react-icons/fa6";
import { FaPen } from "react-icons/fa";

const Category = () => {
  const {
    categories,
    loading,
    error,
    createCategory,
    deleteCategory,
    updateCategory,
  } = useCategory();

  const [categoryName, setCategoryName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editCategoryId, setEditCategoryId] = useState(null);
  const [newCategoryName, setNewCategoryName] = useState("");

  const handleInputChange = (e) => setCategoryName(e.target.value);

  const handleCreateCategory = async () => {
    if (!categoryName.trim()) {
      setMessage("Please enter a category name");
      return;
    }

    setIsLoading(true);
    try {
      await createCategory({ name: categoryName });
      setMessage("Category created successfully!");
      setCategoryName("");
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to create category");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    setIsLoading(true);
    try {
      await deleteCategory(categoryId);
      setMessage("Category deleted successfully!");
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to delete category");
    } finally {
      setIsLoading(false);
    }
  };

  const openEditModal = (categoryId, currentName) => {
    setEditCategoryId(categoryId);
    setNewCategoryName(currentName);
    setIsEditModalOpen(true);
  };

  const handleUpdateCategory = async () => {
    if (!newCategoryName.trim()) return alert("Category name cannot be empty.");

    setIsLoading(true);
    try {
      await updateCategory(editCategoryId, { name: newCategoryName });
      setMessage("Category updated successfully!");
      setIsEditModalOpen(false);
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to update category");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="p-10 bg-onyx w-full text-white min-h-screen">
      <div className="w-11/12 mx-auto">
        <h1 className="text-3xl font-semibold">Categories</h1>
        <div className="flex flex-col mt-6">
          <h3 className="text-lg font-medium">Create a New Category</h3>
          <div className=" items-center mt-5 space-x-3 flex flex-col sm:flex-row ">
            <input
              type="text"
              className="w-full md:w-1/2 py-2 px-4 border border-gray-300 text-black focus:outline-aqua"
              placeholder="Enter category name"
              value={categoryName}
              onChange={handleInputChange}
              disabled={isLoading}
              onKeyDown={(e) => e.key === "Enter" && handleCreateCategory()}
            />
            <button
              className="text-white   w-14 h-12  my-5 text-2xl flex items-center justify-center bg-aqua"
              onClick={handleCreateCategory}
              disabled={isLoading}
            >
              {isLoading ? "...." : " +"}
            </button>
          </div>
          {message && (
            <p
              className={`mt-3 ${
                message.includes("Failed") ? "text-red-400" : "text-green-400"
              }`}
            >
              {message}
            </p>
          )}
        </div>

        <div className="mt-10">
          <h3 className="text-lg font-medium mb-4">Existing Categories:</h3>
          {loading ? (
            <p>Loading categories...</p>
          ) : error ? (
            <p className="text-red-400">{error}</p>
          ) : categories.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className="bg-matte font-bold capitalize p-4 rounded flex relative justify-between items-center group overflow-hidden"
                >
                  <span className="capitalize">{category.name}</span>
                  <div className="flex gap-3 absolute -right-12 group-hover:right-1 transition-all duration-500">
                    <button onClick={() => handleDeleteCategory(category.id)}>
                      <FaRegTrashCan />
                    </button>
                    <button
                      onClick={() => openEditModal(category.id, category.name)}
                    >
                      <FaPen />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No categories found.</p>
          )}
        </div>

        {isEditModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-matte w-11/12 md:w-2/4 p-6 rounded shadow-lg text-black">
              <h2 className="text-lg font-bold mb-4 text-white">
                Update Category
              </h2>
              <input
                type="text"
                className="w-full border p-2 mb-4"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
              />
              <div className="flex justify-end gap-2 flex-col">
                <button
                  className="bg-slate-700 text-white px-4 py-2 rounded"
                  onClick={handleUpdateCategory}
                  disabled={isLoading}
                >
                  {isLoading ? "Updating..." : "Update"}
                </button>
                <button
                  className="bg-jet text-white px-4 py-2 rounded"
                  onClick={() => setIsEditModalOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Category;
