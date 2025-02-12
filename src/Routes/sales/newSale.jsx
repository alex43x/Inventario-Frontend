import axios from "axios";
import { useState, useEffect, useCallback, useMemo } from "react";
import { jwtDecode } from "jwt-decode";

import ProductSearch from "./productSearch";
import CustomerSearch from "./customerSearch";
import PaySale from "./paySale";
import ProductTable from "./productTable";

import registro from "../../assets/registro.png";
import flechaizquierda from "../../assets/flecha-izquierda.png";
import flechaderecha from "../../assets/flecha-derecha.png";
import carrito from "../../assets/carrito.png";

export default function NewSale() {
  const [customers, setCustomers] = useState([]);
  const [date, setDate] = useState(() => {
    const fecha= new Date(new Date().getTime() - 3 * 60 * 60 * 1000)
    .toISOString()
    .replace("T", " ")
    .split(".")[0]
    return fecha
  });
  const [idSale, setIdSale] = useState("");
  const [payment, setPayment] = useState(false);
  const [actpay, setActpay] = useState(0);

  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState([]);

  const token = localStorage.getItem("authToken");

  const userId = useMemo(() => {
    if (token) {
      const decodedToken = jwtDecode(token);
      return decodedToken.id;
    }
    return null;
  }, [token]);

  const userName = useMemo(() => {
    if (token) {
      const decodedToken = jwtDecode(token);
      return decodedToken.username;
    }
    return null;
  }, [token]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/customers")
      .then((response) => {
        setCustomers(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener clientes:", error);
      });
  }, []);

  // Callback para agregar un producto a la tabla
  const handleAddProduct = useCallback((product) => {
    setSelectedProducts((prev) => {
      const existingProduct = prev.find((p) => p.id_prod === product.id_prod);
      if (existingProduct) {
        alert("El producto ya está agregado.");
        return prev;
      }
      return [...prev, { ...product, quantity: 1 }]; // Inicializa con cantidad 1
    });
  }, []);

  const handleUpdateQuantity = useCallback((productName, quantity) => {
    setSelectedProducts((prev) =>
      prev.map((product) =>
        product.nombre === productName
          ? { 
              ...product, 
              quantity: quantity === null ? null : Math.min(quantity, product.stock) 
            }
          : product
      )
    );
  }, []);
  

  const handleUpdatePrice = useCallback((id, newprice) => {
    setSelectedProducts((prev) =>
      prev.map((product) =>
        product.id_prod === id
          ? { ...product, precio: newprice } // Actualiza el precio
          : product
      )
    );
  }, []);

  const handleRemoveProduct = useCallback((id_prod) => {
    setSelectedProducts((prev) =>
      prev.filter((product) => product.id_prod !== id_prod)
    );
  }, []);

  // Calcular los totales globales
  const { totalGravada, totalIVA, totalFinal } = useMemo(() => {
    const gravada = selectedProducts.reduce(
      (sum, producto) =>
        sum +
        (producto.precio * producto.quantity * 100) / (100 + producto.iva),
      0
    );
    const iva = selectedProducts.reduce(
      (sum, producto) =>
        sum +
        (producto.precio * producto.quantity * producto.iva) /
          (100 + producto.iva),
      0
    );
    const final = selectedProducts.reduce(
      (sum, producto) => sum + producto.precio * producto.quantity,
      0
    );
    return { totalGravada: gravada, totalIVA: iva, totalFinal: final };
  }, [selectedProducts]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const estado = payment ? "cerrado" : "pendiente";

    if (!selectedCustomer) {
      alert("Por favor, selecciona un cliente válido.");
      return;
    }

    if (!selectedProducts || selectedProducts.length === 0) {
      alert("Por favor, selecciona al menos un producto.");
      return;
    }
    const validarProductos = (selectedProducts) => {
      return selectedProducts.every(
        (product) =>
          product.precio !== null &&
          product.precio > 0 &&
          product.quantity !== null &&
          product.quantity > 0
      );
    };

    if (!validarProductos(selectedProducts)) {
      alert("Todos los productos deben tener un precio y una cantidad válidos (mayores a 0).");
      return;
    }

    // Lógica para enviar el formulario

    // Datos para la cabecera de la venta
    const saleData = {
      fecha: date,
      subtotal: totalGravada.toFixed(),
      iva: totalIVA.toFixed(),
      total: totalFinal.toFixed(),
      cliente: selectedCustomer.id,
      vendedor: userId,
      contado: payment,
      estado: estado,
    };

    try {
      // Crea la cabecera de la venta y espera la respuesta
      const saleResponse = await axios.post(
        "http://localhost:3000/sales",
        saleData
      );
      const newSaleId = saleResponse.data.id; // Obtén el ID de la venta creada
      setIdSale(newSaleId);

      // Envía los productos asociados a la venta
      const productPromises = selectedProducts.map((product) => {
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
        return axios.post("http://localhost:3000/sales-products", productData);
      });

      await Promise.all(productPromises);

      const payData = {
        venta: newSaleId,
        pago: actpay,
        fecha: date,
        contado: payment,
        cliente: selectedCustomer.id,
        estado: estado,
      };

      if(actpay != 0 && actpay !=null){

        await axios.post("http://localhost:3000/payments", payData);
      }

      const saldo = totalFinal.toFixed() - actpay;
      await axios.put(
        `http://localhost:3000/customers-sale/${selectedCustomer.id}`,
        { saldo }
      );

      alert("Venta registrada exitosamente.");
      setSelectedProducts([]); // Limpia los productos seleccionados
      setSelectedCustomer(null); // Limpia el cliente seleccionado
      setDate(""); // Limpia la fecha
      setActpay(0); // Limpia el pago actual
      window.location.reload();
    } catch (error) {
      console.error("Error al registrar la venta:", error);
      alert("Error al registrar la venta.");
    }
  };

  return (
    <div>
      <h1 className="text-7xl font-bold text-blue-950 my-10 md:ml-32  left">
        Nueva Venta
      </h1>

      <div className="flex justify-center">
        <form
          className="text-blue-950 text-left font-medium border-2 border-blue-950 rounded-lg p-3 flex flex-col  w-10/12"
          onSubmit={handleSubmit}
        >
          <h3 className="text-3xl font-bold text-blue-950 mx-2 pb-1 text-left">
            Datos
          </h3>
          <div className="inline-flex flex-wrap border-b-2 border-blue-950">
            <CustomerSearch
              customers={customers}
              onSelectCustomer={setSelectedCustomer}
            />
            <div className="mt-2">
              <label className="ml-2 mt-2">Vendedor: </label>
              <input
                className="rounded-md text-sky-950 px-2 border-2 border-sky-900 transition duration-200 focus:bg-sky-100 "
                value={userName}
                readOnly
              />
            </div>
            <div className="my-2 ml-4">
              <label className="ml-2">Fecha: </label>
              <input
                value={date}
                type="datetime-local"
                className="rounded-md text-sky-950 px-2 border-2 border-sky-900 transition duration-200 focus:bg-sky-100 "
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="flex flex-wrap ">
            <div className="flex-1 w-full md:w-4/12 p-3  border-r-2 border-blue-950">
              <ProductSearch getData={handleAddProduct} />
            </div>
            <div className="w-full md:w-8/12 p-3">
              <div className="  flex items-center space-x-2">
                <h1 className="text-left text-2xl font-medium text-blue-950 mb-2">
                  Productos seleccionados
                </h1>
                <img className="w-6 h-6" src={carrito} alt="" />
              </div>
              <div className="overflow-hidden  w-full">
                <ProductTable
                  products={selectedProducts}
                  onUpdateQuantity={handleUpdateQuantity}
                  onUpdatePrice={handleUpdatePrice}
                  onRemoveProduct={handleRemoveProduct}
                />
                <PaySale
                  totalAmount={totalFinal}
                  onPay={setPayment}
                  payed={setActpay}
                />
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center h-full gap-4">
            <button
              className=" self-center p-4 rounded-lg flex flex-wrap gap-4 text-gray-100 bg-blue-950 hover:bg-sky-900 trasition duration-500"
              type="submit"
            >
              <p className="flex-1">Confirmar venta</p>
              <img className="w-6 h-6 ml-1 " src={registro} alt="" />
            </button>
            <a href="/Home">
              <button
                className=" self-center p-4 rounded-lg flex flex-wrap gap-4 text-gray-100 bg-blue-950 hover:bg-sky-900 trasition duration-500"
                type="button"
              >
                <p className="flex-1">Regresar</p>
                <img className="w-6 h-6 ml-1 " src={flechaizquierda} alt="" />
              </button>
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
