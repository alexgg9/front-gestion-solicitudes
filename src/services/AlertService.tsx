import Swal from "sweetalert2";

class AlertService {
  
  static async confirmDelete(): Promise<boolean> {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "El registro se borrará de forma permanente.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
    });

    return result.isConfirmed; 
  }
}

export default AlertService;