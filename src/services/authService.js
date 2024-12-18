import axios from 'axios'; // Importa axios para realizar solicitudes HTTP

const API_URL = 'http://localhost:8000/api/v1'; // URL base de la API donde se realizarán las solicitudes

/**
 * Función que maneja el inicio de sesión de un usuario.
 * Hace una solicitud POST a la API para autenticar al usuario.
 * 
 * @param {Object} body - El objeto que contiene los datos de inicio de sesión (por ejemplo, correo electrónico y contraseña).
 * @returns {string} - Devuelve el token JWT recibido en la respuesta, el cual se almacenará en el almacenamiento local.
 * @throws {Error} - Si ocurre un error durante la solicitud, el error es lanzado.
 */
export const login = async (body) => {
    console.log('body', body); // Muestra el cuerpo de la solicitud en la consola (para depuración)

    try {
        // Realiza la solicitud POST a la API de autenticación para iniciar sesión
        const response = await axios.post(`${API_URL}/auth/login`, body);
        console.log(response); // Muestra la respuesta de la API (para depuración)
        
        // Devuelve el token JWT recibido en la respuesta
        return response.data.token;
    } catch (error) {
        console.error('Error al Iniciar sesión', error); // Muestra un mensaje de error si ocurre algún problema
        throw error; // Lanza el error para ser manejado por quien llame a esta función
    }
};

/**
 * Función que maneja el registro de un nuevo usuario.
 * Hace una solicitud POST a la API para crear una nueva cuenta de usuario.
 * 
 * @param {Object} body - El objeto que contiene los datos de registro del usuario (por ejemplo, nombre, correo electrónico, contraseña).
 * @returns {string} - Devuelve el token JWT recibido en la respuesta, el cual se almacenará en el almacenamiento local.
 * @throws {Error} - Si ocurre un error durante la solicitud, el error es lanzado.
 */
export const register = async (body) => {
    console.log('body', body); // Muestra el cuerpo de la solicitud en la consola (para depuración)

    try {
        // Realiza la solicitud POST a la API de registro para crear un nuevo usuario
        const response = await axios.post(`${API_URL}/auth/register`, body);
        console.log(response); // Muestra la respuesta de la API (para depuración)

        // Devuelve el token JWT recibido en la respuesta
        return response.data.token;
    } catch (error) {
        console.error('Error al registrarse', error); // Muestra un mensaje de error si ocurre algún problema
        throw error; // Lanza el error para ser manejado por quien llame a esta función
    }
};
