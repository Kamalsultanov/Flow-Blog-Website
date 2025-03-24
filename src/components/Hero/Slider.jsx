import React, { useState, useEffect, useRef } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useBlog } from "../../context/BlogContext";
import { useNavigate } from "react-router";
import gsap from "gsap";

const Slider = () => {
  const { blog } = useBlog();
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [blogImages, setBlogImages] = useState([]);
  const imageRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    if (blog && blog.length > 0) {
      const images = blog.map(
        (item) => `${import.meta.env.VITE_API_URL_IMAGE}${item.imgUrl}`
      );
      setBlogImages(images);
    }
  }, [blog]);

  const animateTransition = () => {
    gsap.to(imageRef.current, { opacity: 0, duration: 0.5, ease: "power2.out" });
    gsap.to(textRef.current, { opacity: 0,  duration: 0.5, ease: "power2.out" });

    setTimeout(() => {
      gsap.to(imageRef.current, { opacity: 1, duration: 0.6, ease: "power2.out" });
      gsap.to(textRef.current, { opacity: 1,  duration: 0.8, ease: "power2.out" });
    },300); 
  };

  const goToPrevious = () => {
    animateTransition();
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? blogImages.length - 1 : prevIndex - 1
      );
  };

  const goToNext = () => {
    animateTransition();
    setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === blogImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 300);
  };

  const navigateToDetail = (id) => {
    navigate(`/blog/${id}`);
  };

  if (blogImages.length === 0 || !blog) {
    return null;
  }

  const currentBlog = blog[currentIndex];

  return (
    <section className="flex justify-center items-center w-11/12 mx-auto py-10">
      <div className="relative w-full mx-auto shadow-md">
        <div className="w-full relative overflow-hidden group">
          <div className="h-full w-full relative">
            <img
              ref={imageRef}
              src={blogImages[currentIndex]}
              alt={`Blog slide ${currentIndex + 1}`}
              className="w-full h-[300px] md:h-[450px] object-cover opacity-1 transition-all"
            />

            <div
              ref={textRef}
              className="absolute z-50 bg-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-1/2 w-1/2 md:w-1/4 p-4 flex flex-col justify-center
               items-center overflow-hidden opacity-1 drop-shadow-md transition-all drop-shadow-md"
            >
              <h1 className=" font-semibold mb-2 text-center text-aqua uppercase text-sm">
                {currentBlog?.categoryName}
              </h1>
              <h3 className="text-lg font-bold text-center overflow-hidden break-words line-clamp-1 uppercase">
                {currentBlog?.title}
              </h3>
              <button
                className="px-4 py-1.5 bg-aqua text-white text-sm mt-2 hover:bg-opacity-90 transition-all"
                onClick={() => navigateToDetail(currentBlog.id)}
              >
                Read More
              </button>
            </div>
          </div>

          <div className="absolute top-[40%] -left-20 h-16 w-16 transition-all duration-500 group-hover:left-0">
            <button
              onClick={goToPrevious}
              className="absolute inset-0 bg-white z-10 triangle-left"
              aria-label="Previous slide"
            >
              <IoIosArrowBack className="min-w-8 min-h-8" />
            </button>
          </div>

          <div className="absolute top-[40%] -right-20 h-16 w-16 transition-all duration-500 group-hover:right-0">
            <button
              onClick={goToNext}
              className="absolute inset-0 bg-white z-10 triangle-right flex items-center justify-end"
              aria-label="Next slide"
            >
              <IoIosArrowForward className="min-w-8 min-h-8" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Slider;
