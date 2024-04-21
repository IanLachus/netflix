import axios from "axios"; // Importa axios para hacer solicitudes HTTP
import { getUpcomingMovie } from "../redux/movieSlice"; // Importa la acción getUpcomingMovie del slice de película
import { Upcoming_Movie, options } from "../utils/constant"; // Importa la URL de la API y las opciones de solicitud desde el archivo de constantes
import { useDispatch } from "react-redux"; // Importa el hook useDispatch de react-redux para despachar acciones

// Define el hook personalizado useUpcomingMovies
const useUpcomingMovies = async () => {
    const dispatch = useDispatch(); // Obtiene la función dispatch del almacenamiento global de Redux

    try {
        // Realiza una solicitud GET para obtener las próximas películas
        const res = await axios.get(Upcoming_Movie, options);
        
        // Despacha la acción getUpcomingMovie con las próximas películas obtenidas
        dispatch(getUpcomingMovie(res.data.results));
    } catch (error) {
        console.log(error); // Maneja cualquier error de solicitud
    }
}

// Exporta el hook personalizado useUpcomingMovies para su uso en otros componentes
export default useUpcomingMovies;
