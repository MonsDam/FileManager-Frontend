import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from "react";
import { deleteFile } from "../../services/fileService";

export default function DeleteButton({ id }) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleDeleteFile = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('No se encontró un token válido');
            return;
        }
        try {
            console.log(token)
            const response = await deleteFile(id, token);
            console.log(response)
        } catch (error) {
            console.error('Error al eliminar el archivo', error);
        }
    };
    return (
        <div>

            <IconButton aria-label="delete" size="small" onClick={handleOpen}>
                <DeleteIcon color="error" fontSize="small" />
            </IconButton>
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
                <DialogTitle>Confirmacion</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Estas seguro que deseas eliminar el archivo?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancelar</Button>
                    <Button color="error" type="submit">Eliminar</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}