import axios from 'axios';

const API_URL = 'http://localhost:8001/api/v1';

export const getAllFiles = async (token) => {
    try {
        const response = await axios.get(`${API_URL}/files`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(response)
        return response.data.files;
    } catch (error) {
        console.error('Error al obtener los archivos', error);
        throw error;
    }
};

export const getOneFile = async (id, token) => {
    try {
        const response = await axios.get(`${API_URL}/view/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(response)
        return response.data;
    } catch (error) {
        console.error('Error al obtener el archivo', error);
        throw error;
    }
};

export const deleteFile = async (id, token) => {
    try {
        const response = await axios.delete(`${API_URL}/delete/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(response)
        return response;
    } catch (error) {
        console.error('Error al eliminar el archivo', error);
        throw error;
    }
};
