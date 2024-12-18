import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import useFileUploader from '../hooks/useFileUploader';
import CircularUploadProgress from './CircularProgress';

/**
 * @constant VisuallyHiddenInput
 * @description Input de archivo invisible para accesibilidad. Permite la selección de archivos sin mostrar el campo de entrada visualmente.
 */
const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',  // Establece la visibilidad del input a cero
    clipPath: 'inset(50%)', // Oculta el input, pero lo mantiene accesible
    height: 1,              // Minimiza la altura del input
    overflow: 'hidden',     // Elimina cualquier desbordamiento
    position: 'absolute',   // Posiciona el input fuera de la vista
    bottom: 0,              // Establece la posición en la parte inferior
    left: 0,                // Posiciona el input en la parte izquierda
    whiteSpace: 'nowrap',   // Evita el salto de línea
    width: 1,               // Minimiza el ancho del input
});

/**
 * @function UploadButton
 * @description Componente que permite a los usuarios seleccionar y cargar un archivo, mostrando el progreso de la carga.
 * 
 * Este componente incluye un botón para seleccionar un archivo, muestra el nombre del archivo seleccionado y un progreso de carga mientras el archivo se sube.
 * 
 * @param {Function} onUpload - Función que se llama cuando la carga del archivo se completa.
 * 
 * @returns {JSX.Element} Un botón para cargar archivos, muestra el progreso de carga y el nombre del archivo seleccionado.
 */
export default function UploadButton({ onUpload }) {
    const { file, uploadProgress, selectFile, uploadFile } = useFileUploader('http://localhost:8001/api/v1/upload');

    /**
     * @function handleFileChange
     * @description Maneja el cambio de archivo cuando el usuario selecciona uno nuevo.
     * 
     * @param {Event} e - El evento que contiene el archivo seleccionado.
     */
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        selectFile(selectedFile);
    };

    /**
     * @function handleUpload
     * @description Inicia la carga del archivo seleccionado y ejecuta la función `onUpload` con el resultado una vez que se completa la carga.
     */
    const handleUpload = async () => {
        try {
            const result = await uploadFile();
            onUpload(result);  // Ejecuta la función `onUpload` pasada como prop
        } catch (error) {
            alert(error.message)
            console.error(error.message);
        }
    };

    return (
        <div className='grid grid-cols-1 gap-4 '>
            {/* Botón para seleccionar un archivo */}
            <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
            >
                {file ? file.name : 'Selecciona un archivo'}
                <VisuallyHiddenInput
                    type="file"
                    onChange={handleFileChange}
                    multiple
                />
            </Button>

            {/* Muestra el nombre del archivo seleccionado */}
            {file && <span className='text-gray-700 ' >Archivo seleccionado: {file.name}</span>}

            {/* Muestra el progreso de carga si está en progreso */}
            {uploadProgress > 0 && <CircularUploadProgress value={uploadProgress} />}

            {/* Botón para iniciar la carga */}
            <Button variant="contained" type="button" onClick={handleUpload} >Subir archivo</Button>
        </div>
    );
}
