import axios from "axios";


const API_URL = import.meta.env.VITE_API_URL_BLOG;

export const createBlogPost = async (blogData) => {
    console.log("Sending blog data:", blogData); 
    try {
      const response = await axios.post(`${API_URL}/Blog/create`, blogData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Response from API:", response.data); 
      return response.data;
    } catch (error) {
      console.error("Error creating blog:", error);
      throw error;
    }
  };
  

const API_URL_CATEGORY = import.meta.env.VITE_API_URL_CATEGORY;

export const createCategory = async (categoryData) => {
  console.log("Sending category data:", categoryData);
  
  try {
    const response = await axios.post(API_URL_CATEGORY, categoryData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("Response from API:", response.data);
    
    return response.data;
  } catch (error) {
    console.error("Error creating category:", error);
    throw error;
  }
};