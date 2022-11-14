import axios from "axios";
import baseURL from "../config";

const TicketsServicios = {};

TicketsServicios.listarTickets = () => {
    return axios.get(baseURL + "/tickets");
}

TicketsServicios.buscarTicket = (criterio) => {
    return axios.get(baseURL + "/tickets?q=" + criterio);
}

TicketsServicios.filtrarTicket = (id) => {
    return axios.get(baseURL + "/tickets/" + id);
}

TicketsServicios.crearTicket = (ticket) => {
    return axios.post(baseURL + "/tickets", ticket);
}

TicketsServicios.actualizarTicket = (id, infoTicket) => {
    return axios.put(baseURL + "/tickets/" + id, infoTicket);
}

export default TicketsServicios;