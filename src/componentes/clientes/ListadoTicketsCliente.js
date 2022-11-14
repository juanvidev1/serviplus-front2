import { useContext, useEffect, useId, useState } from "react";
import Estados from "../../enums/Estados";
import EstadosLogin from "../../enums/EstadoLogin";
import { ContextoUsuario } from "../../servicios/ContextoUsuario";
import TicketsServicios from "../../servicios/TicketsServicios";
import TarjetaTicketCliente from "./TarjetaTicketCliente";

const TicketsCliente = () => {

    const [ estado, setEstado ] = useState(Estados.CARGANDO);
    const [ ticketsCliente, setTicketsCliente ] = useState([]);
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
            // setCriterio(sesionUsuario.identificacion);
        } else {
            setUsuario({nombres: "", estadoLogin: EstadosLogin.NO_LOGIN});
        }
    }

    console.log(usuario.nombres);
    console.log(usuario.identificacion);
    // console.log(criterio);

    const listaTicketsCliente = async () => {
        try {
            const respuesta = await TicketsServicios.buscarTicket(usuario.identificacion);
            console.log(respuesta.data);
            if (respuesta.data.length > 0) {
                setTicketsCliente(respuesta.data);
                setEstado(Estados.OK);
                console.log(estado);
            } else {
                setEstado(Estados.VACIO);
            }
        } catch (error) {
            setEstado(Estados.ERROR);
        }
    }

    useEffect(() => {
        revisarSesion();
        listaTicketsCliente();
    }, []);

    return(
        <main id="cliente-tickets" className="container-fluid">
            <div>
                <h1 className="nombre-lista-tickets">Tickets de {usuario.nombres}</h1>
            </div>
            <div className="row mb-2">
                {
                    estado === Estados.CARGANDO ? (
                        <div className="spinner-border text-secondary" role="status">
                            <span className="sr-only"></span>
                        </div>
                    )
                    :
                    estado === Estados.ERROR ? (
                        <div>
                            Ocurrió un error. Intente más tarde
                        </div>
                    )
                    :
                    estado === Estados.VACIO ?  (
                        <div>
                            No hay tickets generados por {usuario.nombres}
                        </div>
                    )
                    :
                    ticketsCliente.map((ticketCliente) => (
                        <TarjetaTicketCliente key={ticketCliente._id} ticketCliente={ticketCliente} />
                    ))
                }
            </div>
        </main>
    );
}

export default TicketsCliente;