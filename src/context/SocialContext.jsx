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

  const createSocialMedia = async (socialMediaData) => {
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("InstagramUrl", socialMediaData.instagramUrl);
      formData.append("TwitterUrl", socialMediaData.twitterUrl);
      formData.append("FacebookUrl", socialMediaData.facebookUrl);
      formData.append("LinkedInUrl", socialMediaData.linkedInUrl);

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/SocialMedia/create`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      await fetchSocialMedia();
      return response.data;
    } catch (err) {
      setError("Failed to create social media links");
      console.error("Error creating social media:", err);
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
      console.error("Error sending email:", err.response?.data || err);
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
    fetchSocialMedia,
    createSocialMedia,
    sendEmail,
  };

  return (
    <SocialContext.Provider value={value}>{children}</SocialContext.Provider>
  );
};
