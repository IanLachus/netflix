import React, { useState } from 'react';
import Header from './Header'; // Importa el componente Header
import axios from "axios"; // Importa axios para realizar solicitudes HTTP
import { API_END_POINT } from '../utils/constant'; // Importa la constante API_END_POINT que contiene el punto final de la API
import toast from "react-hot-toast"; // Importa toast para mostrar notificaciones
import { useNavigate } from "react-router-dom"; // Importa el hook useNavigate de react-router-dom para la navegación programática
import { useDispatch, useSelector } from "react-redux"; // Importa los hooks useDispatch y useSelector de react-redux para despachar acciones y acceder al estado global de Redux
import { setLoading, setUser } from '../redux/userSlice'; // Importa las acciones setLoading y setUser del slice de usuario

// Define el componente Login
const Login = () => {
    // Estados locales para gestionar los datos del formulario y el estado de inicio de sesión
    const [isLogin, setIsLogin] = useState(false);
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate(); // Obtiene la función navigate para la navegación programática
    const dispatch = useDispatch(); // Obtiene la función dispatch del almacenamiento global de Redux

    // Obtiene el estado de carga desde el almacenamiento global de Redux
    const isLoading = useSelector(store => store.app.isLoading);
 
    // Manejador para cambiar entre el modo de inicio de sesión y el modo de registro+
    const loginHandler = () => {
        setIsLogin(!isLogin);
    }

    // Manejador para obtener los datos del formulario y enviar la solicitud al servidor
    const getInputData = async (e) => {
        e.preventDefault(); // Evita el comportamiento por defecto del formulario
        dispatch(setLoading(true)); // Activa el estado de carga

        if (isLogin) {
            // Si está en modo de inicio de sesión
            const user = { email, password }; // Crea un objeto de usuario con los datos del formulario
            try {
                // Realiza una solicitud HTTP para iniciar sesión en el servidor
                const res = await axios.post(`${API_END_POINT}/login`, user, {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true // Incluye las credenciales en la solicitud
                });
                if (res.data.success) {
                    // Si la solicitud es exitosa, muestra una notificación de éxito
                    toast.success(res.data.message);
                }
                // Actualiza el estado del usuario en Redux con los datos del usuario obtenidos de la respuesta
                dispatch(setUser(res.data.user));
                // Redirige al usuario a la página de navegación ('/browse')
                navigate("/browse");
            } catch (error) {
                // Si hay un error, muestra una notificación de error
                toast.error(error.response.data.message);
                console.log(error);
            } finally {
                // Desactiva el estado de carga
                dispatch(setLoading(false));
            }
        } else {
            // Si está en modo de registro
            dispatch(setLoading(true)); // Activa el estado de carga
            const user = { fullName, email, password }; // Crea un objeto de usuario con los datos del formulario
            try {
                // Realiza una solicitud HTTP para registrar al usuario en el servidor
                const res = await axios.post(`${API_END_POINT}/register`, user, {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true // Incluye las credenciales en la solicitud
                });

                if (res?.data?.success) {
                    // Si la solicitud es exitosa, muestra una notificación de éxito
                    toast.success(res.data.message);
                }
                // Cambia al modo de inicio de sesión después de registrar al usuario
                setIsLogin(true);
            } catch (error) {
                // Si hay un error, muestra una notificación de error
                toast.error(error.response.data.message);
                console.log(error);
            } finally {
                // Desactiva el estado de carga
                dispatch(setLoading(false));
            }
        }
        // Reinicia los estados del formulario después de enviar la solicitud
        setFullName("");
        setEmail("");
        setPassword("");
    }

    // Renderiza el componente Login
    return (
        <div>
            {/* Renderiza el componente Header */}
            <Header />
            <div className='absolute'>
                {/* Renderiza la imagen de fondo */}
                <img className='w-[100vw] h-[100vh] bg-cover' src="https://assets.nflxext.com/ffe/siteui/vlv3/dc1cf82d-97c9-409f-b7c8-6ac1718946d6/14a8fe85-b6f4-4c06-8eaf-eccf3276d557/IN-en-20230911-popsignuptwoweeks-perspective_alpha_website_medium.jpg" alt="banner" />
            </div>
            {/* Formulario de inicio de sesión o registro */}
            <form onSubmit={getInputData} className='flex flex-col w-3/12 p-12 my-36 left-0 right-0  mx-auto items-center justify-center absolute rounded-md bg-black opacity-90'>
                <h1 className='text-3xl text-white mb-5 font-bold'>{isLogin ? "Iniciar Sesión" : "Registrarse"}</h1>
                <div className='flex flex-col'>
                    {/* Campo de nombre solo visible en el modo de registro */}
                    {
                        !isLogin && <input value={fullName} onChange={(e) => setFullName(e.target.value)} type='text' placeholder='Nombre' className='outline-none p-3 my-2 rounded-sm bg-gray-800 text-white' />
                    }
                    {/* Campo de correo */}
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type='email' placeholder='Correo' className='outline-none p-3 my-2 rounded-sm bg-gray-800 text-white' />
                    {/* Campo de contraseña */}
                    <input value={password} onChange={(e) => setPassword(e.target.value)} type='password' placeholder='Contraseña' className='outline-none p-3 my-2 rounded-sm bg-gray-800 text-white' />
                    {/* Botón para enviar el formulario */}
                    <button type='submit' className='bg-red-600 mt-6 p-3 text-white rounded-sm font-medium'>{`${isLoading ? "cargando..." : (isLogin ? "Iniciar Sesión" : "Registrarse")}`}</button>
                    {/* Mensaje para alternar entre el modo de inicio de sesión y el modo de registro */}
                    <p className='text-white mt-2'>{isLogin ? "¿Nuevo en Netflix?" : "¿Ya tienes una cuenta?"}<span onClick={loginHandler} className='ml-1 text-blue-900 font-medium cursor-pointer'>{isLogin ? "Registrarse" : "Iniciar Sesión"}</span></p>
                    {/* /forgot-password */}
                    <a class="text-blue-900 font-semibold hover:font-extrabold mt-2 text-center" href="/forgot-password">{isLogin ? "Olvidé mi contraseña" : ""}</a>
                </div>
            </form>
        </div>
    )
}

// Exporta el componente Login para su uso en otras partes de la aplicación
export default Login
