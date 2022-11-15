import './styles/formulario.css';
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Imagenes from "../../assets/img/imagenes";
import ClientesServicios from "../../servicios/ServicioCliente";
import { useContext } from 'react';
import { ContextoUsuario } from '../../servicios/ContextoUsuario';
import EstadosLogin from '../../enums/EstadoLogin';



const FormularioCliente = () => {

    const LABELS_STYLE = {
      color: "#4972b0", 
      fontWeight: "650"
    }

    const BUTTON_STYLE = {
      width: "100%",
      backgroundColor: "#4972b0",
      color: "white",
      fontWeight: "700"
    }

    const PARAGRAPH_STYLE = {
      color: "#4972b0", 
      fontWeight: "650",
    }

    const IMG_DIV_STYLE = {
      position: "relative"
    }

    const IMG_STYLE = {
      position: "absolute",
      top: "50%"
    }

    // Funcionalidad
    const { id } = useParams();
    const navigateTo = useNavigate();

    const [ nombres, setNombres ] = useState("");
    const [ apellidos, setApellidos ] = useState("");
    const [ username, setUsername ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ passwordConfirm, setPasswordConfirm ] = useState("");
    const [ identificacion, setIdentificacion ] = useState("");
    const [ tipo_identificacion, setTipo_identificacion ] = useState("");
    const [ telefono, setTelefono ] = useState("")
    const [ email, setEmail ] = useState("");
    const [ direccion, setDireccion ] = useState("");
    const [ departamento, setDepartamento ] = useState("");
    const [ ciudad, setCiudad ] = useState("")
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

 
    const guardarCliente = async (event) => {
      event.preventDefault();

      if (password === passwordConfirm) {
        try {
          const cliente = {
            nombres: nombres,
            apellidos: apellidos,
            username: username,
            password: password,
            identificacion: identificacion,
            tipo_identificacion: tipo_identificacion,
            telefono: telefono,
            email: email,
            direccion: direccion 
          }
          if (usuario.id != null) {
            console.log(cliente);
            console.log(usuario.id);
            await ClientesServicios.actualizarCliente(usuario.id, cliente);
            navigateTo("/clienteDashboard") 
          } else {
            await ClientesServicios.guardarCliente(cliente);
            navigateTo("/");
          }
        } catch (error) {
          setMensaje("Ocurrió un error " + error);
        }
      } else {
        setMensaje("El correo o la contraseña no coinciden");
      }
    }

   const cargarCliente = async () => {
      try {
        if (id != null) {
          const respuesta = await ClientesServicios.buscarCliente(id);
          console.log(respuesta.data);
          if (respuesta.data != null) {
              setNombres(respuesta.data.nombres);
              setApellidos(respuesta.data.apellidos);
              setUsername(respuesta.data.username);
              setPassword(respuesta.data.password);
              setPasswordConfirm(respuesta.data.password);
              setIdentificacion(respuesta.data.identificacion);
              setTipo_identificacion(respuesta.data.tipo_identificacion);
              setTelefono(respuesta.data.telefono);
              setEmail(respuesta.data.email);
              setDireccion(respuesta.data.direccion);
            }
            setTitulo("Edita tus datos");
            setBoton("Actualizar mis datos");
        } else {
          setTitulo("Registra tus datos");
          setBoton("Guardar mis datos");
        }
      } catch (error) {
        console.log("Ocurrió un error " + error);
      }
    }

    useEffect(() => {
      revisarSesion();
      cargarCliente();
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

    const cambiarPassword = (event) => {
      setPassword(event.target.value)
    }

    const cambiarConfirm = (event) => {
      setPasswordConfirm(event.target.value)
    }

    const cambiarTelefono = (event) => {
      setTelefono(event.target.value)
    }

    const cambiarEmail = (event) => {
      setEmail(event.target.value)
    }

    const cambiarDireccion = (event) => {
      setDireccion(event.target.value)
    }

    const cambiarIdentificacion = (event) => {
      setIdentificacion(event.target.value)
    }

    const cambiarTipoIdentificacion = (event) => {
      setTipo_identificacion(event.target.value)
    }

    const cambiarDepartamento = (event) => {
      setDepartamento(event.target.value)
    }

    const cambiarCiudad = (event) => {
      setCiudad(event.target.value)
    }

    return(
      <div className="div-principal container d-flex">
        <div className="container m-5">
        <h1 className="titulo-principal mb-4" align="center">{titulo}</h1>
        <form>
            <div className="form-control form-control-sm mb-2">
                <label className="etiquetas me-2 mt-1 mb-1" htmlFor="nombres">Nombres*</label>
                <input className="form-control form-control-sm mb-2" onChange={cambiarNombres} value={nombres} id="nombres" name="nombres" />

                <label className="etiquetas me-2 mt-1 mb-1">Apellidos*</label>
                <input className="form-control form-control-sm mb-2" onChange={cambiarApellidos} value={apellidos} id="apellidos" name="apellidos" />

                <label className="etiquetas me-2 mt-2">Tipo de documento*</label>
                <select className="form-control select select-sm mt-1 mb-1" id="tipo-id" onChange={cambiarTipoIdentificacion} value={tipo_identificacion} name="tipo-id" >
                  <option value={""}>Seleccione una opción</option>
                  <option value={"Cédula"}>Cédula</option>
                  <option value={"Pasaporte"}>Pasaporte</option>
                  <option value={"Cédula de extranjería"} >Cédula de extranjería</option>
                  <option value={"Registro civil"}>Registro civil</option> 
                </select>
              
                <label className="etiquetas me-2 mt-2 mb-1">Número de documento*</label>
                <input className="form-control form-control-sm mb-2" onChange={cambiarIdentificacion} value={identificacion} id="numero-id" name="numero-id" />
                
                <label className="etiquetas me-2 mt-1 mb-1">Email*</label>
                <input className="form-control form-control-sm mb-2" type="email" onChange={cambiarEmail} value={email} id="email" name="email" />
                
                <label className="etiquetas me-2 mt-1 mb-1">Nombre de usuario*</label>
                <input className="form-control form-control-sm mb-2" onChange={cambiarUsername} value={username} id="username" name="username" />
                
                <div className="d-flex mt-2">
                  <div className="form-control form-control-sm me-2 mt-1 mb-1">
                    <label className="etiquetas">Contraseña*</label>
                    <input className="form-control form-control-sm mb-2" type="password" onChange={cambiarPassword} value={password} id="password" name="password" />
                  </div>
                  
                  <div className="form-control form-control-sm me-2 mt-1 mb-1" style={{position: "relative", left: "8px"}}>
                    <label className="etiquetas">Confirmar contraseña*</label>
                    <input className="form-control form-control-sm mb-2" type="password" onChange={cambiarConfirm} value={passwordConfirm} id="password-confirm" name="password-confirm" />
                  </div>
                </div>
                  
                  <div className="form-control form-control-sm me-2 mt-1 mb-1">
                    <label className="etiquetas">Dirección</label>
                    <input className="form-control form-control-sm mb-2" onChange={cambiarDireccion} value={direccion} id="direccion" name="direccion" />
                  </div>
                  
                  <div className="d-flex">
                    <div className="form-control form-control-sm me-2 mt-1 mb-1">
                      <label className="etiquetas">Departamento</label>
                      <input className="form-control form-control-sm mb-2" onChange={cambiarDepartamento} value={departamento} id="departamento" name="departamento" /> 
                    </div>
                    
                    <div className="form-control form-control-sm me-2 mt-1 mb-1" style={{position: "relative", left: "8px"}}>
                      <label className="etiquetas">Ciudad</label>
                      <input className="form-control form-control-sm mb-2" onChange={cambiarCiudad} value={ciudad} id="ciudad" name="ciudad" />
                    </div>
                  </div>
                  
                  <div className="form-control form-control-sm me-2 mt-1 mb-1">
                    <label className="etiquetas">Número telefónico*</label>
                    <input className="form-control form-control-sm mb-2" onChange={cambiarTelefono} value={telefono} id="numero-telefono" name="numero-telefono" />
                  </div>
                  
                  <div className="me-2 mt-1 mb-1" align="center">
                    <button onClick={guardarCliente} className="btn" style={BUTTON_STYLE} id="registro" name="registro">{boton}</button>
                  </div>
                  <div id="mensaje">{mensaje}</div>
                  
                  <p className="parrafo mt-3" style={PARAGRAPH_STYLE} align="center"><a href="/">Ya tengo cuenta</a></p>
            
            </div>
          </form>
        </div>
        <div className="m-5" style={IMG_DIV_STYLE}>
          <img src={Imagenes.img3} alt="" height={"250"} width={"300"} style={IMG_STYLE}></img>
        </div>  
      </div>
    );
} 

export default FormularioCliente;