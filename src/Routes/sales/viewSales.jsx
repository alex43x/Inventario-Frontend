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
    <div className="overflow-hidden rounded-sm">
      <table className="w-full text-left ">
        <thead className="bg-green-700 text-white">
          <tr className="ml-2x">
            <th className="ml-2">Productos</th>
            <th>Cantidad</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody className=" hover:bg-gray-100">
          {items.map((item, index) => (
            <tr key={index}>
              <td>{item.producto}</td>
              <td>{item.cantidad}</td>
              <td>{item.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
