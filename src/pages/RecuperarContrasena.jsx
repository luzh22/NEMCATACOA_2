import React, { useState } from "react";
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function RecuperarContrasena() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/auth/recuperar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      setMessage(data.message || "Si el correo existe, te enviaremos un enlace para restablecer tu contraseña.");
    } catch (error) {
      console.error("Error:", error);
      setMessage("Error al conectar con el servidor.");
    }
  };

  return (
    <main className="main-content">
      <section className="login-section">
        <div className="overlay"></div>

        <div className="container position-relative">
          <div className="row justify-content-center">
            <div className="col-md-6 col-lg-5">
              <div className="login-container p-4 p-md-5 shadow rounded">
                <h2 className="text-center mb-4 text-white">
                  Recuperar Contraseña
                </h2>

                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label text-white">
                      Correo electrónico
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="form-control"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="d-grid mb-3">
                    <button type="submit" className="btn btn-primary w-100">
                      Enviar enlace de recuperación
                    </button>
                  </div>

                  <p className="text-center mt-2">
                    <a href="/login" className="forgot-password-link">
                      ← Volver al inicio de sesión
                    </a>
                  </p>

                  {message && <p className="text-center text-light">{message}</p>}
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
