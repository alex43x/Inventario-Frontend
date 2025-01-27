import React, { useState } from "react";

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
      payed(numericValue)
      console.log(numericValue)
    } else {
      alert(`El valor no puede superar el total: ${totalAmount}`);
    }
  };

  return (
    <div className="inline-flex flex-wrap mt-4 w-full">
      <div className="p-2 ">
        <p>Total a Pagar: {totalAmount}</p>
        <label className="">
          Total Pagado:
          <input
            className="ml-1 rounded-md flex-grow bg-green-50"
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
        <div className="flex-1 bg-orange-100 rounded-md text-orange-600 w-3/12 p-2 h-full">
          <h1 className="text-xl font-semibold">Pago a cuotas</h1>
          <p className="text-base">
            El saldo restante será cargado al cliente registrado en la venta
          </p>
        </div>
      )}
    </div>
  );
};

export default PaySale;
