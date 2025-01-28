import { Link, useLocation } from "@remix-run/react";
import { useEffect, useState } from "react";

interface User {
  id: string;
  name: string;
  email: string;
}

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const location = useLocation();

  useEffect(() => {
    const userLoggedIn = localStorage.getItem("userLoggedIn");
    if (userLoggedIn) {
      setIsLoggedIn(true);
      setUser(JSON.parse(userLoggedIn));
    }
  }, []);

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-xl font-bold">
          Fanzoo
        </Link>

        <div className="flex items-center space-x-4">
          {isLoggedIn ? (
            <>
              <Link
                to={`/fanprofile/${user?.id}`}
                className="text-gray-300 hover:text-white"
              >
                Profile
              </Link>
              <span className="text-gray-300">Welcome, {user?.name}</span>
            </>
          ) : (
            <Link
              to={`/login?redirectTo=${location.pathname}`}
              className="text-gray-300 hover:text-white"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
