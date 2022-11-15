import "./styles/formEmpleados.css";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Imagenes from "../../assets/img/imagenes";
import { ContextoUsuario } from "../../servicios/ContextoUsuario";
import EmpleadosServicios from "../../servicios/ServicioEmpleado";
import EstadosLogin from "../../enums/EstadoLogin";

const FormEmpleados = () => {
    
    const { id } = useParams();
    const navigateTo = useNavigate();

    const [ nombres, setNombres ] = useState("");
    const [ apellidos, setApellidos ] = useState("");
    const [ username, setUsername ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ password, setPassword] = useState("");
    const [ passwordConfirm, setPasswordConfirm ] = useState("");
    const [ identificacion, setIdentificacion ] = useState("");
    const [ tipoIdentificacion, setTipoIdentificacion ] = useState("");
    const [ admin, setAdmin ] = useState(false)
    const [ area, setArea ] = useState("");
    const [ mensaje, setMensaje ] = useState("");
    const [ titulo, setTitulo ] = useState("");
    const [ boton, setBoton ] = useState(""); 
    const { usuario, setUsuario } = useContext(ContextoUsuario);

    const revisarSesion = () => {
        if (sessionStorage.getItem("estadoLogin") != null) {
            const sesionUsuario = {
                id: sessionStorage.getItem("id"),
                nombres: sessionStorage.getItem("nombres"),
                EstadoLogin: parseInt(sessionStorage.getItem("estadoLogin"))
            }
            setUsuario(sesionUsuario);
        } else {
            setUsuario({nombres: "", estadoLogin: EstadosLogin.NO_LOGIN});
        }
    }

    const guardarEmpleado = async () => {
        // event.preventDefault();
        if (password === passwordConfirm) {
            try {
                const empleado = {
                    nombres: nombres,
                    apellidos: apellidos,
                    username: username,
                    password: password,
                    identificacion: identificacion,
                    tipo_identificacion: tipoIdentificacion,
                    email: email,
                    area: area,
                    admin: admin
                }
                if (empleado.id != null) {
                    await EmpleadosServicios.modificarEmpleado(empleado.id, empleado);
                    console.log(empleado);
                } else {
                    await EmpleadosServicios.crearEmpleado(empleado);
                    navigateTo("/registroempleados")
                }
            } catch (error) {
                setMensaje("Ocurrió un error " + error);
            }
        } else {
            
        }
    }

    const cargarEmpleado = async () => {
        try {
            if (id != null) {
                const respuesta = await EmpleadosServicios.filtrarEmpleado(id);
                if (respuesta.data != null) {
                    setNombres(respuesta.data.nombres);
                    setApellidos(respuesta.data.apellidos);
                    setUsername(respuesta.data.username);
                    setPassword(respuesta.data.password);
                    setPasswordConfirm(respuesta.data.password);
                    setIdentificacion(respuesta.data.identificacion);
                    setTipoIdentificacion(respuesta.data.tipo_identificacion);
                    setEmail(respuesta.data.email);
                    setAdmin(respuesta.data.admin);
                } else {
                    setTitulo("Actualizar datos del empleado" + {nombres} + " " + {apellidos});
                    setBoton("Actualizar datos");
                }
            } else {
                setTitulo("Registrar datos de nuevo empleado");
                setBoton("Guardar empleado");
            }
        } catch (error) {
            console.log("Ocurrió un error " + error);
        }
    }

    const cancelar = () => {
        revisarSesion();
        navigateTo("/adminDashboard");
    }

    useEffect(() => {
        revisarSesion();
        cargarEmpleado();
    }, []);

    const cambiarNombres = (event) => {
        setNombres(event.target.value)
      }
  
      const cambiarApellidos = (event) => {
        setApellidos(event.target.value)
      }
  
      const cambiarUsername = (event) => {
        setUsername(event.target.value)
      }

      const cambiarEmail = (event) => {
        setEmail(event.target.value);
      }
  
      const cambiarPassword = (event) => {
        setPassword(event.target.value)
      }
  
      const cambiarConfirm = (event) => {
        setPasswordConfirm(event.target.value)
      }

      const cambiarArea = (event) => {
        setArea(event.target.value);
      }

      const cambiarAdmin = (event) => {
        setAdmin(event.target.value);
      }

      const cambiarIdentificacion = (event) => {
        setIdentificacion(event.target.value)
      }
  
      const cambiarTipoIdentificacion = (event) => {
        setTipoIdentificacion(event.target.value)
      }
    
    return(
        <div className="div-principal container d-flex">
            <div className="container m-5">
                <h1 className="titulo-empleados" align="center">{titulo}</h1>
                <form className="formulario-empleados">
                    <div className="form-control-sm mb-2">
                        <label className="etiquetas-empleados" htmlFor="nombres">Nombres*</label>
                        <input className="entrada-nombres form-control form-control-sm mb-2" onChange={cambiarNombres} value={nombres} id="nombres" name="nombres" />

                        <label className="etiquetas-empleados" htmlFor="apellidos">Apellidos*</label>
                        <input className="entrada-nombres form-control form-control-sm mb-2" onChange={cambiarApellidos} value= {apellidos} id="apellidos" name="apellidos" />

                        <label className="etiquetas-empleados me-2 mt-2">Tipo de documento*</label>
                        <select className="form-control select select-sm mt-1 mb-1" id="tipo-id" onChange={cambiarTipoIdentificacion} value={tipoIdentificacion} name="tipo-id" >
                            <option value={""}>Seleccione una opción</option>
                            <option value={"Cédula"}>Cédula</option>
                            <option value={"Pasaporte"}>Pasaporte</option>
                            <option value={"Cédula de extranjería"} >Cédula de extranjería</option>
                            <option value={"Registro civil"}>Registro civil</option> 
                        </select>

                        <label className="etiquetas-empleados me-2 mt-2 mb-1">Número de documento*</label>
                        <input className="form-control form-control-sm mb-2" onChange={cambiarIdentificacion} value={identificacion} id="numero-id" name="numero-id" />

                        <label className="etiquetas-empleados me-2 mt-1 mb-1">Email*</label>
                        <input className="form-control form-control-sm mb-2" type="email" onChange={cambiarEmail} value={email} id="email" name="email" />

                        <label className="etiquetas-empleados me-2 mt-2 mb-1">Username*</label>
                        <input className="form-control form-control-sm mb-2" onChange={cambiarUsername} value={username} id="username" name="username" />

                        <div className="d-flex mt-2">
                            <div className="form-control form-control-sm me-2 mt-1 mb-1">
                                <label className="etiquetas-empleados">Contraseña*</label>
                                <input className="form-control form-control-sm mb-2" type="password" onChange={cambiarPassword} value={password} id="password" name="password" />
                            </div>
                  
                            <div className="form-control form-control-sm me-2 mt-1 mb-1">
                                <label className="etiquetas-empleados">Confirmar contraseña*</label>
                                <input className="form-control form-control-sm mb-2" type="password" onChange={cambiarConfirm} value={passwordConfirm} id="password-confirm" name="password-confirm" />
                            </div>

                            <div className="d-flex">
                                <div className="form-check form-switch form-switch-lg">
                                    <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" onChange={cambiarAdmin} />
                                    <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Admin*</label>
                                </div>
                            </div>
                        </div>
                        <div className="form-control form-control-sm me-2 mt-1 mb-1">
                            <label className="etiquetas-empleados">Area*</label>
                            <input className="form-control form-control-sm mb-2" onChange={cambiarArea} value={area} id="area" name="area" /> 
                        </div>
                        <div className="me-2 mt-1 mb-1 btn btn-primary form-control form-control-sm text-white" type="button" align="center">
                            <button onClick={guardarEmpleado} className="btn" id="registro-empleado" name="registro-empleado">{boton}</button>
                        </div>
                        <div id="mensaje"><p className="parrafo mt-3" align="center"><button onClick={cancelar}>Cancelar</button></p></div>
                        <div id="mensaje">{mensaje}</div>
                    </div>
                </form>
                <div>
                    <img src={Imagenes.empleadosForm} alt=""></img>
                </div>
            </div>
        </div>
    );
}

export default FormEmpleados;