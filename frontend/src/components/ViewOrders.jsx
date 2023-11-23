// import React, { useEffect, useState } from "react";
// import { useAuth } from "../contexts/AuthProvider";
// import { Link } from "react-router-dom";

// const Cart = () => {
//   const [orders, setOrders] = useState([]);

//   const getUserId = () => {
//     const userId = user?.userid;
//     return userId;
//   };

//   const getCartKey = () => {
//     const userId = getUserId();
//     return `cart_${userId}`;
//   };

//   const getCart = () => {
//     const cartKey = getCartKey();
//     const cartWithCartKey = JSON.parse(localStorage.getItem(cartKey)) || [];
//     setCart(cartWithCartKey);
//     return cartWithCartKey;
//   };

//   };

//   useEffect(() => {
//     const initialCart = getCart() ? getCart() : cart;
//     setCart(initialCart);
//   }, []);

//   return (
//     <div className="container mx-auto mt-32 lg:px-2 p-4">
//       <h1 className="text-2xl font-bold mb-4 justify-center flex">Your Cart</h1>
//       {cart.length === 0 ? (
//         <div>
//         <h2>You don't have made any orders. You can make one now.</h2>
//         <Link to="/shop">
//         <button className="bg-green-500 text-white rounded px-4 py-2">
//                 Go to Shop
//               </button>
//               </Link>
//               </div>
//       ) : (
//         <div>
//           {cart.map((item) => (
//             <div key={item.id} className="flex border-b border-gray-200 p-4">
//               <img
//                 src={item.imageLink}
//                 alt={item.title}
//                 className="w-24 h-36 object-cover mr-4"
//               />
//               <div className="flex-1">
//                 <h2 className="text-lg font-semibold">{item.title}</h2>
//                 <p>Author: {item.authors}</p>
//                 <p>Price: {item.price}$</p>
//                 <div className="flex items-center space-x-4 mt-2">
//                   <button onClick={() => handleDecreaseQuantity(item._id)}>
//                     -
//                   </button>
//                   <span>{item.quantity}</span>
//                   <button onClick={() => handleIncreaseQuantity(item._id)}>
//                     +
//                   </button>
//                 </div>
//               </div>
//               <div>
//                 <p className="font-semibold">${item.price * item.quantity}</p>
//                 <button onClick={() => handleRemoveItem(item._id)}>
//                   Remove
//                 </button>
//               </div>
//             </div>
//           ))}
//           <div className="mt-4">
//             <p className="font-semibold">Total: ${totalAmount.toFixed(2)}</p>
//             <Link to={`/checkout/${user.userid}`}>
//               <button
//                 onClick={() => goToPayment()}
//                 className="bg-green-500 text-white rounded px-4 py-2"
//               >
//                 Proceed to Buy
//               </button>
//             </Link>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Cart;
