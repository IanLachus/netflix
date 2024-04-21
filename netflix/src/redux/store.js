import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"; // Importa el reducer del slice de usuario
import movieReducer from "./movieSlice"; // Importa el reducer del slice de películas
import searchSlice from "./searchSlice"; // Importa el reducer del slice de búsqueda

// Configura la tienda Redux
const store = configureStore({
    reducer: {
        // Define los reducers para cada slice
        app: userReducer, // Reducer del slice de usuario
        movie: movieReducer, // Reducer del slice de películas
        searchMovie: searchSlice, // Reducer del slice de búsqueda
    },
});

export default store; // Exporta la tienda Redux configurada
