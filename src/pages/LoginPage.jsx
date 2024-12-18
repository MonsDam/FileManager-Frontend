import { useState } from "react";
import { login } from "../services/authService"; // Importa la función para manejar el login
import { Link, Navigate } from "react-router-dom"; // Importa los componentes para la navegación
import { Button, TextField } from "@mui/material"; // Importa componentes de Material UI para el formulario

/**
 * LoginPage es el componente de la página de inicio de sesión de la aplicación.
 * Permite al usuario ingresar sus credenciales (correo electrónico y contraseña) 
 * para autenticarse en el sistema. En caso de éxito, el usuario es redirigido a la página de inicio.
 */
export default function LoginPage() {
    // Estado para controlar la redirección después del login
    const [redirectToHome, setRedirectToHome] = useState(false);
    
    // Estado para almacenar los datos del formulario de login
    const [data, setData] = useState({
        email: '',
        password: '',
    });

    // Maneja el cambio de valor de los campos del formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name)
        setData({
            ...data,
            [name]: value, // Actualiza el campo correspondiente en el estado
        });
    };

    // Maneja el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault(); // Evita el comportamiento por defecto del formulario

        try {
            // Llama al servicio de login con los datos del formulario
            const token = await login(data);
            console.log(token)

            // Guarda el token de autenticación en localStorage
            localStorage.setItem('token', token);

            // Redirige al usuario a la página de inicio
            setRedirectToHome(true);
        } catch (error) {
            console.error('Error de autenticación', error); // En caso de error, se muestra en consola
        }
    };

    // Si el login es exitoso, redirige al usuario a la página de inicio
    if (redirectToHome) {
        return <Navigate to="/home" />;
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100" >
            {/* Formulario de inicio de sesión */}
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 w-72 ">
                    {/* Título del formulario */}
                    <h1 className="font-semibold text-center text-3xl" >Iniciar Sesion</h1>
                    
                    {/* Campo de correo electrónico */}
                    <TextField
                        id="email"
                        type="email"
                        name="email"
                        label="Correo electrónico"
                        variant="outlined"
                        margin="normal"
                        onChange={handleChange}
                    />
                    
                    {/* Campo de contraseña */}
                    <TextField
                        id="password"
                        type="password"
                        name="password"
                        label="Contraseña"
                        variant="outlined"
                        margin="normal"
                        onChange={handleChange}
                    />
                    
                    {/* Enlace para redirigir al registro */}
                    <div className="flex gap-2 justify-center mb-4">
                        No tienes una cuenta?
                        <span className="underline">
                            <Link to="/register">Registrate</Link>
                        </span>
                    </div>
                    
                    {/* Botón de inicio de sesión */}
                    <Button variant="contained" type="submit" >Iniciar sesión</Button>
                </div>
            </form>
        </div>
    );
}
