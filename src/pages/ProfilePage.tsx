import { useEffect, useState } from "react";
import ProfileForm from "../components/ProfileForm";
import { getProfessors, updateProfessor } from "../services/ProfessorsService";
import { Professor } from "../types/ProfessorType";


const initialFormData: Professor = {
  id: 0,
  dni: "",
  name: "",
  surname: "",
  email: "",
  password: "",
  phone: "",
  department: "",
};

const ProfilePage = () => {
  const [formData, setFormData] = useState<Professor>(initialFormData);
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    fetchProfessor();
  }, []);

  const fetchProfessor = async () => {
    try {
      const response = await getProfessors(); // Llamada a la API para obtener datos del profesor
      if (response.data) {
        setFormData(response.data); // Establecemos los datos del profesor
        setEditing(true); // Si se encuentra el profesor, pasamos a modo de edición
      } else {
        setError("Profesor no encontrado");
      }
    } catch (error) {
      console.error("Error al obtener datos del profesor:", error);
      setError("Error al cargar los datos del profesor");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateProfessor(formData.id, formData); // Solo actualizamos el profesor
      setEditing(false);
      fetchProfessor(); // Recargamos los datos actualizados
    } catch (error) {
      console.error("Error al actualizar los datos:", error);
    }
  };

  // Si hay un error (por ejemplo, profesor no encontrado), podemos redirigir o mostrar un mensaje
  if (error) {
    return (
      <div className="text-center">
        <h2 className="text-3xl font-bold">{error}</h2>
        <button
          className="mt-4 bg-blue-600 text-white p-2 rounded"

        >
          Volver al inicio
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-md mt-6">
      <h2 className="text-3xl font-bold mb-4">Formulario de Profesor</h2>
      <div className="grid grid-cols-1 gap-6 items-start">
        <div className="bg-gray-100 p-4 rounded-lg">
          {editing && (
            <ProfileForm
              formData={formData}
              setFormData={setFormData}
              handleSubmit={handleSubmit}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
