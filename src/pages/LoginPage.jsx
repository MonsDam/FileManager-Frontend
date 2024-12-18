import { useState } from "react";
import { login } from "../services/authService";
import { Link, Navigate } from "react-router-dom";
import { Button, TextField } from "@mui/material";

export default function LoginPage() {
    const [redirectToHome, setRedirectToHome] = useState(false);
    const [data, setData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name)
        setData({
            ...data,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            const token = await login(data);
            console.log(token)

            localStorage.setItem('token', token);

            setRedirectToHome(true)
        } catch (error) {
            console.error('Error de autenticación', error);
        }
    };

    if (redirectToHome) {
        return <Navigate to="/home" />;
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100" >
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 w-72 ">
                    <h1 className="font-semibold text-center text-3xl" >Iniciar Sesion</h1>
                    <TextField
                        id="email"
                        type="email"
                        name="email"
                        label="Correo electrónico"
                        variant="outlined"
                        margin="normal"
                        onChange={handleChange}
                    />
                    <TextField
                        id="password"
                        type="password"
                        name="password"
                        label="Contraseña"
                        variant="outlined"
                        margin="normal"
                        onChange={handleChange}
                    />
                    <div className=" flex gap-2 justify-center mb-4 " >
                        No tienes una cuenta?
                        <span className="underline" >
                            <Link to="/register">Registrate</Link>
                        </span>
                    </div>
                    <Button variant="contained" type="submit" >Iniciar sesión</Button>
                </div>
            </form>
        </div>
    )
}