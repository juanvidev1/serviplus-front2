import './styles/LandingStyles.css'
import Imagenes from "../../assets/img/imagenes";
import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { ContextoUsuario } from '../../servicios/ContextoUsuario';
import LoginServicios from '../../servicios/LoginServicios';
import EstadosLogin from '../../enums/EstadoLogin';

const Landing = () => {

    const navigateTo = useNavigate();
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ mensaje, setMensaje ] = useState("");
    const [ recordar, setRecordar ] = useState(false);
    const { usuario, setUsuario } = useContext(ContextoUsuario);

    const crearSesion = (datosPerfil) => {
        sessionStorage.setItem("id", datosPerfil.id);
        sessionStorage.setItem("nombres", datosPerfil.nombres);
        sessionStorage.setItem("email", datosPerfil.email);
        sessionStorage.setItem("username", datosPerfil.username);
        sessionStorage.setItem("identificacion", datosPerfil.identificacion);
        sessionStorage.setItem("estadoLogin", datosPerfil.estadoLogin);
        setUsuario(datosPerfil);
    }
    
    const validar = async (event) => {
        event.preventDefault();
        try {
            const credenciales = {
                email: email,
                password: password
            };
            const result = await LoginServicios.clienteLogin(credenciales);
            const datosPerfil = {
                id: result.data.id,
                nombres: result.data.nombres,
                email: result.data.email,
                username: result.data.username,
                identificacion: result.data.identificacion,
                estadoLogin: EstadosLogin.CLIENTE_LOGIN
            }
            crearSesion(datosPerfil);
            if (datosPerfil.estadoLogin === EstadosLogin.CLIENTE_LOGIN) {
                navigateTo("/clienteDashboard");
            } else {
                navigateTo("/");
            }
        } catch (error) {
            if (error.status === 401) {
                setMensaje(error.response.data);
            }
        }
    }

    const cambiarEmail = (event) => {
        setEmail(event.target.value);
        setMensaje("");
    }

    const cambiarPassword = (event) => {
        setPassword(event.target.value);
        setMensaje("");
    }

    const cambiarRecordar = (event) => {
        setRecordar(event.target.value);
    }
    
    return (
    <div>
        <div className="container mt-3 p-3 d-flex">
            <div className="display-flex m-5 justify-content-center">
                <img src={Imagenes.img2} alt="" height={"400"} width={"500"}></img>
            </div>
            <div className="m-5 justify-content-center align-items-center">
                <main className="form-signin w-100 m-auto">
                    <form onSubmit={validar}>
                        <h1 className="bienvenidos h3 mb-3 mt-2" align="center">Bienvenido a ServiPlus</h1>
                        <div className="container justify-content">
                        </div>
                        <div className="form-floating mt-2 mb-2">
                        <input type="email" className="form-control" onChange={cambiarEmail} value={email} id="email" name='email' placeholder="alguien@mail.com" />
                        <label htmlFor="floatingInput">Correo electrónico</label>
                        </div>
                        <div className="form-floating mt-3 mb-3">
                        <input type="password" className="form-control" onChange={cambiarPassword} value={password} id="password" name='password' placeholder="Contraseña" />
                        <label htmlFor="floatingPassword">Contraseña</label>
                        </div>

                        <div className="checkbox mb-3" style={{columnCount: "2"}}>
                        <label>
                            <input type="checkbox" onChange={cambiarRecordar} checked={recordar} id="remember-me" name="remember-me" /> Recordar mis datos
                        </label>
                        <div className="container" align="right">
                        <label>
                            <a href="/">olvide mi contraseña</a>
                        </label>
                        </div>
                        </div>
                        <button className="w-100 btn btn-lg btn-primary" type="submit">Ingresa</button>
                        <div className="registrate container mt-3 mb-3 p-auto" align="left">
                            <a href="/clientes/form">Regístrate si aún no tienes cuenta</a> {mensaje}
                        </div>
                        <p className=" derechos mt-2 mb-3 text-muted">&copy; ServiPlus 2022 - Todos los derechos reservados</p>
                    </form>
                </main>
            </div>
        </div>
        <div className="container" align="center">
            <h1 className='apreciado-cliente'>Apreciado Cliente</h1>
            <p className='parrafo-principal'>
                ¡Para nosotros es muy importante contar contigo!  
                Si deseas presentar un incidente, soporte  o una petición sobre los servicios prestados por la empresa 
                ten en cuenta que debes registrarte para realizar una solicitud exitosa.
            </p>
        </div>
    </div>
    );
}

export default Landing;