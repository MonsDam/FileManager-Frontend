import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../services/authService';

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
        <div>
            <div>
                <h2>Registro de Usuario</h2>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="username">Nombre de usuario:</label>
                        <input
                            type="text"
                            id="username"
                            name="name"
                            value={userData.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="email">Correo electrónico:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={userData.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Contraseña:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={userData.password}
                            onChange={handleChange}
                        />
                    </div>
                    <button type="submit">Registrarse</button>
                </form>
            </div>
        </div>
    )
}