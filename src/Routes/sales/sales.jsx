import React from "react";
import { useNavigate } from "react-router-dom";
import Section from "../dashboard/sections";
import { Link } from "react-router-dom";

const Ventas = () => {
  const navigate = useNavigate();

  return (
    <div>
      <section className="text-green-800 text-center mt-20">
        <h1 className="text-6xl font-bold ">Ventas</h1>{" "}
        {/* Muestra datos del usuario */}
        <p className="text-lg m-8">...</p>
      </section>
      <section className="flex justify-center flex-wrap ">
        <Link to="NuevaVenta">
          <Section title="Nueva Venta" text="Registrar nuevas ventas" />
        </Link>
        <Section title="Ver" text="Ver ventas anteriores" />
      </section>
    </div>
  );
};

export default Ventas;
