import React from "react";
import { Link } from "react-router";

const NotFound = () => {
  return (
    <section className="flex items-center h-screen p-16 dark:bg-gray-50 dark:text-gray-800">
      <div
        className="container flex flex-col items-center justify-center px-5 mx-auto my-8"
        bis_skin_checked="1"
      >
        <div className="max-w-md text-center" bis_skin_checked="1">
          <h2 className="mb-8 font-extrabold text-9xl dark:text-gray-400">
            <span className="sr-only">Error</span>404
          </h2>
          <p className="text-2xl font-semibold md:text-3xl mb-10">
            Sorry, we couldn't find this page.
          </p>

          <Link
            to={"/"}
            className="px-8 py-3 font-semibold bg-aqua  text-white "
          >
            Back to homepage
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
