import React from "react";

const ProductTable = ({
  products,
  onUpdateQuantity,
  onUpdatePrice,
  onRemoveProduct,
}) => {
  const totalIVA = products.reduce(
    (sum, product) =>
      sum +
      (product.precio * product.quantity * product.iva) / (100 + product.iva),
    0
  );
  const totalGravada = products.reduce(
    (sum, product) =>
      sum + (product.precio * product.quantity * 100) / (100 + product.iva),
    0
  );
  const totalFinal = products.reduce(
    (sum, product) => sum + product.precio * product.quantity,
    0
  );

  return (
    <div className="overflow-hidden rounded-lg border-2 border-blue-950">
      <table className="w-full drop-shadow-2xl border-collapse" border="1">
        <thead className="bg-blue-950">
          <tr className="text-gray-300">
            <th className="pl-2 py-2">Cod</th>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Precio Unitario</th>
            <th className="hidden sm:table-cell">IVA</th>
            <th className="hidden sm:table-cell">Gravada</th>
            <th>Total</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index} className="rounded-lg border-b-2 border-blue-950">
              <td className="pl-2 py-1">{product.id_prod}</td>
              <td>{product.nombre}</td>
              <td>
                <input
                  className="w-7/12 rounded-md pl-2 bg-gray-300"
                  type="number"
                  min="1"
                  max={product.stock}
                  value={product.quantity}
                  onChange={(e) =>
                    onUpdateQuantity(
                      product.nombre,
                      parseInt(e.target.value) || null
                    )
                  }
                />
              </td>
              <td>
                <input
                  className="w-7/12 rounded-md pl-2 bg-gray-300"
                  type="number"
                  min="1"
                  value={product.precio}
                  onChange={(e) =>
                    onUpdatePrice(
                      product.id_prod,
                      parseInt(e.target.value) || null
                    )
                  }
                />
              </td>
              <td className="hidden sm:table-cell">
                {(
                  (product.precio * product.quantity * product.iva) /
                  (100 + product.iva)
                ).toFixed()}
              </td>
              <td className="hidden sm:table-cell">
                {(
                  (product.precio * product.quantity * 100) /
                  (100 + product.iva)
                ).toFixed()}
              </td>
              <td>{product.precio * product.quantity}</td>
              <td className="text-right pr-2">
                <button
                  className="text-red-700 px-2 bg-red-200 rounded-md border-2 border-red-800"
                  onClick={() => onRemoveProduct(product.id_prod)}
                  type="button"
                >
                  x
                </button>
              </td>
            </tr>
          ))}
        </tbody>

        <tfoot className="bg-blue-950 ">
          <tr className="text-gray-300 ">
            <th className="pl-2 py-2">Total</th>
            <th></th>
            <th></th>
            <th></th>
            <th className="hidden sm:table-cell">₲ {totalIVA.toFixed()}</th>
            <th className="hidden sm:table-cell">₲ {totalGravada.toFixed()}</th>
            <th>₲ {totalFinal.toFixed()}</th>
            <th></th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default ProductTable;
