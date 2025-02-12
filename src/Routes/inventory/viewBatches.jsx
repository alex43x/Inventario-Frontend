import React from "react";

const ViewBatches = ({ batches, onRemove, hidden }) => {
  return (
    <div className="overflow-hidden rounded-md border border-gray-300 w-11/12">
      <table
        className="w-full drop-shadow-2xl"
        border="1"
        style={{ borderCollapse: "collapse" }}
      >
        <thead className="bg-blue-950">
          <tr className="text-gray-300">
            <th className="pl-2">N° Lote</th>
            <th>Disponible</th>
            <th>Precio de Compra</th>
            <th>Fecha Compra</th>
          </tr>
        </thead>
        <tbody>
          {batches.map((batch, index) => (
            <tr
              className="transition hover:bg-gray-300 duration-200"
              key={`${batch.id_lote}-${index}`} // Combina `id_lote` e índice
            >
              <td className="pl-2">{batch.id_lote}</td>
              <td>{batch.cant}</td>
              <td>₲ {batch.precio_compra} </td>
              <td className="flex">
                {new Date(batch.fecha_compra).toLocaleDateString()}
                {hidden && (
                  <button
                    className="ml-auto"
                    onClick={() =>
                      onRemove(batch.id_lote, batch.cant, batch.id_prod)
                    }
                  >
                    Anular lote...
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewBatches;
