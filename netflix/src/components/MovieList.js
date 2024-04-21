import React from 'react';
import MovieCard from './MovieCard'; // Importa el componente MovieCard

// Define el componente MovieList
const MovieList = ({ title, movies, searchMovie = false }) => {
    // Renderiza el componente MovieList
    return (
        <div className='px-8'>
            {/* Renderiza el título de la lista de películas */}
            <h1 className={`${searchMovie ? "text-black" : "text-white"} text-3xl py-3 `}>{title}</h1>
            {/* Contenedor de películas con desplazamiento horizontal */}
            <div className='flex overflow-x-auto no-scrollbar cursor-pointer  '>
                <div className='flex items-center'>
                    {/* Mapea sobre las películas y renderiza una tarjeta de película para cada una */}
                    {
                        movies?.map((movie) => { 
                            return (
                                <MovieCard key={movie.id} movieId={movie.id} posterPath={movie.poster_path} />
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

// Exporta el componente MovieList para su uso en otras partes de la aplicación
export default MovieList