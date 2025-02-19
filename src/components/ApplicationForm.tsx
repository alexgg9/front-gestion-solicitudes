import { Application, Company } from "../types/ApplicationType";

interface Props {
  formData: Application;
  setFormData: (data: Application) => void;
  handleSubmit: (e: React.FormEvent) => void;
  companies: Company[];
  editing: boolean;
}

const ApplicationForm = ({ formData, setFormData, handleSubmit, companies, editing }: Props) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === "company_id") {
      const companyId = Number(value);
      const selectedCompany = companies.find(company => company.id === companyId);
      setFormData({
        ...formData,
        company_id: companyId,
        company_name: selectedCompany ? selectedCompany.name : "",
        nif: selectedCompany ? selectedCompany.nif : "",
      });
    } else {
      setFormData({
        ...formData,
        [name]: name.includes("smr") || name.includes("dam") || name.includes("daw") ? Number(value) : value,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <h3 className="text-xl font-semibold">{editing ? "Editar Solicitud" : "Nueva Solicitud"}</h3>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div>
          <label className="block text-sm font-medium">Nombre de Empresa</label>
          <select name="company_id" value={formData.company_id} onChange={handleChange} className="border p-2 rounded w-full" required>
            <option value="">Selecciona una empresa</option>
            {companies.map((company) => (
              <option key={company.id} value={company.id}>
                {company.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">NIF</label>
          <input type="text" name="nif" value={formData.nif} className="border p-2 rounded w-full" required disabled />
        </div>
        <div>
          <label className="block text-sm font-medium">Actividad</label>
          <input type="text" name="company_activity" value={formData.company_activity} onChange={handleChange} className="border p-2 rounded w-full" required />
        </div>
        <div>
          <label className="block text-sm font-medium">Modalidad</label>
          <select name="modality" value={formData.modality} onChange={handleChange} className="border p-2 rounded w-full" required>
            <option value="">Selecciona modalidad</option>
            <option value="presencial">Presencial</option>
            <option value="remoto">Remoto</option>
            <option value="híbrido">Híbrido</option>
          </select>
        </div>
        {["smr_1", "smr_2", "dam_1", "dam_2", "daw_1", "daw_2"].map((field) => (
          <div key={field}>
            <label className="block text-sm font-medium">{`Alumnos ${field.toUpperCase()}`}</label>
            <input type="number" name={field} value={(formData as any)[field]} onChange={handleChange} className="border p-2 rounded w-full" min="0" />
          </div>
        ))}
        <div>
          <label className="block text-sm font-medium">Observaciones</label>
          <input type="text" name="observations" value={formData.observations} onChange={handleChange} className="border p-2 rounded w-full" />
        </div>
      </div>
      <button type="submit" className="mt-4 bg-blue-600 text-white p-2 rounded">
        {editing ? "Actualizar Solicitud" : "Crear Solicitud"}
      </button>
    </form>
  );
};

export default ApplicationForm;
