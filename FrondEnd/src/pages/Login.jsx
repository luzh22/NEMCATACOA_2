import React, { useState } from "react";
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Enviando login:", { username, password }); // depuración

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

  return (
    <main className="main-content">
      <section className="login-section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6 col-lg-5">
              <div className="login-container p-4 p-md-5">
                <h1 className="text-center mb-4">Inicio de Sesión</h1>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="username" className="form-label">Usuario</label>
                    <input
                      type="text"
                      id="username"
                      className="form-control"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">Contraseña</label>
                    <input
                      type="password"
                      id="password"
                      className="form-control"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>

                  <div className="d-grid mb-2">
                    <button type="submit" className="btn btn-primary w-100">Entrar</button>
                  </div>

                  {message && <p className="text-center">{message}</p>}
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
