import React from "react";
import { useState } from "react";

const ViewBatches = ({ batches }) => {
  return (
    <div>
      <table border="1" style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th>Número de Lote </th>
            <th>Cantidad </th>
            <th>Precio de Compra </th>
            <th>Fecha de Compra </th>
          </tr>
        </thead>
        <tbody>
          {batches.map((batch) => (
            <tr key={batch.id}>
              <td>{batch.id_lote}</td>
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

export default ViewBatches;
