import React, { useState } from "react";

const PaySale = ({ totalAmount }) => {
  const [actpay, setActpay] = useState(0);
  const [payMode, setPayMode] = useState("");

  const handleChange = (e) => {
    const value = Number(e.target.value);
    if (value <= totalAmount) {
      setActpay(value);
      setPayMode(value === totalAmount ? "Al contado" : "A cuota");
    } else {
      alert(`El valor no puede superar el total: ${totalAmount}`);
    }
  };

  return (
    <div className="flex flex-wrap mt-4">
      <p>Total a Pagar: {totalAmount}</p>
      <label className="ml-4">
        Total Pagado:
        <input
          className="ml-2 w-20 "
          type="number"
          value={actpay}
          min={0}
          max={totalAmount}
          onChange={handleChange}
        />
      </label>
      <p className="ml-4">Modo de Pago: {payMode}</p>
    </div>
  );
};

export default PaySale;
