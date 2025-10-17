import React, { useState } from "react";
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaEye, FaEyeSlash, FaMapMarkerAlt } from "react-icons/fa";

export default function Registro() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [ubicacion, setUbicacion] = useState("");
  const [cargandoUbicacion, setCargandoUbicacion] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [aceptaPoliticas, setAceptaPoliticas] = useState(false);
  const [mensaje, setMensaje] = useState("");

  // ✅ Validar edad mínima de 18 años
  const validarEdad = (fecha) => {
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

  // 📍 Obtener ubicación actual del usuario
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

  // 🧩 Enviar formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMensaje("❌ Las contraseñas no coinciden");
      return;
    }

    if (!validarEdad(fechaNacimiento)) {
      setMensaje("❌ Debes ser mayor de 18 años para registrarte");
      return;
    }

    if (!aceptaPoliticas) {
      setMensaje("⚠️ Debes aceptar las políticas de privacidad");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/usuarios/registro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          email,
          password,
          fechaNacimiento,
          ubicacion,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setMensaje("✅ Registro exitoso. ¡Bienvenido!");
        setUsername("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setFechaNacimiento("");
        setUbicacion("");
        setAceptaPoliticas(false);
      } else {
        setMensaje(`❌ Error: ${data.error || "Error al registrar"}`);
      }
    } catch (error) {
      console.error("Error en el registro:", error);
      setMensaje("❌ Error en la conexión con el servidor");
    }
  };

  const hoy = new Date();
  const fechaMax = new Date(hoy.setFullYear(hoy.getFullYear() - 18))
    .toISOString()
    .split("T")[0];

  return (
    <main className="main-content">
      <section className="login-section">
        <div className="overlay"></div>

        <div className="container position-relative">
          <div className="row justify-content-center">
            <div className="col-md-6 col-lg-5">
              <div className="login-container p-4 p-md-5 shadow rounded">
                <h1 className="text-center mb-4 text-white animate__animated animate__fadeInDown">
                  Registro de Usuario
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
                      placeholder="Ej: stefanny98"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </div>

                  {/* Correo */}
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label text-white">
                      Correo electrónico
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="form-control"
                      placeholder="tu_correo@ejemplo.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  {/* Fecha de nacimiento */}
                  <div className="mb-3">
                    <label htmlFor="fechaNacimiento" className="form-label text-white">
                      Fecha de nacimiento
                    </label>
                    <input
                      type="date"
                      id="fechaNacimiento"
                      className="form-control"
                      value={fechaNacimiento}
                      onChange={(e) => setFechaNacimiento(e.target.value)}
                      max={fechaMax}
                      required
                    />
                  </div>

                  {/* Ubicación */}
                  <div className="mb-3">
                    <label htmlFor="ubicacion" className="form-label text-white">
                      Ubicación
                    </label>
                    <select
                      id="ubicacion"
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
                      className="btn btn-outline-light mt-2 w-100"
                      onClick={obtenerUbicacion}
                      disabled={cargandoUbicacion}
                    >
                      {cargandoUbicacion ? (
                        "Obteniendo ubicación..."
                      ) : (
                        <>
                          <FaMapMarkerAlt /> Usar mi ubicación actual
                        </>
                      )}
                    </button>

                    {ubicacion && (
                      <div className="mt-2 alert alert-info p-2 text-dark">
                        📍 {ubicacion}
                      </div>
                    )}
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
                        style={{ cursor: "pointer" }}
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </span>
                    </div>
                  </div>

                  {/* Confirmar Contraseña */}
                  <div className="mb-3 position-relative">
                    <label htmlFor="confirmPassword" className="form-label text-white">
                      Confirmar Contraseña
                    </label>
                    <input
                      type={showPassword ? "text" : "password"}
                      id="confirmPassword"
                      className="form-control"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>

                  {/* Políticas de privacidad */}
                  <div className="form-check mb-3">
                    <input
                      type="checkbox"
                      id="politicas"
                      className="form-check-input"
                      checked={aceptaPoliticas}
                      onChange={(e) => setAceptaPoliticas(e.target.checked)}
                      required
                    />
                    <label htmlFor="politicas" className="form-check-label text-white">
                      Acepto las{" "}
                      <a href="/politicas" className="text-warning">
                        políticas de privacidad
                      </a>{" "}
                      y los{" "}
                      <a href="/terminos" className="text-warning">
                        términos de uso
                      </a>
                      .
                    </label>
                  </div>

                  {/* Botón */}
                  <div className="d-grid mb-3">
                    <button type="submit" className="btn btn-success w-100">
                      Registrarse
                    </button>
                  </div>

                  {/* Enlace de inicio de sesión */}
                  <p className="text-center mt-2 text-white">
                    ¿Ya tienes cuenta?{" "}
                    <a href="/login" className="text-warning">
                      Inicia sesión aquí
                    </a>
                  </p>

                  {/* Mensaje */}
                  {mensaje && (
                    <p className="text-center mt-3 text-light fw-bold">
                      {mensaje}
                    </p>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
