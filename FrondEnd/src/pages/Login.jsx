import React, { useState } from "react";
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  FaEye,
  FaEyeSlash,
  FaGoogle,
  FaFacebookF,
  FaEnvelope,
  FaInstagram,
} from "react-icons/fa";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Enviando login:", { username, password });

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      console.log("Respuesta del backend:", data);
      setMessage(data.message);
    } catch (err) {
      console.error("Error al conectar con el backend:", err);
      setMessage("Error al conectar con el servidor");
    }
  };

  const handleLogin = (platform) => {
    alert(`Iniciar sesión con ${platform} (disponible próximamente)`);
  };

  return (
    <main className="main-content">
      <section className="login-section">
        <div className="overlay"></div>
        <div className="container position-relative">
          <div className="row justify-content-center">
            <div className="col-md-6 col-lg-5">
              <div className="login-container p-4 p-md-5 shadow rounded">
                <h1 className="text-center mb-4 text-white animate__animated animate__fadeInDown">
                  Inicio de Sesión
                </h1>

                <form
                  onSubmit={handleSubmit}
                  className="animate__animated animate__fadeInUp"
                >
                  {/* Usuario */}
                  <div className="mb-3">
                    <label htmlFor="username" className="form-label text-white">
                      Usuario
                    </label>
                    <input
                      type="text"
                      id="username"
                      className="form-control"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </div>

                  {/* Contraseña */}
                  <div className="mb-3 position-relative">
                    <label htmlFor="password" className="form-label text-white">
                      Contraseña
                    </label>
                    <div className="input-group">
                      <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <span
                        className="input-group-text"
                        style={{
                          cursor: "pointer",
                          backgroundColor: "white",
                          borderLeft: "none",
                        }}
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </span>
                    </div>
                  </div>

                  {/* Botón principal */}
                  <div className="d-grid mb-3">
                    <button
                      type="submit"
                      className="btn btn-primary w-100 login-btn"
                    >
                      Entrar
                    </button>
                  </div>

                  {/* Enlace de recuperación */}
                  <p className="text-center mt-2">
                    <a href="/recuperar" className="forgot-password-link">
                      ¿Olvidaste tu contraseña?
                    </a>
                  </p>

                  {/* Separador */}
                  <div className="text-center text-light my-3">
                    <hr className="text-light" />
                    <span>O inicia sesión con</span>
                    <hr className="text-light" />
                  </div>

                  {/* Botones simples de redes */}
                  <div className="d-flex justify-content-center gap-3 mb-3">
                    <FaGoogle
                      className="social-icon google"
                      onClick={() => handleLogin("Google")}
                    />
                    <FaFacebookF
                      className="social-icon facebook"
                      onClick={() => handleLogin("Facebook")}
                    />
                    <FaEnvelope
                      className="social-icon gmail"
                      onClick={() => handleLogin("Gmail")}
                    />
                    <FaInstagram
                      className="social-icon instagram"
                      onClick={() => handleLogin("Instagram")}
                    />
                  </div>

                  {/* Mensaje del backend */}
                  {message && <p className="text-center text-light mt-3">{message}</p>}
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
