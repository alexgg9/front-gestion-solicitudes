import API from "../api/api"; // Asegúrate de tener esta configuración en tu proyecto

export const getApplications = async () => {
    try {
        const token = localStorage.getItem("token");
        const response = await API.get("/application", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error al obtener las aplicaciones:", error);
        return []; 
    }
};

export const getApplicationById = async (id: number) => {
    try {
        const token = localStorage.getItem("token");
        const response = await API.get(`/application/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error(`Error al obtener la aplicación con ID ${id}:`, error);
        throw error;
    }
};

export const createApplication = async (applicationData: any) => {
    try {
        const token = localStorage.getItem("token");
        const response = await API.post("/application", applicationData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log("Aplicación creada:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error al crear la aplicación:", error);
        throw error;
    }
};

export const updateApplication = async (id: number, applicationData: any) => {
    try {
        const token = localStorage.getItem("token");
        const response = await API.put(`/application/${id}`, applicationData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error(`Error al actualizar la aplicación con ID ${id}:`, error);
        throw error;
    }
};

export const deleteApplication = async (id: number) => {
    try {
        const token = localStorage.getItem("token");
        await API.delete(`/application/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    } catch (error) {
        console.error(`Error al eliminar la aplicación con ID ${id}:`, error);
        throw error;
    }
};
