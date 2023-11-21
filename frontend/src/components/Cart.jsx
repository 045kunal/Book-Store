import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthProvider";

const Cart = () => {
  const { user } = useAuth();
  //   const [cart, setCart] = useState([]);

  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );

  //   useEffect(() => {
  //     const storedCart = localStorage.getItem(`cart_${user?.username}`);

  //     if (storedCart) {
  //       setCart(JSON.parse(storedCart));
  //     }

  //   }, [user]);

  const handleDecreaseQuantity = (itemId) => {
    const updatedCart = cart.map((item) => {
      if (item.id === itemId && item.quantity > 1) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });

    setCart(updatedCart);
    localStorage.setItem(`cart_${user?.username}`, JSON.stringify(updatedCart));
  };

  const handleIncreaseQuantity = (itemId) => {
    const updatedCart = cart.map((item) => {
      if (item.id === itemId && item.quantity < item.inventory - 1) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });

    setCart(updatedCart);
    localStorage.setItem(`cart_${user?.username}`, JSON.stringify(updatedCart));
  };

  const handleRemoveItem = (itemId) => {
    const updatedCart = cart.filter((item) => item.id !== itemId);

    setCart(updatedCart);
    localStorage.setItem(`cart_${user?.username}`, JSON.stringify(updatedCart));
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
            <div
              key={item.id}
              className="flex items-center border-b border-gray-200 p-4"
            >
              <img
                src={item.imageLink}
                alt={item.title}
                className="w-16 h-16 object-cover mr-4"
              />
              <div className="flex-1">
                <h2 className="text-lg font-semibold">{item.title}</h2>
                <p>Author: {item.authors}</p>
                <div className="flex items-center space-x-4 mt-2">
                  <button onClick={() => handleDecreaseQuantity(item.id)}>
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleIncreaseQuantity(item.id)}>
                    +
                  </button>
                </div>
              </div>
              <div>
                <p className="font-semibold">${item.price * item.quantity}</p>
                <button onClick={() => handleRemoveItem(item.id)}>
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
