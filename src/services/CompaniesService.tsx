import API from "../api/api"; // Asegúrate de tener esta configuración en tu proyecto



export const getCompanies = async () => {
    try {
        const token = localStorage.getItem("token");
        const response = await API.get("/company", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error al obtener las empresas:", error);
        return []; 
    }
};
