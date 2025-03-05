import { Company } from "../types/CompanyType";
import { Toaster, toast } from "react-hot-toast";

interface Props {
  formData: Company;
  setFormData: (data: Company) => void;
  handleSubmit: (e: React.FormEvent) => void;
  companies: Company[];
  editing: boolean;
}

const CompanyForm = ({
  formData,
  setFormData,
  handleSubmit,
  companies,
  editing,
}: Props) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === "id") {
      const companyId = Number(value);
      const selectedCompany = companies.find(
        (company) => company.id === companyId
      );
      if (selectedCompany) {
        setFormData(selectedCompany);
      }
    } else {
      setFormData({
        ...formData,
        [name]: String(value),
      });
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      handleSubmit(e);
      toast.success(editing ? "Empresa actualizada con éxito" : "Empresa creada con éxito");
    } catch (error) {
      toast.error("Error al procesar la empresa");
    }
  };

  return (
    <>
      <Toaster />
      <form onSubmit={handleFormSubmit} className="mb-6">
        <h3 className="text-xl font-semibold">
          {editing ? "Editar Empresa" : "Nueva Empresa"}
        </h3>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-sm font-medium">Nombre de Empresa</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="border p-2 rounded w-full"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">NIF</label>
            <input
              type="text"
              name="nif"
              value={formData.nif}
              onChange={handleChange}
              className="border p-2 rounded w-full"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Dirección</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="border p-2 rounded w-full"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Localidad</label>
            <input
              type="text"
              name="town"
              value={formData.town}
              onChange={handleChange}
              className="border p-2 rounded w-full"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Provincia</label>
            <input
              type="text"
              name="province"
              value={formData.province}
              onChange={handleChange}
              className="border p-2 rounded w-full"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Código Postal</label>
            <input
              type="number"
              name="postal_code"
              value={formData.postal_code}
              onChange={handleChange}
              className="border p-2 rounded w-full"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Teléfono 1</label>
            <input
              type="number"
              name="phone1"
              value={formData.phone1}
              onChange={handleChange}
              className="border p-2 rounded w-full"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Teléfono 2</label>
            <input
              type="number"
              name="phone2"
              value={formData.phone2}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Correo Electrónico</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="border p-2 rounded w-full"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Nombre del Responsable</label>
            <input
              type="text"
              name="manager_name"
              value={formData.manager_name}
              onChange={handleChange}
              className="border p-2 rounded w-full"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">DNI del Responsable</label>
            <input
              type="text"
              name="manager_dni"
              value={formData.manager_dni}
              onChange={handleChange}
              className="border p-2 rounded w-full"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Modalidad</label>
            <select
              name="modality"
              value={formData.modality}
              onChange={handleChange}
              className="border p-2 rounded w-full"
              required
            >
              <option value="">Selecciona modalidad</option>
              <option value="Presencial">Presencial</option>
              <option value="Remoto">Remoto</option>
              <option value="Híbrido">Híbrido</option>
            </select>
          </div>
        </div>
        <button type="submit" className="mt-4 bg-blue-600 text-white p-2 rounded">
          {editing ? "Actualizar Empresa" : "Crear Empresa"}
        </button>
      </form>
    </>
  );
};

export default CompanyForm;
