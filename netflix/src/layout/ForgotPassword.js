import React, { useState } from "react";

function ForgotPassword() {
  const [email, setEmail] = useState(""); // Estado para almacenar el correo electrónico ingresado
  const [alertVisible, setAlertVisible] = useState(false); // Estado para controlar la visibilidad de la alerta

  // Función para manejar el envío del formulario
  const handleSubmit = async (event) => {
    event.preventDefault(); // Evita el comportamiento predeterminado del formulario

    try {
      // Realiza una solicitud al servidor para enviar el correo electrónico
      const response = await fetch(
        "http://localhost:8080/api/v1/user/forgot-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }), // pasa el estado del correo electrónico a JSON y lo envía en el cuerpo de la solicitud
        }
      );

      // toma los datos de la respuesta y los pasa a JSON
      const data = await response.json();

      // Imprime el mensaje de la respuesta en la consola
      console.log(data.message);

      // Mostrar la alerta
      setAlertVisible(true);
    } catch (error) {
      console.error(
        "Hubo un error al enviar el email de restablecimiento:",
        error
      );
    }
  };

  // Renderiza el formulario
  return (
    <div className="relative">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-4/12 p-14 my-36 left-0 right-0  mx-auto items-center justify-center absolute rounded-md bg-black opacity-90">
        <h2 className="text-3xl font-bold text-white mb-8">
          Olvidé mi contraseña
        </h2>
        <input
          className="outline-none p-3 my-2 rounded-sm bg-gray-800 text-white"
          type="email"
          placeholder="Ingresa tu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)} // Actualiza el estado del correo electrónico cuando cambia el valor del input
          required
        />
        <button
          type="submit"
          className="mt-4 bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded"
        >
          Enviar
        </button>
      </form>

      {/* Alerta */}
      {alertVisible && (
        alert('El correo electrónico ha sido enviado correctamente.'),
        <div className="absolute top-0 left-0 right-0 bg-red-900 text-white p-4 text-center">
          El correo electrónico ha sido enviado correctamente.
        </div>
      )}
    </div>
  );
}

export default ForgotPassword;
