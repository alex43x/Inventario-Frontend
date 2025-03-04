import axios from "axios";
import { useState, useEffect, useCallback, useMemo } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import ProductSearch from "./productSearch";
import CustomerSearch from "./customerSearch";
import PaySale from "./paySale";
import ProductTable from "./productTable";
import Swal from "sweetalert2";

import registro from "../../assets/registro.png";
import flechaizquierda from "../../assets/flecha-izquierda.png";
import flechaderecha from "../../assets/flecha-derecha.png";
import carrito from "../../assets/carrito.png";

export default function NewSale() {
  const [customers, setCustomers] = useState([]);
  const [date, setDate] = useState(() => {
    const fecha = new Date(new Date().getTime() - 3 * 60 * 60 * 1000)
      .toISOString()
      .replace("T", " ")
      .split(".")[0];
    return fecha;
  });
  const [idSale, setIdSale] = useState("");
  const [payment, setPayment] = useState(false);
  const [actpay, setActpay] = useState(0);

  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const navigate=useNavigate();
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
      .get(`${import.meta.env.VITE_API_URL}/customers`)
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
        Swal.fire({
                title: "El producto ya está agregado",
                showClass: {
                  popup: `
                            animate__animated
                            animate__fadeIn
                          `,
                },
                confirmButtonText: "Continuar",
                timer: 1500,
                allowOutsideClick: false,
                customClass: {
                  popup:
                    "bg-sky-50 rounded-lg shadow-xl rounded-lg border-2 border-sky-800",
                  title: "text-4xl font-bold text-sky-950",
                  text: "text-sky-900 font-medium",
                  confirmButton:
                    "bg-sky-950 focus:bg-sky-900 transition text-white font-bold py-2 px-4 rounded",
                },
              });
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
              quantity:
                quantity === null ? null : Math.min(quantity, product.stock),
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
    console.log(totalFinal, actpay, totalFinal<actpay)
    
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
      Swal.fire({
              title: "Selecciona un cliente válido",
              showClass: {
                popup: `
                          animate__animated
                          animate__fadeIn
                        `,
              },
              confirmButtonText: "Continuar",
              timer: 2500,
              allowOutsideClick: false,
              customClass: {
                popup:
                  "bg-sky-50 rounded-lg shadow-xl rounded-lg border-2 border-sky-800",
                title: "text-4xl font-bold text-sky-950",
                text: "text-sky-900 font-medium",
                confirmButton:
                  "bg-sky-950 focus:bg-sky-900 transition text-white font-bold py-2 px-4 rounded",
              },
            });
      return;
    }

    if (!selectedProducts || selectedProducts.length === 0) {
      Swal.fire({
              title: "Debes seleccionar al menos 1 producto",
              showClass: {
                popup: `
                          animate__animated
                          animate__fadeIn
                        `,
              },
              text: "Hubo un error al añadir el producto",
              confirmButtonText: "Continuar",
              timer: 1500,
              allowOutsideClick: false,
              customClass: {
                popup:
                  "bg-sky-50 rounded-lg shadow-xl rounded-lg border-2 border-sky-800",
                title: "text-4xl font-bold text-sky-950",
                text: "text-sky-900 font-medium",
                confirmButton:
                  "bg-sky-950 focus:bg-sky-900 transition text-white font-bold py-2 px-4 rounded",
              },
            });
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
      Swal.fire({
              title: "Datos inválidos",
              showClass: {
                popup: `
                          animate__animated
                          animate__fadeIn
                        `,
              },
              text: "Todos los productos deben tener una cantidad y precio válidos (mayor a 0)",
              confirmButtonText: "Continuar",
              timer: 1400,
              allowOutsideClick: false,
              customClass: {
                popup:
                  "bg-sky-50 rounded-lg shadow-xl rounded-lg border-2 border-sky-800",
                title: "text-4xl font-bold text-sky-950",
                text: "text-sky-900 font-medium",
                confirmButton:
                  "bg-sky-950 focus:bg-sky-900 transition text-white font-bold py-2 px-4 rounded",
              },
            });
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
        `${import.meta.env.VITE_API_URL}/sales`,
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
        return axios.post(`${import.meta.env.VITE_API_URL}/sales-products`, productData);
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

      if (actpay != 0 && actpay != null) {
        await axios.post(`${import.meta.env.VITE_API_URL}/payments`, payData);
      }

      const saldo = totalFinal.toFixed() - actpay;
      await axios.put(
        `${import.meta.env.VITE_API_URL}/customers-sale/${selectedCustomer.id}`,
        { saldo }
      );

      Swal.fire({
              title: "Venta registrada",
              showClass: {
                popup: `
                          animate__animated
                          animate__fadeIn
                        `,
              },
              text: "La venta ha sido exitosa",
              confirmButtonText: "Continuar",
              timer: 2000,
              allowOutsideClick: false,
              customClass: {
                popup:
                  "bg-sky-50 rounded-lg shadow-xl rounded-lg border-2 border-sky-800",
                title: "text-4xl font-bold text-sky-950",
                text: "text-sky-900 font-medium",
                confirmButton:
                  "bg-sky-950 focus:bg-sky-900 transition text-white font-bold py-2 px-4 rounded",
              },
            });
      setSelectedProducts([]); // Limpia los productos seleccionados
      setSelectedCustomer(null); // Limpia el cliente seleccionado
      setDate(""); // Limpia la fecha
      setActpay(0); // Limpia el pago actual
      window.location.reload();
    } catch (error) {
      console.error("Error al registrar la venta:", error);
      Swal.fire({
              title: "Datos inválidos",
              showClass: {
                popup: `
                          animate__animated
                          animate__fadeIn
                        `,
              },
              text: "Hubo un error al registrar la venta",
              confirmButtonText: "Continuar",
              timer: 2000,
              allowOutsideClick: false,
              customClass: {
                popup:
                  "bg-sky-50 rounded-lg shadow-xl rounded-lg border-2 border-sky-800",
                title: "text-4xl font-bold text-sky-950",
                text: "text-sky-900 font-medium",
                confirmButton:
                  "bg-sky-950 focus:bg-sky-900 transition text-white font-bold py-2 px-4 rounded",
              },
            });
    }
  };

  return (
    <div>
      <h1 className="lg:text-7xl text-4xl font-bold text-blue-950 my-10 lg:ml-32 md:ml-24 ml-8">
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
            <div className="lg:my-2 lg:ml-4 mb-1 mt-2">
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
              <div className="overflow-hidden w-full">
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
            <button
              className=" self-center p-4 rounded-lg flex flex-wrap gap-4 text-gray-100 bg-blue-950 hover:bg-sky-900 trasition duration-500"
              type="button"
              onClick={() => navigate("/Home")}
            >
              <p className="flex-1">Regresar</p>
              <img className="w-6 h-6 ml-1 " src={flechaizquierda} alt="" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
