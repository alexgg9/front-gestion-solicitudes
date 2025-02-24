import { useEffect, useState } from "react";
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

    // Validación de campos obligatorios
    if (!formData.name || !formData.nif) {
      alert("Por favor, completa todos los campos obligatorios.");
      return;
    }

    // Crear un nuevo objeto con phone1 y phone2 como string
    const formattedData = {
      ...formData,
      phone1: String(formData.phone1),
      phone2: formData.phone2 ? String(formData.phone2) : "", // Evita valores undefined
    };

    try {
      editing
        ? await updateCompany(formData.id, formattedData)
        : await createCompany(formattedData);

      // Resetear estado después de guardar
      setEditing(false);
      setFormData(initialFormData);
      fetchCompanies(); // Recargar la lista de empresas
    } catch (error) {
      console.error("Error al guardar la empresa:", error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-md mt-6">
      <h2 className="text-3xl font-bold mb-4">Gestión de Empresas</h2>
      <div className="grid grid-cols-2 gap-6 items-start">
        <div className="bg-gray-100 p-4 rounded-lg">
          <CompanyForm
            formData={formData}
            setFormData={setFormData}
            handleSubmit={handleSubmit}
            companies={companies}
            editing={editing}
          />
        </div>
        <div className="overflow-x-auto bg-gray-50 p-4 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Empresas Registradas</h3>
          <table className="min-w-full table-auto bg-white border-collapse shadow-md rounded-lg">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                  Nombre
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                  Teléfono
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                  Correo
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {companies.map((company) => (
                <tr key={company.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4">{company.name}</td>
                  <td className="px-6 py-4">{company.phone1}</td>
                  <td className="px-6 py-4">{company.email}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleEdit(company)}
                      className="text-blue-500 hover:text-blue-700 mr-2"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(company.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CompanyDashboard;
