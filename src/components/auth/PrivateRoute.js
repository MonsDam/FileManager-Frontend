import { useNavigate } from 'react-router-dom';

/**
 * @function PrivateRoute
 * @description Componente que protege las rutas privadas. Si el usuario no tiene un token de autenticación válido en el almacenamiento local, será redirigido automáticamente a la página de inicio de sesión utilizando `useNavigate`.
 * 
 * @param {Object} props - Las propiedades del componente.
 * @param {JSX.Element} props.children - Los elementos hijos que se desean renderizar si el usuario tiene un token válido.
 * 
 * @returns {JSX.Element} Si el usuario tiene un token válido, se renderizan los elementos hijos; si no, se redirige al usuario a la página de inicio de sesión.
 */
const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();  // Hook para la navegación programática

    console.log(token);

    // Si no hay token, redirige a la página de inicio de sesión
    if (!token) {
        console.log('first');
        navigate('/login');  // Redirige a la página de login
        return null;  // No renderiza los hijos, ya que se redirige
    }

    // Si hay token, renderiza los elementos hijos
    return children;
};

export default PrivateRoute;
