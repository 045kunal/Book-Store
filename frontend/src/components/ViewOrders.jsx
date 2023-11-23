import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";

const ViewOrders = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useAuth();

  const fetchOrders = () => {
    const userId = user?.userid;
    console.log(userId);
    fetch(`http://localhost:3000/orders/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
      });
  };

  useEffect(() => {
    fetchOrders();
  }, [user]);
  console.log(orders);

  return (
    <div className="container mx-auto mt-32 lg:px-2 p-4">
      <h1 className="text-2xl font-bold mb-4 justify-center flex">
        Your Orders
      </h1>
      {orders.length === 0 ? (
        <div>
          <h2>Oops, You don't have made any orders yet.</h2>
          <Link to="/shop">
            <button className="bg-green-500 text-white rounded px-4 py-2">
              Go to Shop
            </button>
          </Link>
        </div>
      ) : (
        <div>
          {orders.map((order) => (
            <div key={order._id} className="flex border-b border-gray-200 p-4">
              <div className="flex-1">
                <h2 className="text-lg font-semibold">Order ID: {order._id}</h2>
                <p>Order Amount: ${order.orderAmount}</p>
                <p>Order Address: {order.orderAddress}</p>
                <p>Order Status: {order.orderStatus}</p>
                <p>
                  Order Date: {new Date(order.orderDate).toLocaleDateString()}
                </p>
              </div>
              <div>
                <Link to={`/order-details/${order._id}`}>
                  <button className="bg-blue-500 text-white rounded px-4 py-2">
                    View Details
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewOrders;
