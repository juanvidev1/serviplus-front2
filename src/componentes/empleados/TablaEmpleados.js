import { useContext, useEffect, useState } from "react";
import Estados from "../../enums/Estados";
import { ContextoUsuario } from "../../servicios/ContextoUsuario";
import EmpleadosServicios from "../../servicios/ServicioEmpleado";
import EstadosLogin from "../../enums/EstadoLogin";
import './styles/tablaEmpleados.css';


const ListadoEmpleados = () => {


    // Funcionalidad de la tabla
    const [ empleadosListado, setEmpleadosListado ] = useState([]);
    const [ estado, setEstado ] = useState(Estados.CARGANDO);
    const [ criterio, setCriterio ] = useState("");
    const { usuario, setUsuario } = useContext(ContextoUsuario);

    const revisarSesion = () => {
        if (sessionStorage.getItem("estadoLogin") != null) {
            const sesionUsuario = {
                nombres: sessionStorage.getItem("nombres"),
                estadoLogin: parseInt(sessionStorage.getItem("estadoLogin")),
                id: sessionStorage.getItem("id"),
                identificacion: sessionStorage.getItem("identificacion")
            }
            setUsuario(sesionUsuario); 
        } else {
            setUsuario({nombres: "", estadoLogin: EstadosLogin.NO_LOGIN});
        }
    }

    const cargarEmpleados = async () => {
        try {
            const respuesta = await EmpleadosServicios.listarEmpleados();
            console.log(respuesta.data);
            if (respuesta.data.length > 0) {
                setEmpleadosListado(respuesta.data);
                setEstado(Estados.OK);
            } else {
                setEstado(Estados.VACIO);
            }
        } catch (error) {
            setEstado(Estados.ERROR);
        }
    }

    const buscarEmpleado = async (event) => {
        event.preventDefault();
        try {
            const respuesta = await EmpleadosServicios.buscarEmpleado(criterio);
            console.log(respuesta.data);
            if (respuesta.data.length > 0) {
                setEmpleadosListado(respuesta.data);
                setEstado(Estados.OK);
            } else {
                setEstado(Estados.VACIO);
            }
        } catch (error) {
            setEstado(Estados.ERROR);
        }
    }

    /*const CargarEmpleado = async () => {
        try {
            if (id != null) {
                const respuesta = await EmpleadosServicios.
            } else {
                
            }
        } catch (error) {
            
        }
    }*/

    useEffect(() => {
        revisarSesion();
        cargarEmpleados();
    }, [])

    const cambiarCriterio = (event) => {
        setCriterio(event.target.value);
    }

    return (
        <div className="container">
            <h2 className="titulo-principal mt-2">Empleados</h2>
            <form action="">
                <input className="barra-busqueda form-control text-bg-dark" type="search" value={criterio} onChange={cambiarCriterio} id="criterio" name="criterio" />
                <button className="boton-buscar form-control mt-2" id="buscar" name="buscar" onClick={buscarEmpleado}>Buscar empleado</button>
            </form>
            <table className="table table-sm mt-4">
            <thead className="m-5" align="center">
                <tr>
                    <th className="table-headers">Nombre</th>
                    <th className="table-headers">Usuario</th>
                    <th className="table-headers">Email</th>
                    <th className="table-headers">Identificación</th>
                    <th className="table-headers">Area</th>
                </tr>
            </thead>
            <tbody align="center">
                {
                    estado === Estados.CARGANDO ? (
                        <tr>
                            <td><div className="spinner-grow text-dark" role="status">
                                <span className="visually-hidden"></span>
                            </div></td>
                        </tr>
                    )

                    :

                    estado === Estados.ERROR ? (
                        <tr><td>Hubo un error en la carga de los archivos</td></tr>
                    )

                    :

                    estado === Estados.VACIO ? 
                            (<tr><td>No hay datos</td></tr>)

                    :

                    empleadosListado.map((empleado) => (
                        <tr key={empleado._id}>
                            <td>{ empleado.nombres + " " + empleado.apellidos }</td>
                            <td>{ empleado.username }</td>
                            <td>{ empleado.email }</td>
                            <td>{ empleado.identificacion }</td>
                            <td>{ empleado.area }</td>
                            <td><button className="btn btn-sm btn-warning" >Editar</button></td>
                            <td><button className="btn btn-sm btn-danger" >Eliminar</button></td>
                        </tr>
                    ))
                }
                
            </tbody>
            </table>
        </div>
    );
}
 
export default ListadoEmpleados;