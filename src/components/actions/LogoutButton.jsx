import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function LogoutButton() {
    const navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem('token');

        navigate('/login');
    };
    return (
        <div>
            <Button variant="outlined" onClick={logout} >Cerrar Sesion</Button>
        </div>
    )
}