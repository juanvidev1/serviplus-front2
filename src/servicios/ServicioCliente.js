import axios from "axios";
import baseURL from "../config";


const ClientesServicios = {};

ClientesServicios.listarClientes = () => {
    return axios.get(baseURL + "/clientes");
}

ClientesServicios.buscarClientes = (criterio) => {
    return axios.get(baseURL + "/clientes?q=" + criterio);
}

ClientesServicios.buscarCliente = (id) => {
    return axios.get(baseURL + "/clientes/" + id);
}

ClientesServicios.guardarCliente = (cliente) => {
    return axios.post(baseURL + "/clientes", cliente);
}

ClientesServicios.actualizarCliente = (id, cliente) => {
    return axios.put(baseURL + "/clientes/" + id, cliente);
}

ClientesServicios.eliminarCliente = (id) => {
    return axios.put(baseURL + "/clientes" + id);
}

export default ClientesServicios;

/*const listadoClientes = [
    {
        nombres: "Pepito",
        apellidos: "Perez",
        username: "pepito",
        password: "123456",
        identificacion: "1234567890",
        tipo_identificacion: "Cédula",
        telefono: "123445",
        email: "pepito@mail.com",
        direccion: null
    },
    {
        nombres: "Juanito",
        apellidos: "Perez",
        username: "juanpe",
        password: "123456",
        identificacion: "1034567890",
        tipo_identificacion: "Cédula",
        telefono: "123432",
        email: "juanpe@mail.com",
        direccion: null
    },
    {
        nombres: "Alvaro",
        apellidos: "Vivalda",
        username: "avivalda",
        password: "123456",
        identificacion: "1134567890",
        tipo_identificacion: "Pasaporte",
        telefono: "123454",
        email: "vivalda@mail.com",
        direccion: null
    },
    {
        nombres: "Juanvi",
        apellidos: "Reyes",
        username: "juanvi",
        password: "123456",
        identificacion: "1334567890",
        tipo_identificacion: "Cédula",
        telefono: "123456",
        email: "juenvi@mail.com",
        direccion: null
    }
]*/



/*ClientesServicios.listadoClientes = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        })
    }, 2000);
}*/
