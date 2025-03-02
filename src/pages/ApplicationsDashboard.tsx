import { useEffect, useState } from "react";
import { getApplications, deleteApplication, createApplication, updateApplication } from "../services/ApplicationService";
import { getCompanies } from "../services/CompaniesService";
import { Application, Company } from "../types/ApplicationType";
import ApplicationForm from "../components/ApplicationForm";
import { FiEdit, FiTrash2 } from "react-icons/fi"; // Importando los iconos

const initialFormData: Application = {
  id: 0,
  company_name: "",
  nif: "",
  observations: "",
  company_activity: "",
  smr_1: 0,
  smr_2: 0,
  dam_1: 0,
  dam_2: 0,
  daw_1: 0,
  daw_2: 0,
  modality: "",
  company_id: 0,
};

const ApplicationDashboard = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [, setCompanies] = useState<Company[]>([]);
  const [formData, setFormData] = useState<Application>(initialFormData);
  const [editing, setEditing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1); 
  const [applicationsPerPage] = useState(5); 

  useEffect(() => {
    fetchApplications();
    fetchCompanies();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await getApplications();
      setApplications(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Error al obtener aplicaciones:", error);
      setApplications([]);
    }
  };

  const fetchCompanies = async () => {
    try {
      const data = await getCompanies();
      setCompanies(Array.isArray(data?.data) ? data.data : []);
    } catch (error) {
      console.error("Error al obtener empresas:", error);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("¿Seguro que deseas eliminar esta aplicación?")) {
      try {
        await deleteApplication(id);
        setApplications(applications.filter((app) => app.id !== id));
      } catch (error) {
        console.error("Error al eliminar la aplicación:", error);
      }
    }
  };

  const handleEdit = (app: Application) => {
    setEditing(true);
    setFormData(app);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.company_id || !formData.modality) {
      alert("Por favor, completa todos los campos obligatorios.");
      return;
    }

    try {
      editing ? await updateApplication(formData.id, formData) : await createApplication(formData);
      setEditing(false);
      setFormData(initialFormData);
      fetchApplications();
    } catch (error) {
      console.error("Error al crear la aplicación:", error);
    }
  };

  // Determina las solicitudes que deben mostrarse según la página actual
  const indexOfLastApplication = currentPage * applicationsPerPage;
  const indexOfFirstApplication = indexOfLastApplication - applicationsPerPage;
  const currentApplications = applications.slice(indexOfFirstApplication, indexOfLastApplication);

  // Cambia de página
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Calcular el número total de páginas
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(applications.length / applicationsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-md mt-6">
      <h2 className="text-3xl font-bold mb-4">Gestión de Solicitudes</h2>

      {/* Contenedor de dos columnas: Formulario y Tabla */}
      <div className="grid grid-cols-2 gap-6 items-start">
        
        {/* Formulario a la izquierda */}
        <div className="bg-gray-100 p-4 rounded-lg">
          <ApplicationForm 
            formData={formData} 
            setFormData={setFormData} 
            handleSubmit={handleSubmit} 
            editing={editing} 
          />
        </div>
  
        {/* Tabla de solicitudes a la derecha */}
        <div className="overflow-x-auto bg-gray-50 p-4 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Solicitudes Registradas</h3>
          <table className="min-w-full table-auto bg-white border-collapse shadow-md rounded-lg">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Empresa</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Actividad</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Nº Alumnos</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {currentApplications.map((app) => (
                <tr key={app.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4">{app.company_name}</td>
                  <td className="px-6 py-4">{app.company_activity}</td>
                  <td className="px-6 py-4">{app.smr_1 + app.smr_2 + app.dam_1 + app.dam_2 + app.daw_1 + app.daw_2}</td>
                  <td className="px-6 py-4 flex space-x-3">
                    {/* Botón Editar con icono */}
                    <button 
                      onClick={() => handleEdit(app)} 
                      className="text-blue-500 hover:text-blue-700 p-2 rounded-full transition-all" 
                      title="Editar"
                    >
                      <FiEdit size={20} />
                    </button>
                    {/* Botón Eliminar con icono */}
                    <button 
                      onClick={() => handleDelete(app.id)} 
                      className="text-red-500 hover:text-red-700 p-2 rounded-full transition-all" 
                      title="Eliminar"
                    >
                      <FiTrash2 size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Paginación */}
          <div className="mt-4 flex justify-center space-x-4">
            <button 
              onClick={() => setCurrentPage(currentPage - 1)} 
              disabled={currentPage === 1}
              className="px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded disabled:bg-gray-300"
            >
              Anterior
            </button>
            {pageNumbers.map((number) => (
              <button
                key={number}
                onClick={() => paginate(number)}
                className={`px-4 py-2 text-sm font-medium rounded ${currentPage === number ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} hover:bg-blue-600`}
              >
                {number}
              </button>
            ))}
            <button 
              onClick={() => setCurrentPage(currentPage + 1)} 
              disabled={currentPage === pageNumbers.length}
              className="px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded disabled:bg-gray-300"
            >
              Siguiente
            </button>
          </div>
        </div>
  
      </div>
    </div>
  );
};

export default ApplicationDashboard;
