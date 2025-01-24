import React from "react";
import { useState } from "react";

const SaleDetail = () => {
  return (
    <div className="overflow-hidden rounded-md border border-gray-300 w-11/12">
      <table
        className="w-full drop-shadow-2xl border-collapse"
        border="1"
      >
        <thead className="bg-green-700 ">
          <tr className="text-gray-300">
            <th className="pl-2">Código </th>
            <th>Producto </th>
            <th>Cantidad </th>
            <th>Iva </th>
            <th>Precio </th>
          </tr>
        </thead>
      </table>
    </div>
  );
};

export default SaleDetail;
