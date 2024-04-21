// Importa mongoose para conectarse a la base de datos MongoDB
import mongoose from "mongoose";
// Importa dotenv para cargar las variables de entorno desde el archivo .env
import dotenv from "dotenv";

// Configura la URI de conexión a la base de datos MongoDB
const MONGO_URI =
  "mongodb+srv://ianarmoes:netflix2.0@cluster0.zyau9un.mongodb.net/";

// Función para establecer la conexión con la base de datos
const databaseConnection = () => {
  // Conecta mongoose a la base de datos utilizando la URI especificada
  mongoose
    .connect(MONGO_URI)
    .then(() => {
      console.log("mongodb connected successfully"); // Mensaje de éxito si la conexión es exitosa
    })
    .catch((error) => {
      console.log(error); // Mensaje de error si la conexión falla
    });
};

// Exporta la función databaseConnection para que pueda ser utilizada en otras partes de la aplicación
export default databaseConnection;
