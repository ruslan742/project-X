import React from "react";
import { useSnapshot } from "valtio";
import state from "../../store/index";

const PaymentPage = () => {
  const snapshot = useSnapshot(state);

  const handleChange = (e) => {
    state[e.target.name] = e.target.value;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Payment Details:", snapshot);
    // Здесь вы можете добавить логику для обработки платежа
  };

  return (
    <div style={{ maxWidth: "600px", margin: "auto" }}>
      <h2>Payment Page</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={snapshot.amount}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="cardNumber">Card Number</label>
          <input
            type="text"
            id="cardNumber"
            name="cardNumber"
            value={snapshot.cardNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="cardHolder">Card Holder</label>
          <input
            type="text"
            id="cardHolder"
            name="cardHolder"
            value={snapshot.cardHolder}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="expiryDate">Expiry Date</label>
          <input
            type="text"
            id="expiryDate"
            name="expiryDate"
            value={snapshot.expiryDate}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="cvv">CVV</label>
          <input
            type="text"
            id="cvv"
            name="cvv"
            value={snapshot.cvv}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Submit Payment</button>
      </form>
    </div>
  );
};

export default PaymentPage;
