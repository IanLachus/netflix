import React from 'react';
import VideoTitle from './VideoTitle'; // Importa el componente VideoTitle
import VideoBackground from './VideoBackground'; // Importa el componente VideoBackground
import { useSelector } from "react-redux"; // Importa el hook useSelector de react-redux para acceder al estado global de Redux

// Define el componente MainContainer
const MainContainer = () => {
  // Obtiene la lista de películas actualmente en reproducción desde el almacenamiento global de Redux
  const movie = useSelector(store => store.movie?.nowPlayingMovies);
  
  // Si no hay datos de la película, se devuelve temprano
  if (!movie) return; // Early return en React

  // Obtiene la información de la quinta película de la lista
  const { overview, id, title } = movie[4];
  
  // Renderiza el componente MainContainer
  return (
    <div>
        {/* Renderiza el título y la descripción de la película */}
        <VideoTitle title={title} overview={overview}/>
        {/* Renderiza el fondo de video de la película */}
        <VideoBackground movieId={id}/>
    </div>
  )
}

// Exporta el componente MainContainer para su uso en otras partes de la aplicación
export default MainContainer
