import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App";
import Home from "../home/Home";
import Shop from "../shop/Shop";
import About from "../components/About";
import ContactUs from "../components/ContactUs";
import SingleBook from "../components/SingleBook";
// import PrivateLayout from "../dashboard/PrivateLayout";
import Dashboard from "../dashboard/Dashboard";
import UploadBook from "../dashboard/UploadBook";
import ManageBooks from "../dashboard/ManageBooks";
import EditBooks from "../dashboard/EditBooks";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import Login from "../components/Login";
import Logout from "../components/Logout";
import PrivateLayout from "../dashboard/PrivateLayout";
import UploadUser from "../dashboard/UploadUser";
import ManageUsers from "../dashboard/ManageUsers";
import EditUsers from "../dashboard/EditUsers";
import Signup from "../components/Signup";
import Cart from "../components/cart";
import Checkout from "../components/Checkout";
import Orders from "../dashboard/Orders";
import ViewOrders from "../components/ViewOrders";
import Profile from "../components/Profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/shop",
        element: <Shop />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contactus",
        element: <ContactUs />,
      },
      {
        path: "/book/:id",
        element: <SingleBook />,
        loader: ({ params }) =>
          fetch(`http://localhost:3000/book/${params.id}`),
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/checkout/:id",
        element: <Checkout />,
        loader: ({ params }) =>
          fetch(`http://localhost:3000/user/${params.id}`),
      },
      {
        path: "/my-orders",
        element: <ViewOrders />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
    ],
  },
  {
    path: "/admin/dashboard",
    element: <PrivateLayout />,
    children: [
      {
        path: "/admin/dashboard",
        element: <Dashboard></Dashboard>,
      },
      {
        path: "/admin/dashboard/upload",
        element: <UploadBook />,
      },
      {
        path: "/admin/dashboard/manage",
        element: <ManageBooks />,
      },
      {
        path: "/admin/dashboard/edit-books/:id",
        element: <EditBooks />,
        loader: ({ params }) =>
          fetch(`http://localhost:3000/book/${params.id}`),
      },
      {
        path: "/admin/dashboard/orders",
        element: <Orders />,
      },
      {
        path: "/admin/dashboard/uploadUser",
        element: <UploadUser />,
      },
      {
        path: "/admin/dashboard/manageUser",
        element: <ManageUsers />,
      },
      {
        path: "/admin/dashboard/edit-users/:id",
        element: <EditUsers />,
        loader: ({ params }) =>
          fetch(`http://localhost:3000/user/${params.id}`),
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/sign-up",
    element: <Signup />,
  },
  {
    path: "logout",
    element: <Logout />,
  },
]);

export default router;
