import axios from "axios";
import baseURL from "../config";

const LoginServicios = {};
const URLCliente = baseURL + "/clientes/login";
const URLEmpleado = baseURL + "/empleados/login"

LoginServicios.clienteLogin = (credenciales) => {
    return axios.post(URLCliente, credenciales);
}

LoginServicios.empleadoLogin = (credencialesEmpleado) => {
    return axios.post(URLEmpleado, credencialesEmpleado);
}

export default LoginServicios;