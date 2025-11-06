import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut, User, Heart } from 'lucide-react'; // Íconos
import useAuth from '../hooks/useAuth'; // 👈 Asegúrate de que la ruta sea correcta

export default function UserWidget() {
    const { user, isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout(); // Llama a la lógica de useAuth para limpiar tokens
        navigate('/'); // Redirige al inicio después de cerrar sesión
    };

    // 🛑 Caso 1: Usuario NO autenticado (Muestra Login/Registro)
    if (!isAuthenticated) {
        return (
            <div className="d-flex align-items-center">
                <Link to="/login" className="btn btn-outline-primary me-2 fw-semibold">
                    Login
                </Link>
                <Link to="/registro" className="btn btn-primary fw-semibold">
                    Registro
                </Link>
            </div>
        );
    }
    
    // 🛑 Caso 2: Usuario AUTENTICADO (Muestra Avatar y Menú)
    return (
        <div className="dropdown">
            {/* Botón Avatar (el que abre el menú) */}
            <a 
                className="d-flex align-items-center text-dark text-decoration-none dropdown-toggle" 
                href="#" 
                id="dropdownUser" 
                data-bs-toggle="dropdown" 
                aria-expanded="false"
            >
                <img 
                    src={user?.photo || '/IMG/perfil-default.png'} // Usa optional chaining (?) por seguridad
                    alt={user?.name || 'Usuario'} 
                    width="32" 
                    height="32" 
                    className="rounded-circle me-2 border border-2"
                    style={{ objectFit: 'cover' }}
                />
                <span className="d-none d-sm-inline fw-semibold text-muted">{user?.name.split(' ')[0]}</span>
            </a>
            
            {/* Menú Desplegable (Dropdown) */}
            <ul 
                className="dropdown-menu dropdown-menu-end shadow"
                aria-labelledby="dropdownUser"
            >
                <li>
                    <Link to="/perfil" className="dropdown-item">
                        <User size={16} className="me-2 text-primary" />
                        Mi Perfil
                    </Link>
                </li>
                <li>
                    <Link to="/favoritos" className="dropdown-item">
                        <Heart size={16} className="me-2 text-danger" />
                        Mis Favoritos
                    </Link>
                </li>
                <li><hr className="dropdown-divider" /></li>
                <li>
                    {/* Botón de Cierre de Sesión */}
                    <button 
                        onClick={handleLogout} 
                        className="dropdown-item text-danger fw-semibold"
                    >
                        <LogOut size={16} className="me-2" />
                        Cerrar Sesión
                    </button>
                </li>
            </ul>
        </div>
    );
}