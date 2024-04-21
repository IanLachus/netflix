import axios from "axios"; // Importa axios para hacer solicitudes HTTP
import { options } from '../utils/constant'; // Importa las opciones de solicitud desde el archivo de constantes
import { useDispatch } from "react-redux"; // Importa el hook useDispatch de react-redux para despachar acciones
import { getTrailerMovie } from '../redux/movieSlice'; // Importa la acción getTrailerMovie del slice de película
import { useEffect } from "react"; // Importa useEffect de React para ejecutar efectos secundarios en componentes funcionales

// Define el hook personalizado useMovieById
const useMovieById = async (movieId) => {
  const dispatch = useDispatch(); // Obtiene la función dispatch del almacenamiento global de Redux
  
  // Define un efecto secundario que se ejecuta cuando el componente se monta
  useEffect(() => {
    // Función asincrónica para obtener detalles de la película por su ID
    const getMovieById = async () => {
      try {
        // Realiza una solicitud GET para obtener los videos de la película por su ID
        const res = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/videos`, options);

        // Filtra los resultados para obtener el tráiler de la película
        const trailer = res?.data?.results?.filter((item) => {
          return item.type === "Trailer";
        });

        // Despacha la acción getTrailerMovie con el tráiler de la película obtenido
        dispatch(getTrailerMovie(trailer.length > 0 ? trailer[0] : res.data.results[0]));
      } catch (error) {
        console.log(error); // Maneja cualquier error de solicitud
      }
    }
    getMovieById(); // Llama a la función getMovieById para obtener los detalles de la película
  },[]); // Este efecto solo se ejecuta una vez, ya que no tiene dependencias

}

// Exporta el hook personalizado useMovieById para su uso en otros componentes
export default useMovieById;
