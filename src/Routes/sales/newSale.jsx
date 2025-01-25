import axios from "axios";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

import ProductSearch from "./productSearch";
import CustomerSearch from "./customerSearch";
import PaySale from "./paySale";
import ProductTable from "./productTable";

export default function NewSale() {
  const [customers, setCustomers] = useState([]);
  const [date, setDate] = useState("");
  const [idSale, setidSale] = useState("");
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedCustomer) {
      alert("Por favor, selecciona un cliente válido.");
      return;
    }

    if (!selectedProducts || selectedProducts.length === 0) {
      alert("Por favor, selecciona al menos un producto.");
      return;
    }

    // Datos para la cabecera de la venta
    const saleData = {
      fecha: date,
      subtotal: totalGravada.toFixed(),
      iva: totalIVA.toFixed(),
      total: totalFinal.toFixed(),
      cliente: selectedCustomer.id,
      vendedor: userId,
    };

    try {
      // Crea la cabecera de la venta y espera la respuesta
      const saleResponse = await axios.post(
        "http://localhost:3000/sales",
        saleData
      );
      const newSaleId = saleResponse.data.id; // Obtén el ID de la venta creada
      setidSale(newSaleId);

      // Envía los productos asociados a la venta
      for (const product of selectedProducts) {
        const productData = {
          venta: newSaleId, // Usa el ID de la venta recién creada
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

        try {
          await axios.post("http://localhost:3000/sales-products", productData);
          console.log(`Producto ${product.id_prod} registrado en la venta.`);
        } catch (error) {
          console.error(
            `Error al registrar el producto ${product.id_prod}:`,
            error
          );
          alert(`Error al registrar el producto ${product.nombre}`);
        }
      }

      alert("Venta registrada exitosamente.");
      setSelectedProducts([]); // Limpia los productos seleccionados
    } catch (error) {
      console.error("Error al registrar la venta:", error);
      alert("Error al registrar la venta.");
    }
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
          <div className="inline-flex flex-wrap border-b-2 border-green-700">
            <CustomerSearch
              customers={customers}
              onSelectCustomer={setSelectedCustomer}
            />
            <div className="mt-2 ">
              <label className="ml-2 mt-2">Vendedor: </label>
              <input
                className=" rounded-md pl-2"
                value={userName}
                onChange={(e) => setSeller(e.target.value)}
                readOnly
              />
            </div>
            <div className="my-2">
              <label className="ml-2 ">Fecha: </label>
              <input
                type="date"
                className=" rounded-md pl-2 "
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="flex flex-wrap">
            <div className="flex-1 w-full md:w-4/12 p-3">
              <ProductSearch getData={handleAddProduct} />
            </div>
            <div className="w-full md:w-8/12 p-3">
              <h1 className="text-xl mb-4">Productos:</h1>
              <div className="overflow-hidden rounded-md border border-gray-300 w-full">
                <ProductTable
                  products={selectedProducts}
                  onUpdateQuantity={handleUpdateQuantity}
                  onUpdatePrice={handleUpdatePrice}
                  onRemoveProduct={handleRemoveProduct}
                />
                <PaySale totalAmount={totalFinal} />
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
