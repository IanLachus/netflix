import axios from "axios"; // Importa axios para hacer solicitudes HTTP
import { getTopRatedMovie } from "../redux/movieSlice"; // Importa la acción getTopRatedMovie del slice de película
import { Top_Rated_Movie, options } from "../utils/constant"; // Importa la URL de la API y las opciones de solicitud desde el archivo de constantes
import { useDispatch } from "react-redux"; // Importa el hook useDispatch de react-redux para despachar acciones

// Define el hook personalizado useTopRatedMovies
const useTopRatedMovies = async () => {
    const dispatch = useDispatch(); // Obtiene la función dispatch del almacenamiento global de Redux

    try {
        // Realiza una solicitud GET para obtener las películas mejor valoradas
        const res = await axios.get(Top_Rated_Movie, options);
        
        // Despacha la acción getTopRatedMovie con las películas mejor valoradas obtenidas
        dispatch(getTopRatedMovie(res.data.results));
    } catch (error) {
        console.log(error); // Maneja cualquier error de solicitud
    }
}

// Exporta el hook personalizado useTopRatedMovies para su uso en otros componentes
export default useTopRatedMovies;
