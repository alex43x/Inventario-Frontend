import axios from "axios";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

import ProductSearch from "./productSearch";
import CustomerSearch from "./customerSearch";

export default function NewSale() {
  const [customers, setCustomers] = useState([]);
  const [date, setDate] = useState("");
  const[idSale, setidSale]=useState("")
  const [seller, setSeller] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/customers")
      .then((response) => {
        setCustomers(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // Callback para agregar un producto a la tabla
  const handleAddProduct = (product) => {
    const existingProduct = selectedProducts.find(
      (p) => p.id_prod === product.id_prod
    );

    if (existingProduct) {
      alert("El producto ya está agregado.");
      return;
    }

    setSelectedProducts((prev) => [
      ...prev,
      { ...product, quantity: 1 }, // Inicializa con cantidad 1
    ]);
  };

  const handleUpdateQuantity = (productName, quantity) => {
    setSelectedProducts((prev) =>
      prev.map((product) =>
        product.nombre === productName
          ? { ...product, quantity: Math.min(quantity, product.stock) } // Limita al stock disponible
          : product
      )
    );
  };

  const handleUpdatePrice = (id, newprice) => {
    setSelectedProducts((prev) =>
      prev.map((product) => {
        if (product.id_prod === id) {
          const precio = newprice; // La base gravada es el precio negociado
          console.log(selectedProducts);

          return {
            ...product,
            precio,
          };
        }
        return product;
      })
    );
  };

  const handleRemoveProduct = (id_prod) => {
    setSelectedProducts((prev) =>
      prev.filter((product) => product.id_prod !== id_prod)
    );
  };

  const token = localStorage.getItem("authToken");

  let userId = null;
  let userName = null;

  if (token) {
    const decodedToken = jwtDecode(token);
    userId = decodedToken.id;
    userName = decodedToken.username;
  }

  // Calcular los totales globales
  const totalGravada = selectedProducts.reduce(
    (sum, producto) =>
      sum + (producto.precio * producto.quantity * 100) / (100 + producto.iva),
    0
  );
  const totalIVA = selectedProducts.reduce(
    (sum, producto) =>
      sum +
      (producto.precio * producto.quantity * producto.iva) /
        (100 + producto.iva),
    0
  );
  const totalFinal = selectedProducts.reduce(
    (sum, producto) => sum + producto.precio * producto.quantity,
    0
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedCustomer) {
      alert("Por favor, selecciona un cliente válido.");
      return;
    }
    const saleData = {
      fecha: date,
      subtotal: totalGravada.toFixed(),
      iva: totalIVA.toFixed(),
      total: totalFinal.toFixed(),
      cliente: selectedCustomer.id,
      vendedor: userId,
    };
    console.log(saleData);

    axios
      .post("http://localhost:3000/sales", saleData)
      .then((response) => {
        console.log(response);
        alert("Venta registrada");
        setidSale(response.data.id);
      })
      .catch((error) => {
        console.log(error);
      });
    

    selectedProducts.forEach(async (product) => {
      const productData = {
        venta: idSale, // Referencia a la venta recién creada
        producto: product.id_prod,
        cantidad: product.quantity,
        iva: (
          (product.precio * product.quantity * product.iva) /
          (100 + product.iva)
        ).toFixed(),
        subtotal: (
          (product.precio * product.quantity * 100) /
          (100 + product.iva)
        ).toFixed(),
        total: product.precio * product.quantity,
      };
      console.log(productData)

       axios
        .post("http://localhost:3000/sales-products", productData)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.error(error);
          alert("Error en subventa");
        });
    });
  };

  return (
    <div>
      <h1 className="text-7xl font-bold text-green-800 m-12 pt-5 text-center">
        Nueva Venta
      </h1>
      <h3 className="text-3xl font-bold text-green-800 m-2 pb-5 text-center">
        Datos de la venta
      </h3>

      <div className="flex justify-center">
        <form
          className=" text-green-800 text-left  border-2 border-green-700 rounded-lg p-3 flex flex-col items- w-10/12"
          onSubmit={handleSubmit}
        >
          <div className="inline-block border-b-2 border-green-700">
            <CustomerSearch
              customers={customers}
              onSelectCustomer={setSelectedCustomer}
            />
            <label className="inline-flex mx-2">Fecha </label>
            <input
              type="date"
              className=" rounded-md pl-2"
              onChange={(e) => setDate(e.target.value)}
              required
            />
            <label className="inline-flex m-2">Vendedor </label>
            <input
              className=" rounded-md pl-2 mb-4"
              value={userName}
              onChange={(e) => setSeller(e.target.value)}
              readOnly
            />
          </div>
          <div className="flex flex-wrap">
            <div className="w-4/12 p-3">
              <ProductSearch getData={handleAddProduct} />
            </div>
            <div className="w-8/12 p-3">
              <h1 className="text-xl mb-4">Productos:</h1>
              <div className="overflow-hidden rounded-md border border-gray-300 w-full">
                <table
                  className="w-full drop-shadow-2xl border-collapse"
                  border="1"
                >
                  <thead className="bg-green-700 ">
                    <tr className="text-gray-300">
                      <th className="pl-2">Cod </th>
                      <th>Producto </th>
                      <th>Cantidad </th>
                      <th>Precio Unitario</th>
                      <th>Iva </th>
                      <th>Gravada</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedProducts.map((product, index) => (
                      <tr key={index}>
                        <td className="pl-2">{product.id_prod}</td>
                        <td>
                          {product.nombre}
                          <button
                            className="text-red-500 px-3"
                            onClick={() => handleRemoveProduct(product.id_prod)} // Llama a la función de eliminar
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
                              handleUpdateQuantity(
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
                              handleUpdatePrice(
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
                  <tfoot className="bg-green-700 ">
                    <tr className="text-gray-300">
                      <th className="pl-2">Total</th>
                      <th></th>
                      <th></th>
                      <th></th>
                      <th>
                        {selectedProducts
                          .reduce((sum, product) => {
                            const iva =
                              (product.precio *
                                product.quantity *
                                product.iva) /
                              (100 + product.iva);
                            return sum + iva;
                          }, 0)
                          .toFixed()}
                      </th>
                      <th>
                        {selectedProducts
                          .reduce((sum, product) => {
                            const gravada =
                              (product.precio * product.quantity * 100) /
                              (100 + product.iva).toFixed();
                            return sum + gravada;
                          }, 0)
                          .toFixed()}
                      </th>
                      <th>
                        {selectedProducts
                          .reduce(
                            (sum, product) =>
                              sum + product.precio * (product.quantity || 1),
                            0
                          )
                          .toFixed()}
                      </th>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
          <button
            className="mt-5 text-gray-300 self-center text-center px-4 h-8 rounded backdrop-blur bg-green-800 transition hover:bg-green-900"
            type="submit"
          >
            Finalizar
          </button>
          <br />
        </form>
      </div>
      <div className="flex justify-center items-center h-full">
        <a href="/Ventas">
          <button className="text-gray-300 m-4 self-center text-center px-4 h-8 rounded backdrop-blur bg-green-800 transition hover:bg-green-900">
            Regresar
          </button>
        </a>
      </div>
    </div>
  );
}
