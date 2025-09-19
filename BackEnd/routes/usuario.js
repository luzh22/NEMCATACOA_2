const express = require('express');
const bcrypt = require('bcryptjs');
const pool = require('../config/database');

const router = express.Router();

// Registro de usuario (POST)
router.post('/registro', async (req, res) => {
  const { nombre, email, password, telefono, tipo_usuario } = req.body;

  try {
    // Verificar si el usuario ya existe
    const usuarioExiste = await pool.query(
      'SELECT id FROM usuarios WHERE email = $1',
      [email]
    );

    if (usuarioExiste.rows.length > 0) {
      return res.status(400).json({
        error: 'El usuario ya existe con ese email'
      });
    }

    // Encriptar la contraseña
    const passwordHash = await bcrypt.hash(password, 10);

    // Insertar nuevo usuario
    const nuevoUsuario = await pool.query(
      'INSERT INTO usuarios (nombre, email, password, telefono, tipo_usuario) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [nombre, email, passwordHash, telefono, tipo_usuario || 'turista']
    );

    res.status(201).json({
      message: 'Usuario registrado exitosamente',
      usuario: {
        id: nuevoUsuario.rows[0].id,
        nombre: nuevoUsuario.rows[0].nombre,
        email: nuevoUsuario.rows[0].email,
        telefono: nuevoUsuario.rows[0].telefono,
        tipo_usuario: nuevoUsuario.rows[0].tipo_usuario
      }
    });

  } catch (error) {
    console.error('Error en el registro:', error);
    res.status(500).json({
      error: 'Error interno del servidor',
      details: error.message
    });
  }
});

module.exports = router;
