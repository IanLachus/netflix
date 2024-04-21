import { createSlice } from "@reduxjs/toolkit";

// Define el slice de Redux para la búsqueda de películas
const searchSlice = createSlice({
    name: "search", // Nombre del slice
    initialState: {
        // Estado inicial del slice
        movieName: null, // Nombre de la película buscada
        searchedMovie: null, // Resultados de la búsqueda de películas
    },
    reducers: {
        // Definición de las acciones (reducers)
        setSearchMovieDetails: (state, action) => {
            // Actualiza el estado con los detalles de la búsqueda de películas
            const { searchMovie, movies } = action.payload;
            state.movieName = searchMovie; // Actualiza el nombre de la película buscada
            state.searchedMovie = movies; // Actualiza los resultados de la búsqueda de películas
        },
    },
});

// Exporta las acciones (reducers) y el reducer del slice
export const { setSearchMovieDetails } = searchSlice.actions;
export default searchSlice.reducer;
