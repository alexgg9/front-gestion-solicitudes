
const LandingPage = () => {
    return (
        <section className="bg-white bg-opacity-30 py-10 sm:py-14 lg:py-20">
            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="grid items-center grid-cols-1 gap-10 lg:grid-cols-2">
                {/* Contenido de la izquierda */}
                <div>
                    <p className="text-base font-semibold tracking-wider text-blue-600 uppercase">
                    Conecta con futuros profesionales
                    </p>
                    <h1 className="mt-4 text-4xl font-bold text-black lg:mt-8 sm:text-5xl xl:text-6xl">
                    Encuentra alumnos en prácticas para tu empresa
                    </h1>
                    <p className="mt-4 text-base text-black lg:mt-8 sm:text-lg">
                    Colabora con el <strong>Instituto Francisco de los Ríos</strong> y acoge estudiantes en formación en áreas clave de informática: <strong>Grado Medio en SMR</strong> y <strong>Grados Superiores en DAM y DAW</strong>. Impulsa el talento joven en tu empresa.
                    </p>

                    <a
                    href="/register"
                    className="inline-flex items-center px-6 py-4 mt-8 font-semibold text-black transition-all duration-200 bg-yellow-300 rounded-full lg:mt-12 hover:bg-yellow-400 focus:bg-yellow-400"
                    >
                    Registrate
                    <svg
                        className="w-6 h-6 ml-8 -mr-2"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                    </a>

                    <p className="mt-5 text-gray-600">
                    ¿Ya tienes una cuenta?{" "}
                    <a href="/login" className="text-black transition-all duration-200 hover:underline">
                        Inicia sesión
                    </a>
                    </p>
                </div>

                {/* Imagen de la derecha */}
                <div>
                    <iframe 
                        className="w-full h-[500px] sm:h-[600px]" 
                        src="https://lottie.host/embed/cf227a6b-6bb6-4720-b16d-af37ed6ca2ce/Kzge6kLz9d.lottie"
                        style={{border: "none"}}>
                    </iframe>
                </div>
                </div>
            </div>
        </section>

    );
  };
  
  export default LandingPage;
  