import { useEffect, useState } from "react";
import Estados from "../../enums/Estados";
import ClientesServicios from "../../servicios/ServicioCliente";


const ListadoClientes = () => {

    // Estilos
    const TITLE_STYLE = {
        color: "#4972b0",
        fontWeight: "700"
    }

    const BUSCAR_STYLE = {
        backgroundColor: "#4972b0",
        color: "white",
        fontWeight: "700",
        width: "50%"
    }

    const BUSCAR_BAR_STYLE = {
        width: "50%"
    }

    const TABLE_HEADERS_STYLE = {
        color: "#4972b0",
        fontWeight: "700"
    }

    /*const DIV_CONT_STYLE = {
        width: "100%"
    }*/

    // #0041A3 --> Color para tener en cuenta

    // Funcionalidad de la tabla

    // let listadoClientes = clientesServicios.listadoClientes();
    const [ clientesListado, setClientesListado ] = useState([]);
    const [ estado, setEstado ] = useState(Estados.CARGANDO);
    const [ criterio, setCriterio ] = useState("");

    const cargarClientes = async () => {
        try {
            const respuesta = await ClientesServicios.listarClientes();
            console.log(respuesta.data);
            if (respuesta.data.length > 0) {
                setClientesListado(respuesta.data);
                setEstado(Estados.OK);
            } else {
                setEstado(Estados.VACIO);
            }
        } catch (error) {
            setEstado(Estados.ERROR);
        }
    }

    const buscarCliente = async (event) => {
        event.preventDefault();
        try {
            const respuesta = await ClientesServicios.buscarClientes(criterio);
            console.log(respuesta.data);
            if (respuesta.data.length > 0) {
                setClientesListado(respuesta.data)
                setEstado(Estados.OK);
            } else {
                setEstado(Estados.VACIO);
            }
        } catch (error) {
            setEstado(Estados.ERROR);
        }
    }

    useEffect(() => {
        cargarClientes();
    }, [])

    const cambiarCriterio = (event) => {
        setCriterio(event.target.value);
    }

    return(
        <div className="container">
            <h3 className="mt-2" style={TITLE_STYLE}>Clientes</h3>
            <form action="">
                <input className="form-control text-bg-dark" type="search" value={criterio} onChange={cambiarCriterio} id="criterio" name="criterio" style={BUSCAR_BAR_STYLE} placeholder="Búsqueda de cliente" />
                <button className="form-control mt-2" id="buscar" name="buscar" onClick={buscarCliente} style= {BUSCAR_STYLE}>Buscar Cliente</button>
            </form>
            <table className="table table-sm mt-4">
                <thead className="m-5" align="center">
                    <tr>
                        <th style={TABLE_HEADERS_STYLE}>Nombre</th>
                        <th style={TABLE_HEADERS_STYLE}>Usuario</th>
                        <th style={TABLE_HEADERS_STYLE}>Email</th>
                        <th style={TABLE_HEADERS_STYLE}>Identificación</th>
                        <th style={TABLE_HEADERS_STYLE}>Telefono</th>
                    </tr>
                </thead>
                <tbody align="center">
                    { 
                        estado === Estados.CARGANDO ? (
                            <tr><td>
                                <div className="spinner-border text-secondary" role="status">
                                    <span className="sr-only"></span>
                                </div>
                            </td></tr>
                        )
                        :

                        estado === Estados.ERROR ? (<tr><td>Ocurrió un error, intente más tarde</td></tr>)
                        
                        :

                        estado === Estados.VACIO ? (<tr><td>No hay datos</td></tr>)

                        :

                        clientesListado.map((cliente) => (
                            <tr key={cliente._id}>
                                <td>{ cliente.nombres + " " + cliente.apellidos }</td>
                                <td>{cliente.username}</td>
                                <td>{cliente.email}</td>
                                <td>{cliente.identificacion}</td>
                                <td>{cliente.telefono}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
}

export default ListadoClientes;