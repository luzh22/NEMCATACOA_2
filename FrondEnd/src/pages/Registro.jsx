
import React, { useState, useEffect, useRef } from "react";
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  FaEye,
  FaEyeSlash,
  FaMapMarkerAlt,
  FaCheckCircle,
  FaTimesCircle,
  FaSearch,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

export default function Registro() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  // Ciudad seleccionada (select) y campo para "Otro"
  const [ciudad, setCiudad] = useState("");
  const [ciudadOtra, setCiudadOtra] = useState("");
  // Dirección exacta (calle, número, etc.) que obtiene "Usar mi ubicación actual"
  const [direccionExacta, setDireccionExacta] = useState("");
  const [ubicacionManual, setUbicacionManual] = useState(""); // extra si se requiere
  const [telefono, setTelefono] = useState("");
  const [telefonoPais, setTelefonoPais] = useState("+57"); // por defecto Colombia
  const [telefonoIso, setTelefonoIso] = useState("co");
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

  // países descargados y búsqueda
  const [countries, setCountries] = useState([]);
  const [countryQuery, setCountryQuery] = useState("");
  const [countryDropdownOpen, setCountryDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Modal state
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const [welcomeMessage, setWelcomeMessage] = useState("");

  const hoy = new Date();
  const fechaMax = new Date(hoy.setFullYear(hoy.getFullYear() - 18))
    .toISOString()
    .split("T")[0];

  const ciudadesColombia = [
    "Bogotá",
    "Medellín",
    "Cali",
    "Barranquilla",
    "Cartagena",
    "Bucaramanga",
    "Pereira",
    "Manizales",
    "Pasto",
    "Cúcuta",
    "Ibagué",
    "Montería",
    "Villavicencio",
    "Neiva",
    "Sincelejo",
    "Valledupar",
    "Otro",
  ];

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

  const validarTelefonoConLib = (paisCode, tel) => {
    try {
      const digits = (tel || "").replace(/\D/g, "");
      if (!digits) return false;
      const full = (paisCode || "") + digits;
      const phone = parsePhoneNumberFromString(full);
      return phone ? phone.isValid() : false;
    } catch (err) {
      console.error("Error parse phone:", err);
      return false;
    }
  };

  // Load countries list
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch("https://restcountries.com/v3.1/all?fields=name,cca2,idd");
        const data = await res.json();
        if (!mounted) return;
        const list = data
          .map((c) => {
            const name = c?.name?.common || "";
            const iso2 = c?.cca2 ? c.cca2.toLowerCase() : "";
            let dial = "";
            if (c?.idd?.root) {
              const suffix = Array.isArray(c.idd.suffixes) && c.idd.suffixes.length ? c.idd.suffixes[0] : "";
              dial = `${c.idd.root || ""}${suffix || ""}`;
            }
            if (dial && !dial.startsWith("+")) dial = `+${dial}`;
            return { name, iso2, dial };
          })
          .filter((c) => c.name)
          .sort((a, b) => a.name.localeCompare(b.name));
        setCountries(list);
        const defaultCountry = list.find((c) => c.name.toLowerCase().includes("colomb"));
        if (defaultCountry) {
          setTelefonoPais(defaultCountry.dial || "+57");
          setTelefonoIso(defaultCountry.iso2 || "co");
          setCountryQuery(defaultCountry.name);
        }
      } catch (err) {
        console.error("Error loading countries:", err);
        setCountries([{ name: "Colombia", iso2: "co", dial: "+57" }]);
        setCountryQuery("Colombia");
      }
    })();
    return () => { mounted = false; };
  }, []);

  useEffect(() => setValidUsername(username.trim().length >= 3), [username]);
  useEffect(() => setValidEmail(validarEmail(email)), [email]);
  useEffect(() => {
    validarPasswordRules(password);
    setPasswordsMatch(password !== "" && password === confirmPassword);
  }, [password, confirmPassword]);
  useEffect(() => setEdadOk(validarEdad(fechaNacimiento)), [fechaNacimiento]);
  useEffect(() => {
    if (!telefono) setTelefonoOk(true);
    else setTelefonoOk(validarTelefonoConLib(telefonoPais, telefono));
  }, [telefono, telefonoPais]);

  useEffect(() => {
    const onClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setCountryDropdownOpen(false);
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  const filteredCountries = countryQuery
    ? countries.filter((c) => c.name.toLowerCase().includes(countryQuery.toLowerCase()))
    : countries;

  const selectCountry = (c) => {
    setTelefonoPais(c.dial || "");
    setTelefonoIso(c.iso2 || "xx");
    setCountryQuery(c.name);
    setCountryDropdownOpen(false);
  };

  const obtenerUbicacion = () => {
    if (!navigator.geolocation) {
      alert("Tu navegador no soporta geolocalización");
      return;
    }

    setCargandoUbicacion(true);
    setDireccionExacta("");

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}&addressdetails=1&accept-language=es`;
          const resp = await fetch(url, {
            headers: { "User-Agent": "NEMCATACOA-App/1.0 (contacto@tudominio.com)" },
          });
          if (!resp.ok) throw new Error("Error reverse geocoding");
          const json = await resp.json();
          const addr = json.address || {};
          const parts = [];
          if (addr.road) parts.push(addr.road);
          if (addr.house_number) parts.push(`#${addr.house_number}`);
          if (addr.neighbourhood) parts.push(addr.neighbourhood);
          if (addr.suburb) parts.push(addr.suburb);
          if (addr.city || addr.town || addr.village) parts.push(addr.city || addr.town || addr.village);
          if (addr.state) parts.push(addr.state);
          if (addr.country) parts.push(addr.country);
          const pretty = parts.join(", ");
          const fallback = `Lat: ${latitude.toFixed(4)}, Lng: ${longitude.toFixed(4)}`;
          const finalAddress = pretty || fallback;
          setDireccionExacta(finalAddress);
          const detectedCity = addr.city || addr.town || addr.village || "";
          if (detectedCity) {
            const found = ciudadesColombia.find((c) => c.toLowerCase() === detectedCity.toLowerCase());
            if (found) {
              setCiudad(found);
              setCiudadOtra("");
            } else {
              setCiudad("Otro");
              setCiudadOtra(detectedCity);
            }
          }
        } catch (err) {
          console.error("Reverse geocode error:", err);
          alert("No se pudo obtener la dirección exacta. Se colocarán coordenadas.");
          setDireccionExacta(`Lat: ${latitude.toFixed(4)}, Lng: ${longitude.toFixed(4)}`);
        } finally {
          setCargandoUbicacion(false);
        }
      },
      (err) => {
        console.error("Geolocation error:", err);
        alert("No se pudo obtener la ubicación desde el navegador.");
        setCargandoUbicacion(false);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  const isFormValid =
    validUsername &&
    validEmail &&
    passwordLengthOk &&
    passwordUpperOk &&
    passwordNumberOk &&
    passwordsMatch &&
    edadOk &&
    aceptaPoliticas &&
    telefonoOk &&
    (ciudad ? (ciudad === "Otro" ? ciudadOtra.trim().length > 0 : true) : false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("");
    if (!isFormValid) {
      setMensaje("Completa correctamente todos los campos antes de enviar.");
      return;
    }

    try {
      const body = {
        username,
        email,
        password,
        fechaNacimiento,
        ubicacion: ciudad === "Otro" ? ciudadOtra : ciudad,
        direccionExacta: direccionExacta || null,
        telefono: telefono ? telefono : null,
        telefonoPais: telefonoPais ? telefonoPais : null,
      };

      const res = await fetch("http://localhost:5000/api/usuarios/registro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (res.ok) {
        setMensaje("Registro exitoso. ¡Bienvenido!");
        // show modal with inspirational message
        setWelcomeMessage(
          `¡Bienvenido ${username || ""}! Gracias por unirte a Nemcatacoa. Nuestra cultura es un puente entre el pasado y el presente: cuida, aprende y comparte.`
        );
        setShowWelcomeModal(true);

        // limpiar campos (no cerrar modal automáticamente)
        setUsername("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setFechaNacimiento("");
        setCiudad("");
        setCiudadOtra("");
        setDireccionExacta("");
        setUbicacionManual("");
        setTelefono("");
        setTelefonoPais("+57");
        setTelefonoIso("co");
        setAceptaPoliticas(false);
        setCountryQuery("");
      } else {
        setMensaje(`Error: ${data.error || "Error al registrar"}`);
      }
    } catch (error) {
      console.error("Error en el registro:", error);
      setMensaje("Error en la conexión con el servidor");
    }
  };

  // Modal close handler: redirige a login
  const onThanksAndGoToLogin = () => {
    setShowWelcomeModal(false);
    navigate("/login");
  };

  const Ok = ({ ok }) =>
    ok ? <FaCheckCircle style={{ color: "#2ecc71", marginLeft: 8 }} /> : <FaTimesCircle style={{ color: "#e74c3c", marginLeft: 8 }} />;

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

                  {/* CIUDAD: selector con opción "Otro" */}
                  <div className="mb-3">
                    <label htmlFor="ciudad" className="form-label text-white">Ciudad</label>
                    <select
                      id="ciudad"
                      className="form-select"
                      value={ciudad}
                      onChange={(e) => {
                        setCiudad(e.target.value);
                        if (e.target.value !== "Otro") setCiudadOtra("");
                      }}
                      required
                    >
                      <option value="">Selecciona tu ciudad</option>
                      {ciudadesColombia.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>

                    {ciudad === "Otro" && (
                      <input
                        type="text"
                        className="form-control mt-2"
                        placeholder="Escribe tu ciudad"
                        value={ciudadOtra}
                        onChange={(e) => setCiudadOtra(e.target.value)}
                        required
                      />
                    )}
                  </div>

                  {/* BOTÓN: usar mi ubicación actual -> muestra direccionExacta */}
                  <div className="mb-3">
                    <label className="form-label text-white">Ubicación exacta</label>
                    <div className="d-flex gap-2">
                      <button
                        type="button"
                        className="btn btn-outline-light"
                        onClick={obtenerUbicacion}
                        disabled={cargandoUbicacion}
                      >
                        {cargandoUbicacion ? "Obteniendo..." : <><FaMapMarkerAlt /> Usar mi ubicación actual</>}
                      </button>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Aquí aparecerá la dirección detectada (editable)"
                        value={direccionExacta}
                        onChange={(e) => setDireccionExacta(e.target.value)}
                      />
                    </div>

                    <div className="form-text text-light mt-2">
                      Si la dirección detectada es correcta, quedará guardada con tu registro; si no, puedes editarla.
                    </div>
                  </div>

                  {/* SELECTOR DE PAÍS (BUSCADOR) y TELÉFONO */}
                  <div className="mb-3">
                    <label className="form-label text-white">Teléfono</label>

                    <div className="d-flex gap-2 align-items-start">
                      <div style={{ minWidth: 260 }} ref={dropdownRef}>
                        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                          <img
                            alt="flag"
                            src={telefonoIso ? `https://flagcdn.com/24x18/${telefonoIso}.png` : "https://flagcdn.com/24x18/xx.png"}
                            style={{ width: 24, height: 18, objectFit: "cover", borderRadius: 2 }}
                          />
                          <div style={{ position: "relative", width: "100%" }}>
                            <div
                              onClick={() => setCountryDropdownOpen((s) => !s)}
                              style={{
                                display: "flex",
                                alignItems: "center",
                                background: "white",
                                padding: "6px 8px",
                                borderRadius: 6,
                                cursor: "pointer",
                              }}
                              aria-label="Seleccionar país"
                            >
                              <FaSearch style={{ marginRight: 8, color: "#666" }} />
                              <input
                                type="text"
                                value={countryQuery}
                                onChange={(e) => {
                                  setCountryQuery(e.target.value);
                                  setCountryDropdownOpen(true);
                                }}
                                placeholder="Buscar país..."
                                style={{
                                  border: "none",
                                  outline: "none",
                                  width: "100%",
                                  background: "transparent",
                                }}
                                aria-label="Buscar país"
                              />
                            </div>

                            {countryDropdownOpen && (
                              <div style={{
                                position: "absolute",
                                zIndex: 999,
                                background: "white",
                                maxHeight: 220,
                                overflowY: "auto",
                                width: "100%",
                                boxShadow: "0 6px 20px rgba(0,0,0,0.12)",
                                borderRadius: 6,
                                marginTop: 6,
                              }}>
                                {filteredCountries.length === 0 ? (
                                  <div style={{ padding: 10 }}>No se encontró país</div>
                                ) : (
                                  filteredCountries.map((c) => (
                                    <div
                                      key={c.name + c.iso2}
                                      onClick={() => selectCountry(c)}
                                      style={{
                                        display: "flex",
                                        gap: 8,
                                        alignItems: "center",
                                        padding: "8px 10px",
                                        cursor: "pointer",
                                        borderBottom: "1px solid #eee",
                                      }}
                                    >
                                      <img
                                        alt={`${c.name} flag`}
                                        src={c.iso2 ? `https://flagcdn.com/24x18/${c.iso2}.png` : `https://flagcdn.com/24x18/xx.png`}
                                        style={{ width: 24, height: 18, objectFit: "cover", borderRadius: 2 }}
                                      />
                                      <div style={{ flexGrow: 1 }}>{c.name}</div>
                                      <div style={{ color: "#666", fontSize: 12 }}>{c.dial || ""}</div>
                                    </div>
                                  ))
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <input
                        type="tel"
                        className={`form-control ${telefono ? (telefonoOk ? "is-valid" : "is-invalid") : ""}`}
                        placeholder="3001234567"
                        value={telefono}
                        onChange={(e) => setTelefono(e.target.value)}
                        style={{ flexGrow: 1 }}
                      />
                    </div>

                    <div className="form-text text-light mt-2">
                      {telefono
                        ? telefonoOk
                          ? <span>Teléfono válido para el país seleccionado</span>
                          : <span>Teléfono inválido para el país seleccionado</span>
                        : <span>Opcional — busca el país y escribe tu número</span>}
                    </div>
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

                  <p className="text-center mt-2 text-white">
                    ¿Ya tienes cuenta?{" "}
                    <a href="/login" className="text-warning">Inicia sesión aquí</a>
                  </p>

                  {mensaje && <p className="text-center mt-3 text-light fw-bold">{mensaje}</p>}
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* ---------------------------
            MODAL DE BIENVENIDA 
           --------------------------- */}
        {showWelcomeModal && (
          <div
            role="dialog"
            aria-modal="true"
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 2000,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(0,0,0,0.6)",
            }}
          >
            <div
              style={{
                background: "white",
                borderRadius: 12,
                width: "min(680px, 92%)",
                padding: 24,
                boxShadow: "0 12px 40px rgba(0,0,0,0.3)",
                textAlign: "center",
              }}
            >
              <h2 style={{ marginBottom: 12 }}>¡Bienvenido a NEMCATACOA!</h2>
              <p style={{ color: "#333", marginBottom: 18, lineHeight: 1.4 }}>
                {welcomeMessage}
              </p>

              <blockquote style={{ fontStyle: "italic", color: "#555", margin: "18px 0" }}>
                "La cultura es el alma de un pueblo. Cuidarla es cuidar el futuro." — Nemcatacoa
              </blockquote>

              <div style={{ display: "flex", justifyContent: "center", gap: 12, marginTop: 20 }}>
                <button
                  onClick={onThanksAndGoToLogin}
                  className="btn btn-primary"
                >
                  Gracias — ir a iniciar sesión
                </button>
              </div>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
