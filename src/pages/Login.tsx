import { useState } from "react";
import API from "../api/api";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await API.post("/login", { email, password });
            localStorage.setItem("token", response.data.token);
            navigate("/dashboard");
            window.dispatchEvent(new Event('storage'));
        } catch (err) {
            setError("Credenciales incorrectas");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="flex flex-col w-full md:w-1/2 xl:w-2/5 2xl:w-2/5 3xl:w-1/3 mx-auto p-8 md:p-10 2xl:p-12 3xl:p-14 bg-white rounded-2xl shadow-xl">
                <div className="flex flex-row gap-3 pb-4">
                    <div>
                        <img src="src/assets/solicitud.png" alt="Logo" width="50" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-700 my-auto">Solicitudes Alumnado FPDual</h1>
                </div>
                <div className="text-sm font-light text-gray-500 pb-8">
                    Inicia sesión para gestionar las solicitudes de alumnado.
                </div>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <form className="flex flex-col" onSubmit={handleLogin}>
                    <div className="pb-2">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
                            Correo electrónico
                        </label>
                        <div className="relative text-gray-400">
                            <span className="absolute inset-y-0 left-0 flex items-center p-1 pl-3">
                                {/* Icono de correo electrónico */}
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="lucide lucide-mail"
                                >
                                    <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                                </svg>
                            </span>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                className="pl-12 mb-2 bg-gray-50 text-gray-600 border focus:border-transparent border-gray-300 sm:text-sm rounded-lg ring-3 ring-transparent focus:ring-1 focus:outline-none focus:ring-gray-400 block w-full p-2.5 py-3 px-4"
                                placeholder="nombre@empresa.com"
                                autoComplete="off"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="pb-6">
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
                            Contraseña
                        </label>
                        <div className="relative text-gray-400">
                            <span className="absolute inset-y-0 left-0 flex items-center p-1 pl-3">
                                {/* Icono de contraseña */}
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="lucide lucide-square-asterisk"
                                >
                                    <rect width="18" height="18" x="3" y="3" rx="2"></rect>
                                    <path d="M12 8v8"></path>
                                    <path d="m8.5 14 7-4"></path>
                                    <path d="m8.5 10 7 4"></path>
                                </svg>
                            </span>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                placeholder="••••••••••"
                                className="pl-12 mb-2 bg-gray-50 text-gray-600 border focus:border-transparent border-gray-300 sm:text-sm rounded-lg ring-3 ring-transparent focus:ring-1 focus:outline-none focus:ring-gray-400 block w-full p-2.5 py-3 px-4"
                                autoComplete="new-password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-full text-white bg-indigo-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-6"
                    >
                        Iniciar sesión
                    </button>
                    <div className="text-sm font-light text-gray-500">
                        ¿No tienes una cuenta?{" "}
                        <Link to="/register" className="font-medium text-indigo-600 hover:underline">
                            Regístrate
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
