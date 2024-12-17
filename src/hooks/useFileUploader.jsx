import axios from 'axios';
import { useState } from 'react';

const useFileUploader = (uploadEndpoint) => {
    const [file, setFile] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [uploadStatus, setUploadStatus] = useState('');
    const token = localStorage.getItem('token');

    console.log('file', file)

    const CHUNK_SIZE = 5 * 1024 * 1024; // 5MB por chunk

    // Manejar la selección de archivo
    const selectFile = (selectedFile) => {
        setFile(selectedFile);
        setUploadProgress(0);
        setUploadStatus('')
    };

    // Subir el archivo en chunks
    const uploadFile = async () => {
        if (!file) {
            setUploadStatus('No se ha seleccionado ningún archivo.');
            return;
        }

        const totalChunks = Math.ceil(file.size / CHUNK_SIZE);
        let uploadedChunks = 0;

        for (let i = 0; i < totalChunks; i++) {
            const start = i * CHUNK_SIZE;
            const end = Math.min(start + CHUNK_SIZE, file.size);
            const chunk = file.slice(start, end);

            const formData = new FormData();
            formData.append('originalName', file.name);
            formData.append('fileName', file.name);
            formData.append('totalChunks', totalChunks);
            formData.append('chunk', chunk);
            formData.append('chunkIndex', i);

            try {
                console.log(uploadEndpoint)
                console.log(Object.fromEntries(formData))
                // Configuración de los headers
                const config = {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                };

                console.log(config)

                const response = await axios.post(uploadEndpoint, formData, config);
                console.log('response', response)
                if (response.status === 200) {
                    uploadedChunks++;
                    const progress = Math.round((uploadedChunks / totalChunks) * 100);
                    setUploadProgress(progress);

                    if (uploadedChunks === totalChunks) {
                        setUploadStatus(`Archivo "${file.name}" subido exitosamente.`);
                    }

                } else {
                    throw new Error(`Error en la subida: ${response.statusText}`);
                }
            } catch (error) {
                throw new Error('Error al subir el archivo:', error);
            }
        }

        return `Archivo "${file.name}" subido exitosamente.`;
    };

    return {
        file,
        uploadProgress,
        uploadStatus,
        selectFile,
        uploadFile,
    };
};

export default useFileUploader;
