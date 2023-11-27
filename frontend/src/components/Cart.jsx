import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthProvider";
import { Link } from "react-router-dom";

const Cart = () => {
  const { user } = useAuth();
  const [cart, setCart] = useState([]);

  const getUserId = () => {
    const userId = user?.userid;
    return userId;
  };

  const getCartKey = () => {
    const userId = getUserId();
    return `cart_${userId}`;
  };

  const getCart = () => {
    const cartKey = getCartKey();
    const cartWithCartKey = JSON.parse(localStorage.getItem(cartKey)) || [];
    setCart(cartWithCartKey);
    return cartWithCartKey;
  };

  const updateCart = (updatedCart) => {
    const cartKey = getCartKey();
    localStorage.setItem(cartKey, JSON.stringify(updatedCart));
    setCart(updatedCart);
  };

  const handleDecreaseQuantity = (itemId) => {
    const updatedCart = cart.map((item) => {
      if (item._id === itemId && item.quantity > 1) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });

    updateCart(updatedCart);
  };

  const handleIncreaseQuantity = (itemId) => {
    const updatedCart = cart.map((item) => {
      if (item._id === itemId && item.quantity < item.inventory - 1) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });

    updateCart(updatedCart);
  };

  const handleRemoveItem = (itemId) => {
    const updatedCart = cart.filter((item) => item._id !== itemId);
    updateCart(updatedCart);
  };

  const totalAmount = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  useEffect(() => {
    const initialCart = getCart();
    setCart(initialCart);
  }, []);
  console.log("Cart: ", cart);

  const goToPayment = () => {};

  return (
    <div className="container mx-auto mt-32 lg:px-2 p-4">
      <h1 className="text-2xl font-bold mb-4 justify-center flex">Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cart.map((item) => (
            <div key={item.id} className="flex border-b border-gray-200 p-4">
              <img
                src={item.imageLink}
                alt={item.title}
                className="w-24 h-36 object-cover mr-4"
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
            <p className="font-semibold">Total: ${totalAmount.toFixed(2)}</p>
            <Link to={`/checkout/${user.userid}`}>
              <button
                onClick={() => goToPayment()}
                className="bg-green-500 text-white rounded px-4 py-2"
              >
                Proceed to Buy
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
