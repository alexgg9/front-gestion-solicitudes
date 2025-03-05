import { Link, useNavigate } from "react-router-dom";
import {FaSignOutAlt, FaClipboardList, FaBuilding} from "react-icons/fa";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }

    
    const storageListener = () => {
      const token = localStorage.getItem("token");
      if (token) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    };

    window.addEventListener("storage", storageListener);

    
    return () => {
      window.removeEventListener("storage", storageListener);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("professorId");
    setIsLoggedIn(false); 
    navigate("/login");
  };

  const handleClick = () => {
    navigate("/searchNif");
  };  

  return (
    <nav className="bg-white p-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <img
            src="solicitud.png"
            alt="Logo"
            className="w-10 h-10"
          />
          <h1 className="text-black text-2xl font-semibold">
            Gestión de Solicitudes
          </h1>
        </div>
        <div className="flex items-center space-x-6">
          {isLoggedIn ? (
            <>
              <Link
                to="/applications"
                className="text-black hover:text-gray-300 flex items-center space-x-1 transition duration-300"
              >
                <FaClipboardList />
                <span>Solicitudes</span>
              </Link>
              <Link
                to="/companies"
                className="text-black hover:text-gray-300 flex items-center space-x-1 transition duration-300"
              >
                <FaBuilding />
                <span>Empresas</span>
              </Link>
              <div className="relative">
                <button
                  className="flex items-center text-white hover:text-indigo-300 transition duration-300"
                  onClick={() => navigate("/profile")}
                >
                  <img
                    src="user.png"
                    alt="Perfil"
                    className="w-10 h-10 rounded-full border-2 border-black"
                  />
                </button>
              </div>
              <button
                onClick={handleLogout}
                className="text-black  flex items-center space-x-1 hover:text-red-600 transition-color transition duration-300"
              >
                <FaSignOutAlt />
                <span>Log Out</span>
              </button>
            </>
          ) : (
            location.pathname !== "/searchNif" && (
              <button
                onClick={handleClick}
                className="px-5 py-2.5 relative rounded group text-white inline-block"
              >
                <span className="absolute top-0 left-0 w-full h-full rounded opacity-50 filter blur-sm bg-gradient-to-br from-purple-600 to-blue-500"></span>
                <span className="h-full w-full inset-0 absolute mt-0.5 ml-0.5 bg-gradient-to-br filter group-active:opacity-0 rounded opacity-50 from-purple-600 to-blue-500"></span>
                <span className="absolute inset-0 w-full h-full transition-all duration-200 ease-out rounded shadow-xl bg-gradient-to-br filter group-active:opacity-0 group-hover:blur-sm from-purple-600 to-blue-500"></span>
                <span className="absolute inset-0 w-full h-full transition duration-200 ease-out rounded bg-gradient-to-br to-purple-600 from-blue-500"></span>
                <span className="relative">Solicita Alumnado</span>
              </button>
            )
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
