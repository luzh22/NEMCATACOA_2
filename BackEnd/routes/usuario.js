// BackEnd/routes/usuario.js
const express = require('express');
const bcrypt = require('bcryptjs');
const pool = require('../config/database');

const router = express.Router();

router.post('/registro', async (req, res) => {
  try {
    console.log('POST /api/usuarios/registro body:', req.body);

    // Aceptamos ambos nombres por seguridad (frontend puede enviar username o nombre)
    const nombre = req.body.nombre || req.body.username || null;
    const { email, password, fechaNacimiento, ubicacion, telefono, telefonoPais } = req.body;

    // Validaciones mínimas
    if (!nombre || !email || !password) {
      return res.status(400).json({ error: 'Faltan campos requeridos: nombre/username, email o password' });
    }

    // Verificar si email ya existe
    const existe = await pool.query(
      'SELECT id FROM usuarios WHERE email = $1',
      [email]
    );

    if (existe.rows.length > 0) {
      return res.status(400).json({ error: 'El email ya está registrado' });
    }

    // Hashear la contraseña
    const passwordHash = await bcrypt.hash(password, 10);

    // Insertar, incluyendo telefono y fechanacimiento (si vienen)
    const result = await pool.query(
      `INSERT INTO usuarios (nombre, email, password, telefono, fechanacimiento, ubicacion)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id, nombre, email, telefono, fechanacimiento, ubicacion`,
      [nombre, email, passwordHash, telefono || null, fechaNacimiento || null, ubicacion || null]
    );

    const nuevo = result.rows[0];

    res.status(201).json({
      message: 'Usuario registrado exitosamente',
      usuario: nuevo
    });
  } catch (err) {
    console.error('Error en registro usuarios:', err);
    res.status(500).json({ error: 'Error interno del servidor', details: err.message });
  }
});

module.exports = router;
