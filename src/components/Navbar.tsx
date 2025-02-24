import { Link, useNavigate } from "react-router-dom";
import {
  FaSignInAlt,
  FaUserPlus,
  FaSignOutAlt,
  FaClipboardList,
  FaBuilding,
} from "react-icons/fa";
import { useState, useEffect } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  // Verifica si el token está presente en el localStorage al cargar el componente y cada vez que cambia
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }

    // Se ejecuta cada vez que cambia el localStorage
    const storageListener = () => {
      const token = localStorage.getItem("token");
      if (token) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    };

    window.addEventListener("storage", storageListener);

    // Limpiar el listener cuando el componente se desmonta
    return () => {
      window.removeEventListener("storage", storageListener);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false); // Actualiza el estado de autenticación
    navigate("/login");
  };

  return (
    <nav className="bg-white p-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <img
            src="src/assets/solicitud.png"
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
                    src="src/assets/user.png"
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
            <>
              <Link
                to="/login"
                className="text-black hover:text-gray-500 flex items-center space-x-1 transition duration-300"
              >
                <FaSignInAlt />
                <span>Iniciar sesión</span>
              </Link>
              <Link
                to="/register"
                className="text-black hover:text-gray-500 flex items-center space-x-1 transition duration-300"
              >
                <FaUserPlus />
                <span>Registrarse</span>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
