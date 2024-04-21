//setp-1
//const express = require("express")
// Importa express para crear la aplicación del servidor
import express from "express";
// Importa dotenv para cargar las variables de entorno desde el archivo .env
import dotenv from "dotenv";
// Importa la función de conexión a la base de datos desde el archivo database.js
import databaseConnection from "./utils/database.js";
// Importa cookie-parser para manejar las cookies en las solicitudes
import cookieParser from "cookie-parser";
// Importa las rutas del usuario desde userRoute.js
import userRoute from "./routes/userRoute.js";
// Importa cors para permitir el intercambio de recursos entre dominios
import cors from "cors";

// Configura la URI de conexión a la base de datos MongoDB
const MONGO_URI="mongodb+srv://ianarmoes:netflix2.0@cluster0.zyau9un.mongodb.net/"

// Llama a la función databaseConnection para establecer la conexión con la base de datos
databaseConnection();

// Puerto en el que escucha el servidor
const PORT=8080

// Crea una aplicación express
const app = express();

// Middlewares
// Configura express para analizar solicitudes con cuerpos codificados en URL y JSON
app.use(express.urlencoded({extended:true}));
app.use(express.json());
// Configura express para analizar cookies
app.use(cookieParser());

// Configura las opciones de cors
const corsOptions = {
    origin:'http://localhost:3000', // Origen permitido
    credentials:true // Permite el envío de cookies de autenticación
}

// Habilita cors con las opciones configuradas
app.use(cors(corsOptions));
 
// Rutas de la API
app.use("/api/v1/user", userRoute); // Rutas relacionadas con los usuarios

// Inicia el servidor en el puerto especificado
app.listen(PORT,() => {
    console.log(`Server listen at port ${PORT}`);
});
