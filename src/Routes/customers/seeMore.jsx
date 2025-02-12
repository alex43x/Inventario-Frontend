import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import axios from "axios";
import ViewPay from "./viewPay";

import flechaderecha from "../../assets/flecha-derecha.png";
import flechaizquierda from "../../assets/flecha-izquierda.png";
import registro from "../../assets/registro.png";
import anadir from "../../assets/anadir.png";

const SeeMoreCustomers = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { originalData } = location.state || {};
  const [batches, setBatches] = useState([]);
  const [customer, setCustomer] = useState([]);
  const [ishidden, setishidden] = useState(true);
  const [pay, setPay] = useState(0);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/customers/${originalData.id}`)
      .then((response) => {
        setCustomer(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (originalData.saldo != 0) {
      axios
        .get(
          `http://localhost:3000/payments/${customer.id}?saldo=${customer.saldo}`
        )
        .then((response) => {
          console.log("Pagos recibidos: ", response.data);
          setBatches(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [customer]);

  const handleEdit = (event) => {
    event.preventDefault();
    console.log(customer);
    navigate("/clientes/editcustomer", {
      state: { originalData: customer },
    });
  };

  const handleChange = async (e) => {
    const value = e.target.value;
    // Validar que el valor no sea 0 o negativo
    if (Number(value) <= 0) {
      e.target.value = null;
      setPay(null);
      return; // Detener la ejecución si el valor es inválido
    }

    // Validar que el pago no sea mayor al saldo del cliente
    if (Number(value) <= originalData.saldo) {
      setPay(Number(value));
    } else {
      alert("El pago no puede ser mayor al saldo del cliente");
      e.target.value = null;
      setPay(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (pay <= 0) {
      alert("El pago debe ser de un valor válido (Mayor a 0)");
    } else {
      const payData = {
        pago: pay,
        fecha: new Date(new Date().getTime() - 3 * 60 * 60 * 1000)
          .toISOString()
          .replace("T", " ")
          .split(".")[0],
        cliente: originalData.id,
      };
      console.log(payData);
      try {
        const payment = await axios.post(
          "http://localhost:3000/payments-debt",
          payData
        );

        originalData.saldo -= pay;
        alert("Pago exitoso");
        window.location.reload();
      } catch (error) {
        console.error(error);
        alert("Error al registrar el pago");
      }
    }
  };

  const newBatch = () => {
    navigate("/Inventario/addBatch", { state: { originalData: customer[0] } });
  };

  return (
    <div className="flex flex-wrap">
      <section className="text-blue-950 text-left lg:m-5 py-5 lg:pl-12 px-4 ">
        <h1 className="text-7xl font-bold ">{customer.nombre}</h1>
        <p className="text-xl mt-2 font-medium">
          Saldo Actual{" "}
          <span className="text-lg mt-2 font-normal">₲ {customer.saldo}</span>{" "}
        </p>

        {!ishidden && (
          <form
            onSubmit={handleSubmit}
            className=" self-center p-4 rounded-lg flex flex-wrap gap-4 text-gray-100 border-2 border-blue-950  trasition duration-500"
          >
            <input
              className="rounded-md text-sky-950 pl-2 border-2 border-sky-900 transition duration-200 focus:bg-sky-100 w-9/12"
              type="number"
              min={0}
              max={originalData.saldo}
              placeholder="Monto a pagar"
              onChange={handleChange}
            />
            <button
              type="submit"
              className=" self-center p-4 rounded-lg flex flex-wrap gap-4 text-gray-100 bg-blue-950 hover:bg-sky-950 trasition duration-500"
            >
              <p className="flex-1">Confirmar</p>
              <img className="w-6 h-6 ml-1 " src={anadir} alt="" />
            </button>
          </form>
        )}

        <div className="flex justify-evenly flex-wrap items-center mt-6 ml-1 gap-2">
          <button
            className=" self-center p-4 rounded-lg flex flex-wrap gap-4 text-gray-100 bg-blue-950 hover:bg-sky-950 trasition duration-500"
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              setishidden(!ishidden);
            }}
          >
            <p className="flex-1">Pagar</p>
            <img className="w-6 h-6 ml-1 " src={registro} alt="" />
          </button>
          <button
            className=" self-center p-4 rounded-lg flex flex-wrap gap-4 text-gray-100 bg-blue-950 hover:bg-sky-900 trasition duration-500"
            type="button"
            onClick={handleEdit}
          >
            <p className="flex-1">Editar</p>
            <img className="w-6 h-6 ml-1 " src={registro} alt="" />
          </button>

          <button
            className=" self-center p-4 rounded-lg flex flex-wrap gap-4 text-gray-100 bg-blue-950 hover:bg-sky-900 trasition duration-500"
            type="button"
            onClick={() => navigate(-1)}
          >
            <p className="flex-1">Regresar</p>
            <img className="w-6 h-6 ml-1 " src={flechaizquierda} alt="" />
          </button>
        </div>
      </section>
      <aside className="text-blue-950 text-left mt-8 p-5 ml-auto mr-20 lg:w-6/12 w-full">
        <div className=" ml-1 flex items-center space-x-2">
          <img className="w-6 h-6" src={flechaderecha} alt="" />
          <h2 className="text-xl mb-2 font-bold">Últimos movimientos</h2>
        </div>
        <ViewPay data={batches} />
      </aside>
    </div>
  );
};

export default SeeMoreCustomers;
