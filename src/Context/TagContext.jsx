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
    } finally {
      setLoading(false);
    }
  };

  const createTag = async (tagData) => {
    if (!tagData.name || !tagData.name.trim()) {
      setError("Tag Name is mandatory");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response2 = await axios.post(
        `${import.meta.env.VITE_API_URL}/Tag/create`,
        tagData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      await fetchTags();

      return response2.data;
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.message || "Failed to create tag");
      } else {
        setError("An unexpected error occurred");
      }

      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteTag = async (tagId) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/Tag/delete?id=${tagId}`
      );
      await fetchTags();
      return response.data;
    } catch (err) {
      setError("Failed to delete category");
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
