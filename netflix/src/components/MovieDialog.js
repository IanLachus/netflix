import * as React from 'react';
import Button from '@mui/material/Button'; // Importa el componente Button de Material-UI
import Dialog from '@mui/material/Dialog'; // Importa el componente Dialog de Material-UI
import DialogActions from '@mui/material/DialogActions'; // Importa el componente DialogActions de Material-UI
import DialogContent from '@mui/material/DialogContent'; // Importa el componente DialogContent de Material-UI
import DialogContentText from '@mui/material/DialogContentText'; // Importa el componente DialogContentText de Material-UI
import DialogTitle from '@mui/material/DialogTitle'; // Importa el componente DialogTitle de Material-UI
import { useSelector, useDispatch } from "react-redux"; // Importa los hooks useSelector y useDispatch de react-redux para acceder al estado global de Redux y despachar acciones
import { setOpen } from '../redux/movieSlice'; // Importa la acción setOpen del slice de películas
import VideoBackground from './VideoBackground'; // Importa el componente VideoBackground

// Define el componente MovieDialog
export default function MovieDialog() {
  // Obtiene el estado de apertura del diálogo y el ID de la película desde el almacenamiento global de Redux
  const { open, id } = useSelector(store => store.movie);
  const dispatch = useDispatch(); // Obtiene la función dispatch del almacenamiento global de Redux

  // Manejador para cerrar el diálogo
  const handleClose = () => {
    // Despacha la acción setOpen con el valor false para cerrar el diálogo
    dispatch(setOpen(false));
  }

  // Renderiza el componente MovieDialog
  return (
    <React.Fragment>
      {/* Componente de diálogo de Material-UI */}
      <Dialog
        open={open} // Define si el diálogo está abierto o cerrado
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description" 
      >
       {/* Contenido del diálogo */}
       <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {/* Renderiza el fondo de video de la película */}
            <VideoBackground movieId={id} bool={true} />
          </DialogContentText>
        </DialogContent>
        {/* Acciones del diálogo */}
        <DialogActions>
          {/* Botón para cerrar el diálogo */}
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
