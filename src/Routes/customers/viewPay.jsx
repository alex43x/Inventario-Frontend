import React, { useState } from "react";
import flechabajo from "../../assets/flecha-abajo.png";
import flecharriba from "../../assets/flecha-arriba.png";

export default function ViewPay({ data }) {
  const getimg = (origen) => {
    if (origen == "Venta") {
      return flecharriba;
    } else {
      return flechabajo;
    }
  };

  return (
    <div className=" overflow-hidden rounded-md border border-blue-950 w-full ">
      <table
        className="w-full drop-shadow-2xl border border-blue-950 border-collapse"
        border="1"
      >
        <thead className="bg-blue-950">
          <tr className="text-gray-200">
            <th className="border border-blue-950 px-4 py-1">N°</th>
            <th className="border border-blue-950 px-4 py-2">Fecha</th>
            <th className="border border-blue-950 px-4 py-2">Movimiento</th>
            <th className="border border-blue-950 px-4 py-2">Pago</th>
            <th className="border border-blue-950 px-4 py-2">Saldo</th>
          </tr>
        </thead>
        <tbody>
          {data.map((movement, index) => (
            <tr
              className="transition hover:bg-gray-300 duration-200 text-slate-800 font-medium"
              key={`${index}`}
            >
              <td className="border border-blue-950 px-4 py-2">{index + 1}</td>
              <td className="border border-blue-950 px-4 py-2">
                {new Date(movement.fecha).toLocaleDateString()}
              </td>
              <td className="border border-blue-950 px-4 py-2">
                {movement.origen}
              </td>
              <td className="border border-blue-950 px-4 py-2">
                {movement.pago}
              </td>
              <td className="border border-blue-950 px-4 py-2">
                <div className="flex">

                <p>{movement.saldo}</p>
                <img className="h-6 w-6 ml-auto" src={getimg(movement.origen)}></img>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
