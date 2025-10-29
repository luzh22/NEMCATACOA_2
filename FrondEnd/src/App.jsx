// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import RecuperarContrasena from "./pages/RecuperarContrasena";

// Importación de componentes / páginas
import Navbar from "./components/Navbar";
import Home from "./pages/Inicio"; // <- aquí la ruta CORRECTA

import Login from "./pages/Login";
import Register from "./pages/Registro";

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Register />} />
        <Route path="/recuperar" element={<RecuperarContrasena />} />
      </Routes>
    </Router>
  );
}
