import API from "../api/api"; // Asegúrate de tener esta configuración en tu proyecto

export const getProfessors = async () => {
    try {
        const token = localStorage.getItem("token");
        const response = await API.get("/professor", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error al obtener los profesores:", error);
        return []; 
    }
};  

export const getProfessorById = async (id: number) => {
    try {
        const token = localStorage.getItem("token");
        const response = await API.get(`/professor/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error(`Error al obtener el profesor con ID ${id}:`, error);
        throw error;
    }
};

export const createProfessor = async (professorData: any) => {
    try {
        const token = localStorage.getItem("token");
        const response = await API.post("/professor", professorData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log("Profesor creado:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error al crear el profesor:", error);
        throw error;
    }
};

export const updateProfessor = async (id: number, professorData: any) => {
    try {
        const token = localStorage.getItem("token");
        const response = await API.put(`/professor/${id}`, professorData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error: any) {
        if (error.response) {
            // Mostrar los detalles del error (por ejemplo, validaciones específicas del backend)
            console.error('Error al actualizar el profesor:', error.response.data);
            throw error.response.data; // Puedes lanzar estos detalles si los necesitas en otro lugar
        } else {
            console.error('Error desconocido:', error);
            throw error;
        }
    }
};

export const deleteProfessor = async (id: number) => {
    try {
        const token = localStorage.getItem("token");
        const response = await API.delete(`/professor/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error(`Error al eliminar el profesor con ID ${id}:`, error);
        throw error;
    }
};