import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ResetPassword = () => {
  // Extraer el token de los parámetros de la URL
  const { token } = useParams();

  // Estados para almacenar las contraseñas y controlar la visibilidad de la alerta
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [alertVisible, setAlertVisible] = useState(false);

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar que las contraseñas coincidan
    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    try {
      // Realizar una solicitud para restablecer la contraseña
      const response = await axios.post(
        "http://localhost:8080/api/v1/user/reset-password",
        {
          token,
          newPassword: password,
        }
      );

      // Mostrar mensaje de éxito
      alert(response.data.message);

      // Mostrar la alerta
      setAlertVisible(true);
    } catch (error) {
      // Manejar errores
      console.log(error);
      console.error("Error al restablecer la contraseña");
      alert(error.response.data.message);
    }
  };

  // Renderizar el formulario
  return (
    <div className="relative">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-4/12 p-14 my-36 left-0 right-0 mx-auto items-center justify-center absolute rounded-md bg-black opacity-90"
      >
        <h2 className="text-3xl font-bold text-white mb-8">
          Resetear contraseña
        </h2>
        <div className="text-white">
          {/* Campo para ingresar la nueva contraseña */}
          <label className="mb-2 text-lg">Contraseña</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="outline-none p-3 mb-4 rounded-sm bg-gray-800 text-white w-full"
          />

          {/* Campo para confirmar la contraseña */}
          <label className="mb-2 text-lg">Confirmar contraseña</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="outline-none p-3 mb-4 rounded-sm bg-gray-800 text-white w-full"
          />

          {/* Botón para cambiar la contraseña */}
          <button
            type="submit"
            className="mt-4 bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded"
          >
            Cambiar
          </button>
        </div>
      </form>

      {/* Alerta */}
      {/* Se muestra cuando alertVisible es verdadero */}
      {alertVisible && (
        <div className="absolute top-0 left-0 right-0 bg-red-900 text-white p-4 text-center">
          ¡La contraseña ha sido actualizada correctamente! <span className="font-bold">Vuelve a inciar sesión.</span>
        </div>
      )}
    </div>
  );
};

export default ResetPassword;