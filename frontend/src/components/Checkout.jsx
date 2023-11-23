import React, { useState, useEffect } from "react";
import { useLoaderData } from "react-router-dom";

const Checkout = () => {
  const user = useLoaderData();

  const [userAddress, setUserAddress] = useState("");
  const [isOrderButtonEnabled, setIsOrderButtonEnabled] = useState(false);

  useEffect(() => {
    const userAddress = user?.address;
    userAddress ? setUserAddress(userAddress) : "";
  }, []);

  const handleUseAddress = (address) => {
    setUserAddress(address);
    const id = user.userid;

    fetch(`http://localhost:3000/updateAddress/${id}`, {
      method: "PATCH",

      headers: {
        "Content-type": "application/json",
      },

      body: JSON.stringify({ address }),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if (data.error) {
          alert(data.error);
          return;
        }
        // alert("User updated successfully!!!!");
        setIsOrderButtonEnabled(true);
      });
  };

  const handleMakeOrder = () => {
    const orderData = {
        user: user.userid,
        books: [],
        orderAmount: 0,
        orderAddress: userAddress,
      };
    
      fetch(`http://localhost:3000/createOrder`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(orderData),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            alert(`Error creating order: ${data.error}`);
          } else {
            alert("Order placed successfully!");
          }
        })
        .catch((error) => {
          console.error("Error creating order:", error);
          alert("An error occurred while placing the order. Please try again.");
        });
  };

  return (
    // container mx-auto mt-32 lg:px-2 p-4
    <div className="mx-auto mt-32 lg:px-2 p-4 w-1/2">
      <h1 className="text-2xl font-bold mb-4 flex justify-center">Checkout</h1>
      <div>
        <p>Your address</p>
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
