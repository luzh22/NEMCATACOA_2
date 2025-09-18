import React, { useState } from "react";
import axios from "axios"; // para hacer el POST
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Register() {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    usuario: "",
    email: "",
    password: "",
    fechaNacimiento: "",
    ubicacion: ""
  });
  const [errorEdad, setErrorEdad] = useState("");
  const [cargando, setCargando] = useState(false);

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

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });

    if (id === "fechaNacimiento" && !validarMayorEdad(value)) {
      setErrorEdad("Debes ser mayor de 18 años");
    } else {
      setErrorEdad("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validarMayorEdad(formData.fechaNacimiento)) {
      alert("Debes ser mayor de edad para registrarte.");
      return;
    }

    try {
      setCargando(true);
      const res = await axios.post("http://localhost:3001/api/usuarios", formData);
      alert("✅ Usuario registrado correctamente");
      console.log(res.data);
      setFormData({
        nombre: "",
        apellido: "",
        usuario: "",
        email: "",
        password: "",
        fechaNacimiento: "",
        ubicacion: ""
      });
    } catch (error) {
      console.error(error.response?.data || error);
      alert("❌ Error al registrar el usuario: " + (error.response?.data?.error || error.message));
    } finally {
      setCargando(false);
    }
  };

  const hoy = new Date();
  const fechaMax = new Date(hoy.setFullYear(hoy.getFullYear() - 18))
    .toISOString()
    .split("T")[0];

  return (
    <div className="container mt-5">
      <h1>Registro</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" id="nombre" placeholder="Nombre" value={formData.nombre} onChange={handleChange} required />
        <input type="text" id="apellido" placeholder="Apellido" value={formData.apellido} onChange={handleChange} required />
        <input type="text" id="usuario" placeholder="Usuario" value={formData.usuario} onChange={handleChange} required />
        <input type="email" id="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input type="password" id="password" placeholder="Contraseña" value={formData.password} onChange={handleChange} required />
        <input type="date" id="fechaNacimiento" max={fechaMax} value={formData.fechaNacimiento} onChange={handleChange} required />
        <select id="ubicacion" value={formData.ubicacion} onChange={handleChange}>
          <option value="">Seleccione su ciudad</option>
          <option value="Bogotá">Bogotá</option>
          <option value="Medellín">Medellín</option>
          <option value="Cali">Cali</option>
          <option value="Otra">Otra...</option>
        </select>
        <button type="submit" disabled={cargando}>{cargando ? "Registrando..." : "Registrarse"}</button>
      </form>
    </div>
  );
}
