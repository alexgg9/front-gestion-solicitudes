import { Application } from "../types/ApplicationType";
import { Toaster, toast } from "react-hot-toast";

interface Props {
  formData: Application;
  setFormData: (data: Application) => void;
  handleSubmit: (e: React.FormEvent) => void;
  editing: boolean;
}

const ApplicationForm = ({ formData, setFormData, handleSubmit, editing }: Props) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    setFormData({
      ...formData,
      [name]: name.includes("smr") || name.includes("dam") || name.includes("daw") ? Number(value) : value,
    });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      handleSubmit(e);
      toast.success("Solicitud actualizada con éxito");
    } catch (error) {
      toast.error("Error al actualizar la solicitud");
    }
  };

  return (
    <>
      <Toaster />
      <form onSubmit={handleFormSubmit} className="mb-6">
        <h3 className="text-xl font-semibold">Editar Solicitud</h3>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-sm font-medium">Nombre de Empresa</label>
            <input type="text" name="company_name" value={formData.company_name} className="border p-2 rounded w-full" disabled />
          </div>
          <div>
            <label className="block text-sm font-medium">NIF</label>
            <input type="text" name="nif" value={formData.nif} className="border p-2 rounded w-full" disabled />
          </div>
          <div>
            <label className="block text-sm font-medium">Actividad</label>
            <input type="text" name="company_activity" value={formData.company_activity} onChange={handleChange} className="border p-2 rounded w-full" required />
          </div>
          <div>
            <label className="block text-sm font-medium">Modalidad</label>
            <select name="modality" value={formData.modality} onChange={handleChange} className="border p-2 rounded w-full" required>
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
        <button type="submit" className="mt-4 bg-blue-600 text-white p-2 rounded" disabled={!editing}>
          Actualizar Solicitud
        </button>
      </form>
    </>
  );
};

export default ApplicationForm;
