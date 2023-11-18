import { Pagination, Table } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ManageUsers = () => {
  const [allUsers, setAllUsers] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:3000/all-users`)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setAllUsers(data);
      });
  }, []);

  const handleDelete = (id) => {
    // console.log(id)
    fetch(`http://localhost:3000/userDelete/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          alert(data.error);
          return;
        }
        alert("User Deleted successfully.");
        location.reload();
        // console.log(data);
        // setAllUsers(data);
      });
  };

  // const getRole = async(userid)=>{
  //   const userroleid = await
  // }

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const onPageChange = () => setCurrentPage(page);

  return (
    <div className="px-4 my-12">
      <h2 className="mb-8 text-3xl font-bold">Manager Your Users!</h2>

      <Table className="lg:w-[1180px]">
        <Table.Head>
          <Table.HeadCell>No.</Table.HeadCell>
          <Table.HeadCell>User Name</Table.HeadCell>
          <Table.HeadCell>First Name</Table.HeadCell>
          <Table.HeadCell>Email ID</Table.HeadCell>
          <Table.HeadCell>Mobile No</Table.HeadCell>
          <Table.HeadCell>Edit or Manage</Table.HeadCell>
        </Table.Head>

        {allUsers.map((user, index) => (
          <Table.Body className="divide-y" key={user._id}>
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {index + 1}
              </Table.Cell>
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {user.username}
              </Table.Cell>
              <Table.Cell>{user.firstname}</Table.Cell>
              <Table.Cell>{user.emailid}</Table.Cell>
              <Table.Cell>{user.mobileno}</Table.Cell>
              {/* <Table.Cell>{getRole(user._id)}</Table.Cell> */}
              <Table.Cell>
                <Link
                  className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 mr-5"
                  to={`/admin/dashboard/edit-users/${user._id}`}
                >
                  Edit
                </Link>
                <button
                  className="bg-red-600 px-4 py-1 font-semibold text-white rounded-sm hover:bg-sky-600"
                  onClick={() => handleDelete(user._id)}
                >
                  Delete
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

export default ManageUsers;
