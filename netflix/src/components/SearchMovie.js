import React, { useState } from 'react';
import axios from "axios"; // Importa axios para hacer solicitudes HTTP
import { SEARCH_MOVIE_URL, options } from '../utils/constant'; // Importa la URL de búsqueda de películas y las opciones de solicitud
import { useDispatch, useSelector } from "react-redux"; // Importa los hooks useDispatch y useSelector de react-redux para despachar acciones y acceder al estado global de Redux
import { setSearchMovieDetails } from '../redux/searchSlice'; // Importa la acción setSearchMovieDetails del slice de búsqueda
import { setLoading } from '../redux/userSlice'; // Importa la acción setLoading del slice de usuario
import MovieList from './MovieList'; // Importa el componente MovieList para mostrar la lista de películas

// Define el componente SearchMovie
const SearchMovie = () => {
    // Estado para almacenar el valor de búsqueda
    const [searchMovie, setSearchMovie] = useState("");
    const dispatch = useDispatch(); // Obtiene la función dispatch del almacenamiento global de Redux
    const isLoading = useSelector(store => store.app.isLoading); // Obtiene el estado de carga desde el almacenamiento global de Redux
    const { movieName, searchedMovie } = useSelector(store => store.searchMovie); // Obtiene el estado de la película buscada desde el almacenamiento global de Redux
    
    // Manejador para enviar la solicitud de búsqueda de películas
    const submitHandler = async (e) => {
        e.preventDefault(); // Evita el comportamiento predeterminado del formulario
        dispatch(setLoading(true)); // Establece isLoading en true
        try {
            // Realiza una solicitud GET para buscar películas con el término de búsqueda proporcionado
            const res = await axios.get(`${SEARCH_MOVIE_URL}${searchMovie}&include_adult=false&language=en-US&page=1`, options);
            const movies = res?.data?.results; // Obtiene los resultados de la búsqueda
            dispatch(setSearchMovieDetails({ searchMovie, movies })); // Almacena los detalles de la película buscada en el estado global de Redux
        } catch (error) {
            console.log(error); // Maneja cualquier error de solicitud
        } finally {
            dispatch(setLoading(false)); // Establece isLoading en false después de que la solicitud se complete
        }
        setSearchMovie(""); // Limpia el campo de búsqueda después de enviar la solicitud
    }

    // Renderiza el componente SearchMovie
    return (
        <>
            <div className='bg-red-100'></div>
            <div className='flex justify-center pt-[10%] w-[100%] bg-'>
                {/* Formulario para ingresar el término de búsqueda */}
                <form onSubmit={submitHandler} className='w-[50%]'>
                    <div className='flex justify-between shadow-md border-2 p-2 border-gray-200 rounded-lg w-[100%]'>
                        <input value={searchMovie} onChange={(e) => { setSearchMovie(e.target.value) }} className='w-full outline-none rounded-md text-lg' type="text" placeholder='Buscar películas' />
                        {/* Botón para iniciar la búsqueda */}
                        <button className='bg-red-800 text-white rounded-md px-4 py-2'>{isLoading ? "cargando..." : "Search"}</button>
                    </div>
                </form>
            </div>
            {/* Renderiza la lista de películas buscadas si se encontraron resultados, de lo contrario, muestra un mensaje de error */}
            {
                searchedMovie ? ( <MovieList title={movieName} searchMovie={true} movies={searchedMovie}/>) : (<h1>¡Película no encontrada!</h1>)
            }
        </>
    )
}

// Exporta el componente SearchMovie para su uso en otras partes de la aplicación
export default SearchMovie