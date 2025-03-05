const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r bg-white flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-2xl w-full border border-gray-100">
        {/* Logo del instituto */}
        <div className="flex justify-center mb-8">
          <img 
            src="src/assets/logo.png"
            alt="Logo IES Francisco de los Ríos"
            className="h-28 transition-transform duration-300 hover:scale-105"
          />
        </div>

        {/* Título principal */}
        <h1 className="text-4xl font-bold text-gray-800 text-center mb-6">
          Plataforma de Gestión de FP Dual
        </h1>

        {/* Descripción de la plataforma */}
        <div className="mt-6 text-gray-600 space-y-4">
          <p className="leading-relaxed">
            La <strong className="text-blue-600">Plataforma de Gestión de FP Dual</strong> es una herramienta desarrollada para el Departamento de Informática del <strong className="text-blue-600">IES Francisco de los Ríos</strong>, diseñada con el objetivo de simplificar y optimizar el proceso de gestión de solicitudes de alumnos en el programa de Formación Profesional Dual.
          </p>
          <p className="leading-relaxed">
            Esta plataforma permite a las empresas colaboradoras y al instituto coordinar de manera eficiente las solicitudes de los alumnos, facilitando la comunicación, el seguimiento y la asignación de plazas en los programas de FP Dual.
          </p>
          <p className="leading-relaxed">
            Con un enfoque en la agilidad y la transparencia, nuestra plataforma busca mejorar la experiencia tanto para los estudiantes como para las empresas, promoviendo una colaboración más efectiva y un proceso de gestión más ágil.
          </p>
        </div>

        {/* Información adicional */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500 italic">
            Desde aquí podrás gestionar solicitudes, empresas y toda la información relacionada con el programa de FP Dual.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;