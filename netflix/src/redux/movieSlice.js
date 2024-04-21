import { createSlice } from "@reduxjs/toolkit";

// Define el slice de Redux para las películas
const movieSlice = createSlice({
    name: "movie", // Nombre del slice
    initialState: {
        // Estado inicial del slice
        nowPlayingMovies: null, // Películas actualmente en cines
        popularMovie: null, // Películas populares
        topRatedMovies: null, // Películas mejor valoradas
        upcomingMovies: null, // Próximos lanzamientos
        toggle: false, // Estado de alternancia para cambiar entre vistas
        trailerMovie: null, // Trailer de la película seleccionada
        open: false, // Estado para controlar si un diálogo está abierto o cerrado
        id: "", // ID de la película seleccionada
    },
    reducers: {
        // Definición de las acciones (reducers)
        getNowPlayingMovies: (state, action) => {
            // Actualiza el estado con las películas actualmente en cines
            state.nowPlayingMovies = action.payload;
        },
        getPopularMovie: (state, action) => {
            // Actualiza el estado con las películas populares
            state.popularMovie = action.payload;
        },
        getTopRatedMovie: (state, action) => {
            // Actualiza el estado con las películas mejor valoradas
            state.topRatedMovies = action.payload;
        },
        getUpcomingMovie: (state, action) => {
            // Actualiza el estado con los próximos lanzamientos
            state.upcomingMovies = action.payload;
        },
        setToggle: (state) => {
            // Alterna el estado de toggle (cambia entre vistas)
            state.toggle = !state.toggle;
        },
        getTrailerMovie: (state, action) => {
            // Actualiza el estado con el trailer de la película seleccionada
            state.trailerMovie = action.payload;
        },
        setOpen: (state, action) => {
            // Actualiza el estado para controlar si un diálogo está abierto o cerrado
            state.open = action.payload;
        },
        getId: (state, action) => {
            // Actualiza el estado con el ID de la película seleccionada
            state.id = action.payload;
        },
    },
});

// Exporta las acciones (reducers) y el reducer del slice
export const {
    getNowPlayingMovies,
    getPopularMovie,
    getTopRatedMovie,
    getUpcomingMovie,
    setToggle,
    getTrailerMovie,
    setOpen,
    getId,
} = movieSlice.actions;
export default movieSlice.reducer;
