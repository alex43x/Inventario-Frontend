import React, { useState, useEffect } from "react";

export default function ViewSales({ getsubsales, id }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const subsales = await getsubsales(id);
      setItems(subsales);
    };
    getData();
  }, [getsubsales, id]);

  return (
    <div className="overflow-hidden border-blue-950 rounded-sm ">
      <table className="w-full text-left border-2 rounded-lg">
        <thead className="bg-blue-950 text-white">
          <tr className="bg-blue-950 text-blue-50 text-left">
            <th className="p-2">Productos</th>
            <th>Cantidad</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody className=" hover:bg-gray-100">
          {items.map((item, index) => (
            <tr
              key={index}
              className="border-b-2 border-sky-950 text-gray-800 font-medium hover:bg-white"
            >
              <td className="p-2">{item.producto}</td>
              <td>{item.cantidad}</td>
              <td>{item.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
