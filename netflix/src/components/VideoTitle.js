import React from 'react';
import { CiPlay1 } from "react-icons/ci"; // Importa el icono de reproducción de CiPlay1 de react-icons
import { CiCircleInfo } from "react-icons/ci"; // Importa el icono de información de CiCircleInfo de react-icons

// Define el componente VideoTitle
const VideoTitle = ({ title, overview }) => {
    // Renderiza el componente VideoTitle
    return (
        <div className='w-[vw] absolute text-white pt-[18%] p-12'>
            {/* Renderiza el título de la película */}
            <h1 className='text-3xl font-bold'>{title}</h1>
            {/* Renderiza la descripción de la película */}
            <p className='w-1/3 mt-4'>{overview}</p>
            {/* Renderiza botones para reproducir y ver más información */}
            <div className='flex mt-8'>
                {/* Botón para reproducir */}
                <button className='flex items-center px-6 py-2 bg-white text-black rounded-md hover:bg-opacity-80'>
                    <CiPlay1 size="24px" /> {/* Icono de reproducción */}
                    <span className='ml-1'>Play</span>
                </button>
                {/* Botón para ver más información */}
                <button className='flex mx-2 items-center px-6 py-2 bg-gray-500 bg-opacity-50 text-black rounded-md'>
                    <CiCircleInfo size="24px" /> {/* Icono de información */}
                    <span className='ml-1'>Ver más</span> 
                </button>
            </div>
        </div>
    )
}

// Exporta el componente VideoTitle para su uso en otras partes de la aplicación
export default VideoTitle;
