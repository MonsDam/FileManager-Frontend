import axios from 'axios';

const API_URL = 'http://localhost:8000/api/v1';

export const login = async (body) => {
    console.log('body', body)
    try {
        const response = await axios.post(`${API_URL}/auth/login`, body);
        console.log(response)
        return response.data.token;
    } catch (error) {
        console.error('Error al Iniciar sesion', error);
        throw error;
    }
};

export const register = async (body) => {
    console.log('body', body)
    try {
        const response = await axios.post(`${API_URL}/auth/register`, body);
        console.log(response)
        return response.data.token;
    } catch (error) {
        console.error('Error al registrarse', error);
        throw error;
    }
};