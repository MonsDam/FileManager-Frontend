import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { Box, IconButton, Modal, Typography } from '@mui/material';
import { useState } from 'react';
import { getOneFile } from '../../services/fileService';
import { formatFileSize } from '../../helpers/formatFileSize';
import { formatDate } from '../../helpers/formatDate';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function ViewButton({ id }) {
    const [file, setFile] = useState();
    const [open, setOpen] = useState(false);
    console.log(id)
    const handleClose = () => setOpen(false);
    const handleGetOneFile = async () => {
        setOpen(true)
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('No se encontró un token válido');
            return;
        }
        try {
            console.log(token)
            const fileData = await getOneFile(id, token);
            setFile(fileData);
            console.log(fileData)
        } catch (error) {
            console.error('Error al obtener los archivos', error);
        }
    };

    console.log(file)

    return (
        <div>
            <IconButton aria-label="ver" size="small" onClick={handleGetOneFile} >
                <RemoveRedEyeIcon color='primary' fontSize="small" />
            </IconButton>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography className='text-gray-800' id="modal-modal-title" variant="h6" component="h2">
                        Detalles del archivo
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        {file ? (
                            <div className='grid grid-cols-1 gap-4'>
                                <span>Nombre: {file?.originalName}</span>
                                <span>Tipo de archivo: {file?.fileType}</span>
                                <span>Tamaño: {formatFileSize(file?.fileSize)}</span>
                                <span>Fecha de carga : {formatDate(file?.uploadedAt)} </span>
                            </div>

                        ) : (
                            <>
                                Error al cargar los detalles
                            </>
                        )}
                    </Typography>
                </Box>
            </Modal>
        </div >
    )
}