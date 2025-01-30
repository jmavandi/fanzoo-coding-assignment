import { Link, useLocation, useSearchParams } from "@remix-run/react";

export default function Navbar() {
  const [searchParams, setSearchParams] = useSearchParams();
  const isLoggedIn = searchParams.get("logged_in") === "true";

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-xl font-bold">
          Fanzoo
        </Link>

        <div className="flex items-center space-x-4">
          {isLoggedIn ? (
            <>
              <span className="text-gray-300">Welcome, User</span>
              <button
                onClick={() => setSearchParams({})}
                className="text-gray-300 hover:text-white"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => setSearchParams({ logged_in: "true" })}
              className="text-gray-300 hover:text-white"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
