import React from "react";
import { useLoaderData } from "react-router-dom";

const SingleBook = () => {
  const {
    title,
    authors,
    genres,
    price,
    inventory,
    shortDescription,
    longDescription,
    imageLink,
  } = useLoaderData();

  return (
    <div className="mt-32 px-4 lg:px-24">
      <div className="flex">
        {/* Left side for image */}
        <div className="w-1/2 pr-8 h-1/4">
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
            {genres}
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
        </div>
      </div>
    </div>
  );
};

export default SingleBook;
