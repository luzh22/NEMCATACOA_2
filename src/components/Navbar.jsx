import React from "react";
import "../App.css";
import { NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg fixed-top shadow-sm bg-light">
      <div className="container">
        <NavLink className="navbar-brand" to="/">
          <img
            src="/IMG/logo.png"
            alt="Logo"
            width="150"
            height="100"
            className="d-inline-block align-text-top"
          />
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav ms-auto">
            <NavLink className="nav-link" to="/">
              INICIO
            </NavLink>
            <NavLink className="nav-link" to="/login">
              INICIAR SESIÓN
            </NavLink>
            <NavLink className="nav-link" to="/register">
              REGISTRARSE
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}
