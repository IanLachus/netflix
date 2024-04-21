// Importa React y otros hooks y componentes necesarios
import React, { useEffect } from 'react';
import Header from './Header'; // Importa el componente Header
import { useSelector } from "react-redux"; // Importa el hook useSelector de react-redux para acceder al estado global de Redux
import { useNavigate } from "react-router-dom"; // Importa el hook useNavigate de react-router-dom para la navegación programática
import MainContainer from './MainContainer'; // Importa el componente MainContainer
import MovieContainer from './MovieContainer'; // Importa el componente MovieContainer
import useNowPlayingMovies from '../hooks/useNowPlayingMovies'; // Importa el custom hook useNowPlayingMovies
import usePopularMovies from '../hooks/usePopularMovies'; // Importa el custom hook usePopularMovies
import useTopRatedMovies from '../hooks/useTopRatedMovies'; // Importa el custom hook useTopRatedMovies
import useUpcomingMovies from '../hooks/useUpcomingMovies'; // Importa el custom hook useUpcomingMovies
import SearchMovie from './SearchMovie'; // Importa el componente SearchMovie

// Define el componente Browse
const Browse = () => {
    const user = useSelector(store => store.app.user); // Obtiene el usuario del estado global de Redux
    const toggle = useSelector(store => store.movie.toggle); // Obtiene el estado de toggle del estado global de Redux
    const navigate = useNavigate(); // Obtiene la función navigate para la navegación programática

    // Invoca los custom hooks para obtener las películas
    useNowPlayingMovies();
    usePopularMovies();
    useTopRatedMovies();
    useUpcomingMovies();

    // Efecto secundario para redirigir al usuario si no está autenticado
    useEffect(() => {
        if (!user) {
            navigate("/"); // Redirige al usuario a la página de inicio de sesión si no está autenticado
        }
    }, []);

    // Renderiza el componente
    return (
        <div >
            <Header /> {/* Renderiza el componente Header */}
            <div>
                {/* Renderiza el componente SearchMovie si toggle está activado, de lo contrario, renderiza MainContainer y MovieContainer */}
                {
                    toggle ? <SearchMovie /> : (
                        <>
                            <MainContainer />
                            <MovieContainer />
                        </>

                    )
                }
            </div>
        </div>
    )
}

// Exporta el componente Browse para su uso en otras partes de la aplicación
export default Browse
