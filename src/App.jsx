import React from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./App.css"; // tus estilos personalizados

// 🔹 NAVBAR
function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg fixed-top shadow-sm bg-light">
      <div className="container">
        <NavLink className="navbar-brand" to="/">
          <img
            src="/img/logo.png"
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
            <NavLink className="nav-link" to="/">INICIO</NavLink>
            <NavLink className="nav-link" to="/login">INICIAR SESIÓN</NavLink>
            <NavLink className="nav-link" to="/register">REGISTRARSE</NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}

// 🔹 HOME con carrusel
function Home() {
  return (
    <main className="main-content">
      <section className="text-center">
        <div className="container">
          <h1>¿Listo para conocer NEMCATACOA?</h1>
          <p className="lead">Tecnología que honra países</p>
        </div>

        {/* Carrusel Bootstrap */}
        <div
          id="carouselExampleIndicators"
          className="carousel slide mt-4"
          data-bs-ride="carousel"
        >
          {/* Indicadores */}
          <div className="carousel-indicators">
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3"></button>
          </div>

          {/* Imágenes */}
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src="/img/img1.png" className="d-block w-100 custom-carousel" alt="Slide 1" />
            </div>
            <div className="carousel-item">
              <img src="/img/img2.png" className="d-block w-100 custom-carousel" alt="Slide 2" />
            </div>
            <div className="carousel-item">
              <img src="/img/img3.png" className="d-block w-100 custom-carousel" alt="Slide 3" />
            </div>
            <div className="carousel-item">
              <img src="/img/img4.png" className="d-block w-100 custom-carousel" alt="Slide 4" />
            </div>
          </div>

          {/* Controles */}
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
            <span className="carousel-control-prev-icon"></span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
            <span className="carousel-control-next-icon"></span>
          </button>
        </div>
      </section>
    </main>
  );
}

// 🔹 LOGIN
function Login() {
  return (
    <main className="main-content">
      <section className="login-section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6 col-lg-5">
              <div className="login-container p-4 p-md-5">
                <h1 className="text-center mb-4">Inicio de Sesión</h1>
                <form>
                  <div className="mb-3">
                    <label htmlFor="username" className="form-label">Usuario</label>
                    <input type="text" id="username" className="form-control" required />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">Contraseña</label>
                    <input type="password" id="password" className="form-control" required />
                  </div>
                  <div className="d-grid">
                    <button type="submit" className="btn btn-primary w-100">Entrar</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

// 🔹 REGISTER
function Register() {
  return (
    <main className="main-content">
      <section className="login-section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6 col-lg-5">
              <div className="login-container p-4 p-md-5">
                <h1 className="text-center mb-4">Registro</h1>
                <form>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Correo electrónico</label>
                    <input type="email" id="email" className="form-control" required />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="username" className="form-label">Usuario</label>
                    <input type="text" id="username" className="form-control" required />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">Contraseña</label>
                    <input type="password" id="password" className="form-control" required />
                  </div>
                  <div className="d-grid">
                    <button type="submit" className="btn btn-success w-100">Registrarse</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

// 🔹 APP PRINCIPAL
export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}
