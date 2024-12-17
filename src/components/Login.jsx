import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { login } from '../services/authService';

const Login = () => {
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
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="email">Correo electrónico</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={data.email}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="password">Contraseña</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={data.password}
                    onChange={handleChange}
                    required
                />
            </div>
            <button type="submit">Iniciar sesión</button>
        </form>
    );
};

export default Login;
