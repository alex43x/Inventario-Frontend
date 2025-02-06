import React from "react";

const Movements = ({ datos }) => {
  return (
    <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
      <thead>
        <tr>
          <th style={{ padding: "10px", borderBottom: "2px solid #ddd" }}>Elemento</th>
          <th style={{ padding: "10px", borderBottom: "2px solid #ddd" }}>Total</th>
          <th style={{ padding: "10px", borderBottom: "2px solid #ddd" }}>Tipo</th>
        </tr>
      </thead>
      <tbody>
        {datos.map((fila, index) => (
          <tr key={index} style={{ borderBottom: "1px solid #ddd" }}>
            <td style={{ padding: "10px" }}>{fila.elemento}</td>
            <td style={{ padding: "10px" }}>{fila.total}</td>
            <td style={{ padding: "10px" }}>{fila.tipo}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Movements;