import React from "react";
import { useNavigate } from "react-router-dom";
import Section from "./sections";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div>
      <section className="text-green-800 text-center mt-20">
        <h1 className="text-6xl font-bold ">Dashboard</h1>{" "}
        {/* Muestra datos del usuario */}
        <p className="text-lg m-8">...</p>
      </section>
      <section className="flex justify-center flex-wrap ">
        <Section title="Productos" text="Ver los productos disponibles" />
        <Section title="Ventas" text="Registrar ventas realizadas" />
        <Section title="Clientes" text="Ver deudas de clientes" />
        <Section title="Caja" text="Consultar" />
      </section>
    </div>
  );
};

export default Dashboard;
