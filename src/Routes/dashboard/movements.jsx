import React from "react";

const Movements = ({ datos, col1 = "Productos", col2='Cantidad', col3='Total' }) => {
  return (
    <div className="overflow-hidden rounded-lg border-2 border-blue-950 w-full">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-blue-950 text-blue-50 text-left">
            <th className="font-semibold p-2">{col1}</th>
            <th className="font-semibold  ">{col2}</th>
            <th className="font-semibold  p-2">{col3}</th>
          </tr>
        </thead>
        <tbody>
          {datos.map((fila, index) => (
            <tr
              key={index}
              className="border-b-2 border-sky-950 text-gray-700 font-medium hover:bg-white"
            >
              <td className="p-2">{fila.elemento}</td>
              <td>{fila.cantidad}</td>
              <td>{(fila.total)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Movements;
