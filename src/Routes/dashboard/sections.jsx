import React from "react";

const Section = ({
  title = "Untitled",
  text = "texto texto texto texto texto texto texto texto",
}) => {
  return (
    <div className="bg-green-800 rounded-lg p-5 w-72 text-gray-200 m-2 shadow-2xl shadow-gray-700 transition duration-200 hover:bg-green-900">
      <a href={title}>
        <h1 className=" text-4xl font-bold">{title}</h1>
        <p className=" mt-5">{text}</p>
      </a>
    </div>
  );
};

export default Section;
