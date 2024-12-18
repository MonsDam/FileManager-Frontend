import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import UploadButton from './UploadButton';

/**
 * @function FormDialog
 * @description Componente de diálogo que permite a los usuarios agregar un nuevo archivo.
 * 
 * Este componente presenta un formulario de diálogo con un botón para cargar un archivo y un componente `UploadButton`
 * para manejar la carga. Al completar la carga, se muestra un mensaje de confirmación.
 * 
 * @returns {JSX.Element} Un cuadro de diálogo que permite cargar archivos y muestra un botón para cerrar.
 */
export default function FormDialog() {
    const [open, setOpen] = React.useState(false);

    /**
     * @function handleClickOpen
     * @description Abre el diálogo cuando el usuario hace clic en el botón de "Agregar Archivo".
     */
    const handleClickOpen = () => {
        setOpen(true);
    };

    /**
     * @function handleClose
     * @description Cierra el diálogo.
     */
    const handleClose = () => {
        setOpen(false);
    };

    /**
     * @function handleUploadComplete
     * @description Muestra un mensaje de éxito cuando la carga del archivo se completa.
     * 
     * @param {string} message - El mensaje que se muestra tras la carga exitosa del archivo.
     */
    const handleUploadComplete = (message) => {
        alert(message);
        handleClose();
    };

    return (
        <div className='flex justify-end mb-4 ' >
            {/* Botón que abre el diálogo para cargar un archivo */}
            <Button variant="contained" onClick={handleClickOpen}>
                Agregar Archivo
            </Button>

            {/* Diálogo para cargar un nuevo archivo */}
            <Dialog
                open={open}
                onClose={handleClose}
                fullWidth
                maxWidth={'xs'}
                PaperProps={{
                    component: 'form',
                    onSubmit: (event) => {
                        event.preventDefault(); // Previene el comportamiento por defecto de enviar el formulario
                    },
                }}
            >
                {/* Título del diálogo */}
                <DialogTitle>Nuevo Archivo</DialogTitle>

                <DialogContent>
                    {/* Instrucciones sobre qué hacer dentro del diálogo */}
                    <DialogContentText>
                        Selecciona un archivo
                    </DialogContentText>

                    {/* Componente para cargar el archivo */}
                    <UploadButton onUpload={handleUploadComplete} />
                </DialogContent>

                {/* Acciones del diálogo, en este caso, un botón para cancelar */}
                <DialogActions>
                    <Button onClick={handleClose}>Cancelar</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
