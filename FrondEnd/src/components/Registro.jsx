import React, { useState } from "react";
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Register() {
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [errorEdad, setErrorEdad] = useState("");
  const [ubicacion, setUbicacion] = useState("");
  const [cargandoUbicacion, setCargandoUbicacion] = useState(false);

  const validarMayorEdad = (fecha) => {
    if (!fecha) return false;
    const hoy = new Date();
    const nacimiento = new Date(fecha);

    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const mes = hoy.getMonth() - nacimiento.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
      edad--;
    }
    return edad >= 18;
  };

  const handleChangeFecha = (e) => {
    const fecha = e.target.value;
    setFechaNacimiento(fecha);

    if (!validarMayorEdad(fecha)) {
      setErrorEdad("Debes ser mayor de 18 años");
    } else {
      setErrorEdad("");
    }
  };

  const obtenerUbicacion = () => {
    if (!navigator.geolocation) {
      alert("Tu navegador no soporta geolocalización");
      return;
    }

    setCargandoUbicacion(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUbicacion(`Lat: ${latitude.toFixed(4)}, Lng: ${longitude.toFixed(4)}`);
        setCargandoUbicacion(false);
      },
      () => {
        alert("No se pudo obtener la ubicación");
        setCargandoUbicacion(false);
      }
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validarMayorEdad(fechaNacimiento)) {
      alert("Debes ser mayor de edad para registrarte.");
      return;
    }
    alert(`Registro exitoso ✅\nUbicación: ${ubicacion || "No seleccionada"}`);
  };

  const hoy = new Date();
  const fechaMax = new Date(hoy.setFullYear(hoy.getFullYear() - 18))
    .toISOString()
    .split("T")[0];

  return (
    <main className="main-content">
  <section className="register-section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6 col-lg-5">
              <div className="login-container p-4 p-md-5">
                <h1 className="text-center mb-4">Registro</h1>
                <form onSubmit={handleSubmit}>
                  {/* Email */}
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Correo electrónico
                    </label>
                    <input type="email" id="email" className="form-control" required />
                  </div>

                  {/* Nombre */}
                  <div className="mb-3">
                    <label htmlFor="nombre" className="form-label">
                      Nombres
                    </label>
                    <input type="text" id="nombre" className="form-control" required />
                  </div>

                  {/* Apellido */}
                  <div className="mb-3">
                    <label htmlFor="apellido" className="form-label">
                      Apellidos
                    </label>
                    <input type="text" id="apellido" className="form-control" required />
                  </div>

                  {/* Fecha de nacimiento */}
                  <div className="mb-3">
                    <label htmlFor="birthdate" className="form-label">
                      Fecha de nacimiento
                    </label>
                    <input
                      type="date"
                      id="birthdate"
                      className={`form-control ${errorEdad ? "is-invalid" : ""}`}
                      value={fechaNacimiento}
                      onChange={handleChangeFecha}
                      max={fechaMax}
                      required
                    />
                    {errorEdad && <div className="invalid-feedback">{errorEdad}</div>}
                  </div>

                  {/* Ubicación */}
                  <div className="mb-3">
                    <label htmlFor="location" className="form-label">
                      Ubicación
                    </label>
                    <select
                      id="location"
                      className="form-select"
                      value={ubicacion}
                      onChange={(e) => setUbicacion(e.target.value)}
                    >
                      <option value="">Seleccione su ciudad</option>
                      <option value="Bogotá">Bogotá</option>
                      <option value="Medellín">Medellín</option>
                      <option value="Cali">Cali</option>
                      <option value="Otra">Otra...</option>
                    </select>

                    <button
                      type="button"
                      className="btn btn-outline-primary mt-2 w-100"
                      onClick={obtenerUbicacion}
                      disabled={cargandoUbicacion}
                    >
                      {cargandoUbicacion ? "Obteniendo ubicación..." : "Usar mi ubicación actual"}
                    </button>

                    {ubicacion && (
                      <div className="mt-2 alert alert-info p-2">
                        📍 Ubicación seleccionada: {ubicacion}
                      </div>
                    )}
                  </div>

                  {/* Usuario */}
                  <div className="mb-3">
                    <label htmlFor="username" className="form-label">
                      Usuario
                    </label>
                    <input type="text" id="username" className="form-control" required />
                  </div>

                  {/* Contraseña */}
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Contraseña
                    </label>
                    <input type="password" id="password" className="form-control" required />
                  </div>

                  {/* Botón */}
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
