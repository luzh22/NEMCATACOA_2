import React, { useState } from "react";
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // lógica de login...
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      setMessage(data.message);
    } catch (err) {
      console.error(err);
      setMessage("Error al conectar con el servidor");
    }
  };

  const handleLogin = (platform) => {
    alert(`Iniciar sesión con ${platform} (disponible próximamente)`);
  };

  return (
    <main className="main-content">
      <section className="login-section">
        <div className="overlay" />
        <div className="container position-relative">
          <div className="row justify-content-center">
            <div className="col-md-6 col-lg-5">
              <div className="login-container p-4 p-md-5 shadow rounded">
                <h1 className="text-center mb-4 text-white">
                  Inicio de Sesión
                </h1>

                <form onSubmit={handleSubmit} className="animate__animated animate__fadeInUp">
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
                        style={{
                          borderRight: "none",
                          borderWidth: "1px",
                        }}
                      />
                      <span
                        className="input-group-text password-toggle"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label="Mostrar contraseña"
                        role="button"
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </span>
                    </div>
                  </div>

                  <div className="d-grid mb-3">
                    <button type="submit" className="btn btn-primary w-100 login-btn">
                      Entrar
                    </button>
                  </div>

                  <p className="text-center mt-2">
                    <a href="/recuperar" className="forgot-password-link">
                      ¿Olvidaste tu contraseña?
                    </a>
                  </p>

                  <div className="text-center text-light my-3">
                    <hr className="text-light" />
                    <span>O inicia sesión con</span>
                    <hr className="text-light" />
                  </div>

                  {/* botones sociales: idénticos, circulares, centrados */}
                  <div className="social-row d-flex justify-content-center gap-3 mb-3">
                   

                    <button
                      type="button"
                      className="social-btn"
                      onClick={() => handleLogin("Facebook")}
                      aria-label="Iniciar sesión con Facebook"
                      title="Facebook"
                    >
                      <img
                        src="https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_(2019).png"
                        alt="Facebook"
                        className="social-logo"
                      />
                    </button>

                    <button
                      type="button"
                      className="social-btn"
                      onClick={() => handleLogin("Gmail")}
                      aria-label="Iniciar sesión con Gmail"
                      title="Gmail"
                    >
                      <img
                        src="https://upload.wikimedia.org/wikipedia/commons/7/7e/Gmail_icon_(2020).svg"
                        alt="Gmail"
                        className="social-logo"
                      />
                    </button>

                    
                  </div>

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
