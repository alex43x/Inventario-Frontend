import React from "react";

const SalesData = ({
  title = "Untitled",
  text = "texto texto texto texto texto texto texto texto",
}) => {
  return (
    <div className="border-2 border-sky-900 rounded-lg p-4 w-40 text-sky-950 shadow-2xl shadow-gray-300 transition duration-500 hover:bg-sky-100">
        <h1 className=" text-2xl font-bold">{title}</h1>
        <p className=" mt-2 font-medium">+{text} Gs</p>
    </div>
  );
};

export default SalesData;
