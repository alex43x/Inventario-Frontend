import React from "react";
import { useState } from "react";

const productDetail = ({ products }) => {
  return (
    <div className='overflow-hidden rounded-md border border-gray-300 w-11/12'>
      <table className='w-full drop-shadow-2xl' border="1" style={{ borderCollapse: "collapse" }}>
        <thead className="bg-green-700 ">
          <tr className='text-gray-300'>
            <th className='pl-2'>Código </th>
            <th>Nombre </th>
            <th>Stock </th>
            <th>Iva </th>
            <th>Precio </th>
          </tr>
        </thead>
        <tbody>
          {product.map((batch) => (
            <tr className='transition hover:bg-gray-300 duration-200' key={batch.id}>
              <td className='pl-2'>{batch.id_lote}</td>
              <td>{batch.cant}</td>
              <td>{batch.precio_compra}</td>
              <td>{new Date(batch.fecha_compra).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default productDetail;
