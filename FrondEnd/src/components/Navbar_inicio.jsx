import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import UserWidget from './UserWidget'; // 💡 Nuevo Componente que maneja Auth/Logout/Avatar
import "../assets/css/Narvbar_inicio.css";

// Nota: Renombré el componente a 'Navbar_inicio' para corregir la ortografía en el nombre (Narvbar -> Navbar).

export default function Navbar_inicio() {
  // 💡 Lógica de Scroll (¡Muy bien implementada!)
  useEffect(() => {
    // Nota: Debes asegurar que la clase 'navbar' está en el tag <nav> para que funcione.
    const handleScroll = () => {
      const navbar = document.querySelector(".navbar");
      if (navbar) { // Agregamos una verificación para evitar errores
          if (window.scrollY > 50) navbar.classList.add("scrolled");
          else navbar.classList.remove("scrolled");
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light py-2 px-4 shadow-sm fixed-top">
      <div className="container-fluid">
        {/* 🔹 Logo y Marca */}
        <Link to="/inicio" className="navbar-brand d-flex align-items-center gap-2">
          <img
            src="/IMG/LOGO.png"
            alt="Nemcatacoa Logo"
            className="navbar-logo"
          />
          <span className="fw-bold text-primary">Nemcatacoa</span>
        </Link>

        {/* 🔹 Botón Toggler */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* 🔹 Enlaces (Se mantiene igual) */}
        <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
          <ul className="navbar-nav gap-3 fw-semibold">
            <li className="nav-item">
              {/* 💡 Recomendación: Usar /rutas o /ciudades, pero sé consistente en App.jsx */}
              <Link className="nav-link" to="/ciudades">Todas las Ciudades</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/favoritos">Favoritos</Link>
            </li>
          </ul>
        </div>

        {/* 🔹 NUEVA SECCIÓN DE USUARIO */}
        {/* Aquí integramos el componente dinámico que muestra Login/Registro o Avatar/Logout */}
        <UserWidget /> 
        
      </div>
    </nav>
  );
}