  import React from "react";
  import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
  import "./App.css";
  import "bootstrap/dist/css/bootstrap.min.css";
  import RecuperarContrasena from "./pages/RecuperarContrasena";

  // Importación de componentes
  import Navbar from "./components/Navbar";
  import Home from "./components/Inicio";
  import Login from "./components/Login";
  import Register from "./components/Registro";

  export default function App() {
    return (
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
                 <Route path="/recuperar" element={<RecuperarContrasena />} />
        </Routes>
      </Router>
    );
  }