// Importa mongoose para definir el esquema de usuario
import mongoose from "mongoose";

// Define el esquema de usuario
const userSchema = new mongoose.Schema(
  {
    fullName: {
      // Nombre completo del usuario
      type: String,
      require: true, // Es obligatorio
    },
    email: {
      // Correo electrónico del usuario
      type: String,
      require: true, // Es obligatorio
    },
    password: {
      // Contraseña del usuario
      type: String,
      require: true, // Es obligatorio
    },
    resetPasswordToken: String, // Token para restablecimiento de contraseña
    resetTokenExpire: Date, // Fecha de expiración del token de restablecimiento de contraseña
  },
  { timestamps: true }
); // Se registran los timestamps (createdAt, updatedAt)

// Exporta el modelo de usuario creado a partir del esquema definido
export const User = mongoose.model("User", userSchema);
