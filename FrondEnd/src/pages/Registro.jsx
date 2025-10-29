// src/pages/Registro.jsx
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
  const [telefono, setTelefono] = useState("");
  const [telefonoPais, setTelefonoPais] = useState("+57"); // por defecto Colombia
  const [cargandoUbicacion, setCargandoUbicacion] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [aceptaPoliticas, setAceptaPoliticas] = useState(false);
  const [mensaje, setMensaje] = useState("");

  const [validUsername, setValidUsername] = useState(false);
  const [validEmail, setValidEmail] = useState(false);
  const [passwordLengthOk, setPasswordLengthOk] = useState(false);
  const [passwordUpperOk, setPasswordUpperOk] = useState(false);
  const [passwordNumberOk, setPasswordNumberOk] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(false);
  const [edadOk, setEdadOk] = useState(false);
  const [telefonoOk, setTelefonoOk] = useState(true);

  const hoy = new Date();
  const fechaMax = new Date(hoy.setFullYear(hoy.getFullYear() - 18))
    .toISOString()
    .split("T")[0];

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

  const validarEmail = (mail) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail);

  const validarPasswordRules = (pwd) => {
    setPasswordLengthOk(pwd.length >= 8);
    setPasswordUpperOk(/[A-Z]/.test(pwd));
    setPasswordNumberOk(/\d/.test(pwd));
  };

  // Validación teléfono simple: solo dígitos entre 7 y 15 (sin contar el +)
  const validarTelefono = (pais, tel) => {
    const dig = tel.replace(/\D/g, "");
    return dig.length >= 7 && dig.length <= 15;
  };

  useEffect(() => setValidUsername(username.trim().length >= 3), [username]);
  useEffect(() => setValidEmail(validarEmail(email)), [email]);
  useEffect(() => {
    validarPasswordRules(password);
    setPasswordsMatch(password !== "" && password === confirmPassword);
  }, [password, confirmPassword]);
  useEffect(() => setEdadOk(validarEdad(fechaNacimiento)), [fechaNacimiento]);
  useEffect(() => setTelefonoOk(telefono ? validarTelefono(telefonoPais, telefono) : true), [telefono, telefonoPais]);

  const isFormValid =
    validUsername &&
    validEmail &&
    passwordLengthOk &&
    passwordUpperOk &&
    passwordNumberOk &&
    passwordsMatch &&
    edadOk &&
    aceptaPoliticas &&
    telefonoOk;

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("");

    if (!isFormValid) {
      setMensaje("Completa correctamente todos los campos antes de enviar.");
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
          telefono: telefono ? telefono : null,
          telefonoPais: telefonoPais ? telefonoPais : null,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setMensaje("Registro exitoso. ¡Bienvenido!");
        setUsername("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setFechaNacimiento("");
        setUbicacion("");
        setTelefono("");
        setTelefonoPais("+57");
        setAceptaPoliticas(false);
      } else {
        setMensaje(`Error: ${data.error || "Error al registrar"}`);
      }
    } catch (error) {
      console.error("Error en el registro:", error);
      setMensaje("Error en la conexión con el servidor");
    }
  };

  // COMPONENTE Ok: declarado UNA sola vez
  const Ok = ({ ok }) =>
    ok ? (
      <FaCheckCircle style={{ color: "#2ecc71", marginLeft: 8 }} />
    ) : (
      <FaTimesCircle style={{ color: "#e74c3c", marginLeft: 8 }} />
    );

  return (
    <main className="main-content">
      <section className="login-section">
        <div className="overlay"></div>
        <div className="container position-relative">
          <div className="row justify-content-center">
            <div className="col-md-8 col-lg-7">
              <div className="login-container p-4 p-md-5 shadow rounded">
                <h1 className="text-center mb-4 text-white">Registro de Usuario</h1>

                <form onSubmit={handleSubmit}>
                  {/* Usuario */}
                  <div className="mb-3">
                    <label htmlFor="username" className="form-label text-white">Usuario</label>
                    <input
                      type="text"
                      id="username"
                      className={`form-control ${validUsername ? "is-valid" : username ? "is-invalid" : ""}`}
                      placeholder="Ej: stefanny98"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </div>

                  {/* Email */}
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label text-white">Correo electrónico</label>
                    <input
                      type="email"
                      id="email"
                      className={`form-control ${validEmail ? "is-valid" : email ? "is-invalid" : ""}`}
                      placeholder="tu_correo@ejemplo.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  {/* Fecha de nacimiento */}
                  <div className="mb-3">
                    <label htmlFor="fechaNacimiento" className="form-label text-white">Fecha de nacimiento</label>
                    <input
                      type="date"
                      id="fechaNacimiento"
                      className={`form-control ${edadOk ? "is-valid" : fechaNacimiento ? "is-invalid" : ""}`}
                      value={fechaNacimiento}
                      onChange={(e) => setFechaNacimiento(e.target.value)}
                      max={fechaMax}
                      required
                    />
                  </div>

                  {/* TELÉFONO con selector de país */}
                  <div className="mb-3">
                    <label className="form-label text-white">Teléfono</label>

                    <div className="d-flex gap-2">
                      <select
                        className="form-select col-auto"
                        style={{ maxWidth: 140 }}
                        value={telefonoPais}
                        onChange={(e) => setTelefonoPais(e.target.value)}
                      >
                        <option value="+57">Colombia (+57)</option>
                        <option value="+1">EE. UU. / CAN (+1)</option>
                        <option value="+34">España (+34)</option>
                        <option value="+52">México (+52)</option>
                        <option value="+44">Reino Unido (+44)</option>
                        <option value="">Otro</option>
                      </select>

                      <input
                        type="tel"
                        className={`form-control ${telefono ? (telefonoOk ? "is-valid" : "is-invalid") : ""}`}
                        placeholder="3001234567"
                        value={telefono}
                        onChange={(e) => setTelefono(e.target.value)}
                      />
                    </div>

                    <div className="form-text text-light">
                      {telefono ? (telefonoOk ? <span>Teléfono válido</span> : <span>Teléfono inválido</span>) : <span>Opcional</span>}
                    </div>
                  </div>

                  {/* Ubicación */}
                  <div className="mb-3">
                    <label htmlFor="ubicacion" className="form-label text-white">Ubicación</label>
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
                  </div>

                  {/* Contraseña */}
                  <div className="mb-3 position-relative">
                    <label htmlFor="password" className="form-label text-white">Contraseña</label>
                    <div className="input-group">
                      <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        className={`form-control ${password ? (passwordLengthOk && passwordUpperOk && passwordNumberOk ? "is-valid" : "is-invalid") : ""}`}
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

                    <div className="form-text text-light mt-2">
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
                    <label htmlFor="confirmPassword" className="form-label text-white">Confirmar Contraseña</label>
                    <input
                      type={showPassword ? "text" : "password"}
                      id="confirmPassword"
                      className={`form-control ${confirmPassword ? (passwordsMatch ? "is-valid" : "is-invalid") : ""}`}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>

                  {/* Políticas */}
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
                      Acepto las políticas de privacidad y términos de uso
                    </label>
                  </div>

                  <div className="d-grid mb-3">
                    <button type="submit" className="btn btn-success w-100" disabled={!isFormValid}>
                      {isFormValid ? "Registrarse" : "Completa los datos para registrarte"}
                    </button>
                  </div>

                  {/* ENLACE RESTAURADO: si ya tiene cuenta */}
                  <p className="text-center mt-2 text-white">
                    ¿Ya tienes cuenta?{" "}
                    <a href="/login" className="text-warning">
                      Inicia sesión aquí
                    </a>
                  </p>

                  {mensaje && <p className="text-center mt-3 text-light fw-bold">{mensaje}</p>}
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
