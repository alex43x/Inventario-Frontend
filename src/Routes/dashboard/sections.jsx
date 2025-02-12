import React from "react";

const Section = ({
  title = "Untitled",
  text = "texto texto texto texto texto",
}) => {
  return (
    <div className="bg-sky-950 rounded-lg p-6  text-gray-200  shadow-2xl shadow-gray-500 transition duration-800 hover:bg-sky-900">
      <a href={title}>
        <h1 className=" text-4xl font-bold">{title}</h1>
        <p className=" mt-5  font-medium">{text}</p>
      </a>
    </div>
  );
};

export default Section;
