import React, { useState, useEffect } from "react";
import { FaEdit, FaCheck, FaTimes } from "react-icons/fa";
import { TiDocumentText } from "react-icons/ti";
import { FaHashtag } from "react-icons/fa";
import { TbCategoryFilled } from "react-icons/tb";
import { useSocial } from "../../context/SocialContext";
import { useBlog } from "../../context/BlogContext";
import { useTag } from "../../context/TagContext";
import { useCategory } from "../../context/CategoryContext";

const DashBoard = () => {
  const { blog } = useBlog();
  const { tags } = useTag();
  const { categories } = useCategory();
  const { socialMedia, getSocialMedia, updateSocialMedia, loading, error } =
    useSocial();

  const blogCount = blog.length;
  const tagCount = tags.length;
  const categoryCount = categories.length;

  const [socialMediaData, setSocialMediaData] = useState({
    InstagramUrl: "",
    TwitterUrl: "",
    FacebookUrl: "",
    LinkedInUrl: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchSocialData = async () => {
      try {
        const data = await getSocialMedia();
        setSocialMediaData({
          InstagramUrl: data.instagramUrl || "",
          TwitterUrl: data.twitterUrl || "",
          FacebookUrl: data.facebookUrl || "",
          LinkedInUrl: data.linkedInUrl || "",
        });
      } catch (err) {}
    };

    fetchSocialData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSocialMediaData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateSocialMedia = async () => {
    try {
      await updateSocialMedia(
        socialMediaData.Id || "dac61790-1bcc-4434-948a-448e791e2a07",
        socialMediaData
      );
      setIsEditing(false);
    } catch (err) {
      alert(`Failed to update: ${err.message}`);
    }
  };

  return (
    <section className="gap-4 p-10 flex-wrap bg-onyx w-full min-h-screen">
      <div className="w-11/12 mx-auto">
        <div className=" mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 justify-center">
            <div className="w-full h-60">
              <div className="bg-gradient-to-r from-red-700 w-full h-full to-red-600 relative overflow-hidden rounded-md flex items-center flex-col group shadow-lg">
                <TiDocumentText className="w-1/2 h-1/2 text-white opacity-85 absolute -bottom-8 group-hover:bottom-0 group-hover:opacity-100 transition-all duration-500" />
                <h3 className="mt-7 font-semibold text-white">Blog Count:</h3>
                <span className="text-white text-6xl mt-3">{blogCount}</span>
              </div>
            </div>

            <div className="w-full h-60">
              <div className="bg-gradient-to-r from-yellow-600 w-full h-full to-yellow-400 relative overflow-hidden rounded-md flex items-center flex-col group shadow-lg">
                <FaHashtag className="w-1/2 h-1/2 text-white opacity-85 absolute -bottom-8 group-hover:-bottom-0 group-hover:opacity-100 mx-auto transition-all duration-500" />
                <h3 className="mt-7 font-semibold text-white">Tag Count:</h3>
                <span className="text-white text-6xl mt-3">{tagCount}</span>
              </div>
            </div>

            <div className="w-full h-60">
              <div className="bg-gradient-to-r from-blue-700 w-full h-full to-blue-400 relative overflow-hidden rounded-md flex items-center flex-col group shadow-lg">
                <TbCategoryFilled className="w-1/2 h-1/2 text-white opacity-85 absolute -bottom-8 group-hover:-bottom-0 group-hover:opacity-100 mx-auto transition-all duration-500" />
                <h3 className="mt-7 font-semibold text-white">
                  Category Count:
                </h3>
                <span className="text-white text-6xl mt-3">
                  {categoryCount}
                </span>
              </div>
            </div>
          </div>
          <div id="socialmedia"></div>
        </div>

        <div id="socialmedia" className="mt-8 bg-matte   p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-halfwhite">
              Social Media Links
            </h2>
          </div>

          {
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {["Instagram", "Twitter", "Facebook", "LinkedIn"].map(
                  (platform) => (
                    <div key={platform} className="flex flex-col">
                      <label className="text-halfwhite mb-2">
                        {platform} URL
                      </label>
                      <input
                        type="text"
                        name={`${platform}Url`}
                        value={socialMediaData[`${platform}Url`] || ""}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className={`
                        w-full p-2    disabled:opacity-70
                        ${
                          isEditing
                            ? "border-blue-300 focus:ring-2 focus:ring-blue-500"
                            : "border-gray-300 bg-gray-100"
                        }
                      `}
                      />
                    </div>
                  )
                )}
              </div>
            </div>
          }
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="text-halfwhite  transition duration-300"
            >
              <FaEdit className="w-12 h-12 mt-6" />
            </button>
          ) : (
            <div className="flex gap-4 mt-6">
              <button
                onClick={handleUpdateSocialMedia}
                className="text-green-600 hover:text-green-800 transition duration-300"
              >
                <FaCheck className="w-9 h-9 " />
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="text-red-600 hover:text-red-800 transition duration-300"
              >
                <FaTimes className="w-9 h-9" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default DashBoard;
