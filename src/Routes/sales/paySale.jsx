import React, { useState } from "react";
import alerta from '../../assets/alerta.png'
import Swal from "sweetalert2";
const PaySale = ({ totalAmount, onPay, payed }) => {
  const [actpay, setActpay] = useState(totalAmount);
  const [payMode, setPayMode] = useState("");
  const [quote, setQuote] = useState(false);

  const handleChange = (e) => {
    const value = e.target.value;

    // Si el input está vacío, actualiza el estado con una cadena vacía
    if (value === "") {
      setActpay("");
      setPayMode("");
      setQuote(false);
      return;
    }

    // Si el valor es un número, realiza la validación
    const numericValue = Number(value);
    if (numericValue <= totalAmount) {
      setActpay(numericValue);
      setPayMode(numericValue === totalAmount ? "Al contado" : "A cuota");
      setQuote(numericValue === totalAmount ? false : true);
      onPay(numericValue === totalAmount ? true : false);
      payed(numericValue);
      console.log(numericValue);
    } else {
      Swal.fire({
              title: "Datos inválidos",
              showClass: {
                popup: `
                          animate__animated
                          animate__fadeIn
                        `,
              },
              text: "El valor no puede superar el total de la compra",
              confirmButtonText: "Continuar",
              timer: 1000,
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
    <div className="inline-flex flex-wrap mt-4 w-full">
      <div className="p-2 ">
        <p>Total a Pagar: {totalAmount}</p>
        <label className="font-medium">
          Total Pagado:
          <input
            className="mx-1 rounded-md flex-grow bg-blue-50 px-2 border-2 border-blue-950"
            type="number"
            value={actpay}
            min={0}
            max={totalAmount}
            onChange={handleChange}
          />
        </label>
      </div>
      <div className="md:w-1/3 p-2 ml-6">
        <p className="">Saldo restante: {totalAmount - actpay}</p>
        <p className="">Modo de Pago: {payMode}</p>
      </div>
      {quote && (
        <div className="flex-1 bg-sky-100 rounded-md text-blue-950 w-3/12 p-2 h-full border-2 border-blue-950">
          <div className=" ml-1 flex items-center space-x-2">
            <h1 className="text-left text-2xl font-medium text-blue-950 mb-2">
              Pago a cuotas
            </h1>
            <img className="w-6 h-6" src={alerta} alt="" />
          </div>
          <p className="text-base">
            El saldo restante será cargado al cliente registrado en la venta.
          </p>
        </div>
      )}
    </div>
  );
};

export default PaySale;
