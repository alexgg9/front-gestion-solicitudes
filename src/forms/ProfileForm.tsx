import { Professor } from "../types/ProfessorType";

interface Props {
  formData: Professor;
  setFormData: (data: Professor) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

const ProfileForm = ({ formData, setFormData, handleSubmit }: Props) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <h3 className="text-xl font-semibold">Editar Profesor</h3>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div>
          <label className="block text-sm font-medium">Nombre</label>
          <input
            type="text"
            name="name"
            value={formData.name || ''}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Apellido</label>
          <input
            type="text"
            name="surname"
            value={formData.surname || ''}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Correo Electrónico</label>
          <input
            type="email"
            name="email"
            value={formData.email || ''}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Teléfono</label>
          <input
            type="text"
            name="phone"
            value={formData.phone || ''}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Departamento</label>
          <select
            name="department"
            value={formData.department || ''}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          >
            <option value="">Selecciona un departamento</option>
            <option value="Informática">Informática</option>
            <option value="Idiomas">Idiomas</option>
          </select>
        </div>
      </div>
      <button type="submit" className="mt-4 bg-blue-600 text-white p-2 rounded">
        Editar Profesor
      </button>
    </form>
  );
};

export default ProfileForm;