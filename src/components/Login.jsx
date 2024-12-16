import React, { useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirectToHome, setRedirectToHome] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(email)
        console.log(password)

        try {
            const response = await axios.post('http://localhost:8000/api/v1/auth/login', { email, password });
            console.log(response)
            const token = response.data.token;
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="password">Contraseña</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Iniciar sesión</button>
        </form>
    );
};

export default Login;
