import React, { useState } from "react";
import { getCompanyByNif } from "../services/CompaniesService";
import toast from "react-hot-toast";
import { Application, Company } from "../types/ApplicationType";
import { createApplication } from "../services/ApplicationService";

const initialFormData: Application = {
  id: 0,
  company_id: 0,
  nif: "",
  company_name: "",
  company_activity: "",
  modality: "",
  observations: "",
  smr_1: 0,
  smr_2: 0,
  dam_1: 0,
  dam_2: 0,
  daw_1: 0,
  daw_2: 0,
};

const SearchNif: React.FC = () => {
  const [nif, setNif] = useState<string>("");
  const [company, setCompany] = useState<Company | null>(null);
  const [formData, setFormData] = useState<Application>(initialFormData);

  // Maneja los cambios en los campos del formulario
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validar campos obligatorios
    if (!formData.company_id || !formData.nif || !formData.company_name || !formData.company_activity || !formData.modality) {
      toast.error("Por favor, complete todos los campos obligatorios.");
      return;
    }

    const formattedData = {
      ...formData,
      smr_1: Number(formData.smr_1),
      smr_2: Number(formData.smr_2),
      dam_1: Number(formData.dam_1),
      dam_2: Number(formData.dam_2),
      daw_1: Number(formData.daw_1),
      daw_2: Number(formData.daw_2),
    };

    console.log("Datos enviados:", formattedData);

    try {
      const response = await createApplication(formattedData);

      if (response.success === true) {
        toast.success("¡Solicitud creada con éxito!");
        setFormData(initialFormData);
        setCompany(null);
        setNif("");
      } else {
        toast.error("No se pudo crear la solicitud. Intente de nuevo.");
      }
    } catch (err) {
      if (err instanceof Error) {
        console.error("Error:", (err as any).response?.data);
        toast.error("Error al crear la solicitud: " + (err as any).response?.data?.message);
      } else {
        console.error("Error:", err);
        toast.error("Error desconocido al crear la solicitud.");
      }
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const companyData = await getCompanyByNif(nif);

      if (companyData && companyData.data) {
        const company = companyData.data;

        console.log(company);
        setCompany(company);

        setFormData({
          ...formData,
          company_id: company.id,
          nif: company.nif,
          company_name: company.name,
          company_activity: company.activity || "",
        });

        // Mostrar notificación de éxito
        toast.success("Empresa encontrada con éxito.");
      } else {
        toast.error("No se encontró ninguna empresa con ese NIF.");
      }
    } catch (err) {
      toast.error("Error al buscar la empresa. Por favor, intente de nuevo.");
    }
  };

  const handleGoHome = () => {
    window.location.href = "/";
  };

  return (
    <div className="flex justify-center items-start h-screen bg-white px-4 sm:px-6 lg:px-8">
      {/* Columna de búsqueda */}
      <div className="w-full max-w-md space-y-4">
        <h2 className="text-xl font-semibold text-center text-gray-800 mb-4">Buscar NIF de la Empresa</h2>
        <form onSubmit={handleSearch} className="space-y-3 mb-4">
          <div>
            <input
              type="text"
              id="nif"
              value={nif}
              onChange={(e) => setNif(e.target.value)}
              className="w-full mt-1 p-3 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              placeholder="Introduce el NIF"
              required
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full py-2 bg-blue-600 text-white text-sm font-semibold rounded-md hover:bg-blue-700 transition-all duration-200 disabled:opacity-50"
            >
              Buscar
            </button>
          </div>
        </form>

        <button
          onClick={handleGoHome}
          className="w-full py-2 bg-gray-600 text-white text-sm font-semibold rounded-md hover:bg-gray-700 transition-all duration-200"
        >
          Volver al Inicio
        </button>
      </div>

      {/* Columna de formulario (solo se muestra si hay empresa encontrada) */}
      {company && (
        <div className="w-full max-w-lg bg-white p-4 sm:p-6 rounded-lg shadow-lg ml-8 space-y-4">
          <p className="text-green-500 mb-3 text-sm">Empresa encontrada: {company.name}</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <h3 className="text-lg font-semibold">Nueva Solicitud</h3>
            <div className="grid grid-cols-2 gap-3 mt-3">
              {/* Nombre de la empresa (prellenado después de la búsqueda) */}
              <div>
                <label className="block text-xs font-medium">Nombre de Empresa</label>
                <input
                  type="text"
                  name="company_name"
                  value={formData.company_name}
                  onChange={handleChange}
                  className="border p-2 rounded w-full text-sm"
                  required
                  disabled
                />
              </div>

              {/* NIF (prellenado después de la búsqueda) */}
              <div>
                <label className="block text-xs font-medium">NIF</label>
                <input
                  type="text"
                  name="nif"
                  value={formData.nif}
                  className="border p-2 rounded w-full text-sm"
                  required
                  disabled
                />
              </div>

              {/* Actividad */}
              <div>
                <label className="block text-xs font-medium">Actividad</label>
                <input
                  type="text"
                  name="company_activity"
                  value={formData.company_activity}
                  onChange={handleChange}
                  className="border p-2 rounded w-full text-sm"
                  required
                />
              </div>

              {/* Modalidad */}
              <div>
                <label className="block text-xs font-medium">Modalidad</label>
                <select
                  name="modality"
                  value={formData.modality}
                  onChange={handleChange}
                  className="border p-2 rounded w-full text-sm"
                  required
                >
                  <option value="">Selecciona modalidad</option>
                  <option value="presencial">presencial</option>
                  <option value="remoto">remoto</option>
                  <option value="híbrido">híbrido</option>
                </select>
              </div>

              {/* Alumnos */}
              {["smr_1", "smr_2", "dam_1", "dam_2", "daw_1", "daw_2"].map((field) => (
                <div key={field}>
                  <label className="block text-xs font-medium">{`Alumnos ${field.toUpperCase()}`}</label>
                  <input
                    type="number"
                    name={field}
                    value={(formData as any)[field]}
                    onChange={handleChange}
                    className="border p-2 rounded w-full text-sm"
                    min="0"
                  />
                </div>
              ))}

              {/* Observaciones */}
              <div>
                <label className="block text-xs font-medium">Observaciones</label>
                <input
                  type="text"
                  name="observations"
                  value={formData.observations}
                  onChange={handleChange}
                  className="border p-2 rounded w-full text-sm"
                />
              </div>
            </div>

            {/* Botón de acción */}
            <button
              type="submit"
              className="w-full py-2 mt-4 bg-blue-600 text-white text-sm font-semibold rounded-md hover:bg-blue-700 transition-all duration-200"
            >
              Crear Solicitud
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default SearchNif;