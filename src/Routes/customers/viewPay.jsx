import React, { useState } from "react";

export default function ViewPay({ data }) {
  return (
    <div className=" overflow-hidden rounded-md border border-green-700 w-6/12">
      <table
        className="w-full drop-shadow-2xl border border-green-700 border-collapse"
        border="1"
      >
        <thead className="bg-green-700">
          <tr className="text-gray-200">
            <th className="border border-green-700 px-4 py-1">N°</th>
            <th className="border border-green-700 px-4 py-2">Fecha</th>
            <th className="border border-green-700 px-4 py-2">Movimiento</th>
            <th className="border border-green-700 px-4 py-2">Pago</th>
            <th className="border border-green-700 px-4 py-2">Saldo</th>
          </tr>
        </thead>
        <tbody>
          {data.map((movement, index) => (
            <tr
              className="transition hover:bg-gray-300 duration-200"
              key={`${index}`}
            >
              <td className="border border-green-700 px-4 py-2">{index + 1}</td>
              <td className="border border-green-700 px-4 py-2">{new Date(movement.fecha).toLocaleDateString()}</td>
              <td className="border border-green-700 px-4 py-2">{movement.origen}</td>
              <td className="border border-green-700 px-4 py-2">{movement.pago}</td>
              <td className="border border-green-700 px-4 py-2">{movement.saldo}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
