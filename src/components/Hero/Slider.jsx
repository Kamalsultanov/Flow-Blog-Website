import React, { useState } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const Slider = () => {
  const arr = ["/slide1.jpg", "/slide2.jpg", "/slide3.jpg"];
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? arr.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === arr.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <section className="flex justify-center items-center py-10">
      <div className="relative w-[80%] h-[500px] ">
        <div className="w-full relative overflow-hidden rounded-md group">

          <div className='h-full w-full'>
            <img 
              src={arr[currentIndex]} 
              alt={`Slide ${currentIndex + 1}`} 
              className="w-full h-[500px] object-cover"
            />
          </div>

            <button 
              onClick={goToPrevious} 
                      className="bg-white h-16 w-16  absolute top-[200px] triangle-left shadow-lg flex justify-start items-center
                -left-20 transition-all  group-hover:-left-1  duration-500"
              aria-label="Previous slide"
            >
              <IoIosArrowBack  className='min-w-8 min-h-8' />
            </button>
            <button 
              onClick={goToNext} 
                      className="bg-white   h-16 w-16  absolute top-[200px]  triangle-right shadow-lg flex
               items-center justify-end transition-all -right-20 group-hover:-right-1 duration-500 "
              aria-label="Next slide"
            >
              <IoIosArrowForward className='min-w-8 min-h-8' />
            </button>
        </div>
      </div>
    </section>
  );
};

export default Slider;