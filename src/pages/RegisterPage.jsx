import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../services/authService';
import { Button, TextField } from '@mui/material';

export default function Register() {
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await register(userData);
            console.log(response.message);
            navigate('/login');
        } catch (err) {
            setError('Error al registrar el usuario. Intenta nuevamente.');
        }
    };

    return (

        <div className='flex items-center justify-center min-h-screen bg-gray-100' >

            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className='grid grid-cols-1 w-72' >

                    <h1 className='font-semibold text-center text-3xl' >Registro de Usuario</h1>
                    <TextField
                        id="name"
                        type="name"
                        name="name"
                        label="Nombre de Usuario"
                        variant="outlined"
                        margin="normal"
                        onChange={handleChange}
                    />

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
                        Ya tienes una cuenta?
                        <span className="underline" >
                            <Link to="/login">Inicia Sesion</Link>
                        </span>
                    </div>
                    <Button variant="contained" type="submit" >Registrate</Button>
                </div>
            </form>
        </div>

    )
}