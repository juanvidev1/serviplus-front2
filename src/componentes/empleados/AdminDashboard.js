import { useContext, useEffect } from "react";
import { ContextoUsuario } from "../../servicios/ContextoUsuario";
import Sidebar from "../general/SidebarClientes";
// import ContenidoDashCliente from "../clientes/ClienteDashboard";
// import ListadoClientes from "../clientes/TablaClientes";
// import ListadoEmpleados from "./TablaEmpleados";
import EstadosLogin from "../../enums/EstadoLogin";
import GestionEmpleados from "./GestionEmpleados";

const AdminDashboard = () => {

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
            console.log(usuario);
        } else {
            setUsuario({nombres: "", estadoLogin: EstadosLogin.NO_LOGIN});
        }
    }

    useEffect(() => {
        revisarSesion();
    }, []);

    return(
        
        <div className="d-flex">
            <div className="col-2">
                <Sidebar />
            </div>
            <div className="container m-5">
                <GestionEmpleados />
            </div>
        </div>
        
    );
}

export default AdminDashboard;