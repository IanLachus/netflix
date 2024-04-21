import React from 'react';
import MovieList from './MovieList'; // Importa el componente MovieList
import { useSelector } from "react-redux"; // Importa el hook useSelector de react-redux para acceder al estado global de Redux

// Define el componente MovieContainer
const MovieContainer = () => {
  // Obtiene el estado de las películas desde el almacenamiento global de Redux
  const movie = useSelector(store => store.movie);
  
  // Renderiza el contenedor de películas
  return (
    <div className='bg-black'>
      <div className='-mt-52 relative z-10' >
        {/* Renderiza la lista de películas populares */}
        <MovieList title={"Peliculas Populares"} movies={movie.popularMovie}/>
        {/* Renderiza la lista de películas ahora en reproducción */}
        <MovieList title={"Top Nacionales"} movies={movie.nowPlayingMovies}/>
        {/* Renderiza la lista de películas mejor valoradas */}
        <MovieList title={"Favoritas del Público"} movies={movie.topRatedMovies}/>
        {/* Renderiza la lista de próximos lanzamientos */}
        <MovieList title={"Proximos Lanzamientos"} movies={movie.upcomingMovies}/>
      </div>
    </div>
  )
}

// Exporta el componente MovieContainer para su uso en otras partes de la aplicación
export default MovieContainer;
