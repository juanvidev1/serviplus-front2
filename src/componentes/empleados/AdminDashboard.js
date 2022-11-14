import Sidebar from "../general/SidebarClientes";
// import ContenidoDashCliente from "../clientes/ClienteDashboard";
// import ListadoClientes from "../clientes/TablaClientes";
import ListadoEmpleados from "./TablaEmpleados";

const AdminDashboard = () => {

    

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

export default AdminDashboard;