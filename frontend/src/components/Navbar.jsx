import { useEffect, useState } from "react";

// import icons from react icons
import { FaXmark, FaBars, FaBarsStaggered, FaBlog } from "react-icons/fa6";
import { Link } from "react-router-dom";
import Signup from "./Signup";
import Login from "./Login";
import { useAuth } from "../contexts/AuthProvider";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleClickOutsideMenu = (event) => {
      const menu = document.getElementsByClassName("group");

      if (menu && !menu.contains(event.target)) {
        toggleMenu();
      }
    };

    if (isMenuOpen) {
      document.body.addEventListener("click", handleClickOutsideMenu);
    }

    return () => {
      document.body.removeEventListener("click", handleClickOutsideMenu);
    };
  });

  const navItems = [
    { link: "Home", path: "/" },
    { link: "About", path: "/about" },
    { link: "Shop", path: "/shop" },
    { link: "Contact Us", path: "/contactus" },
  ];

  const { user, isLoggedIn, cookies } = useAuth();
  return (
    <header className="w-full bg-transparent fixed top-0 left-0 right-0 transition-all ease-in duration-300">
      <nav
        className={`py-4 lg:px-24 px-4 ${
          isSticky ? "sticky top-0 left-0 right-0 bg-blue-300" : ""
        }`}
      >
        <div className="flex justify-between items-center text-base gap-8">
          <div>
            <Link
              to="/"
              className="text-2xl font-bold text-blue-700 flex items-center gap-2"
            >
              <FaBlog className="inline-block" /> NovelNest
            </Link>
          </div>
          <ul className="md:flex space-x-12 hidden items-center">
            {navItems.map(({ link, path }) => (
              <Link
                key={link}
                to={path}
                className="link block text-base cursor-pointer uppercase text-black hover:text-blue-700"
              >
                {link}
              </Link>
            ))}
            {!isLoggedIn && (
              <>
                <Link
                  to="/sign-up"
                  className="bg-amber-200 p-2 pt-0.5 hover:bg-amber-100 me-3"
                >
                  <span>Create Account</span>
                </Link>
                <Link
                  to="/login"
                  className="bg-stone-200 p-2 pt-0.5 hover:bg-stone-100 me-0"
                >
                  <span>Login</span>
                </Link>
              </>
            )}
            {isLoggedIn && (
              <div className="group">
                <div className="align-middle">
                  <button
                    onClick={toggleMenu}
                    className="bg-white text-black p-2 rounded-full focus:outline-none"
                  >
                    <img
                      src="/src/assets/user.png"
                      className="h-5 w-5 inline-block"
                    />
                    <img
                      src="/src/assets/down-arrow.png"
                      className={`h-5 w-5 inline-block ${
                        isMenuOpen ? "transform rotate-180" : ""
                      }`}
                    />
                  </button>
                  <p>{user.username}</p>
                </div>
                <div
                  className={`${
                    isMenuOpen ? "block" : "hidden"
                  } absolute top-15 right-16 space-y-2 bg-blue-600 p-2 rounded-md`}
                >
                  <Link
                    to="/profile"
                    className="block text-white hover:text-gray-500"
                    onClick={toggleMenu}
                  >
                    Profile
                  </Link>
                  <Link
                    to="/cart"
                    className="block text-white hover:text-gray-500"
                    onClick={toggleMenu}
                  >
                    View Cart
                  </Link>
                  <Link
                    to="/my-orders"
                    className="block text-white hover:text-gray-500"
                    onClick={toggleMenu}
                  >
                    View Orders
                  </Link>
                  <Link
                    to="/logout"
                    className="block text-white hover:text-gray-500"
                    onClick={toggleMenu}
                  >
                    Logout
                  </Link>
                </div>
              </div>
            )}
          </ul>
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-black focus:outline-none"
            >
              {isMenuOpen ? (
                <FaXmark className="h-6 w-6 text-black" />
              ) : (
                <FaBarsStaggered className="h-5 w-5 text-black" />
              )}
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
