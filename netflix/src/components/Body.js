// Importa React desde la biblioteca 'react'
import React from 'react';
// Importa createBrowserRouter y RouterProvider de 'react-router-dom' para el enrutamiento del lado del cliente
import { createBrowserRouter, RouterProvider} from "react-router-dom";
// Importa los componentes Login, Browse y ForgotPassword
import Login from './Login';
import Browse from './Browse';
import ForgotPassword from '../layout/ForgotPassword';
import ResetPassword from '../layout/ResetPassword';
 
// Define el componente Body
const Body = () => {
    // Crea un enrutador usando createBrowserRouter con las rutas especificadas
    const appRouter = createBrowserRouter([
        {
            path: "/",
            element: <Login /> // La ruta raíz mostrará el componente Login
        },
        {
            path: "/browse",
            element: <Browse /> // La ruta '/browse' mostrará el componente Browse
        },
        {
            path: "/forgot-password",
            element: <ForgotPassword /> // La ruta '/forgot-password' mostrará el componente ForgotPassword
        },
        {
            path: "/reset-password/:token",
            element: <ResetPassword /> // La ruta '/forgot-password' mostrará el componente ForgotPassword
        }
    ])
    // Renderiza el RouterProvider con el enrutador creado
    return (
        <div>
            <RouterProvider router={appRouter} />
        </div>
    )
}

// Exporta el componente Body para su uso en otras partes de la aplicación
export default Body
