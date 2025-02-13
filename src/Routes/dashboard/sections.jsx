import React from "react";
import { Link } from "react-router-dom";

const Section = ({
  title = "Untitled",
  text = "texto texto texto texto texto",
}) => {
  const routeMap = {
    Productos: "/Productos",
    Ventas: "/Ventas",
    Clientes: "/Clientes",
    Reportes: "/Reportes",
  };

  return (
    <div className="bg-sky-950 rounded-lg p-4 text-gray-200 shadow-2xl shadow-gray-500 transition duration-800 hover:bg-sky-900 w-fit max-w-sm h-32">
      <Link to={routeMap[title] || "/home"}>
        <h1 className="text-4xl font-bold">{title}</h1>
        <p className="mt-5 font-medium ">{text}</p>
      </Link>
    </div>
  );
};

export default Section;
