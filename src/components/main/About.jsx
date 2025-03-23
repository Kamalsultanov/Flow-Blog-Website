import React from "react";

const About = () => {
  return (
    <section className="max-w-screen-xl mx-auto md:flex mt-10 bg-halfwhite">
      <div className="w-full mx-auto bg-white">
        <div className="w-full h-[400px]">
          <img
            src="https://picsum.photos/400/200"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 p-4">
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
            <p className="text-gray-500">
              architecto ullam amet cum laudantium error et beatae aliquid
              blanditiis neque natus at fugiat praesentium nostrum aperiam
              facere doloribus. Modi laborum officia quisquam voluptates
              inventore, oluptatum saepe. Deserunt sapiente optio ipsam illum
              harum ut illo et aut omnis reprehenderit?
            </p>
          </div>
          <div className="py-5">
            <h1 className="text-aqua text-lg font-bold">CONTACT ME</h1>
            <h3 className="font-bold my-3">GET IN TOUCH</h3>
            <form>
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 m-2"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Enter your full name"
                    className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-aqua"
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
                    placeholder="Enter your email"
                    className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-aqua"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 m-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    placeholder="Write your message here"
                    className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-aqua"
                    rows="4"
                  ></textarea>
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-full bg-aqua text-white py-2 rounded-md shadow-md hover:bg-aqua-dark
                     focus:outline-none focus:ring-2 focus:ring-aqua"
                  >
                    Send Message
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
