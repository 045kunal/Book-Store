import "./App.css";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import { useAuth } from "./contexts/AuthProvider";
import { useEffect, useState } from "react";

function App() {
  const { user, loading } = useAuth();
  const [isLogedIn, setIsLogedIn] = useState(false);

  useEffect(() => {
    if (user) {
      setIsLogedIn(true);
      // check user Role
    } else {
      // user is not loged in
    }
  }, [user]);
  return (
    <>
      {/* if si login is true and role is not customer , then show navabar */}
      {<Navbar />}
      <div className="min-h-screen">
        <Outlet />
      </div>
    </>
  );
}

export default App;
