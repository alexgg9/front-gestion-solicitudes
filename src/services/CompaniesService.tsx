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

export const getCompanyById = async (id: number) => {
  try {
    const token = localStorage.getItem("token");
    const response = await API.get(`/company/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error al obtener la empresa con ID ${id}:`, error);
    throw error;
  }
};

export const createCompany = async (companyData: any) => {
  try {
    const token = localStorage.getItem("token");
    const response = await API.post("/company", companyData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Empresa creada:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error al crear la empresa:", error);
    throw error;
  }
};

export const updateCompany = async (id: number, companyData: any) => {
  try {
    const token = localStorage.getItem("token");
    const response = await API.put(`/company/${id}`, companyData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar la empresa con ID ${id}:`, error);
    throw error;
  }
};

export const deleteCompany = async (id: number) => {
  try {
    const token = localStorage.getItem("token");
    const response = await API.delete(`/company/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error al eliminar la empresa con ID ${id}:`, error);
    throw error;
  }
};


export const getCompanyByNif = async (nif: string) => {
  try {
    const token = localStorage.getItem("token");
    const response = await API.get(`/company/${nif}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error al obtener la empresa con NIF ${nif}:`, error);
    throw error;
  }
}