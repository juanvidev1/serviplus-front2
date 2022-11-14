import axios from "axios";
import baseURL from "../config";

const EmpleadosServicios = {};

EmpleadosServicios.listarEmpleados = () => {
    return axios.get(baseURL + "/empleados");
}

EmpleadosServicios.buscarEmpleado = (criterio) => {
    return axios.get(baseURL + "/empleados?q=" + criterio);
}

EmpleadosServicios.filtrarEmpleado = (id) => {
    return axios.get(baseURL + "/empleados" + id);
}

EmpleadosServicios.crearEmpleado = (empleado) => {
    return axios.post(baseURL + "/empleados", empleado);
}

EmpleadosServicios.modificarEmpleado = (id, empleado) => {
    return axios.put(baseURL + "/empleados" + id, empleado);
}

EmpleadosServicios.borrarEmpleado = (id) => {
    return axios.delete(baseURL + "/empleados" + id);
}

export default EmpleadosServicios;