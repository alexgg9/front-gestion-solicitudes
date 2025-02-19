import { useState } from "react";
import API from "../api/api";
import { Link } from "react-router-dom";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await API.post("/register", { name, email, password });
            setSuccess("Registro exitoso. Ahora puedes iniciar sesión.");
            setError("");
        } catch (err) {
            setError("Error al registrar. Inténtalo de nuevo.");
            setSuccess("");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="flex flex-col w-full md:w-1/2 xl:w-2/5 2xl:w-2/5 3xl:w-1/3 mx-auto p-8 md:p-10 2xl:p-12 3xl:p-14 bg-white rounded-2xl shadow-xl">
                <div className="flex flex-row gap-3 pb-4">
                    <div>
                        <img src="src/assets/solicitud.png" alt="Logo" width="50" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-700 my-auto">Registro Alumnado FPDual</h1>
                </div>
                <div className="text-sm font-light text-gray-500 pb-8">
                    Crea una cuenta para gestionar las solicitudes de alumnado.
                </div>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                {success && <p className="text-green-500 mb-4">{success}</p>}
                <form className="flex flex-col" onSubmit={handleRegister}>
                    <div className="pb-2">
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">
                            Nombre Completo
                        </label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            className="bg-gray-50 text-gray-600 border focus:border-transparent border-gray-300 sm:text-sm rounded-lg focus:ring-1 focus:outline-none focus:ring-gray-400 block w-full p-2.5 py-3 px-4"
                            placeholder="Nombre Completo"
                            autoComplete="off"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="pb-2">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
                            Correo electrónico
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            className="bg-gray-50 text-gray-600 border focus:border-transparent border-gray-300 sm:text-sm rounded-lg focus:ring-1 focus:outline-none focus:ring-gray-400 block w-full p-2.5 py-3 px-4"
                            placeholder="nombre@empresa.com"
                            autoComplete="off"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="pb-6">
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
                            Contraseña
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="••••••••••"
                            className="bg-gray-50 text-gray-600 border focus:border-transparent border-gray-300 sm:text-sm rounded-lg focus:ring-1 focus:outline-none focus:ring-gray-400 block w-full p-2.5 py-3 px-4"
                            autoComplete="new-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full text-white bg-indigo-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-6"
                    >
                        Registrarse
                    </button>
                    <div className="text-sm font-light text-gray-500">
                        ¿Ya tienes una cuenta? {" "}
                        <Link to="/login" className="font-medium text-indigo-600 hover:underline">
                            Iniciar sesión
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
