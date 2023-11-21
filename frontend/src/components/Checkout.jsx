// Checkout.jsx

import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

const Checkout = () => {
  const history = useHistory();

  const [userAddress, setUserAddress] = useState("");
  const [isOrderButtonEnabled, setIsOrderButtonEnabled] = useState(false);

  useEffect(() => {
    // Check if the user has a saved address
    // If yes, set the userAddress state
    // Example: setUserAddress(getUserSavedAddress());
  }, []);

  const handleUseAddress = (address) => {
    setUserAddress(address);
    setIsOrderButtonEnabled(true);
  };

  const handleMakeOrder = () => {
    // Perform order processing logic
    alert("Order placed successfully!");
    // Redirect to a confirmation page or any other desired route
    history.push("/order-confirmation");
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-4 border border-gray-300 rounded">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>
      <div>
        <textarea
          value={userAddress}
          onChange={(e) => setUserAddress(e.target.value)}
          placeholder="Enter your address"
          className="w-full p-2 border border-gray-300 rounded"
        />
        <button
          onClick={() => handleUseAddress(userAddress)}
          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Use This Address
        </button>
      </div>
      <button
        onClick={handleMakeOrder}
        disabled={!isOrderButtonEnabled}
        className={`mt-4 bg-green-500 text-white px-4 py-2 rounded ${
          !isOrderButtonEnabled && "opacity-50 cursor-not-allowed"
        }`}
      >
        Make Your Order
      </button>
    </div>
  );
};

export default Checkout;
