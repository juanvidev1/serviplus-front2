import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import Imagenes from "../../assets/img/imagenes";
import { ContextoUsuario } from "../../servicios/ContextoUsuario";
import EstadosLogin from "../../enums/EstadoLogin";

const GestionEmpleados = () => {
    const navigateTo = useNavigate();
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
            setUsuario({nombres: "", estadoLogin: EstadosLogin.NO_LOGIN})
        }
    }

    useEffect(() => {
        revisarSesion();
    }, []);

    const crearEmpleado = () => {
        revisarSesion();
        navigateTo("/creacionempleado");
    }

    const listarEmpleados = () => {
        revisarSesion();
        navigateTo("/gestionempleados/listado");
    }

    return(
        <>
        <div
      className="container col-12 ms-4 shadow p-3 mb-5 bg-body rounded"
      align="center"
        >
        <div className="container d-flex text-dark">
            <div className="image flex-row m-2">
                <img alt="" src={Imagenes.gestionEmpleados} height="50" width="50" />
            </div>
            <div className="text flex-row m-2">
                <h1 style={{ color: "#4972b0", fontWeight: "900" }}>Gestión de empleados</h1>
            </div>
        </div>
            <h2
            className="ps-4 pt-2"
            align="left"
            style={{ color: "black", fontWeight: "700" }}
            >
                Apreciado administrador
            </h2>
            <p
            className="ps-4"
            align="left"
            style={{ color: "black", fontWeight: "700" }}
            >
                En esta sección puedes realizar la gestión de empleados. 
                Podrás crear, ver, editar y eliminar los asesores que 
                atenderán las solicitudes de los tickets.
            </p>
        </div>
        <div className="container d-flex" align="center">
            <div className="container col-6 m-2" align="center">
                <div
                className="container shadow p-3 mb-5 bg-body rounded"
                align="center"
                >
                    <img alt="" src={Imagenes.ticket1} width="50" height="50" />
                    <br />
                    <button
                    className="btn mt-3"
                    type="button"
                    style={{
                        backgroundColor: "#4972b0",
                        color: "white",
                        fontWeight: "700",
                    }}
                    onClick={crearEmpleado}
                    >
                    Crear empleado
                    </button>
                </div>
            </div>
            <div className="container col-6 ms-4 m-2" align="center">
            <div
            className="container shadow p-3 mb-5 bg-body rounded"
            align="center"
            >
                <img alt="" src={Imagenes.ticket2} width="50" height="50" />
                <br />
                <button
                className="btn mt-3"
                style={{
                    backgroundColor: "#4972b0",
                    color: "white",
                    fontWeight: "700",
                }}
                onClick={listarEmpleados}
                >
                    Mis Tickets
                </button>
            </div>
        </div>
    </div>
    <div className="container mt-3" align="center">
        <img src={Imagenes.empleadosForm} alt=""></img>
    </div>
  </>
    );
}

export default GestionEmpleados;