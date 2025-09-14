import React from "react";
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Register() {
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
                    <label htmlFor="email" className="form-label">
                      Correo electrónico
                    </label>
                    <input type="email" id="email" className="form-control" required />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="username" className="form-label">
                      Usuario
                    </label>
                    <input type="text" id="username" className="form-control" required />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Contraseña
                    </label>
                    <input type="password" id="password" className="form-control" required />
                  </div>
                  <div className="d-grid">
                    <button type="submit" className="btn btn-success w-100">
                      Registrarse
                    </button>
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
