import React from 'react';
import { IoIosArrowDropdown } from "react-icons/io"; // Icono de flecha hacia abajo
import { useSelector, useDispatch } from "react-redux"; // Hooks para acceder al estado global de Redux y despachar acciones
import { API_END_POINT } from '../utils/constant'; // Constante que contiene el punto final de la API
import axios from "axios"; // Para realizar solicitudes HTTP
import { setUser } from '../redux/userSlice'; // Acción setUser del slice de usuario
import { useNavigate } from "react-router-dom"; // Hook para la navegación programática
import toast from "react-hot-toast"; // Para mostrar notificaciones
import { setToggle } from '../redux/movieSlice'; // Acción setToggle del slice de películas

const Header = () => { 
    // Obtiene el usuario y el estado de toggle del almacenamiento global de Redux
    const user = useSelector((store) => store.app.user);
    const toggle = useSelector(store => store.movie.toggle);
    // Obtiene la función dispatch del almacenamiento global de Redux
    const dispatch = useDispatch();
    // Obtiene la función navigate para la navegación programática
    const navigate = useNavigate();

    // Manejador para cerrar sesión
    const logoutHandler = async () => {
        try {
            // Realiza una solicitud HTTP para cerrar sesión en el servidor
            const res = await axios.get(`${API_END_POINT}/logout`);
            if (res.data.success) {
                // Muestra una notificación de éxito si la solicitud tiene éxito
                toast.success(res.data.message);
            }
            // Actualiza el estado del usuario en Redux a null
            dispatch(setUser(null));
            // Redirige al usuario a la página de inicio de sesión
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    }

    // Manejador para alternar entre las vistas de búsqueda y la página de inicio
    const toggleHandler = () => {
        dispatch(setToggle()); // Despacha la acción setToggle para cambiar el estado de toggle en Redux
    }
 
    // Renderiza el componente Header
    return (
        <div className='absolute z-10 flex w-full items-center justify-between px-6 bg-gradient-to-b from-black'>
            {/* Renderiza el logo de Netflix */}
            <img className='w-56' src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1198px-Netflix_2015_logo.svg.png" alt="netflix-logo" />
            {
                // Si hay un usuario autenticado
                user && (
                    <div className='flex items-center'>
                        {/* Icono de flecha hacia abajo */}
                        <IoIosArrowDropdown size="24px" color='white' />
                        {/* Nombre de usuario */}
                        <h1 className='text-lg font-medium text-white'>{user.fullName}</h1>
                        <div className='ml-4'>
                            {/* Botón para cerrar sesión */}
                            <button onClick={logoutHandler} className='bg-red-800 text-white px-4 py-2 rounded'>Salir</button>
                            {/* Botón para alternar entre la vista de búsqueda y la página de inicio */}
                            <button onClick={toggleHandler} className='bg-red-800 text-white px-4 py-2 ml-2 rounded'>{toggle ? "Inicio" : "Buscar pelicula"}</button>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default Header
