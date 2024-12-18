/**
 * @hook useFileUploader
 * @description Hook personalizado para gestionar la subida de archivos en chunks a un servidor.
 * 
 * Este hook maneja la lógica de subida de archivos dividiéndolos en partes (chunks) y subiéndolos de forma progresiva.
 * Utiliza `axios` para hacer las solicitudes de subida al servidor y realiza un seguimiento del progreso.
 * 
 * @param {string} uploadEndpoint - URL del endpoint donde se subirá el archivo.
 * 
 * @returns {object} Objeto con los siguientes valores y métodos:
 *   - `file` (File|null): El archivo seleccionado para ser subido.
 *   - `uploadProgress` (number): El progreso de la subida del archivo en porcentaje.
 *   - `uploadStatus` (string): El estado de la subida, como mensajes de éxito o error.
 *   - `selectFile` (function): Función para seleccionar un archivo.
 *   - `uploadFile` (function): Función para iniciar la subida del archivo.
 * 
 * @example
 * // Ejemplo de uso del hook en un componente
 * const { file, uploadProgress, uploadStatus, selectFile, uploadFile } = useFileUploader('/api/v1/upload');
 * 
 * // Para seleccionar un archivo
 * const handleFileSelect = (e) => {
 *     const selectedFile = e.target.files[0];
 *     selectFile(selectedFile);
 * };
 * 
 * // Para subir el archivo
 * const handleUpload = async () => {
 *     await uploadFile();
 * };
 */
import axios from 'axios';
import { useState } from 'react';

const useFileUploader = (uploadEndpoint) => {
    const [file, setFile] = useState(null);  // Estado para almacenar el archivo seleccionado
    const [uploadProgress, setUploadProgress] = useState(0);  // Estado para el progreso de la subida
    const [uploadStatus, setUploadStatus] = useState('');  // Estado para mostrar mensajes de estado de la subida
    const token = localStorage.getItem('token');  // Obtiene el token de autenticación desde el localStorage

    const CHUNK_SIZE = 5 * 1024 * 1024;  // Tamaño de cada chunk (5MB)

    // Función para manejar la selección de un archivo
    const selectFile = (selectedFile) => {
        setFile(selectedFile);  // Asigna el archivo seleccionado al estado
        setUploadProgress(0);  // Resetea el progreso de la subida
        setUploadStatus('');  // Resetea el estado del mensaje
    };

    // Función para subir el archivo en chunks
    const uploadFile = async () => {
        if (!file) {  // Si no se ha seleccionado un archivo, muestra un mensaje de error
            setUploadStatus('No se ha seleccionado ningún archivo.');
            return;
        }

        const totalChunks = Math.ceil(file.size / CHUNK_SIZE);  // Calcula el número total de chunks
        let uploadedChunks = 0;  // Contador de los chunks subidos

        // Itera sobre cada chunk del archivo
        for (let i = 0; i < totalChunks; i++) {
            const start = i * CHUNK_SIZE;  // Calcula el inicio del chunk
            const end = Math.min(start + CHUNK_SIZE, file.size);  // Calcula el final del chunk
            const chunk = file.slice(start, end);  // Corta el archivo en chunks

            const formData = new FormData();
            formData.append('originalName', file.name);
            formData.append('fileName', file.name);
            formData.append('totalChunks', totalChunks);
            formData.append('chunk', chunk);
            formData.append('chunkIndex', i);

            try {
                // Configura los encabezados de la solicitud, incluyendo el token de autenticación
                const config = {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                };

                // Realiza la solicitud POST para subir el chunk
                const response = await axios.post(uploadEndpoint, formData, config);

                // Si la subida es exitosa, actualiza el progreso
                if (response.status === 200) {
                    uploadedChunks++;
                    const progress = Math.round((uploadedChunks / totalChunks) * 100);  // Calcula el porcentaje de progreso
                    setUploadProgress(progress);  // Actualiza el progreso en el estado

                    if (uploadedChunks === totalChunks) {  // Si se han subido todos los chunks, muestra el mensaje de éxito
                        setUploadStatus(`Archivo "${file.name}" subido exitosamente.`);
                    }

                } else {
                    throw new Error(`Error en la subida: ${response.statusText}`);
                }
            } catch (error) {
                throw new Error('Error al subir el archivo:', error);
            }
        }

        return `Archivo "${file.name}" subido exitosamente.`;  // Devuelve un mensaje de éxito
    };

    return {
        file,  // El archivo seleccionado
        uploadProgress,  // El progreso de la subida
        uploadStatus,  // El estado de la subida
        selectFile,  // Función para seleccionar un archivo
        uploadFile,  // Función para subir el archivo
    };
};

export default useFileUploader;
