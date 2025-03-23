import React from "react";

const Loading = () => {
  return (
    <section className="w-full h-full flex items-center justify-center ">
      <div
        className="w-32 h-32 border-4 border-dashed rounded-full animate-spin border-aqua  "
        bis_skin_checked="1"
      ></div>
    </section>
  );
};

export default Loading;
