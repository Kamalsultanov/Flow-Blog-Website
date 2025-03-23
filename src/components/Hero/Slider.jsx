import React, { useState, useEffect } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useBlog } from "../../context/BlogContext";

const Slider = () => {
  const { blog } = useBlog();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [blogImages, setBlogImages] = useState([]);

  useEffect(() => {
    if (blog && blog.length > 0) {
      const images = blog.map(
        (item) => `${import.meta.env.VITE_API_URL_IMAGE}${item.imgUrl}`
      );
      setBlogImages(images);
    }
  }, [blog]);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? blogImages.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === blogImages.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  if (blogImages.length === 0) {
    return null;
  }

  return (
    <section className="flex justify-center items-center max-w-screen-xl mx-auto w-full py-10 ">
      <div className="relative w-full mx-auto shadow-md ">
        <div className="w-full relative overflow-hidden group">
          <div className="h-full w-full">
            <img
              src={blogImages[currentIndex]}
              alt={`Blog slide ${currentIndex + 1}`}
              className="w-full h-[300px] md:h-[400px] object-cover"
            />
          </div>

          <div className="absolute top-[40%] -left-20 h-16 w-16 transition-all duration-500 group-hover:left-0">
            <div className="absolute inset-0 bg-gray-300 scale-110 z-0 triangle-left"></div>
            <button
              onClick={goToPrevious}
              className="absolute inset-0 bg-white z-10 triangle-left"
              aria-label="Previous slide"
            >
              <IoIosArrowBack className="min-w-8 min-h-8" />
            </button>
          </div>

          <div className="absolute top-[40%] -right-20 h-16 w-16 transition-all duration-500 group-hover:right-0">
            <div className="absolute inset-0 bg-gray-300 scale-110 z-0 triangle-right"></div>
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
