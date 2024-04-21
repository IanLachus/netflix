import axios from "axios"; // Importa axios para hacer solicitudes HTTP
import { getNowPlayingMovies } from "../redux/movieSlice"; // Importa la acción getNowPlayingMovies del slice de película
import { Now_Playing_Movie, options } from "../utils/constant"; // Importa la URL de la API y las opciones de solicitud desde el archivo de constantes
import { useDispatch } from "react-redux"; // Importa el hook useDispatch de react-redux para despachar acciones

// Define el hook personalizado useNowPlayingMovies
const useNowPlayingMovies = async () => {
    const dispatch = useDispatch(); // Obtiene la función dispatch del almacenamiento global de Redux

    try {
        // Realiza una solicitud GET para obtener las películas en cartelera
        const res = await axios.get(Now_Playing_Movie, options);
        
        // Despacha la acción getNowPlayingMovies con las películas obtenidas
        dispatch(getNowPlayingMovies(res.data.results));
    } catch (error) {
        console.log(error); // Maneja cualquier error de solicitud
    }
}

// Exporta el hook personalizado useNowPlayingMovies para su uso en otros componentes
export default useNowPlayingMovies;
