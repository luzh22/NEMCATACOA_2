const express = require('express');
const router = express.Router();
const pool = require('../config/database'); // ruta correcta
const bcrypt = require('bcrypt'); // para comparar hash de contraseña

// Ruta de prueba
router.get('/', (req, res) => {
  res.json({ message: '✅ Rutas de autenticación funcionando' });
});

// POST /login
router.post('/login', async (req, res) => {
  console.log("POST /login recibido:", req.body); // depuración

  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Usuario y contraseña son requeridos' });
  }

  try {
    // Buscamos por nombre (puedes cambiar a email si quieres)
    const result = await pool.query('SELECT * FROM usuarios WHERE nombre = $1', [username]);

    if (result.rows.length === 0) {
      return res.status(401).json({ message: 'Usuario no encontrado' });
    }

    const user = result.rows[0];

    // Comparamos contraseña con bcrypt
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    res.json({ message: '✅ Inicio de sesión exitoso', user: { id: user.id, nombre: user.nombre, email: user.email } });
  } catch (err) {
    console.error("Error en ruta /login:", err);
    res.status(500).json({ message: 'Error del servidor' });
  }
});

module.exports = router;
