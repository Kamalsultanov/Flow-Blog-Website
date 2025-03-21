import React from "react";

const Blogs = () => {
  const images = [
    {
      id: 1,
      title: "Image 1",
      category: "inter",
      text: "lorem impsum dolor site amte wictum dictum hicktum ",
      img: "https://picsum.photos/400/200",
    },
    {
      id: 1,
      title: "Image 1",
      category: "inter",
      text: "lorem impsum dolor site amte wictum dictum hicktum ",
      img: "https://picsum.photos/400/200",
    },
    {
      id: 1,
      title: "Image 1",
      category: "inter",
      text: "lorem impsum dolor site amte wictum dictum hicktum ",
      img: "https://picsum.photos/400/200",
    },
    {
      id: 1,
      title: "Image 1",
      category: "inter",
      text: "lorem impsum dolor site amte wictum dictum hicktum ",
      img: "https://picsum.photos/400/200",
    },
    {
      id: 1,
      title: "Image 1",
      category: "inter",
      text: "lorem impsum dolor site amte wictum dictum hicktum ",
      img: "https://picsum.photos/400/200",
    },
    {
      id: 1,
      title: "Image 1",
      category: "inter",
      text: "lorem impsum dolor site amte wictum dictum hicktum ",
      img: "https://picsum.photos/400/200",
    },
    {
      id: 1,
      title: "Image 1",
      category: "inter",
      text: "lorem impsum dolor site amte wictum dictum hicktum ",
      img: "https://picsum.photos/400/200",
    },
    {
      id: 1,
      title: "Image 1",
      category: "inter",
      text: "lorem impsum dolor site amte wictum dictum hicktum ",
      img: "https://picsum.photos/400/200",
    },
    {
      id: 1,
      title: "Image 1",
      category: "inter",
      text: "lorem impsum dolor site amte wictum dictum hicktum ",
      img: "https://picsum.photos/400/200",
    },
    {
      id: 1,
      title: "Image 1",
      category: "inter",
      text: "lorem impsum dolor site amte wictum dictum hicktum ",
      img: "https://picsum.photos/400/200",
    },
  ];

  return (
    <section className="max-w-screen-xl mx-auto md:flex ">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mx-3 ">
        {images.map((item, index) => {
          return (
            <div key={index} className="bg-white  shadow-lg overflow-hidden ">
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-60 object-cover"
              />
              <div className="p-5">
                <span className="text-aqua font-bold uppercase text-sm">
                  {item.category}
                </span>
                <h1 className="font-bold text-xl mt-2">{item.title}</h1>
                <p className="text-gray-500 text-sm mt-2">{item.text}</p>
                <button className="bg-aqua text-white px-4 py-2 mt-4 rounded-md">
                  Read More
                </button>
              </div>
            </div>
          );
        })}
      </div>
      {/* about me fixed */}
          <div className="w-full  mx-auto bg-white mt-10 p-2 md:w-2/5 
            md:mx-3 md:mt-0 md:max-h-screen shadow-md md:sticky right-0 top-0">
        <h1 className="font-semibold text-2xl m-3">ABOUT ME</h1>
        <div className="w-11/12 mx-auto">
          <img src="https://picsum.photos/400/200" alt="" className="w-full h-full object-cover" />
          <p className="text-gray-500 text-sm mt-2"> 
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Omnis sed
            optio corrupti odio. Labore repellendus inventore fugiat
            necessitatibus obcaecati, non error nesciunt tempora, asperiores,
            vero eius aliquam veniam officiis!
          </p>
        </div>
        {/* POPULAR POSTS */}
        <div className="mt-10">
          <h3 className="border-l-4 border-gray-300 px-2">Popular posts</h3>
          <ul className="w-full my-3 px-3">
            <li className="flex border-y py-3 ">
              <div className="w-2/3">
                <span className="text-aqua font-bold uppercase text-sm">interior</span>
                <h5 className="text-gray-500">Title</h5>  
              </div>
              <img src="https://picsum.photos/400/200" alt="" className="w-1/3" />
            </li>
            <li className="flex border-y py-3 ">
              <div className="w-2/3">
                <span className="text-aqua font-bold uppercase text-sm">interior</span>
                <h5 className="text-gray-500">Title</h5>  
              </div>
              <img src="https://picsum.photos/400/200" alt="" className="w-1/3" />
            </li>
            <li className="flex border-y py-3 ">
              <div className="w-2/3">
                <span className="text-aqua font-bold uppercase text-sm">interior</span>
                <h5 className="text-gray-500">Title</h5>  
              </div>
              <img src="https://picsum.photos/400/200" alt="" className="w-1/3" />
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Blogs;
