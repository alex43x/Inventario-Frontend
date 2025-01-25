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
    <div className="overflow-hidden rounded-md border border-gray-300 w-full">
      <table className="w-full drop-shadow-2xl border-collapse" border="1">
        <thead className="bg-green-700">
          <tr className="text-gray-300">
            <th className="pl-2">Cod</th>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Precio Unitario</th>
            <th>IVA</th>
            <th>Gravada</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index}>
              <td className="pl-2">{product.id_prod}</td>
              <td>
                {product.nombre}
                <button
                  className="text-red-500 px-3"
                  onClick={() => onRemoveProduct(product.id_prod)}
                >
                  x
                </button>
              </td>
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
                      parseInt(e.target.value) || 1
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
                      parseInt(e.target.value) || 1
                    )
                  }
                />
              </td>
              <td>
                {(
                  (product.precio * product.quantity * product.iva) /
                  (100 + product.iva)
                ).toFixed()}
              </td>
              <td>
                {(
                  (product.precio * product.quantity * 100) /
                  (100 + product.iva)
                ).toFixed()}
              </td>
              <td>{product.precio * product.quantity}</td>
            </tr>
          ))}
        </tbody>
        <tfoot className="bg-green-700">
          <tr className="text-gray-300">
            <th className="pl-2">Total</th>
            <th></th>
            <th></th>
            <th></th>
            <th>{totalIVA.toFixed()}</th>
            <th>{totalGravada.toFixed()}</th>
            <th>{totalFinal.toFixed()}</th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default ProductTable;
