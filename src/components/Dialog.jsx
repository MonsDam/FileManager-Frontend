import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import UploadButton from './UploadButton';

export default function FormDialog() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleUploadComplete = (message) => {
        alert(message);
        handleClose();
    };
    return (
        <React.Fragment>
            <Button variant="outlined" onClick={handleClickOpen}>
                Open form dialog
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                    component: 'form',
                    onSubmit: (event) => {
                        event.preventDefault();
                    },
                }}
            >
                <DialogTitle>Nuevo Archivo</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Selecciona un archivo
                    </DialogContentText>
                    <UploadButton onUpload={handleUploadComplete} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    {/* <Button type="submit">Subscribe</Button> */}
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
