import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Importa la navegación de react-router
import { register } from '../services/authService'; // Función de registro que interactúa con la API
import { Button, TextField } from '@mui/material'; // Importa los componentes de Material UI para formularios

/**
 * Componente para el registro de un nuevo usuario en la aplicación.
 * Permite al usuario ingresar su nombre, correo electrónico y contraseña.
 * En caso de éxito, redirige al usuario a la página de inicio de sesión.
 */
export default function Register() {
    // Estado para almacenar los datos del formulario
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        password: '',
    });

    // Estado para manejar errores durante el registro
    const [error, setError] = useState('');

    // Hook de navegación para redirigir al usuario después del registro exitoso
    const navigate = useNavigate();

    // Maneja los cambios en los campos del formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value, // Actualiza el valor del campo correspondiente
        });
    };

    // Maneja el envío del formulario para el registro del usuario
    const handleSubmit = async (e) => {
        e.preventDefault(); // Previene el comportamiento predeterminado del formulario

        try {
            // Llama al servicio de registro con los datos del usuario
            const response = await register(userData);
            console.log(response.message); // Muestra el mensaje de éxito en la consola

            // Redirige al usuario a la página de inicio de sesión después de un registro exitoso
            navigate('/login');
        } catch (err) {
            // Si ocurre un error, establece un mensaje de error
            setError('Error al registrar el usuario. Intenta nuevamente.');
        }
    };

    return (
        <div className='flex items-center justify-center min-h-screen bg-gray-100'>
            {/* Muestra el mensaje de error si existe */}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            {/* Formulario de registro */}
            <form onSubmit={handleSubmit}>
                <div className='grid grid-cols-1 w-72'>
                    {/* Título del formulario */}
                    <h1 className='font-semibold text-center text-3xl'>Registro de Usuario</h1>

                    {/* Campo de nombre de usuario */}
                    <TextField
                        id="name"
                        type="name"
                        name="name"
                        label="Nombre de Usuario"
                        variant="outlined"
                        margin="normal"
                        onChange={handleChange} // Actualiza el estado con el nombre ingresado
                    />

                    {/* Campo de correo electrónico */}
                    <TextField
                        id="email"
                        type="email"
                        name="email"
                        label="Correo electrónico"
                        variant="outlined"
                        margin="normal"
                        onChange={handleChange} // Actualiza el estado con el correo electrónico
                    />

                    {/* Campo de contraseña */}
                    <TextField
                        id="password"
                        type="password"
                        name="password"
                        label="Contraseña"
                        variant="outlined"
                        margin="normal"
                        onChange={handleChange} // Actualiza el estado con la contraseña ingresada
                    />

                    {/* Enlace para redirigir a la página de inicio de sesión */}
                    <div className="flex gap-2 justify-center mb-4">
                        ¿Ya tienes una cuenta?
                        <span className="underline">
                            <Link to="/login">Inicia Sesión</Link>
                        </span>
                    </div>

                    {/* Botón para enviar el formulario de registro */}
                    <Button variant="contained" type="submit">Regístrate</Button>
                </div>
            </form>
        </div>
    );
}
