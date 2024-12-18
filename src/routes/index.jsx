// Rutas de la aplicación con React Router

import { Navigate, Route, Routes } from 'react-router-dom'; // Importa los componentes de rutas de React Router
import Home from '../pages/Home'; // Importa la página principal de la aplicación
import LoginPage from '../pages/LoginPage'; // Importa la página de inicio de sesión
import PrivateRoute from '../components/auth/PrivateRoute'; // Importa la ruta privada que protege el acceso a páginas solo para usuarios autenticados
import RegisterPage from '../pages/RegisterPage'; // Importa la página de registro de usuario

/**
 * Componente que define las rutas de la aplicación.
 * Utiliza React Router para definir las rutas principales.
 * También incluye rutas protegidas (requieren autenticación) mediante el componente `PrivateRoute`.
 */
const Router = () => {
    return (
        <Routes>
            {/* Ruta principal redirige a la página de login */}
            <Route path="/" element={<Navigate to="/login" />} />

            {/* Ruta para la página de login */}
            <Route path="/login" element={<LoginPage />} />

            {/* Ruta para la página de registro */}
            <Route path="/register" element={<RegisterPage />} />

            {/* Ruta protegida para la página de inicio (Home) */}
            <Route
                path="/home"
                element={
                    // PrivateRoute protege el acceso a la página Home
                    <PrivateRoute>
                        <Home />
                    </PrivateRoute>
                }
            />
        </Routes>
    );
};

export default Router;
