// Importa express para configurar las rutas del usuario
import express from "express";
import {
  Login,
  Logout,
  Register,
  ForgotPassword,
  ResetPassword
} from "../controllers/user.js"; // Importa las funciones del controlador de usuario

// Crea un enrutador de express
const router = express.Router();

// Configura las rutas y los métodos HTTP asociados
router.route("/register").post(Register); // Ruta para registrar un nuevo usuario
router.route("/login").post(Login); // Ruta para iniciar sesión de un usuario
router.route("/logout").get(Logout); // Ruta para cerrar sesión de un usuario
router.route("/forgot-password").post(ForgotPassword); // Ruta para solicitar restablecimiento de contraseña
router.route("/reset-password").post(ResetPassword); // Ruta para restablecer la contraseña

// Exporta el enrutador para su uso en otras partes de la aplicación
export default router;
