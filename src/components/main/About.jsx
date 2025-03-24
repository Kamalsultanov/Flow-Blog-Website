import React, { useState, useEffect } from "react";
import { FaInstagram, FaTwitter, FaFacebookF } from "react-icons/fa";
import { IoLogoLinkedin } from "react-icons/io5";
import { useSocial } from "../../context/SocialContext";

const About = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    subject: "",
    comment: "",
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const { socialMedia, loading, error, emailStatus, sendEmail } = useSocial();

  useEffect(() => {
    if (emailStatus) {
      setShowSuccess(true);
      const timer = setTimeout(() => {
        setShowSuccess(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [emailStatus]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await sendEmail({
        fullName: formData.fullName,
        email: formData.email,
        subject: formData.subject,
        comment: formData.comment,
      });

      setFormData({
        fullName: "",
        email: "",
        subject: "",
        comment: "",
      });
    } catch (error) {}
  };

  return (
    <section className="max-w-screen-xl mx-auto md:flex mt-10 bg-halfwhite">
      <div className="w-full mx-auto bg-white">
        <div className="w-full h-[400px]">
          <img
            src="person.jpg"
            alt=""
            className="w-full h-full  object-top object-cover "
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 p-4 relative">
          <div className="py-5">
            <h1 className="text-aqua text-lg font-bold">ABOUT ME</h1>
            <h3 className="font-bold my-3 uppercase">HI, I am Gabriel</h3>
            <p className="text-gray-500 my-3">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Voluptas, enim eligendi error non expedita fuga est blanditiis
              magni pariatur officia minus provident? Ipsa accusantium ipsam
              harum, quos quaerat dolor explicabo. Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Laboriosam, libero quisquam
            </p>
            <p className="text-gray-500 my-3">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Voluptas, enim eligendi error non expedita fuga est blanditiis
              magni pariatur officia minus provident? Ipsa accusantium ipsam
              harum, quos quaerat dolor explicabo. Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Laboriosam, libero quisquam
            </p>
            <p className="text-gray-500 my-3">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Voluptas, enim eligendi error non expedita fuga est blanditiis
              magni pariatur officia minus provident? Ipsa accusantium ipsam
              harum, quos quaerat dolor explicabo. Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Laboriosam, libero quisquam
            </p>
          </div>

          <div className="py-5">
            <h1 className="text-aqua text-lg font-bold">CONTACT ME</h1>
            <h3 className="font-bold my-3">GET IN TOUCH</h3>

            {showSuccess && (
              <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md border border-green-200 flex justify-between items-center">
                <span>{emailStatus}</span>
                <button
                  onClick={() => setShowSuccess(false)}
                  className="text-green-700 hover:text-green-900"
                >
                  ✕
                </button>
              </div>
            )}

            {error && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md border border-red-200 flex justify-between items-center">
                <span>{error}</span>
                <button
                  onClick={() => {}}
                  className="text-red-700 hover:text-red-900"
                >
                  ✕
                </button>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="fullName"
                    className="block text-sm font-medium text-gray-700 m-2"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-aqua"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 m-2"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-aqua"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-700 m-2"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Enter subject"
                    className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-aqua"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="comment"
                    className="block text-sm font-medium text-gray-700 m-2"
                  >
                    Comment
                  </label>
                  <textarea
                    id="comment"
                    value={formData.comment}
                    onChange={handleChange}
                    placeholder="Write your comment here"
                    className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-aqua"
                    rows="4"
                    required
                  ></textarea>
                </div>
                <div>
                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full bg-aqua text-white py-2 rounded-md shadow-md hover:bg-aqua-dark focus:outline-none focus:ring-2 focus:ring-aqua ${
                      loading ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    {loading ? "Sending..." : "Send Message"}
                  </button>
                </div>
              </div>
            </form>
          </div>

          <div className="abosolute bottom-0 left-0   flex items-center text-xl  mt-5 md:mt-0 md:justify-normal gap-3 text-grey">
            <span className="hover:text-aqua cursor-pointer">
              <FaInstagram />
            </span>
            <span className="hover:text-aqua cursor-pointer">
              <FaTwitter />
            </span>
            <span className="hover:text-aqua cursor-pointer">
              <FaFacebookF />
            </span>
            <span className="hover:text-aqua cursor-pointer">
              <IoLogoLinkedin />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
