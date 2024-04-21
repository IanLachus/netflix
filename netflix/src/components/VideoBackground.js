import React from 'react';
import useMovieById from '../hooks/useMovieById'; // Importa el hook personalizado useMovieById
import { useSelector } from "react-redux"; // Importa el hook useSelector de react-redux para acceder al estado global de Redux

// Define el componente VideoBackground
const VideoBackground = ({ movieId, bool }) => {
    const trailerMovie = useSelector(store => store.movie.trailerMovie); // Obtiene el tráiler de la película desde el estado global de Redux
    
    useMovieById(movieId); // Ejecuta el hook personalizado useMovieById para obtener detalles de la película por su ID

    // Renderiza el componente VideoBackground
    return (
        <div className='w-[vw] overflow-hidden'>
            {/* Renderiza un iframe de YouTube para reproducir el tráiler de la película */}
            <iframe
                className={`${bool ? "w-[100%]" : "w-screen aspect-video"}`}
                src={`https://www.youtube.com/embed/${trailerMovie?.key}?si=HorxQfzFY2_TAO1W&autoplay=1&mute=1`}
                title="YouTube video player"
                frameBorder="0"
                allowFullScreen>
            </iframe>
        </div>
    )
}

// Exporta el componente VideoBackground para su uso en otras partes de la aplicación
export default VideoBackground;
