// import { useLocation } from 'react-router-dom';
import Imagenes from '../../assets/img/imagenes';
import './styles/HeaderStyles.css';
import EstadosLogin from '../../enums/EstadoLogin';
import { useContext } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ContextoUsuario } from '../../servicios/ContextoUsuario';


const Header = () => {

    /*const location = useLocation();
    console.log(location);*/

    const navigateTo = useNavigate();
    const { usuario, setUsuario } = useContext(ContextoUsuario);

    const revisarSesion = () => {
        if (sessionStorage.getItem("estadoLogin") != null) {
            const sesionUsuario = {
                nombres: sessionStorage.getItem("nombres"),
                EstadoLogin: parseInt(sessionStorage.getItem("estadoLogin"))
            }
            console.log(sesionUsuario);
            setUsuario(sesionUsuario);
        } else {
            setUsuario({nombres: "", estadoLogin: EstadosLogin.NO_LOGIN});
        }
    }

    const volverCliente = () => {
        revisarSesion();
        navigateTo("/clienteDashboard");
    }

    useEffect(() => {
        revisarSesion();
    }, [])

    return(
    <header className="header-landing p-0 mb-0">
        <div className="container">
            <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
            <img className='imagen-header' src= {Imagenes.img4} alt="" />
        
                {
                    usuario.estadoLogin === EstadosLogin.NO_LOGIN ? (            
                    <>
                        <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                            <li><a href="/" className="link nav-link px-2 text-white">Inicio</a></li>
                            <li><a href="/clientes/form" className="link nav-link px-2 text-white">Genera un ticket</a></li>
                            <li><a href="/about-serviplus" className="link nav-link px-2 text-white">Acerca de ServiPlus</a></li>
                            <li><a href="/empleados" className="link nav-link px-2 text-white">Acceso empleados</a></li>
                        </ul>
                        <div className="text-end">
                            <a href='/clientes/form' type='button' className='btn btn-warning'>Registrarse</a>
                        </div>
                    </>
                    
                    )

                    :

                    usuario.estadoLogin === EstadosLogin.CLIENTE_LOGIN ? (
                    <>            
                        <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-end mb-md-0">
                            <li><button type="text" onClick={volverCliente} className="regresar-boton px-2 text-white">Regresar</button></li>
                        </ul>
                        <div className="text-end">
                            <span className='nombre-usuario'>{usuario.nombres}</span>
                        </div>    
                    </>
                    )
    
                    : 
                    
                    usuario.estadoLogin === EstadosLogin.ADMIN_LOGIN ? (
                    <>            
                        <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-end mb-md-0">
                            <li><a href="/" className="link nav-link px-2 text-white">Regresar</a></li>
                        </ul>
                        <div className="text-end">
                            <span className='nombre-usuario'>{usuario.nombres}</span>
                        </div>    
                    </>
                    )
                    
                    :
                    
                    (
                        <>
                            <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                                <li><a href="/" className="link nav-link px-2 text-white">Inicio</a></li>
                                <li><a href="/clientes/form" className="link nav-link px-2 text-white">Genera un ticket</a></li>
                                <li><a href="/about-serviplus" className="link nav-link px-2 text-white">Acerca de ServiPlus</a></li>
                                <li><a href="/empleados" className="link nav-link px-2 text-white">Acceso empleados</a></li>
                            </ul>
                            <div className="text-end">
                                <a href='/clientes/form' type='button' className='btn btn-warning'>Registrarse</a>
                            </div>
                        </>
                    )

                    /*location.pathname === "/clientes/form" ? (
                    <>
                        <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                            <li><a href="/" className="link nav-link px-2 text-white">Regresar</a></li>
                        </ul>
                        <div className="text-end">
                            <a href='/' type='button' className='btn btn-outline-light me-2'>login</a>
                        </div> 
                    </>
                    )

                    :

                    location.pathname === "/empleados" ? (
                    <header className="header-empleados p-3 mb-0">
                        <div className="container">
                            <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                                <img className='imagen-header' src= {Imagenes.img4} alt="" />
                                <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                                    <li><a href="/" className="link nav-link px-2 text-white">Regresar</a></li>
                                </ul>
                            </div>
                        </div>
                    </header>
                    )

                    :

                    location.pathname === "/about-serviplus" ? (
                    <header className="header-about-sv p-3 mb-0">
                        <div className="container">
                            <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                                <img className='imagen-header' src= {Imagenes.img4} alt="" />
                                <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                                    <li><a href="/" className="link nav-link px-2 text-white">Regresar</a></li>
                                    <li><a href="/empleados" className="link nav-link px-2 text-white">Empleados</a></li>
                                </ul>
                                <div className='text-end'>
                                    <a href='/' type='button' className='btn btn-outline-light me-2'>Login</a>
                                    <a href='/clientes/form' type='button' className='btn btn-warning'>Registro</a>
                                </div>
                            </div>
                        </div>
                    </header>        
                    )

                    :*/
                }

           </div> 
        </div>
    </header>
    );
}

export default Header;