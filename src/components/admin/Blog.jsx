import React, { useState } from "react";
import EditorComponent from "./TextEditor";
import { createBlogPost } from "../../services/api";

const Blog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState(""); // State for category
  const [tag, setTag] = useState(""); // State for tag
  const [errorDetails, setErrorDetails] = useState(null);

  console.log("Current form state:", { title, content, imgUrl, category, tag });

  const handleSubmit = async () => {
    console.log("Submit button clicked");
    setErrorDetails(null);
    
    // Validation
    if (!title || !content || !imgUrl || !category || !tag) {
      console.error("Validation failed:", { title, content, imgUrl, category, tag });
      alert("Please fill in all fields.");
      return;
    }
    
    // Try sending the data directly at the root level with specific field names
    const requestData = {
      Title: title,
      Description: content,
      ImgUrl: imgUrl,
      CategoryId: String(category),
      TagIds: [String(tag)]
    };
    
    console.log("Blog data prepared:", requestData);

    setLoading(true);
    console.log("Loading state set to:", true);

    try {
      console.log("Sending blog data to API:", JSON.stringify(requestData));
      const result = await createBlogPost(requestData);
      console.log("Blog post created successfully:", result);
      alert("Blog post created successfully!");

      // Clear form fields after successful submission
      setTitle("");
      setContent("");
      setImgUrl("");
      setCategory("");
      setTag("");
      console.log("Form fields cleared");
    } catch (error) {
      console.error("Failed to create blog post:", error);
      
      // Enhanced error logging
      if (error.response) {
        console.error("Error response data:", error.response.data);
        console.error("Error response status:", error.response.status);
        
        // Display detailed validation errors to help debug
        if (error.response.data && error.response.data.errors) {
          console.error("Validation errors:", error.response.data.errors);
          setErrorDetails(error.response.data.errors);
        }
        
        alert(`Failed to create blog post. Server responded with validation errors.`);
      } else {
        alert("Failed to create blog post. Network error or server unavailable.");
      }
    } finally {
      setLoading(false);
      console.log("Loading state set to:", false);
    }
  };

  return (
    <section className="p-10 bg-onyx w-[80%] text-white">
      <h1 className="text-3xl font-semibold">Blog</h1>

      {/* Display validation errors if any */}
      {errorDetails && (
        <div className="my-4 p-4 bg-red-500 text-white rounded">
          <h3 className="font-bold mb-2">Validation Errors:</h3>
          <pre className="whitespace-pre-wrap text-sm">
            {JSON.stringify(errorDetails, null, 2)}
          </pre>
        </div>
      )}

      {/* Title Input */}
      <div className="py-5">
        <div className="flex flex-col">
          <label className="text-md py-2 font-light" htmlFor="title">
            Add title
          </label>
          <input
            type="text"
            id="title"
            className="w-1/2 p-3 outline-none rounded-md text-onyx shadow-"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              console.log("Title updated:", e.target.value);
            }}
          />
        </div>
      </div>

      {/* Description (EditorComponent) */}
      <div className="text-black bg-white">
        <h1>Add Description</h1>
        <EditorComponent 
          value={content} 
          onChange={(value) => {
            setContent(value);
            console.log("Content updated, length:", value.length);
          }} 
        />
      </div>

      {/* Image URL Input */}
      <div>
        <label className="text-md py-2 font-light">Image URL</label>
        <input
          type="text"
          className="w-1/2 p-3 outline-none rounded-md text-onyx"
          value={imgUrl}
          onChange={(e) => {
            setImgUrl(e.target.value);
            console.log("Image URL updated:", e.target.value);
          }}
        />
      </div>

      {/* Tag Input */}
      <div>
        <h1>Add Tag</h1>
        <input
          type="text"
          className="w-1/2 p-3 outline-none rounded-md text-onyx"
          value={tag}
          onChange={(e) => {
            setTag(e.target.value);
            console.log("Tag updated:", e.target.value);
          }}
          placeholder="Enter tag ID"
        />
      </div>

      {/* Category Input */}
      <div>
        <h1>Add Category</h1>
        <input
          type="text"
          className="w-1/2 p-3 outline-none rounded-md text-onyx"
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            console.log("Category updated:", e.target.value);
          }}
          placeholder="Enter category ID"
        />
      </div>

      {/* Submit Button */}
      <div className="py-5">
        <button
          className="bg-blue-500 text-white px-5 py-2 rounded-md hover:bg-blue-600"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Submitting..." : "Publish Blog"}
        </button>
      </div>
    </section>
  );
};

export default Blog;