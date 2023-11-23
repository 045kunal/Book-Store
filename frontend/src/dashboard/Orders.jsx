import { Pagination, Select, Table } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Orders = () => {
  const [allOrders, setOrders] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState({});
  useEffect(() => {
    fetch(`http://localhost:3000/orders`)
      .then((res) => res.json())
      .then((data) => {
        const initialStatus = {};
        data.forEach((order) => {
          initialStatus[order._id] = order.orderStatus;
        });
        setSelectedStatus(initialStatus);
        setOrders(data);
      });
  }, []);

  const handleChangeStatus = (orderId, newStatus) => {
    setSelectedStatus((prevStatus) => ({
      ...prevStatus,
      [orderId]: newStatus,
    }));
  };

  const handleSaveStatus = (orderId) => {
    const newStatus = selectedStatus[orderId];
    fetch(`http://localhost:3000/updateOrder/${orderId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: newStatus }),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(`Order ${orderId} status updated to ${newStatus}`);
        toast.success("Status updated.");
      })
      .catch((error) => {
        console.error("Error updating order status:", error);
      });
  };

  return (
    <div className="px-4 my-12">
      <h2 className="mb-8 text-3xl font-bold">Manage and update Orders!</h2>

      <Table className="lg:w-[1180px]">
        <Table.Head>
          <Table.HeadCell>No.</Table.HeadCell>
          <Table.HeadCell>Order ID</Table.HeadCell>
          <Table.HeadCell>Order Amount</Table.HeadCell>
          <Table.HeadCell>Order Address</Table.HeadCell>
          <Table.HeadCell>Order Status</Table.HeadCell>
          <Table.HeadCell>Save Status</Table.HeadCell>
        </Table.Head>

        {allOrders.map((order, index) => (
          <Table.Body className="divide-y" key={order._id}>
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {index + 1}
              </Table.Cell>
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {order._id}
              </Table.Cell>
              <Table.Cell>{order.orderAmount}$</Table.Cell>
              <Table.Cell>{order.orderAddress}</Table.Cell>
              <Table.Cell>
                <Select
                  value={selectedStatus[order._id] || ""}
                  onChange={(e) =>
                    handleChangeStatus(order._id, e.target.value)
                  }
                  className="w-full rounded"
                >
                  <option value="Pending">Pending</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Out for delivery">Out for delivery</option>
                  <option value="Completed">Completed</option>
                </Select>
              </Table.Cell>

              <Table.Cell>
                <button
                  className="bg-green-600 px-4 py-1 font-semibold text-white rounded-sm hover:bg-sky-600"
                  onClick={() => handleSaveStatus(order._id)}
                >
                  Confirm
                </button>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        ))}
      </Table>

      {/* pagination */}
      <div className="flex items-center justify-center text-center mt-8">
        <Pagination
          currentPage={1}
          layout="pagination"
          nextLabel="Go forward"
          onPageChange={(page) => {
            setCurrentPage(page);
          }}
          previousLabel="Go back"
          showIcons
          totalPages={1000}
        />
      </div>
    </div>
  );
};

export default Orders;
