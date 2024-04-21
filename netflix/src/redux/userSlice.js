import { createSlice } from "@reduxjs/toolkit";

// Define el slice de usuario
const userSlice = createSlice({
    name: "user", // Nombre del slice
    initialState: {
        user: null, // Estado inicial del usuario
        isLoading: false, // Estado inicial de carga
    },
    reducers: {
        // Define las acciones
        setUser: (state, action) => {
            // Reducer para establecer el usuario
            state.user = action.payload; // Establece el usuario con el valor proporcionado en la acción
        },
        setLoading: (state, action) => {
            // Reducer para establecer la carga
            state.isLoading = action.payload; // Establece el estado de carga con el valor proporcionado en la acción
        },
    },
});

// Exporta las acciones del slice de usuario
export const { setUser, setLoading } = userSlice.actions;

// Exporta el reducer del slice de usuario
export default userSlice.reducer;
