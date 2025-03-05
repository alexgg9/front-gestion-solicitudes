import { useState, useEffect } from "react";
import { Professor } from "../types/ProfessorType";
import { toast } from "react-hot-toast";
import ProfileForm from "../forms/ProfileForm";
import { getProfessorById, updateProfessor } from "../services/ProfessorsService";

const ProfilePage = () => {
  const [formData, setFormData] = useState<Professor | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfessor();
  }, []);

  const fetchProfessor = async () => {
    const professorId = localStorage.getItem("professorId");
    if (!professorId) {
      setError("Profesor no encontrado.");
      setLoading(false);
      return;
    }

    try {
      const response = await getProfessorById(Number(professorId));
      console.log("Response:", response);

      if (response.data) {
        setFormData({
          ...response.data,
          surname: response.data.surmane || response.data.surname || "", 
        });
      } else {
        setError("No se pudo cargar los datos del profesor.");
      }
    } catch (error) {
      console.error("Error al obtener los datos del profesor:", error);
      setError("Error al cargar los datos del profesor.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData) return;

    const dataToUpdate: Partial<Professor> = {
      name: formData.name,
      surname: formData.surname,
      email: formData.email,
      phone: formData.phone,
      department: formData.department,
    };

    console.log("Data to update:", dataToUpdate);

    try {
      await updateProfessor(formData.id, dataToUpdate);
      setFormData(dataToUpdate as Professor); 
      toast.success("Profesor actualizado con éxito!");
    } catch (error) {
      console.error("Error al actualizar los datos:", error);
      setError("Error al actualizar los datos.");
      toast.error("No se pudo actualizar los datos.");
    }
  };

  if (loading) {
    return <div className="text-center text-xl">Cargando datos...</div>;
  }

  if (error) {
    return (
      <div className="text-center">
        <h2 className="text-3xl font-bold">{error}</h2>
        <button
          className="mt-4 bg-blue-600 text-white p-2 rounded"
          onClick={() => window.location.href = "/profile"}
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
          {formData ? (
            <ProfileForm
              formData={formData}
              setFormData={setFormData}
              handleSubmit={handleSubmit}
            />
          ) : (
            <div className="text-center">Cargando datos...</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
