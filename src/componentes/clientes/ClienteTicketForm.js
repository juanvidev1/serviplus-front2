import { useContext, useState, useEffect } from 'react';
import Imagenes from '../../assets/img/imagenes';
import { ContextoUsuario } from '../../servicios/ContextoUsuario';
import EstadosLogin from '../../enums/EstadoLogin';
import './styles/clienteTicket.css';
import { useNavigate } from 'react-router-dom';
import TicketsServicios from '../../servicios/TicketsServicios';

const ClienteTicketForm = () => {

    const navigateTo = useNavigate();

    const [ nombreServicio, setNombreServicio ] = useState("");
    const [ descripcionServicio, setDescripcionServicio ] = useState("");
    const [ nombreCliente, setNombreCliente ] = useState("");
    const [ username, setUsername ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ identificacion, setIdentificacion ] = useState("");
    const [ mensaje, setMensaje ] = useState("");
    const { usuario, setUsuario } = useContext(ContextoUsuario);

    const revisarSesion = () => {
        if (sessionStorage.getItem("estadoLogin") != null) {
            const sesionUsuario = {
                nombres: sessionStorage.getItem("nombres"),
                estadoLogin: parseInt(sessionStorage.getItem("estadoLogin")),
                id: sessionStorage.getItem("id"),
                username: sessionStorage.getItem("username"),
                identificacion: sessionStorage.getItem("identificacion"),
                email: sessionStorage.getItem("email"),
            }
            setUsuario(sesionUsuario);
            setNombreCliente(sesionUsuario.nombres);
            setUsername(sesionUsuario.username);
            setEmail(sesionUsuario.email);
            setIdentificacion(sesionUsuario.identificacion);
        } else {
            setUsuario({nombres: "", estadoLogin: EstadosLogin.NO_LOGIN});
        }
    }


    const crearTicket = async (event) => {
        event.preventDefault();
        try {
            const ticket = {
                fecha: Date.now(),
                servicio: {
                    nombre: nombreServicio,
                    descripcion: descripcionServicio,
                },
                cliente: {
                    nombre: nombreCliente,
                    username: username,
                    identificacion: identificacion,
                    email: email
                },
                estado_ticket: "Solicitado"
            }
            await TicketsServicios.crearTicket(ticket);
        } catch (error) {
            console.log(error);
            setMensaje(error);
        }
    }

    const volver = () => {
        navigateTo("/clienteDashboard")
    }

    useEffect(() => {
        revisarSesion();
    }, []);

    const cambiarAsunto = (event) => {
        setNombreServicio(event.target.value);
    }

    const cambiarDescripcion = (event) => {
        setDescripcionServicio(event.target.value);
    }

    return(
        <div className='principal container mb-3' align='center'>
            <form className="formulario-tickets form-control form-control-sm">
                <h1 className='encabezado-cliente-ticket'>Genera un ticket</h1>                   
                <div className='asunto-seccion ms-2'>
                    <label className='etiqueta-asunto'>Asunto*</label>
                    <div className='asunto-seccion mb-1'>
                        <input type={"text"} className="asunto-entrada form mb-2" onChange={cambiarAsunto} id='nombre-servicio' name='nombre-servicio' />
                    </div>
                    <div className='descripcion-seccion mb-1'>
                        <label className='etiqueta-descripcion'>Descripción solicitud*</label>
                    </div>
                    <div className='descripcion-seccion'>
                        <textarea type={"text"} className='entrada-grande form form-sm' onChange={cambiarDescripcion} id='descripcion-servicio' name='descripciom-servicio' />
                    </div>
                    <div>
                        <button className='crear-ticket' id="submit-ticket" name="submit-ticket" onClick={crearTicket} data-bs-toggle="modal" data-bs-target='#ticketCreado'>Generar ticket</button>
                    </div>
                </div>
            </form>
            <div>
                <img src={Imagenes.img2} alt='' />
                {mensaje}
            </div>

            <div className='modal fade' id='ticketCreado' data-bs-backdrop='static'>
                <div className='modal-dialog'>
                    <div className='modal-content'>
                        <div className='modal-header'>
                            <h1 className='modal-title fs-5' id='staticBackdropLabel' align='center'>Ticket creado exitosamente</h1>
                        </div>
                        <div className='modal-body'>
                            Puedes consultar el ticket con tu número de identificación {identificacion}
                        </div>
                        <div className='modal-footer'>
                            <button onClick={volver} type='button' className='btn btn-primary'>Volver</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default ClienteTicketForm