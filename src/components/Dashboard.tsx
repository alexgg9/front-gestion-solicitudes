
const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
        <h1 className="text-3xl font-semibold text-gray-700">Bienvenido al Dashboard</h1>
        <p className="text-gray-600 mt-4">
          Este es tu panel de control. ¡Felicidades por iniciar sesión correctamente!
        </p>
        <div className="mt-8">
          <p className="text-sm text-gray-500">Aquí podrás gestionar tus solicitudes, empresas y más.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
