import axios from 'axios'; // Importa axios para realizar solicitudes HTTP

const API_URL = 'http://localhost:8001/api/v1'; // URL base de la API donde se realizarán las solicitudes

/**
 * Función para obtener todos los archivos.
 * Hace una solicitud GET a la API para obtener la lista de archivos.
 * 
 * @param {string} token - El token JWT del usuario, utilizado para autorizar la solicitud.
 * @returns {Array} - Devuelve un array de archivos obtenidos desde la API.
 * @throws {Error} - Si ocurre un error durante la solicitud, el error es lanzado.
 */
export const getAllFiles = async (token) => {
    try {
        // Realiza la solicitud GET a la API para obtener todos los archivos
        const response = await axios.get(`${API_URL}/files`, {
            headers: {
                Authorization: `Bearer ${token}`, // Autorización con el token JWT
            },
        });
        console.log(response); // Muestra la respuesta de la API (para depuración)

        // Devuelve los archivos obtenidos desde la respuesta de la API
        return response.data.files;
    } catch (error) {
        console.error('Error al obtener los archivos', error); // Muestra un mensaje de error si ocurre algún problema
        throw error; // Lanza el error para ser manejado por quien llame a esta función
    }
};

/**
 * Función para obtener un archivo específico.
 * Hace una solicitud GET a la API para obtener un archivo específico por su ID.
 * 
 * @param {string} id - El ID del archivo que se quiere obtener.
 * @param {string} token - El token JWT del usuario, utilizado para autorizar la solicitud.
 * @returns {Object} - Devuelve el archivo solicitado.
 * @throws {Error} - Si ocurre un error durante la solicitud, el error es lanzado.
 */
export const getOneFile = async (id, token) => {
    try {
        // Realiza la solicitud GET a la API para obtener el archivo con el ID especificado
        const response = await axios.get(`${API_URL}/view/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`, // Autorización con el token JWT
            },
        });
        console.log(response); // Muestra la respuesta de la API (para depuración)

        // Devuelve el archivo obtenido desde la respuesta de la API
        return response.data;
    } catch (error) {
        console.error('Error al obtener el archivo', error); // Muestra un mensaje de error si ocurre algún problema
        throw error; // Lanza el error para ser manejado por quien llame a esta función
    }
};

/**
 * Función para eliminar un archivo específico.
 * Hace una solicitud DELETE a la API para eliminar un archivo por su ID.
 * 
 * @param {string} id - El ID del archivo que se quiere eliminar.
 * @param {string} token - El token JWT del usuario, utilizado para autorizar la solicitud.
 * @returns {Object} - Devuelve la respuesta de la API sobre la eliminación del archivo.
 * @throws {Error} - Si ocurre un error durante la solicitud, el error es lanzado.
 */
export const deleteFile = async (id, token) => {
    try {
        // Realiza la solicitud DELETE a la API para eliminar el archivo con el ID especificado
        const response = await axios.delete(`${API_URL}/delete/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`, // Autorización con el token JWT
            },
        });
        console.log(response); // Muestra la respuesta de la API (para depuración)

        // Devuelve la respuesta de la API sobre la eliminación del archivo
        return response;
    } catch (error) {
        console.error('Error al eliminar el archivo', error); // Muestra un mensaje de error si ocurre algún problema
        throw error; // Lanza el error para ser manejado por quien llame a esta función
    }
};
