// rutas a las paginas

import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import LoginPage from '../pages/LoginPage';
import PrivateRoute from '../components/auth/PrivateRoute';
import RegisterPage from '../pages/RegisterPage';

const Router = () => {
    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route
                path="/home"
                element={
                    <PrivateRoute>
                        <Home />
                    </PrivateRoute>
                }
            />
        </Routes>
    );
};

export default Router;
