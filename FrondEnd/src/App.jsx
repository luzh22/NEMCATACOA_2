import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

// Importación de componentes
import Navbar from "./components/Navbar";
import Home from "./pages/Inicio";
import Login from "./pages/Login";
import Register from "./pages/Registro";
import Footer from "./components/Footer";

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
  <Route path="/registro" element={<Register/>} />
      </Routes>
      <Footer />
    </Router>
  );
}