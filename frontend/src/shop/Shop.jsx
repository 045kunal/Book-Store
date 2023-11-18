import React, { useContext, useEffect, useState } from "react";
import { Card, Spinner } from "flowbite-react";
import { Link } from "react-router-dom";
// import { AuthContext } from '../../contexts/AuthProvider';

export default function Shop() {
  // const {loading } = useContext(AuthContext);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/all-books")
      .then((res) => res.json())
      .then((data) => setBooks(data));
  }, []);

  // if (loading) {
  //   return <div className="text-center mt-28">
  //       <Spinner aria-label="Center-aligned spinner example" />
  //   </div>
  // }

  return (
    <div className="my-28 px-4 lg:px-24">
      <h2 className="text-3xl font-bold text-center mb-16 z-40">
        All Books are Available Here
      </h2>
      <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-8">
        {books.map((book) => (
          <Link to={`/book/${book._id}`} className="cursor-pointer">
            <Card>
              <img src={book.imageLink} alt="" className="h-96" />
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                <p className="text-black">{book.title}</p>
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                <p>{book.shortDescription}</p>
              </p>

              <button className="px-4 py-2 bg-blue-600 text-white rounded">
                Buy Now
              </button>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
