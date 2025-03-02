import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import {
  getCompanies,
  deleteCompany,
  createCompany,
  updateCompany,
} from "../services/CompaniesService";
import { Company } from "../types/CompanyType";
import CompanyForm from "../components/CompanyForm";

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
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;

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
    if (window.confirm("¿Seguro que deseas eliminar esta empresa?")) {
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

  // Paginación
  const pageCount = Math.ceil(companies.length / itemsPerPage);
  const offset = currentPage * itemsPerPage;
  const currentCompanies = companies.slice(offset, offset + itemsPerPage);

  const handlePageClick = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

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
          <ReactPaginate
            previousLabel={"Anterior"}
            nextLabel={"Siguiente"}
            breakLabel={"..."}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={3}
            onPageChange={handlePageClick}
            containerClassName={"flex justify-center mt-6 space-x-2"}
            pageClassName={"border px-3 py-1 rounded-md cursor-pointer"}
            activeClassName={"bg-blue-500 text-white"}
            previousClassName={"border px-3 py-1 rounded-md cursor-pointer"}
            nextClassName={"border px-3 py-1 rounded-md cursor-pointer"}
            disabledClassName={"opacity-50 cursor-not-allowed"}
          />
        </div>
      </div>
    </div>
  );
};

export default CompanyDashboard;
