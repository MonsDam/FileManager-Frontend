// Componente para validar y proteger las rutas

import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    console.log(token)
    if (!token) {
        console.log('first')
        return 'no token'
        // return (<Navigate to="/login" />);
    }

    return children;
};

export default PrivateRoute;
