import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import useFileUploader from '../hooks/useFileUploader';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

export default function UploadButton({ onUpload }) {
    const { file, uploadProgress, selectFile, uploadFile } = useFileUploader('http://localhost:8001/api/v1/upload');


    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        selectFile(selectedFile);
    };

    const handleUpload = async () => {
        try {
            const result = await uploadFile();
            onUpload(result);
        } catch (error) {
            console.error(error.message);
        }
    };

    console.log(file)
    return (
        <div>

            <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
            >
                Upload files
                <VisuallyHiddenInput
                    type="file"
                    onChange={handleFileChange}
                    multiple
                />
            </Button>
            {file && <p>Archivo seleccionado: {file.name}</p>}
            {uploadProgress > 0 && <p>Progreso: {uploadProgress}%</p>}
            <button type="button" onClick={handleUpload}>
                Subir archivo
            </button>
        </div>
    );
}
