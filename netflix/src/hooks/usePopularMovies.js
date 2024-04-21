import axios from "axios"; // Importa axios para hacer solicitudes HTTP
import { Popular_Movie, options } from '../utils/constant'; // Importa la URL de la API y las opciones de solicitud desde el archivo de constantes
import { getPopularMovie } from '../redux/movieSlice'; // Importa la acción getPopularMovie del slice de película
import { useDispatch } from "react-redux"; // Importa el hook useDispatch de react-redux para despachar acciones

// Define el hook personalizado usePopularMovies
const usePopularMovies = async () => {
    const dispatch = useDispatch(); // Obtiene la función dispatch del almacenamiento global de Redux

    try {
        // Realiza una solicitud GET para obtener las películas populares
        const res = await axios.get(Popular_Movie, options);
        
        // Despacha la acción getPopularMovie con las películas populares obtenidas
        dispatch(getPopularMovie(res.data.results));
    } catch (error) {
        console.log(error); // Maneja cualquier error de solicitud
    }
}
// Exporta el hook personalizado usePopularMovies para su uso en otros componentes
export default usePopularMovies;