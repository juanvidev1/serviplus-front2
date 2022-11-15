import { useContext, useEffect } from "react"
import { ContextoUsuario } from "../../servicios/ContextoUsuario"
import EstadosLogin from "../../enums/EstadoLogin";
import ListadoEmpleados from "./TablaEmpleados";
import Sidebar from "../general/SidebarClientes";

const DashListaEmpleados = () => {
    const { usuario, setUsuario } = useContext(ContextoUsuario);
    
    const revisarSesion = () => {
        if (sessionStorage.getItem("estadoLogin") != null) {
            const sesionUsuario = {
                id: sessionStorage.getItem("id"),
                nombres: sessionStorage.getItem("nombres"),
                estadoLogin: parseInt(sessionStorage.getItem("estadoLogin"))
            }
            setUsuario(sesionUsuario);
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
                <ListadoEmpleados />
            </div>
        </div>
        
    );
}

export default DashListaEmpleados;