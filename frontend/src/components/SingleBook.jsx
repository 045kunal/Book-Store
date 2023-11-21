import { toast } from "react-toastify";
import React, { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";

const SingleBook = () => {
  const {
    _id,
    title,
    authors,
    categories,
    price,
    inventory,
    shortDescription,
    longDescription,
    imageLink,
  } = useLoaderData();

  const [quantity, setQuantity] = useState(1);

  const handleIncreaseQuantity = () => {
    if (quantity < inventory) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    const productInfo = {
      _id,
      title,
      authors,
      categories,
      price,
      inventory,
      quantity,
      imageLink,
    };

    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingProductIndex = existingCart.findIndex(
      (item) => item._id === _id
    );

    if (existingProductIndex !== -1) {
      existingCart[existingProductIndex].quantity = quantity;
    } else {
      existingCart.push(productInfo);
    }

    const userId = localStorage.getItem("userId");
    const cartKey = `cart_${userId}`;

    localStorage.setItem(cartKey, JSON.stringify(existingCart));
    toast.success("Added to Cart!");
  };

  return (
    <div className="mt-32 px-4 lg:px-24">
      <div className="flex">
        {/* Left side for image  */}
        <div className="w-1/2 h-1/2">
          <img src={imageLink} alt={title} className="w-1/2 h-1/4" />
        </div>

        {/* Right side for details */}
        <div className="w-1/2">
          <h2 className="text-2xl font-bold mb-4">{title}</h2>
          <p className="mb-2">
            <strong>Authors: </strong>
            {authors}
          </p>
          <p className="mb-2">
            <strong>Genres: </strong>
            {categories}
          </p>
          <p className="mb-2">
            <strong>Price: </strong>${price}
          </p>
          <p className="mb-2">
            <strong>Inventory: </strong>
            {inventory} available
          </p>
          <p className="mb-4">
            <strong>Description: </strong>
            {shortDescription}
          </p>
          <p>{longDescription}</p>
          <div className="flex gap-12 items-center mt-10">
            <div className="flex items-center gap-4">
              <button
                onClick={handleDecreaseQuantity}
                className="bg-amber-400 text-white rounded px-3 py-1"
              >
                -
              </button>
              <span>{quantity}</span>
              <button
                onClick={handleIncreaseQuantity}
                className="bg-amber-400 text-white rounded px-3 py-1"
              >
                +
              </button>
            </div>
            <div className="flex gap-4">
              <button
                onClick={handleAddToCart}
                className="bg-green-500 text-white rounded px-4 py-2"
              >
                Add to Cart
              </button>
              <Link to="/cart">
                <button
                  className="bg-orange-500 text-white rounded px-4 py-2"
                >
                  Checkout
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleBook;
