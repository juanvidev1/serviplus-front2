import axios from "axios";
import baseURL from "../config";

const ServiciosOperaciones = {};

// Listar servicios
ServiciosOperaciones.listarServicios = () => {
    return axios.get(baseURL + "/servicios");
}

ServiciosOperaciones.buscarServicio = (criterio) => {
    return axios.get(baseURL + "/servicios?q=" + criterio);
}

ServiciosOperaciones.filtrarServicio = (id) => {
    return axios.get(baseURL + "/servicios/" + id);
}

ServiciosOperaciones.crearServicio = (servicio) => {
    return axios.post(baseURL + "/servicios", servicio);
}

ServiciosOperaciones.actualizarServicio = (id, servicio) => {
    return axios.put(baseURL + "/servicios/" + id, servicio);
}

ServiciosOperaciones.eliminarServicio = (id) => {
    return axios.delete(baseURL + "servicios/" + id);
}

export default ServiciosOperaciones;