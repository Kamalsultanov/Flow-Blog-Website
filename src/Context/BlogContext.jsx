import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const BlogContext = createContext();

export const useBlog = () => {
  return useContext(BlogContext);
};

export const BlogProvider = ({ children }) => {
  const [blog, setBlog] = useState([]);
  const [singleBlog, setSingleBlog] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchBlogs = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/Blog/getall`
      );
      setBlog(response.data);
    } catch (err) {
      setError("Failed to fetch blogs");
    } finally {
      setLoading(false);
    }
  };

  const getBlogById = async (id) => {
    setLoading(true);
    setError(null);

    if (!id) {
      setError("Blog ID is required");
      setSingleBlog(null);
      setLoading(false);
      return;
    }

    try {
      const url = new URL(`${import.meta.env.VITE_API_URL}/Blog/getbyid`);
      url.searchParams.append("id", id);

      const response = await axios.get(url.toString(), {
        timeout: 10000,
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.data) {
        throw new Error("No data returned from server");
      }

      setSingleBlog(response.data);
    } catch (err) {
      console.error("Blog fetch error:", err);

      if (err.response) {
        if (err.response.status === 404) {
          setError(`Blog with ID ${id} not found`);
        } else {
          setError(`Server error: ${err.response.status}`);
        }
      } else if (err.request) {
        setError("Server not responding. Please try again later.");
      } else {
        setError(`Failed to fetch blog: ${err.message}`);
      }

      setSingleBlog(null);
    } finally {
      setLoading(false);
    }
  };
  const uploadImage = async (formData, folderName = "blog_images") => {
    setLoading(true);
    setError(null);
    try {
      let uploadFormData = new FormData();
      if (formData instanceof FormData) {
        uploadFormData = formData;
        if (!uploadFormData.has("FolderName")) {
          uploadFormData.append("FolderName", folderName);
        }
      } else {
        uploadFormData.append("File", formData);
        uploadFormData.append("FolderName", folderName);
      }
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/FileUpload/upload`,
        uploadFormData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      return response.data;
    } catch (err) {
      setError("Failed to upload image");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const createBlog = async (data) => {
    setLoading(true);
    setError(null);
    try {
      let imgUrl = "";
      if (data.image) {
        try {
          const uploadFormData = new FormData();
          uploadFormData.append("File", data.image);
          uploadFormData.append("FolderName", "blog_images");
          const uploadResponse = await uploadImage(uploadFormData);
          imgUrl =
            uploadResponse.url ||
            uploadResponse.imgUrl ||
            uploadResponse.imageUrl ||
            "";
        } catch (uploadErr) {
          throw new Error(
            "Failed to upload image: " + (uploadErr.message || "Unknown error")
          );
        }
      }
      const description = data.description || data.content || "";
      const cleanedTagIds = Array.isArray(data.tagIds)
        ? data.tagIds.filter((id) => id)
        : typeof data.tags === "string"
        ? data.tags.split(",").filter(Boolean)
        : [];
      const blogData = {
        imgUrl,
        title: data.title,
        description,
        categoryId: data.categoryId,
        tagIds: cleanedTagIds,
      };
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/Blog/create`,
        blogData,
        { headers: { "Content-Type": "application/json" } }
      );
      await fetchBlogs();
      return response.data;
    } catch (err) {
      if (err.response?.data?.errors) {
        const validationErrors = Object.entries(err.response.data.errors)
          .map(([field, errors]) => `${field}: ${errors.join(", ")}`)
          .join("; ");
        setError(`Validation errors: ${validationErrors}`);
      } else {
        setError("Failed to create blog: " + (err.message || "Unknown error"));
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteBlog = async (blogId) => {
    setLoading(true);
    setError(null);
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/Blog/delete?id=${blogId}`
      );
      await fetchBlogs();
    } catch (err) {
      setError("Failed to delete blog");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateBlog = async (blogId, data) => {
    setLoading(true);
    setError(null);
    try {
      let imgUrl = data.imageUrl || "";
      if (data.image) {
        try {
          const uploadFormData = new FormData();
          uploadFormData.append("File", data.image);
          uploadFormData.append("FolderName", "blog_images");
          const uploadResponse = await uploadImage(uploadFormData);
          imgUrl =
            uploadResponse.url ||
            uploadResponse.imgUrl ||
            uploadResponse.imageUrl ||
            "";
        } catch (uploadErr) {
          throw new Error(
            "Failed to upload image: " + (uploadErr.message || "Unknown error")
          );
        }
      }
      const cleanedTagIds = Array.isArray(data.tagIds)
        ? data.tagIds.filter((id) => id)
        : typeof data.tags === "string"
        ? data.tags.split(",").filter(Boolean)
        : [];
      const blogData = {
        id: blogId,
        imgUrl,
        title: data.title,
        description: data.description || data.content || "",
        categoryId: data.categoryId,
        tagIds: cleanedTagIds,
      };
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/Blog/update`,
        blogData,
        { headers: { "Content-Type": "application/json" } }
      );
      await fetchBlogs();
      return response.data;
    } catch (err) {
      if (err.response?.data?.errors) {
        const validationErrors = Object.entries(err.response.data.errors)
          .map(([field, errors]) => `${field}: ${errors.join(", ")}`)
          .join("; ");
        setError(`Validation errors: ${validationErrors}`);
      } else {
        setError("Failed to update blog: " + (err.message || "Unknown error"));
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <BlogContext.Provider
      value={{
        blog,
        singleBlog,
        loading,
        error,
        createBlog,
        deleteBlog,
        updateBlog,
        uploadImage,
        fetchBlogs,
        getBlogById,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};
