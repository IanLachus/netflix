import React from 'react';
import { TMDB_IMG_URL } from '../utils/constant'; // Importa la URL base de las imágenes de TMDB desde las constantes
import { useDispatch } from "react-redux"; // Importa el hook useDispatch de react-redux para despachar acciones
import { getId, setOpen } from '../redux/movieSlice'; // Importa las acciones getId y setOpen del slice de películas

// Define el componente MovieCard
const MovieCard = ({ posterPath, movieId }) => {
  const dispatch = useDispatch(); // Obtiene la función dispatch del almacenamiento global de Redux

  // Si no hay una ruta de póster, devuelve null
  if (posterPath === null) return null;

  // Manejador para abrir la tarjeta de la película
  const handleOpen = () => {
    // Despacha la acción getId con el ID de la película seleccionada
    dispatch(getId(movieId));
    // Despacha la acción setOpen para indicar que la tarjeta de película está abierta
    dispatch(setOpen(true));
  }

  // Renderiza la tarjeta de la película
  return (
    <div className='w-48 pr-2' onClick={handleOpen}>
      {/* Renderiza la imagen de la película con la URL de la imagen de TMDB */}
      <img src={`${TMDB_IMG_URL}/${posterPath}`} alt="movie-banner" />
    </div>
  )
}

// Exporta el componente MovieCard para su uso en otras partes de la aplicación
export default MovieCard;
