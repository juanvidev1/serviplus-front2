import { useEffect } from "react";
import Sidebar from "../general/SidebarClientes";
import ContenidoDashCliente from "./ClienteDashboard";
import { ContextoUsuario } from "../../servicios/ContextoUsuario";
import { useContext } from "react";
import EstadosLogin from "../../enums/EstadoLogin";

const DashboardCliente = () => {
  // Estilos

  // Funcionalidad
  const { usuario, setUsuario } = useContext(ContextoUsuario);

  const revisarSesion = () => {
      if (sessionStorage.getItem("estadoLogin") != null) {
          const sesionUsuario = {
              nombres: sessionStorage.getItem("nombres"),
              estadoLogin: parseInt(sessionStorage.getItem("estadoLogin")),
              id: sessionStorage.getItem("id")
          }
          console.log(sesionUsuario);
          console.log(usuario);
          setUsuario(sesionUsuario);
      } else {
          setUsuario({nombres: "", estadoLogin: EstadosLogin.NO_LOGIN});
      }
  }

  useEffect(() => {
    revisarSesion();
  }, [])
    

  /**/


  return (
    <div className="d-flex">
      <div className="col-2">
          <Sidebar />
      </div>
      <div className="container m-5">
          <ContenidoDashCliente />
      </div>
    </div>
  );
};

export default DashboardCliente;
