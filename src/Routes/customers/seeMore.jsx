import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import ViewDebt from "./viewDebt";

import axios from "axios";
import ViewPay from "./viewPay";

const SeeMoreCustomers = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { originalData } = location.state || {};
  const [batches, setBatches] = useState([]);
  const [customer, setcustomer] = useState([]);
  const [ishidden, setishidden] = useState(true);
  const [pay, setPay] = useState(0);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/customers/${originalData.id}`)
      .then((response) => {
        setcustomer(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  console.log("customer: ", customer);

  useEffect(() => {
    console.log(originalData.saldo);
    axios
      .get(
        `http://localhost:3000/payments/${originalData.id}?saldo=${originalData.saldo}`
      )
      .then((response) => {
        console.log("Pagos recibidos: ", response.data);
        setBatches(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [originalData]);

  const handleEdit = (event) => {
    event.preventDefault();
    navigate("/clientes/editcustomer", {
      state: { originalData: customer[0] },
    });
  };

  const handleChange = async (e) => {
    const value = e.target.value;
    if (Number(value) <= originalData.saldo) {
      setPay(Number(value));
    } else {
      alert("El pago no puede ser mayor al saldo del cliente");
      e.target.value=originalData.saldo
    }
  };
  
  const handleSubmit=async()=>{

  }

  const newBatch = () => {
    navigate("/Inventario/addBatch", { state: { originalData: customer[0] } });
  };

  return (
    <div>
      <section className="text-green-800 text-left m-5 p-5">
        <h1 className="text-7xl font-bold ">{originalData.nombre}</h1>
        <p className="text-xl mt-2 font-medium">
          Saldo{" "}
          <span className="text-lg mt-2 font-normal">
            ₲ {originalData.saldo}
          </span>{" "}
        </p>
      </section>
      <button
        onClick={(e) => {
          e.preventDefault();
          setishidden(!ishidden);
        }}
      >
        Pagar
      </button>
      {!ishidden && (
        <form onSubmit={handleSubmit}>
          <input
            className="ml-1 rounded-md flex-grow bg-green-50"
            type="number"
            min={0}
            max={originalData.saldo}
            onChange={handleChange}
          />
        </form>
      )}

      <aside className="text-green-800 text-left m-5 p-5">
        <h2 className="text-xl mb-2 font-bold">Últimos movimientos</h2>
        <ViewPay data={batches} />
      </aside>
      <section className="flex flex-wrap justify-center text-gray-300">
        <button
          className=" m-2 self-center text-center px-4 h-8 rounded backdrop-blur bg-green-800 transition hover:bg-green-900 "
          onClick={handleEdit}
        >
          Editar
        </button>
        <span> </span>
        <button
          className=" m-2 self-center text-center px-4 h-8 rounded backdrop-blur bg-green-800 transition hover:bg-green-900"
          onClick={newBatch}
        >
          Añadir Lote
        </button>
        <span> </span>
        <button
          className=" m-2 self-center text-center px-4 h-8 rounded backdrop-blur bg-green-800 transition hover:bg-green-900"
          onClick={() => navigate(-1)}
        >
          Regresar
        </button>
      </section>
    </div>
  );
};

export default SeeMoreCustomers;
