import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthProvider";

const Cart = () => {
  const { user } = useAuth();

  const getUserId = () => {
    const userid = user.userid;
    return userid;
  };

  const getCartKey = () => {
    const userid = getUserId();
    return `cart_${userid}`;
  };

  const getCart = () => {
    const cartKey = getCartKey();
    const cartWithCartKey = JSON.parse(localStorage.getItem(cartKey)) || [];
    return cartWithCartKey;
  };
  const handleDecreaseQuantity = (itemId) => {
    const cartWithCartKey = getCart();

    const updatedCart = cartWithCartKey?.map((item) => {
      if (item._id === itemId && item.quantity < item.inventory - 1) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });

    localStorage.setItem(`cartWithCartKey`, JSON.stringify(updatedCart));
  };

  const handleIncreaseQuantity = (itemId) => {
    const cartWithCartKey = getCart();
    console.log("cartWithCartKey: ", cartWithCartKey);

    const updatedCart = cartWithCartKey?.map((item) => {
      if (item._id === itemId && item.quantity < item.inventory - 1) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });

    localStorage.setItem(`cartWithCartKey`, JSON.stringify(updatedCart));
  };

  const handleRemoveItem = (itemId) => {
    const cartWithCartKey = getCart();

    const updatedCart = cartWithCartKey.filter((item) => item._id !== itemId);

    localStorage.setItem(`cartWithCartKey`, JSON.stringify(updatedCart));
  };

  const totalAmount = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="container mx-auto mt-10 p-4">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cart.map((item) => (
            <div key={item.id} className="flex border-b border-gray-200 p-4">
              <img
                src={item.imageLink}
                alt={item.title}
                className="w-20 h-32 object-cover mr-4"
              />
              <div className="flex-1">
                <h2 className="text-lg font-semibold">{item.title}</h2>
                <p>Author: {item.authors}</p>
                <p>Price: {item.price}$</p>
                <div className="flex items-center space-x-4 mt-2">
                  <button onClick={() => handleDecreaseQuantity(item._id)}>
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleIncreaseQuantity(item._id)}>
                    +
                  </button>
                </div>
              </div>
              <div>
                <p className="font-semibold">${item.price * item.quantity}</p>
                <button onClick={() => handleRemoveItem(item._id)}>
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className="mt-4">
            <p className="font-semibold">Total: {totalAmount}</p>
            <button onClick={() => goToPayment()}>Proceed to Payment</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
