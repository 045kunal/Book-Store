import React, { useEffect, useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { Link } from "react-router-dom";
import { FaCartShopping } from "react-icons/fa6";

// import './styles.css';

// import required modules
import { Autoplay } from "swiper/modules";

const BookCards = ({ headline, books }) => {
  return (
    <div className="my16 px-4 lg:px-24">
      <h1 className="text-5xl text-center font-bold text-black my-5">
        {headline}
      </h1>

      <div>
        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          loop={"true"}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: 50,
            },
          }}
          modules={[Autoplay]}
          className=" w-full h-full"
        >
          {books.map((book) => (
            <SwiperSlide
              className="text-center flex items-center justify-center"
              key={book._id}
            >
              <Link to={`/book/${book._id}`} className="cursor-pointer">
                <div className="bg-gray-100 p-8 rounded-lg relative">
                  <img src={book.imageLink} alt="" className="w-full" />
                  {/* <div className="absolute top-3 right-3 bg-blue-700 hover:bg-black p-2 rounded ">
                    <FaCartShopping className="w-4 h-4 text-white" />
                  </div> */}
                </div>

                <div className="mt-5 mb-8 text-left space-y-2 flex justify-between items-start">
                  <div>
                    <h3 className="text-black font-semibold">{book.title}</h3>
                    <p>{book.author}</p>
                  </div>
                  <div>
                    <p className="font-bold text-blue-700">${book.price}</p>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default BookCards;
