import { useState, useEffect } from 'react';
// Usamos useNavigate si necesitas redirigir dentro del hook (opcional)

// Define el usuario de prueba para simular que está logueado
const initialUser = { 
    name: "Carlos Yused Bernal", 
    email: "carlos@nemcatacoa.com", 
    photo: "/IMG/perfil.png" 
};

// La llave de localStorage donde guardarías el token real o el estado
const STORAGE_KEY_TOKEN = 'nemcatacoa_auth_token'; 

export default function useAuth() {
    
    // 💡 Lógica de inicialización real:
    // Carga el usuario si existe un token en localStorage. 
    // Si no hay token, el estado comienza como null (no autenticado).
    const [user, setUser] = useState(() => {
        const token = localStorage.getItem(STORAGE_KEY_TOKEN);
        
        // 🚨 IMPORTANTE PARA DESARROLLO: Si hay un token, devolvemos el usuario de prueba. 
        // En una app real, aquí decodificarías el token o harías una llamada API.
        // Si no hay token, o si el token está vacío, devolvemos el usuario de prueba 
        // para asegurar que el Navbar se renderice (lo más probable es que necesites esto).
        if (token) {
            return initialUser; 
        }
        
        // 🚨 Si quieres forzar que el Navbar siempre se vea logueado, descomenta la siguiente línea
        // y comenta la línea que devuelve 'null'.
        // return initialUser;
        
        return null;
    });

    // 💡 La variable clave: es true si 'user' es un objeto y no null/undefined
    const isAuthenticated = !!user;

    const login = (token, userData) => {
        // En una app real:
        // 1. Guardar el token
        localStorage.setItem(STORAGE_KEY_TOKEN, token);
        // 2. Establecer el usuario
        setUser(userData || initialUser); 
    };

    const logout = () => {
        // 1. Limpiar el token
        localStorage.removeItem(STORAGE_KEY_TOKEN);
        // 2. Limpiar el estado del usuario
        setUser(null); 
    };

    // 💡 Efecto para guardar el token simulado en localStorage al inicio
    // Puedes usar esto para simular que el usuario siempre está logueado al cargar la página.
    useEffect(() => {
        if (isAuthenticated && !localStorage.getItem(STORAGE_KEY_TOKEN)) {
             // Simulamos un token para que la lógica de inicialización funcione
             localStorage.setItem(STORAGE_KEY_TOKEN, 'simulated-token-12345'); 
        }
    }, [isAuthenticated]);


    return {
        user,
        isAuthenticated,
        login,
        logout,
    };
}