import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const TagContext = createContext();

export const useTag = () => {
  const context = useContext(TagContext);
  return context;
};

export const TagProvider = ({ children }) => {
  const [tags, setTags] = useState([]);
  const [colors, setColors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTags = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/Tag/getall`
      );
      setTags(response.data);
    } catch (err) {
      setError("Failed to fetch tags");
      console.error("Error fetching tags:", err);
    } finally {
      setLoading(false);
    }
  };

  const createTag = async (TagData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/Tag/create`,
        categoryData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      await fetchTags();
      return response.data;
    } catch (err) {
      setError("Failed to create category");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteTag = async (categoryId) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/Tag/delete?id=${categoryId}`
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

  const fetchColors = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/Color/getall`
      );
      setColors(response.data);
    } catch (err) {
      setError("Failed to fetch colors");
      console.error("Error fetching colors:", err);
    } finally {
      setLoading(false);
    }
  };

  const createColor = async (colorData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/Color/create`,
        colorData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      await fetchColors();
      return response.data;
    } catch (err) {
      setError("Failed to create color");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteColor = async (colorId) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/Color/remove?id=${colorId}`
      );
      await fetchColors();
      return response.data;
    } catch (err) {
      setError("Failed to delete color");
      console.error("Error deleting color:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTags();
    fetchColors();
  }, []);

  const value = {
    tags,
    colors,
    loading,
    error,
    fetchTags,
    fetchColors,
    deleteColor,
    createColor,
    createTag,
    deleteTag,
  };

  return <TagContext.Provider value={value}>{children}</TagContext.Provider>;
};
