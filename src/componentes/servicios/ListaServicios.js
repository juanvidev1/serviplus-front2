const ListaServicios = () => {
    return(
        <div className="container">
            <h3 className="mt-2">Clientes</h3>
            <form action="">
                <input className="form-control text-bg-dark" type="search" value={criterio} onChange={cambiarCriterio} id="criterio" name="criterio" placeholder="Búsqueda de cliente" />
                <button className="form-control mt-2" id="buscar" name="buscar" onClick={buscarCliente}>Buscar Cliente</button>
            </form>
            <table className="table table-sm mt-4">
                <thead className="m-5" align="center">
                    <tr>
                        <th>Nombre servicio</th>
                        <th>Descripción</th>
                        <th>Tipo de servicio</th>
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

                        serviciosListado.map((servicio) => (
                            <tr key={servicio._id}>
                                <td>{ servicio.nombre_servicio }</td>
                                <td>{servicio.username}</td>
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

export default ListaServicios;