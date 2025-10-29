import React, { useState, useEffect } from "react";
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  FaEye,
  FaEyeSlash,
  FaMapMarkerAlt,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";

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

  // Validaciones en tiempo real (estado de cada regla)
  const [validUsername, setValidUsername] = useState(false);
  const [validEmail, setValidEmail] = useState(false);
  const [passwordLengthOk, setPasswordLengthOk] = useState(false);
  const [passwordUpperOk, setPasswordUpperOk] = useState(false);
  const [passwordNumberOk, setPasswordNumberOk] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(false);
  const [edadOk, setEdadOk] = useState(false);

  // Fecha máxima (para input date) — usuario debe ser >= 18 años
  const hoy = new Date();
  const fechaMax = new Date(hoy.setFullYear(hoy.getFullYear() - 18))
    .toISOString()
    .split("T")[0];

  // Validadores auxiliares
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

  const validarEmail = (mail) => {
    // Regex simple para email
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail);
  };

  const validarPasswordRules = (pwd) => {
    setPasswordLengthOk(pwd.length >= 8);
    setPasswordUpperOk(/[A-Z]/.test(pwd));
    setPasswordNumberOk(/\d/.test(pwd));
  };

  // Efectos: ejecutar validaciones cuando cambian los campos
  useEffect(() => {
    setValidUsername(username.trim().length >= 3);
  }, [username]);

  useEffect(() => {
    setValidEmail(validarEmail(email));
  }, [email]);

  useEffect(() => {
    validarPasswordRules(password);
    setPasswordsMatch(password !== "" && password === confirmPassword);
  }, [password, confirmPassword]);

  useEffect(() => {
    setEdadOk(validarEdad(fechaNacimiento));
  }, [fechaNacimiento]);

  // Estado global de validez del formulario
  const isFormValid =
    validUsername &&
    validEmail &&
    passwordLengthOk &&
    passwordUpperOk &&
    passwordNumberOk &&
    passwordsMatch &&
    edadOk &&
    aceptaPoliticas;

  // Geolocalización
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

  // Envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("");

    // Re-check defensivo
    if (!isFormValid) {
      setMensaje(" Completa correctamente todos los campos antes de enviar.");
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
        setMensaje(" Registro exitoso. ¡Bienvenido!");
        // Limpiar formulario
        setUsername("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setFechaNacimiento("");
        setUbicacion("");
        setAceptaPoliticas(false);
      } else {
        setMensaje(` Error: ${data.error || "Error al registrar"}`);
      }
    } catch (error) {
      console.error("Error en el registro:", error);
      setMensaje(" Error en la conexión con el servidor");
    }
  };

  // Íconos de estado para feedback
  const Ok = ({ ok }) =>
    ok ? (
      <FaCheckCircle style={{ color: "#2ecc71", marginLeft: 8 }} aria-hidden />
    ) : (
      <FaTimesCircle style={{ color: "#e74c3c", marginLeft: 8 }} aria-hidden />
    );

  return (
    <main className="main-content">
      <section className="login-section">
        <div className="overlay"></div>

        <div className="container position-relative">
          <div className="row justify-content-center">
            <div className="col-md-7 col-lg-6">
              <div className="login-container p-4 p-md-5 shadow rounded">
                <h1 className="text-center mb-4 text-white">Registro de Usuario</h1>

                <form onSubmit={handleSubmit}>
                  {/* Usuario */}
                  <div className="mb-3">
                    <label htmlFor="username" className="form-label text-white">
                      Usuario
                    </label>
                    <input
                      type="text"
                      id="username"
                      className={`form-control ${validUsername ? "is-valid" : username ? "is-invalid" : ""}`}
                      placeholder="Ej: stefanny98"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                      aria-describedby="usernameHelp"
                    />
                    <div id="usernameHelp" className="form-text text-light">
                      {validUsername ? (
                        <span style={{ color: "#3cd1d6ff" }}>Usuario válido</span>
                      ) : (
                        <span>Min. 3 caracteres.</span>
                      )}
                    </div>
                  </div>

                  {/* Correo */}
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label text-white">
                      Correo electrónico
                    </label>
                    <input
                      type="email"
                      id="email"
                      className={`form-control ${validEmail ? "is-valid" : email ? "is-invalid" : ""}`}
                      placeholder="tu_correo@ejemplo.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      aria-describedby="emailHelp"
                    />
                    <div id="emailHelp" className="form-text text-light">
                      {validEmail ? (
                        <span style={{ color: "#43d4daff" }}>Email válido</span>
                      ) : (
                        <span>Introduce un correo válido.</span>
                      )}
                    </div>
                  </div>

                  {/* Fecha de nacimiento */}
                  <div className="mb-3">
                    <label htmlFor="fechaNacimiento" className="form-label text-white">
                      Fecha de nacimiento
                    </label>
                    <input
                      type="date"
                      id="fechaNacimiento"
                      className={`form-control ${edadOk ? "is-valid" : fechaNacimiento ? "is-invalid" : ""}`}
                      value={fechaNacimiento}
                      onChange={(e) => setFechaNacimiento(e.target.value)}
                      max={fechaMax}
                      required
                      aria-describedby="fechaHelp"
                    />
                    <div id="fechaHelp" className="form-text text-light">
                      {edadOk ? (
                        <span style={{ color: "#37d7e2ff" }}>Edad válida (18+)</span>
                      ) : (
                        <span>Debes ser mayor de 18 años.</span>
                      )}
                    </div>
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
                      {cargandoUbicacion ? "Obteniendo ubicación..." : <><FaMapMarkerAlt /> Usar mi ubicación actual</>}
                    </button>

                    {ubicacion && (
                      <div className="mt-2 alert alert-info p-2 text-dark">
                         {ubicacion}
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
                        className={`form-control ${password ? (passwordLengthOk && passwordUpperOk && passwordNumberOk ? "is-valid" : "is-invalid") : ""}`}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        aria-describedby="passwordHelp"
                      />
                      <span
                        className="input-group-text"
                        style={{ cursor: "pointer" }}
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label="Mostrar contraseña"
                        role="button"
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </span>
                    </div>

                    <div id="passwordHelp" className="form-text text-light mt-2">
                      <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <Ok ok={passwordLengthOk} /> <span style={{ marginLeft: 6 }}>8+ caracteres</span>
                        </div>
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <Ok ok={passwordUpperOk} /> <span style={{ marginLeft: 6 }}>Una letra mayúscula</span>
                        </div>
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <Ok ok={passwordNumberOk} /> <span style={{ marginLeft: 6 }}>Al menos un número</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Confirmar Contraseña */}
                  <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label text-white">
                      Confirmar Contraseña
                    </label>
                    <input
                      type={showPassword ? "text" : "password"}
                      id="confirmPassword"
                      className={`form-control ${confirmPassword ? (passwordsMatch ? "is-valid" : "is-invalid") : ""}`}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                    <div className="form-text text-light">
                      {confirmPassword ? (
                        passwordsMatch ? (
                          <span style={{ color: "#4cddd1ff" }}>Las contraseñas coinciden</span>
                        ) : (
                          <span>Las contraseñas no coinciden</span>
                        )
                      ) : (
                        <span>Repite la contraseña</span>
                      )}
                    </div>
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
                    <button type="submit" className="btn btn-success w-100" disabled={!isFormValid}>
                      {isFormValid ? "Registrarse" : "Completa los datos para registrarte"}
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
