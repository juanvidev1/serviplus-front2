import Imagenes from "../../assets/img/imagenes"
import './styles/tickettarjeta.css'
const TarjetaTicketCliente = ({ ticketCliente }) => {
    return (
        <>
        <div className="col-3 mb-2">
            <div className="card" align="center">
                <h6 className="card-header text-primary">Estado Ticket: {ticketCliente.estado_ticket}</h6>
                <div className="card-body row" >
                    <img className="tiquete-tarjeta" src={Imagenes.ticketicon} alt="" />
                    <h4 className="card-text">{ticketCliente.servicio.nombre}</h4>
                    <p className="mb-auto" style={{fontSize:"12px"}}>Fecha solicitud:<br/>{ticketCliente.fecha}</p>
                </div>
                <div className="card-footer">
                    <button className="btn btn-primary" id="submit-ticket" name="submit-ticket" data-bs-toggle="modal" data-bs-target='#ticketDetalle'>Ver detalles</button>
                </div>
            </div>
        </div>
        

        <div className='modal fade' id='ticketDetalle' data-bs-backdrop='static'>
            <div className='modal-dialog'>
                <div className='modal-content'>
                    <div className='modal-header'>
                        <h1 className='modal-title fs-5' id='staticBackdropLabel' align='center'>Ticket creado exitosamente</h1>
                    </div>
                    <div className='modal-body'>
                        <div>Servicio solicitado: {ticketCliente.servicio.nombre}</div>
                        <div>Detalle servicio: {ticketCliente.servicio.descripcion}</div>
                        <div>Cliente: {ticketCliente.cliente.nombre}</div>
                        <div>Identificación cliente: {ticketCliente.cliente.identificacion}</div>
                        
                        <div>Estado: {ticketCliente.estado_ticket}</div>
                        <div>Fecha: {ticketCliente.fecha}</div>
                    </div>
                    <div className='modal-footer'>
                        <button type="button" className="btn btn-light" data-bs-dismiss="modal">Cerrar</button>
                    </div>
                </div>
            </div>
        </div>

        </>
    )
}

export default TarjetaTicketCliente;