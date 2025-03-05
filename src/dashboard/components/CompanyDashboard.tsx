import { useEffect, useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import {
  getCompanies,
  deleteCompany,
  createCompany,
  updateCompany,
} from "../../services/CompaniesService";
import { Company } from "../../types/CompanyType";
import CompanyForm from "../../forms/CompanyForm";
import AlertService from "../../services/AlertService";

const initialFormData: Company = {
  id: 0,
  name: "",
  phone1: 0,
  phone2: 0,
  email: "",
  nif: "",
  address: "",
  town: "",
  province: "",
  postal_code: "",
  manager_name: "",
  manager_dni: "",
  modality: "",
};

const CompanyDashboard = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [formData, setFormData] = useState<Company>(initialFormData);
  const [editing, setEditing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      const data = await getCompanies();
      setCompanies(Array.isArray(data?.data) ? data.data : []);
    } catch (error) {
      console.error("Error al obtener empresas:", error);
    }
  };

  const handleDelete = async (id: number) => {
    const confirmed = await AlertService.confirmDelete(); 

    if (confirmed) {
      try {
        await deleteCompany(id);
        setCompanies(companies.filter((company) => company.id !== id));
      } catch (error) {
        console.error("Error al eliminar la empresa:", error);
      }
    }
  };

  const handleEdit = (company: Company) => {
    setEditing(true);
    setFormData(company);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.nif) {
      alert("Por favor, completa todos los campos obligatorios.");
      return;
    }

    const formattedData = {
      ...formData,
      phone1: String(formData.phone1),
      phone2: formData.phone2 ? String(formData.phone2) : "",
    };

    try {
      editing
        ? await updateCompany(formData.id, formattedData)
        : await createCompany(formattedData);

      setEditing(false);
      setFormData(initialFormData);
      fetchCompanies();
    } catch (error) {
      console.error("Error al guardar la empresa:", error);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCompanies = companies.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(companies.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="max-w-screen-xl mx-auto p-8 bg-white rounded-lg shadow-lg mt-6">
      <h2 className="text-3xl font-bold mb-6">Gestión de Empresas</h2>
      <div className="grid grid-cols-2 gap-8 items-start">
        <div className="bg-gray-100 p-6 rounded-lg">
          <CompanyForm
            formData={formData}
            setFormData={setFormData}
            handleSubmit={handleSubmit}
            companies={companies}
            editing={editing}
          />
        </div>
        <div className="w-full bg-gray-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Empresas Registradas</h3>
          <div className="w-full overflow-x-auto md:overflow-x-visible">
            <table className="w-full bg-white border-collapse shadow-md rounded-lg">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Nombre</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Teléfono</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Correo</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {currentCompanies.map((company) => (
                  <tr key={company.id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm">{company.name}</td>
                    <td className="px-4 py-3 text-sm">{company.phone1}</td>
                    <td className="px-4 py-3 text-sm">{company.email}</td>
                    <td className="px-4 py-3 flex space-x-2">
                      <button
                        onClick={() => handleEdit(company)}
                        className="text-blue-500 hover:text-blue-700 p-2 rounded-full transition-all"
                        title="Editar"
                      >
                        <FiEdit size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(company.id)}
                        className="text-red-500 hover:text-red-700 p-2 rounded-full transition-all"
                        title="Eliminar"
                      >
                        <FiTrash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

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
                className={`px-4 py-2 text-sm font-medium rounded ${
                  currentPage === number ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
                } hover:bg-blue-600`}
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

export default CompanyDashboard;