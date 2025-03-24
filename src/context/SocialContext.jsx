import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const SocialContext = createContext();

export const useSocial = () => {
  const context = useContext(SocialContext);
  return context;
};

export const SocialProvider = ({ children }) => {
  const [socialMedia, setSocialMedia] = useState([]);
  const [emailStatus, setEmailStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchSocialMedia = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/SocialMedia/getall`
      );
      setSocialMedia(response.data);
    } catch (err) {
      setError("Failed to fetch social media links");
      console.error("Error fetching social media:", err);
    } finally {
      setLoading(false);
    }
  };

  const getSocialMedia = async (id) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_API_URL
        }/SocialMedia/getbyid?id=dac61790-1bcc-4434-948a-448e791e2a07`
      );
      return response.data;
    } catch (err) {
      setError("Failed to fetch social media data");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateSocialMedia = async (id, updatedData) => {
    setLoading(true);
    setError(null);

    try {

      const formData = new FormData();
      formData.append("Id", id);

      formData.append("InstagramUrl", updatedData.InstagramUrl || "");
      formData.append("TwitterUrl", updatedData.TwitterUrl || "");
      formData.append("FacebookUrl", updatedData.FacebookUrl || "");
      formData.append("LinkedInUrl", updatedData.LinkedInUrl || "");
      formData.append(
        "CreatedAt",
        updatedData.CreatedAt || new Date().toISOString()
      );

      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/SocialMedia/update`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );


      await fetchSocialMedia();
    } catch (err) {


      const errorMessage = err.response?.data?.errors
        ? Object.values(err.response.data.errors).flat().join(", ")
        : "Failed to update social media";

      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };
  const sendEmail = async (emailData) => {
    setLoading(true);
    setError(null);
    setEmailStatus(null);

    try {
      const formattedData = {
        fullName: emailData.fullName,
        email: emailData.email,
        subject: emailData.subject,
        comment: emailData.comment,
      };

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/Contact/send-email`,
        formattedData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setEmailStatus("Email sent successfully");
      return response.data;
    } catch (err) {
      const serverErrors = err.response?.data?.errors || {};
      const errorMessages = Object.values(serverErrors).flat().join("\n");
      setError(errorMessages || "Failed to send email");
      throw err;
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchSocialMedia();
  }, []);

  const value = {
    socialMedia,
    emailStatus,
    loading,
    error,
    updateSocialMedia,
    fetchSocialMedia,
    getSocialMedia,
    sendEmail,
  };

  return (
    <SocialContext.Provider value={value}>{children}</SocialContext.Provider>
  );
};
