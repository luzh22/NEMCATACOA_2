import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../assets/css/Narvbar_inicio.css";

export default function Narvbar_inicio() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.querySelector(".navbar");
      if (window.scrollY > 50) navbar.classList.add("scrolled");
      else navbar.classList.remove("scrolled");
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light py-2 px-4 shadow-sm fixed-top">
      <div className="container-fluid">
        {/* 🔹 Logo */}
        <Link to="/inicio" className="navbar-brand d-flex align-items-center gap-2">
          <img
            src="/IMG/LOGO.png"
            alt="Nemcatacoa Logo"
            className="navbar-logo"
          />
          <span className="fw-bold text-primary">Nemcatacoa</span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* 🔹 Enlaces */}
        <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
          <ul className="navbar-nav gap-3 fw-semibold">
            <li className="nav-item">
              <Link className="nav-link" to="/ciudades">Todas las ciudades</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/sitios">Sitios principales</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/favoritos">Favoritos</Link>
            </li>
          </ul>
        </div>

        {/* 🔹 Usuario y Logout */}
        <div className="d-flex align-items-center gap-3">
          <div className="avatar-placeholder">
            <span className="avatar-letter">U</span>
          </div>
          <button
            className="btn btn-outline-danger btn-sm fw-semibold"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
