// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";



import RecuperarContrasena from "./pages/RecuperarContrasena";
import RouteDetail from "./pages/RouteDetail";

// Importación de componentes / páginas
import Home from "./pages/home"
import Navbar from "./components/Navbar";
import Inicio from "./pages/Inicio";
import Login from "./pages/Login";
import Register from "./pages/Registro";


export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        
        <Route path="/" element={<Inicio />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Register />} />
        <Route path="/recuperar" element={<RecuperarContrasena />} />
        <Route path="/rutas/:id" element={<RouteDetail />} />
      </Routes>
    </Router>
  );
}
