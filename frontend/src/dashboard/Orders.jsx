import { Pagination, Table } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Orders = () => {
  const [allOrders, setOrders] = useState([]);
  const [status, setStatus] = useState();
  useEffect(() => {
    fetch(`http://localhost:3000/orders`)
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
      });
  }, []);
  console.log(allOrders);
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
                  id="status"
                  value={selectedUserRole}
                  onChange={handleChangeSelectedValue}
                  type="text"
                  name="status"
                  className="w-full rounded"
                >
                  {userRole.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </Select>
              </Table.Cell>
              <Table.Cell>
                <button
                  className="bg-green-600 px-4 py-1 font-semibold text-white rounded-sm hover:bg-sky-600"
                  onClick={() => handleChange(order._id)}
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
