import React from 'react'; // Importa React
import Body from "./components/Body"; // Importa el componente Body desde el directorio components
import { Toaster } from 'react-hot-toast'; // Importa el componente Toaster de react-hot-toast para mostrar notificaciones
import MovieDialog from "./components/MovieDialog"; // Importa el componente MovieDialog desde el directorio components

function App() { // Definición del componente funcional App
  return (
    <div>
      <Body/> {/* Renderiza el componente Body */}
      <Toaster/> {/* Renderiza el componente Toaster para mostrar notificaciones */}
      <MovieDialog/> {/* Renderiza el componente MovieDialog */}
    </div>
  );
}

export default App; // Exporta el componente App como componente predeterminado