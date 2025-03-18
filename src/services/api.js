import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL; 
const API_URL_BLOG = `${API_URL}/Blog/create`; 
const API_URL_CATEGORY = `${API_URL}/Category/create`;

export const createBlogPost = async (blogData) => {
  try {
    const response = await axios.post(API_URL_BLOG, blogData, {
      headers: {
        "Content-Type": "application/json", 
      },
    });

    return response.data; 
  } catch (error) {
    console.error("Error creating blog:", error); 
    throw error; 
  }
};


