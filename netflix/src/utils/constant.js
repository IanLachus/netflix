// URL base del endpoint de la API de usuario
export const API_END_POINT = "http://localhost:8080/api/v1/user";

// Opciones de solicitud para las llamadas a la API de TMDb
export const options = {
    method: 'GET', // Método de solicitud GET
    headers: { // Cabeceras de la solicitud
        accept: 'application/json', // Tipo de contenido aceptado
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZGJlZjViMDUzNWE3OGYwMjllMTQ0NDE5NTQ4MjM4MCIsInN1YiI6IjY1MDRhMjNkNTllOGE5MDExZWNhYTVjZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LTBaAb_2NPRGPr2HeGszyFDP-onLh-fiL7fzmnOFZUg' // Token de autorización
    }
};

// URL del endpoint de películas en cartelera
export const Now_Playing_Movie = "https://api.themoviedb.org/3/movie/now_playing";

// URL del endpoint de películas populares
export const Popular_Movie = "https://api.themoviedb.org/3/movie/popular";

// URL del endpoint de películas mejor valoradas
export const Top_Rated_Movie = "https://api.themoviedb.org/3/movie/top_rated";

// URL del endpoint de próximos lanzamientos de películas
export const Upcoming_Movie = "https://api.themoviedb.org/3/movie/upcoming";

// URL base para buscar películas en la base de datos de TMDb
export const SEARCH_MOVIE_URL = "https://api.themoviedb.org/3/search/movie?query=";

// URL base para las imágenes de películas en la base de datos de TMDb
export const TMDB_IMG_URL = "https://image.tmdb.org/t/p/w500";
