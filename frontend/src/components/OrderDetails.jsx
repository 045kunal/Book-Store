import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const OrderDetails = () => {
  const { orderId } = useParams();
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    // Fetch order details based on orderId
    fetch(`http://localhost:3000/orders/details/${orderId}`)
      .then((res) => res.json())
      .then((data) => {
        setOrderDetails(data);
      });
  }, [orderId]);

  return (
    <div className="container mx-auto mt-32 lg:px-2 p-4">
      <h1 className="text-2xl font-bold mb-4 justify-center flex">
        Order Details
      </h1>
      {orderDetails ? (
        <div>
          <div className="flex border-b border-gray-200 p-4">
            <div className="flex-1">
              <h2 className="text-lg font-semibold">Order ID: {orderId}</h2>
              <p>Order Amount: ${orderDetails.orderAmount}</p>
              <p>Order Address: {orderDetails.orderAddress}</p>
              <p>Order Status: {orderDetails.orderStatus}</p>
              <p>
                Order Date:{" "}
                {new Date(orderDetails.orderDate).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="mt-4">
            {orderDetails.books.map((book) => (
              <div key={book._id} className="flex border-b border-gray-200 p-4">
                <img
                  src={book.imageLink}
                  alt={book.title}
                  className="w-24 h-36 object-cover mr-4"
                />
                <div className="flex-1">
                  <h2 className="text-lg font-semibold">{book.title}</h2>
                  <p>Quantity: {book.quantity}</p>
                  <p>Price: ${book.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <div className="mt-4">
        <Link to="/my-orders">
          <button className="bg-blue-500 text-white rounded px-4 py-2">
            Back to Orders
          </button>
        </Link>
      </div>
    </div>
  );
};

export default OrderDetails;
