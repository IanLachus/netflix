// Se importan los módulos necesarios
import { User } from "../models/userModel.js"; // Importa el modelo de usuario
import bcryptjs from "bcryptjs"; // Importa bcryptjs para el hashing de contraseñas
import jwt from "jsonwebtoken"; // Importa jwt para la generación de tokens de autenticación
import crypto from "crypto"; // Importa crypto para la generación de tokens de restablecimiento de contraseña
import nodemailer from "nodemailer"; // Importa nodemailer para el envío de correos electrónicos

// Función para manejar el inicio de sesión de los usuarios
export const Login = async (req, res) => {
  const { email, password } = req.body; // Obtiene el correo electrónico y la contraseña del cuerpo de la solicitud

  // Verifica si el correo electrónico o la contraseña no están presentes
  if (!email || !password) {
    return res.status(401).json({
      message: "Datos incorrectos",
      success: false,
    });
  }

  try {
    // Busca un usuario en la base de datos con el correo electrónico proporcionado
    const user = await User.findOne({ email });
    if (!user) {
      // Si no se encuentra ningún usuario con el correo electrónico proporcionado
      return res.status(401).json({
        message: "Correo o contraseña incorrectos",
        success: false,
      });
    }

    // Compara la contraseña proporcionada con la contraseña almacenada en la base de datos
    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      // Si las contraseñas no coinciden
      return res.status(401).json({
        message: "Correo o contraseña incorrectos",
        success: false,
      });
    }

    const token = jwt.sign(tokenData, "cualwiurevarisimajuajaj", {
      expiresIn: "1h",
    });

    res.cookie("token", token, { httpOnly: true });

    return res.status(200).json({
      message: `¡Bienvenido de vuelta ${user.fullName}!`, // Mensaje de bienvenida
      user,
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: `error del servidor`,
      success: false,
    });
  }
};

// Función para cerrar la sesión de un usuario
export const Logout = async (req, res) => {
  return res
    .status(200)
    .cookie("token", "", { expiresIn: new Date(Date.now()), httpOnly: true }) // Elimina la cookie de token de autenticación
    .json({
      message: "Sesión cerrada correctamente.",
      success: true,
    });
};

// Función para registrar un nuevo usuario
export const Register = async (req, res) => {
  try {
    const { fullName, email, password } = req.body; // Obtiene el nombre completo, correo electrónico y contraseña del cuerpo de la solicitud

    // Verifica si algún campo obligatorio está vacío
    if (!fullName || !email || !password) {
      return res.status(401).json({
        message: "Datos invalidos",
        success: false,
      });
    }

    // Verifica si el correo electrónico ya está en uso
    const user = await User.findOne({ email });
    if (user) {
      return res.status(401).json({
        message: "Este correo ya está en usoo",
        success: false,
      });
    }

    // Hashea la contraseña antes de almacenarla en la base de datos
    const hashedPassword = await bcryptjs.hash(password, 16);

    // Crea un nuevo usuario en la base de datos
    await User.create({
      fullName,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({
      message: "Cuenta creada correctamente.",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

// Función para el restablecimiento de contraseña
export const ForgotPassword = async (req, res) => {
  try {
    const { email } = req.body; // Obtiene el correo electrónico del cuerpo de la solicitud

    // Verifica si el correo electrónico está presente
    if (!email) {
      return res.status(400).json({
        message: "El correo es obligatorio",
        success: false,
      });
    }

    // Busca un usuario en la base de datos con el correo electrónico que se le dio
    const user = await User.findOne({ email });

    // Si no se encuentra ningún usuario con el correo electrónico proporcionado
    if (!user) {
      return res.status(200).json({
        message: "El usuario no existe",
        success: false,
      });
    }

    // Genera un token de restablecimiento de contraseña
    const resetToken = crypto.randomBytes(20).toString("hex");

    // Establece el token de restablecimiento de contraseña y e; tiempo de expiración en el usuario
    user.resetPasswordToken = resetToken;
    user.resetTokenExpire = Date.now() + 3600000;

    await user.save();

    // Configura el transportador de correo para enviar el correo electrónico de restablecimiento de contraseña
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "ianarmoes@gmail.com",
        pass: "wftf yisc auix sefb",
      },
    });

    // Configura las opciones del correo electrónico
    const mailOptions = {
      from: "ianarmoes@gmail.com",
      to: user.email,
      subject: "Cambiar contraseña",
      html: `<p>¡Hola! Para cambiar la contraseña</p>
        <a href="http://localhost:3000/reset-password/${resetToken}">Click Aquí</a>
    `,
    };

    // Envía el correo electrónico de restablecimiento de contraseña
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        // Si hay un error al enviar el correo electrónico
        console.log(error);
        res.status(500).json({
          message: "No se pudo enviar el correo",
          success: false,
        });
      } else {
        // Si el correo electrónico se envió correctamente
        console.log("Correo enviado", info.response);
        res.status(200).json({
          message: "Correo enviado",
          success: true,
        });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error interno del servidor",
      success: false,
    });
  }
};

export const ResetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
      return res.status(400).json({
        message: "Faltan datos",
        success: false,
      });
    }

    const user = await User.findOne({
      resetPasswordToken: token,
      resetTokenExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        message: "El token es inválido o ya expiró",
        success: false,
      });
    }

    const hashedPassword = await bcryptjs.hash(newPassword, 16);

    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetTokenExpire = undefined;

    await user.save();

    return res.status(200).json({
      message: "Contraseña actualizada correctamente",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error interno del servidor",
      success: false,
    });
  }
};
