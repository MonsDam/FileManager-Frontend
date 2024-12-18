import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from "react";
import { deleteFile } from "../../services/fileService";

/**
 * @function DeleteButton
 * @description Componente que muestra un botón para eliminar un archivo. Al hacer clic en el botón, se muestra un diálogo de confirmación y, si se confirma, se elimina el archivo mediante una llamada API.
 * 
 * @param {Object} props - Las propiedades del componente.
 * @param {string} props.id - El ID del archivo que se desea eliminar.
 * 
 * @returns {JSX.Element} El componente de React que incluye el botón de eliminar y el diálogo de confirmación.
 */
export default function DeleteButton({ id }) {
    // Estado para controlar si el diálogo está abierto o cerrado
    const [open, setOpen] = useState(false);

    /**
     * @function handleOpen
     * @description Abre el diálogo de confirmación.
     */
    const handleOpen = () => setOpen(true);

    /**
     * @function handleClose
     * @description Cierra el diálogo de confirmación.
     */
    const handleClose = () => setOpen(false);

    /**
     * @function handleDeleteFile
     * @description Elimina el archivo utilizando una solicitud HTTP y maneja la respuesta o el error.
     * @async
     * @throws {Error} Si ocurre un error al eliminar el archivo.
     */
    const handleDeleteFile = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('No se encontró un token válido');
            return;
        }
        try {
            console.log(token);
            const response = await deleteFile(id, token);
            console.log(response);
            alert('Archivo eliminado con exito');
        } catch (error) {
            alert('Error al eliminar el archivo')
            console.error('Error al eliminar el archivo', error);
        }
    };

    return (
        <div>
            {/* Botón de eliminar */}
            <IconButton aria-label="delete" size="small" onClick={handleOpen}>
                <DeleteIcon color="error" fontSize="small" />
            </IconButton>

            {/* Diálogo de confirmación */}
            <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                    component: 'form',
                    onSubmit: (event) => {
                        event.preventDefault();
                        handleDeleteFile();
                    },
                }}
            >
                <DialogTitle>Confirmación</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        ¿Estás seguro que deseas eliminar el archivo?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancelar</Button>
                    <Button color="error" type="submit">Eliminar</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
