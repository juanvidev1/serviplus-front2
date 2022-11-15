import './styles/empleadosLogin.css'
import Imagenes from "../../assets/img/imagenes"
import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { ContextoUsuario } from '../../servicios/ContextoUsuario';
import LoginServicios from '../../servicios/LoginServicios';
import EstadosLogin from '../../enums/EstadoLogin';

const LoginEmpleados = () => {

    // Funcionalidad
    const navigateTo = useNavigate();
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ mensaje, setMensaje ] = useState("");
    const { usuario, setUsuario } = useContext(ContextoUsuario);

    const crearSesion = (datosPerfil) => {
        sessionStorage.setItem("nombres", datosPerfil.nombres);
        sessionStorage.setItem("estadoLogin", datosPerfil.estadoLogin);
        sessionStorage.setItem("username", datosPerfil.username);
        sessionStorage.setItem("email", datosPerfil.email);
        setUsuario(datosPerfil);
    }

    const validarEmpleado = async (event) => {
        event.preventDefault();
        try {
            const credencialesEmpleado = {
                email: email,
                password: password
            };
            const result = await LoginServicios.empleadoLogin(credencialesEmpleado);
            const datosPerfil = {
                id: result.data.id,
                nombres: result.data.nombres,
                username: result.data.username,
                email: result.data.email,
                estadoLogin: result.data.admin ? EstadosLogin.ADMIN_LOGIN : EstadosLogin.ASESOR_LOGIN
            }
            console.log(usuario);
            crearSesion(datosPerfil);
            if (datosPerfil.estadoLogin === EstadosLogin.ADMIN_LOGIN) {
                navigateTo("/adminDashboard");
            } else if (datosPerfil.estadoLogin === EstadosLogin.ASESOR_LOGIN) {
                navigateTo("/asesorDashboard");
            } else {
                navigateTo("/empleados");
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


    return(
        <form className="principal-empleados container d-flex flex-column mt-5 p-3" onSubmit={validarEmpleado}>
            <h1 className='titulo-login-empleados' align="center">LOGIN EMPLEADOS</h1>
            <div align="center">
                <img className='imagen-login-empleados' src={Imagenes.loginEmp} alt="" />
            </div>
            <h2 className="saludo mt-2" align="center">¡Hola!</h2>
            <p className="ingreso-credenciales mt-2" align="center">Por favor ingresa las credenciales entregadas por tu jefe inmediato para acceder a tu cuenta</p>
            <div className="principal-empleados form-floating mb-3">
                <input type="email" className="form-control" onChange={cambiarEmail} value={email} id="asesorEmail" name="asesorEmail" placeholder="name@example.com" />
                <label htmlFor="floatingInput">Email</label>
            </div>
            <div className="form-floating">
                <input type="password" className="form-control" onChange={cambiarPassword} value={password} id="asesorPassword" name="asesorPassword" placeholder="Password" />
                <label htmlFor="floatingPassword">Password</label>
            </div>
            <div className="mt-3" align="center">
                <button className="btn btn-primary form-control" type="submit">Ingresar</button>
                <br />
                {mensaje}
            </div>
        </form>
    );
}

export default LoginEmpleados;