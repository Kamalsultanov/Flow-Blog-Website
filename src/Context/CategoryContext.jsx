import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const CategoryContext = createContext();

export const useCategory = () => {
  const context = useContext(CategoryContext);
  return context;
};

export const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCategories = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/Category/GetAll`
      );
      setCategories(response.data);
    } catch (err) {
      setError("Failed to fetch categories");
y    } finally {
      setLoading(false);
    }
  };

  const createCategory = async (categoryData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/Category/create`,
        categoryData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      await fetchCategories();
      return response.data;
    } catch (err) {
      setError("Failed to create category");
      console.error("Error creating category:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateCategory = async (categoryID, updatedData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/Category/update`,
        {
          id: categoryID,
          name: updatedData.name,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      await fetchCategories();
      return response.data;
    } catch (err) {
      setError("Failed to update category");
      console.error("Error updating category:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteCategory = async (categoryId) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/Category/delete?id=${categoryId}`
      );
      await fetchCategories();
      return response.data;
    } catch (err) {
      setError("Failed to delete category");
      console.error("Error deleting category:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const value = {
    categories,
    loading,
    error,
    fetchCategories,
    createCategory,
    deleteCategory,
    updateCategory,
  };

  return (
    <CategoryContext.Provider value={value}>
      {children}
    </CategoryContext.Provider>
  );
};
